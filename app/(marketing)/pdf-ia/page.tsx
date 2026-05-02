import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "PDF e IA — ChatPDF Brasil",
  description:
    "PDF + IA para leitura rápida: resumo gratuito para arquivos pequenos e fluxo pago para análise profunda.",
  path: "/pdf-ia",
});

export default function PdfIaPage() {
  return (
    <article className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <h1 className="font-display text-3xl font-semibold tracking-tight text-midnight-ink md:text-4xl">
        PDF e IA
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-charcoal-text">
        Combine PDF com IA de forma responsável: primeiro um resumo barato e
        limitado; depois, se fizer sentido, avance para o plano com chat e
        trilha de fontes (Próximas fases).
      </p>
    </article>
  );
}
