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
        Defina as variáveis públicas do Supabase pra usar essa rota.
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
    <div className="container-page max-w-[760px] space-y-8 py-section-md">
      <nav className="text-body-sm text-charcoal-text">
        <Link href="/app" className="underline">
          ← Biblioteca
        </Link>
      </nav>

      <header>
        <h1 className="font-display text-heading-lg font-semibold text-midnight-ink text-[clamp(28px,4vw,40px)]">Comparar dois PDFs</h1>
        <p className="mt-3 text-body text-charcoal-text">
          Estamos finalizando a comparação lado a lado — pra você jogar v1 e v2 do mesmo contrato (ou edital corrigido) e ver o que mudou. Nenhum arquivo é processado nesta página enquanto a feature não solta.
        </p>
      </header>

      {!gate.ok ? (
        <PaywallCta variant="default" reason={`${gate.reason} Quando soltar, vai estar incluso no Premium.`} />
      ) : (
        <div className="rounded-lg border border-subtle-gray bg-crisp-white p-card">
          <p className="eyebrow text-faded-stone">Status</p>
          <p className="mt-2 text-body text-charcoal-text">
            Premium ativo — vamos te avisar no app quando a comparação estiver pronta. Por enquanto, dá pra usar o chat de cada PDF pra conferir trechos manualmente.
          </p>
          <Link href="/app" className="mt-4 inline-block text-body-sm font-medium text-midnight-ink underline">
            ← Voltar pra biblioteca
          </Link>
        </div>
      )}
    </div>
  );
}
