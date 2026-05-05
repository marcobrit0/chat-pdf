import Link from "next/link";

import { Breadcrumbs } from "@/components/marketing/Breadcrumbs";
import { CheckoutButton } from "@/components/marketing/CheckoutButton";
import { JsonLd, faqSchema, productSchema } from "@/components/seo/JsonLd";
import { absoluteUrl, buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Preços do PDFIA — grátis ou Premium R$29/mês",
  description:
    "Resumo gratuito sem cadastro. Premium a partir de R$29/mês: chat com citação de página, PDFs até 100 páginas e modos de análise para contratos, editais e apólices.",
  path: "/precos",
});

const planFeatures = [
  {
    label: "Resumo de PDF",
    free: "Até 10 páginas, 1 por dia",
    premium: "Até 100 páginas, ilimitado",
  },
  {
    label: "Tópicos, datas, entidades",
    free: "Sim",
    premium: "Sim, com mais profundidade",
  },
  {
    label: "Chat com o documento",
    free: "—",
    premium: "Respostas com citação de página",
  },
  {
    label: "Modos especializados",
    free: "—",
    premium: "Contrato CLT, edital, apólice, laudo",
  },
  {
    label: "Histórico de documentos",
    free: "—",
    premium: "Salvo na conta",
  },
  {
    label: "Exportar pacote organizado",
    free: "—",
    premium: "PDF + Markdown",
  },
  {
    label: "Aviso quando não está no PDF",
    free: "Sim",
    premium: "Sim",
  },
];

const competitorComparison = [
  {
    label: "Plano gratuito",
    you: "Sim, sem cadastro",
    chatgpt: "Limitado, exige conta",
    smallpdf: "Limitado",
    adobe: "Não",
  },
  {
    label: "Citação de página",
    you: "Padrão",
    chatgpt: "Só sob pedido",
    smallpdf: "—",
    adobe: "Em alguns recursos",
  },
  {
    label: "Pagamento em BRL",
    you: "Sim (R$29/mês)",
    chatgpt: "Não (USD)",
    smallpdf: "Sim",
    adobe: "Sim",
  },
  {
    label: "Foco em PDFs em PT-BR",
    you: "Sim",
    chatgpt: "Genérico",
    smallpdf: "Edição de PDF",
    adobe: "Genérico",
  },
];

const faqs = [
  {
    q: "Posso cancelar a qualquer momento?",
    a: "Sim. O Premium pode ser cancelado direto na sua conta sem taxa de cancelamento. O acesso continua até o fim do período pago.",
  },
  {
    q: "O plano anual tem desconto?",
    a: "Sim. R$290/ano equivale a R$24,17/mês — economia de R$58 frente ao mensal.",
  },
  {
    q: "Quais formas de pagamento vocês aceitam?",
    a: "Cartão de crédito (Visa, Mastercard, American Express, Elo) via Stripe. Pagamento seguro, sem armazenamento de dados de cartão na nossa infraestrutura.",
  },
  {
    q: "Vocês emitem nota fiscal?",
    a: "Sim, sob pedido. Após o pagamento, fale conosco com o CNPJ e o recibo do Stripe.",
  },
  {
    q: "Posso usar o Premium em mais de um computador?",
    a: "Sim. A conta é pessoal e funciona em qualquer dispositivo via login com link mágico.",
  },
  {
    q: "Vocês têm reembolso?",
    a: "Sim, dentro de 7 dias após a contratação, conforme o Código de Defesa do Consumidor para serviços contratados online.",
  },
  {
    q: "O que acontece com meus PDFs depois que eu cancelo?",
    a: "Você mantém acesso de leitura até o fim do período pago. Depois disso, os documentos ficam arquivados por 30 dias antes de serem excluídos definitivamente.",
  },
];

export default function PrecosPage() {
  const monthly = process.env.NEXT_PUBLIC_STRIPE_PRICE_MONTHLY ?? "";
  const yearly = process.env.NEXT_PUBLIC_STRIPE_PRICE_YEARLY ?? "";

  return (
    <>
      <JsonLd
        data={productSchema({
          name: "PDFIA Premium",
          description:
            "Chat com citação de página, PDFs até 100 páginas, modos para contratos, editais, apólices e laudos.",
          offers: [
            {
              name: "Premium mensal",
              price: "29",
              url: absoluteUrl("/precos"),
            },
            {
              name: "Premium anual",
              price: "290",
              url: absoluteUrl("/precos"),
            },
          ],
        })}
      />
      <JsonLd data={faqSchema(faqs)} />

      <article className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 md:py-14">
        <Breadcrumbs
          items={[
            { label: "Início", path: "/" },
            { label: "Preços", path: "/precos" },
          ]}
        />

        <header className="mt-6 max-w-3xl">
          <p className="eyebrow text-faded-stone">
            Planos e preços
          </p>
          <h1 className="mt-3 font-display text-[clamp(2.25rem,5vw,3.5rem)] font-semibold leading-[1.05]  text-midnight-ink">
            Comece grátis. Faça upgrade quando precisar ir fundo.
          </h1>
          <p className="mt-5 text-body  text-charcoal-text sm:text-body-lg">
            Pagamento em real, cobrança via Stripe, cancele quando quiser. Sem
            taxa de cancelamento e sem fidelidade.
          </p>
        </header>

        {/* —— Plan cards —— */}
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {/* Free */}
          <section className="rounded-lg border border-subtle-gray bg-crisp-white p-8">
            <div className="flex items-baseline justify-between gap-3">
              <h2 className="font-display text-heading font-semibold text-midnight-ink">
                Gratuito
              </h2>
              <p className="eyebrow text-faded-stone">
                Sem cadastro
              </p>
            </div>
            <p className="mt-6 flex items-baseline gap-2">
              <span className="font-display text-heading-lg font-semibold leading-none text-midnight-ink">
                R$0
              </span>
              <span className="text-body-sm text-faded-stone">/sempre</span>
            </p>
            <p className="mt-3 text-body-sm text-charcoal-text">
              Para testar a ferramenta e resumir PDFs curtos sem fricção.
            </p>

            <ul className="mt-7 space-y-3 text-body-sm text-charcoal-text">
              <FeatureLi included>1 resumo por dia, até 10 páginas</FeatureLi>
              <FeatureLi included>
                Tópicos, datas e entidades encontrados no texto
              </FeatureLi>
              <FeatureLi included>Perguntas de follow-up sugeridas</FeatureLi>
              <FeatureLi included>Sem cadastro</FeatureLi>
              <FeatureLi>Chat com o documento</FeatureLi>
              <FeatureLi>Histórico salvo na conta</FeatureLi>
              <FeatureLi>Modos para contratos, editais, apólices</FeatureLi>
            </ul>

            <Link
              href="/resumir-pdf"
              className="mt-8 inline-flex w-full items-center justify-center rounded-lg border border-midnight-ink px-5 py-3 text-body font-medium text-midnight-ink"
            >
              Começar grátis
            </Link>
          </section>

          {/* Premium */}
          <section className="relative rounded-lg border-2 border-midnight-ink bg-crisp-white p-8">
            <span className="absolute -top-3 left-8 inline-flex items-center bg-midnight-ink px-3 py-1 font-condensed text-caption uppercase tracking-[0.2em] text-apollo-gold">
              Mais popular
            </span>
            <div className="flex items-baseline justify-between gap-3">
              <h2 className="font-display text-heading font-semibold text-midnight-ink">
                Premium
              </h2>
              <p className="eyebrow text-faded-stone">
                Sem fidelidade
              </p>
            </div>
            <p className="mt-6 flex items-baseline gap-2">
              <span className="font-display text-heading-lg font-semibold leading-none text-midnight-ink">
                R$29
              </span>
              <span className="text-body-sm text-faded-stone">/mês</span>
            </p>
            <p className="mt-3 text-body-sm text-charcoal-text">
              Anual: R$290 (R$24,17/mês) — economize R$58.
            </p>

            <ul className="mt-7 space-y-3 text-body-sm text-charcoal-text">
              <FeatureLi included>
                Chat com o documento — respostas com citação de página
              </FeatureLi>
              <FeatureLi included>PDFs até 100 páginas</FeatureLi>
              <FeatureLi included>
                Modos: resumo detalhado, extrair dados, revisão de riscos
              </FeatureLi>
              <FeatureLi included>Histórico de documentos salvo</FeatureLi>
              <FeatureLi included>
                Modos para contratos CLT, editais, apólices
              </FeatureLi>
              <FeatureLi included>
                Aviso claro quando a informação não está no PDF
              </FeatureLi>
              <FeatureLi included>Exportar pacote (PDF + Markdown)</FeatureLi>
            </ul>

            <div className="mt-8 grid gap-3">
              <CheckoutButton priceId={monthly} label="Assinar por R$29/mês" />
              <CheckoutButton priceId={yearly} label="Assinar por R$290/ano" />
            </div>
          </section>
        </div>

        <p className="mt-6 text-center text-body-sm text-faded-stone">
          Pagamento seguro via Stripe · Cancele quando quiser · Sem taxa de
          cancelamento ·{" "}
          <Link
            href="/termos"
            className="underline underline-offset-4 hover:text-charcoal-text"
          >
            Termos
          </Link>{" "}
          ·{" "}
          <Link
            href="/privacidade"
            className="underline underline-offset-4 hover:text-charcoal-text"
          >
            Privacidade
          </Link>
        </p>

        {/* —— Detailed comparison —— */}
        <section className="mt-20">
          <div className="grid gap-6 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:items-end">
            <div>
              <p className="eyebrow text-faded-stone">
                Compare lado a lado
              </p>
              <h2 className="mt-4 font-display text-heading-lg font-semibold leading-tight text-midnight-ink">
                Tudo o que entra em cada plano.
              </h2>
            </div>
            <p className="text-body  text-charcoal-text">
              O gratuito cobre o uso casual; o Premium é para quem trabalha com
              PDFs todo dia.
            </p>
          </div>

          <div className="mt-8 overflow-x-auto">
            <table className="w-full border-collapse text-body-sm">
              <thead>
                <tr className="border-b border-midnight-ink text-left">
                  <th className="py-4 pr-6 font-medium text-faded-stone">
                    Recurso
                  </th>
                  <th className="py-4 pr-6 font-medium text-charcoal-text">
                    Gratuito
                  </th>
                  <th className="py-4 font-medium text-midnight-ink">
                    Premium
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-subtle-gray">
                {planFeatures.map((row) => (
                  <tr key={row.label}>
                    <td className="py-4 pr-6 text-charcoal-text">
                      {row.label}
                    </td>
                    <td className="py-4 pr-6 text-charcoal-text">
                      {row.free}
                    </td>
                    <td className="py-4 font-medium text-midnight-ink">
                      {row.premium}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* —— Vs competitors —— */}
        <section className="mt-20">
          <div className="grid gap-6 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:items-end">
            <div>
              <p className="eyebrow text-faded-stone">
                PDFIA vs alternativas
              </p>
              <h2 className="mt-4 font-display text-heading-lg font-semibold leading-tight text-midnight-ink">
                Como nos comparamos.
              </h2>
            </div>
            <p className="text-body  text-charcoal-text">
              O PDFIA compete com ChatGPT Plus, Smallpdf AI e Adobe
              Acrobat AI Assistant — cada um com seu foco.
            </p>
          </div>

          <div className="mt-8 overflow-x-auto">
            <table className="w-full border-collapse text-body-sm">
              <thead>
                <tr className="border-b border-midnight-ink text-left">
                  <th className="py-4 pr-6 font-medium text-faded-stone">
                    Item
                  </th>
                  <th className="py-4 pr-6 font-medium text-midnight-ink">
                    PDFIA
                  </th>
                  <th className="py-4 pr-6 font-medium text-faded-stone">
                    ChatGPT Plus
                  </th>
                  <th className="py-4 pr-6 font-medium text-faded-stone">
                    Smallpdf
                  </th>
                  <th className="py-4 font-medium text-faded-stone">
                    Adobe Acrobat AI
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-subtle-gray text-charcoal-text">
                {competitorComparison.map((row) => (
                  <tr key={row.label}>
                    <td className="py-4 pr-6">{row.label}</td>
                    <td className="py-4 pr-6 font-medium text-midnight-ink">
                      {row.you}
                    </td>
                    <td className="py-4 pr-6 text-faded-stone">
                      {row.chatgpt}
                    </td>
                    <td className="py-4 pr-6 text-faded-stone">
                      {row.smallpdf}
                    </td>
                    <td className="py-4 text-faded-stone">{row.adobe}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* —— FAQ —— */}
        <section className="mt-20 grid gap-10 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div>
            <p className="eyebrow text-faded-stone">
              Perguntas frequentes
            </p>
            <h2 className="mt-4 font-display text-heading-lg font-semibold leading-tight text-midnight-ink">
              Sobre cobrança, conta e limites.
            </h2>
          </div>
          <dl className="divide-y divide-subtle-gray border-y border-subtle-gray">
            {faqs.map((f) => (
              <details
                key={f.q}
                className="group py-5 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6">
                  <dt className="font-display text-body-lg font-semibold text-midnight-ink">
                    {f.q}
                  </dt>
                  <span
                    aria-hidden="true"
                    className="mt-1 font-condensed text-faded-stone transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <dd className="mt-3 max-w-2xl text-body  text-charcoal-text">
                  {f.a}
                </dd>
              </details>
            ))}
          </dl>
        </section>
      </article>
    </>
  );
}

function FeatureLi({
  children,
  included = false,
}: {
  children: React.ReactNode;
  included?: boolean;
}) {
  return (
    <li
      className={
        "grid grid-cols-[16px_1fr] items-start gap-3 " +
        (included ? "text-charcoal-text" : "text-faded-stone")
      }
    >
      <span
        aria-hidden="true"
        className={
          included
            ? "mt-1 inline-block h-2 w-2 bg-midnight-ink"
            : "mt-2 inline-block h-px w-2.5 bg-soft-stone"
        }
      />
      <span>
        {included ? (
          children
        ) : (
          <span className="line-through decoration-soft-stone">{children}</span>
        )}
      </span>
    </li>
  );
}
