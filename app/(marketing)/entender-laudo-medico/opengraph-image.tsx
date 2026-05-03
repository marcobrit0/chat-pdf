import {
  ogImageContentType,
  ogImageSize,
  renderOgImage,
} from "@/components/seo/og-image";

export const runtime = "edge";
export const alt = "Entender laudo médico com IA em português";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return renderOgImage({
    eyebrow: "Caso de uso",
    title: "Entender laudo médico em português",
    subtitle:
      "Tradução de termos clínicos, achados destacados, recomendações citadas",
  });
}
