/**
 * Browser-side product analytics. Routes through PostHog when
 * `NEXT_PUBLIC_POSTHOG_KEY` is set; falls back to `console.debug` in dev so
 * call sites work without the SDK loaded.
 */
import posthog from "posthog-js";

type AnalyticsProps = Record<string, string | number | boolean | undefined | null>;

export function track(event: string, properties?: AnalyticsProps): void {
  if (typeof window === "undefined") return;

  if (process.env.NEXT_PUBLIC_POSTHOG_KEY && posthog.__loaded) {
    posthog.capture(event, properties);
  }

  if (process.env.NODE_ENV === "development") {
    console.debug(`[analytics] ${event}`, properties);
  }
}
