import { SeoPageTemplate } from "@/components/marketing/SeoPageTemplate";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "PDF e IA — o que muda quando uma ferramenta de PDF tem inteligência artificial",
  description:
    "PDF + IA explicado em PT-BR: o que é diferente em relação ao Acrobat clássico, como funciona o LLM por trás, o que é OCR e quando vale a pena usar.",
  path: "/pdf-ia",
});

const breadcrumbs = [
  { label: "Início", path: "/" },
  { label: "PDF + IA", path: "/pdf-ia" },
];

const layers = [
  {
    title: "Extração de texto",
    body: "Toda ferramenta de PDF começa lendo o texto. Se o PDF for digitalizado (foto), entra OCR — reconhecimento óptico de caracteres. Sem texto, não há IA.",
  },
  {
    title: "Modelo de linguagem (LLM)",
    body: "É a parte que entende, resume e responde. O modelo lê o conteúdo extraído e gera uma saída em português, treinada para distinguir o que está e o que não está no documento.",
  },
  {
    title: "Recuperação de trechos (chunking)",
    body: "Em PDFs longos, a IA não envia o documento inteiro ao modelo — fatia em trechos e seleciona os mais relevantes para cada pergunta. Isso reduz custo e evita contexto truncado.",
  },
  {
    title: "Citação de fontes",
    body: "Ferramentas dedicadas marcam de qual página veio cada resposta. Sem isso, fica difícil verificar — e a IA pode parecer mais confiante do que deveria.",
  },
];

const compare = [
  {
    tool: "Acrobat clássico (sem IA)",
    canDo: "Visualizar, anotar, assinar, OCR básico",
    cantDo: "Resumir o conteúdo, responder perguntas, identificar entidades",
  },
  {
    tool: "ChatGPT genérico",
    canDo: "Conversar sobre PDFs colados ou anexados na sessão",
    cantDo: "Persistir o documento, citar página por padrão, modos específicos por tipo de PDF",
  },
  {
    tool: "ChatPDF Brasil",
    canDo: "Resumir grátis, conversar com citação por página, modos para contratos/editais/apólices",
    cantDo: "Substituir parecer jurídico, médico ou financeiro — é apoio à leitura, não decisão",
  },
];

const faqs = [
  {
    q: "Qual a diferença prática entre um leitor de PDF tradicional e um leitor com IA?",
    a: "Um leitor tradicional mostra o que está no arquivo. Um leitor com IA processa o conteúdo e devolve perguntas respondidas, resumos e dados estruturados (datas, valores, partes). O ganho está no tempo de triagem, não na precisão jurídica final.",
  },
  {
    q: "A IA inventa informação?",
    a: "Pode inventar quando a pergunta é ambígua ou quando o modelo não distingue entre 'não sei' e 'isto não está no documento'. Por isso a citação de página importa: você verifica antes de agir. Modelos modernos têm taxa de alucinação menor, mas não zero.",
  },
  {
    q: "Preciso saber prompting para usar?",
    a: "Não. O fluxo gratuito gera o resumo automaticamente — não há nada para escrever. No Premium, basta perguntar em português natural; o sistema cuida de selecionar trechos relevantes.",
  },
  {
    q: "Meus dados são usados para treinar o modelo?",
    a: "Não. O ChatPDF Brasil envia o PDF apenas para o provedor de IA durante o processamento da sua sessão. Veja a Política de privacidade para os detalhes de retenção.",
  },
];

export default function PdfIaPage() {
  return (
    <SeoPageTemplate
      title="PDF + IA"
      intro="Em vez de prometer mágica, esta página explica o que muda quando uma ferramenta de PDF tem IA — as camadas técnicas, as comparações honestas e as limitações reais."
      breadcrumbs={breadcrumbs}
      faqs={faqs}
      related={[
        { href: "/ia-pdf", label: "IA para PDF (por caso de uso)" },
        { href: "/ia-para-resumir-pdf", label: "IA para resumir PDF (passo a passo)" },
        { href: "/chat-pdf", label: "Chat com PDF" },
        { href: "/resumir-pdf", label: "Resumir PDF" },
        { href: "/chatpdf-vs-chatgpt", label: "ChatPDF vs ChatGPT" },
      ]}
    >
      <section className="space-y-4">
        <h2 className="font-display text-2xl font-semibold text-midnight-ink">
          As quatro camadas por trás de qualquer leitor de PDF com IA
        </h2>
        <p>
          Quando você envia um PDF para uma ferramenta de IA, o documento passa
          por quatro etapas. Entender as etapas ajuda a saber o que esperar — e
          quando uma resposta provavelmente está errada.
        </p>
        <ul className="mt-4 space-y-3">
          {layers.map((l, i) => (
            <li
              key={l.title}
              className="rounded-[length:var(--radius-cards)] border border-subtle-gray bg-crisp-white p-5"
            >
              <p className="font-condensed text-xs uppercase tracking-[0.22em] text-faded-stone">
                Camada 0{i + 1}
              </p>
              <p className="mt-2 font-display text-lg font-semibold text-midnight-ink">
                {l.title}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-charcoal-text">
                {l.body}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-2xl font-semibold text-midnight-ink">
          Comparação honesta — o que cada ferramenta resolve
        </h2>
        <div className="overflow-x-auto rounded-[length:var(--radius-cards)] border border-subtle-gray">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-canvas">
              <tr>
                <th scope="col" className="border-b border-subtle-gray px-4 py-3 font-display font-semibold text-midnight-ink">
                  Ferramenta
                </th>
                <th scope="col" className="border-b border-subtle-gray px-4 py-3 font-display font-semibold text-midnight-ink">
                  Resolve bem
                </th>
                <th scope="col" className="border-b border-subtle-gray px-4 py-3 font-display font-semibold text-midnight-ink">
                  Não resolve
                </th>
              </tr>
            </thead>
            <tbody>
              {compare.map((row) => (
                <tr key={row.tool} className="even:bg-canvas/40">
                  <td className="border-b border-subtle-gray px-4 py-3 font-medium text-midnight-ink">
                    {row.tool}
                  </td>
                  <td className="border-b border-subtle-gray px-4 py-3 text-charcoal-text">
                    {row.canDo}
                  </td>
                  <td className="border-b border-subtle-gray px-4 py-3 text-charcoal-text">
                    {row.cantDo}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-2xl font-semibold text-midnight-ink">
          Quando IA + PDF realmente economiza tempo
        </h2>
        <p>
          Contratos &gt; 5 páginas que você precisa triar antes de uma reunião.
          Editais de licitação onde os prazos e exigências estão espalhados em
          dezenas de páginas. Apólices de seguro onde a exclusão importante
          mora num parágrafo lateral. Laudos médicos cheios de termos clínicos
          que o paciente precisa entender antes da consulta.
        </p>
        <p>
          Em todos esses casos, o ganho é a triagem — você decide rapidamente
          se vale a leitura completa, e em qual seção focar. A IA não te
          dispensa de ler o que importa; ela só corta o caminho até lá.
        </p>
      </section>
    </SeoPageTemplate>
  );
}
