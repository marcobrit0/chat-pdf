import { SeoPageTemplate } from "@/components/marketing/SeoPageTemplate";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "PDF + IA — leitura rápida em português",
  description:
    "PDF e IA em uma só ferramenta: resumo gratuito para arquivos pequenos e fluxo Premium para análise profunda com chat e citações de página.",
  path: "/pdf-ia",
});

export default function PdfIaPage() {
  return (
    <SeoPageTemplate
      title="PDF + IA"
      intro="Primeiro um resumo sustentável e limitado; depois você pode evoluir para o Premium com chat fundamentado em trechos do PDF e respostas com a página citada."
      showUpload
      breadcrumbs={[
        { label: "Início", path: "/" },
        { label: "PDF + IA", path: "/pdf-ia" },
      ]}
      related={[
        { href: "/ia-pdf", label: "IA para PDF" },
        { href: "/ia-para-resumir-pdf", label: "IA para resumir PDF" },
        { href: "/resumir-pdf", label: "Resumir PDF" },
        { href: "/chat-pdf", label: "Chat com PDF" },
      ]}
    />
  );
}
