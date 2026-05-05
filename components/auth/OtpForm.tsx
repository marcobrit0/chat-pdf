"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

type OtpFormProps = {
  nextPath: string;
};

type Step =
  | { name: "email" }
  | { name: "sending" }
  | { name: "code"; email: string }
  | { name: "verifying"; email: string }
  | { name: "error"; email: string; message: string; canRetry: boolean };

export function OtpForm({ nextPath }: OtpFormProps) {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [step, setStep] = useState<Step>({ name: "email" });

  async function sendCode(emailToSend: string) {
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({ email: emailToSend });
    if (error) {
      setStep({
        name: "error",
        email: emailToSend,
        message: "Não foi possível enviar o código. Confira o e-mail e tente novamente.",
        canRetry: true,
      });
      return;
    }
    setStep({ name: "code", email: emailToSend });
  }

  async function onSubmitEmail(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStep({ name: "sending" });
    await sendCode(email);
  }

  async function onSubmitCode(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const currentEmail = "email" in step ? step.email : email;
    setStep({ name: "verifying", email: currentEmail });

    const supabase = createClient();
    const { error } = await supabase.auth.verifyOtp({
      email: currentEmail,
      token,
      type: "email",
    });

    if (error) {
      setStep({
        name: "error",
        email: currentEmail,
        message: "Código inválido ou expirado. Solicite um novo código.",
        canRetry: false,
      });
      return;
    }

    window.location.href = nextPath;
  }

  if (step.name === "email" || step.name === "sending") {
    return (
      <form onSubmit={onSubmitEmail} className="space-y-4">
        <label className="block text-body-sm font-medium text-midnight-ink">
          E-mail
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="voce@empresa.com"
            className="mt-2 w-full border border-midnight-ink bg-canvas px-4 py-3 text-body text-graphite outline-none transition-shadow focus:shadow-[0_0_0_3px_var(--color-apollo-gold)]"
          />
        </label>
        <button
          type="submit"
          disabled={step.name === "sending"}
          className="w-full rounded-lg bg-apollo-gold px-5 py-3 text-body font-medium text-midnight-ink disabled:opacity-60"
        >
          {step.name === "sending" ? "Enviando código…" : "Receber código de acesso"}
        </button>
      </form>
    );
  }

  if (step.name === "code" || step.name === "verifying") {
    return (
      <form onSubmit={onSubmitCode} className="space-y-4">
        <p className="text-body-sm text-charcoal-text">
          Código enviado para <span className="font-medium text-midnight-ink">{step.email}</span>.
        </p>
        <label className="block text-body-sm font-medium text-midnight-ink">
          Código de 8 dígitos
          <input
            type="text"
            inputMode="numeric"
            maxLength={8}
            required
            autoFocus
            value={token}
            onChange={(e) => setToken(e.target.value.replace(/\D/g, ""))}
            placeholder="00000000"
            className="mt-2 w-full border border-midnight-ink bg-canvas px-4 py-3 text-center text-subheading tracking-[0.4em] text-graphite outline-none transition-shadow focus:shadow-[0_0_0_3px_var(--color-apollo-gold)]"
          />
        </label>
        <button
          type="submit"
          disabled={step.name === "verifying" || token.length < 8}
          className="w-full rounded-lg bg-apollo-gold px-5 py-3 text-body font-medium text-midnight-ink disabled:opacity-60"
        >
          {step.name === "verifying" ? "Verificando…" : "Entrar"}
        </button>
        <button
          type="button"
          onClick={() => {
            setToken("");
            setStep({ name: "sending" });
            sendCode(step.email);
          }}
          className="w-full text-body-sm text-charcoal-text underline underline-offset-2"
        >
          Reenviar código
        </button>
      </form>
    );
  }

  // error step
  return (
    <div className="space-y-4">
      <p className="text-body-sm text-red-700" role="alert">
        {step.message}
      </p>
      <button
        type="button"
        onClick={() => {
          setToken("");
          if (step.canRetry) {
            setStep({ name: "email" });
          } else {
            setStep({ name: "sending" });
            sendCode(step.email);
          }
        }}
        className="w-full rounded-lg bg-apollo-gold px-5 py-3 text-body font-medium text-midnight-ink"
      >
        {step.canRetry ? "Tentar novamente" : "Solicitar novo código"}
      </button>
    </div>
  );
}
