"use client";

import posthog from "posthog-js";
import { useEffect } from "react";

type Props = {
  userId: string;
  email: string | null;
  isPremium: boolean;
};

export function IdentifyUser({ userId, email, isPremium }: Props) {
  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) return;
    if (!posthog.__loaded) return;
    if (posthog.get_distinct_id() === userId) return;
    posthog.identify(userId, {
      email: email ?? undefined,
      plan: isPremium ? "premium" : "free",
    });
  }, [userId, email, isPremium]);

  return null;
}
