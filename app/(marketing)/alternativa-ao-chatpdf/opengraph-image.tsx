import {
  ogImageContentType,
  ogImageSize,
  renderOgImage,
} from "@/components/seo/og-image";

export const runtime = "edge";
export const alt = "Alternativa ao ChatPDF — em português, com BRL";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return renderOgImage({
    eyebrow: "Alternativa",
    title: "Alternativa ao ChatPDF.com em português",
    subtitle: "Respostas em PT-BR · preço em BRL · suporte brasileiro",
  });
}
