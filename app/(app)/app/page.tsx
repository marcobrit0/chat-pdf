import { redirect } from "next/navigation";
import { PremiumUpsell } from "@/components/app/PremiumUpsell";
import { WorkspaceShell } from "@/components/app/WorkspaceShell";
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
      <div className="container-page max-w-[760px] py-section-md">
        <p className="text-body text-charcoal-text">
          Pra carregar sua sessão, defina{" "}
          <code className="font-mono text-body-sm">NEXT_PUBLIC_SUPABASE_URL</code> e{" "}
          <code className="font-mono text-body-sm">
            NEXT_PUBLIC_SUPABASE_ANON_KEY
          </code>
          .
        </p>
      </div>
    );
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const gate = await requirePremiumAccess(supabase, user.id);
  const params = await searchParams;
  const justUpgraded = params.checkout === "success";

  if (!gate.ok) {
    return (
      <div className="container-page py-section-md">
        <PremiumUpsell email={user.email ?? null} />
      </div>
    );
  }

  const { data: documents } = await supabase
    .from("documents")
    .select("id, title, page_count, created_at")
    .order("created_at", { ascending: false });

  return (
    <WorkspaceShell
      email={user.email ?? null}
      documents={documents ?? []}
      justUpgraded={justUpgraded}
    />
  );
}
