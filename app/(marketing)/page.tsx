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
  title: "Chat PDF em português — resuma e converse com qualquer PDF | PDFIA",
  description:
    "Resumo de PDF grátis, sem cadastro. Premium para conversar com contratos, editais, laudos e relatórios — com a página de origem em cada resposta. R$29/mês em BRL.",
  path: "/",
  ogTitle: "PDFIA · Chat com PDF em português",
});

const stats = [
  ["100", "Páginas por PDF no Premium"],
  ["seg.", "Resumo em segundos, não minutos"],
  ["pág.", "Origem citada em cada resposta"],
  ["R$29", "Premium em BRL · cancele quando quiser"],
] as const;

const howItWorks = [
  ["01", "Solte o PDF", "Arraste o arquivo. Sem cadastro pra começar — você vê o resumo antes de criar conta."],
  ["02", "Leia em segundos", "Resumo direto, com tópicos, datas, valores e nomes que importam — tudo em português."],
  ["03", "Pergunte ao PDF", "No Premium, converse com o documento. Cada resposta vem com a página de onde a IA tirou."],
] as const;

const useCases = [
  {
    href: "/analisar-contrato-clt",
    eyebrow: "RH · Jurídico",
    title: "Contrato CLT",
    body: "Salário, jornada, benefícios, aviso prévio e cláusulas que costumam pegar.",
    code: "CLT",
  },
  {
    href: "/ler-edital-com-ia",
    eyebrow: "Licitações",
    title: "Edital de licitação",
    body: "Objeto, prazos, habilitação, garantias e penalidades — antes de montar proposta.",
    code: "EDT",
  },
  {
    href: "/analisar-apolice-de-seguro",
    eyebrow: "Seguros",
    title: "Apólice de seguro",
    body: "O que cobre, o que exclui, franquia, carência e prazo de aviso.",
    code: "APL",
  },
  {
    href: "/entender-laudo-medico",
    eyebrow: "Saúde",
    title: "Laudo médico",
    body: "Termo técnico em linguagem que dá pra entender — sem virar dr. Google.",
    code: "LDM",
  },
  {
    href: "/resumir-relatorio-pdf",
    eyebrow: "Negócios",
    title: "Relatório executivo",
    body: "Pontos-chave, números que importam e conclusão — sem ler 80 páginas.",
    code: "REL",
  },
  {
    href: "/resumir-boleto-ou-fatura",
    eyebrow: "Finanças",
    title: "Boleto ou fatura",
    body: "Vencimento, valor, juros, multa e linha digitável em segundos.",
    code: "BLT",
  },
] as const;

const compareRows = [
  ["Cita a página de origem", "Em toda resposta", "Só se você pedir"],
  ["Pronto pra contrato CLT, edital, apólice", "Sim, com modo dedicado", "Você precisa montar o prompt"],
  ["Resumo grátis sem cadastro", "Sim", "Não"],
  ["Pagamento em real", "R$29/mês", "USD no ChatGPT Plus"],
  ["Atendimento em português", "É a língua-mãe da ferramenta", "Tradução do inglês"],
] as const;

const faqs = [
  {
    q: "É realmente grátis?",
    a: "É. PDFs de até 10 páginas você resume sem pagar e sem criar conta — pra ver se a saída serve antes de assinar. Premium (R$29/mês) entra quando você quer chat com o documento, citação por página e PDFs maiores (até 100 páginas).",
  },
  {
    q: "Qual a diferença pro ChatGPT?",
    a: "Três coisas. Toda resposta no PDFIA aponta a página de onde veio — ChatGPT só faz isso se você pedir, e mesmo assim alucina. Quando a informação não está no PDF, a gente avisa em vez de inventar. E temos modos prontos pra contrato CLT, edital de licitação e apólice brasileira — você não precisa montar prompt.",
  },
  {
    q: "Meu PDF fica salvo onde?",
    a: "No grátis, o arquivo não é guardado — vira resumo e some. No Premium, o documento fica na sua biblioteca pra você voltar e perguntar mais depois. Cancelando o Premium, você tem 30 dias pra baixar tudo antes de excluirmos.",
  },
  {
    q: "Funciona com PDF digitalizado (escaneado)?",
    a: "Hoje só com texto selecionável. Se o PDF é uma foto/imagem, ele precisa passar por OCR antes — estamos colocando OCR automático no Premium em breve.",
  },
  {
    q: "Dá pra cancelar a qualquer hora?",
    a: "Dá. Premium é mensal ou anual via Stripe, sem fidelidade — cancela direto na conta e o acesso continua até o fim do período pago.",
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
              Resuma e converse com qualquer{" "}
              <span className="bg-apollo-gold px-[0.05em]">PDF</span> em português.
            </h1>
            <p className="mx-auto mt-6 max-w-[620px] text-body-lg text-charcoal-text">
              Solte o PDF, leia o resumo em segundos e pergunte o que quiser ao
              documento — com a página exata em cada resposta. Feito pra contrato,
              edital, laudo e relatório que aparecem na sua semana.
            </p>
          </div>

          <div className="mt-16 grid overflow-hidden rounded-lg border border-midnight-ink bg-crisp-white md:grid-cols-[1.4fr_1fr]">
            <div className="border-b border-subtle-gray p-card-elevated md:border-b-0 md:border-r">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <Eyebrow>Comece em 30 segundos</Eyebrow>
                <MonoLabel>Grátis · até 10 págs</MonoLabel>
              </div>
              <div className="mt-6">
                <InlineUpload size="large" />
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <ButtonLink href="/resumir-pdf" variant="primary" size="md">
                  Resumir um PDF agora
                </ButtonLink>
                <ButtonLink href="/login" variant="secondary" size="md">
                  Já tenho conta
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
            title="Três passos. Sem prompt, sem instalar nada."
            maxWidth="narrow"
            cta={
              <ButtonLink
                href="/guias/como-resumir-pdf-com-ia"
                variant="secondary"
                size="sm"
              >
                Ver guia passo a passo →
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
            eyebrow="Pra que tipo de PDF"
            title="Feito pros documentos chatos que aparecem na sua semana."
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
              <Eyebrow>PDFIA vs ChatGPT</Eyebrow>
              <h2 className="mt-3.5 font-display text-heading-lg font-semibold text-midnight-ink text-[clamp(32px,4vw,48px)]">
                Por que não resolver no ChatGPT?
              </h2>
              <p className="mt-6 text-body text-charcoal-text">
                Você pode — mas vai gastar o dobro do tempo montando prompt,
                conferindo se a resposta está mesmo no PDF e converrtendo dólar
                pra real. Ferramenta dedicada custa menos e erra menos.
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
            title="Simples, em real, sem fidelidade."
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
                <li>· Tópicos, datas, valores e nomes em destaque</li>
                <li>· Sem chat com o documento</li>
                <li>· Sem histórico — o arquivo não fica salvo</li>
              </ul>
              <ButtonLink
                href="/resumir-pdf"
                variant="secondary"
                size="md"
                className="mt-6 w-full"
              >
                Testar de graça
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
                <li>· Chat com o PDF — cada resposta cita a página</li>
                <li>· PDFs até 100 páginas (contratos longos, editais)</li>
                <li>· Modos prontos: contrato CLT, edital, apólice, laudo</li>
                <li>· Biblioteca salva — volte a qualquer documento</li>
              </ul>
              <ButtonLink
                href="/precos"
                variant="primary"
                size="md"
                className="mt-6 w-full"
              >
                Assinar Premium · R$29/mês
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
              title="O que a galera pergunta antes de assinar."
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
              title="Solte um PDF aí em cima. O resumo sai antes do café esfriar."
              maxWidth="default"
              tone="white"
              eyebrowTone="accent"
            />
            <div className="flex flex-wrap gap-3">
              <ButtonLink href="/resumir-pdf" variant="primary" size="lg">
                Resumir PDF grátis
              </ButtonLink>
              <ButtonLink href="/precos" variant="secondary-on-dark" size="lg">
                Ver o Premium
              </ButtonLink>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
