import { createServiceRoleClient } from "@/lib/supabase/admin";
import { ANON_SUMMARIES_PER_DAY } from "@/lib/constants/limits";

function utcDayString(d = new Date()): string {
  return d.toISOString().slice(0, 10);
}

/** In-memory fallback when Supabase service role is not configured (local dev). TODO: remove in production. */
const memoryCounts = new Map<string, number>();

function memoryKey(day: string, fingerprintHash: string) {
  return `${day}:${fingerprintHash}`;
}

/**
 * Checks/increments anonymous daily summary usage.
 * Uses Supabase when configured; otherwise in-memory store for dev (see TODO).
 */
export async function consumeAnonymousSummarySlot(
  fingerprintHash: string,
): Promise<{ ok: boolean; count: number }> {
  const day = utcDayString();

  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    const key = memoryKey(day, fingerprintHash);
    const current = memoryCounts.get(key) ?? 0;
    if (current >= ANON_SUMMARIES_PER_DAY) {
      return { ok: false, count: current };
    }
    const next = current + 1;
    memoryCounts.set(key, next);
    return { ok: true, count: next };
  }

  const admin = createServiceRoleClient();

  const { data: row, error: readError } = await admin
    .from("anonymous_usage_daily")
    .select("summary_count")
    .eq("day", day)
    .eq("fingerprint_hash", fingerprintHash)
    .maybeSingle();

  if (readError) {
    console.error("[anonymous rate limit read]", readError);
    return { ok: false, count: ANON_SUMMARIES_PER_DAY };
  }

  const current = row?.summary_count ?? 0;
  if (current >= ANON_SUMMARIES_PER_DAY) {
    return { ok: false, count: current };
  }

  const next = current + 1;
  const { error: writeError } = await admin
    .from("anonymous_usage_daily")
    .upsert(
      {
        day,
        fingerprint_hash: fingerprintHash,
        summary_count: next,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "day,fingerprint_hash" },
    );

  if (writeError) {
    console.error("[anonymous rate limit write]", writeError);
    return { ok: false, count: current };
  }

  return { ok: true, count: next };
}
