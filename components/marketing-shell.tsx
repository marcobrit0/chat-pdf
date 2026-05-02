import type { ReactNode } from "react";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

type MarketingShellProps = {
  children: ReactNode;
};

/**
 * Shared chrome: sticky header, centered max-width column, footer region.
 */
export function MarketingShell({ children }: MarketingShellProps) {
  return (
    <>
      <SiteHeader />
      <main className="flex flex-1 flex-col">{children}</main>
      <SiteFooter />
    </>
  );
}
