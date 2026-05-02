import type { ReactNode } from "react";
import { AnonymousSummaryFlow } from "@/components/marketing/AnonymousSummaryFlow";

export function SeoPageTemplate({
  title,
  intro,
  children,
  showUpload,
  titleAs = "h1",
  /** Páginas como “analisar contrato” passam true para orientar o modelo. */
  contractIntent = false,
}: {
  title: string;
  intro: string;
  children?: ReactNode;
  showUpload?: boolean;
  titleAs?: "h1" | "h2";
  contractIntent?: boolean;
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
          <AnonymousSummaryFlow contractIntent={contractIntent} />
        </section>
      ) : null}
      {children ? <div className="mt-10 space-y-6 text-graphite">{children}</div> : null}
    </article>
  );
}
