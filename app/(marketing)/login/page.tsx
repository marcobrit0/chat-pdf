import type { Metadata } from "next";

import { MagicLinkForm } from "@/components/auth/MagicLinkForm";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Entrar",
  description:
    "Entre no ChatPDF Brasil com um link seguro enviado por e-mail.",
  path: "/login",
});

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const params = await searchParams;
  const nextPath = safeNextPath(params.next);

  return (
    <div className="mx-auto grid w-full max-w-6xl flex-1 gap-10 px-4 py-12 sm:px-6 md:grid-cols-[minmax(0,1fr)_minmax(320px,0.85fr)] md:items-center md:py-20">
      <section className="space-y-5">
        <p className="font-condensed text-xs uppercase tracking-[0.22em] text-faded-stone">
          Acesso ao app
        </p>
        <h1 className="font-display text-[clamp(2.5rem,6vw,4.25rem)] font-semibold leading-[1.05] tracking-tight text-midnight-ink">
          Entre e continue lendo seus PDFs.
        </h1>
        <p className="max-w-xl text-base leading-relaxed text-charcoal-text sm:text-lg">
          Use um link mágico por e-mail. Depois do acesso, o workspace abre sua
          biblioteca, uploads Premium e chat com citações.
        </p>
      </section>

      <section className="rounded-[length:var(--radius-cards)] border border-midnight-ink bg-crisp-white p-6 sm:p-8">
        <h2 className="font-display text-2xl font-semibold text-midnight-ink">
          Receber link seguro
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-charcoal-text">
          Sem senha para lembrar. O link expira e cria a sessão no navegador.
        </p>
        <div className="mt-6">
          <MagicLinkForm nextPath={nextPath} />
        </div>
      </section>
    </div>
  );
}

/**
 * Keeps post-login redirects inside this app so crafted URLs cannot bounce users elsewhere.
 */
function safeNextPath(value: string | undefined): string {
  return value?.startsWith("/") && !value.startsWith("//") ? value : "/app";
}
