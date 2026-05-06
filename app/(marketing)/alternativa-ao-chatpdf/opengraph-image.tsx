import {
  ogImageContentType,
  ogImageSize,
  renderOgImage,
} from "@/components/seo/og-image";

export const runtime = "edge";
export const alt = "Alternativa ao ChatPDF, feita pro Brasil — em real";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return renderOgImage({
    eyebrow: "Alternativa",
    title: "Alternativa ao ChatPDF, feita pro Brasil",
    subtitle: "Resposta em PT-BR · pagamento em real · modos pra documento brasileiro",
  });
}
