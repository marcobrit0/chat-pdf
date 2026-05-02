import { SeoPageTemplate } from "@/components/marketing/SeoPageTemplate";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Ler edital com IA",
  description:
    "Entenda editais de licitação mais rápido com IA — resumo anônimo para leitura inicial; Premium para chat com trechos e análise aprofundada.",
  path: "/ler-edital-com-ia",
});

/**
 * Landing SEO (stub PT-BR): foco em licitações — upload opcional no fluxo anônimo.
 */
export default function LerEditalComIaPage() {
  return (
    <SeoPageTemplate
      title="Ler edital com IA"
      intro="Decifre prazos, exigências e critérios de julgamento com apoio da IA. O resumo gratuito cobre um primeiro passe; no Premium você conversa com o PDF e vê referências por página."
      showUpload
    >
      <section className="rounded-[length:var(--radius-cards)] border border-subtle-gray bg-canvas p-6">
        <h2 className="font-display text-lg font-semibold text-midnight-ink">O que esperar</h2>
        <ul className="mt-3 list-inside list-disc space-y-2 text-base text-charcoal-text">
          <li>Leitura guiada de editais longos e anexos em PDF.</li>
          <li>
            <strong className="font-medium text-midnight-ink">Premium:</strong> perguntas sobre cláusulas e trechos com rótulo de página (não substitui assessoria jurídica).
          </li>
        </ul>
      </section>
    </SeoPageTemplate>
  );
}
