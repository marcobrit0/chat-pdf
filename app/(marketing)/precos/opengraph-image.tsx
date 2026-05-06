import {
  ogImageContentType,
  ogImageSize,
  renderOgImage,
} from "@/components/seo/og-image";

export const runtime = "edge";
export const alt = "Preços do PDFIA — grátis pra testar, R$29/mês pra usar";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return renderOgImage({
    eyebrow: "Preços",
    title: "Grátis pra testar · R$29/mês pra usar",
    subtitle: "PDFs até 100 páginas, chat com a página citada, modos prontos",
  });
}
