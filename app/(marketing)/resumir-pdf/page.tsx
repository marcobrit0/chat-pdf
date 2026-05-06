import type { Metadata } from "next";
import Link from "next/link";

import { Breadcrumbs } from "@/components/marketing/Breadcrumbs";
import { PdfSummaryClient } from "@/components/marketing/PdfSummaryClient";
import { JsonLd, faqSchema } from "@/components/seo/JsonLd";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Resumir PDF online grátis em português — sem cadastro | PDFIA",
  description:
    "Resuma PDF em segundos, em português, sem criar conta. Tópicos, datas, valores e perguntas sugeridas — feito pra contrato, edital, laudo e relatório. Premium pra PDFs maiores e chat com o documento.",
  path: "/resumir-pdf",
});

const faqs = [
  {
    q: "Quanto custa pra resumir um PDF?",
    a: "Nada. PDF de até 10 páginas você resume sem pagar e sem criar conta. Pra PDFs maiores, chat com o documento e exportar resumo, o Premium é R$29/mês (ou R$290/ano, dá R$24/mês).",
  },
  {
    q: "O que vem no resumo grátis?",
    a: "Parágrafo de visão geral, tópicos principais, todas as datas e valores que aparecem, nomes citados (pessoas, empresas, órgãos) e perguntas que você pode fazer pra ir mais fundo no documento.",
  },
  {
    q: "Quanto tempo leva?",
    a: "Geralmente entre 5 e 20 segundos pra um PDF de até 10 páginas. Documento com texto técnico pesado pode levar um pouco mais — mas dificilmente passa de 1 minuto.",
  },
  {
    q: "Funciona com PDF digitalizado (escaneado)?",
    a: "Hoje só com texto selecionável. Se o PDF é uma foto/imagem, ele precisa passar por OCR antes. Estamos colocando OCR automático no Premium em breve.",
  },
  {
    q: "Meu PDF fica salvo onde?",
    a: "No grátis, não fica — o arquivo é processado, vira resumo e some. No Premium, o documento fica salvo na sua conta pra você voltar e perguntar mais coisas depois.",
  },
];

export default function ResumirPdfPage() {
  return (
    <>
      <JsonLd data={faqSchema(faqs)} />
      <article className="bg-canvas">
        <div className="mx-auto w-full max-w-[1240px] px-8 pt-8">
          <Breadcrumbs
            items={[
              { label: "Início", path: "/" },
              { label: "Resumir PDF", path: "/resumir-pdf" },
            ]}
          />
        </div>

        {/* Hero / state-aware client surface — design: padding 32px 32px 80px */}
        <div className="mx-auto w-full max-w-[1240px] px-8 pb-20 pt-8">
          <header className="mb-8 max-w-[760px]">
            <p className="eyebrow text-faded-stone">
              Resumo grátis · pt-BR · sem cadastro
            </p>
            <h1 className="mt-3 font-display text-[clamp(2.25rem,5vw,3.5rem)] font-semibold leading-[1.05]  text-midnight-ink">
              Resumir PDF em português, em segundos.
            </h1>
            <p className="mt-4 max-w-2xl text-body  text-charcoal-text sm:text-body-lg">
              Solte o PDF aqui embaixo. A gente devolve um resumo direto, com
              tópicos, datas, valores e nomes — pronto pra você copiar pro
              Slack, e-mail ou onde precisar.
            </p>
          </header>

          <PdfSummaryClient />
        </div>

        {/* FAQ + see also */}
        <div className="border-t border-subtle-gray bg-canvas">
          <div className="container-page py-section-md">
            <div className="grid gap-16 md:grid-cols-[0.9fr_1.1fr]">
              <div>
                <p className="eyebrow text-faded-stone">
                  Perguntas frequentes
                </p>
                <h2 className="mt-4 font-display text-heading-lg font-semibold text-midnight-ink text-[clamp(28px,4vw,40px)]">
                  Sobre o resumo gratuito
                </h2>
              </div>
              <div className="overflow-hidden rounded-lg border border-subtle-gray bg-crisp-white">
                {faqs.map((f, i) => (
                  <details
                    key={f.q}
                    className={
                      "group [&_summary::-webkit-details-marker]:hidden " +
                      (i < faqs.length - 1 ? "border-b border-subtle-gray" : "")
                    }
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-6 px-5 py-5 text-left group-open:bg-canvas">
                      <span className="font-display text-body font-semibold  text-midnight-ink">
                        {f.q}
                      </span>
                      <span
                        aria-hidden="true"
                        className="font-mono text-faded-stone transition-transform group-open:rotate-45"
                      >
                        +
                      </span>
                    </summary>
                    <div className="px-5 pb-5 text-body-sm  text-charcoal-text">
                      {f.a}
                    </div>
                  </details>
                ))}
              </div>
            </div>

            <div className="mt-12 border-t border-subtle-gray pt-8">
              <p className="eyebrow text-faded-stone">
                Veja também
              </p>
              <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-body-sm">
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
