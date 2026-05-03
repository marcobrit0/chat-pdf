import Link from "next/link";

export type PaywallVariant =
  | "default"
  | "after_summary"
  | "blocked_chat"
  | "large_pdf"
  | "export";

const COPY: Record<
  PaywallVariant,
  { headline: string; body: string; cta: string }
> = {
  default: {
    headline: "Limites do uso gratuito",
    body: "O resumo anônimo cobre PDFs menores (até 10 páginas). PDFs maiores, chat com fontes no documento, histórico e exportações organizadas exigem PDFIA Premium.",
    cta: "Ver planos Premium",
  },
  after_summary: {
    headline: "Converse com este PDF",
    body: "O resumo gratuito termina aqui — sem chat. Para perguntar ao documento, ver citações por página e aprofundar a análise (extrair dados, riscos, contratos), você precisa do Premium.",
    cta: "Desbloquear Premium",
  },
  blocked_chat: {
    headline: "Chat exclusivo Premium",
    body: "Perguntas em linguagem natural e respostas com trechos do PDF são Premium. O plano gratuito oferece apenas o resumo automático.",
    cta: "Assinar Premium",
  },
  large_pdf: {
    headline: "PDF acima do limite gratuito",
    body: "Para documentos longos, conversas com contexto completo e modos de análise (extrair, riscos), use o Premium.",
    cta: "Ver preços",
  },
  export: {
    headline: "Exportação Premium",
    body: "Pacotes de exportação e histórico permanente fazem parte do Premium. Copie o resumo na tela gratuitamente; exportações estruturadas exigem plano pago.",
    cta: "Quero Premium",
  },
};

export function PaywallCta({
  variant = "default",
  reason,
}: {
  variant?: PaywallVariant;
  /** Texto opcional que substitui o corpo padrão (ex.: erro da API). */
  reason?: string;
}) {
  const copy = COPY[variant];
  return (
    <div className="rounded-[length:var(--radius-smallcard)] bg-ash-gray p-6 md:p-8">
      <p className="font-condensed text-subheading font-bold text-midnight-ink">{copy.headline}</p>
      <p className="mt-3 text-base leading-relaxed text-charcoal-text">
        {reason ?? copy.body}
      </p>
      <Link
        href="/precos"
        className="mt-6 inline-flex rounded-[length:var(--radius-buttons)] bg-apollo-gold px-5 py-3 text-base font-medium text-midnight-ink"
      >
        {copy.cta}
      </Link>
    </div>
  );
}
