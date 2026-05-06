import {
  ogImageContentType,
  ogImageSize,
  renderOgImage,
} from "@/components/seo/og-image";

export const runtime = "edge";
export const alt = "PDFIA vs ChatGPT — qual usar pra PDF";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return renderOgImage({
    eyebrow: "Comparação",
    title: "PDFIA vs ChatGPT pra PDF",
    subtitle: "Página citada em toda resposta, modos prontos por tipo, preço em real",
  });
}
