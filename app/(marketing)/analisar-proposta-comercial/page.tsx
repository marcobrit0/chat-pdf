import { PersonaVariantsSection } from "@/components/marketing/PersonaVariantsSection";
import { SeoPageTemplate } from "@/components/marketing/SeoPageTemplate";
import { buildPageMetadata } from "@/lib/seo";
import { personaVariantsByCanonical } from "@/lib/seo/programmatic-seo-data";

export const metadata = buildPageMetadata({
  title: "Analisar proposta comercial com IA — antes de aceitar ou contrapropor | PDFIA",
  description:
    "Proposta chegou? Em segundos: escopo, valor, prazo, condições, validade e o que não está incluído. Pra você aceitar, negociar ou contrapropor com base no que tá escrito.",
  path: "/analisar-proposta-comercial",
});

const faqs = [
  {
    q: "A IA consegue comparar duas propostas concorrentes?",
    a: "A comparação direta entre dois PDFs está em desenvolvimento. Por enquanto, analise cada proposta separadamente e compare os resumos.",
  },
  {
    q: "Funciona para propostas de TI, marketing, jurídico?",
    a: "Sim. A ferramenta não é específica de setor — lê o texto do documento e extrai o que está escrito.",
  },
  {
    q: "Posso perguntar sobre uma cláusula específica?",
    a: "Sim, no chat do Premium. Cada resposta cita a página onde o trecho aparece.",
  },
];

export default function AnalisarPropostaComercialPage() {
  return (
    <SeoPageTemplate
      title="Analisar proposta comercial com IA"
      intro="Antes de aceitar ou negociar, em minutos: o que a proposta cobre, o que ficou de fora, qual o prazo, qual o valor, quais condições se aplicam. A IA destrincha o PDF pra você não descobrir surpresa só na hora do contrato."
      showUpload
      contractIntent
      breadcrumbs={[
        { label: "Início", path: "/" },
        { label: "Casos de uso", path: "/" },
        { label: "Proposta comercial", path: "/analisar-proposta-comercial" },
      ]}
      faqs={faqs}
      related={[
        { href: "/analisar-contrato-com-ia", label: "Analisar contrato" },
        { href: "/resumir-relatorio-pdf", label: "Resumir relatório" },
        { href: "/comparar-pdfs", label: "Comparar PDFs" },
      ]}
    >
      <section className="rounded-lg border border-subtle-gray bg-crisp-white p-6">
        <p className="eyebrow text-faded-stone">
          O que a análise identifica
        </p>
        <ul className="mt-4 grid gap-2 text-body text-charcoal-text">
          <li>· Escopo do serviço ou produto oferecido</li>
          <li>· Valor total, parcelas e condições de pagamento</li>
          <li>· Prazo de entrega e etapas do projeto</li>
          <li>· O que está e o que não está incluído</li>
          <li>· Condições de reajuste ou revisão de escopo</li>
          <li>· Validade da proposta</li>
        </ul>
      </section>

      <PersonaVariantsSection
        variants={
          personaVariantsByCanonical["/analisar-proposta-comercial"] ?? []
        }
      />
    </SeoPageTemplate>
  );
}
