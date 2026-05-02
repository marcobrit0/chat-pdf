import { SeoPageTemplate } from "@/components/marketing/SeoPageTemplate";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "IA para resumir PDF",
  description:
    "Use IA para resumir PDFs em PT-BR com limites claros e paywall para PDFs extensos.",
  path: "/ia-para-resumir-pdf",
});

export default function IaParaResumirPdfPage() {
  return (
    <SeoPageTemplate
      title="IA para resumir PDF"
      intro="Gere um resumo estruturado sem cadastro (PDFs curtos). Chat com o documento, PDFs longos e modos avançados de análise são Premium."
      showUpload
    />
  );
}
