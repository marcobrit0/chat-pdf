import { SeoPageTemplate } from "@/components/marketing/SeoPageTemplate";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "ChatGPT para PDF — alternativa dedicada em português",
  description:
    "ChatGPT lê PDFs mas é genérico. Veja por que uma ferramenta dedicada como o PDFIA entrega respostas com fonte, modos para contratos e preços em BRL.",
  path: "/chatgpt-pdf",
});

const faqs = [
  {
    q: "ChatGPT Plus lê PDFs grandes?",
    a: "Sim, mas com limite de contexto. Em documentos muito longos, partes podem ser truncadas ou perder coerência. Ferramentas dedicadas fazem chunking do documento e selecionam o contexto relevante por pergunta.",
  },
  {
    q: "Preciso de conta no ChatGPT para usar o PDFIA?",
    a: "Não. O resumo gratuito do PDFIA funciona sem cadastro — só faça upload do PDF.",
  },
  {
    q: "A IA pode inventar coisas que não estão no PDF?",
    a: "Pode, se não for instruída a citar fonte. O PDFIA instrui o modelo a só responder com base no documento e a avisar quando a informação não estiver lá.",
  },
];

export default function ChatgptPdfPage() {
  return (
    <SeoPageTemplate
      title="ChatGPT para PDF: como funciona e quando usar outra ferramenta"
      intro="ChatGPT consegue ler PDFs — mas exige engenharia de prompt, não cita páginas por padrão e perde contexto em documentos longos. Ferramentas dedicadas resolvem isso com upload direto, respostas ancoradas no texto e modos prontos para contratos, editais e laudos."
      breadcrumbs={[
        { label: "Início", path: "/" },
        { label: "Comparações", path: "/precos" },
        { label: "ChatGPT para PDF", path: "/chatgpt-pdf" },
      ]}
      faqs={faqs}
      related={[
        { href: "/chatpdf-vs-chatgpt", label: "PDFIA vs ChatGPT" },
        { href: "/alternativa-ao-chatpdf", label: "Alternativa ao ChatPDF" },
        { href: "/resumir-pdf", label: "Resumir PDF" },
      ]}
    >
      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border border-subtle-gray bg-crisp-white p-6">
          <p className="eyebrow text-faded-stone">
            ChatGPT
          </p>
          <h2 className="mt-3 font-display text-subheading font-semibold text-midnight-ink">
            O que faz e o que complica
          </h2>
          <ul className="mt-4 space-y-2 text-body-sm text-charcoal-text">
            <li>Lê PDFs via upload, mas o limite de contexto varia por plano</li>
            <li>Não cita a página de origem por padrão</li>
            <li>Pode inventar informações que não estão no documento</li>
            <li>Sem modos prontos para CLT, editais ou apólices</li>
            <li>Não salva histórico associado ao documento</li>
          </ul>
        </div>
        <div className="rounded-lg border border-midnight-ink bg-crisp-white p-6">
          <p className="eyebrow text-faded-stone">
            PDFIA
          </p>
          <h2 className="mt-3 font-display text-subheading font-semibold text-midnight-ink">
            O que uma ferramenta dedicada adiciona
          </h2>
          <ul className="mt-4 space-y-2 text-body-sm text-charcoal-text">
            <li>Upload direto — sem copiar texto ou descrever o documento</li>
            <li>Respostas com referência de página para você conferir</li>
            <li>Aviso claro quando a informação não está no PDF</li>
            <li>Modos prontos: resumo, extração de dados, revisão de riscos</li>
            <li>Histórico do documento salvo (Premium)</li>
          </ul>
        </div>
      </section>
    </SeoPageTemplate>
  );
}
