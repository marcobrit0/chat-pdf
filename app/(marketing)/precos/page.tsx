import Link from "next/link";
import { CheckoutButton } from "@/components/marketing/CheckoutButton";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Preços — ChatPDF Brasil",
  description:
    "Resumo gratuito para PDFs curtos. Premium a partir de R$29/mês: chat com citações de página, PDFs até 100 páginas e modos de análise.",
  path: "/precos",
});

const freeFeatures = [
  "1 resumo por dia, até 10 páginas",
  "Tópicos, datas e entidades encontrados no texto",
  "Perguntas de follow-up sugeridas",
  "Sem cadastro necessário",
];

const premiumFeatures = [
  "Chat com o documento — respostas com citação de página",
  "PDFs até 100 páginas",
  "Modos: resumo detalhado, extrair dados, revisão de riscos",
  "Histórico de documentos salvo na conta",
  "Modos específicos para contratos CLT, editais e apólices",
  "Aviso claro quando a informação não estiver no PDF",
];

export default function PrecosPage() {
  const monthly = process.env.NEXT_PUBLIC_STRIPE_PRICE_MONTHLY ?? "";
  const yearly = process.env.NEXT_PUBLIC_STRIPE_PRICE_YEARLY ?? "";

  return (
    <article className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <header className="space-y-3 text-center">
        <h1 className="font-display text-4xl font-semibold text-midnight-ink">
          Escolha seu plano
        </h1>
        <p className="text-lg text-charcoal-text">
          Comece grátis. Faça upgrade quando precisar ir fundo.
        </p>
      </header>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {/* Free */}
        <section className="rounded-[length:var(--radius-cards)] border border-subtle-gray bg-crisp-white p-8">
          <div className="space-y-1">
            <h2 className="font-display text-xl font-semibold text-midnight-ink">
              Gratuito
            </h2>
            <div className="flex items-baseline gap-1">
              <span className="font-display text-4xl font-semibold text-midnight-ink">
                R$0
              </span>
            </div>
            <p className="text-sm text-faded-stone">Sem cadastro para o resumo</p>
          </div>

          <ul className="mt-6 space-y-3">
            {freeFeatures.map((f) => (
              <li key={f} className="flex items-start gap-3 text-sm text-charcoal-text">
                <span className="mt-0.5 shrink-0 text-faded-stone">—</span>
                {f}
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <Link
              href="/resumir-pdf"
              className="inline-flex w-full items-center justify-center rounded-[length:var(--radius-buttons)] border border-midnight-ink px-5 py-3 text-base font-medium text-midnight-ink transition-transform hover:-translate-y-0.5"
            >
              Começar grátis
            </Link>
          </div>
        </section>

        {/* Premium */}
        <section className="rounded-[length:var(--radius-cards)] border-2 border-midnight-ink bg-crisp-white p-8">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h2 className="font-display text-xl font-semibold text-midnight-ink">
                Premium
              </h2>
              <span className="rounded-full bg-apollo-gold px-2 py-0.5 text-xs font-medium text-midnight-ink">
                Popular
              </span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-display text-4xl font-semibold text-midnight-ink">
                R$29
              </span>
              <span className="text-base text-faded-stone">/mês</span>
            </div>
            <p className="text-sm text-faded-stone">
              ou R$290/ano — economize R$58
            </p>
          </div>

          <ul className="mt-6 space-y-3">
            {premiumFeatures.map((f) => (
              <li key={f} className="flex items-start gap-3 text-sm text-charcoal-text">
                <span className="mt-0.5 shrink-0 font-semibold text-midnight-ink">✓</span>
                {f}
              </li>
            ))}
          </ul>

          <div className="mt-8 space-y-3">
            <CheckoutButton priceId={monthly} label="Assinar por R$29/mês" />
            <CheckoutButton priceId={yearly} label="Assinar por R$290/ano" />
          </div>
        </section>
      </div>

      <footer className="mt-10 space-y-2 text-center">
        <p className="text-sm text-faded-stone">
          Pagamento seguro via Stripe · Cancele quando quiser · Sem taxa de cancelamento
        </p>
        <p className="text-sm text-faded-stone">
          <Link href="/termos" className="underline underline-offset-4">
            Termos de uso
          </Link>{" "}
          ·{" "}
          <Link href="/privacidade" className="underline underline-offset-4">
            Privacidade
          </Link>
        </p>
      </footer>
    </article>
  );
}
