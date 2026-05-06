import { PersonaVariantsSection } from "@/components/marketing/PersonaVariantsSection";
import { SeoPageTemplate } from "@/components/marketing/SeoPageTemplate";
import { buildPageMetadata } from "@/lib/seo";
import { personaVariantsByCanonical } from "@/lib/seo/programmatic-seo-data";

export const metadata = buildPageMetadata({
  title: "Resumir relatório em PDF com IA — sem ler 80 páginas | PDFIA",
  description:
    "Relatório técnico, financeiro ou corporativo em resumo direto: conclusões, números que importam, períodos e recomendações. Pra reunião de board, briefing pro time ou decisão executiva — sem ler o documento inteiro.",
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
      title="Resumir relatório em PDF com IA"
      intro="Relatório técnico, financeiro ou corporativo de 80 páginas: você precisa entender o que importa em 5 minutos pra reunião que começa agora. A IA puxa as conclusões, números e recomendações principais — pronto pra você usar no briefing ou na decisão."
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
      <section className="rounded-lg border border-subtle-gray bg-crisp-white p-6">
        <p className="eyebrow text-faded-stone">
          O que o resumo extrai
        </p>
        <ul className="mt-4 grid gap-2 text-body text-charcoal-text">
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
