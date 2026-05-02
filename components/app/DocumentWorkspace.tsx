"use client";

import Link from "next/link";
import { useState } from "react";
/** Aligns with `/api/chat/premium` message shape (client-only typing). */
type ChatTurn = { role: "user" | "assistant"; content: string };
import { CitationPanel, type CitationRef } from "@/components/app/CitationPanel";

type Props = {
  documentId: string;
  title: string;
  pageCount: number | null;
  citationRefs: CitationRef[];
};

/**
 * Premium workspace shell: transcript + composer calling `/api/chat/premium`,
 * plus citation list driven by chunks loaded on the server.
 */
export function DocumentWorkspace({
  documentId,
  title,
  pageCount,
  citationRefs,
}: Props) {
  const [messages, setMessages] = useState<ChatTurn[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastStub, setLastStub] = useState(false);

  async function send() {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    setError(null);
    setInput("");
    const nextHistory: ChatTurn[] = [...messages, { role: "user", content: trimmed }];
    setMessages(nextHistory);
    setLoading(true);

    try {
      const res = await fetch("/api/chat/premium", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          documentId,
          messages: nextHistory,
        }),
      });
      const json = (await res.json()) as {
        message?: string;
        stub?: boolean;
        error?: string;
      };

      if (!res.ok) {
        setError(json.error ?? "Não foi possível responder.");
        setMessages(messages);
        return;
      }

      setLastStub(Boolean(json.stub));
      setMessages([
        ...nextHistory,
        {
          role: "assistant",
          content: json.message ?? "",
        },
      ]);
    } catch {
      setError("Erro de rede.");
      setMessages(messages);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <nav className="text-sm text-charcoal-text">
        <Link href="/app" className="underline">
          ← Biblioteca
        </Link>
      </nav>

      <header>
        <h1 className="font-display text-2xl font-semibold text-midnight-ink">
          {title}
        </h1>
        <p className="mt-1 text-sm text-faded-stone">
          {pageCount != null ? `${pageCount} páginas` : "Páginas —"} · Chat com
          fontes (Premium)
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(260px,340px)]">
        <section className="flex min-h-[420px] flex-col rounded-[length:var(--radius-cards)] border border-subtle-gray bg-crisp-white">
          <div className="flex-1 space-y-4 overflow-y-auto p-4">
            {messages.length === 0 ? (
              <p className="text-charcoal-text">
                Faça uma pergunta sobre o documento. O modelo responde com base
                nos trechos indexados e deve citar páginas quando usar um trecho.
              </p>
            ) : (
              messages.map((m, i) => (
                <div
                  key={`${m.role}-${i}`}
                  className={
                    m.role === "user"
                      ? "ml-8 rounded-[length:var(--radius-md)] bg-canvas px-3 py-2 text-charcoal-text"
                      : "mr-8 rounded-[length:var(--radius-md)] border border-subtle-gray bg-canvas px-3 py-2 text-graphite"
                  }
                >
                  <span className="mb-1 block text-xs font-medium uppercase text-faded-stone">
                    {m.role === "user" ? "Você" : "Assistente"}
                  </span>
                  <p className="whitespace-pre-wrap leading-relaxed">{m.content}</p>
                </div>
              ))
            )}
            {loading ? (
              <p className="text-sm text-faded-stone">Gerando resposta…</p>
            ) : null}
            {error ? (
              <p className="text-sm text-red-700" role="alert">
                {error}
              </p>
            ) : null}
            {lastStub ? (
              <p className="text-xs text-faded-stone">
                Resposta em modo stub (sem OPENROUTER_API_KEY). Configure a chave
                para respostas reais.
              </p>
            ) : null}
          </div>
          <div className="border-t border-subtle-gray p-4">
            <div className="flex gap-2">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                rows={2}
                placeholder="Pergunte algo sobre o PDF…"
                className="min-h-[48px] flex-1 resize-y border border-ash-gray bg-canvas px-3 py-2 text-sm text-graphite"
                disabled={loading}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    void send();
                  }
                }}
              />
              <button
                type="button"
                onClick={() => void send()}
                disabled={loading || !input.trim()}
                className="self-end rounded-[length:var(--radius-buttons)] bg-apollo-gold px-4 py-2 text-sm font-medium text-midnight-ink disabled:opacity-50"
              >
                Enviar
              </button>
            </div>
          </div>
        </section>

        <CitationPanel items={citationRefs} />
      </div>
    </div>
  );
}
