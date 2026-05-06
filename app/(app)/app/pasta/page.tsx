import Link from "next/link";
import { PaywallCta } from "@/components/marketing/PaywallCta";
import { requirePremiumAccess } from "@/lib/entitlements";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

/**
 * Roadmap Premium: pastas / projeto com vários PDFs — placeholder sem armazenamento extra até implementação.
 */
export default async function PastaPdfPlaceholderPage() {
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
        <h1 className="font-display text-heading-lg font-semibold text-midnight-ink text-[clamp(28px,4vw,40px)]">Pasta de PDFs</h1>
        <p className="mt-3 text-body text-charcoal-text">
          Logo logo você vai poder agrupar vários PDFs num projeto só (todos os contratos do RH, todos os editais do trimestre) e perguntar como se fossem um documento único. Por enquanto, cada arquivo fica na sua biblioteca individual.
        </p>
      </header>

      {!gate.ok ? (
        <PaywallCta
          variant="default"
          reason="As pastas vão entrar como prioridade no Premium quando soltarmos. Hoje, salva os PDFs na biblioteca e usa o chat por documento."
        />
      ) : (
        <div className="rounded-lg border border-subtle-gray bg-crisp-white p-card">
          <p className="eyebrow text-faded-stone">Em construção</p>
          <p className="mt-2 text-body text-charcoal-text">
            Premium ativo — vamos te avisar no app assim que as pastas estiverem prontas. Nada é guardado aqui enquanto a feature não solta.
          </p>
          <Link href="/app" className="mt-4 inline-block text-body-sm font-medium text-midnight-ink underline">
            Ir pra biblioteca
          </Link>
        </div>
      )}
    </div>
  );
}
