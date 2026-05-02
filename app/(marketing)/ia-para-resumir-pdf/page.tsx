import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "IA para resumir PDF",
  description:
    "Use IA para resumir PDFs em PT-BR com limites claros e paywall para PDFs extensos.",
  path: "/ia-para-resumir-pdf",
});

export default function IaParaResumirPdfPage() {
  return (
    <article className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <h1 className="font-display text-3xl font-semibold tracking-tight text-midnight-ink md:text-4xl">
        IA para resumir PDF
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-charcoal-text">
        Em breve: upload, validação de tamanho/páginas e resumo. Sem chat
        anônimo — conversar com o documento será Premium.
      </p>
    </article>
  );
}
