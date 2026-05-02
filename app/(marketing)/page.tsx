import Link from "next/link";

import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "ChatPDF Brasil",
  description:
    "Resuma PDFs grátis e converse com documentos no workspace Premium do ChatPDF Brasil.",
  path: "/",
});

const proofPoints = [
  "Resumo grátis para PDFs curtos",
  "Workspace Premium com chat e citações",
  "Feito em português do Brasil",
] as const;

const flowSteps = [
  { label: "01", title: "Envie", body: "Solte um PDF com texto selecionável." },
  { label: "02", title: "Leia", body: "Receba tópicos, datas, entidades e perguntas." },
  { label: "03", title: "Pergunte", body: "No Premium, aprofunde com respostas citadas por página." },
] as const;

/**
 * Marketing homepage: entry point for the live product, not a waitlist.
 */
export default function HomePage() {
  return (
    <div className="flex flex-1 flex-col">
      <section className="overflow-hidden border-b border-subtle-gray bg-canvas">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-10 sm:px-6 md:grid-cols-[minmax(0,1.05fr)_minmax(280px,0.95fr)] md:items-end md:py-20">
          <div className="space-y-7">
            <p className="inline-flex rounded-full border border-midnight-ink px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-midnight-ink">
              App no ar
            </p>
            <div className="space-y-5">
              <h1 className="font-display text-[clamp(2.75rem,10vw,5.75rem)] font-semibold leading-[1.02] tracking-tight text-midnight-ink">
                Leia PDFs sem esforço.
              </h1>
              <p className="max-w-xl text-base leading-relaxed text-charcoal-text sm:text-lg">
                Comece pelo resumo gratuito. Quando precisar ir fundo, entre no workspace para conversar com o PDF e ver as páginas usadas na resposta.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/resumir-pdf"
                className="inline-flex items-center justify-center rounded-[length:var(--radius-buttons)] bg-apollo-gold px-5 py-3 text-base font-medium text-midnight-ink transition-transform hover:-translate-y-0.5"
              >
                Resumir PDF grátis
              </Link>
              <Link
                href="/app"
                className="inline-flex items-center justify-center rounded-[length:var(--radius-buttons)] border border-midnight-ink px-5 py-3 text-base font-medium text-midnight-ink transition-transform hover:-translate-y-0.5"
              >
                Entrar no app
              </Link>
            </div>
            <ul className="grid gap-2 text-sm text-faded-stone sm:grid-cols-3">
              {proofPoints.map((point) => (
                <li key={point} className="border-t border-subtle-gray pt-3">
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-apollo-gold blur-3xl" />
            <div className="relative border border-midnight-ink bg-crisp-white p-4 shadow-[10px_10px_0_#000] sm:p-6">
              <div className="border-b border-subtle-gray pb-5">
                <p className="font-condensed text-xs uppercase tracking-[0.22em] text-faded-stone">
                  Fluxo real
                </p>
                <p className="mt-3 font-display text-3xl font-semibold leading-none text-midnight-ink">
                  PDF → resumo → perguntas com fonte
                </p>
              </div>
              <div className="divide-y divide-subtle-gray">
                {flowSteps.map((step) => (
                  <div key={step.label} className="grid grid-cols-[44px_1fr] gap-4 py-5">
                    <span className="font-condensed text-sm text-faded-stone">{step.label}</span>
                    <div>
                      <h2 className="font-display text-xl font-semibold text-midnight-ink">
                        {step.title}
                      </h2>
                      <p className="mt-1 text-sm leading-relaxed text-charcoal-text">
                        {step.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-12 sm:px-6 md:grid-cols-3 md:py-16">
        <h2 className="font-display text-3xl font-semibold leading-tight text-midnight-ink md:col-span-1">
          Use para contratos, editais, laudos e apostilas.
        </h2>
        <div className="space-y-4 text-base leading-relaxed text-charcoal-text md:col-span-2">
          <p>
            O primeiro passo é rápido: envie um PDF curto e receba um resumo sem cadastro. Para documentos grandes, histórico e chat com citações, entre no workspace Premium.
          </p>
          <Link href="/precos" className="inline-flex text-sm font-medium text-midnight-ink underline underline-offset-4">
            Ver limites e planos
          </Link>
        </div>
      </section>
    </div>
  );
}
