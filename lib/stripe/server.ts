import Stripe from "stripe";

let stripeSingleton: Stripe | null = null;

/**
 * Lazy Stripe SDK — avoids throwing at module load when STRIPE_SECRET_KEY is absent (e.g. CI build).
 */
export function getStripe(): Stripe {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("Missing STRIPE_SECRET_KEY");
  }
  if (!stripeSingleton) {
    stripeSingleton = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2026-04-22.dahlia",
      typescript: true,
    });
  }
  return stripeSingleton;
}
