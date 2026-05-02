import type { Metadata } from "next";

import { SeoPageTemplate } from "@/components/marketing/SeoPageTemplate";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Resumir PDF",
  description:
    "Resuma PDFs com IA em português — gratuito para documentos curtos; Premium para chat e arquivos grandes.",
  path: "/resumir-pdf",
});

export default function ResumirPdfPage() {
  return (
    <SeoPageTemplate
      title="Resumir PDF"
      intro="Cole um PDF e receba um resumo estruturado (tópicos, datas sugeridas, entidades). Sem cadastro para o nível gratuito; o chat com o arquivo é Premium."
      showUpload
    />
  );
}
