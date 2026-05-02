"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

type MagicLinkFormProps = {
  nextPath: string;
};

/**
 * Email magic-link login for the live app. Supabase sends the link and the callback route stores cookies.
 */
export function MagicLinkForm({ nextPath }: MagicLinkFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage(null);

    try {
      const supabase = createClient();
      const redirectTo = `${window.location.origin}/auth/callback?next=${encodeURIComponent(nextPath)}`;
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: redirectTo,
        },
      });

      if (error) {
        setStatus("error");
        setMessage("Não foi possível enviar o link. Confira o e-mail e tente novamente.");
        return;
      }

      setStatus("sent");
      setMessage("Link enviado. Abra seu e-mail neste dispositivo para entrar no app.");
    } catch {
      setStatus("error");
      setMessage("Supabase não está configurado para login neste ambiente.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <label className="block text-sm font-medium text-midnight-ink">
        E-mail
        <input
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="voce@empresa.com"
          className="mt-2 w-full border border-midnight-ink bg-canvas px-4 py-3 text-base text-graphite outline-none transition-shadow focus:shadow-[0_0_0_3px_#ebf212]"
        />
      </label>
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-[length:var(--radius-buttons)] bg-apollo-gold px-5 py-3 text-base font-medium text-midnight-ink disabled:opacity-60"
      >
        {status === "loading" ? "Enviando link…" : "Receber link de acesso"}
      </button>
      {message ? (
        <p
          className={status === "error" ? "text-sm text-red-700" : "text-sm text-charcoal-text"}
          role="status"
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
