import { SeoPageTemplate } from "@/components/marketing/SeoPageTemplate";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Resumir edital de licitação em PDF com IA | PDFIA",
  description:
    "Edital de 100 páginas em resumo executivo: prazos-chave, documentação exigida, garantia, penalidade. Pra você decidir entrar na licitação ou desistir cedo. Premium pra editais longos e chat com a página citada.",
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
      intro="Edital de 100 páginas vira resumo executivo em segundos: prazos-chave, documentação exigida, garantia, etapas e penalidade. Use o grátis pra triar antes de gastar dias preparando proposta. No Premium, você conversa com o PDF e cada resposta vem com a página de origem."
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
      <section className="rounded-lg border border-subtle-gray bg-crisp-white p-6">
        <p className="eyebrow text-faded-stone">
          Aviso
        </p>
        <p className="mt-3 text-body-sm  text-charcoal-text">
          Interpretação automática pode omitir requisitos. Valide sempre no
          texto integral e com sua equipe técnica ou jurídica antes de enviar
          propostas.
        </p>
      </section>
    </SeoPageTemplate>
  );
}
