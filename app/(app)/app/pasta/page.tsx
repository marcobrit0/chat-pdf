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
        <h1 className="font-display text-3xl font-semibold text-midnight-ink">Pasta de PDFs</h1>
        <p className="mt-3 text-charcoal-text">
          Organizar vários PDFs num projeto (pastas compartilhadas, busca cruzada) está no roteiro. Hoje cada arquivo continua na sua biblioteca individual.
        </p>
      </header>

      {!gate.ok ? (
        <PaywallCta
          variant="default"
          reason="Pastas e projetos multi-PDF serão prioridade para assinantes Premium. Por enquanto, salve documentos na biblioteca do workspace."
        />
      ) : (
        <div className="rounded-[length:var(--radius-cards)] border border-subtle-gray bg-crisp-white p-6">
          <p className="font-condensed text-sm font-semibold uppercase text-faded-stone">Em construção</p>
          <p className="mt-2 text-charcoal-text">
            Premium ativo — quando as pastas estiverem prontas, você verá o fluxo aqui. Nenhum dado adicional é criado nesta rota ainda.
          </p>
          <Link href="/app" className="mt-4 inline-block text-sm font-medium text-midnight-ink underline">
            Ir para a biblioteca
          </Link>
        </div>
      )}
    </div>
  );
}
