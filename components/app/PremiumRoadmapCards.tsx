import Link from "next/link";
import { PaywallCta } from "@/components/marketing/PaywallCta";

type Props = { isPremium: boolean };

/**
 * Cartões honestos do roteiro Premium: comparação de PDFs e pastas multi-arquivo.
 * Não premium: CTA para /precos e bloco Paywall; premium: links para páginas placeholder.
 */
export function PremiumRoadmapCards({ isPremium }: Props) {
  return (
    <section className="space-y-4" aria-labelledby="roadmap-heading">
      <h2 id="roadmap-heading" className="font-display text-xl font-semibold text-midnight-ink">
        Roteiro Premium
      </h2>
      <p className="text-sm text-charcoal-text">
        Novidades em desenvolvimento — sem backend simulado; as páginas abaixo explicam o status.
      </p>

      <div className="grid gap-4 md:grid-cols-2">
        <RoadmapCard
          title="Comparar PDFs"
          description="Alinhar dois documentos e destacar diferenças (legível por humanos)."
          href="/app/compare"
          footnote={isPremium ? "Placeholder até o motor de diff." : "Exige assinatura para uso futuro."}
        />
        <RoadmapCard
          title="Pasta de PDFs"
          description="Agrupar arquivos num projeto com busca e contexto compartilhado."
          href="/app/pasta"
          footnote={isPremium ? "Placeholder — sem armazenamento extra ainda." : "Será prioridade no Premium."}
        />
      </div>

      {!isPremium ? (
        <PaywallCta variant="default" reason="Comparação e pastas fazem parte do plano pago quando estiverem prontas. Desbloqueie para usar o workspace completo hoje." />
      ) : null}
    </section>
  );
}

function RoadmapCard({
  title,
  description,
  href,
  footnote,
}: {
  title: string;
  description: string;
  href: string;
  footnote: string;
}) {
  return (
    <div className="flex flex-col rounded-[length:var(--radius-cards)] border border-subtle-gray bg-crisp-white p-5">
      <h3 className="font-display text-lg font-semibold text-midnight-ink">{title}</h3>
      <p className="mt-2 flex-1 text-sm text-charcoal-text">{description}</p>
      <p className="mt-3 text-xs text-faded-stone">{footnote}</p>
      <Link
        href={href}
        className="mt-4 inline-flex rounded-[length:var(--radius-buttons)] border border-midnight-ink px-4 py-2 text-sm font-medium text-midnight-ink hover:bg-canvas"
      >
        Abrir página de status
      </Link>
    </div>
  );
}
