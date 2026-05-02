import type { Metadata } from "next";

import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Entrar",
  description:
    "Acesso à conta ChatPDF Brasil — autenticação virá com Supabase na Fase 1.",
  path: "/login",
});

export default function LoginPage() {
  return (
    <div className="mx-auto w-full max-w-6xl flex-1 px-4 py-14 sm:px-6">
      <h1 className="font-display text-3xl font-semibold tracking-tight text-midnight-ink md:text-4xl">
        Entrar
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-charcoal-text">
        O fluxo de login com Supabase será adicionado nas próximas fases.
      </p>
    </div>
  );
}
