import type { Metadata } from "next";
import Link from "next/link";

import { OtpForm } from "@/components/auth/OtpForm";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Entrar",
  description:
    "Entre no PDFIA com um código seguro enviado por e-mail.",
  path: "/login",
});

const benefits = [
  ["01", "Chat com citação", "Cada resposta cita a página exata."],
  ["02", "PDFs até 100 págs", "Contratos longos, editais, apólices."],
  ["03", "Modos por tipo", "Contrato, edital, apólice, laudo."],
  ["04", "Histórico salvo", "Sua biblioteca persiste na conta."],
] as const;

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const params = await searchParams;
  const nextPath = safeNextPath(params.next);

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col bg-canvas">
      <div className="grid flex-1 md:grid-cols-2">
        {/* Left — sign-in card */}
        <section className="flex items-center justify-center px-4 py-12 sm:px-8 md:py-16">
          <div className="w-full max-w-md">
            <div className="rounded-lg border border-subtle-gray bg-crisp-white p-7 sm:p-8">
              <div className="flex items-center justify-between">
                <p className="eyebrow text-faded-stone">
                  Entrar · sem senha
                </p>
                <span className="rounded-md border border-subtle-gray bg-canvas px-2 py-0.5 font-mono text-caption tracking-[0.06em] text-charcoal-text">
                  1 / 2
                </span>
              </div>
              <h1 className="mt-4 font-display text-heading font-semibold text-midnight-ink">
                Receber código de acesso
              </h1>
              <p className="mt-2 text-body-sm  text-charcoal-text">
                Use um código enviado por e-mail. Sem senha; expira em 10 minutos.
              </p>

              <div className="mt-6">
                <OtpForm nextPath={nextPath} />
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between gap-4 rounded-lg border border-subtle-gray bg-canvas p-4">
              <div>
                <p className="eyebrow text-faded-stone">
                  Sem conta?
                </p>
                <p className="mt-1 text-body-sm text-charcoal-text">
                  Resuma um PDF grátis sem cadastro.
                </p>
              </div>
              <Link
                href="/resumir-pdf"
                className="rounded-lg border border-midnight-ink px-3 py-2 text-caption font-medium text-midnight-ink hover:bg-midnight-ink hover:text-crisp-white"
              >
                Tentar grátis
              </Link>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2 text-center mono-label text-faded-stone">
              <span>· LGPD ·</span>
              <span>· Sem senha ·</span>
              <span>· BRL ·</span>
            </div>
          </div>
        </section>

        {/* Right — Premium upsell rail */}
        <aside className="border-t border-subtle-gray bg-ash-gray px-4 py-12 sm:px-8 md:border-l md:border-t-0 md:py-16">
          <div className="mx-auto w-full max-w-lg">
            <p className="eyebrow text-faded-stone">
              Premium · o que você desbloqueia
            </p>
            <h2 className="mt-3 font-display text-heading-lg font-semibold text-midnight-ink text-[clamp(28px,4vw,40px)]">
              R$29/mês. BRL. Cancele quando quiser.
            </h2>

            <div className="mt-6 grid gap-3">
              {benefits.map(([n, t, b]) => (
                <div
                  key={n}
                  className="grid grid-cols-[40px_1fr] items-start gap-4 rounded-lg border border-subtle-gray bg-crisp-white p-5"
                >
                  <span className="mono-label text-faded-stone">
                    {n}
                  </span>
                  <div>
                    <p className="text-body-sm font-medium text-midnight-ink">
                      {t}
                    </p>
                    <p className="mt-1 text-body-sm  text-charcoal-text">
                      {b}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between rounded-lg bg-midnight-ink p-5 text-crisp-white">
              <div>
                <p className="mono-label text-apollo-gold">
                  Reembolso · 7 dias
                </p>
                <p className="mt-1 text-body-sm">Stripe · pagamento em real</p>
              </div>
              <span className="rounded-md bg-apollo-gold px-2.5 py-1.5 mono-label font-medium text-midnight-ink">
                R$29 / mês
              </span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

/**
 * Keeps post-login redirects inside this app so crafted URLs cannot bounce users elsewhere.
 */
function safeNextPath(value: string | undefined): string {
  return value?.startsWith("/") && !value.startsWith("//") ? value : "/app";
}
