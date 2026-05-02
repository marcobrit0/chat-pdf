import { SeoPageTemplate } from "@/components/marketing/SeoPageTemplate";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Analisar contrato com IA",
  description:
    "Use IA para ler contratos mais rápido — resumo gratuito limitado; Premium para revisão aprofundada. Não é aconselhamento jurídico.",
  path: "/analisar-contrato-com-ia",
});

/**
 * Intent SEO contratos: upload usa foco em cláusulas (intent=contrato no formulário)
 * e caixa de dicas orienta o que o Premium adiciona em relação ao resumo só.
 */
export default function AnalisarContratoPage() {
  return (
    <SeoPageTemplate
      title="Analisar contrato com IA"
      intro="Identifique partes, objeto e pontos de atenção num primeiro passe. O resumo anônimo ajuda na leitura-inicial; revisão detalhada, modo extrair/riscos e chat com citações ficam no Premium."
      showUpload
      contractIntent
    >
      <section className="rounded-[length:var(--radius-cards)] border border-amber-200 bg-canvas p-6">
        <h2 className="font-display text-lg font-semibold text-midnight-ink">Com o Premium você pode</h2>
        <ul className="mt-3 list-inside list-disc space-y-2 text-base text-charcoal-text">
          <li>
            <strong className="font-medium text-midnight-ink">Chat com fontes:</strong> pergunte sobre cláusulas e veja trechos com página.
          </li>
          <li>
            <strong className="font-medium text-midnight-ink">Modos Extrair e Riscos:</strong> dados objetivos e pontos para checagem humana (não é parecer jurídico).
          </li>
          <li>
            <strong className="font-medium text-midnight-ink">PDFs longos</strong> acima do limite gratuito, salvos na sua conta.
          </li>
        </ul>
        <p className="mt-4 text-sm text-faded-stone">
          Aviso: IA pode errar ou omitir cláusulas. Este produto não substitui advogado, contador ou assessor contratual.
        </p>
      </section>
    </SeoPageTemplate>
  );
}
