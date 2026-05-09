import "server-only";
import { PostHog } from "posthog-node";

let client: PostHog | null = null;

function getClient(): PostHog | null {
  const key = process.env.POSTHOG_KEY ?? process.env.NEXT_PUBLIC_POSTHOG_KEY;
  if (!key) return null;
  if (client) return client;
  client = new PostHog(key, {
    host:
      process.env.POSTHOG_HOST ??
      process.env.NEXT_PUBLIC_POSTHOG_HOST ??
      "https://us.i.posthog.com",
    flushAt: 1,
    flushInterval: 0,
  });
  return client;
}

type Props = Record<string, string | number | boolean | null | undefined>;

/**
 * Capture a server-side event and flush before returning so events aren't lost
 * when the serverless instance is suspended.
 */
export async function captureServerEvent(
  distinctId: string,
  event: string,
  properties?: Props,
): Promise<void> {
  const ph = getClient();
  if (!ph) return;
  ph.capture({ distinctId, event, properties });
  try {
    await ph.flush();
  } catch (e) {
    console.warn("[posthog-server] flush failed", e);
  }
}
