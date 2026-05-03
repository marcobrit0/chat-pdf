import {
  ogImageContentType,
  ogImageSize,
  renderOgImage,
} from "@/components/seo/og-image";

export const runtime = "edge";
export const alt = "ChatPDF Brasil vs ChatGPT — comparação para PDFs";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return renderOgImage({
    eyebrow: "Comparação",
    title: "ChatPDF Brasil vs ChatGPT para PDFs",
    subtitle: "Citação por página, modos por tipo de documento, preço em BRL",
  });
}
