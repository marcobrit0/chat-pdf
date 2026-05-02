import { createHash } from "node:crypto";

/**
 * Privacy-preserving daily fingerprint for anonymous rate limits (IP + salt; no raw IP stored).
 */
export function hashAnonymousFingerprint(
  ip: string | null,
  userAgent: string | null,
): string {
  const salt = process.env.ANONYMOUS_RATE_SALT ?? "dev-only-salt-change-me";
  const raw = `${ip ?? "unknown"}|${userAgent ?? ""}|${salt}`;
  return createHash("sha256").update(raw).digest("hex");
}

export function getClientIp(request: Request): string | null {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() ?? null;
  }
  return request.headers.get("x-real-ip");
}
