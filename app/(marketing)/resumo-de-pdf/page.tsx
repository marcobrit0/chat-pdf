import { SeoPageTemplate } from "@/components/marketing/SeoPageTemplate";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Resumo de PDF com IA em português — grátis",
  description:
    "Gere o resumo de qualquer PDF em português: tópicos, datas, entidades e perguntas sugeridas. Gratuito para documentos curtos; Premium para PDFs longos e chat.",
  path: "/resumo-de-pdf",
});

const faqs = [
  {
    q: "O resumo é confiável?",
    a: "A IA extrai o que está no texto. Onde há citação de página, você pode verificar. Para decisões importantes, confirme no documento original.",
  },
  {
    q: "Qual o tamanho máximo no plano gratuito?",
    a: "PDFs com até 10 páginas e texto selecionável. Documentos maiores exigem Premium (até 100 páginas).",
  },
  {
    q: "O que muda no Premium?",
    a: "Chat com o documento, respostas com citação de página, modos de extração e análise de riscos, suporte a PDFs até 100 páginas e histórico salvo na conta.",
  },
  {
    q: "Funciona em outros idiomas?",
    a: "Aceita PDFs em qualquer idioma com texto selecionável; a resposta sai em português do Brasil por padrão.",
  },
];

export default function ResumoDePdfPage() {
  return (
    <SeoPageTemplate
      title="Resumo de PDF com IA"
      intro="Envie um PDF e receba um resumo estruturado: pontos centrais, datas, valores e entidades encontrados no documento. Sem cadastro para arquivos curtos; PDFs longos e chat com citações ficam no Premium."
      showUpload
      breadcrumbs={[
        { label: "Início", path: "/" },
        { label: "Resumo de PDF", path: "/resumo-de-pdf" },
      ]}
      faqs={faqs}
      related={[
        { href: "/resumir-pdf", label: "Resumir PDF" },
        { href: "/chat-pdf", label: "Conversar com PDF" },
        { href: "/analisar-contrato-com-ia", label: "Analisar contrato" },
        { href: "/ia-para-resumir-pdf", label: "IA para resumir PDF" },
      ]}
    >
      <section>
        <h2 className="font-display text-heading font-semibold text-midnight-ink">
          O que o resumo inclui
        </h2>
        <ul className="mt-4 grid gap-2 text-body text-charcoal-text">
          <li>· Síntese do conteúdo em parágrafos curtos</li>
          <li>· Tópicos e pontos principais em lista</li>
          <li>· Datas, valores e entidades encontrados no texto</li>
          <li>· Perguntas de follow-up sugeridas</li>
        </ul>
        <p className="mt-4 text-body-sm text-faded-stone">
          A IA trabalha com o texto do PDF. Confirme dados críticos no
          documento original antes de tomar decisões.
        </p>
      </section>
    </SeoPageTemplate>
  );
}
