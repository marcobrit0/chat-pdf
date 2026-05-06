import { SeoPageTemplate } from "@/components/marketing/SeoPageTemplate";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Resumo de PDF com IA em português — grátis e sem cadastro | PDFIA",
  description:
    "Resumo de PDF em português, na hora e de graça: tópicos, datas, valores e perguntas sugeridas. Funciona pra qualquer PDF curto; PDFs longos e chat com o documento liberam no Premium.",
  path: "/resumo-de-pdf",
});

const faqs = [
  {
    q: "O resumo é confiável?",
    a: "A IA tira o que está no texto — não inventa. Quando dá pra citar a página de origem, você confere. Pra decisão importante, vale sempre conferir no PDF original antes de seguir.",
  },
  {
    q: "Qual o tamanho máximo no grátis?",
    a: "PDF com até 10 páginas e texto selecionável (não escaneado). Pra documentos maiores, é Premium — vai até 100 páginas.",
  },
  {
    q: "O que muda no Premium?",
    a: "Chat com o PDF (resposta cita a página), modos pra extrair dados e mapear riscos, PDFs até 100 páginas e biblioteca salva pra você voltar quando quiser.",
  },
  {
    q: "Aceita PDF em outros idiomas?",
    a: "Aceita qualquer idioma com texto selecionável. A resposta sai em português do Brasil por padrão — útil pra resumir paper acadêmico em inglês ou contrato em espanhol, por exemplo.",
  },
];

export default function ResumoDePdfPage() {
  return (
    <SeoPageTemplate
      title="Resumo de PDF com IA, em português"
      intro="Solte um PDF aí em cima e receba o resumo estruturado: pontos centrais, datas, valores e nomes que aparecem no documento. Sem cadastro pra PDF curto. Pra PDFs maiores e chat com o documento, é Premium."
      showUpload
      breadcrumbs={[
        { label: "Início", path: "/" },
        { label: "Resumo de PDF", path: "/resumo-de-pdf" },
      ]}
      faqs={faqs}
      related={[
        { href: "/resumir-pdf", label: "Resumir PDF" },
        { href: "/chat-pdf", label: "Chat com PDF" },
        { href: "/analisar-contrato-com-ia", label: "Analisar contrato" },
        { href: "/ia-para-resumir-pdf", label: "IA pra resumir PDF" },
      ]}
    >
      <section>
        <h2 className="font-display text-heading font-semibold text-midnight-ink">
          O que entra no resumo
        </h2>
        <ul className="mt-4 grid gap-2 text-body text-charcoal-text">
          <li>· Síntese do conteúdo em parágrafo curto</li>
          <li>· Pontos principais em lista, fácil de bater o olho</li>
          <li>· Datas, valores e nomes que aparecem no texto</li>
          <li>· Perguntas pra você ir mais fundo no PDF</li>
        </ul>
        <p className="mt-4 text-body-sm text-faded-stone">
          A IA trabalha em cima do que está escrito no PDF. Pra qualquer dado crítico (valor, prazo, cláusula), confirme no documento original antes de decidir.
        </p>
      </section>
    </SeoPageTemplate>
  );
}
