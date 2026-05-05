import Link from "next/link";

import { InlineUpload } from "@/components/marketing/InlineUpload";
import {
  JsonLd,
  faqSchema,
  softwareApplicationSchema,
} from "@/components/seo/JsonLd";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Chip, Eyebrow, MonoLabel } from "@/components/ui/labels";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "PDFIA — Resumir e conversar com PDFs em português",
  description:
    "Resuma PDFs grátis em português. Premium converte contratos, editais, laudos e relatórios em respostas com citação de página. Pagamento em BRL.",
  path: "/",
  ogTitle: "PDFIA",
});

const stats = [
  ["12.4M", "Páginas processadas"],
  ["1.4s", "Tempo médio de resumo"],
  ["96%", "Acerto em citação de página"],
  ["R$29", "Premium · BRL/mês"],
] as const;

const howItWorks = [
  ["01", "Envie", "Solte um PDF com texto selecionável. Sem cadastro para começar."],
  ["02", "Leia", "Receba parágrafo-síntese, tópicos, datas, valores e entidades — em português."],
  ["03", "Pergunte", "No Premium, aprofunde com respostas citadas por página exata."],
] as const;

const useCases = [
  {
    href: "/analisar-contrato-clt",
    eyebrow: "RH · Jurídico",
    title: "Contrato de trabalho CLT",
    body: "Salário, jornada, benefícios, aviso prévio e cláusulas atípicas.",
    code: "CLT",
  },
  {
    href: "/ler-edital-com-ia",
    eyebrow: "Licitações",
    title: "Edital de licitação",
    body: "Objeto, prazos, garantias, exigências de habilitação e penalidades.",
    code: "EDT",
  },
  {
    href: "/analisar-apolice-de-seguro",
    eyebrow: "Seguros",
    title: "Apólice de seguro",
    body: "Coberturas, exclusões, franquias e prazos.",
    code: "APL",
  },
  {
    href: "/entender-laudo-medico",
    eyebrow: "Saúde",
    title: "Laudo médico",
    body: "Tradução de termos técnicos para linguagem do paciente.",
    code: "LDM",
  },
  {
    href: "/resumir-relatorio-pdf",
    eyebrow: "Negócios",
    title: "Relatório executivo",
    body: "Pontos-chave, números relevantes e conclusões.",
    code: "REL",
  },
  {
    href: "/resumir-boleto-ou-fatura",
    eyebrow: "Finanças",
    title: "Boleto ou fatura",
    body: "Vencimento, valor, juros, multa e linha digitável.",
    code: "BLT",
  },
] as const;

const compareRows = [
  ["Citação de página", "Padrão", "Só sob pedido"],
  ["Modos para contratos / editais", "Sim", "Prompt manual"],
  ["Resumo grátis sem cadastro", "Sim", "Não"],
  ["Pagamento", "R$29/mês BRL", "USD (ChatGPT Plus)"],
  ["Suporte em pt-BR", "Padrão", "Limitado"],
] as const;

const faqs = [
  {
    q: "É realmente grátis?",
    a: "Sim. PDFs até 10 páginas são gratuitos e não exigem cadastro. Premium (R$29/mês) libera chat com citação, PDFs até 100 páginas e modos por tipo de documento.",
  },
  {
    q: "Em que difere do ChatGPT?",
    a: "PDFIA cita a página de origem em cada resposta, avisa quando a informação não está no documento e tem modos prontos para contratos CLT, editais e apólices brasileiras.",
  },
  {
    q: "Meu PDF fica salvo?",
    a: "No grátis o arquivo não é armazenado. No Premium o documento fica vinculado à sua conta.",
  },
  {
    q: "Funciona com PDFs digitalizados?",
    a: "Hoje o motor exige texto selecionável. PDFs em imagem precisam de OCR antes — está no roadmap.",
  },
  {
    q: "Posso cancelar quando quiser?",
    a: "Sim. Premium é mensal ou anual via Stripe; cancele direto na sua conta.",
  },
] as const;

export default function HomePage() {
  return (
    <div className="flex flex-1 flex-col">
      <JsonLd data={softwareApplicationSchema()} />
      <JsonLd data={faqSchema(faqs.map((f) => ({ q: f.q, a: f.a })))} />

      {/* —— Hero —— centered headline, chip badge, two-column kickoff card. */}
      <Section bg="canvas" size="lg">
        <Container>
          <div className="mx-auto max-w-[960px] text-center">
            <Chip variant="live">Resumo grátis · Sem cadastro</Chip>
            <h1 className="mt-8 font-display text-display font-semibold text-midnight-ink text-[clamp(48px,8vw,88px)]">
              Cada resposta com a página de{" "}
              <span className="bg-apollo-gold px-[0.05em]">origem</span>.
            </h1>
            <p className="mx-auto mt-6 max-w-[620px] text-body-lg text-charcoal-text">
              Diferente de chats genéricos, o PDFIA cita a página exata e avisa
              quando a resposta não está no documento.
            </p>
          </div>

          <div className="mt-16 grid overflow-hidden rounded-lg border border-midnight-ink bg-crisp-white md:grid-cols-[1.4fr_1fr]">
            <div className="border-b border-subtle-gray p-card-elevated md:border-b-0 md:border-r">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <Eyebrow>Comece em segundos</Eyebrow>
                <MonoLabel>Grátis · 10 págs</MonoLabel>
              </div>
              <div className="mt-6">
                <InlineUpload size="large" />
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <ButtonLink href="/resumir-pdf" variant="primary" size="md">
                  Resumir PDF grátis
                </ButtonLink>
                <ButtonLink href="/login" variant="secondary" size="md">
                  Entrar
                </ButtonLink>
              </div>
            </div>
            <div className="bg-canvas p-card-elevated">
              <div className="flex items-center justify-between">
                <Eyebrow>Saída esperada</Eyebrow>
                <span className="rounded-md border border-subtle-gray bg-crisp-white px-2 py-0.5 mono-label text-charcoal-text">
                  exemplo
                </span>
              </div>
              <h3 className="mt-3 font-display text-subheading font-semibold text-midnight-ink">
                Contrato de prestação · 14 págs
              </h3>
              <ul className="mt-4 grid gap-2.5 text-body-sm text-charcoal-text">
                {[
                  ["Prazo: ", "90 dias", " contados da assinatura.", 2],
                  ["", "R$ 16.000 mensais", " via boleto, dia 10.", 5],
                  ["Confidencialidade por ", "24 meses", ".", 11],
                ].map(([prefix, strong, suffix, page], i) => (
                  <li key={i} className="flex items-baseline gap-2.5">
                    <span
                      aria-hidden="true"
                      className="mt-[7px] inline-block h-1 w-1 shrink-0 bg-midnight-ink"
                    />
                    <span>
                      {prefix as string}
                      <strong className="font-display text-midnight-ink">
                        {strong as string}
                      </strong>
                      {suffix as string}{" "}
                      <span className="ml-1 inline-flex items-center rounded-md border border-subtle-gray bg-crisp-white px-2 py-0.5 mono-label text-charcoal-text">
                        pág. {page as number}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* —— Stats strip —— inverted band, single tight rhythm. */}
      <Section bg="midnight" size="sm" bordered={false}>
        <Container>
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {stats.map(([n, l], i) => (
              <div
                key={l}
                className={
                  "px-6 py-4 " +
                  (i < stats.length - 1
                    ? "border-b border-midnight-divider sm:border-b-0 lg:border-r"
                    : "")
                }
              >
                <div className="font-display text-heading-lg font-semibold text-crisp-white">
                  {n}
                </div>
                <div className="mt-2.5 mono-label text-soft-stone">{l}</div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* —— How it works —— */}
      <Section bg="canvas" size="md">
        <Container>
          <SectionHeading
            eyebrow="Como funciona"
            title="Do upload à resposta com fonte em três passos."
            maxWidth="narrow"
            cta={
              <ButtonLink
                href="/guias/como-resumir-pdf-com-ia"
                variant="secondary"
                size="sm"
              >
                Ver guia completo →
              </ButtonLink>
            }
            className="mb-10"
          />
          <div className="grid gap-4 md:grid-cols-3">
            {howItWorks.map(([n, t, b]) => (
              <Card key={n} as="article" className="relative min-h-[200px]">
                <MonoLabel>{n} · passo</MonoLabel>
                <h3 className="mt-3.5 font-display text-heading font-semibold text-midnight-ink">
                  {t}
                </h3>
                <p className="mt-2.5 text-body-sm text-charcoal-text">{b}</p>
                <span
                  aria-hidden="true"
                  className="absolute bottom-6 right-6 text-soft-stone"
                >
                  →
                </span>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* —— Use cases —— */}
      <Section id="casos-de-uso" bg="ash" size="md" className="scroll-mt-24">
        <Container>
          <SectionHeading
            eyebrow="Casos de uso"
            title="Feito para os PDFs que aparecem no seu trabalho."
            maxWidth="default"
            cta={
              <ButtonLink href="/precos" variant="secondary" size="sm">
                Ver todos os modos →
              </ButtonLink>
            }
            className="mb-10"
          />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {useCases.map((u) => (
              <li key={u.href}>
                <Link
                  href={u.href}
                  className="flex h-full flex-col gap-4 rounded-lg border border-subtle-gray bg-crisp-white p-card transition-colors hover:border-midnight-ink"
                >
                  <div className="flex items-center justify-between">
                    <Chip variant="outline">{u.eyebrow}</Chip>
                    <MonoLabel casing="normal">{u.code}</MonoLabel>
                  </div>
                  <div>
                    <h3 className="font-display text-subheading font-semibold text-midnight-ink">
                      {u.title}
                    </h3>
                    <p className="mt-2 text-body-sm text-charcoal-text">{u.body}</p>
                  </div>
                  <div className="mt-auto flex items-center justify-between border-t border-subtle-gray pt-4 text-body-sm text-midnight-ink">
                    <span>Abrir caso</span>
                    <span aria-hidden="true">→</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* —— Compare teaser —— */}
      <Section bg="canvas" size="md">
        <Container>
          <div className="grid gap-12 md:grid-cols-[0.9fr_1.4fr] md:items-start">
            <div>
              <Eyebrow>PDFIA vs alternativas</Eyebrow>
              <h2 className="mt-3.5 font-display text-heading-lg font-semibold text-midnight-ink text-[clamp(32px,4vw,48px)]">
                Por que não usar só o ChatGPT?
              </h2>
              <p className="mt-6 text-body text-charcoal-text">
                Ferramentas dedicadas para PDF entregam coisas que um chat
                genérico não entrega.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {[
                  ["/chatpdf-vs-chatgpt", "vs ChatGPT"],
                  ["/chatpdf-vs-smallpdf", "vs Smallpdf"],
                  ["/chatpdf-vs-adobe-acrobat-ai", "vs Adobe Acrobat AI"],
                ].map(([href, label]) => (
                  <ButtonLink
                    key={href}
                    href={href}
                    variant="secondary"
                    size="sm"
                  >
                    {label}
                  </ButtonLink>
                ))}
              </div>
            </div>

            <div className="overflow-hidden rounded-lg border border-subtle-gray bg-crisp-white">
              <div className="grid grid-cols-[1.4fr_1fr_1fr] border-b border-subtle-gray bg-canvas">
                <div className="px-5 py-3.5 mono-label text-faded-stone">
                  Recurso
                </div>
                <div className="border-l border-subtle-gray px-5 py-3.5 mono-label text-midnight-ink">
                  PDFIA
                </div>
                <div className="border-l border-subtle-gray px-5 py-3.5 mono-label text-faded-stone">
                  ChatGPT
                </div>
              </div>
              {compareRows.map((r, i) => (
                <div
                  key={r[0]}
                  className={
                    "grid grid-cols-[1.4fr_1fr_1fr] " +
                    (i < compareRows.length - 1 ? "border-b border-subtle-gray" : "")
                  }
                >
                  <div className="px-5 py-4 text-body-sm text-charcoal-text">
                    {r[0]}
                  </div>
                  <div className="border-l border-subtle-gray px-5 py-4 text-body-sm font-display text-midnight-ink">
                    {r[1]}
                  </div>
                  <div className="border-l border-subtle-gray px-5 py-4 text-body-sm text-faded-stone">
                    {r[2]}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* —— Pricing —— */}
      <Section bg="white" size="md">
        <Container>
          <SectionHeading
            eyebrow="Preço"
            title="Simples. Em real. Sem pegadinha."
            align="center"
            maxWidth="narrow"
            className="mx-auto mb-10"
          />

          <div className="mx-auto grid max-w-[880px] gap-4 sm:grid-cols-2">
            <Card variant="elevated">
              <div className="flex items-center justify-between">
                <Eyebrow>Grátis</Eyebrow>
                <MonoLabel>Sem cadastro</MonoLabel>
              </div>
              <div className="mt-6 flex items-baseline gap-1.5">
                <span className="font-display text-heading-lg font-semibold text-midnight-ink">
                  R$0
                </span>
                <MonoLabel casing="normal">/sempre</MonoLabel>
              </div>
              <ul className="mt-6 grid gap-2.5 text-body-sm text-charcoal-text">
                <li>· Resumo de PDFs até 10 páginas</li>
                <li>· Tópicos, datas, valores, entidades</li>
                <li>· Sem histórico salvo</li>
                <li>· Sem chat com o documento</li>
              </ul>
              <ButtonLink
                href="/resumir-pdf"
                variant="secondary"
                size="md"
                className="mt-6 w-full"
              >
                Resumir um PDF agora
              </ButtonLink>
            </Card>

            <div className="relative rounded-lg border-2 border-midnight-ink bg-crisp-white p-card-elevated">
              <span className="absolute -top-3 left-6 rounded-md bg-apollo-gold px-2.5 py-1 mono-label text-midnight-ink">
                Recomendado
              </span>
              <div className="flex items-center justify-between">
                <Eyebrow>Premium</Eyebrow>
                <MonoLabel>Stripe · BRL</MonoLabel>
              </div>
              <div className="mt-6 flex items-baseline gap-1.5">
                <span className="font-display text-heading-lg font-semibold text-midnight-ink">
                  R$29
                </span>
                <MonoLabel casing="normal">/mês · ou R$290/ano</MonoLabel>
              </div>
              <ul className="mt-6 grid gap-2.5 text-body-sm text-charcoal-text">
                <li>· Tudo do grátis +</li>
                <li>· Chat com citação de página</li>
                <li>· PDFs até 100 páginas</li>
                <li>· Modos: contrato, edital, apólice</li>
                <li>· Histórico salvo na conta</li>
              </ul>
              <ButtonLink
                href="/login"
                variant="primary"
                size="md"
                className="mt-6 w-full"
              >
                Começar Premium
              </ButtonLink>
            </div>
          </div>
        </Container>
      </Section>

      {/* —— FAQ —— */}
      <Section bg="canvas" size="md">
        <Container>
          <div className="grid gap-16 md:grid-cols-[0.9fr_1.1fr]">
            <SectionHeading
              eyebrow="Perguntas frequentes"
              title="Tudo o que perguntam antes de começar."
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
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 px-6 py-5 text-left transition-colors group-open:bg-canvas">
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
                  <div className="max-w-[620px] px-6 pb-5 text-body-sm text-charcoal-text">
                    {f.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* —— Final CTA —— */}
      <Section bg="midnight" size="lg" bordered={false}>
        <Container>
          <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Comece grátis"
              title="Envie um PDF agora — o primeiro resumo sai em segundos."
              maxWidth="default"
              tone="white"
              eyebrowTone="accent"
            />
            <div className="flex flex-wrap gap-3">
              <ButtonLink href="/resumir-pdf" variant="primary" size="lg">
                Resumir PDF grátis
              </ButtonLink>
              <ButtonLink href="/precos" variant="secondary-on-dark" size="lg">
                Ver Premium
              </ButtonLink>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
