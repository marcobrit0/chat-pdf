import Link from "next/link";
import { DocumentLibrary } from "@/components/app/DocumentLibrary";
import { requirePremiumAccess } from "@/lib/entitlements";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function AppHomePage() {
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return (
      <div>
        <p className="text-charcoal-text">
          Defina{" "}
          <code className="font-mono text-sm">NEXT_PUBLIC_SUPABASE_URL</code> e{" "}
          <code className="font-mono text-sm">
            NEXT_PUBLIC_SUPABASE_ANON_KEY
          </code>{" "}
          para carregar a sessão.
        </p>
      </div>
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

  if (!gate.ok) {
    return (
      <div className="space-y-4">
        <h1 className="font-display text-3xl font-semibold text-midnight-ink">
          Workspace Premium
        </h1>
        <p className="text-charcoal-text">{gate.reason}</p>
        <p className="text-sm text-faded-stone">
          Para testar upload e chat no desenvolvimento, defina{" "}
          <code className="font-mono text-xs">CHATPDF_PREMIUM_STUB=true</code>{" "}
          no servidor (veja docs/BLOCKERS.md).
        </p>
        <Link
          href="/precos"
          className="inline-block rounded-[length:var(--radius-buttons)] bg-apollo-gold px-5 py-3 text-sm font-medium text-midnight-ink"
        >
          Ver planos Premium
        </Link>
      </div>
    );
  }

  const { data: documents } = await supabase
    .from("documents")
    .select("id, title, page_count, created_at")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl font-semibold text-midnight-ink">
        Workspace Premium
      </h1>
      <p className="text-charcoal-text">
        Envie PDFs para extrair texto com intervalos de página e converse com
        citações.
      </p>
      <DocumentLibrary initialDocuments={documents ?? []} />
      <Link href="/precos" className="text-sm text-charcoal-text underline">
        Gerenciar assinatura
      </Link>
    </div>
  );
}
