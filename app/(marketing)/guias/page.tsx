import Link from "next/link";

import { Breadcrumbs } from "@/components/marketing/Breadcrumbs";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Guias práticos: como usar IA pra ler PDF em português | PDFIA",
  description:
    "Tutoriais diretos pra resumir, ler e analisar PDF com IA em português. Casos reais pra contrato, edital, apólice, laudo, boleto e relatório — escritos pra quem precisa resolver, não pra quem quer estudar.",
  path: "/guias",
});

const PUBLISHED = [
  {
    href: "/guias/como-resumir-pdf-com-ia",
    title: "Como resumir PDF com IA",
    blurb:
      "Passo a passo: do upload anônimo ao Premium com chat e citação de página.",
    minutes: 10,
  },
  {
    href: "/guias/como-ler-edital-de-licitacao",
    title: "Como ler edital de licitação",
    blurb:
      "Triagem em 10 minutos: objeto, prazos, habilitação, julgamento e penalidades.",
    minutes: 10,
  },
  {
    href: "/guias/como-analisar-contrato-clt",
    title: "Como analisar contrato CLT antes de assinar",
    blurb:
      "Ordem certa de leitura, o que costuma surpreender e o que ainda dá pra negociar.",
    minutes: 10,
  },
  {
    href: "/guias/como-entender-apolice-de-seguro",
    title: "Como entender uma apólice de seguro",
    blurb:
      "Coberturas, exclusões, carência, franquia — leia antes de precisar acionar.",
    minutes: 10,
  },
  {
    href: "/guias/como-entender-laudo-medico",
    title: "Como entender laudo médico em português",
    blurb:
      "Decifre termos técnicos com calma e prepare a próxima conversa com o(a) profissional.",
    minutes: 10,
  },
  {
    href: "/guias/como-conferir-boleto-antes-de-pagar",
    title: "Como conferir um boleto antes de pagar",
    blurb:
      "Checklist anti-fraude: beneficiário, código de barras, valor, vencimento.",
    minutes: 8,
  },
  {
    href: "/guias/comparar-versoes-de-pdf",
    title: "Como comparar duas versões de um PDF",
    blurb:
      "Manual, ferramenta de diff ou IA — qual usar em contrato, edital ou apólice.",
    minutes: 9,
  },
  {
    href: "/guias/ocr-para-pdf",
    title: "OCR para PDF — quando precisa, como funciona",
    blurb:
      "Saiba se seu PDF tem texto, ferramentas de OCR e cuidados ao misturar OCR com IA.",
    minutes: 9,
  },
  {
    href: "/guias/pdf-protegido-por-senha",
    title: "PDF protegido por senha — o que dá pra fazer",
    blurb:
      "Tipos de proteção, como abrir o que é seu e por que IA não processa PDF com senha.",
    minutes: 8,
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
        <p className="eyebrow text-faded-stone">
          Guias e tutoriais
        </p>
        <h1 className="mt-3 font-display text-[clamp(2.25rem,5vw,3.5rem)] font-semibold leading-[1.05]  text-midnight-ink">
          Como tirar mais do PDFIA, sem perder tempo.
        </h1>
        <p className="mt-5 text-body  text-charcoal-text sm:text-body-lg">
          Tutoriais práticos sobre IA pra PDF em português, organizados por
          tipo de documento. Escritos pra quem tá resolvendo um problema agora,
          não pra quem quer estudar IA.
        </p>
      </header>

      <section className="mt-12">
        <h2 className="font-display text-heading font-semibold text-midnight-ink">
          Guias publicados
        </h2>
        <ul className="mt-6 grid gap-px overflow-hidden border border-subtle-gray bg-subtle-gray sm:grid-cols-2 lg:grid-cols-3">
          {PUBLISHED.map((g) => (
            <li key={g.href} className="bg-canvas">
              <Link
                href={g.href}
                className="group flex h-full flex-col gap-4 p-6 transition-colors hover:bg-crisp-white"
              >
                <p className="eyebrow text-faded-stone">
                  ~{g.minutes} min
                </p>
                <h3 className="font-display text-subheading font-semibold text-midnight-ink">
                  {g.title}
                </h3>
                <p className="text-body-sm  text-charcoal-text">
                  {g.blurb}
                </p>
                <span className="mt-auto inline-flex items-center gap-2 text-body-sm font-medium text-midnight-ink">
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
        <h2 className="font-display text-heading font-semibold text-midnight-ink">
          Por tipo de PDF
        </h2>
        <p className="mt-3 max-w-2xl text-body  text-charcoal-text">
          Cada caso de uso tem página dedicada com explicação, FAQ e upload
          direto. Começa pelo que se parece com o seu documento.
        </p>
        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {TOPIC_CLUSTERS.map((c) => (
            <nav key={c.cluster} aria-label={c.cluster}>
              <p className="eyebrow text-faded-stone">
                {c.cluster}
              </p>
              <ul className="mt-3 space-y-2 text-body-sm">
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

      <section className="mt-16 rounded-lg border border-midnight-ink bg-canvas p-8">
        <p className="eyebrow text-faded-stone">
          Pra começar agora
        </p>
        <h2 className="mt-3 font-display text-heading font-semibold text-midnight-ink">
          Resumo grátis, sem cadastro, pra PDF de até 10 páginas.
        </h2>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/resumir-pdf"
            className="inline-flex items-center justify-center rounded-lg bg-apollo-gold px-5 py-3 text-body font-medium text-midnight-ink"
          >
            Resumir PDF grátis
          </Link>
          <Link
            href="/precos"
            className="inline-flex items-center justify-center rounded-lg border border-midnight-ink px-5 py-3 text-body font-medium text-midnight-ink"
          >
            Ver o Premium
          </Link>
        </div>
      </section>
    </article>
  );
}
