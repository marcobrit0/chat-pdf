import { ANON_SUMMARIES_PER_DAY } from "@/lib/constants/limits";
import { consumeAnonymousSummaryRpcSlot } from "@/lib/usage/daily-limit";

/**
 * Checks/increments anonymous daily summary usage with an atomic server-side counter.
 * Development can use memory fallback; production fails closed when storage is missing.
 */
export async function consumeAnonymousSummarySlot(
  fingerprintHash: string,
): Promise<{ ok: boolean; count: number }> {
  return consumeAnonymousSummaryRpcSlot(fingerprintHash, ANON_SUMMARIES_PER_DAY);
}
