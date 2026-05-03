import {
  ogImageContentType,
  ogImageSize,
  renderOgImage,
} from "@/components/seo/og-image";

export const runtime = "edge";
export const alt = "PDFIA vs Smallpdf — comparação";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return renderOgImage({
    eyebrow: "Comparação",
    title: "PDFIA vs Smallpdf",
    subtitle: "Leitura com IA × edição/conversão de PDFs — quando usar cada um",
  });
}
