"use client";

import { useEffect, useState } from "react";
import { track } from "@/lib/analytics";

/**
 * Shown once after Stripe redirects back with `?checkout=success`. Marks the
 * upgrade moment so users don't bounce silently between Stripe and a stock
 * dashboard. Strips the param from the URL so a refresh doesn't re-show it.
 */
export function PremiumWelcomeBanner() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    track("premium_welcome_banner_shown", {});
    const url = new URL(window.location.href);
    if (url.searchParams.has("checkout")) {
      url.searchParams.delete("checkout");
      window.history.replaceState({}, "", url.toString());
    }
  }, []);

  if (!visible) return null;

  return (
    <div
      role="status"
      className="rounded-lg border-2 border-midnight-ink bg-apollo-gold p-card"
    >
      <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
        <div className="space-y-1">
          <p className="eyebrow text-midnight-ink">Premium ativo</p>
          <p className="font-display text-heading font-semibold text-midnight-ink">
            Bem-vindo ao Premium. Tudo liberado.
          </p>
          <p className="text-body-sm text-midnight-ink/80">
            Suba seu primeiro PDF abaixo — chat com citação de página, modos de
            análise e biblioteca já estão prontos.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setVisible(false)}
          className="self-start rounded-lg border border-midnight-ink bg-crisp-white px-4 py-2 text-body-sm font-medium text-midnight-ink hover:bg-canvas md:self-center"
        >
          Começar
        </button>
      </div>
    </div>
  );
}
