"use client";

import { useCallback, useState } from "react";
import type { SummaryPayload } from "@/lib/ai/summary-schema";
import {
  ANON_MAX_FILE_BYTES,
  ANON_MAX_PAGES,
  PDF_MIME_TYPES,
} from "@/lib/constants/limits";
import { track } from "@/lib/analytics";
import {
  PaywallCta,
  type PaywallVariant,
} from "@/components/marketing/PaywallCta";

type Props = {
  /** Quando true, envia `intent=contrato` para orientar o modelo (ex.: página de contratos). */
  contractIntent?: boolean;
};

/**
 * Upload anônimo + resumo estruturado via `/api/summarize/anonymous`.
 * Regra de produto: só o resumo é gratuito; chat permanece Premium (CTA após o resultado).
 *
 * Fluxo de paywall:
 *  - Antes do resumo: card `default` abaixo do upload.
 *  - Depois do resumo: substituímos por `after_summary` (não empilhamos).
 *  - Cliques em "perguntar ao PDF" / "Exportar" sobrescrevem por uma variante mais específica
 *    (`blocked_chat` / `export`) — sempre uma única razão visível por vez.
 */
export function AnonymousSummaryFlow({ contractIntent = false }: Props) {
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState<
    (SummaryPayload & { stub?: boolean }) | null
  >(null);
  const [copyHint, setCopyHint] = useState<string | null>(null);
  const [largePdfBlocked, setLargePdfBlocked] = useState(false);
  /** Sobrescreve a variante padrão pós-resumo quando o usuário tenta uma ação Premium específica. */
  const [paywallOverride, setPaywallOverride] =
    useState<PaywallVariant | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const validateFile = useCallback((file: File) => {
    setError(null);
    if (
      !PDF_MIME_TYPES.includes(file.type as (typeof PDF_MIME_TYPES)[number])
    ) {
      setError("Envie apenas um arquivo PDF.");
      return false;
    }
    if (file.size > ANON_MAX_FILE_BYTES) {
      setError(
        `Arquivo grande demais para o nível gratuito (máx. ${Math.round(ANON_MAX_FILE_BYTES / (1024 * 1024))} MB).`,
      );
      return false;
    }
    setFileName(file.name);
    return true;
  }, []);

  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setError(null);
      setSummary(null);
      setLargePdfBlocked(false);
      setPaywallOverride(null);
      const form = e.currentTarget;
      const input = form.elements.namedItem("file") as HTMLInputElement;
      const file = input?.files?.[0];
      if (!file || !validateFile(file)) return;

      setLoading(true);
      track("anonymous_summary_start", { contractIntent });
      try {
        const body = new FormData();
        body.set("file", file);
        if (contractIntent) {
          body.set("intent", "contrato");
        }

        const res = await fetch("/api/summarize/anonymous", {
          method: "POST",
          body,
        });

        const json = (await res.json()) as SummaryPayload & {
          stub?: boolean;
          error?: string;
          pageCount?: number;
        };

        if (!res.ok) {
          setError(json.error ?? "Não foi possível gerar o resumo.");
          const pc =
            typeof json.pageCount === "number" ? json.pageCount : undefined;
          setLargePdfBlocked(pc != null && pc > ANON_MAX_PAGES);
          track("anonymous_summary_fail", { status: res.status });
          return;
        }

        if ("error" in json && json.error) {
          setError(json.error);
          return;
        }

        setSummary(json);
        track("anonymous_summary_ok", {
          stub: Boolean(json.stub),
          contractIntent,
        });
      } catch {
        setError("Erro de rede. Tente novamente.");
      } finally {
        setLoading(false);
      }
    },
    [contractIntent, validateFile],
  );

  /** Variante de paywall renderizada após o resumo (override > padrão). */
  const postSummaryVariant: PaywallVariant = paywallOverride ?? "after_summary";

  return (
    <div className="space-y-8">
      <div className="rounded-lg border border-subtle-gray bg-crisp-white p-card">
        <h2 className="font-display text-subheading font-semibold text-midnight-ink">
          Enviar PDF
        </h2>
        <p className="mt-2 text-body-sm text-charcoal-text">
          Grátis sem cadastro: até {ANON_MAX_PAGES} páginas,{" "}
          <strong className="font-medium text-midnight-ink">
            resumo apenas
          </strong>
          . O chat com o documento e análises longas são{" "}
          <LinkInline href="/precos" label="Premium" />.
        </p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <label
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragging(false);
              const f = e.dataTransfer.files?.[0];
              if (f) {
                validateFile(f);
                const input = e.currentTarget.querySelector(
                  "input[type=file]",
                ) as HTMLInputElement | null;
                if (input) {
                  const dt = new DataTransfer();
                  dt.items.add(f);
                  input.files = dt.files;
                }
              }
            }}
            className={
              "group flex cursor-pointer flex-col items-center justify-center gap-2 border border-dashed py-12 px-5 text-center transition-colors " +
              (isDragging
                ? "border-midnight-ink bg-crisp-white"
                : "border-soft-stone bg-canvas hover:border-midnight-ink hover:bg-crisp-white")
            }
          >
            <span className="font-display text-subheading font-semibold text-midnight-ink">
              Solte um PDF aqui
            </span>
            <span className="text-body-sm text-charcoal-text">
              ou{" "}
              <span className="underline underline-offset-4">
                clique para selecionar
              </span>
            </span>
            <span className="eyebrow text-faded-stone">
              Grátis · Sem cadastro · Até {ANON_MAX_PAGES} páginas
            </span>
            <input
              name="file"
              type="file"
              accept="application/pdf"
              className="sr-only"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) validateFile(f);
              }}
            />
          </label>
          {fileName ? (
            <p className="text-body-sm text-graphite">
              Arquivo selecionado:{" "}
              <span className="font-medium text-midnight-ink">{fileName}</span>
            </p>
          ) : (
            <p className="text-body-sm text-faded-stone">
              Selecione um PDF para gerar o resumo.
            </p>
          )}
          <button
            type="submit"
            disabled={loading || !fileName}
            aria-disabled={loading || !fileName}
            className={
              "w-full rounded-lg px-5 py-3 text-body-sm font-medium transition-opacity " +
              (fileName && !loading
                ? "bg-apollo-gold text-midnight-ink hover:opacity-90"
                : "cursor-not-allowed bg-subtle-gray text-faded-stone")
            }
          >
            {loading
              ? "Gerando resumo…"
              : fileName
                ? "Gerar resumo gratuito"
                : "Selecione um PDF primeiro"}
          </button>
        </form>

        {error ? (
          <p className="mt-4 text-body-sm text-red-700" role="alert">
            {error}
          </p>
        ) : null}

        {error && largePdfBlocked ? (
          <div className="mt-6">
            <PaywallCta variant="large_pdf" />
          </div>
        ) : null}

        {summary?.stub ? (
          <p className="mt-4 text-caption text-faded-stone">
            Modo demonstração (sem chave de IA no servidor). Configure{" "}
            <code className="font-mono">OPENROUTER_API_KEY</code> para resumo
            real.
          </p>
        ) : null}
      </div>

      {summary ? (
        <div className="space-y-6">
          <section className="rounded-lg border border-subtle-gray bg-crisp-white p-card">
            <h2 className="font-display text-subheading font-semibold text-midnight-ink">
              Seu resumo
            </h2>
            <div className="mt-4 space-y-4 text-body-sm text-graphite">
              <p className=" text-charcoal-text">
                {summary.summary}
              </p>
              <div>
                <h3 className="mb-2 eyebrow text-faded-stone">
                  Em tópicos
                </h3>
                <ul className="list-inside list-disc space-y-1">
                  {summary.bulletPoints.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
              {summary.keyDatesOrValues.length > 0 ? (
                <div>
                  <h3 className="mb-2 eyebrow text-faded-stone">
                    Datas e valores
                  </h3>
                  <ul className="list-inside list-disc space-y-1">
                    {summary.keyDatesOrValues.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {summary.entities.length > 0 ? (
                <div>
                  <h3 className="mb-2 eyebrow text-faded-stone">
                    Entidades
                  </h3>
                  <p>{summary.entities.join(", ")}</p>
                </div>
              ) : null}
            </div>

            <div className="mt-6 flex flex-wrap gap-2 border-t border-subtle-gray pt-6">
              <button
                type="button"
                className="rounded-lg border border-midnight-ink px-4 py-2 text-body-sm font-medium text-midnight-ink"
                onClick={async () => {
                  const text = [
                    summary.summary,
                    "",
                    ...summary.bulletPoints.map((b) => `• ${b}`),
                  ].join("\n");
                  try {
                    await navigator.clipboard.writeText(text);
                    setCopyHint("Resumo copiado.");
                    setTimeout(() => setCopyHint(null), 2000);
                    track("anonymous_summary_copy", {});
                  } catch {
                    setCopyHint("Não foi possível copiar.");
                  }
                }}
              >
                Copiar resumo
              </button>
              <button
                type="button"
                className="rounded-lg bg-midnight-ink px-4 py-2 text-body-sm font-medium text-crisp-white"
                onClick={() => {
                  setPaywallOverride("export");
                  track("anonymous_export_attempt", {});
                }}
              >
                Exportar pacote (Premium)
              </button>
              {copyHint ? (
                <span className="self-center text-caption text-faded-stone">
                  {copyHint}
                </span>
              ) : null}
            </div>
          </section>

          {summary.suggestedQuestions.length > 0 ? (
            <SuggestedQuestionsLocked
              questions={summary.suggestedQuestions}
              onClick={(q) => {
                setPaywallOverride("blocked_chat");
                track("anonymous_suggested_question_click", {
                  question: q.slice(0, 80),
                });
                if (typeof document !== "undefined") {
                  requestAnimationFrame(() => {
                    document
                      .getElementById("post-summary-paywall")
                      ?.scrollIntoView({ behavior: "smooth", block: "center" });
                  });
                }
              }}
            />
          ) : null}

          <div id="post-summary-paywall">
            <PaywallCta variant={postSummaryVariant} />
          </div>
        </div>
      ) : (
        <PaywallCta variant="default" />
      )}
    </div>
  );
}

function LinkInline({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="font-medium text-midnight-ink underline underline-offset-2"
    >
      {label}
    </a>
  );
}

/**
 * Bloco de "perguntas sugeridas" — visíveis mas bloqueadas. Cada clique expõe
 * o paywall de chat (blocked_chat). É a maior alavanca de conversão pós-resumo:
 * o usuário viu o que a IA já sabe responder, mas precisa do Premium para perguntar.
 */
function SuggestedQuestionsLocked({
  questions,
  onClick,
}: {
  questions: string[];
  onClick: (q: string) => void;
}) {
  return (
    <section
      aria-labelledby="suggested-questions-heading"
      className="rounded-lg border border-subtle-gray bg-canvas p-card"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <p className="eyebrow text-faded-stone">
            Perguntas sugeridas pela IA
          </p>
          <h3
            id="suggested-questions-heading"
            className="mt-2 font-display text-subheading font-semibold text-midnight-ink"
          >
            Pergunte ao PDF — disponível no Premium.
          </h3>
        </div>
        <span
          aria-hidden="true"
          className="inline-flex items-center gap-1.5 rounded-full border border-midnight-ink/20 bg-crisp-white px-3 py-1 eyebrow text-charcoal-text"
        >
          <LockIcon /> Premium
        </span>
      </div>

      <p className="mt-3 max-w-2xl text-body-sm  text-charcoal-text">
        A IA mapeou estas perguntas no documento. Clique numa para entrar no
        chat com citação de página.
      </p>

      <ul className="mt-5 grid gap-2 sm:grid-cols-2">
        {questions.map((q) => (
          <li key={q}>
            <button
              type="button"
              onClick={() => onClick(q)}
              className="group flex w-full items-start gap-3 rounded-md border border-subtle-gray bg-crisp-white px-4 py-3 text-left text-body-sm text-charcoal-text transition-colors hover:border-midnight-ink hover:bg-crisp-white"
            >
              <span
                aria-hidden="true"
                className="mt-0.5 inline-flex h-5 w-5 flex-none items-center justify-center rounded-full border border-soft-stone text-faded-stone group-hover:border-midnight-ink group-hover:text-midnight-ink"
              >
                <LockIcon />
              </span>
              <span className="flex-1 leading-snug">{q}</span>
              <span
                aria-hidden="true"
                className="flex-none self-center text-faded-stone group-hover:text-midnight-ink"
              >
                →
              </span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

function LockIcon() {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="2.5"
        y="5.5"
        width="7"
        height="5"
        rx="0.5"
        stroke="currentColor"
        strokeWidth="1"
      />
      <path
        d="M4 5.5V3.75a2 2 0 0 1 4 0V5.5"
        stroke="currentColor"
        strokeWidth="1"
      />
    </svg>
  );
}
