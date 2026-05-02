import "server-only";
import {
  CHECKOUT_ATTEMPTS_PER_DAY,
  PREMIUM_ANALYZE_REQUESTS_PER_DAY,
  PREMIUM_CHAT_REQUESTS_PER_DAY,
  PREMIUM_UPLOADS_PER_DAY,
} from "@/lib/constants/limits";
import { getClientIp, hashAnonymousFingerprint } from "@/lib/usage/fingerprint";
import { consumeDailyUsageSlots } from "@/lib/usage/daily-limit";

type LimitedAction =
  | "premium-chat"
  | "premium-analysis"
  | "premium-upload"
  | "stripe-checkout";

const ACTION_LIMITS: Record<LimitedAction, number> = {
  "premium-chat": PREMIUM_CHAT_REQUESTS_PER_DAY,
  "premium-analysis": PREMIUM_ANALYZE_REQUESTS_PER_DAY,
  "premium-upload": PREMIUM_UPLOADS_PER_DAY,
  "stripe-checkout": CHECKOUT_ATTEMPTS_PER_DAY,
};

type LimitDecision =
  | { ok: true }
  | { ok: false; status: number; reason: string };

const DAILY_LIMIT_DENIED: LimitDecision = {
  ok: false,
  status: 429,
  reason: "Limite diário atingido. Tente novamente amanhã.",
};

function hashedIpIdentifier(request: Request): string {
  return hashAnonymousFingerprint(getClientIp(request));
}

/**
 * Applies both per-user and per-IP limits so one account or one network cannot drain costs.
 */
export async function consumeUserAndIpLimit(options: {
  action: LimitedAction;
  userId: string;
  request: Request;
}): Promise<LimitDecision> {
  const limit = ACTION_LIMITS[options.action];
  const quota = await consumeDailyUsageSlots({
    scope: options.action,
    identifiers: [
      `user:${options.userId}`,
      `ip:${hashedIpIdentifier(options.request)}`,
    ],
    limit,
  });

  if (!quota.ok) {
    return DAILY_LIMIT_DENIED;
  }

  return { ok: true };
}
