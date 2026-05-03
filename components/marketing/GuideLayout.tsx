import type { ReactNode } from "react";
import Link from "next/link";

import { Breadcrumbs } from "@/components/marketing/Breadcrumbs";
import { JsonLd, breadcrumbSchema } from "@/components/seo/JsonLd";

type Crumb = { label: string; path: string };
type TocEntry = { id: string; label: string };
type RelatedLink = { href: string; label: string };
type CtaLink = { href: string; label: string };

type GuideLayoutProps = {
  /** Visible breadcrumb trail; also drives BreadcrumbList JSON-LD. */
  breadcrumbs: Crumb[];
  /** Eyebrow above the H1 — usually "Guia · ~N min de leitura". */
  eyebrow: string;
  /** Page H1. */
  title: string;
  /** Lede under the H1, ≤ 220 chars. */
  intro: string;
  /** TL;DR card — short headline + supporting paragraph. */
  tldrTitle: string;
  tldrBody: string;
  /** Table-of-contents anchors. */
  toc: TocEntry[];
  /** Body sections. Each section uses its own `id` matching a `toc` entry. */
  children: ReactNode;
  /** "Próximo passo" CTAs — primary (yellow) + secondary (outline). */
  primaryCta: CtaLink;
  secondaryCta?: CtaLink;
  /** "Veja também" deep links rendered at the very bottom. */
  related: RelatedLink[];
  /** Optional extra JSON-LD (HowTo, Article, etc.). BreadcrumbList is auto. */
  extraSchema?: Record<string, unknown>;
};

/**
 * Shared chrome for /guias/* long-form guides.
 *
 * Why a shared component: the existing guide established a layout pattern
 * (eyebrow + display H1 + lede, TL;DR card, TOC nav, sections, CTA card,
 * related links). Repeating that chrome across 9 guides would scatter the
 * design — and any future tweak (typography, spacing, schema) becomes a
 * 9-file refactor. With this component, each guide's file is the content.
 */
export function GuideLayout({
  breadcrumbs,
  eyebrow,
  title,
  intro,
  tldrTitle,
  tldrBody,
  toc,
  children,
  primaryCta,
  secondaryCta,
  related,
  extraSchema,
}: GuideLayoutProps) {
  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      {extraSchema ? <JsonLd data={extraSchema} /> : null}

      <article className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 md:py-14">
        <Breadcrumbs items={breadcrumbs} />

        <header className="mt-6 border-b border-subtle-gray pb-8">
          <p className="font-condensed text-xs uppercase tracking-[0.22em] text-faded-stone">
            {eyebrow}
          </p>
          <h1 className="mt-4 font-display text-[clamp(2rem,5vw,3.25rem)] font-semibold leading-[1.05] tracking-tight text-midnight-ink">
            {title}
          </h1>
          <p className="mt-5 text-base leading-relaxed text-charcoal-text sm:text-lg">
            {intro}
          </p>
        </header>

        <aside className="mt-10 rounded-[length:var(--radius-cards)] border border-midnight-ink bg-canvas p-6">
          <p className="font-condensed text-xs uppercase tracking-[0.22em] text-faded-stone">
            TL;DR
          </p>
          <p className="mt-2 font-display text-xl font-semibold leading-snug text-midnight-ink">
            {tldrTitle}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-charcoal-text">
            {tldrBody}
          </p>
        </aside>

        <nav
          aria-label="Sumário"
          className="mt-10 rounded-[length:var(--radius-cards)] bg-crisp-white p-5"
        >
          <p className="font-condensed text-xs uppercase tracking-[0.22em] text-faded-stone">
            Neste guia
          </p>
          <ol className="mt-3 space-y-2 text-sm text-charcoal-text">
            {toc.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="text-midnight-ink underline underline-offset-4"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="mt-4 space-y-14">{children}</div>

        <section className="mt-16 border-t border-subtle-gray pt-8">
          <p className="font-condensed text-xs uppercase tracking-[0.22em] text-faded-stone">
            Próximo passo
          </p>
          <div className="mt-3 flex flex-col gap-3 sm:flex-row">
            <Link
              href={primaryCta.href}
              className="inline-flex items-center justify-center rounded-[length:var(--radius-buttons)] bg-apollo-gold px-5 py-3 text-base font-medium text-midnight-ink"
            >
              {primaryCta.label}
            </Link>
            {secondaryCta ? (
              <Link
                href={secondaryCta.href}
                className="inline-flex items-center justify-center rounded-[length:var(--radius-buttons)] border border-midnight-ink px-5 py-3 text-base font-medium text-midnight-ink"
              >
                {secondaryCta.label}
              </Link>
            ) : null}
          </div>
        </section>

        {related.length > 0 ? (
          <section className="mt-12 border-t border-subtle-gray pt-8">
            <p className="font-condensed text-xs uppercase tracking-[0.22em] text-faded-stone">
              Veja também
            </p>
            <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm">
              {related.map((r) => (
                <li key={r.href}>
                  <Link
                    href={r.href}
                    className="text-midnight-ink underline underline-offset-4"
                  >
                    {r.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </article>
    </>
  );
}

/**
 * Small helper for the section blocks — keeps headings + spacing consistent
 * across guides. Use as a child of GuideLayout.
 */
export function GuideSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className="space-y-4 text-base leading-relaxed text-graphite"
    >
      <h2 className="font-display text-2xl font-semibold text-midnight-ink">
        {title}
      </h2>
      {children}
    </section>
  );
}

/**
 * Highlighted callout — for warnings, tips, or "atenção" boxes inside a guide.
 */
export function GuideCallout({
  tone = "info",
  title,
  children,
}: {
  tone?: "info" | "warn";
  title: string;
  children: ReactNode;
}) {
  const border =
    tone === "warn" ? "border-midnight-ink" : "border-subtle-gray";
  return (
    <div
      className={`mt-2 rounded-[length:var(--radius-cards)] border ${border} bg-crisp-white p-5`}
    >
      <p className="font-display text-base font-semibold text-midnight-ink">
        {title}
      </p>
      <div className="mt-2 text-sm leading-relaxed text-charcoal-text">
        {children}
      </div>
    </div>
  );
}
