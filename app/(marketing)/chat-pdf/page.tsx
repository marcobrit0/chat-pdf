import type { Metadata } from "next";
import Link from "next/link";

import { AnonymousSummaryFlow } from "@/components/marketing/AnonymousSummaryFlow";
import { Breadcrumbs } from "@/components/marketing/Breadcrumbs";
import { JsonLd, faqSchema } from "@/components/seo/JsonLd";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Chat PDF — converse com seus documentos em português",
  description:
    "Faça perguntas ao seu PDF e receba respostas com citação de página. Resumo gratuito sem cadastro; Premium para chat com o documento e PDFs longos.",
  path: "/chat-pdf",
});

const faqs = [
  {
    q: "O chat com PDF é grátis?",
    a: "O resumo é grátis e não exige cadastro. O chat com o documento — perguntas e respostas com citação de página — é Premium (R$29/mês ou R$290/ano).",
  },
  {
    q: "Toda resposta vem com fonte?",
    a: "Sim. Cada resposta no Premium cita a página de origem dentro do PDF. Quando a informação não está no documento, o ChatPDF Brasil avisa em vez de inventar.",
  },
  {
    q: "Funciona em quais tipos de PDF?",
    a: "Contratos (CLT, prestação de serviços), editais de licitação, apólices de seguro, laudos médicos, relatórios, manuais e qualquer PDF com texto selecionável em português.",
  },
  {
    q: "Posso voltar e perguntar mais depois?",
    a: "Sim no Premium: o documento fica vinculado à sua conta com histórico das conversas. No plano gratuito, o resumo é gerado uma vez e o arquivo descartado.",
  },
  {
    q: "Quantas páginas o chat aguenta?",
    a: "PDFs até 100 páginas no Premium. Para documentos maiores, divida em partes ou fale conosco.",
  },
];

const sampleConversation = [
  {
    role: "user" as const,
    text: "Qual o prazo de aviso prévio neste contrato?",
  },
  {
    role: "assistant" as const,
    text:
      "O contrato prevê aviso prévio de 30 dias, podendo ser proporcional ao tempo de serviço conforme a Lei 12.506/2011 — chega a 90 dias para vínculos longos.",
    citation: "p. 4, cláusula 6.2",
  },
  {
    role: "user" as const,
    text: "Tem cláusula de não-concorrência?",
  },
  {
    role: "assistant" as const,
    text:
      "Sim. A cláusula 11 estabelece restrição de 12 meses dentro do mesmo segmento, mas a contraprestação financeira não está definida — verifique antes de assinar.",
    citation: "p. 8, cláusula 11",
  },
];

export default function ChatPdfPage() {
  return (
    <>
      <JsonLd data={faqSchema(faqs)} />
      <article className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 md:py-14">
        <Breadcrumbs
          items={[
            { label: "Início", path: "/" },
            { label: "Chat PDF", path: "/chat-pdf" },
          ]}
        />

        <header className="mt-6 grid gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:items-end">
          <div>
            <p className="font-condensed text-xs uppercase tracking-[0.22em] text-faded-stone">
              Chat com PDF
            </p>
            <h1 className="mt-3 font-display text-[clamp(2.25rem,5vw,3.5rem)] font-semibold leading-[1.05] tracking-tight text-midnight-ink">
              Pergunte ao seu PDF e receba respostas com a página citada.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-charcoal-text sm:text-lg">
              Comece pelo resumo gratuito. Quando precisar fazer perguntas
              específicas — cláusulas de contrato, prazos do edital, exclusões
              da apólice — entre no Premium para chat com citação de página.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/precos"
                className="inline-flex items-center justify-center rounded-[length:var(--radius-buttons)] bg-apollo-gold px-5 py-3 text-base font-medium text-midnight-ink"
              >
                Liberar chat (Premium)
              </Link>
              <Link
                href="#resumir"
                className="inline-flex items-center justify-center rounded-[length:var(--radius-buttons)] border border-midnight-ink px-5 py-3 text-base font-medium text-midnight-ink"
              >
                Testar resumo grátis
              </Link>
            </div>
          </div>

          <ChatPreview conversation={sampleConversation} />
        </header>

        <section
          id="resumir"
          className="mt-20 grid scroll-mt-20 gap-10 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]"
        >
          <div>
            <p className="font-condensed text-xs uppercase tracking-[0.22em] text-faded-stone">
              Comece pelo resumo
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-midnight-ink">
              Sem cadastro. Sem promessa de chat ilimitado.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-charcoal-text">
              O resumo gratuito te mostra do que o documento trata em segundos.
              Se precisar de chat com fontes ou de PDFs maiores, o Premium é o
              próximo passo natural.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-charcoal-text">
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-block h-2 w-2 shrink-0 bg-apollo-gold" />
                Resumo estruturado com tópicos, datas e entidades.
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-block h-2 w-2 shrink-0 bg-apollo-gold" />
                Perguntas de follow-up sugeridas para você aprofundar.
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-block h-2 w-2 shrink-0 bg-apollo-gold" />
                Aviso claro quando a resposta não está no PDF.
              </li>
            </ul>
          </div>
          <div>
            <AnonymousSummaryFlow />
          </div>
        </section>

        <section className="mt-20 grid gap-10 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div>
            <p className="font-condensed text-xs uppercase tracking-[0.22em] text-faded-stone">
              Perguntas frequentes
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-midnight-ink">
              Sobre chat com PDF
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
                href="/resumir-pdf"
                className="text-midnight-ink underline underline-offset-4"
              >
                Resumir PDF
              </Link>
            </li>
            <li>
              <Link
                href="/chatpdf-vs-chatgpt"
                className="text-midnight-ink underline underline-offset-4"
              >
                ChatPDF vs ChatGPT
              </Link>
            </li>
            <li>
              <Link
                href="/analisar-contrato-com-ia"
                className="text-midnight-ink underline underline-offset-4"
              >
                Analisar contrato com IA
              </Link>
            </li>
            <li>
              <Link
                href="/ler-edital-com-ia"
                className="text-midnight-ink underline underline-offset-4"
              >
                Ler edital com IA
              </Link>
            </li>
          </ul>
        </section>
      </article>
    </>
  );
}

function ChatPreview({
  conversation,
}: {
  conversation: Array<{
    role: "user" | "assistant";
    text: string;
    citation?: string;
  }>;
}) {
  return (
    <div className="overflow-hidden rounded-[length:var(--radius-cards)] border border-midnight-ink bg-crisp-white">
      <div className="flex items-center justify-between border-b border-subtle-gray px-5 py-3">
        <p className="font-condensed text-xs uppercase tracking-[0.2em] text-faded-stone">
          Exemplo · contrato CLT
        </p>
        <span className="font-condensed text-xs text-faded-stone">12 págs</span>
      </div>
      <ul className="divide-y divide-subtle-gray">
        {conversation.map((m, idx) => (
          <li
            key={idx}
            className={
              "px-5 py-4 " +
              (m.role === "user" ? "bg-canvas" : "bg-crisp-white")
            }
          >
            <p className="font-condensed text-[10px] uppercase tracking-[0.22em] text-faded-stone">
              {m.role === "user" ? "Você" : "ChatPDF Brasil"}
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-graphite">
              {m.text}
            </p>
            {m.citation ? (
              <p className="mt-2 inline-flex font-mono text-xs text-faded-stone">
                {m.citation}
              </p>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
