import Link from "next/link";

import { InlineUpload } from "@/components/marketing/InlineUpload";
import {
  JsonLd,
  faqSchema,
  softwareApplicationSchema,
} from "@/components/seo/JsonLd";
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

      {/* —— Hero ——
           Design: outer top block has padding 64px 32px 0; max-width 1240. */}
      <section className="border-b border-subtle-gray bg-canvas">
        <div className="mx-auto w-full max-w-[1240px] px-8 pt-16">
          <p className="font-condensed text-[11px] uppercase tracking-[0.22em] text-faded-stone">
            Para quem trabalha com PDFs todo dia
          </p>
          <h1 className="mt-6 font-display text-[clamp(72px,11vw,168px)] font-semibold leading-[0.92] tracking-[-0.04em] text-midnight-ink">
            PDF, em
            <br />
            português,
            <br />
            com{" "}
            <span className="bg-apollo-gold px-[0.05em]">fonte</span>.
          </h1>
          <p className="mt-8 max-w-[620px] text-[19px] leading-relaxed text-charcoal-text">
            Resumo grátis sem cadastro. Chat com citação de página no Premium.
            Modos prontos para contratos, editais e apólices brasileiras.
          </p>
        </div>

        {/* Hero card: design has margin '64px auto 0' and padding '0 32px 88px'. */}
        <div className="mx-auto mt-16 w-full max-w-[1240px] px-8 pb-[88px]">
          <div className="grid overflow-hidden rounded-[8px] border border-midnight-ink bg-crisp-white md:grid-cols-[1.4fr_1fr]">
            <div className="border-b border-subtle-gray p-8 md:border-b-0 md:border-r">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="font-condensed text-[11px] uppercase tracking-[0.22em] text-faded-stone">
                  Comece em segundos
                </p>
                <span className="font-mono text-[12px] uppercase tracking-[0.06em] text-faded-stone">
                  Grátis · 10 págs
                </span>
              </div>
              <div className="mt-4">
                <InlineUpload size="large" />
              </div>
              <div className="mt-[18px] flex flex-wrap gap-3">
                <Link
                  href="/resumir-pdf"
                  className="inline-flex items-center justify-center rounded-[8px] border border-apollo-gold bg-apollo-gold px-[18px] py-3 text-sm font-medium text-midnight-ink hover:opacity-90"
                >
                  Resumir PDF grátis
                </Link>
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center rounded-[8px] border border-midnight-ink px-[18px] py-3 text-sm font-medium text-midnight-ink hover:bg-midnight-ink hover:text-crisp-white"
                >
                  Entrar
                </Link>
              </div>
            </div>
            <div className="bg-canvas p-8">
              <div className="flex items-center justify-between">
                <p className="font-condensed text-[11px] uppercase tracking-[0.22em] text-faded-stone">
                  Saída esperada
                </p>
                <span className="rounded-[4px] border border-subtle-gray bg-crisp-white px-1.5 py-0.5 font-mono text-[11px] tracking-[0.04em] text-charcoal-text">
                  demo
                </span>
              </div>
              <h3 className="mt-3 font-display text-lg font-semibold tracking-tight text-midnight-ink">
                Contrato de prestação · 14 págs
              </h3>
              <ul className="mt-4 grid gap-2.5 text-[13px] text-charcoal-text">
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
                      <strong className="font-medium text-midnight-ink">
                        {strong as string}
                      </strong>
                      {suffix as string}{" "}
                      <span className="ml-1 inline-flex items-center rounded-[4px] border border-subtle-gray bg-crisp-white px-1.5 py-0.5 font-mono text-[11px] tracking-[0.04em] text-charcoal-text">
                        pág. {page as number}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* —— Stats strip ——
           Design: bg midnight-ink, no vertical padding outer, cells 40px 28px. */}
      <section className="border-b border-midnight-ink bg-midnight-ink">
        <div className="mx-auto w-full max-w-[1240px] px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {stats.map(([n, l], i) => (
              <div
                key={l}
                className={
                  "px-7 py-10 " +
                  (i < stats.length - 1
                    ? "border-b border-[#2a2a2a] sm:border-b-0 lg:border-r"
                    : "")
                }
              >
                <div className="font-display text-[48px] font-semibold leading-none tracking-tight text-crisp-white">
                  {n}
                </div>
                <div className="mt-2.5 font-mono text-[11px] uppercase tracking-[0.1em] text-soft-stone">
                  {l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* —— How it works ——  py-[88px] px-8 */}
      <section className="border-b border-subtle-gray bg-canvas">
        <div className="mx-auto w-full max-w-[1240px] px-8 py-[88px]">
          <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-[540px]">
              <p className="font-condensed text-[11px] uppercase tracking-[0.22em] text-faded-stone">
                Como funciona
              </p>
              <h2 className="mt-3.5 font-display text-[clamp(32px,4vw,44px)] font-semibold leading-[1.08] tracking-[-0.018em] text-midnight-ink">
                Do upload à resposta com fonte em três passos.
              </h2>
            </div>
            <Link
              href="/guias/como-resumir-pdf-com-ia"
              className="self-start rounded-[6px] border border-midnight-ink px-3 py-2 text-[13px] font-medium text-midnight-ink hover:bg-midnight-ink hover:text-crisp-white md:self-end"
            >
              Ver demo completo →
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {howItWorks.map(([n, t, b]) => (
              <article
                key={n}
                className="relative min-h-[200px] rounded-[8px] border border-subtle-gray bg-crisp-white p-6"
              >
                <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-faded-stone">
                  {n} · passo
                </p>
                <h3 className="mt-3.5 font-display text-2xl font-semibold leading-tight tracking-[-0.018em] text-midnight-ink">
                  {t}
                </h3>
                <p className="mt-2.5 text-[14px] leading-relaxed text-charcoal-text">
                  {b}
                </p>
                <span
                  aria-hidden="true"
                  className="absolute bottom-6 right-6 text-soft-stone"
                >
                  →
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* —— Use cases —— ash-gray, py-[88px] px-8 */}
      <section
        id="casos-de-uso"
        className="scroll-mt-24 border-b border-subtle-gray bg-ash-gray"
      >
        <div className="mx-auto w-full max-w-[1240px] px-8 py-[88px]">
          <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-[640px]">
              <p className="font-condensed text-[11px] uppercase tracking-[0.22em] text-faded-stone">
                Casos de uso
              </p>
              <h2 className="mt-3.5 font-display text-[clamp(32px,4vw,44px)] font-semibold leading-[1.08] tracking-[-0.018em] text-midnight-ink">
                Feito para os PDFs que aparecem no seu trabalho.
              </h2>
            </div>
            <Link
              href="/precos"
              className="self-start rounded-[6px] border border-midnight-ink px-3 py-2 text-[13px] font-medium text-midnight-ink hover:bg-midnight-ink hover:text-crisp-white md:self-end"
            >
              Ver todos os modos →
            </Link>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {useCases.map((u) => (
              <li key={u.href}>
                <Link
                  href={u.href}
                  className="flex h-full flex-col gap-4 rounded-[8px] border border-subtle-gray bg-crisp-white p-6 transition-colors hover:border-midnight-ink"
                >
                  <div className="flex items-center justify-between">
                    <span className="rounded-full border border-subtle-gray bg-canvas px-2.5 py-1.5 font-condensed text-[11px] uppercase tracking-[0.18em] text-charcoal-text">
                      {u.eyebrow}
                    </span>
                    <span className="font-mono text-[11px] tracking-[0.06em] text-faded-stone">
                      {u.code}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-semibold leading-snug tracking-[-0.018em] text-midnight-ink">
                      {u.title}
                    </h3>
                    <p className="mt-2 text-[13px] leading-relaxed text-charcoal-text">
                      {u.body}
                    </p>
                  </div>
                  <div className="mt-auto flex items-center justify-between border-t border-subtle-gray pt-4 text-[13px] text-midnight-ink">
                    <span>Abrir caso</span>
                    <span aria-hidden="true">→</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* —— Compare teaser —— py-[88px] px-8, gap 48 */}
      <section className="border-b border-subtle-gray bg-canvas">
        <div className="mx-auto w-full max-w-[1240px] px-8 py-[88px]">
          <div className="grid gap-12 md:grid-cols-[0.9fr_1.4fr] md:items-start">
            <div>
              <p className="font-condensed text-[11px] uppercase tracking-[0.22em] text-faded-stone">
                PDFIA vs alternativas
              </p>
              <h2 className="mt-3.5 font-display text-[clamp(32px,4vw,44px)] font-semibold leading-[1.08] tracking-[-0.018em] text-midnight-ink">
                Por que não usar só o ChatGPT?
              </h2>
              <p className="mt-[18px] text-[15px] leading-relaxed text-charcoal-text">
                Ferramentas dedicadas para PDF entregam coisas que um chat
                genérico não entrega.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {[
                  ["/chatpdf-vs-chatgpt", "vs ChatGPT"],
                  ["/chatpdf-vs-smallpdf", "vs Smallpdf"],
                  ["/chatpdf-vs-adobe-acrobat-ai", "vs Adobe Acrobat AI"],
                ].map(([href, label]) => (
                  <Link
                    key={href}
                    href={href}
                    className="rounded-[6px] border border-midnight-ink px-3 py-2 text-[13px] font-medium text-midnight-ink hover:bg-midnight-ink hover:text-crisp-white"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="overflow-hidden rounded-[8px] border border-subtle-gray bg-crisp-white">
              <div className="grid grid-cols-[1.4fr_1fr_1fr] border-b border-subtle-gray bg-canvas">
                <div className="px-5 py-3.5 font-mono text-[11px] uppercase tracking-[0.06em] text-faded-stone">
                  Recurso
                </div>
                <div className="border-l border-subtle-gray px-5 py-3.5 font-mono text-[11px] uppercase tracking-[0.06em] text-midnight-ink">
                  PDFIA
                </div>
                <div className="border-l border-subtle-gray px-5 py-3.5 font-mono text-[11px] uppercase tracking-[0.06em] text-faded-stone">
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
                  <div className="px-5 py-4 text-[14px] text-charcoal-text">
                    {r[0]}
                  </div>
                  <div className="border-l border-subtle-gray px-5 py-4 text-[14px] font-medium text-midnight-ink">
                    {r[1]}
                  </div>
                  <div className="border-l border-subtle-gray px-5 py-4 text-[14px] text-faded-stone">
                    {r[2]}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* —— Pricing —— py-[88px] px-8, max card row 880 */}
      <section className="border-b border-subtle-gray bg-crisp-white">
        <div className="mx-auto w-full max-w-[1240px] px-8 py-[88px]">
          <div className="mx-auto mb-10 max-w-[620px] text-center">
            <p className="font-condensed text-[11px] uppercase tracking-[0.22em] text-faded-stone">
              Preço
            </p>
            <h2 className="mt-3.5 font-display text-[clamp(32px,4vw,44px)] font-semibold leading-[1.08] tracking-[-0.018em] text-midnight-ink">
              Simples. Em real. Sem pegadinha.
            </h2>
          </div>

          <div className="mx-auto grid max-w-[880px] gap-4 sm:grid-cols-2">
            <div className="rounded-[8px] border border-subtle-gray bg-canvas p-8">
              <div className="flex items-center justify-between">
                <p className="font-condensed text-[11px] uppercase tracking-[0.22em] text-faded-stone">
                  Grátis
                </p>
                <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-faded-stone">
                  Sem cadastro
                </span>
              </div>
              <div className="mt-[18px] flex items-baseline gap-1.5">
                <span className="font-display text-[56px] font-semibold leading-none tracking-tight text-midnight-ink">
                  R$0
                </span>
                <span className="font-mono text-[12px] tracking-[0.06em] text-faded-stone">
                  /sempre
                </span>
              </div>
              <ul className="mt-6 grid gap-2.5 text-[14px] text-charcoal-text">
                <li>· Resumo de PDFs até 10 páginas</li>
                <li>· Tópicos, datas, valores, entidades</li>
                <li>· Sem histórico salvo</li>
                <li>· Sem chat com o documento</li>
              </ul>
              <Link
                href="/resumir-pdf"
                className="mt-6 inline-flex w-full items-center justify-center rounded-[8px] border border-midnight-ink px-[18px] py-3 text-sm font-medium text-midnight-ink hover:bg-midnight-ink hover:text-crisp-white"
              >
                Resumir um PDF agora
              </Link>
            </div>

            <div className="relative rounded-[8px] border-2 border-midnight-ink bg-crisp-white p-8">
              <span className="absolute -top-3 left-6 rounded-[4px] bg-apollo-gold px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.06em] text-midnight-ink">
                Recomendado
              </span>
              <div className="flex items-center justify-between">
                <p className="font-condensed text-[11px] uppercase tracking-[0.22em] text-faded-stone">
                  Premium
                </p>
                <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-faded-stone">
                  Stripe · BRL
                </span>
              </div>
              <div className="mt-[18px] flex items-baseline gap-1.5">
                <span className="font-display text-[56px] font-semibold leading-none tracking-tight text-midnight-ink">
                  R$29
                </span>
                <span className="font-mono text-[12px] tracking-[0.06em] text-faded-stone">
                  /mês · ou R$290/ano
                </span>
              </div>
              <ul className="mt-6 grid gap-2.5 text-[14px] text-charcoal-text">
                <li>· Tudo do grátis +</li>
                <li>· Chat com citação de página</li>
                <li>· PDFs até 100 páginas</li>
                <li>· Modos: contrato, edital, apólice</li>
                <li>· Histórico salvo na conta</li>
              </ul>
              <Link
                href="/login"
                className="mt-6 inline-flex w-full items-center justify-center rounded-[8px] border border-apollo-gold bg-apollo-gold px-[18px] py-3 text-sm font-medium text-midnight-ink hover:opacity-90"
              >
                Começar Premium
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* —— FAQ —— py-[88px] px-8, gap 64 */}
      <section className="border-b border-subtle-gray bg-canvas">
        <div className="mx-auto w-full max-w-[1240px] px-8 py-[88px]">
          <div className="grid gap-16 md:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="font-condensed text-[11px] uppercase tracking-[0.22em] text-faded-stone">
                Perguntas frequentes
              </p>
              <h2 className="mt-3.5 font-display text-[clamp(32px,4vw,44px)] font-semibold leading-[1.08] tracking-[-0.018em] text-midnight-ink">
                Tudo o que perguntam antes de começar.
              </h2>
            </div>
            <div className="overflow-hidden rounded-[8px] border border-subtle-gray bg-crisp-white">
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
                    <span className="font-display text-base font-semibold tracking-[-0.018em] text-midnight-ink">
                      {f.q}
                    </span>
                    <span
                      aria-hidden="true"
                      className="font-mono text-faded-stone transition-transform group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <div className="max-w-[620px] px-6 pb-5 text-[14px] leading-relaxed text-charcoal-text">
                    {f.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* —— Final CTA —— py-20 (80) px-8 */}
      <section className="bg-midnight-ink">
        <div className="mx-auto flex w-full max-w-[1240px] flex-col gap-10 px-8 py-20 md:flex-row md:items-end md:justify-between">
          <div className="max-w-[620px]">
            <p className="font-condensed text-[11px] uppercase tracking-[0.22em] text-apollo-gold">
              Comece grátis
            </p>
            <h2 className="mt-3.5 font-display text-[clamp(32px,4vw,48px)] font-semibold leading-[1.08] tracking-[-0.018em] text-crisp-white">
              Envie um PDF agora — o primeiro resumo sai em segundos.
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/resumir-pdf"
              className="inline-flex items-center justify-center rounded-[8px] border border-apollo-gold bg-apollo-gold px-[22px] py-4 text-base font-medium text-midnight-ink hover:opacity-90"
            >
              Resumir PDF grátis
            </Link>
            <Link
              href="/precos"
              className="inline-flex items-center justify-center rounded-[8px] border border-crisp-white px-[22px] py-4 text-base font-medium text-crisp-white hover:bg-crisp-white hover:text-midnight-ink"
            >
              Ver Premium
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
