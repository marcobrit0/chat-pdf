import { NextResponse } from "next/server";
import { premiumDocumentChatOrStub, selectRelevantChunks } from "@/lib/ai/openrouter";
import type { ChatTurn, GroundedContextChunk } from "@/lib/ai/openrouter";
import { requirePremiumAccess } from "@/lib/entitlements";
import { logApiError, userFacingMessage } from "@/lib/security/safe-api-response";
import { chatRequestSchema, parseJsonWithSchema } from "@/lib/security/request-validation";
import { createClient } from "@/lib/supabase/server";
import { consumeUserAndIpLimit } from "@/lib/usage/premium-limits";

export const runtime = "nodejs";

const ROUTE = "api/chat/premium";

/**
 * Body: { documentId: string, messages: { role: 'user' | 'assistant', content: string }[] }
 * Last message must be from the user.
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

    const parsed = await parseJsonWithSchema(request, chatRequestSchema);
    if (!parsed.ok) {
      return NextResponse.json({ error: parsed.error }, { status: 400 });
    }

    const { documentId, messages } = parsed.data;
    const last = messages[messages.length - 1];

    const { data: doc, error: docErr } = await supabase
      .from("documents")
      .select("id")
      .eq("id", documentId)
      .maybeSingle();

    if (docErr) {
      return NextResponse.json({ error: "Erro ao validar documento" }, { status: 500 });
    }
    if (!doc) {
      return NextResponse.json({ error: "Documento não encontrado" }, { status: 404 });
    }

    const { data: chunkRows, error: chErr } = await supabase
      .from("document_chunks")
      .select("id, page_start, page_end, content")
      .eq("document_id", documentId)
      .order("chunk_index", { ascending: true });

    if (chErr) {
      console.error("[chat/premium] chunks", chErr);
      return NextResponse.json({ error: "Falha ao carregar trechos" }, { status: 500 });
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

    const selectedContextChunks = selectRelevantChunks(contextChunks, last.content, 30);
    const history: ChatTurn[] = messages.slice(0, -1);
    const quota = await consumeUserAndIpLimit({
      action: "premium-chat",
      userId: user.id,
      request,
    });
    if (!quota.ok) {
      return NextResponse.json({ error: quota.reason }, { status: quota.status });
    }

    const { text, stub } = await premiumDocumentChatOrStub({
      contextChunks: selectedContextChunks,
      history,
      userMessage: last.content,
    });

    return NextResponse.json({
      message: text,
      stub,
      citationRefs: selectedContextChunks.map((c) => ({
        id: c.id,
        label: c.label,
      })),
    });
  } catch (e) {
    logApiError(ROUTE, e);
    return NextResponse.json(
      { error: userFacingMessage(e, "Erro ao gerar resposta.") },
      { status: 500 },
    );
  }
}
