import { NextResponse } from "next/server";
import { requirePremiumAccess } from "@/lib/entitlements";
import {
  PDF_MIME_TYPES,
  PREMIUM_MAX_FILE_BYTES,
  PREMIUM_MAX_PAGES,
} from "@/lib/constants/limits";
import { chunkPagesForStorage } from "@/lib/pdf/chunk-pages";
import { parsePdfBuffer } from "@/lib/pdf/inspect";
import {
  isContentLengthWithinLimit,
  isPdfMagicBytes,
  sanitizeDocumentTitle,
} from "@/lib/pdf/validation";
import { createPremiumDocumentWithChunks } from "@/lib/documents/server-writes";
import { createClient } from "@/lib/supabase/server";
import { consumeUserAndIpLimit } from "@/lib/usage/premium-limits";

export const runtime = "nodejs";

const MULTIPART_OVERHEAD_BYTES = 1024 * 1024;

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
      return NextResponse.json(
        { error: "Falha ao listar documentos" },
        { status: 500 },
      );
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
    if (
      !isContentLengthWithinLimit(
        request,
        PREMIUM_MAX_FILE_BYTES + MULTIPART_OVERHEAD_BYTES,
      )
    ) {
      return NextResponse.json(
        { error: "Arquivo grande demais para upload." },
        { status: 413 },
      );
    }

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
    const title = sanitizeDocumentTitle(
      typeof titleRaw === "string" && titleRaw.trim() ? titleRaw : file.name,
    );

    const buffer = Buffer.from(await file.arrayBuffer());
    if (!isPdfMagicBytes(buffer)) {
      return NextResponse.json(
        { error: "O arquivo enviado não parece ser um PDF válido." },
        { status: 400 },
      );
    }

    let parsedPdf: Awaited<ReturnType<typeof parsePdfBuffer>>;
    try {
      parsedPdf = await parsePdfBuffer(buffer);
    } catch {
      return NextResponse.json(
        {
          error:
            "Não rolou ler esse PDF — pode estar corrompido ou protegido por senha.",
        },
        { status: 400 },
      );
    }
    const { pageCount, pages } = parsedPdf;

    if (pageCount > PREMIUM_MAX_PAGES) {
      return NextResponse.json(
        {
          error: `Esse PDF tem ${pageCount} páginas. O Premium aguenta até ${PREMIUM_MAX_PAGES} — divide o arquivo em partes ou fala com a gente.`,
        },
        { status: 400 },
      );
    }

    const chunks = chunkPagesForStorage(pages);
    if (chunks.length === 0) {
      return NextResponse.json(
        { error: "Não conseguimos extrair texto desse PDF — provavelmente é uma imagem escaneada." },
        { status: 422 },
      );
    }

    const quota = await consumeUserAndIpLimit({
      action: "premium-upload",
      userId: user.id,
      request,
    });
    if (!quota.ok) {
      return NextResponse.json(
        { error: quota.reason },
        { status: quota.status },
      );
    }

    const stored = await createPremiumDocumentWithChunks({
      userId: user.id,
      title,
      pageCount,
      chunks,
    });

    return NextResponse.json({
      id: stored.id,
      title: stored.title,
      pageCount: stored.pageCount,
      chunkCount: stored.chunkCount,
    });
  } catch (e) {
    console.error("[documents POST]", e);
    return NextResponse.json(
      { error: "Erro ao processar o upload." },
      { status: 500 },
    );
  }
}
