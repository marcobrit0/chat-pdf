import { PDFParse } from "pdf-parse";

/** One page of extracted text (1-based page number from the PDF engine). */
export type PdfPageText = { num: number; text: string };

/**
 * Parses a PDF buffer for page count, flat text, and per-page lines for citations.
 * Server-only; uses pdf-parse v2 API.
 */
export async function parsePdfBuffer(
  buffer: Buffer,
): Promise<{ pageCount: number; text: string; pages: PdfPageText[] }> {
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
