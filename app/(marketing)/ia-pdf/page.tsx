import { SeoPageTemplate } from "@/components/marketing/SeoPageTemplate";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "IA PDF — leitura inteligente",
  description:
    "IA para PDFs: resumo para documentos curtos; Premium para conversas e PDFs longos.",
  path: "/ia-pdf",
});

export default function IaPdfPage() {
  return (
    <SeoPageTemplate
      title="IA PDF"
      intro="Atalhe a leitura com uma camada de IA em português. O uso anônimo gratuito cobre só o resumo; conversar com o PDF exige Premium."
      showUpload
    />
  );
}
