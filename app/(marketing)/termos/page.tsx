import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Termos de uso",
  description:
    "Termos de uso do ChatPDF Brasil — placeholder até revisão jurídica.",
  path: "/termos",
});

export default function TermosPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-14 md:px-6">
      <h1 className="font-display text-3xl font-semibold text-midnight-ink">
        Termos de uso
      </h1>
      <p className="mt-6 text-charcoal-text">
        Texto placeholder em PT-BR. Substitua por termos revisados antes do
        lançamento público amplo.
      </p>
    </article>
  );
}
