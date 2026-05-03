import {
  ogImageContentType,
  ogImageSize,
  renderOgImage,
} from "@/components/seo/og-image";

export const runtime = "edge";
export const alt = "Chat com PDF em português — respostas com citação de página";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return renderOgImage({
    eyebrow: "Chat com PDF",
    title: "Pergunte ao PDF · veja a página citada na resposta",
    subtitle: "Premium R$29/mês · PDFs até 100 páginas · em PT-BR",
  });
}
