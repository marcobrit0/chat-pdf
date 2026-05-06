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
    title: "Resumo de PDF em segundos, em português",
    subtitle: "PDF até 10 páginas · sem cadastro · tópicos, datas, valores e nomes",
  });
}
