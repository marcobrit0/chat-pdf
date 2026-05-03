import {
  ogImageContentType,
  ogImageSize,
  renderOgImage,
} from "@/components/seo/og-image";

export const runtime = "edge";
export const alt = "ChatPDF em português — chat e resumo PT-BR";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return renderOgImage({
    eyebrow: "Em português",
    title: "Resumir e conversar com PDFs em português",
    subtitle: "Modos para CLT, editais, apólices e laudos — sem cadastro inicial",
  });
}
