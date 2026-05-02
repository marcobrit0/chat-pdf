const PDF_MAGIC = "%PDF-";
const MAX_DOCUMENT_TITLE_CHARS = 120;

/** Verify the file bytes, because browser-provided MIME types are attacker-controlled. */
export function isPdfMagicBytes(buffer: Buffer): boolean {
  return buffer.subarray(0, PDF_MAGIC.length).toString("utf8") === PDF_MAGIC;
}

/** Reject declared oversized bodies before multipart parsing can allocate memory. */
export function isContentLengthWithinLimit(request: Request, maxBytes: number): boolean {
  const raw = request.headers.get("content-length");
  if (!raw) return false;

  const parsed = Number(raw);
  return Number.isFinite(parsed) && parsed >= 0 && parsed <= maxBytes;
}

/** Normalize persisted titles so untrusted filenames cannot create huge or empty labels. */
export function sanitizeDocumentTitle(raw: string | null | undefined): string {
  const withoutExtension = (raw ?? "").replace(/\.pdf$/i, "").trim();
  const fallback = withoutExtension || "Documento";

  return fallback.slice(0, MAX_DOCUMENT_TITLE_CHARS);
}
