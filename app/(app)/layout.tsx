import type { Metadata } from "next";

import { IdentifyUser } from "@/components/analytics/IdentifyUser";
import { AppShellHeader } from "@/components/app/AppShellHeader";
import { requirePremiumAccess } from "@/lib/entitlements";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

/**
 * The authenticated product surface has no SEO value and sits behind login.
 * Keep it out of the index so Google spends crawl budget on marketing pages.
 */
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

/**
 * Route group for `/app` — minimal authenticated chrome (logo, library,
 * plan status, upgrade CTA). Session is enforced in middleware; this layout
 * only reads the user to render the header.
 */
export default async function AppGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let isPremium = false;
  let email: string | null = null;
  let userId: string | null = null;

  if (
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      userId = user.id;
      email = user.email ?? null;
      const gate = await requirePremiumAccess(supabase, user.id);
      isPremium = gate.ok;
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-canvas">
      {userId ? (
        <IdentifyUser userId={userId} email={email} isPremium={isPremium} />
      ) : null}
      <AppShellHeader isPremium={isPremium} email={email} />
      <main className="flex-1">{children}</main>
    </div>
  );
}
