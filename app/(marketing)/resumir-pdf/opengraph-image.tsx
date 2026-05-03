import {
  ogImageContentType,
  ogImageSize,
  renderOgImage,
} from "@/components/seo/og-image";

export const runtime = "edge";
export const alt = "Resumir PDF grátis em português, sem cadastro";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return renderOgImage({
    eyebrow: "Resumir PDF grátis",
    title: "Visão geral, datas, valores e entidades",
    subtitle: "PDFs até 10 páginas · sem cadastro · em PT-BR",
  });
}
