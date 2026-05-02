import type { SupabaseClient } from "@supabase/supabase-js";

export type PremiumGate =
  | { ok: true }
  | { ok: false; reason: string; status: number };

/**
 * Premium = active Stripe-backed subscription OR explicit dev stub (see BLOCKERS.md).
 * Never trust the client; always load subscription row with the user's session client.
 */
export async function requirePremiumAccess(
  supabase: SupabaseClient,
  userId: string,
): Promise<PremiumGate> {
  // Optional dev/demo bypass — must be set deliberately on the server.
  if (process.env.CHATPDF_PREMIUM_STUB === "true") {
    return { ok: true };
  }

  const allowList = process.env.CHATPDF_PREMIUM_STUB_USER_IDS ?? "";
  if (allowList.trim()) {
    const ids = allowList.split(",").map((s) => s.trim());
    if (ids.includes(userId)) {
      return { ok: true };
    }
  }

  const { data: row, error } = await supabase
    .from("subscriptions")
    .select("status")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    return {
      ok: false,
      reason: "Não foi possível verificar a assinatura.",
      status: 500,
    };
  }

  const status = row?.status ?? "";
  if (status === "active" || status === "trialing") {
    return { ok: true };
  }

  return {
    ok: false,
    reason:
      "Este recurso exige ChatPDF Premium ativo. Veja os planos em /precos.",
    status: 402,
  };
}
