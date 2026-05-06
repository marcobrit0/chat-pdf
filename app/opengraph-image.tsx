import {
  ogImageContentType,
  ogImageSize,
  renderOgImage,
} from "@/components/seo/og-image";

export const runtime = "edge";
export const alt =
  "PDFIA — Chat com PDF em português, com a página citada";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return renderOgImage({
    eyebrow: "Chat com PDF em português",
    title: "Resuma e converse com qualquer PDF.",
    subtitle:
      "Resumo grátis · Premium R$29/mês com chat e a página citada em cada resposta",
  });
}
