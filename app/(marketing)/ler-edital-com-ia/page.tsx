import { SeoPageTemplate } from "@/components/marketing/SeoPageTemplate";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Ler edital de licitação com IA",
  description:
    "Decifre prazos, exigências e critérios de julgamento de editais brasileiros com IA. Resumo gratuito para leitura inicial; Premium para chat com trechos.",
  path: "/ler-edital-com-ia",
});

const faqs = [
  {
    q: "Funciona com editais do ComprasNet, BEC e Licitações-e?",
    a: "Sim, qualquer edital em PDF com texto selecionável. Para PDFs digitalizados (imagem), é preciso OCR primeiro — está no roadmap.",
  },
  {
    q: "A IA aponta riscos no edital?",
    a: "Ela organiza o que está escrito (objeto, prazos, garantias, exigências, penalidades) e sinaliza pontos atípicos quando os reconhece, mas não substitui análise jurídica.",
  },
  {
    q: "Posso usar para responder a impugnações?",
    a: "A ferramenta ajuda a entender e localizar cláusulas. A redação da impugnação ou pedido de esclarecimento exige assessoria jurídica.",
  },
  {
    q: "Quantos editais posso analisar por dia?",
    a: "No gratuito, 1 resumo por dia (até 10 páginas). No Premium, sem limite prático para PDFs até 100 páginas.",
  },
];

export default function LerEditalComIaPage() {
  return (
    <SeoPageTemplate
      title="Ler edital com IA"
      intro="Decifre prazos, exigências, garantias e critérios de julgamento com apoio da IA. O resumo gratuito cobre um primeiro passe; no Premium você conversa com o PDF e vê a página de origem em cada resposta."
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
      <section className="rounded-[length:var(--radius-cards)] border border-subtle-gray bg-crisp-white p-6">
        <p className="font-condensed text-xs uppercase tracking-[0.2em] text-faded-stone">
          O que esperar
        </p>
        <ul className="mt-4 grid gap-2 text-base text-charcoal-text">
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
        <p className="mt-5 text-sm text-faded-stone">
          A IA organiza o texto. Decisões sobre participação e estratégia comercial seguem com você e seu jurídico.
        </p>
      </section>
    </SeoPageTemplate>
  );
}
