import type { ReactNode } from "react";
import Link from "next/link";

import { AnonymousSummaryFlow } from "@/components/marketing/AnonymousSummaryFlow";
import { Breadcrumbs } from "@/components/marketing/Breadcrumbs";
import { JsonLd, faqSchema } from "@/components/seo/JsonLd";

type RelatedLink = { href: string; label: string };
type Faq = { q: string; a: string };
type Crumb = { label: string; path: string };

type Props = {
  title: string;
  intro: string;
  children?: ReactNode;
  showUpload?: boolean;
  titleAs?: "h1" | "h2";
  /** Páginas como “analisar contrato” passam true para orientar o modelo. */
  contractIntent?: boolean;
  /** Visible breadcrumb trail + matching JSON-LD. */
  breadcrumbs?: Crumb[];
  /** Optional FAQ block: rendered visibly + emitted as JSON-LD. */
  faqs?: Faq[];
  /** "Veja também" links rendered at the bottom. */
  related?: RelatedLink[];
};

/**
 * Standard layout for SEO landing pages. Now natively supports breadcrumbs,
 * FAQ blocks (with FAQPage JSON-LD), and a related-links footer so every
 * use-case landing gets full SEO treatment without per-page boilerplate.
 */
export function SeoPageTemplate({
  title,
  intro,
  children,
  showUpload,
  titleAs = "h1",
  contractIntent = false,
  breadcrumbs,
  faqs,
  related,
}: Props) {
  const TitleTag = titleAs === "h2" ? "h2" : "h1";
  return (
    <>
      {faqs && faqs.length > 0 ? <JsonLd data={faqSchema(faqs)} /> : null}
      <article className="container-page py-section-md">
        {breadcrumbs && breadcrumbs.length > 1 ? (
          <Breadcrumbs items={breadcrumbs} />
        ) : null}

        <header
          className={
            "max-w-3xl border-b border-subtle-gray pb-8 " +
            (breadcrumbs ? "mt-6" : "")
          }
        >
          <TitleTag className="font-display text-display font-semibold text-midnight-ink text-[clamp(36px,5vw,56px)]">
            {title}
          </TitleTag>
          <p className="mt-5 text-body-lg text-charcoal-text">
            {intro}
          </p>
        </header>

        {showUpload ? (
          <section className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">
            <div>
              <AnonymousSummaryFlow contractIntent={contractIntent} />
            </div>
            {children ? (
              <div className="space-y-6 text-body text-graphite">
                {children}
              </div>
            ) : null}
          </section>
        ) : children ? (
          <div className="mt-10 space-y-10 text-body text-graphite">
            {children}
          </div>
        ) : null}

        {faqs && faqs.length > 0 ? (
          <section className="mt-16 grid gap-10 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            <h2 className="font-display text-heading-lg font-semibold text-midnight-ink text-[clamp(28px,4vw,40px)]">
              Perguntas frequentes
            </h2>
            <dl className="divide-y divide-subtle-gray border-y border-subtle-gray">
              {faqs.map((f) => (
                <details
                  key={f.q}
                  className="group py-5 [&_summary::-webkit-details-marker]:hidden"
                >
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6">
                    <dt className="font-display text-body-lg font-semibold text-midnight-ink">
                      {f.q}
                    </dt>
                    <span
                      aria-hidden="true"
                      className="mt-1 font-condensed text-faded-stone transition-transform group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <dd className="mt-3 max-w-2xl text-body text-charcoal-text">
                    {f.a}
                  </dd>
                </details>
              ))}
            </dl>
          </section>
        ) : null}

        {related && related.length > 0 ? (
          <section className="mt-12 border-t border-subtle-gray pt-8">
            <p className="eyebrow text-faded-stone">Veja também</p>
            <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-body-sm">
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
