import Link from "next/link";

import { SeoPageTemplate } from "@/components/marketing/SeoPageTemplate";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "IA para PDF em português — escolha o tipo de documento | PDFIA",
  description:
    "IA para PDF brasileiro: modos prontos pra contrato CLT, edital de licitação, apólice de seguro, laudo médico, proposta e relatório. Veja o que cada modo extrai e abra a ferramenta certa.",
  path: "/ia-pdf",
});

const breadcrumbs = [
  { label: "Início", path: "/" },
  { label: "IA para PDF", path: "/ia-pdf" },
];

const useCases = [
  {
    persona: "RH ou pessoa contratada",
    docType: "Contrato CLT",
    extracts: "Salário, jornada, benefícios, aviso prévio, rescisão, cláusulas de não-concorrência",
    href: "/analisar-contrato-clt",
    label: "Analisar contrato CLT",
  },
  {
    persona: "Empresário PJ ou freelancer",
    docType: "Contrato de prestação de serviços",
    extracts: "Escopo, prazos, valor, multas, foro, propriedade intelectual, confidencialidade",
    href: "/analisar-contrato-de-prestacao-de-servicos",
    label: "Analisar contrato de prestação de serviços",
  },
  {
    persona: "Time comercial ou jurídico",
    docType: "Edital de licitação",
    extracts: "Objeto, prazo de envio, exigências de habilitação, critério de julgamento, penalidades",
    href: "/ler-edital-com-ia",
    label: "Ler edital com IA",
  },
  {
    persona: "Cliente segurado ou corretor",
    docType: "Apólice de seguro",
    extracts: "Coberturas, exclusões, prazo de carência, franquia, tabela de capital segurado",
    href: "/analisar-apolice-de-seguro",
    label: "Analisar apólice de seguro",
  },
  {
    persona: "Paciente ou cuidador",
    docType: "Laudo médico ou de exame",
    extracts: "Achados clínicos, gravidade, glossário em PT-BR, recomendações citadas no laudo",
    href: "/entender-laudo-medico",
    label: "Entender laudo médico",
  },
  {
    persona: "Time comercial",
    docType: "Proposta comercial recebida",
    extracts: "Preço, prazo de entrega, condições de pagamento, escopo, garantias, exclusões",
    href: "/analisar-proposta-comercial",
    label: "Analisar proposta comercial",
  },
  {
    persona: "Pessoa física",
    docType: "Boleto ou fatura",
    extracts: "Vencimento, valor total, juros e multa, beneficiário, código de barras",
    href: "/resumir-boleto-ou-fatura",
    label: "Resumir boleto ou fatura",
  },
  {
    persona: "Time de operações",
    docType: "Relatório longo (interno ou de cliente)",
    extracts: "Visão geral, tópicos, métricas citadas, recomendações destacadas no texto",
    href: "/resumir-relatorio-pdf",
    label: "Resumir relatório PDF",
  },
];

const faqs = [
  {
    q: "Qual a diferença entre os modos de análise?",
    a: "Cada modo orienta a IA a procurar o que costuma importar naquele tipo de documento. Em contratos CLT, ela prioriza salário, jornada e rescisão; em editais, prazos e habilitação; em apólices, coberturas e exclusões. O conteúdo extraído fica mais relevante do que num resumo genérico.",
  },
  {
    q: "Posso usar o resumo gratuito para qualquer um destes documentos?",
    a: "Sim, desde que o PDF tenha texto selecionável e até 10 páginas. Para documentos maiores, modos específicos por tipo, salvar o histórico ou conversar com o documento (chat com citações), é necessário o plano Premium.",
  },
  {
    q: "Os modos cobrem documentos em outros idiomas?",
    a: "O foco é português do Brasil. Documentos em inglês, espanhol e outros idiomas latinos costumam funcionar, mas a qualidade da extração de entidades brasileiras (CNPJ, CLT, LGPD) é maior em PT-BR.",
  },
  {
    q: "Como escolho o modo certo?",
    a: "Comece pelo tipo do documento — clique no caso de uso correspondente acima. Cada landing page abre a mesma ferramenta com o modo já configurado. Se não tiver certeza, use o modo padrão de resumo e a IA detecta o tipo automaticamente.",
  },
];

export default function IaPdfPage() {
  return (
    <SeoPageTemplate
      title="IA para PDF: escolha o tipo de documento"
      intro="Cada tipo de PDF pede um foco diferente — contrato olha pra cláusulas, edital olha pra prazo e habilitação, laudo olha pra termos clínicos. Clica no caso que parece com o seu e abre a ferramenta com o modo certo já ativado."
      breadcrumbs={breadcrumbs}
      faqs={faqs}
      related={[
        { href: "/pdf-ia", label: "PDF + IA (como funciona por dentro)" },
        { href: "/ia-para-resumir-pdf", label: "IA para resumir PDF (passo a passo)" },
        { href: "/chat-pdf", label: "Chat com PDF" },
        { href: "/precos", label: "Preços" },
      ]}
    >
      <section className="space-y-4">
        <h2 className="font-display text-heading font-semibold text-midnight-ink">
          Tipos de PDF que a gente cobre bem
        </h2>
        <p>
          A IA é a mesma — o que muda é pra onde ela é orientada a olhar. Pra
          cada tipo de documento aqui embaixo tem uma página dedicada que abre a
          ferramenta com o modo certo já ativado.
        </p>
        <ul className="mt-6 grid gap-4 md:grid-cols-2">
          {useCases.map((u) => (
            <li
              key={u.href}
              className="rounded-lg border border-subtle-gray bg-crisp-white p-5"
            >
              <p className="eyebrow text-faded-stone">
                {u.persona}
              </p>
              <p className="mt-2 font-display text-body-lg font-semibold text-midnight-ink">
                {u.docType}
              </p>
              <p className="mt-2 text-body-sm  text-charcoal-text">
                Extrai: {u.extracts}.
              </p>
              <Link
                href={u.href}
                className="mt-4 inline-flex text-body-sm font-medium text-midnight-ink underline underline-offset-4"
              >
                {u.label} →
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-heading font-semibold text-midnight-ink">
          Seu PDF não tá na lista?
        </h2>
        <p>
          Sem stress — começa pelo{" "}
          <Link href="/resumir-pdf" className="underline underline-offset-4">
            resumo grátis
          </Link>{" "}
          (modo padrão). A IA identifica o tipo de PDF e ajusta a saída
          sozinha. Se você usa muito um tipo que não tá listado aqui, no{" "}
          <Link href="/precos" className="underline underline-offset-4">
            Premium
          </Link>{" "}
          dá pra montar perguntas que rodam toda vez que você sobe um PDF
          parecido.
        </p>
      </section>
    </SeoPageTemplate>
  );
}
