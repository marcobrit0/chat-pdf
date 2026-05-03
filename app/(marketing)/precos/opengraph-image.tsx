import {
  ogImageContentType,
  ogImageSize,
  renderOgImage,
} from "@/components/seo/og-image";

export const runtime = "edge";
export const alt = "Preços do PDFIA — grátis ou Premium R$29/mês";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return renderOgImage({
    eyebrow: "Preços",
    title: "Grátis para começar · R$29/mês para ir fundo",
    subtitle: "PDFs até 100 páginas, chat com citações, modos de análise",
  });
}
