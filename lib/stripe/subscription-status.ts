const PAID_STATUSES = new Set(["active", "trialing"]);

/** Stripe-backed entitlement states that should not create another Checkout Session. */
export function isPaidSubscriptionStatus(status: string | null | undefined): boolean {
  return PAID_STATUSES.has(status ?? "");
}
