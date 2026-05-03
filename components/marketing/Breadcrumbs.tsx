import Link from "next/link";
import { JsonLd, breadcrumbSchema } from "@/components/seo/JsonLd";

type Crumb = { label: string; path: string };

/**
 * Visible breadcrumb trail + matching JSON-LD.
 * Always include the homepage as the first crumb when calling this.
 */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <>
      <nav aria-label="Trilha" className="text-xs text-faded-stone">
        <ol className="flex flex-wrap items-center gap-1">
          {items.map((item, idx) => {
            const isLast = idx === items.length - 1;
            return (
              <li key={item.path} className="flex items-center gap-1">
                {isLast ? (
                  <span className="text-charcoal-text" aria-current="page">
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.path}
                    className="underline-offset-4 hover:underline"
                  >
                    {item.label}
                  </Link>
                )}
                {!isLast ? <span aria-hidden="true">/</span> : null}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbSchema(items)} />
    </>
  );
}
