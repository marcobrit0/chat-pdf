import { CheckoutButton } from "@/components/marketing/CheckoutButton";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Preços — ChatPDF Brasil",
  description: "Planos Premium com Stripe.",
  path: "/precos",
});

export default function PrecosPage() {
  const monthly = process.env.NEXT_PUBLIC_STRIPE_PRICE_MONTHLY ?? "";
  const yearly = process.env.NEXT_PUBLIC_STRIPE_PRICE_YEARLY ?? "";

  return (
    <article className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <h1 className="font-display text-4xl font-semibold text-midnight-ink">Preços</h1>
      <p className="mt-4 text-lg text-charcoal-text">Price IDs validados no servidor antes do Checkout.</p>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <section className="rounded-[length:var(--radius-cards)] border border-subtle-gray bg-crisp-white p-6">
          <h2 className="font-display text-xl font-semibold">Premium Mensal</h2>
          <div className="mt-6">
            <CheckoutButton priceId={monthly} label="Assinar mensal" />
          </div>
        </section>
        <section className="rounded-[length:var(--radius-cards)] border border-subtle-gray bg-crisp-white p-6">
          <h2 className="font-display text-xl font-semibold">Premium Anual</h2>
          <div className="mt-6">
            <CheckoutButton priceId={yearly} label="Assinar anual" />
          </div>
        </section>
      </div>
    </article>
  );
}
