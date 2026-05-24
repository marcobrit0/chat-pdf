import Link from "next/link";
import { PaywallSeenTracker } from "@/components/analytics/PaywallSeenTracker";

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
    headline: "Tá no limite do grátis",
    body: "O resumo grátis cobre PDF de até 10 páginas, sem cadastro. Pra documentos maiores, chat com o PDF, biblioteca salva e exportar pro time, vai precisar do Premium.",
    cta: "Ver Premium · R$29/mês",
  },
  after_summary: {
    headline: "Quer perguntar ao PDF?",
    body: "O resumo grátis para por aqui. Pra conversar com o documento, receber a página de origem em cada resposta e usar os modos pra contrato, edital ou apólice, é Premium.",
    cta: "Liberar chat com o PDF",
  },
  blocked_chat: {
    headline: "Chat com o PDF é Premium",
    body: "Perguntar em português e receber resposta com a página exata do PDF é parte do Premium. No grátis você tem só o resumo automático.",
    cta: "Assinar Premium · R$29",
  },
  large_pdf: {
    headline: "PDF passou de 10 páginas",
    body: "PDF longo (contrato, edital, relatório) precisa do Premium — até 100 páginas, com chat e modos de análise prontos. Cancele quando quiser.",
    cta: "Ver planos",
  },
  export: {
    headline: "Exportar é Premium",
    body: "Pra baixar resumo + perguntas em PDF/Markdown e manter o histórico salvo, é Premium. No grátis dá pra copiar o resumo da tela.",
    cta: "Quero exportar · R$29/mês",
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
    <div className="rounded-xl bg-ash-gray p-card md:p-card-elevated">
      <PaywallSeenTracker trigger={variant} surface="paywall_cta" />
      <p className="font-display text-subheading font-semibold text-midnight-ink">
        {copy.headline}
      </p>
      <p className="mt-3 text-body text-charcoal-text">
        {reason ?? copy.body}
      </p>
      <Link
        href="/precos"
        className="mt-6 inline-flex rounded-lg bg-apollo-gold px-5 py-3 text-body font-medium text-midnight-ink"
      >
        {copy.cta}
      </Link>
    </div>
  );
}
