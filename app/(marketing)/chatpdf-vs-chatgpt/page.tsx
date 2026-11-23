import Link from "next/link";

import { Breadcrumbs } from "@/components/marketing/Breadcrumbs";
import { JsonLd, faqSchema } from "@/components/seo/JsonLd";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "PDFIA vs ChatGPT pra ler PDF — qual escolher? | PDFIA",
  description:
    "Comparação honesta entre PDFIA e ChatGPT pra trabalhar com PDF: citação de página no chat Premium, modos prontos por tipo de documento, plano grátis sem cadastro e pagamento em real.",
  path: "/chatpdf-vs-chatgpt",
});

const comparison = [
  {
    label: "Upload de PDF",
    you: "Upload direto, processado para chat",
    them: "Upload salvo na conta (Library)",
  },
  {
    label: "Citação de página",
    you: "Sim, no Premium",
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
    label: "Resposta em português",
    you: "PT-BR por padrão, sem configurar",
    them: "Depende do idioma do prompt",
  },
  {
    label: "Histórico do documento",
    you: "Sim (Premium)",
    them: "Sim, no histórico",
  },
  {
    label: "Preço",
    you: "Gratuito (básico) / Premium em BRL",
    them: "Grátis (3 uploads/dia) / Plus em USD",
  },
];

const faqs = [
  {
    q: "Preciso pagar o ChatGPT Plus para usar PDFs?",
    a: "Não. O plano grátis do ChatGPT permite 3 uploads de arquivo por dia; acima disso, o Plus amplia o limite (até 80 arquivos a cada 3 horas). O PDFIA tem resumo gratuito sem conta e Premium em BRL.",
  },
  {
    q: "O ChatGPT perde contexto em documentos longos?",
    a: "Pode. Em PDFs muito longos, o contexto pode ser truncado. Ferramentas dedicadas fazem chunking do documento e selecionam trechos relevantes por pergunta.",
  },
  {
    q: "Quando o ChatGPT é melhor?",
    a: "Se você já é assinante do Plus e a tarefa é pontual, ou precisa de outras tarefas além de leitura de PDF (geração de código, análise de imagem, etc.). Para PDFs em PT-BR de forma recorrente, uma ferramenta dedicada poupa fricção.",
  },
  {
    q: "Quanto custa o PDFIA Premium?",
    a: "R$29 por mês, ou R$290 por ano (R$24,17 por mês, uma economia de R$58 em relação ao mensal). Pagamento em real, por cartão via Stripe, e você cancela quando quiser.",
  },
  {
    q: "O que o plano grátis do PDFIA inclui?",
    a: "Resumo de 1 PDF por dia, de até 10 páginas, sem cadastro. O resumo traz tópicos, datas, valores e nomes em destaque, além de perguntas sugeridas pra aprofundar. O plano grátis não inclui chat com o documento nem biblioteca salva.",
  },
  {
    q: "A citação de página está no plano grátis?",
    a: "Não. A citação de página existe no chat do Premium: cada resposta cita a página exata de onde a informação saiu, pra você conferir no documento. No plano grátis não há chat — só o resumo.",
  },
  {
    q: "O PDFIA funciona com PDF escaneado?",
    a: "Não, ainda não. Hoje o PDFIA só lê PDF com texto selecionável. Se o PDF é uma foto ou imagem escaneada, ele precisa passar por OCR antes.",
  },
  {
    q: "O PDFIA responde em português?",
    a: "Sim. Interface, respostas e modos em PT-BR por padrão, sem precisar configurar nada. Ele aceita PDF em inglês e responde em português do Brasil.",
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
          <p className="eyebrow text-faded-stone">
            PDFIA vs ChatGPT
          </p>
          <h1 className="mt-3 font-display text-[clamp(2.25rem,5vw,3.5rem)] font-semibold leading-[1.05]  text-midnight-ink">
            ChatGPT lê PDF. Ferramenta dedicada lê melhor.
          </h1>
          <p className="mt-5 text-body  text-charcoal-text sm:text-body-lg">
            ChatGPT é generalista — também aceita PDF. O PDFIA foi feito do
            zero pra isso: upload direto, resposta ancorada no texto, citação de
            página em toda resposta no chat Premium e modos prontos pra
            contrato, edital, apólice e laudo brasileiro.
          </p>
        </header>

        {/* —— Verdict card —— */}
        <section className="mt-10 grid gap-6 rounded-lg border border-subtle-gray bg-crisp-white p-6 md:grid-cols-2 md:p-8">
          <div>
            <p className="eyebrow text-faded-stone">
              Em 30 segundos
            </p>
            <h2 className="mt-3 font-display text-subheading font-semibold text-midnight-ink">
              Vai de PDFIA se…
            </h2>
            <p className="mt-2 text-body-sm  text-charcoal-text">
              Você trabalha com PDF brasileiro toda semana, quer ver a página de
              origem em cada resposta e prefere pagar em real, sem ter que
              traduzir prompt nem configurar idioma.
            </p>
          </div>
          <div>
            <p className="eyebrow text-faded-stone">
              Em 30 segundos
            </p>
            <h2 className="mt-3 font-display text-subheading font-semibold text-midnight-ink">
              Vai de ChatGPT Plus se…
            </h2>
            <p className="mt-2 text-body-sm  text-charcoal-text">
              Você já é assinante e usa o ChatGPT pra mil outras coisas (código,
              imagem, brainstorm). Lembrando: no plano grátis o upload é limitado a 3 arquivos por dia — uso recorrente pede o Plus, em dólar.
            </p>
          </div>
        </section>

        {/* —— Comparison table at top of body —— */}
        <section className="mt-14">
          <h2 className="font-display text-heading-lg font-semibold leading-tight text-midnight-ink">
            Comparação direta
          </h2>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full border-collapse text-body-sm">
              <thead>
                <tr className="border-b border-midnight-ink text-left">
                  <th className="py-4 pr-6 font-medium text-faded-stone">
                    Recurso
                  </th>
                  <th className="py-4 pr-6 font-medium text-midnight-ink">
                    PDFIA
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
        <section className="mt-14 rounded-lg border border-midnight-ink bg-canvas p-8">
          <p className="eyebrow text-faded-stone">
            Testa antes de assinar nada
          </p>
          <h2 className="mt-3 font-display text-heading font-semibold text-midnight-ink">
            Resumo grátis, sem cadastro, pra PDF de até 10 páginas.
          </h2>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/resumir-pdf"
              className="inline-flex items-center justify-center rounded-lg bg-apollo-gold px-5 py-3 text-body font-medium text-midnight-ink"
            >
              Resumir PDF grátis
            </Link>
            <Link
              href="/precos"
              className="inline-flex items-center justify-center rounded-lg border border-midnight-ink px-5 py-3 text-body font-medium text-midnight-ink"
            >
              Ver o Premium
            </Link>
          </div>
        </section>

        {/* —— Free vs Premium —— */}
        <section className="mt-14">
          <h2 className="font-display text-heading-lg font-semibold leading-tight text-midnight-ink">
            O que o grátis inclui — e o que só o Premium faz
          </h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div className="rounded-lg border border-subtle-gray bg-crisp-white p-6">
              <p className="eyebrow text-faded-stone">
                Grátis — R$0, sem cadastro
              </p>
              <p className="mt-3 text-body  text-charcoal-text">
                Resumo de 1 PDF por dia, de até 10 páginas, com tópicos, datas,
                valores e nomes em destaque e perguntas sugeridas pra
                aprofundar. Sem chat com o documento e sem biblioteca salva: o
                arquivo não fica guardado depois do resumo.
              </p>
            </div>
            <div className="rounded-lg border border-subtle-gray bg-crisp-white p-6">
              <p className="eyebrow text-faded-stone">
                Premium — R$29/mês ou R$290/ano
              </p>
              <p className="mt-3 text-body  text-charcoal-text">
                PDFs de até 100 páginas, sem limite por dia. Chat com o PDF em
                que toda resposta cita a página de origem, biblioteca salva pra
                voltar ao documento quando quiser e exportação do resumo em PDF
                + Markdown.
              </p>
            </div>
          </div>
          <p className="mt-4 text-body-sm text-charcoal-text">
            Detalhes, formas de pagamento e reembolso em{" "}
            <Link
              href="/precos"
              className="text-midnight-ink underline underline-offset-4"
            >
              Preços
            </Link>
            .
          </p>
        </section>

        {/* —— Modes —— */}
        <section className="mt-14">
          <h2 className="font-display text-heading-lg font-semibold leading-tight text-midnight-ink">
            Modos prontos pra documento brasileiro
          </h2>
          <p className="mt-4 max-w-3xl text-body  text-charcoal-text">
            Cada modo já sabe o que procurar nesse tipo de documento — você não
            precisa montar prompt nem explicar o que é um edital ou uma
            apólice. Além dos modos por documento, o Premium tem resumo
            profundo, extrair dados e mapear riscos.
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            <li className="rounded-lg border border-subtle-gray bg-crisp-white p-5">
              <Link
                href="/analisar-contrato-com-ia"
                className="font-display text-body-lg font-semibold text-midnight-ink underline underline-offset-4"
              >
                Contrato CLT
              </Link>
              <p className="mt-1 text-body-sm text-charcoal-text">
                Resumo e riscos do contrato antes de assinar.
              </p>
            </li>
            <li className="rounded-lg border border-subtle-gray bg-crisp-white p-5">
              <Link
                href="/resumir-edital-de-licitacao"
                className="font-display text-body-lg font-semibold text-midnight-ink underline underline-offset-4"
              >
                Edital de licitação
              </Link>
              <p className="mt-1 text-body-sm text-charcoal-text">
                Prazos, valores e exigências do edital em um resumo só.
              </p>
            </li>
            <li className="rounded-lg border border-subtle-gray bg-crisp-white p-5">
              <Link
                href="/analisar-apolice-de-seguro"
                className="font-display text-body-lg font-semibold text-midnight-ink underline underline-offset-4"
              >
                Apólice de seguro
              </Link>
              <p className="mt-1 text-body-sm text-charcoal-text">
                Coberturas, franquia e vigência da apólice.
              </p>
            </li>
            <li className="rounded-lg border border-subtle-gray bg-crisp-white p-5">
              <Link
                href="/entender-laudo-medico"
                className="font-display text-body-lg font-semibold text-midnight-ink underline underline-offset-4"
              >
                Laudo médico
              </Link>
              <p className="mt-1 text-body-sm text-charcoal-text">
                O que o laudo diz, explicado em linguagem simples.
              </p>
            </li>
          </ul>
        </section>

        {/* —— Worked examples —— */}
        <section className="mt-14">
          <h2 className="font-display text-heading-lg font-semibold leading-tight text-midnight-ink">
            Veja um exemplo antes de enviar o seu PDF
          </h2>
          <p className="mt-4 max-w-3xl text-body  text-charcoal-text">
            Cada exemplo abaixo é um documento fictício, resumido e respondido
            pelo PDFIA — com as páginas citadas no chat Premium.
          </p>
          <ul className="mt-6 flex flex-col gap-3 text-body  text-charcoal-text">
            <li>
              <Link
                href="/exemplos/edital"
                className="text-midnight-ink underline underline-offset-4"
              >
                Exemplo de edital de licitação
              </Link>{" "}
              — 42 páginas (Premium)
            </li>
            <li>
              <Link
                href="/exemplos/contrato-clt"
                className="text-midnight-ink underline underline-offset-4"
              >
                Exemplo de contrato CLT
              </Link>{" "}
              — 4 páginas
            </li>
            <li>
              <Link
                href="/exemplos/apolice-de-seguro"
                className="text-midnight-ink underline underline-offset-4"
              >
                Exemplo de apólice de seguro
              </Link>{" "}
              — 8 páginas
            </li>
            <li>
              <Link
                href="/exemplos/laudo-medico"
                className="text-midnight-ink underline underline-offset-4"
              >
                Exemplo de laudo médico
              </Link>{" "}
              — 6 páginas
            </li>
            <li>
              <Link
                href="/exemplos/proposta-comercial"
                className="text-midnight-ink underline underline-offset-4"
              >
                Exemplo de proposta comercial
              </Link>{" "}
              — 7 páginas
            </li>
            <li>
              <Link
                href="/exemplos/boleto-fatura"
                className="text-midnight-ink underline underline-offset-4"
              >
                Exemplo de boleto / fatura
              </Link>{" "}
              — 2 páginas
            </li>
            <li>
              <Link
                href="/exemplos/relatorio"
                className="text-midnight-ink underline underline-offset-4"
              >
                Exemplo de relatório
              </Link>{" "}
              — 6 páginas
            </li>
          </ul>
        </section>

        {/* —— Limitations —— */}
        <section className="mt-14">
          <h2 className="font-display text-heading-lg font-semibold leading-tight text-midnight-ink">
            Limitações: o que o PDFIA não faz
          </h2>
          <ul className="mt-6 max-w-3xl list-disc space-y-3 pl-5 text-body  text-charcoal-text">
            <li>
              Só lê PDF com texto selecionável. PDF escaneado ou foto precisa
              passar por OCR antes — o PDFIA não faz OCR hoje.
            </li>
            <li>
              O resumo não substitui a leitura do original. Antes de decidir
              qualquer coisa, confira valores, datas e cláusulas no documento.
            </li>
            <li>
              A IA pode errar em um valor ou uma data. Quando a informação não
              está no PDF, o PDFIA avisa em vez de inventar — e a citação de
              página do Premium deixa você conferir na hora.
            </li>
            <li>
              Limites por plano: o grátis resume 1 PDF por dia, de até 10
              páginas; o Premium vai até 100 páginas, sem limite diário.
            </li>
          </ul>
        </section>

        {/* —— FAQ —— */}
        <section className="mt-16 grid gap-10 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <h2 className="font-display text-heading-lg font-semibold leading-tight text-midnight-ink">
            Perguntas frequentes
          </h2>
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

        <section className="mt-12 border-t border-subtle-gray pt-8">
          <p className="eyebrow text-faded-stone">
            Veja também
          </p>
          <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-body-sm">
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
                href="/chatpdf-em-portugues"
                className="text-midnight-ink underline underline-offset-4"
              >
                ChatPDF em português
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
