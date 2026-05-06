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
      <h2 id="roadmap-heading" className="font-display text-subheading font-semibold text-midnight-ink">
        Em breve no Premium
      </h2>
      <p className="text-body-sm text-charcoal-text">
        Novidades a caminho — vamos avisar no app assim que liberarmos. Sem teaser de feature que não existe.
      </p>

      <div className="grid gap-4 md:grid-cols-2">
        <RoadmapCard
          title="Comparar dois PDFs"
          description="Coloque a v1 e a v2 lado a lado e veja o que mudou — útil pra contrato renegociado e edital corrigido."
          href="/app/compare"
          footnote={isPremium ? "Em construção — vamos avisar quando soltar." : "Vai entrar no Premium quando liberarmos."}
        />
        <RoadmapCard
          title="Pasta de PDFs"
          description="Agrupe vários arquivos num projeto único e pergunte como se fossem um só (todos os contratos do RH, por exemplo)."
          href="/app/pasta"
          footnote={isPremium ? "Em construção — vamos avisar quando soltar." : "Próxima prioridade no Premium."}
        />
      </div>

      {!isPremium ? (
        <PaywallCta variant="default" reason="Comparar PDFs e pastas vão entrar no Premium quando estiverem prontas. Já dá pra usar o resto do workspace agora — chat com a página citada, modos de análise e biblioteca." />
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
    <div className="flex flex-col rounded-lg border border-subtle-gray bg-crisp-white p-card">
      <h3 className="font-display text-subheading font-semibold text-midnight-ink">{title}</h3>
      <p className="mt-2 flex-1 text-body-sm text-charcoal-text">{description}</p>
      <p className="mt-3 text-caption text-faded-stone">{footnote}</p>
      <Link
        href={href}
        className="mt-4 inline-flex rounded-lg border border-midnight-ink px-4 py-2 text-body-sm font-medium text-midnight-ink hover:bg-canvas"
      >
        Ver status
      </Link>
    </div>
  );
}
