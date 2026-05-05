"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { SummaryPayload } from "@/lib/ai/summary-schema";
import {
  ANON_MAX_FILE_BYTES,
  ANON_MAX_PAGES,
  PDF_MIME_TYPES,
} from "@/lib/constants/limits";
import { track } from "@/lib/analytics";
import { takePendingUpload } from "@/lib/uploads/pending-upload";
import { PdfLoadingAnimation } from "@/components/marketing/PdfLoadingAnimation";

type Phase =
  | { kind: "idle" }
  | { kind: "loading"; fileName: string }
  | { kind: "ready"; fileName: string; result: SummaryPayload & { stub?: boolean } }
  | { kind: "error"; message: string; largePdf: boolean };

type Props = {
  contractIntent?: boolean;
};

const SAMPLE_KPI = (summary: SummaryPayload) => {
  const v = summary.keyDatesOrValues;
  return [
    { k: "Tópicos", v: String(summary.bulletPoints.length), sub: "extraídos" },
    { k: "Datas/Valores", v: String(v.length), sub: "encontrados" },
    { k: "Entidades", v: String(summary.entities.length), sub: "citadas" },
    {
      k: "Perguntas",
      v: String(summary.suggestedQuestions.length),
      sub: "sugeridas (Premium)",
    },
  ];
};

export function PdfSummaryClient({ contractIntent = false }: Props) {
  const [phase, setPhase] = useState<Phase>({ kind: "idle" });
  const [isDragging, setIsDragging] = useState(false);
  const [copyHint, setCopyHint] = useState<string | null>(null);
  const startedRef = useRef(false);

  const runUpload = useCallback(
    async (file: File) => {
      setPhase({ kind: "loading", fileName: file.name });
      track("anonymous_summary_start", { contractIntent });
      try {
        const body = new FormData();
        body.set("file", file);
        if (contractIntent) body.set("intent", "contrato");

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
          const pc = typeof json.pageCount === "number" ? json.pageCount : 0;
          setPhase({
            kind: "error",
            message: json.error ?? "Não foi possível gerar o resumo.",
            largePdf: pc > ANON_MAX_PAGES,
          });
          track("anonymous_summary_fail", { status: res.status });
          return;
        }
        if (json.error) {
          setPhase({ kind: "error", message: json.error, largePdf: false });
          return;
        }
        setPhase({ kind: "ready", fileName: file.name, result: json });
        track("anonymous_summary_ok", {
          stub: Boolean(json.stub),
          contractIntent,
        });
      } catch {
        setPhase({
          kind: "error",
          message: "Erro de rede. Tente novamente.",
          largePdf: false,
        });
      }
    },
    [contractIntent],
  );

  // Pick up a file stashed by InlineUpload (homepage hero), if any.
  // Defer the actual call to a microtask so we don't setState synchronously
  // from inside the effect tick.
  useEffect(() => {
    if (startedRef.current) return;
    const pending = takePendingUpload();
    if (!pending) return;
    startedRef.current = true;
    queueMicrotask(() => {
      void runUpload(pending.file);
    });
  }, [runUpload]);

  const validateAndStart = useCallback(
    (file: File) => {
      if (!PDF_MIME_TYPES.includes(file.type as (typeof PDF_MIME_TYPES)[number])) {
        setPhase({
          kind: "error",
          message: "Envie apenas um arquivo PDF.",
          largePdf: false,
        });
        return;
      }
      if (file.size > ANON_MAX_FILE_BYTES) {
        const mb = Math.round(ANON_MAX_FILE_BYTES / (1024 * 1024));
        setPhase({
          kind: "error",
          message: `Arquivo grande demais para o nível gratuito (máx. ${mb} MB).`,
          largePdf: false,
        });
        return;
      }
      void runUpload(file);
    },
    [runUpload],
  );

  if (phase.kind === "loading") {
    return <PdfLoadingAnimation fileName={phase.fileName} />;
  }

  if (phase.kind === "ready") {
    return (
      <Results
        result={phase.result}
        fileName={phase.fileName}
        copyHint={copyHint}
        onCopy={async () => {
          const text = [
            phase.result.summary,
            "",
            ...phase.result.bulletPoints.map((b) => `• ${b}`),
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
        onAnother={() => setPhase({ kind: "idle" })}
        onLockedAction={(reason) => {
          track(reason, {});
        }}
      />
    );
  }

  // idle or error → show the upload zone (with error message if any)
  return (
    <UploadZone
      isDragging={isDragging}
      onDragChange={setIsDragging}
      onPick={validateAndStart}
      errorMessage={phase.kind === "error" ? phase.message : null}
      largePdf={phase.kind === "error" ? phase.largePdf : false}
    />
  );
}

// ─── Upload zone (idle / error) ──────────────────────────────────────────────

function UploadZone({
  isDragging,
  onDragChange,
  onPick,
  errorMessage,
  largePdf,
}: {
  isDragging: boolean;
  onDragChange: (v: boolean) => void;
  onPick: (file: File) => void;
  errorMessage: string | null;
  largePdf: boolean;
}) {
  return (
    <div className="rounded-lg border border-subtle-gray bg-crisp-white p-card sm:p-card-elevated">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="eyebrow text-faded-stone">
            Comece em segundos
          </p>
          <h2 className="mt-2 font-display text-subheading font-semibold text-midnight-ink">
            Enviar PDF
          </h2>
        </div>
        <span className="mono-label text-faded-stone">
          Grátis · Até {ANON_MAX_PAGES} págs
        </span>
      </div>

      <label
        onDragOver={(e) => {
          e.preventDefault();
          onDragChange(true);
        }}
        onDragLeave={() => onDragChange(false)}
        onDrop={(e) => {
          e.preventDefault();
          onDragChange(false);
          const f = e.dataTransfer.files?.[0];
          if (f) onPick(f);
        }}
        className={
          "mt-5 flex cursor-pointer flex-col items-center justify-center gap-2 border border-dashed py-12 px-5 text-center transition-colors " +
          (isDragging
            ? "border-midnight-ink bg-canvas"
            : "border-soft-stone bg-canvas hover:border-midnight-ink hover:bg-crisp-white")
        }
      >
        <span className="font-display text-subheading font-semibold text-midnight-ink">
          Solte um PDF aqui
        </span>
        <span className="text-body-sm text-charcoal-text">
          ou{" "}
          <span className="underline underline-offset-4">clique para selecionar</span>
        </span>
        <span className="mono-label text-faded-stone">
          Sem cadastro · PDF com texto · pt-BR
        </span>
        <input
          name="file"
          type="file"
          accept="application/pdf"
          className="sr-only"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) onPick(f);
          }}
        />
      </label>

      {errorMessage ? (
        <div
          role="alert"
          className="mt-5 rounded-md border border-red-300 bg-red-50 px-4 py-3 text-body-sm text-red-700"
        >
          {errorMessage}
          {largePdf ? (
            <>
              {" "}
              <Link
                href="/precos"
                className="font-medium text-midnight-ink underline underline-offset-2"
              >
                Ver Premium para PDFs até 100 páginas →
              </Link>
            </>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

// ─── Results layout ──────────────────────────────────────────────────────────

function Results({
  result,
  fileName,
  copyHint,
  onCopy,
  onAnother,
  onLockedAction,
}: {
  result: SummaryPayload & { stub?: boolean };
  fileName: string;
  copyHint: string | null;
  onCopy: () => void;
  onAnother: () => void;
  onLockedAction: (reason: string) => void;
}) {
  const kpis = SAMPLE_KPI(result);
  const cleanTitle = fileName.replace(/\.pdf$/i, "");

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-subtle-gray bg-crisp-white px-5 py-3">
        <div className="flex flex-wrap items-center gap-3">
          <span className="mono-label text-faded-stone">
            Início / Resumir /
          </span>
          <span className="text-body-sm font-medium text-midnight-ink">{fileName}</span>
          <span className="rounded-md border border-subtle-gray bg-canvas px-2 py-0.5 font-mono text-caption tracking-[0.06em] text-charcoal-text">
            {result.pageCount != null ? `${result.pageCount} págs · ` : ""}pt-BR
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onCopy}
            className="rounded-lg border border-midnight-ink px-3 py-1.5 text-caption font-medium text-midnight-ink transition-colors hover:bg-midnight-ink hover:text-crisp-white"
          >
            Copiar resumo
          </button>
          <button
            type="button"
            onClick={onAnother}
            className="rounded-lg bg-apollo-gold px-3 py-1.5 text-caption font-medium text-midnight-ink hover:opacity-90"
          >
            Resumir outro PDF
          </button>
          {copyHint ? (
            <span className="text-caption text-faded-stone">{copyHint}</span>
          ) : null}
        </div>
      </div>

      {/* Hero card */}
      <div className="grid gap-8 rounded-lg border border-subtle-gray bg-crisp-white p-card sm:p-card-elevated md:grid-cols-[1fr_220px]">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-subtle-gray bg-canvas px-3 py-1 eyebrow text-charcoal-text">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-apollo-gold" />
              Resumo pronto
            </span>
            <span className="rounded-full border border-subtle-gray bg-canvas px-3 py-1 eyebrow text-charcoal-text">
              pt-BR
            </span>
          </div>
          <h1 className="mt-4 font-display text-heading-lg font-semibold text-midnight-ink text-[clamp(28px,4vw,40px)]">
            {cleanTitle}
          </h1>
          <p className="mt-4 text-body  text-charcoal-text">
            {result.summary}
          </p>
        </div>
        <div className="grid gap-2 self-start text-caption">
          {[
            ["Páginas", result.pageCount != null ? String(result.pageCount) : "—"],
            ["Idioma", "pt-BR"],
            ["Tópicos", String(result.bulletPoints.length)],
            ["Entidades", String(result.entities.length)],
          ].map(([k, v]) => (
            <div
              key={k}
              className="flex items-center justify-between rounded-md bg-canvas px-3 py-2"
            >
              <span className="mono-label text-faded-stone">
                {k}
              </span>
              <span className="font-medium text-midnight-ink">{v}</span>
            </div>
          ))}
        </div>
      </div>

      {/* KPI tiles */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map(({ k, v, sub }) => (
          <div
            key={k}
            className="rounded-lg border border-subtle-gray bg-crisp-white p-card"
          >
            <div className="mono-label text-faded-stone">
              {k}
            </div>
            <div className="mt-2 font-display text-heading font-semibold text-midnight-ink">
              {v}
            </div>
            <div className="mt-1 text-caption text-charcoal-text">{sub}</div>
          </div>
        ))}
      </div>

      {/* Main 2-col */}
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-start">
        <div className="grid gap-4">
          <Card title="Em tópicos" eyebrow="Resumo estruturado">
            <ul className="grid gap-3.5">
              {result.bulletPoints.map((b, i) => (
                <li
                  key={b}
                  className={
                    "grid grid-cols-[28px_1fr] items-baseline gap-3 text-body-sm  text-charcoal-text " +
                    (i < result.bulletPoints.length - 1
                      ? "border-b border-subtle-gray pb-3.5"
                      : "")
                  }
                >
                  <span className="font-mono text-caption text-faded-stone">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </Card>

          <div className="grid gap-4 sm:grid-cols-2">
            <Card title="Datas e valores" eyebrow="Cronologia">
              <ul className="grid gap-2">
                {result.keyDatesOrValues.length > 0 ? (
                  result.keyDatesOrValues.map((d) => (
                    <li
                      key={d}
                      className="font-mono text-body-sm text-graphite"
                    >
                      {d}
                    </li>
                  ))
                ) : (
                  <li className="text-body-sm text-faded-stone">
                    Nenhuma data ou valor identificado.
                  </li>
                )}
              </ul>
            </Card>
            <Card title="Entidades" eyebrow="Citadas">
              <ul className="grid gap-2">
                {result.entities.length > 0 ? (
                  result.entities.map((e) => (
                    <li key={e} className="text-body-sm">
                      {e}
                    </li>
                  ))
                ) : (
                  <li className="text-body-sm text-faded-stone">Nenhuma entidade citada.</li>
                )}
              </ul>
            </Card>
          </div>

          {/* Locked: Chat with PDF */}
          <Locked
            label="Chat com fonte · Premium"
            description="Pergunte ao documento e receba respostas com a página de origem."
          >
            <Card title="Pergunte ao PDF" eyebrow="Chat com citação · Premium">
              <div className="grid gap-3">
                {result.suggestedQuestions.length > 0 ? (
                  <div className="flex items-start gap-3 rounded-md border border-subtle-gray bg-canvas px-4 py-3">
                    <span className="mono-label text-faded-stone">
                      VOCÊ
                    </span>
                    <span className="text-body-sm">{result.suggestedQuestions[0]}</span>
                  </div>
                ) : null}
                <p className="text-body-sm  text-charcoal-text">
                  No Premium cada resposta é gerada do seu PDF e cita a página
                  exata onde a informação aparece.
                </p>
                {result.suggestedQuestions.length > 1 ? (
                  <div className="flex flex-wrap gap-2 border-t border-subtle-gray pt-3">
                    {result.suggestedQuestions.slice(1, 5).map((q) => (
                      <button
                        key={q}
                        type="button"
                        onClick={() =>
                          onLockedAction("anonymous_suggested_question_click")
                        }
                        className="rounded-md border border-midnight-ink/40 px-3 py-1.5 text-caption text-charcoal-text hover:border-midnight-ink hover:text-midnight-ink"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
            </Card>
          </Locked>
        </div>

        {/* Right rail */}
        <aside className="grid gap-4 lg:sticky lg:top-24 lg:self-start">
          <DocPreview fileName={fileName} pageCount={result.pageCount ?? null} />

          <div className="rounded-lg border border-midnight-ink bg-midnight-ink p-card text-crisp-white">
            <p className="eyebrow text-apollo-gold">
              Premium · R$29/mês
            </p>
            <h3 className="mt-3 font-display text-subheading font-semibold">
              Converse com o documento.
            </h3>
            <ul className="mt-3 grid gap-2 text-body-sm text-subtle-gray">
              <li>· Chat com citação de página</li>
              <li>· PDFs até 100 páginas</li>
              <li>· Modos: contrato, edital, apólice</li>
              <li>· Histórico salvo</li>
            </ul>
            <Link
              href="/precos"
              className="mt-5 inline-flex w-full items-center justify-center rounded-lg bg-apollo-gold px-4 py-3 text-body-sm font-medium text-midnight-ink hover:opacity-90"
              onClick={() => onLockedAction("anonymous_export_attempt")}
            >
              Desbloquear Premium ↗
            </Link>
            <p className="mt-3 text-center text-caption text-soft-stone">
              Reembolso em até 7 dias
            </p>
          </div>

          <Card title="Exportar" eyebrow="Saídas">
            <div className="grid gap-2">
              <button
                type="button"
                onClick={onCopy}
                className="flex items-center justify-between rounded-lg border border-midnight-ink/30 px-3 py-2 text-caption text-midnight-ink hover:bg-canvas"
              >
                Copiar resumo <span className="text-faded-stone">↗</span>
              </button>
              <Link
                href="/precos"
                onClick={() => onLockedAction("anonymous_export_attempt")}
                className="flex items-center justify-between rounded-lg border border-midnight-ink/30 px-3 py-2 text-caption text-midnight-ink hover:bg-canvas"
              >
                Pacote .zip{" "}
                <span className="text-faded-stone" aria-label="bloqueado">
                  🔒
                </span>
              </Link>
            </div>
          </Card>
        </aside>
      </div>
    </div>
  );
}

function Card({
  title,
  eyebrow,
  children,
}: {
  title: string;
  eyebrow: string;
  children: React.ReactNode;
}) {
  return (
    <section className="overflow-hidden rounded-lg border border-subtle-gray bg-crisp-white">
      <div className="flex items-center justify-between border-b border-subtle-gray px-5 py-3">
        <div>
          <p className="eyebrow text-faded-stone">
            {eyebrow}
          </p>
          <h3 className="mt-1 font-display text-body font-semibold  text-midnight-ink">
            {title}
          </h3>
        </div>
      </div>
      <div className="px-5 py-5">{children}</div>
    </section>
  );
}

function DocPreview({
  fileName,
  pageCount,
}: {
  fileName: string;
  pageCount: number | null;
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-subtle-gray bg-crisp-white">
      <div className="flex items-center justify-between border-b border-subtle-gray px-5 py-3">
        <span className="mono-label text-faded-stone">
          Documento
        </span>
        <span className="font-mono text-caption tracking-[0.06em] text-faded-stone">
          {pageCount != null ? `${pageCount} págs` : "—"}
        </span>
      </div>
      <dl className="grid gap-3 px-5 py-5 text-body-sm">
        <div className="flex items-baseline justify-between gap-3">
          <dt className="mono-label text-faded-stone">
            Arquivo
          </dt>
          <dd
            className="truncate text-right font-medium text-midnight-ink"
            title={fileName}
          >
            {fileName}
          </dd>
        </div>
        <div className="flex items-baseline justify-between gap-3">
          <dt className="mono-label text-faded-stone">
            Idioma
          </dt>
          <dd className="text-midnight-ink">pt-BR</dd>
        </div>
        <div className="flex items-baseline justify-between gap-3">
          <dt className="mono-label text-faded-stone">
            Origem
          </dt>
          <dd className="text-midnight-ink">Upload anônimo</dd>
        </div>
      </dl>
    </div>
  );
}

function Locked({
  label,
  description,
  children,
}: {
  label: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      {/* `inert` removes the blurred preview from tab order AND the a11y tree —
          required because real <button>s inside the children would otherwise
          be focusable despite the visual blur (WCAG 4.1.2). */}
      <div
        inert
        className="pointer-events-none select-none"
        style={{ filter: "blur(6px)", opacity: 0.55 }}
      >
        {children}
      </div>
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 p-card text-center">
        <span className="rounded-md border border-subtle-gray bg-canvas px-3 py-1 mono-label text-charcoal-text">
          {label}
        </span>
        <p className="max-w-sm text-body-sm text-charcoal-text">{description}</p>
        <span className="inline-flex items-center gap-2 rounded-full bg-midnight-ink px-3 py-1.5 text-caption font-medium text-crisp-white">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-apollo-gold" />
          PREMIUM · R$29/mês
        </span>
        <Link
          href="/precos"
          className="rounded-lg bg-apollo-gold px-4 py-2 text-body-sm font-medium text-midnight-ink hover:opacity-90"
        >
          Desbloquear ↗
        </Link>
      </div>
    </div>
  );
}
