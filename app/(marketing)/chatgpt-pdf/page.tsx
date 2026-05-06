import { SeoPageTemplate } from "@/components/marketing/SeoPageTemplate";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "ChatGPT pra PDF: por que ter uma ferramenta dedicada vale mais | PDFIA",
  description:
    "ChatGPT lê PDF, sim — mas é generalista. Veja por que uma ferramenta dedicada como o PDFIA cita a página, tem modo pronto pra contrato e custa em real, sem ter que pagar dólar.",
  path: "/chatgpt-pdf",
});

const faqs = [
  {
    q: "O ChatGPT Plus aguenta PDF grande?",
    a: "Aguenta, mas tem limite de contexto. Em documento longo, partes podem ser truncadas ou perder coerência. Ferramenta dedicada faz chunking do PDF e seleciona o contexto certo pra cada pergunta — você não precisa pensar nisso.",
  },
  {
    q: "Preciso ter conta no ChatGPT pra usar o PDFIA?",
    a: "Não. O resumo grátis do PDFIA funciona sem cadastro nenhum — só sobe o PDF e pronto.",
  },
  {
    q: "A IA pode inventar coisa que não está no PDF?",
    a: "Pode, quando não é instruída a citar fonte. O PDFIA é configurado pra só responder com base no que está no PDF e avisar quando a informação não está lá. Sem alucinação.",
  },
];

export default function ChatgptPdfPage() {
  return (
    <SeoPageTemplate
      title="ChatGPT pra PDF: dá pra fazer, mas tem alternativa melhor"
      intro="ChatGPT lê PDF, sim — mas exige montar prompt, não cita página por padrão e perde contexto em documento longo. Ferramenta dedicada resolve com upload direto, resposta ancorada no texto e modos prontos pra contrato, edital, apólice e laudo."
      breadcrumbs={[
        { label: "Início", path: "/" },
        { label: "Comparações", path: "/precos" },
        { label: "ChatGPT pra PDF", path: "/chatgpt-pdf" },
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
            O que faz bem e o que complica
          </h2>
          <ul className="mt-4 space-y-2 text-body-sm text-charcoal-text">
            <li>Lê PDF via upload, mas o limite de contexto muda por plano</li>
            <li>Não cita a página de origem por padrão (você precisa pedir)</li>
            <li>Pode inventar coisa que não está no PDF</li>
            <li>Sem modo pronto pra CLT, edital ou apólice — você monta o prompt</li>
            <li>Não salva histórico vinculado ao documento</li>
          </ul>
        </div>
        <div className="rounded-lg border border-midnight-ink bg-crisp-white p-6">
          <p className="eyebrow text-faded-stone">
            PDFIA
          </p>
          <h2 className="mt-3 font-display text-subheading font-semibold text-midnight-ink">
            O que uma ferramenta dedicada acrescenta
          </h2>
          <ul className="mt-4 space-y-2 text-body-sm text-charcoal-text">
            <li>Upload direto — sem copiar texto, sem descrever o documento</li>
            <li>Resposta sempre vem com a página de origem pra você conferir</li>
            <li>Aviso claro quando a info não está no PDF (zero invenção)</li>
            <li>Modos prontos: resumo, extrair dados, mapear riscos</li>
            <li>Biblioteca salva — volte ao PDF quando quiser (Premium)</li>
          </ul>
        </div>
      </section>
    </SeoPageTemplate>
  );
}
