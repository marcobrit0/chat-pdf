"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

type CheckoutButtonProps = { priceId: string; label: string };

export function CheckoutButton({ priceId, label }: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onClick() {
    setLoading(true);
    setError(null);
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
        setError(data.error ?? "Erro no checkout");
        return;
      }
      if (data.url) window.location.href = data.url;
    } catch {
      setError("Erro de rede");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={onClick}
        disabled={loading || !priceId}
        className="inline-flex min-w-[200px] items-center justify-center rounded-lg bg-apollo-gold px-5 py-3 text-body font-medium text-midnight-ink disabled:opacity-60"
      >
        {loading ? "…" : label}
      </button>
      {error ? <p className="mt-2 text-body-sm text-red-700">{error}</p> : null}
    </div>
  );
}
