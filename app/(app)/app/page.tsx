import Link from "next/link";
import { DocumentLibrary } from "@/components/app/DocumentLibrary";
import { PremiumRoadmapCards } from "@/components/app/PremiumRoadmapCards";
import { PremiumUpsell } from "@/components/app/PremiumUpsell";
import { PremiumWelcomeBanner } from "@/components/app/PremiumWelcomeBanner";
import { requirePremiumAccess } from "@/lib/entitlements";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function AppHomePage({
  searchParams,
}: {
  searchParams: Promise<{ checkout?: string }>;
}) {
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
  const params = await searchParams;
  const justUpgraded = params.checkout === "success";

  if (!gate.ok) {
    return <PremiumUpsell email={user.email ?? null} />;
  }

  const { data: documents } = await supabase
    .from("documents")
    .select("id, title, page_count, created_at")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-10">
      {justUpgraded ? <PremiumWelcomeBanner /> : null}

      <header className="space-y-3">
        <p className="font-condensed text-xs uppercase tracking-[0.22em] text-faded-stone">
          Workspace Premium
        </p>
        <h1 className="font-display text-[clamp(2rem,4vw,2.75rem)] font-semibold leading-[1.05] tracking-tight text-midnight-ink">
          {documents && documents.length > 0
            ? "Sua biblioteca"
            : "Bem-vindo ao seu workspace."}
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-charcoal-text">
          Envie PDFs até 100 páginas, gere análises estruturadas e converse com
          o documento — todas as respostas vêm com citação de página.
        </p>
      </header>

      <DocumentLibrary initialDocuments={documents ?? []} />

      <PremiumRoadmapCards isPremium />

      <div className="border-t border-subtle-gray pt-6">
        <Link
          href="/precos"
          className="text-sm text-faded-stone underline-offset-4 hover:text-charcoal-text hover:underline"
        >
          Gerenciar assinatura
        </Link>
      </div>
    </div>
  );
}
