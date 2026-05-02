import { NextResponse } from "next/server";
import { requirePremiumAccess } from "@/lib/entitlements";
import {
  PDF_MIME_TYPES,
  PREMIUM_MAX_FILE_BYTES,
  PREMIUM_MAX_PAGES,
} from "@/lib/constants/limits";
import { chunkPagesForStorage } from "@/lib/pdf/chunk-pages";
import { parsePdfBuffer } from "@/lib/pdf/inspect";
import { createClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

/**
 * Lists documents for the logged-in user (RLS applies).
 */
export async function GET() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    const { data, error } = await supabase
      .from("documents")
      .select("id, title, page_count, created_at")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("[documents GET]", error);
      return NextResponse.json({ error: "Falha ao listar documentos" }, { status: 500 });
    }

    return NextResponse.json({ documents: data ?? [] });
  } catch {
    return NextResponse.json(
      { error: "Supabase não configurado ou sessão indisponível" },
      { status: 503 },
    );
  }
}

/**
 * Uploads a PDF, extracts text by page, stores rows in `documents` + `document_chunks`.
 * Requires Premium (subscription or stub — see `requirePremiumAccess`).
 */
export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    const gate = await requirePremiumAccess(supabase, user.id);
    if (!gate.ok) {
      return NextResponse.json({ error: gate.reason }, { status: gate.status });
    }

    const form = await request.formData();
    const file = form.get("file");
    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "Campo file é obrigatório (multipart/form-data)." },
        { status: 400 },
      );
    }

    if (
      !PDF_MIME_TYPES.includes(file.type as (typeof PDF_MIME_TYPES)[number])
    ) {
      return NextResponse.json(
        { error: "Envie um PDF (application/pdf)." },
        { status: 400 },
      );
    }

    if (file.size > PREMIUM_MAX_FILE_BYTES) {
      return NextResponse.json(
        {
          error: `Arquivo grande demais (máx. ${Math.round(PREMIUM_MAX_FILE_BYTES / (1024 * 1024))} MB).`,
        },
        { status: 400 },
      );
    }

    const titleRaw = form.get("title");
    const title =
      typeof titleRaw === "string" && titleRaw.trim()
        ? titleRaw.trim()
        : file.name.replace(/\.pdf$/i, "") || "Documento";

    const buffer = Buffer.from(await file.arrayBuffer());
    const { pageCount, pages } = await parsePdfBuffer(buffer);

    if (pageCount > PREMIUM_MAX_PAGES) {
      return NextResponse.json(
        {
          error: `Este PDF tem ${pageCount} páginas; o limite do Premium é ${PREMIUM_MAX_PAGES}.`,
        },
        { status: 400 },
      );
    }

    const chunks = chunkPagesForStorage(pages);
    if (chunks.length === 0) {
      return NextResponse.json(
        { error: "Não foi possível extrair texto deste PDF." },
        { status: 422 },
      );
    }

    const { data: doc, error: docErr } = await supabase
      .from("documents")
      .insert({
        user_id: user.id,
        title,
        storage_path: null,
        page_count: pageCount,
      })
      .select("id")
      .single();

    if (docErr || !doc) {
      console.error("[documents POST] insert doc", docErr);
      return NextResponse.json(
        { error: "Não foi possível salvar o documento." },
        { status: 500 },
      );
    }

    const rows = chunks.map((c) => ({
      document_id: doc.id,
      chunk_index: c.chunkIndex,
      page_start: c.pageStart,
      page_end: c.pageEnd,
      content: c.content,
    }));

    const { error: chErr } = await supabase.from("document_chunks").insert(rows);
    if (chErr) {
      console.error("[documents POST] insert chunks", chErr);
      await supabase.from("documents").delete().eq("id", doc.id);
      return NextResponse.json(
        { error: "Falha ao indexar o texto do PDF." },
        { status: 500 },
      );
    }

    return NextResponse.json({
      id: doc.id,
      title,
      pageCount,
      chunkCount: rows.length,
    });
  } catch (e) {
    console.error("[documents POST]", e);
    return NextResponse.json(
      { error: "Erro ao processar o upload." },
      { status: 500 },
    );
  }
}
