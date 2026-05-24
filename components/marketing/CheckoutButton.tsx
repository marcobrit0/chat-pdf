"use client";

import { useState } from "react";
import { track } from "@/lib/analytics";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";

type CheckoutButtonProps = {
  priceId: string;
  label: string;
  className?: string;
  variant?: "primary" | "secondary";
};

export function CheckoutButton({
  priceId,
  label,
  className = "",
  variant = "primary",
}: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onClick() {
    setLoading(true);
    setError(null);
    track("checkout_clicked", { price_id: priceId, variant });
    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        // Send to login with a return path back to /precos so checkout resumes after auth.
        const next = encodeURIComponent("/precos");
        window.location.href = `/login?next=${next}`;
        return;
      }

      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId }),
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok) {
        setError(data.error ?? "Não rolou abrir o checkout. Tenta de novo?");
        return;
      }
      if (data.url) window.location.href = data.url;
    } catch {
      setError("Sem conexão. Confere a internet e tenta de novo.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <Button
        type="button"
        onClick={onClick}
        disabled={loading || !priceId}
        variant={variant}
        size="md"
        className={className}
      >
        {loading ? "…" : label}
      </Button>
      {error ? (
        <p className="mt-2 text-body-sm text-charcoal-text">{error}</p>
      ) : null}
    </div>
  );
}
