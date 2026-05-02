import Link from "next/link";

export function PaywallCta({ reason }: { reason?: string }) {
  return (
    <div className="rounded-[length:var(--radius-smallcard)] bg-ash-gray p-6 md:p-8">
      <p className="font-condensed text-subheading font-bold text-midnight-ink">Premium</p>
      {reason ? <p className="mt-2 text-base text-charcoal-text">{reason}</p> : null}
      <Link href="/precos" className="mt-6 inline-flex rounded-[length:var(--radius-buttons)] bg-apollo-gold px-5 py-3 text-base font-medium text-midnight-ink">
        Ver preços
      </Link>
    </div>
  );
}
