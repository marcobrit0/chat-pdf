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
  title: "Preços PDFIA — grátis pra testar, R$29/mês pra usar de verdade",
  description:
    "Resumo de PDF grátis e sem cadastro pra você ver se serve. Premium a R$29/mês desbloqueia chat com a página citada, PDFs de até 100 páginas e modos pra contrato, edital e apólice. Pague em real, cancele quando quiser.",
  path: "/precos",
});

const planFeatures = [
  {
    label: "Resumo de PDF",
    free: "Até 10 páginas, 1 por dia",
    premium: "Até 100 páginas, sem limite por dia",
  },
  {
    label: "Tópicos, datas, valores e nomes",
    free: "Sim, no resumo",
    premium: "Sim, com profundidade extra",
  },
  {
    label: "Chat com o documento",
    free: "Não",
    premium: "Sim — toda resposta cita a página",
  },
  {
    label: "Modos prontos por tipo de PDF",
    free: "Não",
    premium: "Contrato CLT, edital, apólice, laudo",
  },
  {
    label: "Biblioteca salva na conta",
    free: "Não — o arquivo some depois do resumo",
    premium: "Sim — volte ao PDF quando quiser",
  },
  {
    label: "Exportar resumo + perguntas",
    free: "Não",
    premium: "PDF + Markdown, prontos pra compartilhar",
  },
  {
    label: "Aviso quando a info não está no PDF",
    free: "Sim — a gente nunca inventa",
    premium: "Sim — a gente nunca inventa",
  },
];

const competitorComparison = [
  {
    label: "Tem plano grátis?",
    you: "Sim, sem cadastro",
    chatgpt: "Limitado, exige conta",
    smallpdf: "Limitado",
    adobe: "Não",
  },
  {
    label: "Cita a página de origem",
    you: "Em toda resposta",
    chatgpt: "Só se você pedir",
    smallpdf: "Não",
    adobe: "Em alguns recursos",
  },
  {
    label: "Pagamento em real",
    you: "Sim (R$29/mês)",
    chatgpt: "Não (USD)",
    smallpdf: "Sim",
    adobe: "Sim",
  },
  {
    label: "Pensado pra PDF brasileiro",
    you: "É a língua-mãe",
    chatgpt: "Tradução do inglês",
    smallpdf: "Foco em editar PDF",
    adobe: "Genérico",
  },
];

const faqs = [
  {
    q: "Cancelo quando quiser, mesmo?",
    a: "Sim. Sem fidelidade, sem multa, sem ligar pra ninguém. Cancela direto na conta e o Premium vale até o fim do período já pago.",
  },
  {
    q: "Anual sai mais barato?",
    a: "Sai. R$290/ano dá R$24,17/mês — economia de R$58 comparado ao mensal. Vale se você usa toda semana.",
  },
  {
    q: "Como pago?",
    a: "Cartão (Visa, Mastercard, Amex, Elo) pelo Stripe. Pagamento em real, processado no Brasil. A gente não guarda dado de cartão — quem cuida é o Stripe.",
  },
  {
    q: "Tem nota fiscal?",
    a: "Tem. Manda o CNPJ e o recibo do Stripe pra gente depois do pagamento que a NF sai.",
  },
  {
    q: "Posso usar em vários dispositivos?",
    a: "Pode. A conta é sua e funciona em qualquer navegador — entra com o link mágico no e-mail.",
  },
  {
    q: "E se eu não gostar?",
    a: "Reembolso integral em até 7 dias, conforme o Código de Defesa do Consumidor pra serviço online. Sem perguntas estranhas.",
  },
  {
    q: "Cancelei. O que acontece com meus PDFs?",
    a: "Você continua vendo até o fim do período pago. Depois, deixamos os arquivos arquivados por 30 dias pra você baixar — só então excluímos definitivamente.",
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

      <Section id="planos" bg="white" size="md">
        <Container>
          <Breadcrumbs
            items={[
              { label: "Início", path: "/" },
              { label: "Preços", path: "/precos" },
            ]}
          />

          <header className="motion-rise mx-auto mt-10 max-w-[880px] text-center">
            <Chip variant="live">Grátis pra testar · R$29 pra usar</Chip>
            <h1 className="mt-6 font-display text-heading-lg font-semibold text-midnight-ink text-[clamp(32px,4vw,48px)]">
              Grátis prova que funciona. Premium serve quando você usa de verdade.
            </h1>
            <p className="mt-4 text-body-lg text-charcoal-text">
              Sem fidelidade, pagamento em real pelo Stripe, cancelamento direto
              na conta. Sem ligar pra ninguém.
            </p>
          </header>

          <div className="motion-rise-late mt-12 grid gap-4 lg:grid-cols-3 lg:items-stretch">
            <Card
              variant="elevated"
              className="flex flex-col transition-transform hover:-translate-y-1"
            >
              <div className="flex items-center justify-between gap-4">
                <Eyebrow>Grátis</Eyebrow>
                <MonoLabel>Sem cadastro</MonoLabel>
              </div>
              <div className="mt-8 flex items-end gap-2">
                <span className="font-display text-heading-lg font-semibold text-midnight-ink">
                  R$0
                </span>
                <MonoLabel casing="normal">/sempre</MonoLabel>
              </div>
              <p className="mt-4 text-body text-charcoal-text">
                Pra ver como funciona antes de criar conta — resumo de PDF curto,
                em segundos, sem dar e-mail.
              </p>
              <ul className="mt-8 grid flex-1 gap-3 text-body-sm text-charcoal-text">
                <FeatureLi included>1 PDF por dia, até 10 páginas</FeatureLi>
                <FeatureLi included>
                  Tópicos, datas, valores e nomes em destaque
                </FeatureLi>
                <FeatureLi included>
                  Perguntas sugeridas pra você se aprofundar
                </FeatureLi>
                <FeatureLi>Chat com o PDF (perguntar e receber página)</FeatureLi>
                <FeatureLi>Biblioteca salva — voltar ao documento</FeatureLi>
              </ul>
              <ButtonLink
                href="/resumir-pdf"
                variant="secondary"
                size="md"
                className="mt-8 w-full"
              >
                Resumir um PDF agora
              </ButtonLink>
            </Card>

            <Card
              variant="elevated"
              className="flex flex-col transition-transform hover:-translate-y-1"
            >
              <div className="flex items-center justify-between gap-4">
                <Eyebrow>Premium</Eyebrow>
                <Chip variant="outline">Mensal</Chip>
              </div>
              <div className="mt-8 flex items-end gap-2">
                <span className="font-display text-heading-lg font-semibold text-midnight-ink">
                  R$29
                </span>
                <MonoLabel casing="normal">/mês</MonoLabel>
              </div>
              <p className="mt-4 text-body text-charcoal-text">
                Pra quem trabalha com PDF toda semana e quer flexibilidade pra
                cancelar a qualquer mês.
              </p>
              <ul className="mt-8 grid flex-1 gap-3 text-body-sm text-charcoal-text">
                <FeatureLi included>
                  Chat com o PDF — toda resposta cita a página
                </FeatureLi>
                <FeatureLi included>PDFs longos, até 100 páginas</FeatureLi>
                <FeatureLi included>
                  Modos: resumo profundo, extrair dados, mapear riscos
                </FeatureLi>
                <FeatureLi included>
                  Contrato CLT, edital, apólice, laudo — prontos pra usar
                </FeatureLi>
                <FeatureLi included>
                  Biblioteca salva — volte quando quiser
                </FeatureLi>
                <FeatureLi included>Exportar resumo em PDF + Markdown</FeatureLi>
              </ul>
              <CheckoutButton
                priceId={monthly}
                label="Assinar mensal"
                variant="secondary"
                className="mt-8 w-full"
              />
            </Card>

            <div className="relative flex flex-col overflow-hidden rounded-lg border-2 border-midnight-ink bg-midnight-ink p-card-elevated text-crisp-white transition-transform hover:-translate-y-1">
              <div className="flex items-center justify-between gap-4">
                <Eyebrow tone="accent">Premium · Anual</Eyebrow>
                <Chip variant="accent">Mais barato</Chip>
              </div>
              <div className="mt-8 flex items-end gap-2">
                <span className="font-display text-heading-lg font-semibold text-crisp-white">
                  R$24,17
                </span>
                <MonoLabel tone="white" casing="normal">
                  /mês
                </MonoLabel>
              </div>
              <p className="mt-3 text-body-sm text-soft-stone">
                Cobrança única de R$290/ano · economia de R$58 vs. mensal.
              </p>
              <p className="mt-4 text-body text-soft-stone">
                Pra quem já sabe que vai usar o ano todo — paga uma vez, esquece
                até o ano que vem.
              </p>
              <ul className="mt-8 grid flex-1 gap-3 text-body-sm">
                <FeatureLi included tone="white">
                  Chat com o PDF — toda resposta cita a página
                </FeatureLi>
                <FeatureLi included tone="white">
                  PDFs longos, até 100 páginas
                </FeatureLi>
                <FeatureLi included tone="white">
                  Modos: resumo profundo, extrair dados, mapear riscos
                </FeatureLi>
                <FeatureLi included tone="white">
                  Contrato CLT, edital, apólice, laudo — prontos pra usar
                </FeatureLi>
                <FeatureLi included tone="white">
                  Biblioteca salva — volte quando quiser
                </FeatureLi>
                <FeatureLi included tone="white">
                  Exportar resumo em PDF + Markdown
                </FeatureLi>
              </ul>
              <CheckoutButton
                priceId={yearly}
                label="Assinar anual"
                variant="primary"
                className="mt-8 w-full"
              />
            </div>
          </div>

          <p className="mt-8 text-center text-body-sm text-faded-stone">
            Cartão pelo Stripe, em real · Cancele quando quiser ·{" "}
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
            eyebrow="Compare lado a lado"
            title="O que entra em cada plano, sem letra miúda."
            description="O grátis serve pra um PDF aqui e ali. O Premium é pra quem precisa voltar, perguntar de novo e exportar pro time."
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
            eyebrow="PDFIA vs ChatGPT, Smallpdf, Adobe"
            title="O que muda? Foco em PDF brasileiro, página citada e preço em real."
            description="ChatGPT é generalista. Smallpdf edita PDF. Adobe faz tudo um pouco. O PDFIA foi feito pra uma coisa só: ler PDF e responder com a página de origem."
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
              title="Cobrança, conta e o que ninguém gosta de descobrir depois."
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
              title="Solte um PDF antes de assinar. A gente prefere assim."
              maxWidth="wide"
              tone="white"
              eyebrowTone="accent"
            />
            <div className="flex flex-wrap gap-3">
              <ButtonLink href="/resumir-pdf" variant="primary" size="lg">
                Resumir PDF grátis
              </ButtonLink>
              <ButtonLink href="#planos" variant="secondary-on-dark" size="lg">
                Ver o Premium
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
  tone = "ink",
}: {
  children: React.ReactNode;
  included?: boolean;
  tone?: "ink" | "white";
}) {
  const isWhite = tone === "white";
  const includedColor = isWhite ? "text-crisp-white" : "text-charcoal-text";
  const excludedColor = isWhite ? "text-soft-stone" : "text-faded-stone";
  const dotColor = isWhite ? "bg-apollo-gold" : "bg-midnight-ink";
  const dashColor = isWhite ? "bg-midnight-divider" : "bg-soft-stone";
  const strikeColor = isWhite
    ? "decoration-midnight-divider"
    : "decoration-soft-stone";
  return (
    <li
      className={`grid grid-cols-[16px_1fr] items-start gap-3 ${included ? includedColor : excludedColor}`}
    >
      <span
        aria-hidden="true"
        className={
          included
            ? `mt-1 inline-block h-2 w-2 ${dotColor}`
            : `mt-2 inline-block h-px w-2.5 ${dashColor}`
        }
      />
      <span>
        {included ? (
          children
        ) : (
          <span className={`line-through ${strikeColor}`}>{children}</span>
        )}
      </span>
    </li>
  );
}
