import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { assertAllowedPriceId } from "@/lib/stripe/price-allowlist";
import { getStripe } from "@/lib/stripe/server";
import { isPaidSubscriptionStatus } from "@/lib/stripe/subscription-status";
import { getSiteUrl } from "@/lib/seo";
import { checkoutRequestSchema, parseJsonWithSchema } from "@/lib/security/request-validation";
import { logApiError } from "@/lib/security/safe-api-response";
import { consumeUserAndIpLimit } from "@/lib/usage/premium-limits";

export const runtime = "nodejs";

/**
 * Creates a Stripe Checkout Session using only server-validated price IDs (allowlist).
 * Expects JSON body: { "priceId": "price_..." }
 */
export async function POST(request: Request) {
  try {
    const parsed = await parseJsonWithSchema(request, checkoutRequestSchema);
    if (!parsed.ok) {
      return NextResponse.json({ error: parsed.error }, { status: 400 });
    }

    const { priceId } = parsed.data;
    assertAllowedPriceId(priceId);

    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: "Faça login para assinar" },
        { status: 401 },
      );
    }

    const { data: existingSubscription, error: subscriptionError } = await supabase
      .from("subscriptions")
      .select("status, stripe_customer_id")
      .eq("user_id", user.id)
      .maybeSingle();

    if (subscriptionError) {
      logApiError("api/stripe/checkout", subscriptionError);
      return NextResponse.json(
        { error: "Não rolou conferir sua assinatura agora. Tenta de novo em um minuto." },
        { status: 500 },
      );
    }

    if (isPaidSubscriptionStatus(existingSubscription?.status)) {
      return NextResponse.json(
        { error: "Seu Premium já tá ativo — tudo liberado pra você." },
        { status: 409 },
      );
    }

    const site = getSiteUrl();
    const stripe = getStripe();
    const quota = await consumeUserAndIpLimit({
      action: "stripe-checkout",
      userId: user.id,
      request,
    });
    if (!quota.ok) {
      return NextResponse.json({ error: quota.reason }, { status: quota.status });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      allow_promotion_codes: true,
      success_url: `${site}/app?checkout=success`,
      cancel_url: `${site}/precos?checkout=cancel`,
      client_reference_id: user.id,
      metadata: {
        supabase_user_id: user.id,
      },
      subscription_data: {
        metadata: {
          supabase_user_id: user.id,
        },
      },
      ...(existingSubscription?.stripe_customer_id
        ? { customer: existingSubscription.stripe_customer_id }
        : { customer_email: user.email ?? undefined }),
    });

    if (!session.url) {
      return NextResponse.json(
        { error: "Não rolou abrir o checkout. Tenta de novo?" },
        { status: 500 },
      );
    }

    return NextResponse.json({ url: session.url });
  } catch (e) {
    logApiError("api/stripe/checkout", e);
    return NextResponse.json(
      { error: "Não rolou começar o checkout. Tenta de novo em um minuto." },
      { status: 400 },
    );
  }
}
