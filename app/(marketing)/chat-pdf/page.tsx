import type { Metadata } from "next";

import { SeoPageTemplate } from "@/components/marketing/SeoPageTemplate";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Chat PDF",
  description:
    "Resumo gratuito de PDFs em português; converse com o documento no plano Premium com citações.",
  path: "/chat-pdf",
});

export default function ChatPdfPage() {
  return (
    <SeoPageTemplate
      title="Chat PDF"
      intro="Comece com um resumo gratuito do seu PDF. Para fazer perguntas ao texto e receber respostas com trechos citados (chat com fontes), você precisa do Premium — o plano anônimo não inclui chat."
      showUpload
    />
  );
}
