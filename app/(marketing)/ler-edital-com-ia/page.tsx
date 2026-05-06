import { PersonaVariantsSection } from "@/components/marketing/PersonaVariantsSection";
import { SeoPageTemplate } from "@/components/marketing/SeoPageTemplate";
import { buildPageMetadata } from "@/lib/seo";
import { personaVariantsByCanonical } from "@/lib/seo/programmatic-seo-data";

export const metadata = buildPageMetadata({
  title: "Ler edital de licitação com IA — antes de gastar dias na proposta | PDFIA",
  description:
    "Edital de licitação chegou? Em minutos, identifique objeto, prazo, exigências de habilitação, garantias e penalidades — antes de montar proposta. Resumo grátis pra triagem; chat com a página citada no Premium.",
  path: "/ler-edital-com-ia",
});

const faqs = [
  {
    q: "Funciona com edital do ComprasNet, BEC, Licitações-e?",
    a: "Funciona — qualquer edital em PDF com texto selecionável. Pra PDF digitalizado (imagem), tem que rodar OCR antes (estamos colocando OCR automático no Premium).",
  },
  {
    q: "A IA aponta risco do edital?",
    a: "Ela organiza o que está escrito (objeto, prazo, garantia, exigência, penalidade) e sinaliza pontos atípicos quando reconhece — mas a análise jurídica fina cabe ao seu time.",
  },
  {
    q: "Dá pra usar pra escrever impugnação?",
    a: "A IA ajuda a entender e localizar a cláusula. A redação da impugnação ou pedido de esclarecimento é trabalho de jurídico — passa pra eles depois da triagem.",
  },
  {
    q: "Quantos editais por dia?",
    a: "No grátis, 1 resumo por dia (até 10 páginas). No Premium, sem limite na prática pra PDFs até 100 páginas — você pode triar dezenas em uma manhã.",
  },
];

export default function LerEditalComIaPage() {
  return (
    <SeoPageTemplate
      title="Ler edital de licitação com IA"
      intro="Antes de gastar dias preparando proposta, vale uma triagem rápida do edital: objeto, prazo de envio, exigência de habilitação que você consegue cumprir, critério de julgamento, penalidade, garantia. A IA destrincha tudo isso em minutos — pra você decidir se entra ou desiste cedo."
      showUpload
      breadcrumbs={[
        { label: "Início", path: "/" },
        { label: "Casos de uso", path: "/" },
        { label: "Editais", path: "/ler-edital-com-ia" },
      ]}
      faqs={faqs}
      related={[
        { href: "/resumir-edital-de-licitacao", label: "Resumir edital" },
        { href: "/analisar-proposta-comercial", label: "Proposta comercial" },
        { href: "/resumir-pdf", label: "Resumir PDF (geral)" },
      ]}
    >
      <section className="rounded-lg border border-subtle-gray bg-crisp-white p-6">
        <p className="eyebrow text-faded-stone">
          O que esperar
        </p>
        <ul className="mt-4 grid gap-2 text-body text-charcoal-text">
          <li className="flex items-start gap-3">
            <span className="mt-1 inline-block h-2 w-2 shrink-0 bg-apollo-gold" />
            Objeto, prazos e cronograma do certame.
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1 inline-block h-2 w-2 shrink-0 bg-apollo-gold" />
            Exigências de habilitação técnica, jurídica e fiscal.
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1 inline-block h-2 w-2 shrink-0 bg-apollo-gold" />
            Garantias, prazos de execução e formas de pagamento.
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1 inline-block h-2 w-2 shrink-0 bg-apollo-gold" />
            Penalidades, sanções e critérios de julgamento.
          </li>
        </ul>
        <p className="mt-5 text-body-sm text-faded-stone">
          A IA organiza o texto. Decisões sobre participação e estratégia comercial seguem com você e seu jurídico.
        </p>
      </section>

      <PersonaVariantsSection
        variants={personaVariantsByCanonical["/ler-edital-com-ia"] ?? []}
      />
    </SeoPageTemplate>
  );
}
