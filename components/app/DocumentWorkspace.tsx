"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  CitationPanel,
  type CitationRef,
} from "@/components/app/CitationPanel";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Eyebrow, MonoLabel } from "@/components/ui/labels";
import type {
  ExtractPayload,
  RiskPayload,
} from "@/lib/ai/document-modes-schema";
import type { SummaryPayload } from "@/lib/ai/summary-schema";
import { track } from "@/lib/analytics";
import { extractPageHintsFromAssistantText } from "@/lib/chat-citation-hints";
import { toPremiumChatRequestMessages } from "@/lib/chat/request-payload";

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
  extract: "Extrair dados",
  risk: "Mapear riscos",
};

/**
 * Formata o resultado atual como texto simples para copiar/exportar (Premium).
 */
function formatAnalysisForCopy(parsed: AnalyzeOk): string {
  const lines: string[] = [`Modo: ${MODE_LABELS[parsed.mode]}`, ""];
  if (parsed.mode === "summary") {
    const d = parsed.data;
    lines.push("Resumo curto:", d.shortSummary ?? d.summary, "");
    lines.push("Resumo completo:", d.detailedSummary ?? d.summary, "");
    lines.push("Pontos:", ...d.bulletPoints.map((b) => `• ${b}`));
    lines.push(
      "",
      "Datas e valores:",
      ...d.keyDatesOrValues.map((x) => `• ${x}`),
    );
    lines.push("", "Nomes e entidades:", ...d.entities.map((x) => `• ${x}`));
    lines.push(
      "",
      "Perguntas pra ir mais fundo:",
      ...d.suggestedQuestions.map((x) => `• ${x}`),
    );
  } else if (parsed.mode === "extract") {
    const d = parsed.data;
    lines.push("Fatos principais:", ...d.keyFacts.map((x) => `• ${x}`));
    lines.push(
      "",
      "Datas, valores e quantias:",
      ...d.datesValuesAndAmounts.map((x) => `• ${x}`),
    );
    lines.push(
      "",
      "Partes envolvidas:",
      ...d.partiesOrEntities.map((x) => `• ${x}`),
    );
    lines.push(
      "",
      "Obrigações e prazos:",
      ...d.obligationsOrDeadlines.map((x) => `• ${x}`),
    );
  } else {
    const d = parsed.data;
    lines.push("Pontos de atenção:");
    for (const t of d.flaggedTopics) {
      lines.push(
        `• [${t.area}] ${t.observation}${t.pageReference ? ` (${t.pageReference})` : ""}`,
      );
    }
    lines.push(
      "",
      "O que está faltando ou pouco claro:",
      ...d.missingInformation.map((x) => `• ${x}`),
    );
    lines.push(
      "",
      "Perguntas pra revisar com a equipe:",
      ...d.suggestedReviewQuestions.map((x) => `• ${x}`),
    );
  }
  return lines.join("\n");
}

/**
 * Conteúdo da aba "Resumo" (mesmo esquema do resumo anônimo, mas a partir do PDF salvo).
 */
function SummaryView({ data }: { data: SummaryPayload }) {
  return (
    <div className="space-y-4 text-body-sm text-graphite">
      <div className="border-b border-subtle-gray pb-4">
        <MonoLabel>Resumo curto</MonoLabel>
        <p className="mt-2 text-body text-midnight-ink">
          {data.shortSummary ?? data.summary}
        </p>
      </div>
      <div>
        <MonoLabel>Resumo completo</MonoLabel>
        <p className="mt-2 text-charcoal-text">
          {data.detailedSummary ?? data.summary}
        </p>
      </div>
      <div>
        <MonoLabel>Em tópicos</MonoLabel>
        <ul className="list-inside list-disc space-y-1">
          {data.bulletPoints.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      </div>
      {data.keyDatesOrValues.length > 0 ? (
        <div>
          <MonoLabel>Datas e valores</MonoLabel>
          <ul className="list-inside list-disc space-y-1">
            {data.keyDatesOrValues.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </div>
      ) : null}
      {data.entities.length > 0 ? (
        <div>
          <MonoLabel>Nomes e entidades</MonoLabel>
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
    <div className="space-y-4 text-body-sm text-graphite">
      {blocks.map((block) =>
        block.items.length > 0 ? (
          <div key={block.title}>
            <MonoLabel>{block.title}</MonoLabel>
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
    <div className="space-y-4 text-body-sm text-graphite">
      <ul className="space-y-3">
        {data.flaggedTopics.map((t, i) => (
          <li
            key={`risk-row-${i}`}
            className="rounded-md border border-subtle-gray bg-canvas p-card-compact"
          >
            <span className="font-display text-body-sm font-semibold text-midnight-ink">
              {t.area}
            </span>
            {t.pageReference ? (
              <span className="text-caption text-faded-stone">
                {" "}
                · {t.pageReference}
              </span>
            ) : null}
            <p className="mt-1">{t.observation}</p>
          </li>
        ))}
      </ul>
      {data.missingInformation.length > 0 ? (
        <div>
          <MonoLabel>Lacunas no texto</MonoLabel>
          <ul className="list-inside list-disc space-y-1">
            {data.missingInformation.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </div>
      ) : null}
      {data.suggestedReviewQuestions.length > 0 ? (
        <div>
          <MonoLabel>Perguntas para revisar</MonoLabel>
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
  /** Garante que o auto-disparo só acontece uma vez por documento (modo summary). */
  const autoStartedRef = useRef(false);

  useEffect(() => {
    track("document_opened", { document_id: documentId, page_count: pageCount });
  }, [documentId, pageCount]);

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
        setAnalyzeError(json.error ?? "Não rolou rodar a análise. Tenta de novo?");
        return;
      }

      if (!json.mode || !json.data) {
        setAnalyzeError("Resposta estranha do servidor. Tenta de novo em um minuto.");
        return;
      }

      const payload = {
        mode: json.mode,
        data: json.data,
        stub: json.stub,
      } as AnalyzeOk;
      setCached((prev) => ({ ...prev, [payload.mode]: payload }));
      track("document_analyze_ok", {
        mode: payload.mode,
        stub: Boolean(json.stub),
      });
    } catch {
      setAnalyzeError("Sem conexão. Confere a internet e tenta de novo.");
    } finally {
      setAnalyzeLoading(false);
    }
  }, [activeMode, contractFocus, documentId]);

  // Auto-dispara o resumo na primeira carga: a tela vazia + "Clique em Gerar análise"
  // era um beco morto pra quem acabou de subir o PDF. O ref evita disparos duplicados
  // em StrictMode dev e novas montagens. queueMicrotask defere o setState para fora
  // do efeito (evita cascading-renders flag do react-hooks/set-state-in-effect).
  useEffect(() => {
    if (autoStartedRef.current) return;
    if (cached.summary) return;
    autoStartedRef.current = true;
    queueMicrotask(() => {
      void runAnalysis();
    });
  }, [cached.summary, runAnalysis]);

  /** Copia o texto formatado da análise atual (exportação leve para Premium). */
  const copyAnalysis = useCallback(async () => {
    if (!currentResult) return;
    try {
      await navigator.clipboard.writeText(formatAnalysisForCopy(currentResult));
      setCopyHint("Copiado pra área de transferência.");
      setTimeout(() => setCopyHint(null), 2500);
      track("document_analysis_copy", { mode: currentResult.mode });
    } catch {
      setCopyHint("Não rolou copiar. Copia manual mesmo.");
    }
  }, [currentResult]);

  async function send() {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    setError(null);
    setInput("");
    const nextHistory: ChatTurn[] = [
      ...messages,
      { role: "user", content: trimmed },
    ];
    setMessages(nextHistory);
    setLoading(true);
    track("premium_chat_start", { length: trimmed.length });

    try {
      const res = await fetch("/api/chat/premium", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          documentId,
          messages: toPremiumChatRequestMessages(nextHistory),
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
        setError(json.error ?? "Não rolou responder agora. Tenta de novo?");
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
      setError("Sem conexão. Confere a internet e tenta de novo.");
      setMessages(messages);
    } finally {
      setLoading(false);
    }
  }

  const modeIntro = useMemo(
    () =>
      ({
        summary: "Visão geral em texto e tópicos, com perguntas pra você se aprofundar.",
        extract:
          "Datas, valores, partes envolvidas e obrigações, direto e estruturado.",
        risk: "Pontos pra você revisar com calma. Não é parecer jurídico nem auditoria.",
      }) satisfies Record<Mode, string>,
    [],
  );

  return (
    <Container className="py-section-sm">
      <div className="space-y-8">
        <nav className="text-body-sm text-charcoal-text">
          <Link href="/app" className="underline underline-offset-4">
            ← Biblioteca
          </Link>
        </nav>

        <header className="grid gap-3 border-b border-subtle-gray pb-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
          <div>
            <Eyebrow>Documento Premium</Eyebrow>
            <h1 className="mt-3 font-display text-heading font-semibold text-midnight-ink">
              {title}
            </h1>
          </div>
          <p className="text-body-sm text-faded-stone">
            {pageCount != null ? `${pageCount} páginas` : "Páginas —"} · análise
            e chat com fontes
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(280px,360px)]">
          <div className="space-y-6">
            {/* --- Painel de modos estruturados (API `/api/documents/[id]/analyze`) --- */}
            <Card as="section">
              <div className="flex flex-wrap items-center gap-2 border-b border-subtle-gray pb-3">
                {(Object.keys(MODE_LABELS) as Mode[]).map((m) => (
                  <Button
                    key={m}
                    type="button"
                    onClick={() => setActiveMode(m)}
                    variant={activeMode === m ? "primary" : "secondary"}
                    size="sm"
                    className={
                      activeMode === m
                        ? "border-midnight-ink bg-midnight-ink text-crisp-white hover:bg-midnight-ink"
                        : ""
                    }
                  >
                    {MODE_LABELS[m]}
                  </Button>
                ))}
              </div>

              <p className="mt-3 text-body-sm text-charcoal-text">
                {modeIntro[activeMode]}
              </p>

              <label className="mt-3 flex cursor-pointer items-center gap-2 text-body-sm text-charcoal-text">
                <input
                  type="checkbox"
                  checked={contractFocus}
                  onChange={(e) => setContractFocus(e.target.checked)}
                  className="size-4 rounded border-ash-gray"
                />
                Tratar como contrato (partes, prazos, valores e cláusulas)
              </label>

              <div className="mt-4 flex flex-wrap gap-2">
                <Button
                  type="button"
                  onClick={() => void runAnalysis()}
                  disabled={analyzeLoading}
                  size="sm"
                >
                  {analyzeLoading
                    ? "Lendo PDF…"
                    : currentResult
                      ? "Rodar de novo"
                      : "Analisar PDF"}
                </Button>
                {currentResult ? (
                  <Button
                    type="button"
                    onClick={() => void copyAnalysis()}
                    variant="secondary"
                    size="sm"
                  >
                    Copiar resultado
                  </Button>
                ) : null}
                {copyHint ? (
                  <span className="self-center text-caption text-faded-stone">
                    {copyHint}
                  </span>
                ) : null}
              </div>

              {analyzeError ? (
                <p className="mt-3 text-body-sm text-red-700" role="alert">
                  {analyzeError}
                </p>
              ) : null}

              {currentResult?.stub ? (
                <p className="mt-3 text-caption text-faded-stone">
                  Saída de demonstração — configure{" "}
                  <code className="font-mono">OPENROUTER_API_KEY</code> pra
                  rodar com a IA real.
                </p>
              ) : null}

              {activeMode === "risk" ? (
                <p className="mt-4 rounded-md bg-ash-gray p-card-compact text-caption text-charcoal-text">
                  Lembrete: o modo &quot;Mapear riscos&quot; serve pra te dar um
                  norte na leitura, mas não é parecer jurídico, financeiro nem
                  técnico. Confirme com gente da área antes de decidir.
                </p>
              ) : null}

              <div className="mt-4 border-t border-subtle-gray pt-4">
                {!currentResult && !analyzeLoading ? (
                  <p className="text-body-sm text-faded-stone">
                    Clique em{" "}
                    <span className="font-display font-semibold text-midnight-ink">
                      Analisar PDF
                    </span>{" "}
                    pra ver os resultados aqui.
                  </p>
                ) : null}
                {!currentResult && analyzeLoading ? (
                  <p className="text-body-sm text-faded-stone">
                    Lendo o documento e gerando{" "}
                    {MODE_LABELS[activeMode].toLowerCase()}…
                  </p>
                ) : null}
                {currentResult?.mode === "summary" ? (
                  <SummaryView data={currentResult.data} />
                ) : null}
                {currentResult?.mode === "extract" ? (
                  <ExtractView data={currentResult.data} />
                ) : null}
                {currentResult?.mode === "risk" ? (
                  <RiskView data={currentResult.data} />
                ) : null}
              </div>
            </Card>

            {/* --- Chat com o documento (mesmo fluxo da Fase 4) --- */}
            <Card as="section" className="flex min-h-[380px] flex-col">
              <div className="border-b border-subtle-gray pb-3">
                <MonoLabel>Chat com o PDF</MonoLabel>
              </div>
              <div className="flex flex-1 flex-col">
                <div className="flex-1 space-y-4 overflow-y-auto py-4">
                  {messages.length === 0 ? (
                    <p className="text-charcoal-text">
                      Pergunta o que quiser sobre o PDF em português normal.
                      Toda resposta vem com a página de onde a informação saiu.
                    </p>
                  ) : (
                    messages.map((m, i) => (
                      <div
                        key={`${m.role}-${i}`}
                        className={
                          m.role === "user"
                            ? "ml-8 rounded-md bg-canvas p-card-compact text-charcoal-text"
                            : "mr-8 rounded-md border border-subtle-gray bg-canvas p-card-compact text-graphite"
                        }
                      >
                        <MonoLabel className="mb-1 block">
                          {m.role === "user" ? "Você" : "PDFIA"}
                        </MonoLabel>
                        <p className="whitespace-pre-wrap">{m.content}</p>
                        {m.role === "assistant" &&
                        m.pageHints &&
                        m.pageHints.length > 0 ? (
                          <p className="mt-2 border-t border-subtle-gray pt-2 text-caption text-faded-stone">
                            <span className="font-display font-semibold text-charcoal-text">
                              De qual página veio:
                            </span>{" "}
                            {m.pageHints.join(" · ")}
                          </p>
                        ) : null}
                      </div>
                    ))
                  )}
                  {loading ? (
                    <p className="text-body-sm text-faded-stone">
                      Pensando…
                    </p>
                  ) : null}
                  {error ? (
                    <p className="text-body-sm text-red-700" role="alert">
                      {error}
                    </p>
                  ) : null}
                  {lastStub ? (
                    <p className="text-caption text-faded-stone">
                      Resposta de demonstração (sem OPENROUTER_API_KEY).
                      Configure a chave pra rodar com a IA real.
                    </p>
                  ) : null}
                </div>
                <div className="border-t border-subtle-gray pt-4">
                  <div className="flex gap-2">
                    <textarea
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      rows={2}
                      placeholder="Pergunta qualquer coisa sobre o PDF…"
                      className="min-h-[56px] flex-1 resize-y rounded-md border border-ash-gray bg-canvas p-card-compact text-body-sm text-graphite"
                      disabled={loading}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          void send();
                        }
                      }}
                    />
                    <Button
                      type="button"
                      onClick={() => void send()}
                      disabled={loading || !input.trim()}
                      size="sm"
                      className="self-end"
                    >
                      Perguntar
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <CitationPanel items={citationRefs} />
        </div>
      </div>
    </Container>
  );
}
