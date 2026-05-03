import Link from "next/link";

import { Breadcrumbs } from "@/components/marketing/Breadcrumbs";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Guias e tutoriais — PDFIA",
  description:
    "Guias práticos sobre como resumir, ler e analisar PDFs com IA em português. Casos de uso reais para contratos, editais, apólices e relatórios.",
  path: "/guias",
});

const PUBLISHED = [
  {
    href: "/guias/como-resumir-pdf-com-ia",
    title: "Como resumir PDF com IA",
    blurb:
      "Passo a passo: do upload anônimo ao Premium com chat e citação de página.",
  },
] as const;

/**
 * Topic clusters that double as use-case landing pages — keeps internal links
 * dense even while the long-form guides backlog catches up.
 */
const TOPIC_CLUSTERS = [
  {
    cluster: "Contratos",
    items: [
      { href: "/analisar-contrato-clt", label: "Analisar contrato CLT" },
      { href: "/resumir-contrato-pdf", label: "Resumir contrato em PDF" },
      { href: "/analisar-contrato-com-ia", label: "Analisar contrato com IA" },
      {
        href: "/analisar-contrato-de-prestacao-de-servicos",
        label: "Contrato de prestação de serviços",
      },
    ],
  },
  {
    cluster: "Licitações e propostas",
    items: [
      { href: "/ler-edital-com-ia", label: "Ler edital com IA" },
      { href: "/resumir-edital-de-licitacao", label: "Resumir edital" },
      { href: "/analisar-proposta-comercial", label: "Analisar proposta comercial" },
    ],
  },
  {
    cluster: "Seguros e saúde",
    items: [
      { href: "/analisar-apolice-de-seguro", label: "Analisar apólice de seguro" },
      { href: "/entender-laudo-medico", label: "Entender laudo médico" },
    ],
  },
  {
    cluster: "Negócios e finanças",
    items: [
      { href: "/resumir-relatorio-pdf", label: "Resumir relatório" },
      { href: "/resumir-boleto-ou-fatura", label: "Resumir boleto ou fatura" },
      { href: "/comparar-pdfs", label: "Comparar dois PDFs" },
    ],
  },
];

export default function GuiasIndexPage() {
  return (
    <article className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 md:py-14">
      <Breadcrumbs
        items={[
          { label: "Início", path: "/" },
          { label: "Guias", path: "/guias" },
        ]}
      />

      <header className="mt-6 max-w-3xl">
        <p className="font-condensed text-xs uppercase tracking-[0.22em] text-faded-stone">
          Guias e tutoriais
        </p>
        <h1 className="mt-3 font-display text-[clamp(2.25rem,5vw,3.5rem)] font-semibold leading-[1.05] tracking-tight text-midnight-ink">
          Como tirar o máximo do PDFIA.
        </h1>
        <p className="mt-5 text-base leading-relaxed text-charcoal-text sm:text-lg">
          Tutoriais práticos sobre IA para PDFs em português, organizados por
          tipo de documento. Novos guias entram conforme o produto evolui.
        </p>
      </header>

      <section className="mt-12">
        <h2 className="font-display text-2xl font-semibold text-midnight-ink">
          Guias publicados
        </h2>
        <ul className="mt-6 grid gap-px overflow-hidden border border-subtle-gray bg-subtle-gray sm:grid-cols-2">
          {PUBLISHED.map((g) => (
            <li key={g.href} className="bg-canvas">
              <Link
                href={g.href}
                className="group flex h-full flex-col gap-4 p-6 transition-colors hover:bg-crisp-white"
              >
                <h3 className="font-display text-xl font-semibold text-midnight-ink">
                  {g.title}
                </h3>
                <p className="text-sm leading-relaxed text-charcoal-text">
                  {g.blurb}
                </p>
                <span className="mt-auto inline-flex items-center gap-2 text-sm font-medium text-midnight-ink">
                  Ler guia
                  <span
                    aria-hidden="true"
                    className="transition-transform group-hover:translate-x-0.5"
                  >
                    →
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-16">
        <h2 className="font-display text-2xl font-semibold text-midnight-ink">
          Por tipo de documento
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-charcoal-text">
          Cada caso de uso tem uma página dedicada com explicação, FAQ e
          upload direto. Comece pelo que se parece com o seu PDF.
        </p>
        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {TOPIC_CLUSTERS.map((c) => (
            <nav key={c.cluster} aria-label={c.cluster}>
              <p className="font-condensed text-xs uppercase tracking-[0.2em] text-faded-stone">
                {c.cluster}
              </p>
              <ul className="mt-3 space-y-2 text-sm">
                {c.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-charcoal-text underline-offset-4 hover:underline"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </section>

      <section className="mt-16 rounded-[length:var(--radius-cards)] border border-midnight-ink bg-canvas p-8">
        <p className="font-condensed text-xs uppercase tracking-[0.22em] text-faded-stone">
          Pronto para começar?
        </p>
        <h2 className="mt-3 font-display text-2xl font-semibold text-midnight-ink">
          Resumo grátis sem cadastro para PDFs até 10 páginas.
        </h2>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/resumir-pdf"
            className="inline-flex items-center justify-center rounded-[length:var(--radius-buttons)] bg-apollo-gold px-5 py-3 text-base font-medium text-midnight-ink"
          >
            Resumir PDF grátis
          </Link>
          <Link
            href="/precos"
            className="inline-flex items-center justify-center rounded-[length:var(--radius-buttons)] border border-midnight-ink px-5 py-3 text-base font-medium text-midnight-ink"
          >
            Ver Premium
          </Link>
        </div>
      </section>
    </article>
  );
}
