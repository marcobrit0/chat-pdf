import { afterEach, describe, expect, it, vi } from "vitest";
import { ANON_SUMMARIES_PER_DAY } from "@/lib/constants/limits";
import { consumeAnonymousSummarySlot } from "@/lib/usage/anonymous-rate-limit";
import { consumeDailyUsageSlots } from "@/lib/usage/daily-limit";

describe("consumeAnonymousSummarySlot", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("fails closed in production when service-role storage is not configured", async () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("SUPABASE_SERVICE_ROLE_KEY", "");
    vi.stubEnv("ANONYMOUS_RATE_SALT", "prod-salt");

    await expect(consumeAnonymousSummarySlot("fingerprint")).resolves.toEqual({
      ok: false,
      count: ANON_SUMMARIES_PER_DAY,
    });
  });

  it("fails closed in production when the anonymous fingerprint salt is missing", async () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("SUPABASE_SERVICE_ROLE_KEY", "service-role-key");
    vi.stubEnv("ANONYMOUS_RATE_SALT", "");

    await expect(consumeAnonymousSummarySlot("fingerprint")).resolves.toEqual({
      ok: false,
      count: ANON_SUMMARIES_PER_DAY,
    });
  });
});

describe("consumeDailyUsageSlots", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("checks grouped identifiers without partially consuming a denied request", async () => {
    vi.stubEnv("NODE_ENV", "development");
    vi.stubEnv("SUPABASE_SERVICE_ROLE_KEY", "");

    const first = await consumeDailyUsageSlots({
      scope: "test-combined-limit",
      identifiers: ["user:1", "ip:1"],
      limit: 1,
    });
    const second = await consumeDailyUsageSlots({
      scope: "test-combined-limit",
      identifiers: ["user:2", "ip:1"],
      limit: 1,
    });
    const third = await consumeDailyUsageSlots({
      scope: "test-combined-limit",
      identifiers: ["user:2", "ip:2"],
      limit: 1,
    });

    expect(first.ok).toBe(true);
    expect(second.ok).toBe(false);
    expect(third.ok).toBe(true);
  });
});
