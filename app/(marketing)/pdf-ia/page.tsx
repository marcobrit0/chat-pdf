import { SeoPageTemplate } from "@/components/marketing/SeoPageTemplate";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "PDF e IA — ChatPDF Brasil",
  description:
    "PDF + IA para leitura rápida: resumo gratuito para arquivos pequenos e fluxo pago para análise profunda.",
  path: "/pdf-ia",
});

export default function PdfIaPage() {
  return (
    <SeoPageTemplate
      title="PDF e IA"
      intro="Primeiro um resumo sustentável e limitado; depois você pode evoluir para o Premium com chat fundamentado em trechos do PDF."
      showUpload
    />
  );
}
