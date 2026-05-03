import { SeoPageTemplate } from "@/components/marketing/SeoPageTemplate";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Resumir edital de licitação em PDF — IA em português",
  description:
    "Transforme editais extensos em visão executiva com IA: prazos-chave, documentação exigida, garantias e penalidades. Premium para PDFs longos e chat com fontes.",
  path: "/resumir-edital-de-licitacao",
});

const faqs = [
  {
    q: "Funciona com qualquer modalidade de licitação?",
    a: "Sim — pregão, concorrência, dispensa, RDC, qualquer edital em PDF com texto selecionável.",
  },
  {
    q: "A IA destaca exigências obrigatórias?",
    a: "Ela extrai e organiza o que está no edital (objeto, prazos, exigências, garantias). Decisões de participação seguem com seu jurídico ou comercial.",
  },
  {
    q: "Tenho 200 páginas de edital — funciona?",
    a: "No Premium, sim, até 100 páginas. Para editais maiores, divida em seções (edital + anexos) e analise cada parte.",
  },
];

export default function ResumirEditalPage() {
  return (
    <SeoPageTemplate
      title="Resumir edital de licitação"
      intro="Transforme PDFs extensos em visão executiva: prazos-chave, documentação exigida, garantias e etapas do processo. Use o resumo gratuito para um primeiro passe; o Premium desbloqueia análises profundas, histórico e chat com citações por página."
      showUpload
      breadcrumbs={[
        { label: "Início", path: "/" },
        { label: "Casos de uso", path: "/" },
        { label: "Resumir edital", path: "/resumir-edital-de-licitacao" },
      ]}
      faqs={faqs}
      related={[
        { href: "/ler-edital-com-ia", label: "Ler edital com IA" },
        { href: "/analisar-proposta-comercial", label: "Proposta comercial" },
        { href: "/comparar-pdfs", label: "Comparar versões de edital" },
      ]}
    >
      <section className="rounded-[length:var(--radius-cards)] border border-subtle-gray bg-crisp-white p-6">
        <p className="font-condensed text-xs uppercase tracking-[0.2em] text-faded-stone">
          Aviso
        </p>
        <p className="mt-3 text-sm leading-relaxed text-charcoal-text">
          Interpretação automática pode omitir requisitos. Valide sempre no
          texto integral e com sua equipe técnica ou jurídica antes de enviar
          propostas.
        </p>
      </section>
    </SeoPageTemplate>
  );
}
