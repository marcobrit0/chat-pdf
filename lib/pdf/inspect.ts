/** One page of extracted text (1-based page number from the PDF engine). */
export type PdfPageText = { num: number; text: string };

/**
 * Parses a PDF buffer for page count, flat text, and per-page lines for citations.
 * Server-only; uses pdf-parse v2 API.
 */
export async function parsePdfBuffer(
  buffer: Buffer,
): Promise<{ pageCount: number; text: string; pages: PdfPageText[] }> {
  // pdfjs-dist (bundled inside pdf-parse) references DOMMatrix at module init
  // time, which doesn't exist in Vercel's serverless Node.js runtime. Stub it
  // before the dynamic import so the module can evaluate successfully.
  if (typeof globalThis.DOMMatrix === "undefined") {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (globalThis as any).DOMMatrix = class DOMMatrix {};
  }

  const { PDFParse } = await import("pdf-parse");
  const parser = new PDFParse({ data: new Uint8Array(buffer) });
  try {
    const textResult = await parser.getText();
    const pageCount =
      typeof textResult.total === "number"
        ? textResult.total
        : textResult.pages.length;
    const text = typeof textResult.text === "string" ? textResult.text : "";
    const pages: PdfPageText[] = textResult.pages.map((p) => ({
      num: p.num,
      text: typeof p.text === "string" ? p.text : "",
    }));
    return { pageCount, text, pages };
  } finally {
    await parser.destroy();
  }
}
