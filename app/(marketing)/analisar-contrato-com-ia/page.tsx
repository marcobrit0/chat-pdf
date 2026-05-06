import { SeoPageTemplate } from "@/components/marketing/SeoPageTemplate";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Analisar contrato com IA em português — sem advogado a cada cláusula | PDFIA",
  description:
    "Analise contrato em PDF com IA: partes, objeto, prazo, valores e cláusulas que costumam pegar — em segundos. Resumo grátis pra triagem; chat com a página citada e modo de riscos no Premium. Não substitui advogado.",
  path: "/analisar-contrato-com-ia",
});

const faqs = [
  {
    q: "Pra que tipo de contrato funciona?",
    a: "Qualquer contrato em PDF com texto selecionável — prestação de serviços, compra e venda, parceria, NDA, distribuição, locação, SaaS. Pra CLT, use a página dedicada (o modo é diferente).",
  },
  {
    q: "A IA aponta cláusula problemática?",
    a: "No modo Mapear riscos do Premium, ela sinaliza pontos comuns que costumam virar passivo (multa alta, prazo curto, cláusula atípica, foro distante) pra você revisar. Não é parecer jurídico — é triagem.",
  },
  {
    q: "Qual o limite de páginas?",
    a: "10 no grátis, 100 no Premium. Pra contrato maior que isso, divide em partes ou fala com a gente.",
  },
  {
    q: "O contrato fica salvo?",
    a: "No grátis, não — o arquivo é descartado depois do resumo. No Premium, fica na sua conta criptografado, e você decide quando excluir. Cancelando, dá pra baixar por 30 dias antes da exclusão.",
  },
];

export default function AnalisarContratoPage() {
  return (
    <SeoPageTemplate
      title="Analisar contrato com IA"
      intro="Antes de assinar, antes de mandar o RH ou o jurídico, antes de gastar reunião: solte o contrato aqui e veja partes, objeto, prazo, valores e cláusulas que costumam pegar. Resumo grátis pra triagem; pra chat com a página citada e modo de mapeamento de riscos, é Premium."
      showUpload
      contractIntent
      breadcrumbs={[
        { label: "Início", path: "/" },
        { label: "Casos de uso", path: "/" },
        { label: "Analisar contrato", path: "/analisar-contrato-com-ia" },
      ]}
      faqs={faqs}
      related={[
        { href: "/analisar-contrato-clt", label: "Contrato CLT" },
        { href: "/resumir-contrato-pdf", label: "Resumir contrato" },
        {
          href: "/analisar-contrato-de-prestacao-de-servicos",
          label: "Prestação de serviços",
        },
        { href: "/comparar-pdfs", label: "Comparar versões" },
      ]}
    >
      <section className="rounded-lg border border-subtle-gray bg-crisp-white p-6">
        <p className="eyebrow text-faded-stone">
          O que abre quando você assina o Premium
        </p>
        <ul className="mt-4 grid gap-3 text-body text-charcoal-text">
          <li className="flex items-start gap-3">
            <span className="mt-1 inline-block h-2 w-2 shrink-0 bg-apollo-gold" />
            <span>
              <strong className="font-medium text-midnight-ink">
                Chat com a página citada
              </strong>{" "}
              — pergunta sobre cláusulas e a IA mostra o trecho exato, com a página de origem.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1 inline-block h-2 w-2 shrink-0 bg-apollo-gold" />
            <span>
              <strong className="font-medium text-midnight-ink">
                Modos Extrair dados e Mapear riscos
              </strong>{" "}
              — dados estruturados (datas, valores, partes) e pontos pra revisão humana. Não é parecer jurídico.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1 inline-block h-2 w-2 shrink-0 bg-apollo-gold" />
            <span>
              <strong className="font-medium text-midnight-ink">
                Contrato longo, até 100 páginas
              </strong>
              {" "}— sem cortar pelo meio, salvo na sua conta pra você voltar quando quiser.
            </span>
          </li>
        </ul>
        <p className="mt-5 text-body-sm text-faded-stone">
          A IA pode errar ou pular cláusula. Pra contrato com peso financeiro ou jurídico relevante, envolve um advogado.
        </p>
      </section>
    </SeoPageTemplate>
  );
}
