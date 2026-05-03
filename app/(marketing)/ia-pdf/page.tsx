import { SeoPageTemplate } from "@/components/marketing/SeoPageTemplate";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "IA PDF — leitura inteligente em português",
  description:
    "IA dedicada para PDFs em PT-BR: resumo gratuito para documentos curtos; Premium para chat com citação de página e arquivos longos.",
  path: "/ia-pdf",
});

export default function IaPdfPage() {
  return (
    <SeoPageTemplate
      title="IA para PDF"
      intro="Atalhe a leitura com uma camada de IA em português. O uso anônimo gratuito cobre apenas o resumo; conversar com o PDF e arquivos longos exigem Premium."
      showUpload
      breadcrumbs={[
        { label: "Início", path: "/" },
        { label: "IA para PDF", path: "/ia-pdf" },
      ]}
      related={[
        { href: "/pdf-ia", label: "PDF + IA" },
        { href: "/ia-para-resumir-pdf", label: "IA para resumir PDF" },
        { href: "/resumir-pdf", label: "Resumir PDF" },
        { href: "/chat-pdf", label: "Chat com PDF" },
      ]}
    />
  );
}
