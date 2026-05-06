import {
  ogImageContentType,
  ogImageSize,
  renderOgImage,
} from "@/components/seo/og-image";

export const runtime = "edge";
export const alt = "Analisar apólice de seguro com IA — sem ler 60 páginas";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return renderOgImage({
    eyebrow: "Sem ler 60 páginas",
    title: "Analisar apólice de seguro com IA",
    subtitle: "Coberturas, exclusões, carência, franquia e prazo de aviso",
  });
}
