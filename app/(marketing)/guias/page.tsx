import Link from "next/link";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Guias ChatPDF",
  description:
    "Artigos e tutoriais em português sobre PDF, IA e produtividade com documentos. Conteúdo em expansão.",
  path: "/guias",
});

const GUIDES = [
  {
    href: "/guias/como-resumir-pdf-com-ia",
    title: "Como resumir PDF com IA",
    blurb: "Passo a passo introdutório para testar o resumo anônimo e evoluir para o Premium.",
  },
] as const;

/**
 * Índice de guias (SEO + navegação). Novos guias entram no array e no sitemap.
 */
export default function GuiasIndexPage() {
  return (
    <article className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <header className="border-b border-subtle-gray pb-10">
        <h1 className="font-display text-4xl font-semibold text-midnight-ink">Guias</h1>
        <p className="mt-6 max-w-2xl text-lg text-charcoal-text">
          Tutoriais e boas práticas para trabalhar com PDFs e IA em português. Novos textos serão adicionados conforme o produto evolui.
        </p>
      </header>
      <ul className="mt-10 space-y-4">
        {GUIDES.map((g) => (
          <li key={g.href}>
            <Link
              href={g.href}
              className="block rounded-[length:var(--radius-cards)] border border-subtle-gray bg-crisp-white p-6 transition-colors hover:border-midnight-ink/20"
            >
              <h2 className="font-display text-xl font-semibold text-midnight-ink">{g.title}</h2>
              <p className="mt-2 text-sm text-charcoal-text">{g.blurb}</p>
              <span className="mt-3 inline-block text-sm font-medium text-midnight-ink underline">Ler guia</span>
            </Link>
          </li>
        ))}
      </ul>
    </article>
  );
}
