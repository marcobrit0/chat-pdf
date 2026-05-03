import {
  ogImageContentType,
  ogImageSize,
  renderOgImage,
} from "@/components/seo/og-image";

export const runtime = "edge";
export const alt = "ChatGPT para PDF — alternativa dedicada em português";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return renderOgImage({
    eyebrow: "ChatGPT para PDF",
    title: "Quando vale uma ferramenta dedicada em vez do ChatGPT",
    subtitle: "Citação de página, modos por tipo, preço em BRL",
  });
}
