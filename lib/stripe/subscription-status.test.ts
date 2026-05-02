import { describe, expect, it } from "vitest";
import { isPaidSubscriptionStatus } from "@/lib/stripe/subscription-status";

describe("isPaidSubscriptionStatus", () => {
  it("treats active and trialing subscriptions as already paid", () => {
    expect(isPaidSubscriptionStatus("active")).toBe(true);
    expect(isPaidSubscriptionStatus("trialing")).toBe(true);
  });

  it("does not treat failed or canceled subscriptions as paid", () => {
    expect(isPaidSubscriptionStatus("past_due")).toBe(false);
    expect(isPaidSubscriptionStatus("canceled")).toBe(false);
    expect(isPaidSubscriptionStatus(null)).toBe(false);
  });
});
