import {
  ogImageContentType,
  ogImageSize,
  renderOgImage,
} from "@/components/seo/og-image";

export const runtime = "edge";
export const alt = "PDFIA vs Adobe Acrobat AI — qual escolher?";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return renderOgImage({
    eyebrow: "Comparação",
    title: "PDFIA vs Adobe Acrobat AI",
    subtitle: "Independente, em real × suíte Adobe completa em dólar",
  });
}
