import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "IA PDF — leitura inteligente",
  description:
    "IA para PDFs: resumo para documentos curtos; Premium para conversas e PDFs longos.",
  path: "/ia-pdf",
});

export default function IaPdfPage() {
  return (
    <article className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <h1 className="font-display text-3xl font-semibold tracking-tight text-midnight-ink md:text-4xl">
        IA PDF
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-charcoal-text">
        Atalhe a leitura de PDFs com uma camada de IA em português. Limites
        anônimos evitam abuso e mantêm o produto sustentável — fluxo completo na
        Fase 1.
      </p>
    </article>
  );
}
