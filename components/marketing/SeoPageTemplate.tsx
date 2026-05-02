import type { ReactNode } from "react";
import { PaywallCta } from "@/components/marketing/PaywallCta";
import { UploadShell } from "@/components/marketing/UploadShell";

export function SeoPageTemplate({
  title,
  intro,
  children,
  showUpload,
  titleAs = "h1",
}: {
  title: string;
  intro: string;
  children?: ReactNode;
  showUpload?: boolean;
  titleAs?: "h1" | "h2";
}) {
  const TitleTag = titleAs === "h2" ? "h2" : "h1";
  return (
    <article className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <header className="border-b border-subtle-gray pb-10">
        <TitleTag className="font-display text-4xl font-semibold text-midnight-ink">{title}</TitleTag>
        <p className="mt-6 max-w-2xl text-lg text-charcoal-text">{intro}</p>
      </header>
      {showUpload ? (
        <section className="mt-10 space-y-10">
          <UploadShell />
          <PaywallCta reason="PDFs grandes ou chat exigem Premium." />
        </section>
      ) : null}
      {children ? <div className="mt-10 space-y-6 text-graphite">{children}</div> : null}
    </article>
  );
}
