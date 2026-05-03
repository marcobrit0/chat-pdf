import Link from "next/link";

import { Breadcrumbs } from "@/components/marketing/Breadcrumbs";
import { JsonLd, faqSchema } from "@/components/seo/JsonLd";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "ChatPDF vs ChatGPT — qual usar para PDFs?",
  description:
    "Comparação direta entre ChatPDF Brasil e ChatGPT para ler PDFs: citação de página, modos por tipo de documento, plano gratuito e preço em BRL.",
  path: "/chatpdf-vs-chatgpt",
});

const comparison = [
  {
    label: "Upload de PDF",
    you: "Upload direto, processado para chat",
    them: "Upload por sessão, sem persistência",
  },
  {
    label: "Citação de página",
    you: "Sempre, por padrão",
    them: "Só se você pedir no prompt",
  },
  {
    label: "Aviso quando a resposta não está no PDF",
    you: "Sim",
    them: "Nem sempre",
  },
  {
    label: "Modos para contratos, editais, apólices",
    you: "Sim",
    them: "Não — prompt manual",
  },
  {
    label: "Histórico do documento",
    you: "Sim (Premium)",
    them: "Por sessão",
  },
  {
    label: "Preço",
    you: "Gratuito (básico) / Premium em BRL",
    them: "ChatGPT Plus em USD",
  },
];

const faqs = [
  {
    q: "Preciso pagar o ChatGPT Plus para usar PDFs?",
    a: "Sim, o upload de PDFs no ChatGPT exige o plano Plus (USD). O ChatPDF Brasil tem resumo gratuito sem conta e Premium em BRL.",
  },
  {
    q: "O ChatGPT perde contexto em documentos longos?",
    a: "Pode. Em PDFs muito longos, o contexto pode ser truncado. Ferramentas dedicadas fazem chunking do documento e selecionam trechos relevantes por pergunta.",
  },
  {
    q: "Quando o ChatGPT é melhor?",
    a: "Se você já é assinante do Plus e a tarefa é pontual, ou precisa de outras tarefas além de leitura de PDF (geração de código, análise de imagem, etc.). Para PDFs em PT-BR de forma recorrente, uma ferramenta dedicada poupa fricção.",
  },
];

export default function ChatpdfVsChatgptPage() {
  return (
    <>
      <JsonLd data={faqSchema(faqs)} />
      <article className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 md:py-14">
        <Breadcrumbs
          items={[
            { label: "Início", path: "/" },
            { label: "Comparações", path: "/precos" },
            { label: "vs ChatGPT", path: "/chatpdf-vs-chatgpt" },
          ]}
        />

        <header className="mt-6 max-w-3xl">
          <p className="font-condensed text-xs uppercase tracking-[0.22em] text-faded-stone">
            ChatPDF Brasil vs ChatGPT
          </p>
          <h1 className="mt-3 font-display text-[clamp(2.25rem,5vw,3.5rem)] font-semibold leading-[1.05] tracking-tight text-midnight-ink">
            ChatGPT lê PDFs. Ferramentas dedicadas leem melhor.
          </h1>
          <p className="mt-5 text-base leading-relaxed text-charcoal-text sm:text-lg">
            ChatGPT é genérico — também aceita PDFs. O ChatPDF Brasil foi
            construído para isso: upload direto, respostas ancoradas no texto,
            citação de página por padrão e modos para contratos, editais e
            apólices.
          </p>
        </header>

        {/* —— Verdict card —— */}
        <section className="mt-10 grid gap-6 rounded-[length:var(--radius-cards)] border border-subtle-gray bg-crisp-white p-6 md:grid-cols-2 md:p-8">
          <div>
            <p className="font-condensed text-xs uppercase tracking-[0.22em] text-faded-stone">
              Em 30 segundos
            </p>
            <h2 className="mt-3 font-display text-xl font-semibold text-midnight-ink">
              Use ChatPDF Brasil
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-charcoal-text">
              Para PDFs em português, leitura recorrente, contratos, editais e
              apólices, e quando você quer ver de onde veio cada resposta.
            </p>
          </div>
          <div>
            <p className="font-condensed text-xs uppercase tracking-[0.22em] text-faded-stone">
              Em 30 segundos
            </p>
            <h2 className="mt-3 font-display text-xl font-semibold text-midnight-ink">
              Use ChatGPT Plus
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-charcoal-text">
              Para tarefas variadas (não só PDFs) ou se já é assinante. Lembre
              que upload de PDF exige o plano Plus em USD.
            </p>
          </div>
        </section>

        {/* —— Comparison table at top of body —— */}
        <section className="mt-14">
          <h2 className="font-display text-3xl font-semibold leading-tight text-midnight-ink">
            Comparação direta
          </h2>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-midnight-ink text-left">
                  <th className="py-4 pr-6 font-medium text-faded-stone">
                    Recurso
                  </th>
                  <th className="py-4 pr-6 font-medium text-midnight-ink">
                    ChatPDF Brasil
                  </th>
                  <th className="py-4 font-medium text-faded-stone">
                    ChatGPT
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-subtle-gray text-charcoal-text">
                {comparison.map((row) => (
                  <tr key={row.label}>
                    <td className="py-4 pr-6">{row.label}</td>
                    <td className="py-4 pr-6 font-medium text-midnight-ink">
                      {row.you}
                    </td>
                    <td className="py-4 text-faded-stone">{row.them}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* —— CTA card —— */}
        <section className="mt-14 rounded-[length:var(--radius-cards)] border border-midnight-ink bg-canvas p-8">
          <p className="font-condensed text-xs uppercase tracking-[0.22em] text-faded-stone">
            Teste sem compromisso
          </p>
          <h2 className="mt-3 font-display text-2xl font-semibold text-midnight-ink">
            Resumo gratuito sem cadastro para PDFs até 10 páginas.
          </h2>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/resumir-pdf"
              className="inline-flex items-center justify-center rounded-[length:var(--radius-buttons)] bg-apollo-gold px-5 py-3 text-base font-medium text-midnight-ink"
            >
              Resumir PDF grátis
            </Link>
            <Link
              href="/precos"
              className="inline-flex items-center justify-center rounded-[length:var(--radius-buttons)] border border-midnight-ink px-5 py-3 text-base font-medium text-midnight-ink"
            >
              Ver Premium
            </Link>
          </div>
        </section>

        {/* —— FAQ —— */}
        <section className="mt-16 grid gap-10 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <h2 className="font-display text-3xl font-semibold leading-tight text-midnight-ink">
            Perguntas frequentes
          </h2>
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

        <section className="mt-12 border-t border-subtle-gray pt-8">
          <p className="font-condensed text-xs uppercase tracking-[0.2em] text-faded-stone">
            Veja também
          </p>
          <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <li>
              <Link
                href="/chatgpt-pdf"
                className="text-midnight-ink underline underline-offset-4"
              >
                ChatGPT para PDF
              </Link>
            </li>
            <li>
              <Link
                href="/alternativa-ao-chatpdf"
                className="text-midnight-ink underline underline-offset-4"
              >
                Alternativa ao ChatPDF
              </Link>
            </li>
            <li>
              <Link
                href="/chatpdf-vs-smallpdf"
                className="text-midnight-ink underline underline-offset-4"
              >
                vs Smallpdf
              </Link>
            </li>
            <li>
              <Link
                href="/chatpdf-vs-adobe-acrobat-ai"
                className="text-midnight-ink underline underline-offset-4"
              >
                vs Adobe Acrobat AI
              </Link>
            </li>
          </ul>
        </section>
      </article>
    </>
  );
}
