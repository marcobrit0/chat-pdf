import "server-only";
import { createServiceRoleClient } from "@/lib/supabase/admin";

export type DailyLimitResult = { ok: boolean; count: number };

type RpcLimitRow = {
  ok?: boolean;
  count?: number;
};

const memoryCounts = new Map<string, number>();

function utcDayString(d = new Date()): string {
  return d.toISOString().slice(0, 10);
}

function memoryKey(day: string, scope: string, identifier: string): string {
  return `${day}:${scope}:${identifier}`;
}

function consumeMemorySlots(
  scope: string,
  identifiers: string[],
  limit: number,
): DailyLimitResult {
  const day = utcDayString();
  const keys = identifiers.map((identifier) => memoryKey(day, scope, identifier));
  const counts = keys.map((key) => memoryCounts.get(key) ?? 0);
  const currentMax = Math.max(...counts, 0);

  if (counts.some((count) => count >= limit)) {
    return { ok: false, count: currentMax };
  }

  keys.forEach((key, index) => {
    memoryCounts.set(key, counts[index] + 1);
  });
  return { ok: true, count: currentMax + 1 };
}

function consumeMemorySlot(
  scope: string,
  identifier: string,
  limit: number,
): DailyLimitResult {
  return consumeMemorySlots(scope, [identifier], limit);
}

function productionMissingServiceRole(): boolean {
  return (
    process.env.NODE_ENV === "production" &&
    !process.env.SUPABASE_SERVICE_ROLE_KEY
  );
}

function productionMissingAnonymousStorage(): boolean {
  return (
    process.env.NODE_ENV === "production" &&
    (!process.env.SUPABASE_SERVICE_ROLE_KEY || !process.env.ANONYMOUS_RATE_SALT)
  );
}

function firstRpcRow(data: unknown): RpcLimitRow | null {
  if (Array.isArray(data)) {
    return (data[0] as RpcLimitRow | undefined) ?? null;
  }

  return (data as RpcLimitRow | null) ?? null;
}

function dailyLimitFromRpc(
  data: unknown,
  fallbackCount: number,
): DailyLimitResult {
  const row = firstRpcRow(data);
  return { ok: row?.ok === true, count: row?.count ?? fallbackCount };
}

/**
 * Consumes one anonymous summary slot using an atomic Postgres function in production.
 */
export async function consumeAnonymousSummaryRpcSlot(
  fingerprintHash: string,
  limit: number,
): Promise<DailyLimitResult> {
  if (productionMissingAnonymousStorage()) {
    return { ok: false, count: limit };
  }

  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return consumeMemorySlot("anonymous-summary", fingerprintHash, limit);
  }

  const admin = createServiceRoleClient();
  const { data, error } = await admin.rpc("consume_anonymous_summary_slot", {
    p_day: utcDayString(),
    p_fingerprint_hash: fingerprintHash,
    p_limit: limit,
  });

  if (error) {
    console.error("[anonymous rate limit rpc]", error);
    return { ok: false, count: limit };
  }

  return dailyLimitFromRpc(data, limit);
}

/**
 * Consumes one server-side daily slot for cost-sensitive authenticated actions.
 */
export async function consumeDailyUsageSlot(options: {
  scope: string;
  identifier: string;
  limit: number;
}): Promise<DailyLimitResult> {
  const { scope, identifier, limit } = options;

  if (productionMissingServiceRole()) {
    return { ok: false, count: limit };
  }

  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return consumeMemorySlot(scope, identifier, limit);
  }

  const admin = createServiceRoleClient();
  const { data, error } = await admin.rpc("consume_usage_slot", {
    p_day: utcDayString(),
    p_scope: scope,
    p_identifier: identifier,
    p_limit: limit,
  });

  if (error) {
    console.error("[daily usage limit rpc]", error);
    return { ok: false, count: limit };
  }

  return dailyLimitFromRpc(data, limit);
}

/**
 * Consumes several related counters as one decision, so user/IP checks cannot partially charge.
 */
export async function consumeDailyUsageSlots(options: {
  scope: string;
  identifiers: string[];
  limit: number;
}): Promise<DailyLimitResult> {
  const identifiers = Array.from(new Set(options.identifiers.filter(Boolean)));
  if (identifiers.length === 0) {
    return { ok: false, count: 0 };
  }

  if (productionMissingServiceRole()) {
    return { ok: false, count: options.limit };
  }

  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return consumeMemorySlots(options.scope, identifiers, options.limit);
  }

  const admin = createServiceRoleClient();
  const { data, error } = await admin.rpc("consume_usage_slots", {
    p_day: utcDayString(),
    p_scope: options.scope,
    p_identifiers: identifiers,
    p_limit: options.limit,
  });

  if (error) {
    console.error("[daily usage limits rpc]", error);
    return { ok: false, count: options.limit };
  }

  return dailyLimitFromRpc(data, options.limit);
}
