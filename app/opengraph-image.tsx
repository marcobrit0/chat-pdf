import {
  ogImageContentType,
  ogImageSize,
  renderOgImage,
} from "@/components/seo/og-image";

export const runtime = "edge";
export const alt =
  "PDFIA — resumir e conversar com PDFs em português";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return renderOgImage({
    eyebrow: "App de IA para PDFs em PT-BR",
    title: "Resumir e conversar com PDFs em português",
    subtitle:
      "Resumo grátis sem cadastro · Premium R$29/mês com chat e citações",
  });
}
