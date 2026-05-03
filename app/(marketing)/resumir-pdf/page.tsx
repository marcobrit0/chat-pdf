import type { Metadata } from "next";
import Link from "next/link";

import { AnonymousSummaryFlow } from "@/components/marketing/AnonymousSummaryFlow";
import { Breadcrumbs } from "@/components/marketing/Breadcrumbs";
import { JsonLd, faqSchema } from "@/components/seo/JsonLd";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Resumir PDF online em português — grátis e sem cadastro",
  description:
    "Resuma PDFs de até 10 páginas em segundos: tópicos, datas, entidades e perguntas sugeridas, em português. Sem cadastro. Premium para arquivos grandes.",
  path: "/resumir-pdf",
});

const faqs = [
  {
    q: "Quanto custa para resumir um PDF?",
    a: "Nada. PDFs de até 10 páginas são resumidos gratuitamente, sem cadastro. Para PDFs maiores, chat com o documento e exportações organizadas, o Premium é R$29/mês ou R$290/ano.",
  },
  {
    q: "O que vem no resumo gratuito?",
    a: "Um parágrafo-síntese, tópicos principais, datas e valores encontrados no texto, entidades citadas (pessoas, empresas, locais) e perguntas de follow-up sugeridas para você aprofundar.",
  },
  {
    q: "Quanto tempo demora?",
    a: "Em geral, entre 5 e 20 segundos para um PDF de até 10 páginas. Documentos com muito texto técnico podem levar um pouco mais.",
  },
  {
    q: "Funciona com PDFs digitalizados?",
    a: "Hoje precisamos de PDFs com texto selecionável. Documentos puramente em imagem precisam de OCR antes — está no roadmap.",
  },
  {
    q: "Meu PDF fica salvo no servidor?",
    a: "Não no plano gratuito. O arquivo é processado e descartado depois do resumo. No Premium o documento fica vinculado à sua conta para você voltar e fazer mais perguntas.",
  },
];

const sampleSummary = {
  title: "Exemplo: Resumo de um contrato de prestação de serviços",
  paragraph:
    "Contrato firmado entre a Beta Consultoria Ltda. e a empresa contratante para desenvolvimento de plataforma web, com prazo de 90 dias, valor total de R$ 48.000,00 em três parcelas mensais e cláusula de confidencialidade vigente por 24 meses após o término.",
  bullets: [
    "Objeto: desenvolvimento de plataforma web responsiva com painel administrativo.",
    "Prazo total: 90 dias contados a partir da assinatura, com 3 entregas marco.",
    "Pagamento: R$ 16.000 mensais via boleto, com vencimento todo dia 10.",
    "Multa por atraso: 2% sobre o valor do mês mais juros de 1% ao mês.",
    "Confidencialidade: 24 meses após o encerramento do contrato.",
  ],
  dates: [
    "Início: a partir da assinatura",
    "Parcela 1: 10/06",
    "Parcela 2: 10/07",
    "Parcela 3: 10/08",
  ],
  entities: ["Beta Consultoria Ltda.", "CONTRATANTE", "Foro de São Paulo/SP"],
};

export default function ResumirPdfPage() {
  return (
    <>
      <JsonLd data={faqSchema(faqs)} />
      <article className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 md:py-14">
        <Breadcrumbs
          items={[
            { label: "Início", path: "/" },
            { label: "Resumir PDF", path: "/resumir-pdf" },
          ]}
        />

        <header className="mt-6 max-w-3xl">
          <h1 className="font-display text-[clamp(2.25rem,5vw,3.5rem)] font-semibold leading-[1.05] tracking-tight text-midnight-ink">
            Resumir PDF online — em português, sem cadastro.
          </h1>
          <p className="mt-5 text-base leading-relaxed text-charcoal-text sm:text-lg">
            Cole um PDF de até 10 páginas e receba um resumo estruturado em
            segundos: parágrafo-síntese, tópicos, datas, valores, entidades e
            perguntas sugeridas. Sem cadastro. Sem pegadinha.
          </p>
        </header>

        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">
          <section>
            <AnonymousSummaryFlow />
          </section>

          <aside className="space-y-6">
            <div className="rounded-[length:var(--radius-cards)] border border-subtle-gray bg-crisp-white p-6">
              <p className="font-condensed text-xs uppercase tracking-[0.2em] text-faded-stone">
                Exemplo do que você recebe
              </p>
              <h2 className="mt-3 font-display text-lg font-semibold leading-snug text-midnight-ink">
                {sampleSummary.title}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-charcoal-text">
                {sampleSummary.paragraph}
              </p>

              <div className="mt-5">
                <p className="font-condensed text-xs uppercase tracking-[0.18em] text-faded-stone">
                  Em tópicos
                </p>
                <ul className="mt-2 space-y-2 text-sm leading-relaxed text-charcoal-text">
                  {sampleSummary.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-2 inline-block h-px w-2 shrink-0 bg-faded-stone"
                      />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-5 grid gap-4 border-t border-subtle-gray pt-5 sm:grid-cols-2">
                <div>
                  <p className="font-condensed text-xs uppercase tracking-[0.18em] text-faded-stone">
                    Datas e valores
                  </p>
                  <ul className="mt-2 space-y-1 text-sm text-charcoal-text">
                    {sampleSummary.dates.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="font-condensed text-xs uppercase tracking-[0.18em] text-faded-stone">
                    Entidades
                  </p>
                  <ul className="mt-2 space-y-1 text-sm text-charcoal-text">
                    {sampleSummary.entities.map((e) => (
                      <li key={e}>{e}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="rounded-[length:var(--radius-cards)] border border-midnight-ink bg-midnight-ink p-6 text-crisp-white">
              <p className="font-condensed text-xs uppercase tracking-[0.2em] text-apollo-gold">
                Precisa de mais?
              </p>
              <h2 className="mt-3 font-display text-xl font-semibold leading-snug">
                Chat com o documento, citação por página, PDFs até 100 páginas.
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-subtle-gray">
                Premium é R$29/mês ou R$290/ano (economia de R$58). Sem taxa de
                cancelamento.
              </p>
              <Link
                href="/precos"
                className="mt-5 inline-flex items-center justify-center rounded-[length:var(--radius-buttons)] bg-apollo-gold px-5 py-3 text-sm font-medium text-midnight-ink"
              >
                Ver planos Premium
              </Link>
            </div>
          </aside>
        </div>

        <section className="mt-20 grid gap-10 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div>
            <p className="font-condensed text-xs uppercase tracking-[0.22em] text-faded-stone">
              Perguntas frequentes
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-midnight-ink">
              Sobre o resumo gratuito
            </h2>
          </div>
          <dl className="divide-y divide-subtle-gray border-y border-subtle-gray">
            {faqs.map((f) => (
              <details
                key={f.q}
                className="group py-5 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6">
                  <dt className="font-display text-lg font-semibold text-midnight-ink">
                    {f.q}
                  </dt>
                  <span
                    aria-hidden="true"
                    className="mt-1 font-condensed text-faded-stone transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <dd className="mt-3 max-w-2xl text-base leading-relaxed text-charcoal-text">
                  {f.a}
                </dd>
              </details>
            ))}
          </dl>
        </section>

        <section className="mt-16 border-t border-subtle-gray pt-10">
          <p className="font-condensed text-xs uppercase tracking-[0.2em] text-faded-stone">
            Veja também
          </p>
          <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <li>
              <Link
                href="/chat-pdf"
                className="text-midnight-ink underline underline-offset-4"
              >
                Chat com PDF
              </Link>
            </li>
            <li>
              <Link
                href="/resumir-contrato-pdf"
                className="text-midnight-ink underline underline-offset-4"
              >
                Resumir contrato
              </Link>
            </li>
            <li>
              <Link
                href="/resumir-edital-de-licitacao"
                className="text-midnight-ink underline underline-offset-4"
              >
                Resumir edital
              </Link>
            </li>
            <li>
              <Link
                href="/resumir-relatorio-pdf"
                className="text-midnight-ink underline underline-offset-4"
              >
                Resumir relatório
              </Link>
            </li>
            <li>
              <Link
                href="/ia-para-resumir-pdf"
                className="text-midnight-ink underline underline-offset-4"
              >
                IA para resumir PDF
              </Link>
            </li>
          </ul>
        </section>
      </article>
    </>
  );
}
