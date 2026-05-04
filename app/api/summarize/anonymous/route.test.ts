import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// `parsePdfBuffer` is the only heavy dep we need to fake.
vi.mock("@/lib/pdf/inspect", () => ({
  parsePdfBuffer: vi.fn(async () => ({
    pageCount: 4,
    text: "Conteúdo de teste suficiente para passar do limite mínimo de 40 caracteres.",
  })),
}));
vi.mock("@/lib/pdf/validation", () => ({
  isContentLengthWithinLimit: () => true,
  isPdfMagicBytes: () => true,
}));
vi.mock("@/lib/usage/anonymous-rate-limit", () => ({
  consumeAnonymousSummarySlot: async () => ({ ok: true, remaining: 4 }),
}));
vi.mock("@/lib/usage/fingerprint", () => ({
  getClientIp: () => "127.0.0.1",
  hashAnonymousFingerprint: () => "fp",
}));
vi.mock("@/lib/ai/openrouter", () => ({
  summarizePdfText: vi.fn(async () => ({
    summary: "ok",
    bulletPoints: ["a"],
    keyDatesOrValues: [],
    entities: [],
    suggestedQuestions: [],
  })),
}));

const PDF_BYTES = new Uint8Array([0x25, 0x50, 0x44, 0x46]); // "%PDF"

function buildRequest(): Request {
  const file = new File([PDF_BYTES], "doc.pdf", { type: "application/pdf" });
  const fd = new FormData();
  fd.set("file", file);
  return new Request("http://localhost/api/summarize/anonymous", {
    method: "POST",
    body: fd,
  });
}

describe("POST /api/summarize/anonymous", () => {
  const ORIGINAL_ENV = { ...process.env };
  beforeEach(() => {
    process.env = { ...ORIGINAL_ENV };
  });
  afterEach(() => {
    process.env = ORIGINAL_ENV;
    vi.clearAllMocks();
  });

  it("returns pageCount on success when OPENROUTER_API_KEY is set", async () => {
    process.env.OPENROUTER_API_KEY = "test-key";
    (process.env as Record<string, string>).NODE_ENV = "production";
    const { POST } = await import("@/app/api/summarize/anonymous/route");
    const res = await POST(buildRequest());
    const body = (await res.json()) as { pageCount?: number; summary?: string };
    expect(res.status).toBe(200);
    expect(body.pageCount).toBe(4);
    expect(body.summary).toBe("ok");
  });

  it("returns 503 (not a stub) in production when the key is missing", async () => {
    delete process.env.OPENROUTER_API_KEY;
    (process.env as Record<string, string>).NODE_ENV = "production";
    const { POST } = await import("@/app/api/summarize/anonymous/route");
    const res = await POST(buildRequest());
    expect(res.status).toBe(503);
  });
});
