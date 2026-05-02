import { NextResponse } from "next/server";
import { documentModeEnum } from "@/lib/ai/document-modes-schema";
import {
  premiumDocumentModeAnalysisOrStub,
  type GroundedContextChunk,
} from "@/lib/ai/openrouter";
import { requirePremiumAccess } from "@/lib/entitlements";
import { logApiError, userFacingMessage } from "@/lib/security/safe-api-response";
import { createClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

/**
 * Análise estruturada do documento (modos: resumo, extrair, riscos). Exige Premium.
 * Body: { mode: "summary" | "extract" | "risk", contractIntent?: boolean }
 */
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const route = "api/documents/[id]/analyze";
  try {
    const { id: documentId } = await params;
    if (!documentId) {
      return NextResponse.json({ error: "ID do documento inválido." }, { status: 400 });
    }

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Não autenticado." }, { status: 401 });
    }

    const gate = await requirePremiumAccess(supabase, user.id);
    if (!gate.ok) {
      return NextResponse.json({ error: gate.reason }, { status: gate.status });
    }

    const body = (await request.json()) as {
      mode?: unknown;
      contractIntent?: unknown;
    };

    const parsedMode = documentModeEnum.safeParse(body.mode);
    if (!parsedMode.success) {
      return NextResponse.json(
        { error: "Informe mode: summary, extract ou risk." },
        { status: 400 },
      );
    }

    const contractIntent = body.contractIntent === true;

    const { data: doc, error: docErr } = await supabase
      .from("documents")
      .select("id")
      .eq("id", documentId)
      .maybeSingle();

    if (docErr) {
      logApiError(route, docErr);
      return NextResponse.json({ error: "Erro ao validar documento." }, { status: 500 });
    }
    if (!doc) {
      return NextResponse.json({ error: "Documento não encontrado." }, { status: 404 });
    }

    const { data: chunkRows, error: chErr } = await supabase
      .from("document_chunks")
      .select("id, page_start, page_end, content")
      .eq("document_id", documentId)
      .order("chunk_index", { ascending: true });

    if (chErr) {
      logApiError(route, chErr);
      return NextResponse.json({ error: "Falha ao carregar trechos." }, { status: 500 });
    }

    if (!chunkRows?.length) {
      return NextResponse.json(
        { error: "Documento sem texto indexado." },
        { status: 422 },
      );
    }

    const contextChunks: GroundedContextChunk[] = chunkRows.map((row) => {
      const label =
        row.page_start === row.page_end
          ? `p. ${row.page_start}`
          : `p. ${row.page_start}–${row.page_end}`;
      return {
        id: row.id,
        label,
        text: row.content,
      };
    });

    const { result, stub } = await premiumDocumentModeAnalysisOrStub({
      contextChunks,
      mode: parsedMode.data,
      contractIntent,
    });

    return NextResponse.json({ ...result, stub });
  } catch (e) {
    logApiError(route, e);
    return NextResponse.json(
      { error: userFacingMessage(e) },
      { status: 500 },
    );
  }
}
