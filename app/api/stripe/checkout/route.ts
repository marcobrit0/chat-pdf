import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { assertAllowedPriceId } from "@/lib/stripe/price-allowlist";
import { getStripe } from "@/lib/stripe/server";
import { getSiteUrl } from "@/lib/seo";

export const runtime = "nodejs";

/**
 * Creates a Stripe Checkout Session using only server-validated price IDs (allowlist).
 * Expects JSON body: { "priceId": "price_..." }
 */
export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { priceId?: string };
    const priceId = body.priceId;
    if (!priceId || typeof priceId !== "string") {
      return NextResponse.json(
        { error: "priceId obrigatório" },
        { status: 400 },
      );
    }

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

    const site = getSiteUrl();
    const stripe = getStripe();

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${site}/app?checkout=success`,
      cancel_url: `${site}/pricing?checkout=cancel`,
      client_reference_id: user.id,
      metadata: {
        supabase_user_id: user.id,
      },
      subscription_data: {
        metadata: {
          supabase_user_id: user.id,
        },
      },
      customer_email: user.email ?? undefined,
    });

    if (!session.url) {
      return NextResponse.json(
        { error: "Falha ao criar sessão" },
        { status: 500 },
      );
    }

    return NextResponse.json({ url: session.url });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Erro desconhecido";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
