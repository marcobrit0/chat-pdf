"use client";

import { useCallback, useState } from "react";
import type { SummaryPayload } from "@/lib/ai/summary-schema";
import { ANON_MAX_FILE_BYTES, ANON_MAX_PAGES, PDF_MIME_TYPES } from "@/lib/constants/limits";
import { track } from "@/lib/analytics";
import { PaywallCta } from "@/components/marketing/PaywallCta";

type Props = {
  /** Quando true, envia `intent=contrato` para orientar o modelo (ex.: página de contratos). */
  contractIntent?: boolean;
};

/**
 * Upload anônimo + resumo estruturado via `/api/summarize/anonymous`.
 * Regra de produto: só o resumo é gratuito; chat permanece Premium (CTA após o resultado).
 */
export function AnonymousSummaryFlow({ contractIntent = false }: Props) {
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState<(SummaryPayload & { stub?: boolean }) | null>(null);
  /** Usuário pediu exportação — mostramos CTA Premium específico. */
  const [exportAttempt, setExportAttempt] = useState(false);
  const [copyHint, setCopyHint] = useState<string | null>(null);
  /** PDF acima do limite gratuito — CTA Premium específico. */
  const [largePdfBlocked, setLargePdfBlocked] = useState(false);

  const validateFile = useCallback((file: File) => {
    setError(null);
    if (!PDF_MIME_TYPES.includes(file.type as (typeof PDF_MIME_TYPES)[number])) {
      setError("Envie apenas um arquivo PDF.");
      return false;
    }
    if (file.size > ANON_MAX_FILE_BYTES) {
      setError(`Arquivo grande demais para o nível gratuito (máx. ${Math.round(ANON_MAX_FILE_BYTES / (1024 * 1024))} MB).`);
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
        setExportAttempt(false);
        track("anonymous_summary_ok", { stub: Boolean(json.stub), contractIntent });
      } catch {
        setError("Erro de rede. Tente novamente.");
      } finally {
        setLoading(false);
      }
    },
    [contractIntent, validateFile],
  );

  return (
    <div className="space-y-8">
      <div className="rounded-[length:var(--radius-cards)] border border-subtle-gray bg-crisp-white p-6">
        <h2 className="font-display text-xl font-semibold text-midnight-ink">Enviar PDF</h2>
        <p className="mt-2 text-sm text-charcoal-text">
          Grátis sem cadastro: até {ANON_MAX_PAGES} páginas,{" "}
          <strong className="font-medium text-midnight-ink">resumo apenas</strong>. O chat com o documento e análises
          longas são{" "}
          <LinkInline href="/precos" label="Premium" />.
        </p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <label className="flex cursor-pointer flex-col items-center border border-dashed border-soft-stone py-10">
            <span className="text-sm font-medium text-charcoal-text">Selecionar PDF</span>
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
          {fileName ? <p className="text-sm text-graphite">Arquivo: {fileName}</p> : null}
          <button
            type="submit"
            disabled={loading || !fileName}
            className="w-full rounded-[length:var(--radius-buttons)] bg-apollo-gold px-5 py-3 text-sm font-medium text-midnight-ink disabled:opacity-50"
          >
            {loading ? "Gerando resumo…" : "Gerar resumo gratuito"}
          </button>
        </form>

        {error ? (
          <p className="mt-4 text-sm text-red-700" role="alert">
            {error}
          </p>
        ) : null}

        {error && largePdfBlocked ? (
          <div className="mt-6">
            <PaywallCta variant="large_pdf" />
          </div>
        ) : null}

        {summary?.stub ? (
          <p className="mt-4 text-xs text-faded-stone">
            Modo demonstração (sem chave de IA no servidor). Configure <code className="font-mono">OPENROUTER_API_KEY</code>{" "}
            para resumo real.
          </p>
        ) : null}
      </div>

      {summary ? (
        <div className="space-y-6">
          <section className="rounded-[length:var(--radius-cards)] border border-subtle-gray bg-crisp-white p-6">
            <h2 className="font-display text-xl font-semibold text-midnight-ink">Seu resumo</h2>
            <div className="mt-4 space-y-4 text-sm text-graphite">
              <p className="leading-relaxed text-charcoal-text">{summary.summary}</p>
              <div>
                <h3 className="mb-2 text-xs font-semibold uppercase text-faded-stone">Em tópicos</h3>
                <ul className="list-inside list-disc space-y-1">
                  {summary.bulletPoints.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
              {summary.keyDatesOrValues.length > 0 ? (
                <div>
                  <h3 className="mb-2 text-xs font-semibold uppercase text-faded-stone">Datas e valores</h3>
                  <ul className="list-inside list-disc space-y-1">
                    {summary.keyDatesOrValues.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {summary.entities.length > 0 ? (
                <div>
                  <h3 className="mb-2 text-xs font-semibold uppercase text-faded-stone">Entidades</h3>
                  <p>{summary.entities.join(", ")}</p>
                </div>
              ) : null}
            </div>

            <div className="mt-6 flex flex-wrap gap-2 border-t border-subtle-gray pt-6">
              <button
                type="button"
                className="rounded-[length:var(--radius-buttons)] border border-midnight-ink px-4 py-2 text-sm font-medium text-midnight-ink"
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
                className="rounded-[length:var(--radius-buttons)] bg-midnight-ink px-4 py-2 text-sm font-medium text-crisp-white"
                onClick={() => {
                  setExportAttempt(true);
                  track("anonymous_export_attempt", {});
                }}
              >
                Exportar pacote (Premium)
              </button>
              {copyHint ? <span className="self-center text-xs text-faded-stone">{copyHint}</span> : null}
            </div>
          </section>

          <PaywallCta variant="after_summary" />
          {exportAttempt ? <PaywallCta variant="export" /> : null}
        </div>
      ) : (
        <PaywallCta variant="default" />
      )}
    </div>
  );
}

function LinkInline({ href, label }: { href: string; label: string }) {
  return (
    <a href={href} className="font-medium text-midnight-ink underline underline-offset-2">
      {label}
    </a>
  );
}
