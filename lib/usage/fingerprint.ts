import { createHash } from "node:crypto";

/**
 * Privacy-preserving daily fingerprint for rate limits (IP + salt; no raw IP stored).
 * User-Agent is intentionally ignored so changing browser strings cannot reset quotas.
 */
export function hashAnonymousFingerprint(
  ip: string | null,
): string {
  const salt = process.env.ANONYMOUS_RATE_SALT ?? "dev-only-salt-change-me";
  const raw = `${ip ?? "unknown"}|${salt}`;
  return createHash("sha256").update(raw).digest("hex");
}

export function getClientIp(request: Request): string | null {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() ?? null;
  }
  return request.headers.get("x-real-ip");
}
