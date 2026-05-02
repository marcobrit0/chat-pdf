import Link from "next/link";
import { PaywallCta } from "@/components/marketing/PaywallCta";
import { requirePremiumAccess } from "@/lib/entitlements";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

/**
 * Roadmap Premium: comparação lado a lado de PDFs — UI honesta até o motor existir.
 */
export default async function ComparePdfPlaceholderPage() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return (
      <p className="text-charcoal-text">
        Defina variáveis Supabase públicas para usar esta rota.
      </p>
    );
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const gate = await requirePremiumAccess(supabase, user.id);

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <nav className="text-sm text-charcoal-text">
        <Link href="/app" className="underline">
          ← Biblioteca
        </Link>
      </nav>

      <header>
        <h1 className="font-display text-3xl font-semibold text-midnight-ink">Comparar PDFs</h1>
        <p className="mt-3 text-charcoal-text">
          Estamos construindo a comparação lado a lado (texto e diferenças) para assinantes Premium. Nenhum arquivo é processado nesta página até o lançamento.
        </p>
      </header>

      {!gate.ok ? (
        <PaywallCta variant="default" reason={`${gate.reason} Quando liberarmos, estará incluído no Premium.`} />
      ) : (
        <div className="rounded-[length:var(--radius-cards)] border border-subtle-gray bg-crisp-white p-6">
          <p className="font-condensed text-sm font-semibold uppercase text-faded-stone">Status</p>
          <p className="mt-2 text-charcoal-text">
            Você tem Premium — avisaremos no produto quando a comparação estiver disponível. Até lá, use o chat por documento para checar trechos.
          </p>
          <Link href="/app" className="mt-4 inline-block text-sm font-medium text-midnight-ink underline">
            Voltar à biblioteca
          </Link>
        </div>
      )}
    </div>
  );
}
