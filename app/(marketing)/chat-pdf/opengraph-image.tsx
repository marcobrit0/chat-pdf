import {
  ogImageContentType,
  ogImageSize,
  renderOgImage,
} from "@/components/seo/og-image";

export const runtime = "edge";
export const alt = "Chat com PDF em português — toda resposta cita a página";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return renderOgImage({
    eyebrow: "Chat com PDF",
    title: "Pergunta ao PDF, recebe a página citada",
    subtitle: "Premium R$29/mês · PDFs até 100 páginas · em português",
  });
}
