import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Política de privacidade",
  description:
    "Política de privacidade do ChatPDF Brasil — placeholder até revisão jurídica.",
  path: "/privacidade",
});

export default function PrivacidadePage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-14 md:px-6">
      <h1 className="font-display text-3xl font-semibold text-midnight-ink">
        Política de privacidade
      </h1>
      <p className="mt-6 text-charcoal-text">
        Texto placeholder em PT-BR. Inclua bases legais LGPD, retenção e
        encarregado quando formalizar o produto.
      </p>
    </article>
  );
}
