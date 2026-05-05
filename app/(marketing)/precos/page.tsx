import Link from "next/link";

import { Breadcrumbs } from "@/components/marketing/Breadcrumbs";
import { CheckoutButton } from "@/components/marketing/CheckoutButton";
import { JsonLd, faqSchema, productSchema } from "@/components/seo/JsonLd";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Chip, Eyebrow, MonoLabel } from "@/components/ui/labels";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
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
    <div className="flex flex-1 flex-col">
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

      <Section bg="canvas" size="md">
        <Container>
          <Breadcrumbs
            items={[
              { label: "Início", path: "/" },
              { label: "Preços", path: "/precos" },
            ]}
          />

          <div className="mt-10 grid gap-16 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
            <header className="motion-rise">
              <Chip variant="live">Resumo grátis · Premium em BRL</Chip>
              <h1 className="mt-8 font-display text-heading-lg font-semibold text-midnight-ink md:text-display">
                Preço simples para PDFs que precisam virar resposta.
              </h1>
              <p className="mt-6 max-w-[620px] text-body-lg text-charcoal-text">
                Comece sem cadastro. Assine quando precisar de chat com citação,
                histórico e documentos maiores.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href="/resumir-pdf" variant="primary" size="lg">
                  Começar grátis
                </ButtonLink>
                <ButtonLink href="#planos" variant="secondary" size="lg">
                  Comparar planos
                </ButtonLink>
              </div>
            </header>

            <div className="motion-rise-late rounded-lg border border-midnight-ink bg-crisp-white md:hidden">
              <div className="grid grid-cols-2 border-b border-subtle-gray">
                <div className="p-card-compact">
                  <MonoLabel>Grátis</MonoLabel>
                  <div className="mt-2 font-display text-heading font-semibold text-midnight-ink">
                    R$0
                  </div>
                </div>
                <div className="border-l border-subtle-gray bg-apollo-gold p-card-compact">
                  <MonoLabel tone="ink">Premium</MonoLabel>
                  <div className="mt-2 font-display text-heading font-semibold text-midnight-ink">
                    R$29/mês
                  </div>
                </div>
              </div>
              <div className="grid divide-y divide-subtle-gray">
                {[
                  ["Páginas", "10 no grátis", "100 no Premium"],
                  ["Chat citado", "Premium"],
                  ["Histórico salvo", "Premium"],
                  ["Modos por PDF", "Contrato, edital e apólice no Premium"],
                ].map(([label, detail, extra]) => (
                  <div key={label} className="p-card-compact">
                    <MonoLabel>{label}</MonoLabel>
                    <p className="mt-2 text-body-sm text-charcoal-text">
                      {detail}
                      {extra ? ` · ${extra}` : ""}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="motion-rise-late hidden rounded-lg border border-midnight-ink bg-crisp-white md:block">
              <div className="grid grid-cols-[1fr_1fr] border-b border-subtle-gray bg-canvas">
                <div className="p-card-compact">
                  <MonoLabel>Grátis</MonoLabel>
                  <div className="mt-2 font-display text-heading font-semibold text-midnight-ink">
                    R$0
                  </div>
                </div>
                <div className="border-l border-subtle-gray bg-apollo-gold p-card-compact">
                  <MonoLabel tone="ink">Premium</MonoLabel>
                  <div className="mt-2 font-display text-heading font-semibold text-midnight-ink">
                    R$29/mês
                  </div>
                </div>
              </div>
              {[
                ["Páginas", "10", "100"],
                ["Chat citado", "Não", "Sim"],
                ["Histórico", "Não", "Sim"],
                ["Modos por PDF", "Básico", "Contrato · edital · apólice"],
              ].map(([label, free, premium]) => (
                <div
                  key={label}
                  className="grid grid-cols-[0.9fr_0.8fr_1fr] border-b border-subtle-gray last:border-b-0"
                >
                  <div className="p-card-compact text-body-sm text-faded-stone">
                    {label}
                  </div>
                  <div className="border-l border-subtle-gray p-card-compact text-body-sm text-charcoal-text">
                    {free}
                  </div>
                  <div className="border-l border-subtle-gray p-card-compact font-display text-body-sm text-midnight-ink">
                    {premium}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section id="planos" bg="white" size="md">
        <Container>
          <SectionHeading
            eyebrow="Planos"
            title="O gratuito prova valor. O Premium remove os limites."
            description="Sem fidelidade, pagamento seguro via Stripe e cancelamento direto na conta."
            maxWidth="wide"
            className="mb-10"
          />

          <div className="grid gap-4 lg:grid-cols-[0.85fr_1.15fr]">
            <Card
              variant="elevated"
              className="flex flex-col transition-transform hover:-translate-y-1"
            >
              <div className="flex items-center justify-between gap-4">
                <Eyebrow>Gratuito</Eyebrow>
                <MonoLabel>Sem cadastro</MonoLabel>
              </div>
              <div className="mt-8 flex items-end gap-2">
                <span className="font-display text-heading-lg font-semibold text-midnight-ink">
                  R$0
                </span>
                <MonoLabel casing="normal">/sempre</MonoLabel>
              </div>
              <p className="mt-4 text-body text-charcoal-text">
                Para resumir PDFs curtos e entender a saída do PDFIA antes de
                criar conta.
              </p>
              <ul className="mt-8 grid gap-3 text-body-sm text-charcoal-text">
                <FeatureLi included>1 resumo por dia, até 10 páginas</FeatureLi>
                <FeatureLi included>
                  Tópicos, datas, valores e entidades
                </FeatureLi>
                <FeatureLi included>
                  Perguntas sugeridas para aprofundar
                </FeatureLi>
                <FeatureLi>Chat com o documento</FeatureLi>
                <FeatureLi>Histórico salvo</FeatureLi>
              </ul>
              <ButtonLink
                href="/resumir-pdf"
                variant="secondary"
                size="md"
                className="mt-8 w-full"
              >
                Resumir PDF grátis
              </ButtonLink>
            </Card>

            <div className="relative overflow-hidden rounded-lg border-2 border-midnight-ink bg-crisp-white transition-transform hover:-translate-y-1">
              <div className="grid gap-8 bg-midnight-ink p-card-elevated text-crisp-white md:grid-cols-[1fr_auto] md:items-start">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <Eyebrow tone="accent">Premium</Eyebrow>
                    <Chip variant="accent">Mais usado</Chip>
                  </div>
                  <div className="mt-8 flex flex-wrap items-end gap-3">
                    <span className="font-display text-display font-semibold text-crisp-white">
                      R$29
                    </span>
                    <MonoLabel tone="white" casing="normal">
                      /mês · ou R$290/ano
                    </MonoLabel>
                  </div>
                  <p className="mt-4 max-w-[560px] text-body text-soft-stone">
                    Para quem trabalha com PDF todo dia e precisa voltar ao
                    documento, perguntar e citar a página de origem.
                  </p>
                </div>
                <div className="rounded-lg border border-midnight-divider p-card-compact">
                  <MonoLabel tone="accent">Anual</MonoLabel>
                  <p className="mt-2 font-display text-heading text-crisp-white">
                    R$24,17/mês
                  </p>
                  <p className="mt-2 text-body-sm text-soft-stone">
                    Economia de R$58.
                  </p>
                </div>
              </div>

              <div className="grid gap-8 p-card-elevated md:grid-cols-[1fr_0.85fr]">
                <ul className="grid gap-3 text-body-sm text-charcoal-text">
                  <FeatureLi included>
                    Chat com respostas citadas por página
                  </FeatureLi>
                  <FeatureLi included>PDFs até 100 páginas</FeatureLi>
                  <FeatureLi included>
                    Modos: resumo detalhado, extrair dados, revisão de riscos
                  </FeatureLi>
                  <FeatureLi included>
                    Contratos CLT, editais, apólices e laudos
                  </FeatureLi>
                  <FeatureLi included>Histórico de documentos salvo</FeatureLi>
                  <FeatureLi included>Exportação em PDF + Markdown</FeatureLi>
                </ul>

                <div className="flex flex-col justify-between gap-4 border-t border-subtle-gray pt-6 md:border-l md:border-t-0 md:pl-8 md:pt-0">
                  <div>
                    <MonoLabel>Checkout</MonoLabel>
                    <p className="mt-3 text-body-sm text-charcoal-text">
                      Cartão via Stripe. Não armazenamos dados de cartão na
                      infraestrutura do PDFIA.
                    </p>
                  </div>
                  <div className="grid gap-3">
                    <CheckoutButton
                      priceId={monthly}
                      label="Assinar mensal"
                      className="w-full"
                    />
                    <CheckoutButton
                      priceId={yearly}
                      label="Assinar anual"
                      variant="secondary"
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <p className="mt-8 text-center text-body-sm text-faded-stone">
            Cancele quando quiser · Sem taxa de cancelamento ·{" "}
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
        </Container>
      </Section>

      <Section bg="canvas" size="md">
        <Container>
          <SectionHeading
            eyebrow="Compare"
            title="Tudo o que entra em cada plano."
            description="O gratuito cobre o uso casual. O Premium é para quem precisa consultar, guardar e exportar."
            className="mb-10"
          />

          <ComparisonTable
            headers={["Recurso", "Gratuito", "Premium"]}
            rows={planFeatures.map((row) => [row.label, row.free, row.premium])}
            highlightColumn={2}
          />
        </Container>
      </Section>

      <Section bg="ash" size="md">
        <Container>
          <SectionHeading
            eyebrow="PDFIA vs alternativas"
            title="A diferença está no foco: PDF em português, fonte citada e preço em real."
            description="ChatGPT, Smallpdf e Adobe têm escopos maiores. PDFIA foi desenhado para ler documento e voltar à página certa."
            maxWidth="wide"
            className="mb-10"
          />

          <ComparisonTable
            headers={["Item", "PDFIA", "ChatGPT Plus", "Smallpdf", "Adobe"]}
            rows={competitorComparison.map((row) => [
              row.label,
              row.you,
              row.chatgpt,
              row.smallpdf,
              row.adobe,
            ])}
            highlightColumn={1}
          />
        </Container>
      </Section>

      <Section bg="white" size="md">
        <Container>
          <div className="grid gap-16 md:grid-cols-[0.85fr_1.15fr]">
            <SectionHeading
              eyebrow="Perguntas frequentes"
              title="Cobrança, conta e limites sem letra miúda."
              maxWidth="none"
            />
            <div className="overflow-hidden rounded-lg border border-subtle-gray bg-crisp-white">
              {faqs.map((f, i) => (
                <details
                  key={f.q}
                  className={
                    "group [&_summary::-webkit-details-marker]:hidden " +
                    (i < faqs.length - 1 ? "border-b border-subtle-gray" : "")
                  }
                  {...(i === 0 ? { open: true } : {})}
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 px-6 py-5 transition-colors group-open:bg-canvas">
                    <span className="font-display text-body-lg font-semibold text-midnight-ink">
                      {f.q}
                    </span>
                    <span
                      aria-hidden="true"
                      className="font-mono text-faded-stone transition-transform group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <div className="max-w-[720px] px-6 pb-5 text-body-sm text-charcoal-text">
                    {f.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section bg="midnight" size="lg" bordered={false}>
        <Container>
          <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Comece grátis"
              title="Envie um PDF agora. Assine só quando precisar perguntar mais."
              maxWidth="wide"
              tone="white"
              eyebrowTone="accent"
            />
            <div className="flex flex-wrap gap-3">
              <ButtonLink href="/resumir-pdf" variant="primary" size="lg">
                Resumir PDF grátis
              </ButtonLink>
              <ButtonLink href="#planos" variant="secondary-on-dark" size="lg">
                Ver Premium
              </ButtonLink>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}

function ComparisonTable({
  headers,
  rows,
  highlightColumn,
}: {
  headers: string[];
  rows: string[][];
  highlightColumn: number;
}) {
  return (
    <div className="overflow-x-auto rounded-lg border border-subtle-gray bg-crisp-white">
      <table className="w-full border-collapse text-body-sm">
        <thead>
          <tr className="border-b border-midnight-ink bg-canvas text-left">
            {headers.map((header, i) => (
              <th
                key={header}
                className={
                  "p-card-compact mono-label " +
                  (i === highlightColumn
                    ? "text-midnight-ink"
                    : "text-faded-stone")
                }
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-subtle-gray">
          {rows.map((row) => (
            <tr key={row[0]}>
              {row.map((cell, i) => (
                <td
                  key={`${row[0]}-${headers[i]}`}
                  className={
                    "p-card-compact " +
                    (i === highlightColumn
                      ? "font-display text-midnight-ink"
                      : i === 0
                        ? "text-charcoal-text"
                        : "text-faded-stone")
                  }
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
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
