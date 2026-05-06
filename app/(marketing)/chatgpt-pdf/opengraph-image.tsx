import {
  ogImageContentType,
  ogImageSize,
  renderOgImage,
} from "@/components/seo/og-image";

export const runtime = "edge";
export const alt = "ChatGPT pra PDF — quando vale ter ferramenta dedicada";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return renderOgImage({
    eyebrow: "ChatGPT pra PDF",
    title: "Quando vale uma ferramenta dedicada",
    subtitle: "Página citada por padrão, modos prontos por tipo de PDF, em real",
  });
}
