import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SeoPageTemplate } from "@/components/marketing/SeoPageTemplate";
import { buildPageMetadata } from "@/lib/seo";
import {
  programmaticBySlug,
  programmaticEntries,
  type ProgrammaticEntry,
} from "@/lib/seo/programmatic-seo-data";

type RouteParams = { slug: string };

export function generateStaticParams(): RouteParams[] {
  return programmaticEntries.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata(props: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const entry = programmaticBySlug.get(slug);
  if (!entry) {
    // Unknown slugs flow to notFound() in the page; no metadata to emit.
    return {};
  }
  return buildPageMetadata({
    title: entry.metaTitle,
    description: entry.metaDescription,
    path: `/${entry.slug}`,
  });
}

/**
 * Dynamic catch-all under (marketing) for programmatically generated
 * persona × document-type landings. Static routes in the same group take
 * precedence in Next.js, so existing routes (precos, chat-pdf, etc.) are
 * unaffected. Unknown slugs render the 404 page.
 *
 * Each entry in `programmaticEntries` carries persona-specific intro,
 * extraction fields, and FAQ — see `lib/seo/programmatic-seo-data.ts`.
 */
export default async function ProgrammaticPage(props: {
  params: Promise<RouteParams>;
}) {
  const { slug } = await props.params;
  const entry = programmaticBySlug.get(slug);
  if (!entry) {
    notFound();
  }
  return renderEntry(entry);
}

function renderEntry(entry: ProgrammaticEntry) {
  const breadcrumbs = [
    { label: "Início", path: "/" },
    { label: entry.canonicalUseCase.label, path: entry.canonicalUseCase.href },
    { label: entry.title, path: `/${entry.slug}` },
  ];

  return (
    <SeoPageTemplate
      title={entry.title}
      intro={entry.intro}
      showUpload
      contractIntent={entry.contractIntent}
      breadcrumbs={breadcrumbs}
      faqs={entry.faqs}
      related={[entry.canonicalUseCase, ...entry.siblings]}
    >
      <section className="space-y-4">
        <h2 className="font-display text-heading font-semibold text-midnight-ink">
          O que a análise cobre pra {entry.personaLabel}
        </h2>
        <p>
          A IA orienta a leitura pro que costuma importar quando você, como{" "}
          {entry.personaLabel}, lê um {entry.docTypeLabel}. Use como triagem
          antes da decisão final — não substitui parecer profissional.
        </p>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {entry.fields.map((f) => (
            <li
              key={f.label}
              className="rounded-lg border border-subtle-gray bg-crisp-white p-4"
            >
              <p className="font-display text-body font-semibold text-midnight-ink">
                {f.label}
              </p>
              <p className="mt-1 text-body-sm text-charcoal-text">{f.note}</p>
            </li>
          ))}
        </ul>
      </section>
    </SeoPageTemplate>
  );
}
