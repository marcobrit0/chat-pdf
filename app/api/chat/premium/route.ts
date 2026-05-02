import { NextResponse } from "next/server";
import { premiumDocumentChatOrStub } from "@/lib/ai/openrouter";
import type { ChatTurn, GroundedContextChunk } from "@/lib/ai/openrouter";
import { requirePremiumAccess } from "@/lib/entitlements";
import { createClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

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

    const body = (await request.json()) as {
      documentId?: string;
      messages?: ChatTurn[];
    };

    const documentId = body.documentId?.trim();
    const messages = body.messages;
    if (!documentId || !messages?.length) {
      return NextResponse.json(
        { error: "documentId e messages são obrigatórios." },
        { status: 400 },
      );
    }

    const last = messages[messages.length - 1];
    if (last.role !== "user") {
      return NextResponse.json(
        { error: "A última mensagem deve ser do usuário." },
        { status: 400 },
      );
    }

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

    const history = messages.slice(0, -1);
    const { text, stub } = await premiumDocumentChatOrStub({
      contextChunks,
      history,
      userMessage: last.content,
    });

    return NextResponse.json({
      message: text,
      stub,
      citationRefs: contextChunks.map((c) => ({
        id: c.id,
        label: c.label,
      })),
    });
  } catch (e) {
    console.error("[chat/premium]", e);
    return NextResponse.json(
      { error: "Erro ao gerar resposta." },
      { status: 500 },
    );
  }
}
