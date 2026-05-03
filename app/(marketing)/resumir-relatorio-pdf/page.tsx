import { PersonaVariantsSection } from "@/components/marketing/PersonaVariantsSection";
import { SeoPageTemplate } from "@/components/marketing/SeoPageTemplate";
import { buildPageMetadata } from "@/lib/seo";
import { personaVariantsByCanonical } from "@/lib/seo/programmatic-seo-data";

export const metadata = buildPageMetadata({
  title: "Resumir relatório em PDF com IA",
  description:
    "Extraia conclusões, dados e indicadores de relatórios técnicos, financeiros ou corporativos sem ler o documento inteiro. Gratuito para relatórios curtos; Premium para arquivos longos e chat.",
  path: "/resumir-relatorio-pdf",
});

const faqs = [
  {
    q: "Funciona para relatórios financeiros e de auditoria?",
    a: "Sim. Para documentos com tabelas complexas, os dados tabulares podem não ser capturados com precisão — confirme números no original.",
  },
  {
    q: "Qual o tamanho máximo do relatório?",
    a: "Gratuito: até 10 páginas. Premium: até 100 páginas com chat e modo de extração de dados. Relatórios maiores podem ser divididos por seção.",
  },
  {
    q: "Posso fazer perguntas sobre seções específicas?",
    a: "Sim, no chat do Premium. A resposta cita a página onde a informação aparece no relatório.",
  },
];

export default function ResumirRelatorioPdfPage() {
  return (
    <SeoPageTemplate
      title="Resumir relatório em PDF"
      intro="Extraia os pontos centrais de relatórios técnicos, financeiros ou corporativos sem ler o documento inteiro. Ideal para briefings, apresentações e tomada de decisão rápida."
      showUpload
      breadcrumbs={[
        { label: "Início", path: "/" },
        { label: "Casos de uso", path: "/" },
        { label: "Resumir relatório", path: "/resumir-relatorio-pdf" },
      ]}
      faqs={faqs}
      related={[
        { href: "/resumir-pdf", label: "Resumir PDF" },
        { href: "/analisar-proposta-comercial", label: "Proposta comercial" },
        { href: "/chat-pdf", label: "Conversar com PDF" },
      ]}
    >
      <section className="rounded-[length:var(--radius-cards)] border border-subtle-gray bg-crisp-white p-6">
        <p className="font-condensed text-xs uppercase tracking-[0.2em] text-faded-stone">
          O que o resumo extrai
        </p>
        <ul className="mt-4 grid gap-2 text-base text-charcoal-text">
          <li>· Conclusões e recomendações principais</li>
          <li>· Dados e indicadores centrais do documento</li>
          <li>· Períodos e datas de referência</li>
          <li>· Entidades, áreas ou projetos mencionados</li>
          <li>· Perguntas de follow-up úteis para aprofundar</li>
        </ul>
      </section>

      <PersonaVariantsSection
        variants={personaVariantsByCanonical["/resumir-relatorio-pdf"] ?? []}
      />
    </SeoPageTemplate>
  );
}
