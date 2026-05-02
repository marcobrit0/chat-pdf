import Link from "next/link";

import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "ChatPDF Brasil",
  description:
    "Converse com seus PDFs e extraia respostas com contexto — produto em preparação (Fase 0).",
  path: "/",
});

/**
 * Marketing homepage: hero com CTA principal em Apollo Gold (único destaque vibrante).
 */
export default function HomePage() {
  return (
    <div className="flex flex-1 flex-col">
      <section className="border-b border-subtle-gray bg-gradient-to-b from-canvas to-ash-gray">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-16 sm:px-6 md:py-24">
          <div className="max-w-3xl space-y-6">
            <h1 className="font-display text-4xl font-semibold leading-tight tracking-tight text-midnight-ink md:text-5xl lg:text-6xl">
              Converse com seus PDFs. Respostas com contexto, em português.
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-charcoal-text">
              ChatPDF Brasil está em preparação. Entre na lista de espera ou
              conheça os preços planejados — integrações de pagamento e auth
              chegam na Fase 1.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-[length:var(--radius-buttons)] bg-apollo-gold px-4 py-3 text-base font-normal text-midnight-ink transition-opacity hover:opacity-90"
            >
              Entrar na lista de espera
            </Link>
            <Link
              href="/precos"
              className="inline-flex items-center justify-center rounded-[length:var(--radius-buttons)] border border-midnight-ink px-4 py-3 text-base font-normal text-midnight-ink transition-opacity hover:opacity-80"
            >
              Ver preços
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl flex-1 px-4 py-14 sm:px-6">
        <div className="rounded-[length:var(--radius-cards)] bg-crisp-white p-6 shadow-none md:p-10">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-midnight-ink md:text-3xl">
            Apollo Gold só na ação principal
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-charcoal-text">
            O acento amarelo-esverdeado é usado apenas no CTA principal desta
            página; demais ações seguem botão secundário (contorno), conforme o
            guia Apollo em DESIGN.md.
          </p>
        </div>
      </section>
    </div>
  );
}
