import { SeoPageTemplate } from "@/components/marketing/SeoPageTemplate";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "IA para resumir PDF em português",
  description:
    "Use IA para resumir PDFs em PT-BR com limites claros, sem cadastro para arquivos curtos e Premium para PDFs extensos com chat e citações.",
  path: "/ia-para-resumir-pdf",
});

export default function IaParaResumirPdfPage() {
  return (
    <SeoPageTemplate
      title="IA para resumir PDF"
      intro="Gere um resumo estruturado sem cadastro (PDFs curtos). Chat com o documento, PDFs longos e modos avançados de análise são Premium."
      showUpload
      breadcrumbs={[
        { label: "Início", path: "/" },
        { label: "IA para resumir PDF", path: "/ia-para-resumir-pdf" },
      ]}
      related={[
        { href: "/resumir-pdf", label: "Resumir PDF" },
        { href: "/resumo-de-pdf", label: "Resumo de PDF" },
        { href: "/ia-pdf", label: "IA para PDF" },
        { href: "/pdf-ia", label: "PDF + IA" },
      ]}
    />
  );
}
