"use client";

import { useEffect, useState } from "react";

const PHASES = [
  { key: "read", label: "Lendo o PDF", detail: "Extraindo o texto que dá pra processar" },
  { key: "structure", label: "Identificando o que importa", detail: "Datas, valores, nomes e cláusulas" },
  { key: "compose", label: "Montando o resumo", detail: "Tópicos, perguntas sugeridas e estrutura" },
] as const;

type Props = {
  fileName: string | null;
  pageHint?: number | null;
};

/**
 * Beautiful upload-progress surface shown while /api/summarize/anonymous runs.
 * Cycles through narrative phases so a multi-second wait feels intentional.
 */
export function PdfLoadingAnimation({ fileName, pageHint }: Props) {
  const [phase, setPhase] = useState(0);
  const [pct, setPct] = useState(8);

  useEffect(() => {
    const phaseTimer = setInterval(() => {
      setPhase((p) => (p + 1) % PHASES.length);
    }, 2200);
    return () => clearInterval(phaseTimer);
  }, []);

  useEffect(() => {
    let raf = 0;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      // Asymptotic progress: never reaches 100, slows as it goes — feels honest.
      const next = Math.min(94, 8 + (1 - Math.exp(-elapsed / 6000)) * 92);
      setPct(next);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section className="relative overflow-hidden rounded-lg border border-midnight-ink bg-crisp-white">
      <div className="grid gap-0 md:grid-cols-[minmax(0,260px)_1fr]">
        {/* Stylized document silhouette + scan animation while the API runs. */}
        <div className="relative border-b border-subtle-gray bg-canvas p-6 md:border-b-0 md:border-r">
          <div className="relative mx-auto aspect-[0.77/1] w-full max-w-[200px] overflow-hidden border border-subtle-gray bg-crisp-white shadow-[0_1px_0_var(--color-subtle-gray)]">
            <div className="space-y-1.5 px-3 pt-3 font-mono text-[6px] leading-[1.5] text-faded-stone">
              <div className="mb-1.5 text-[7px] font-bold text-midnight-ink">
                CONTRATO
              </div>
              {Array.from({ length: 20 }).map((_, i) => (
                <div
                  key={i}
                  className="h-[3px]"
                  style={{
                    background:
                      i % 6 === 0 ? "var(--color-midnight-ink)" : "var(--color-subtle-gray)",
                    width: `${55 + ((i * 17) % 40)}%`,
                  }}
                />
              ))}
            </div>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 h-12"
              style={{
                animation: "pdfia-scan 2.4s cubic-bezier(.4,.0,.2,1) infinite",
                background:
                  "linear-gradient(180deg, transparent 0%, rgba(235,242,18,0.55) 50%, transparent 100%)",
                boxShadow: "0 0 12px rgba(235,242,18,0.45)",
              }}
            />
          </div>

          <p className="mt-4 truncate text-center mono-label text-faded-stone">
            {fileName ?? "PDF.pdf"}
          </p>
          {pageHint ? (
            <p className="text-center font-mono text-caption tracking-[0.06em] text-faded-stone">
              {pageHint} págs · processando
            </p>
          ) : null}
        </div>

        {/* Phases + progress */}
        <div className="p-7 md:p-9">
          <p className="eyebrow text-faded-stone">
            Gerando seu resumo
          </p>
          <h2 className="mt-3 font-display text-heading font-semibold text-midnight-ink">
            Lendo seu PDF — não vai demorar.
          </h2>

          <ol className="mt-7 space-y-4">
            {PHASES.map((p, i) => {
              const state =
                i < phase ? "done" : i === phase ? "active" : "pending";
              return (
                <li
                  key={p.key}
                  className="grid grid-cols-[28px_1fr_auto] items-baseline gap-3"
                >
                  <span
                    aria-hidden="true"
                    className={
                      "mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full border text-[10px] font-mono " +
                      (state === "done"
                        ? "border-midnight-ink bg-midnight-ink text-apollo-gold"
                        : state === "active"
                          ? "border-midnight-ink bg-apollo-gold text-midnight-ink"
                          : "border-subtle-gray bg-canvas text-faded-stone")
                    }
                  >
                    {state === "done" ? "✓" : i + 1}
                  </span>
                  <div>
                    <p
                      className={
                        "font-display text-body-sm font-semibold  " +
                        (state === "pending"
                          ? "text-faded-stone"
                          : "text-midnight-ink")
                      }
                    >
                      {p.label}
                      {state === "active" ? (
                        <span aria-hidden="true" className="pdfia-dots">
                          <span>·</span>
                          <span>·</span>
                          <span>·</span>
                        </span>
                      ) : null}
                    </p>
                    <p className="mt-0.5 text-body-sm leading-snug text-charcoal-text">
                      {p.detail}
                    </p>
                  </div>
                  <span
                    className={
                      "mono-label " +
                      (state === "active"
                        ? "text-midnight-ink"
                        : "text-faded-stone")
                    }
                  >
                    {state === "done"
                      ? "ok"
                      : state === "active"
                        ? "agora"
                        : "—"}
                  </span>
                </li>
              );
            })}
          </ol>

          <div className="mt-8">
            <div
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(pct)}
              className="relative h-1 w-full overflow-hidden rounded-full bg-subtle-gray"
            >
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-midnight-ink transition-[width] duration-150 ease-out"
                style={{ width: `${pct}%` }}
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 -translate-x-full"
                style={{
                  width: 80,
                  background:
                    "linear-gradient(90deg, transparent, rgba(235,242,18,0.7), transparent)",
                  animation: "pdfia-shimmer 1.4s linear infinite",
                }}
              />
            </div>
            <div className="mt-2 flex items-center justify-between mono-label text-faded-stone">
              <span>Sem cadastro · pt-BR</span>
              <span>{Math.round(pct)}%</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pdfia-scan {
          0%   { top: -10%; opacity: 0; }
          15%  { opacity: 1; }
          85%  { opacity: 1; }
          100% { top: 110%; opacity: 0; }
        }
        @keyframes pdfia-shimmer {
          0%   { transform: translateX(0); }
          100% { transform: translateX(calc(100vw + 80px)); }
        }
        .pdfia-dots span {
          display: inline-block;
          margin-left: 1px;
          opacity: 0.25;
          animation: pdfia-dot 1.2s linear infinite;
          color: var(--color-faded-stone);
        }
        .pdfia-dots span:nth-child(2) { animation-delay: 0.15s; }
        .pdfia-dots span:nth-child(3) { animation-delay: 0.3s; }
        @keyframes pdfia-dot {
          0%, 80%, 100% { opacity: 0.2; }
          40% { opacity: 1; }
        }
      `}</style>
    </section>
  );
}
