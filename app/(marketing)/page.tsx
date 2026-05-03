import Link from "next/link";

import { InlineUpload } from "@/components/marketing/InlineUpload";
import {
  JsonLd,
  faqSchema,
  softwareApplicationSchema,
} from "@/components/seo/JsonLd";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "ChatPDF Brasil — Resumir e conversar com PDFs em português",
  description:
    "Resuma PDFs grátis em português. Premium converte contratos, editais, laudos e relatórios em respostas com citação de página. Pagamento em BRL.",
  path: "/",
  ogTitle: "ChatPDF Brasil",
});

const useCases = [
  {
    href: "/analisar-contrato-clt",
    eyebrow: "RH · Jurídico",
    title: "Contrato de trabalho CLT",
    body: "Salário, jornada, benefícios, aviso prévio e cláusulas atípicas — antes de assinar.",
  },
  {
    href: "/ler-edital-com-ia",
    eyebrow: "Licitações",
    title: "Edital de licitação",
    body: "Objeto, prazos, garantias, exigências de habilitação e penalidades em uma página.",
  },
  {
    href: "/analisar-apolice-de-seguro",
    eyebrow: "Seguros",
    title: "Apólice de seguro",
    body: "Coberturas, exclusões, franquias e prazos — sem ler 60 páginas de letras miúdas.",
  },
  {
    href: "/entender-laudo-medico",
    eyebrow: "Saúde",
    title: "Laudo médico",
    body: "Tradução de termos técnicos para linguagem que paciente e família entendem.",
  },
  {
    href: "/resumir-relatorio-pdf",
    eyebrow: "Negócios",
    title: "Relatório executivo",
    body: "Pontos-chave, números relevantes e conclusões em tópicos prontos para colar.",
  },
  {
    href: "/resumir-boleto-ou-fatura",
    eyebrow: "Finanças",
    title: "Boleto ou fatura",
    body: "Vencimento, valor, juros, multa e linha digitável — extraídos automaticamente.",
  },
] as const;

const faqs = [
  {
    q: "É realmente grátis?",
    a: "Sim. O resumo de PDFs com até 10 páginas é gratuito e não exige cadastro. O Premium (R$29/mês ou R$290/ano) libera chat com citação de página, PDFs até 100 páginas e modos específicos para contratos, editais e apólices.",
  },
  {
    q: "Em que o ChatPDF Brasil é diferente do ChatGPT?",
    a: "O ChatPDF Brasil foi desenhado para PDFs: cita a página de origem em cada resposta, avisa quando a informação não está no documento e tem modos prontos para contratos CLT, editais e apólices brasileiras. O ChatGPT é genérico e exige plano Plus em USD para anexar PDFs.",
  },
  {
    q: "Meu PDF fica salvo?",
    a: "No plano gratuito o arquivo não é armazenado — o resumo é gerado e descartado. No Premium o documento fica vinculado à sua conta para você voltar e fazer mais perguntas depois.",
  },
  {
    q: "Funciona com PDFs digitalizados (escaneados)?",
    a: "Hoje o motor exige texto selecionável. PDFs puramente em imagem precisam de OCR antes — está no roadmap. Use a ferramenta com PDFs gerados digitalmente para o melhor resultado.",
  },
  {
    q: "Posso cancelar quando quiser?",
    a: "Sim. O Premium é mensal ou anual via Stripe; você cancela direto na sua conta sem taxa de cancelamento. O acesso permanece até o fim do período já pago.",
  },
] as const;

const flowSteps = [
  {
    label: "01",
    title: "Envie",
    body: "Solte um PDF com texto selecionável.",
  },
  {
    label: "02",
    title: "Leia",
    body: "Receba tópicos, datas, entidades e perguntas sugeridas.",
  },
  {
    label: "03",
    title: "Pergunte",
    body: "No Premium, aprofunde com respostas citadas por página.",
  },
] as const;

export default function HomePage() {
  return (
    <div className="flex flex-1 flex-col">
      <JsonLd data={softwareApplicationSchema()} />
      <JsonLd data={faqSchema(faqs.map((f) => ({ q: f.q, a: f.a })))} />

      {/* —— Hero —— */}
      <section className="border-b border-subtle-gray bg-canvas">
        <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 py-14 sm:px-6 md:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)] md:items-end md:py-24">
          <div className="space-y-7">
            <p className="font-condensed text-xs uppercase tracking-[0.22em] text-faded-stone">
              Resumir e conversar com PDFs em português
            </p>
            <h1 className="font-display text-[clamp(2.6rem,7.5vw,5rem)] font-semibold leading-[1.02] tracking-tight text-midnight-ink">
              Leia PDFs<br />sem esforço.
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-charcoal-text sm:text-lg">
              Resumo grátis para PDFs curtos. Premium para conversar com o
              documento, ver a página de origem em cada resposta e analisar
              contratos, editais e apólices em segundos.
            </p>
            <ul className="grid gap-2 text-sm text-charcoal-text sm:grid-cols-3">
              <li className="border-t border-subtle-gray pt-3">
                Resumo grátis sem cadastro
              </li>
              <li className="border-t border-subtle-gray pt-3">
                Citação de página por padrão
              </li>
              <li className="border-t border-subtle-gray pt-3">
                Pagamento em BRL · LGPD
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <InlineUpload size="large" />
            <p className="text-xs text-faded-stone">
              Ao enviar, você concorda com os{" "}
              <Link
                href="/termos"
                className="underline underline-offset-2 hover:text-charcoal-text"
              >
                Termos
              </Link>{" "}
              e a{" "}
              <Link
                href="/privacidade"
                className="underline underline-offset-2 hover:text-charcoal-text"
              >
                Privacidade
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* —— How it works —— */}
      <section className="border-b border-subtle-gray bg-crisp-white">
        <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:py-24">
          <div className="md:sticky md:top-24 md:self-start">
            <p className="font-condensed text-xs uppercase tracking-[0.22em] text-faded-stone">
              Como funciona
            </p>
            <h2 className="mt-4 font-display text-[clamp(2rem,4vw,2.75rem)] font-semibold leading-[1.05] tracking-tight text-midnight-ink">
              Do upload à resposta com fonte em três passos.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-charcoal-text">
              Sem prompts complicados, sem modelos para escolher, sem ChatGPT
              Plus em dólar. Você envia, o ChatPDF Brasil organiza, você
              pergunta.
            </p>
          </div>
          <ol className="divide-y divide-subtle-gray border-y border-subtle-gray">
            {flowSteps.map((step) => (
              <li
                key={step.label}
                className="grid grid-cols-[64px_1fr] items-start gap-4 py-7 sm:grid-cols-[88px_1fr] sm:gap-6"
              >
                <span className="font-condensed text-sm tracking-[0.16em] text-faded-stone">
                  {step.label}
                </span>
                <div>
                  <h3 className="font-display text-2xl font-semibold leading-tight text-midnight-ink">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-base leading-relaxed text-charcoal-text">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* —— Use cases grid —— */}
      <section className="border-b border-subtle-gray bg-canvas">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 md:py-24">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="font-condensed text-xs uppercase tracking-[0.22em] text-faded-stone">
                Casos de uso
              </p>
              <h2 className="mt-4 font-display text-[clamp(2rem,4vw,2.75rem)] font-semibold leading-[1.05] tracking-tight text-midnight-ink">
                Feito para os PDFs que aparecem no seu trabalho.
              </h2>
            </div>
            <Link
              href="/precos"
              className="inline-flex items-center gap-2 self-start text-sm font-medium text-midnight-ink underline underline-offset-4 md:self-end"
            >
              Ver o que vem no Premium
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <ul className="mt-12 grid gap-px overflow-hidden border border-subtle-gray bg-subtle-gray sm:grid-cols-2 lg:grid-cols-3">
            {useCases.map((u) => (
              <li key={u.href} className="bg-canvas">
                <Link
                  href={u.href}
                  className="group flex h-full flex-col justify-between gap-8 p-7 transition-colors hover:bg-crisp-white"
                >
                  <div>
                    <p className="font-condensed text-xs uppercase tracking-[0.2em] text-faded-stone">
                      {u.eyebrow}
                    </p>
                    <h3 className="mt-3 font-display text-xl font-semibold leading-snug text-midnight-ink">
                      {u.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-charcoal-text">
                      {u.body}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-midnight-ink">
                    Abrir caso de uso
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
        </div>
      </section>

      {/* —— Comparison teaser —— */}
      <section className="border-b border-subtle-gray bg-crisp-white">
        <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:py-24">
          <div>
            <p className="font-condensed text-xs uppercase tracking-[0.22em] text-faded-stone">
              ChatPDF Brasil vs alternativas
            </p>
            <h2 className="mt-4 font-display text-[clamp(2rem,4vw,2.75rem)] font-semibold leading-[1.05] tracking-tight text-midnight-ink">
              Por que não usar só o ChatGPT?
            </h2>
            <p className="mt-5 text-base leading-relaxed text-charcoal-text">
              Ferramentas dedicadas para PDF entregam coisas que um chat
              genérico não entrega: respostas ancoradas no texto, citação de
              página por padrão, modos prontos para tipos de documento e preço
              em real.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/chatpdf-vs-chatgpt"
                className="inline-flex items-center justify-center rounded-[length:var(--radius-buttons)] border border-midnight-ink px-4 py-2.5 text-sm font-medium text-midnight-ink"
              >
                vs ChatGPT
              </Link>
              <Link
                href="/chatpdf-vs-smallpdf"
                className="inline-flex items-center justify-center rounded-[length:var(--radius-buttons)] border border-midnight-ink px-4 py-2.5 text-sm font-medium text-midnight-ink"
              >
                vs Smallpdf
              </Link>
              <Link
                href="/chatpdf-vs-adobe-acrobat-ai"
                className="inline-flex items-center justify-center rounded-[length:var(--radius-buttons)] border border-midnight-ink px-4 py-2.5 text-sm font-medium text-midnight-ink"
              >
                vs Adobe Acrobat AI
              </Link>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-subtle-gray text-left">
                  <th className="py-3 pr-6 font-medium text-faded-stone">
                    Recurso
                  </th>
                  <th className="py-3 pr-6 font-medium text-midnight-ink">
                    ChatPDF Brasil
                  </th>
                  <th className="py-3 font-medium text-faded-stone">
                    ChatGPT
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-subtle-gray text-charcoal-text">
                <tr>
                  <td className="py-3 pr-6">Citação de página</td>
                  <td className="py-3 pr-6 font-medium text-midnight-ink">
                    Padrão
                  </td>
                  <td className="py-3 text-faded-stone">Só sob pedido</td>
                </tr>
                <tr>
                  <td className="py-3 pr-6">Modos para contratos / editais</td>
                  <td className="py-3 pr-6 font-medium text-midnight-ink">
                    Sim
                  </td>
                  <td className="py-3 text-faded-stone">Prompt manual</td>
                </tr>
                <tr>
                  <td className="py-3 pr-6">Resumo grátis sem cadastro</td>
                  <td className="py-3 pr-6 font-medium text-midnight-ink">
                    Sim
                  </td>
                  <td className="py-3 text-faded-stone">Não</td>
                </tr>
                <tr>
                  <td className="py-3 pr-6">Pagamento</td>
                  <td className="py-3 pr-6 font-medium text-midnight-ink">
                    R$29/mês
                  </td>
                  <td className="py-3 text-faded-stone">USD (ChatGPT Plus)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* —— FAQ —— */}
      <section className="border-b border-subtle-gray bg-canvas">
        <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:py-24">
          <div>
            <p className="font-condensed text-xs uppercase tracking-[0.22em] text-faded-stone">
              Perguntas frequentes
            </p>
            <h2 className="mt-4 font-display text-[clamp(2rem,4vw,2.75rem)] font-semibold leading-[1.05] tracking-tight text-midnight-ink">
              Tudo o que perguntam antes de começar.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-charcoal-text">
              Não achou sua dúvida?{" "}
              <Link
                href="/precos"
                className="underline underline-offset-4 hover:text-midnight-ink"
              >
                Veja a página de preços
              </Link>{" "}
              ou{" "}
              <Link
                href="/guias"
                className="underline underline-offset-4 hover:text-midnight-ink"
              >
                leia os guias
              </Link>
              .
            </p>
          </div>
          <dl className="divide-y divide-subtle-gray border-y border-subtle-gray">
            {faqs.map((f) => (
              <details
                key={f.q}
                className="group border-0 py-5 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-left">
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
        </div>
      </section>

      {/* —— Final CTA —— */}
      <section className="bg-midnight-ink">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-16 sm:px-6 md:flex-row md:items-end md:justify-between md:py-20">
          <div className="max-w-xl">
            <p className="font-condensed text-xs uppercase tracking-[0.22em] text-apollo-gold">
              Comece grátis
            </p>
            <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.05] tracking-tight text-crisp-white">
              Envie um PDF agora — o primeiro resumo sai em segundos.
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/resumir-pdf"
              className="inline-flex items-center justify-center rounded-[length:var(--radius-buttons)] bg-apollo-gold px-5 py-3 text-base font-medium text-midnight-ink"
            >
              Resumir PDF grátis
            </Link>
            <Link
              href="/precos"
              className="inline-flex items-center justify-center rounded-[length:var(--radius-buttons)] border border-crisp-white px-5 py-3 text-base font-medium text-crisp-white"
            >
              Ver planos Premium
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
