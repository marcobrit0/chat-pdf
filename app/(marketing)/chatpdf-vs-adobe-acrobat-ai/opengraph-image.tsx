import {
  ogImageContentType,
  ogImageSize,
  renderOgImage,
} from "@/components/seo/og-image";

export const runtime = "edge";
export const alt = "ChatPDF Brasil vs Adobe Acrobat AI — comparação";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return renderOgImage({
    eyebrow: "Comparação",
    title: "ChatPDF Brasil vs Adobe Acrobat AI",
    subtitle: "Foco em leitura de PDF brasileira × suíte completa de PDF da Adobe",
  });
}
