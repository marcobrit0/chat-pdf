/**
 * Server-side allowlist of Stripe Price IDs — never trust client-submitted price IDs without this check.
 */
export function getAllowedPriceIds(): string[] {
  const raw = process.env.STRIPE_PRICE_IDS;
  if (raw) {
    return raw
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }
  const singles = [
    process.env.STRIPE_PRICE_PREMIUM_MONTHLY,
    process.env.STRIPE_PRICE_PREMIUM_YEARLY,
  ].filter((x): x is string => Boolean(x));
  return singles;
}

export function assertAllowedPriceId(priceId: string): void {
  const allowed = getAllowedPriceIds();
  if (allowed.length === 0) {
    throw new Error(
      "No STRIPE_PRICE_IDS or monthly/yearly price env configured",
    );
  }
  if (!allowed.includes(priceId)) {
    throw new Error("Price not allowed");
  }
}
