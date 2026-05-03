import {
  ogImageContentType,
  ogImageSize,
  renderOgImage,
} from "@/components/seo/og-image";

export const runtime = "edge";
export const alt = "PDFIA vs ChatGPT — comparação para PDFs";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return renderOgImage({
    eyebrow: "Comparação",
    title: "PDFIA vs ChatGPT para PDFs",
    subtitle: "Citação por página, modos por tipo de documento, preço em BRL",
  });
}
