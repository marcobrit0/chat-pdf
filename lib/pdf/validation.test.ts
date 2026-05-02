import { describe, expect, it } from "vitest";
import {
  isContentLengthWithinLimit,
  isPdfMagicBytes,
  sanitizeDocumentTitle,
} from "@/lib/pdf/validation";

describe("isPdfMagicBytes", () => {
  it("accepts buffers that start with the PDF file signature", () => {
    const bytes = Buffer.from("%PDF-1.7\nrest of file");

    expect(isPdfMagicBytes(bytes)).toBe(true);
  });

  it("rejects client-declared PDFs with non-PDF content", () => {
    const bytes = Buffer.from("<html>not a pdf</html>");

    expect(isPdfMagicBytes(bytes)).toBe(false);
  });
});

describe("sanitizeDocumentTitle", () => {
  it("normalizes empty or extremely long titles before persistence", () => {
    expect(sanitizeDocumentTitle("   ")).toBe("Documento");
    expect(sanitizeDocumentTitle("proposal.pdf")).toBe("proposal");
    expect(sanitizeDocumentTitle("x".repeat(220))).toHaveLength(120);
  });
});

describe("isContentLengthWithinLimit", () => {
  it("rejects missing content length before multipart parsing", () => {
    const request = new Request("https://example.test/upload");

    expect(isContentLengthWithinLimit(request, 10 * 1024 * 1024)).toBe(false);
  });

  it("rejects requests whose declared body size exceeds the route limit", () => {
    const request = new Request("https://example.test/upload", {
      headers: { "content-length": "10485761" },
    });

    expect(isContentLengthWithinLimit(request, 10 * 1024 * 1024)).toBe(false);
  });
});
