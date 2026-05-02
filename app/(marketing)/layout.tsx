import { MarketingShell } from "@/components/marketing-shell";

/**
 * Public marketing routes: header + footer (Apollo chrome from DESIGN.md).
 */
export default function MarketingGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MarketingShell>{children}</MarketingShell>;
}
