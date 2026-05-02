/**
 * Extrai menções de página do texto do assistente (ex.: [p. 2], [p. 3–5]).
 * Usado no workspace até o backend enviar citações estruturadas por resposta.
 */
const PAGE_CITATION_REGEX = /\[\s*p\.\s*(\d+(?:\s*[–-]\s*\d+)?)\s*\]/gi;

export function extractPageHintsFromAssistantText(text: string): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  let m: RegExpExecArray | null;
  const re = new RegExp(PAGE_CITATION_REGEX.source, PAGE_CITATION_REGEX.flags);
  while ((m = re.exec(text)) !== null) {
    const normalized = m[1]?.replace(/\s*-\s*/g, "–").trim();
    if (!normalized || seen.has(normalized)) continue;
    seen.add(normalized);
    out.push(`p. ${normalized}`);
  }
  return out;
}
