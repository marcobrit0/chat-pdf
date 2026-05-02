/**
 * Hooks de analytics leves: sem dependência obrigatória do PostHog.
 *
 * - Em desenvolvimento: registra no `console.debug`.
 * - Se `NEXT_PUBLIC_POSTHOG_KEY` existir, você pode ligar o SDK oficial depois
 *   ou usar um proxy — por ora apenas enfileira eventos em `window.__CHATPDF_EVENTS__`
 *   para inspeção e para não bloquear o lançamento.
 */
type AnalyticsProps = Record<string, string | number | boolean | undefined | null>;

export type ChatPdfQueuedEvent = {
  event: string;
  properties?: AnalyticsProps;
  t: number;
};

declare global {
  interface Window {
    __CHATPDF_EVENTS__?: ChatPdfQueuedEvent[];
  }
}

/**
 * Envia um evento de produto (fila opcional + log em dev).
 */
export function track(event: string, properties?: AnalyticsProps): void {
  if (typeof window === "undefined") return;

  if (process.env.NEXT_PUBLIC_POSTHOG_KEY) {
    window.__CHATPDF_EVENTS__ = window.__CHATPDF_EVENTS__ ?? [];
    window.__CHATPDF_EVENTS__.push({ event, properties, t: Date.now() });
    const max = 80;
    if (window.__CHATPDF_EVENTS__.length > max) {
      window.__CHATPDF_EVENTS__ = window.__CHATPDF_EVENTS__.slice(-max);
    }
  }

  if (process.env.NODE_ENV === "development") {
    console.debug(`[analytics] ${event}`, properties);
  }
}
