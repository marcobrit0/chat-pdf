"use client";

import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import type { ExtractPayload, RiskPayload } from "@/lib/ai/document-modes-schema";
import type { SummaryPayload } from "@/lib/ai/summary-schema";
import { track } from "@/lib/analytics";
import { extractPageHintsFromAssistantText } from "@/lib/chat-citation-hints";
import { CitationPanel, type CitationRef } from "@/components/app/CitationPanel";

/** Mensagens do chat alinhadas ao endpoint `/api/chat/premium`. */
type ChatTurn = {
  role: "user" | "assistant";
  content: string;
  /** Dicas de página extraídas do texto ([p. N]) ou futuros campos estruturados da API. */
  pageHints?: string[];
};

type Mode = "summary" | "extract" | "risk";

type AnalyzeOk =
  | { mode: "summary"; data: SummaryPayload; stub?: boolean }
  | { mode: "extract"; data: ExtractPayload; stub?: boolean }
  | { mode: "risk"; data: RiskPayload; stub?: boolean };

type Props = {
  documentId: string;
  title: string;
  pageCount: number | null;
  citationRefs: CitationRef[];
};

const MODE_LABELS: Record<Mode, string> = {
  summary: "Resumo",
  extract: "Extrair",
  risk: "Riscos",
};

/**
 * Formata o resultado atual como texto simples para copiar/exportar (Premium).
 */
function formatAnalysisForCopy(parsed: AnalyzeOk): string {
  const lines: string[] = [`Modo: ${MODE_LABELS[parsed.mode]}`, ""];
  if (parsed.mode === "summary") {
    const d = parsed.data;
    lines.push(d.summary, "");
    lines.push("Pontos:", ...d.bulletPoints.map((b) => `• ${b}`));
    lines.push("", "Datas / valores:", ...d.keyDatesOrValues.map((x) => `• ${x}`));
    lines.push("", "Entidades:", ...d.entities.map((x) => `• ${x}`));
    lines.push("", "Perguntas sugeridas:", ...d.suggestedQuestions.map((x) => `• ${x}`));
  } else if (parsed.mode === "extract") {
    const d = parsed.data;
    lines.push("Fatos principais:", ...d.keyFacts.map((x) => `• ${x}`));
    lines.push("", "Datas, valores e quantias:", ...d.datesValuesAndAmounts.map((x) => `• ${x}`));
    lines.push("", "Partes / entidades:", ...d.partiesOrEntities.map((x) => `• ${x}`));
    lines.push("", "Obrigações / prazos:", ...d.obligationsOrDeadlines.map((x) => `• ${x}`));
  } else {
    const d = parsed.data;
    lines.push("Pontos de atenção:");
    for (const t of d.flaggedTopics) {
      lines.push(`• [${t.area}] ${t.observation}${t.pageReference ? ` (${t.pageReference})` : ""}`);
    }
    lines.push("", "Informação ausente ou pouco clara:", ...d.missingInformation.map((x) => `• ${x}`));
    lines.push("", "Perguntas para revisão:", ...d.suggestedReviewQuestions.map((x) => `• ${x}`));
  }
  return lines.join("\n");
}

/**
 * Conteúdo da aba "Resumo" (mesmo esquema do resumo anônimo, mas a partir do PDF salvo).
 */
function SummaryView({ data }: { data: SummaryPayload }) {
  return (
    <div className="space-y-4 text-sm text-graphite">
      <p className="leading-relaxed">{data.summary}</p>
      <div>
        <h3 className="mb-2 text-xs font-semibold uppercase text-faded-stone">Em tópicos</h3>
        <ul className="list-inside list-disc space-y-1">
          {data.bulletPoints.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      </div>
      {data.keyDatesOrValues.length > 0 ? (
        <div>
          <h3 className="mb-2 text-xs font-semibold uppercase text-faded-stone">Datas e valores</h3>
          <ul className="list-inside list-disc space-y-1">
            {data.keyDatesOrValues.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </div>
      ) : null}
      {data.entities.length > 0 ? (
        <div>
          <h3 className="mb-2 text-xs font-semibold uppercase text-faded-stone">Nomes e entidades</h3>
          <p className="text-charcoal-text">{data.entities.join(", ")}</p>
        </div>
      ) : null}
    </div>
  );
}

function ExtractView({ data }: { data: ExtractPayload }) {
  const blocks: { title: string; items: string[] }[] = [
    { title: "Fatos principais", items: data.keyFacts },
    { title: "Datas, valores e quantias", items: data.datesValuesAndAmounts },
    { title: "Partes ou entidades", items: data.partiesOrEntities },
    { title: "Obrigações e prazos", items: data.obligationsOrDeadlines },
  ];
  return (
    <div className="space-y-4 text-sm text-graphite">
      {blocks.map((block) =>
        block.items.length > 0 ? (
          <div key={block.title}>
            <h3 className="mb-2 text-xs font-semibold uppercase text-faded-stone">{block.title}</h3>
            <ul className="list-inside list-disc space-y-1">
              {block.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ) : null,
      )}
    </div>
  );
}

function RiskView({ data }: { data: RiskPayload }) {
  return (
    <div className="space-y-4 text-sm text-graphite">
      <ul className="space-y-3">
        {data.flaggedTopics.map((t, i) => (
          <li key={`risk-row-${i}`} className="rounded-[length:var(--radius-md)] border border-subtle-gray bg-canvas px-3 py-2">
            <span className="font-medium text-midnight-ink">{t.area}</span>
            {t.pageReference ? (
              <span className="text-xs text-faded-stone"> · {t.pageReference}</span>
            ) : null}
            <p className="mt-1 leading-relaxed">{t.observation}</p>
          </li>
        ))}
      </ul>
      {data.missingInformation.length > 0 ? (
        <div>
          <h3 className="mb-2 text-xs font-semibold uppercase text-faded-stone">Lacunas no texto</h3>
          <ul className="list-inside list-disc space-y-1">
            {data.missingInformation.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </div>
      ) : null}
      {data.suggestedReviewQuestions.length > 0 ? (
        <div>
          <h3 className="mb-2 text-xs font-semibold uppercase text-faded-stone">Perguntas para revisar</h3>
          <ul className="list-inside list-disc space-y-1">
            {data.suggestedReviewQuestions.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

/**
 * Workspace Premium: modos estruturados (Resumo / Extrair / Riscos) + chat com fontes.
 */
export function DocumentWorkspace({
  documentId,
  title,
  pageCount,
  citationRefs,
}: Props) {
  const [activeMode, setActiveMode] = useState<Mode>("summary");
  /** Quando verdadeiro, o prompt enfatiza cláusulas típicas de contratos. */
  const [contractFocus, setContractFocus] = useState(false);
  /** Cache por modo para não refazer chamadas ao trocar de aba. */
  const [cached, setCached] = useState<Partial<Record<Mode, AnalyzeOk>>>({});
  const [analyzeLoading, setAnalyzeLoading] = useState(false);
  const [analyzeError, setAnalyzeError] = useState<string | null>(null);
  const [copyHint, setCopyHint] = useState<string | null>(null);

  const [messages, setMessages] = useState<ChatTurn[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastStub, setLastStub] = useState(false);

  const currentResult = cached[activeMode];

  const runAnalysis = useCallback(async () => {
    setAnalyzeError(null);
    setAnalyzeLoading(true);
    track("document_analyze_start", { mode: activeMode, contractFocus });
    try {
      const res = await fetch(`/api/documents/${documentId}/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: activeMode,
          contractIntent: contractFocus,
        }),
      });
      const json = (await res.json()) as {
        error?: string;
        mode?: Mode;
        stub?: boolean;
        data?: unknown;
      };

      if (!res.ok) {
        setAnalyzeError(json.error ?? "Não foi possível gerar a análise.");
        return;
      }

      if (!json.mode || !json.data) {
        setAnalyzeError("Resposta inválida do servidor.");
        return;
      }

      const payload = { mode: json.mode, data: json.data, stub: json.stub } as AnalyzeOk;
      setCached((prev) => ({ ...prev, [payload.mode]: payload }));
      track("document_analyze_ok", { mode: payload.mode, stub: Boolean(json.stub) });
    } catch {
      setAnalyzeError("Erro de rede.");
    } finally {
      setAnalyzeLoading(false);
    }
  }, [activeMode, contractFocus, documentId]);

  /** Copia o texto formatado da análise atual (exportação leve para Premium). */
  const copyAnalysis = useCallback(async () => {
    if (!currentResult) return;
    try {
      await navigator.clipboard.writeText(formatAnalysisForCopy(currentResult));
      setCopyHint("Copiado.");
      setTimeout(() => setCopyHint(null), 2500);
      track("document_analysis_copy", { mode: currentResult.mode });
    } catch {
      setCopyHint("Não foi possível copiar.");
    }
  }, [currentResult]);

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
        /** Opcional: quando o backend enviar rótulos por resposta, aparecem aqui. */
        answerPageLabels?: string[];
      };

      if (!res.ok) {
        setError(json.error ?? "Não foi possível responder.");
        setMessages(messages);
        track("premium_chat_blocked", { status: res.status });
        return;
      }

      setLastStub(Boolean(json.stub));
      const fromText = extractPageHintsFromAssistantText(json.message ?? "");
      const fromApi = json.answerPageLabels?.filter(Boolean) ?? [];
      const merged = Array.from(new Set([...fromApi, ...fromText]));

      setMessages([
        ...nextHistory,
        {
          role: "assistant",
          content: json.message ?? "",
          pageHints: merged.length > 0 ? merged : undefined,
        },
      ]);
      track("premium_chat_ok", { stub: Boolean(json.stub) });
    } catch {
      setError("Erro de rede.");
      setMessages(messages);
    } finally {
      setLoading(false);
    }
  }

  const modeIntro = useMemo(
    () =>
      ({
        summary: "Visão geral em texto e tópicos, com sugestões de perguntas.",
        extract: "Fatos objetivos: datas, valores, partes e obrigações encontradas no PDF.",
        risk: "Pontos para revisão humana — não é parecer jurídico nem auditoria.",
      }) satisfies Record<Mode, string>,
    [],
  );

  return (
    <div className="space-y-6">
      <nav className="text-sm text-charcoal-text">
        <Link href="/app" className="underline">
          ← Biblioteca
        </Link>
      </nav>

      <header>
        <h1 className="font-display text-2xl font-semibold text-midnight-ink">{title}</h1>
        <p className="mt-1 text-sm text-faded-stone">
          {pageCount != null ? `${pageCount} páginas` : "Páginas —"} · Modos de análise e chat com fontes (Premium)
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(260px,340px)]">
        <div className="space-y-6">
          {/* --- Painel de modos estruturados (API `/api/documents/[id]/analyze`) --- */}
          <section className="rounded-[length:var(--radius-cards)] border border-subtle-gray bg-crisp-white p-4">
            <div className="flex flex-wrap items-center gap-2 border-b border-subtle-gray pb-3">
              {(Object.keys(MODE_LABELS) as Mode[]).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setActiveMode(m)}
                  className={
                    activeMode === m
                      ? "rounded-[length:var(--radius-buttons)] bg-midnight-ink px-3 py-1.5 text-sm font-medium text-crisp-white"
                      : "rounded-[length:var(--radius-buttons)] border border-ash-gray px-3 py-1.5 text-sm text-charcoal-text hover:bg-canvas"
                  }
                >
                  {MODE_LABELS[m]}
                </button>
              ))}
            </div>

            <p className="mt-3 text-sm text-charcoal-text">{modeIntro[activeMode]}</p>

            <label className="mt-3 flex cursor-pointer items-center gap-2 text-sm text-charcoal-text">
              <input
                type="checkbox"
                checked={contractFocus}
                onChange={(e) => setContractFocus(e.target.checked)}
                className="size-4 rounded border-ash-gray"
              />
              Priorizar leitura de contrato (partes, prazos, valores)
            </label>

            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => void runAnalysis()}
                disabled={analyzeLoading}
                className="rounded-[length:var(--radius-buttons)] bg-apollo-gold px-4 py-2 text-sm font-medium text-midnight-ink disabled:opacity-50"
              >
                {analyzeLoading ? "Gerando…" : currentResult ? "Atualizar análise" : "Gerar análise"}
              </button>
              {currentResult ? (
                <button
                  type="button"
                  onClick={() => void copyAnalysis()}
                  className="rounded-[length:var(--radius-buttons)] border border-midnight-ink px-4 py-2 text-sm font-medium text-midnight-ink"
                >
                  Copiar resultado
                </button>
              ) : null}
              {copyHint ? <span className="self-center text-xs text-faded-stone">{copyHint}</span> : null}
            </div>

            {analyzeError ? (
              <p className="mt-3 text-sm text-red-700" role="alert">
                {analyzeError}
              </p>
            ) : null}

            {currentResult?.stub ? (
              <p className="mt-3 text-xs text-faded-stone">
                Modo demonstração — configure <code className="font-mono">OPENROUTER_API_KEY</code> para saída real.
              </p>
            ) : null}

            {activeMode === "risk" ? (
              <p className="mt-4 rounded-[length:var(--radius-md)] bg-ash-gray p-3 text-xs leading-relaxed text-charcoal-text">
                Aviso: a seção &quot;Riscos&quot; ajuda na leitura crítica do texto; não substitui assessoria jurídica,
                financeira ou técnica. A IA pode omitir ou interpretar incorretamente trechos.
              </p>
            ) : null}

            <div className="mt-4 border-t border-subtle-gray pt-4">
              {!currentResult && !analyzeLoading ? (
                <p className="text-sm text-faded-stone">Clique em Gerar análise para preencher este modo.</p>
              ) : null}
              {currentResult?.mode === "summary" ? <SummaryView data={currentResult.data} /> : null}
              {currentResult?.mode === "extract" ? <ExtractView data={currentResult.data} /> : null}
              {currentResult?.mode === "risk" ? <RiskView data={currentResult.data} /> : null}
            </div>
          </section>

          {/* --- Chat com o documento (mesmo fluxo da Fase 4) --- */}
          <section className="flex min-h-[380px] flex-col rounded-[length:var(--radius-cards)] border border-subtle-gray bg-crisp-white">
            <div className="border-b border-subtle-gray px-4 py-2 text-xs font-semibold uppercase text-faded-stone">
              Chat com o PDF
            </div>
            <div className="flex flex-1 flex-col">
              <div className="flex-1 space-y-4 overflow-y-auto p-4">
                {messages.length === 0 ? (
                  <p className="text-charcoal-text">
                    Faça uma pergunta sobre o documento. O modelo usa os trechos indexados e deve citar páginas quando
                    usar um trecho.
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
                      {m.role === "assistant" && m.pageHints && m.pageHints.length > 0 ? (
                        <p className="mt-2 border-t border-subtle-gray pt-2 text-xs text-faded-stone">
                          <span className="font-medium text-charcoal-text">Páginas citadas na resposta:</span>{" "}
                          {m.pageHints.join(" · ")}
                        </p>
                      ) : null}
                    </div>
                  ))
                )}
                {loading ? <p className="text-sm text-faded-stone">Gerando resposta…</p> : null}
                {error ? (
                  <p className="text-sm text-red-700" role="alert">
                    {error}
                  </p>
                ) : null}
                {lastStub ? (
                  <p className="text-xs text-faded-stone">
                    Resposta em modo stub (sem OPENROUTER_API_KEY). Configure a chave para respostas reais.
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
            </div>
          </section>
        </div>

        <CitationPanel items={citationRefs} />
      </div>
    </div>
  );
}
