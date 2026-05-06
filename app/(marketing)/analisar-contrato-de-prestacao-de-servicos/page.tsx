import { PersonaVariantsSection } from "@/components/marketing/PersonaVariantsSection";
import { SeoPageTemplate } from "@/components/marketing/SeoPageTemplate";
import { buildPageMetadata } from "@/lib/seo";
import { personaVariantsByCanonical } from "@/lib/seo/programmatic-seo-data";

export const metadata = buildPageMetadata({
  title: "Analisar contrato de prestação de serviços com IA | PDFIA",
  description:
    "Antes de assinar contrato PJ ou de freelancer: escopo, preço, prazo, multa, propriedade intelectual e cláusula de não-concorrência em segundos. Útil pra autônomo, MEI, agência e empresa pequena.",
  path: "/analisar-contrato-de-prestacao-de-servicos",
});

const faqs = [
  {
    q: "Serve para contratos entre pessoa física e jurídica?",
    a: "Sim. A ferramenta lê o texto do contrato independente do tipo de pessoa envolvida.",
  },
  {
    q: "A IA sabe identificar cláusulas abusivas?",
    a: "Ela sinaliza cláusulas que merecem atenção — não avalia legalidade. Use o modo Riscos no Premium para ver pontos de checagem listados.",
  },
  {
    q: "Posso perguntar sobre um trecho específico?",
    a: "Sim, no chat do Premium. A resposta cita o número da página onde o trecho aparece.",
  },
];

export default function AnalisarContratoPrestacaoPage() {
  return (
    <SeoPageTemplate
      title="Analisar contrato de prestação de serviços com IA"
      intro="Recebeu o contrato 'padrão da empresa' e tem que assinar até amanhã? Solta aqui pra ver escopo, valor, forma de pagamento, prazo, multa de saída, cláusula de exclusividade e quem fica com a propriedade intelectual. Sem advogado pra cada projeto novo."
      showUpload
      contractIntent
      breadcrumbs={[
        { label: "Início", path: "/" },
        { label: "Casos de uso", path: "/" },
        {
          label: "Prestação de serviços",
          path: "/analisar-contrato-de-prestacao-de-servicos",
        },
      ]}
      faqs={faqs}
      related={[
        { href: "/resumir-contrato-pdf", label: "Resumir contrato" },
        { href: "/analisar-contrato-clt", label: "Contrato CLT" },
        { href: "/analisar-contrato-com-ia", label: "Analisar contrato" },
      ]}
    >
      <section className="rounded-lg border border-subtle-gray bg-crisp-white p-6">
        <p className="eyebrow text-faded-stone">
          Pontos que a análise cobre
        </p>
        <ul className="mt-4 grid gap-2 text-body text-charcoal-text">
          <li>· Partes contratantes e qualificação</li>
          <li>· Escopo e entregáveis descritos no contrato</li>
          <li>· Valor, parcelas e condições de pagamento</li>
          <li>· Prazo de execução e critérios de aceite</li>
          <li>· Multas e penalidades por atraso ou rescisão</li>
          <li>· Quem fica com a propriedade intelectual do que for criado</li>
          <li>· Cláusula de sigilo e não-concorrência quando presente</li>
        </ul>
        <p className="mt-5 text-body-sm text-faded-stone">
          Esta análise é um ponto de partida — não substitui assessoria
          jurídica para contratos com valor ou risco relevante.
        </p>
      </section>

      <PersonaVariantsSection
        variants={
          personaVariantsByCanonical[
            "/analisar-contrato-de-prestacao-de-servicos"
          ] ?? []
        }
      />
    </SeoPageTemplate>
  );
}
