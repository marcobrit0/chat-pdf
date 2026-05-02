import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { createServiceRoleClient } from "@/lib/supabase/admin";
import { getStripe } from "@/lib/stripe/server";

export const runtime = "nodejs";

function mapStripeStatus(status: Stripe.Subscription.Status): string {
  switch (status) {
    case "active":
    case "trialing":
      return status;
    case "past_due":
    case "unpaid":
      return status;
    case "canceled":
    case "incomplete_expired":
      return "canceled";
    default:
      return status;
  }
}

async function upsertSubscriptionFromStripe(
  sub: Stripe.Subscription,
  fallbackUserId?: string,
) {
  const admin = createServiceRoleClient();
  const userId =
    sub.metadata?.supabase_user_id ??
    fallbackUserId ??
    (await findUserIdByCustomerId(admin, sub.customer as string));

  if (!userId) {
    console.warn(
      "[stripe webhook] missing user mapping for subscription",
      sub.id,
    );
    return;
  }

  const firstItem = sub.items.data[0];
  const priceId = firstItem?.price?.id ?? null;
  const customerId =
    typeof sub.customer === "string" ? sub.customer : sub.customer?.id;

  // Stripe API models billing period per subscription item (not always on the subscription root).
  const periodEndUnix = firstItem?.current_period_end ?? null;

  await admin.from("subscriptions").upsert(
    {
      user_id: userId,
      stripe_customer_id: customerId ?? null,
      stripe_subscription_id: sub.id,
      status: mapStripeStatus(sub.status),
      price_id: priceId,
      current_period_end: periodEndUnix
        ? new Date(periodEndUnix * 1000).toISOString()
        : null,
      cancel_at_period_end: sub.cancel_at_period_end ?? false,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id" },
  );
}

async function findUserIdByCustomerId(
  admin: ReturnType<typeof createServiceRoleClient>,
  customerId: string,
) {
  const { data } = await admin
    .from("subscriptions")
    .select("user_id")
    .eq("stripe_customer_id", customerId)
    .maybeSingle();
  return data?.user_id as string | undefined;
}

/**
 * Stripe webhook — verifies signature, syncs subscription rows (service role only).
 */
export async function POST(request: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json(
      { error: "Webhook não configurado" },
      { status: 500 },
    );
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Assinatura ausente" }, { status: 400 });
  }

  const rawBody = await request.text();
  let event: Stripe.Event;

  try {
    event = getStripe().webhooks.constructEvent(rawBody, signature, secret);
  } catch {
    return NextResponse.json({ error: "Assinatura inválida" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId =
          session.metadata?.supabase_user_id ??
          session.client_reference_id ??
          undefined;
        const subId = session.subscription;
        if (typeof subId === "string") {
          const sub = await getStripe().subscriptions.retrieve(subId);
          await upsertSubscriptionFromStripe(sub, userId);
        }
        break;
      }
      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        const sub = event.data.object as Stripe.Subscription;
        await upsertSubscriptionFromStripe(sub);
        break;
      }
      default:
        break;
    }
  } catch (e) {
    console.error("[stripe webhook]", e);
    return NextResponse.json(
      { error: "Falha ao processar evento" },
      { status: 500 },
    );
  }

  return NextResponse.json({ received: true });
}
