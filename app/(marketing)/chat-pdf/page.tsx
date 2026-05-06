import type { Metadata } from "next";
import Link from "next/link";

import { AnonymousSummaryFlow } from "@/components/marketing/AnonymousSummaryFlow";
import { Breadcrumbs } from "@/components/marketing/Breadcrumbs";
import { JsonLd, faqSchema } from "@/components/seo/JsonLd";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Chat PDF em português — pergunte ao documento e receba a página citada | PDFIA",
  description:
    "Chat com PDF em português: pergunta o que quiser e a IA responde citando a página exata do documento. Resumo grátis sem cadastro. Premium pra chat completo, PDFs longos e biblioteca salva.",
  path: "/chat-pdf",
});

const faqs = [
  {
    q: "O chat com PDF é grátis?",
    a: "O resumo é grátis e não pede cadastro. Já o chat — perguntar ao documento e receber a página de origem — é Premium (R$29/mês ou R$290/ano). É o que paga a infraestrutura por trás.",
  },
  {
    q: "Toda resposta vem com a página de fonte?",
    a: "Vem. Cada resposta no Premium aponta a página de onde a informação saiu. E quando a info não está no PDF, a gente avisa em vez de inventar — alucinação aqui não tem espaço.",
  },
  {
    q: "Funciona em qual tipo de PDF?",
    a: "Contrato CLT, contrato de prestação de serviços, edital de licitação, apólice de seguro, laudo médico, relatório, manual técnico — qualquer PDF com texto selecionável em português.",
  },
  {
    q: "Dá pra voltar e perguntar mais depois?",
    a: "No Premium, sim — o PDF fica salvo na sua conta com todo o histórico de conversa. No grátis, o resumo é gerado uma vez e o arquivo é descartado na sequência.",
  },
  {
    q: "Quantas páginas o chat aguenta?",
    a: "Até 100 páginas no Premium — cobre contrato longo, edital de licitação, apólice grande. Pra documentos maiores que isso, divida em partes ou fala com a gente.",
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
            <p className="eyebrow text-faded-stone">
              Chat com PDF · em português
            </p>
            <h1 className="mt-3 font-display text-[clamp(2.25rem,5vw,3.5rem)] font-semibold leading-[1.05]  text-midnight-ink">
              Converse com qualquer PDF — em português, com a página citada.
            </h1>
            <p className="mt-5 max-w-2xl text-body  text-charcoal-text sm:text-body-lg">
              Faça pergunta normal, em português, sobre o seu PDF. A IA responde
              direto e mostra de qual página da fonte ela tirou — pra você
              conferir antes de tomar qualquer decisão. Funciona pra contrato,
              edital, apólice, laudo, relatório.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/precos"
                className="inline-flex items-center justify-center rounded-lg bg-apollo-gold px-5 py-3 text-body font-medium text-midnight-ink"
              >
                Conversar com o PDF · Premium R$29
              </Link>
              <Link
                href="#resumir"
                className="inline-flex items-center justify-center rounded-lg border border-midnight-ink px-5 py-3 text-body font-medium text-midnight-ink"
              >
                Testar o resumo grátis
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
            <p className="eyebrow text-faded-stone">
              Comece pelo resumo grátis
            </p>
            <h2 className="mt-4 font-display text-heading-lg font-semibold leading-tight text-midnight-ink">
              Sem cadastro. Sem promessa de chat ilimitado.
            </h2>
            <p className="mt-4 text-body  text-charcoal-text">
              O resumo grátis já te mostra do que o PDF trata em segundos.
              Quando precisar perguntar mais, o Premium é o próximo passo
              natural — e você só assina depois de ver que serve.
            </p>
            <ul className="mt-6 space-y-3 text-body-sm text-charcoal-text">
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-block h-2 w-2 shrink-0 bg-apollo-gold" />
                Resumo direto, com tópicos, datas e nomes em destaque.
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-block h-2 w-2 shrink-0 bg-apollo-gold" />
                Perguntas sugeridas pra você ir mais fundo no documento.
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-block h-2 w-2 shrink-0 bg-apollo-gold" />
                A gente nunca inventa: avisa claro quando não está no PDF.
              </li>
            </ul>
          </div>
          <div>
            <AnonymousSummaryFlow />
          </div>
        </section>

        <section className="mt-20 grid gap-10 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div>
            <p className="eyebrow text-faded-stone">
              Perguntas frequentes
            </p>
            <h2 className="mt-4 font-display text-heading-lg font-semibold leading-tight text-midnight-ink">
              O que perguntam antes de assinar
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

        <section className="mt-16 border-t border-subtle-gray pt-10">
          <p className="eyebrow text-faded-stone">
            Veja também
          </p>
          <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-body-sm">
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
                PDFIA vs ChatGPT
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
    <div className="overflow-hidden rounded-lg border border-midnight-ink bg-crisp-white">
      <div className="flex items-center justify-between border-b border-subtle-gray px-5 py-3">
        <p className="eyebrow text-faded-stone">
          Exemplo · contrato CLT
        </p>
        <span className="font-condensed text-caption text-faded-stone">12 págs</span>
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
            <p className="eyebrow text-faded-stone">
              {m.role === "user" ? "Você" : "PDFIA"}
            </p>
            <p className="mt-1.5 text-body-sm  text-graphite">
              {m.text}
            </p>
            {m.citation ? (
              <p className="mt-2 inline-flex font-mono text-caption text-faded-stone">
                {m.citation}
              </p>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
