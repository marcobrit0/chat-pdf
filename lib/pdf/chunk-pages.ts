import type { PdfPageText } from "@/lib/pdf/inspect";

/** Target size for each chunk — balances context window vs citation granularity. */
const TARGET_CHARS = 3200;

export type TextChunkForDb = {
  chunkIndex: number;
  pageStart: number;
  pageEnd: number;
  content: string;
};

/**
 * Splits oversized page text into several rows with the same page number.
 */
function pushPageSlices(
  out: TextChunkForDb[],
  startIndex: number,
  pageNum: number,
  text: string,
): number {
  let t = text.trim();
  if (!t) return startIndex;
  let idx = startIndex;
  while (t.length > 0) {
    const part = t.slice(0, TARGET_CHARS).trim();
    t = t.slice(TARGET_CHARS).trim();
    if (!part) continue;
    out.push({
      chunkIndex: idx,
      pageStart: pageNum,
      pageEnd: pageNum,
      content: part,
    });
    idx += 1;
  }
  return idx;
}

/**
 * Walks pages in order and groups text into chunks with page_start/page_end for citations.
 */
export function chunkPagesForStorage(pages: PdfPageText[]): TextChunkForDb[] {
  const normalized = pages.filter((p) => p.text.trim().length > 0);
  if (normalized.length === 0) {
    return [];
  }

  const out: TextChunkForDb[] = [];
  let chunkIndex = 0;
  let buf = "";
  let rangeStart = normalized[0].num;
  let rangeEnd = normalized[0].num;

  const flushBuffer = () => {
    const trimmed = buf.trim();
    if (!trimmed) return;
    out.push({
      chunkIndex,
      pageStart: rangeStart,
      pageEnd: rangeEnd,
      content: trimmed,
    });
    chunkIndex += 1;
    buf = "";
  };

  for (const page of normalized) {
    const piece = page.text.trim();
    if (!piece) continue;

    if (!buf) {
      rangeStart = page.num;
      rangeEnd = page.num;
    }

    const combined = buf ? `${buf}\n\n${piece}` : piece;

    if (combined.length <= TARGET_CHARS) {
      buf = combined;
      rangeEnd = page.num;
      continue;
    }

    // Does not fit — emit what we have, then handle this page.
    flushBuffer();

    if (piece.length <= TARGET_CHARS) {
      buf = piece;
      rangeStart = page.num;
      rangeEnd = page.num;
    } else {
      chunkIndex = pushPageSlices(out, chunkIndex, page.num, piece);
    }
  }

  flushBuffer();
  return out;
}
