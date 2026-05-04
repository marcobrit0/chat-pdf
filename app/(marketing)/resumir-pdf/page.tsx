import type { Metadata } from "next";
import Link from "next/link";

import { Breadcrumbs } from "@/components/marketing/Breadcrumbs";
import { PdfSummaryClient } from "@/components/marketing/PdfSummaryClient";
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

export default function ResumirPdfPage() {
  return (
    <>
      <JsonLd data={faqSchema(faqs)} />
      <article className="bg-canvas">
        <div className="mx-auto w-full max-w-6xl px-4 pt-8 sm:px-6">
          <Breadcrumbs
            items={[
              { label: "Início", path: "/" },
              { label: "Resumir PDF", path: "/resumir-pdf" },
            ]}
          />
        </div>

        {/* Hero / state-aware client surface */}
        <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 md:py-12">
          <header className="mb-8 max-w-3xl">
            <p className="font-condensed text-[11px] uppercase tracking-[0.22em] text-faded-stone">
              Resumo grátis · pt-BR · sem cadastro
            </p>
            <h1 className="mt-3 font-display text-[clamp(2.25rem,5vw,3.5rem)] font-semibold leading-[1.05] tracking-tight text-midnight-ink">
              Seu PDF, resumido em segundos.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-charcoal-text sm:text-lg">
              Parágrafo-síntese, tópicos, datas, valores e entidades — extraídos
              do documento e prontos para colar.
            </p>
          </header>

          <PdfSummaryClient />
        </div>

        {/* FAQ + see also */}
        <div className="border-t border-subtle-gray bg-canvas">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 md:py-20">
            <div className="grid gap-12 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
              <div>
                <p className="font-condensed text-[11px] uppercase tracking-[0.22em] text-faded-stone">
                  Perguntas frequentes
                </p>
                <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-midnight-ink">
                  Sobre o resumo gratuito
                </h2>
              </div>
              <div className="overflow-hidden rounded-[length:var(--radius-cards)] border border-subtle-gray bg-crisp-white">
                {faqs.map((f, i) => (
                  <details
                    key={f.q}
                    className={
                      "group [&_summary::-webkit-details-marker]:hidden " +
                      (i < faqs.length - 1 ? "border-b border-subtle-gray" : "")
                    }
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-6 px-5 py-5 text-left group-open:bg-canvas">
                      <span className="font-display text-base font-semibold tracking-tight text-midnight-ink">
                        {f.q}
                      </span>
                      <span
                        aria-hidden="true"
                        className="font-mono text-faded-stone transition-transform group-open:rotate-45"
                      >
                        +
                      </span>
                    </summary>
                    <div className="px-5 pb-5 text-sm leading-relaxed text-charcoal-text">
                      {f.a}
                    </div>
                  </details>
                ))}
              </div>
            </div>

            <div className="mt-12 border-t border-subtle-gray pt-8">
              <p className="font-condensed text-[11px] uppercase tracking-[0.22em] text-faded-stone">
                Veja também
              </p>
              <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm">
                {[
                  ["/chat-pdf", "Chat com PDF"],
                  ["/resumir-contrato-pdf", "Resumir contrato"],
                  ["/resumir-edital-de-licitacao", "Resumir edital"],
                  ["/resumir-relatorio-pdf", "Resumir relatório"],
                  ["/ia-para-resumir-pdf", "IA para resumir PDF"],
                ].map(([href, label]) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-midnight-ink underline underline-offset-4"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
