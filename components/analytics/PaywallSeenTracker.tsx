"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

export function PaywallSeenTracker({
  trigger,
  surface,
}: {
  trigger: string;
  surface: string;
}) {
  useEffect(() => {
    track("paywall_seen", { trigger, surface });
  }, [trigger, surface]);
  return null;
}
