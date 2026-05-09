import { NextResponse } from "next/server";
import {
  premiumDocumentModeAnalysisOrStub,
  type GroundedContextChunk,
} from "@/lib/ai/openrouter";
import { captureServerEvent } from "@/lib/posthog-server";
import { requirePremiumAccess } from "@/lib/entitlements";
import { logApiError, userFacingMessage } from "@/lib/security/safe-api-response";
import {
  analyzeRequestSchema,
  documentIdParamSchema,
  parseJsonWithSchema,
} from "@/lib/security/request-validation";
import { createClient } from "@/lib/supabase/server";
import { consumeUserAndIpLimit } from "@/lib/usage/premium-limits";

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
    const { id } = await params;
    const parsedDocumentId = documentIdParamSchema.safeParse(id);
    if (!parsedDocumentId.success) {
      return NextResponse.json({ error: "ID do documento inválido." }, { status: 400 });
    }
    const documentId = parsedDocumentId.data;

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

    const parsedBody = await parseJsonWithSchema(request, analyzeRequestSchema);
    if (!parsedBody.ok) {
      return NextResponse.json({ error: parsedBody.error }, { status: 400 });
    }

    const { mode, contractIntent = false } = parsedBody.data;

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

    const quota = await consumeUserAndIpLimit({
      action: "premium-analysis",
      userId: user.id,
      request,
    });
    if (!quota.ok) {
      return NextResponse.json({ error: quota.reason }, { status: quota.status });
    }

    const startedAt = Date.now();
    try {
      const { result, stub } = await premiumDocumentModeAnalysisOrStub({
        contextChunks,
        mode,
        contractIntent,
      });

      await captureServerEvent(user.id, "document_analyze_server_ok", {
        document_id: documentId,
        mode,
        contract_intent: contractIntent,
        latency_ms: Date.now() - startedAt,
        chunks: contextChunks.length,
        stub: Boolean(stub),
      });

      return NextResponse.json({ ...result, stub });
    } catch (e) {
      await captureServerEvent(user.id, "document_analyze_server_fail", {
        document_id: documentId,
        mode,
        latency_ms: Date.now() - startedAt,
        error_class: e instanceof Error ? e.name : "unknown",
      });
      throw e;
    }
  } catch (e) {
    logApiError(route, e);
    return NextResponse.json(
      { error: userFacingMessage(e) },
      { status: 500 },
    );
  }
}
