import {
  ogImageContentType,
  ogImageSize,
  renderOgImage,
} from "@/components/seo/og-image";

export const runtime = "edge";
export const alt = "Analisar apólice de seguro com IA";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return renderOgImage({
    eyebrow: "Caso de uso",
    title: "Analisar apólice de seguro com IA",
    subtitle: "Coberturas, exclusões, carência, franquia, capital segurado",
  });
}
