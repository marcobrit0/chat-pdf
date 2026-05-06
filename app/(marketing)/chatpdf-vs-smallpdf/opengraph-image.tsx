import {
  ogImageContentType,
  ogImageSize,
  renderOgImage,
} from "@/components/seo/og-image";

export const runtime = "edge";
export const alt = "PDFIA vs Smallpdf — editar ou entender o PDF?";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return renderOgImage({
    eyebrow: "Comparação",
    title: "PDFIA vs Smallpdf",
    subtitle: "Entender o conteúdo × editar o arquivo — quando usar cada um",
  });
}
