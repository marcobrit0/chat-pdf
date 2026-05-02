import { describe, expect, it, vi } from "vitest";
import { hashAnonymousFingerprint } from "@/lib/usage/fingerprint";

describe("hashAnonymousFingerprint", () => {
  it("keeps the same quota bucket when only user-agent changes", () => {
    vi.stubEnv("ANONYMOUS_RATE_SALT", "stable-test-salt");

    const first = hashAnonymousFingerprint("203.0.113.10");
    const second = hashAnonymousFingerprint("203.0.113.10");

    expect(first).toBe(second);
  });
});
