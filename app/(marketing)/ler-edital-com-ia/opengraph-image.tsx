import {
  ogImageContentType,
  ogImageSize,
  renderOgImage,
} from "@/components/seo/og-image";

export const runtime = "edge";
export const alt = "Ler edital de licitação com IA";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return renderOgImage({
    eyebrow: "Caso de uso",
    title: "Ler edital de licitação com IA",
    subtitle: "Objeto, prazos, habilitação, critério de julgamento, penalidades",
  });
}
