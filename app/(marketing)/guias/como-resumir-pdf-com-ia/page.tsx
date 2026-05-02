import Link from "next/link";
import { SeoPageTemplate } from "@/components/marketing/SeoPageTemplate";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Como resumir PDF com IA",
  description:
    "Guia introdutório: envie um PDF, receba um resumo em português e saiba quando vale migrar para o ChatPDF Premium.",
  path: "/guias/como-resumir-pdf-com-ia",
});

export default function GuiaResumirPdfPage() {
  return (
    <SeoPageTemplate
      title="Como resumir PDF com IA"
      intro="Este guia descreve o fluxo gratuito de resumo e o que muda no plano Premium (chat com o documento, modos de análise e PDFs maiores)."
    >
      <nav className="text-sm text-charcoal-text">
        <Link href="/guias" className="underline">
          ← Índice de guias
        </Link>
      </nav>

      <section className="space-y-4 text-charcoal-text">
        <h2 className="font-display text-xl font-semibold text-midnight-ink">1. Envie um PDF</h2>
        <p>
          Na página inicial ou nas landings de produto, use a área de upload. PDFs muito grandes podem exigir Premium — veja os limites na interface.
        </p>

        <h2 className="font-display text-xl font-semibold text-midnight-ink">2. Leia o resumo</h2>
        <p>
          O modelo devolve parágrafo principal, tópicos e sugestões de perguntas. Trate como primeiro passe, não como parecer final.
        </p>

        <h2 className="font-display text-xl font-semibold text-midnight-ink">3. Quando subir de plano</h2>
        <p>
          Se precisar conversar com o texto, extrair dados estruturados ou marcar riscos em contratos longos, o Premium desbloqueia o workspace com citações por página.
        </p>
      </section>
    </SeoPageTemplate>
  );
}
