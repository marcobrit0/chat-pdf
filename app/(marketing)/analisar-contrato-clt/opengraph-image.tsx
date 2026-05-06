import {
  ogImageContentType,
  ogImageSize,
  renderOgImage,
} from "@/components/seo/og-image";

export const runtime = "edge";
export const alt = "Analisar contrato CLT com IA — antes de assinar";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return renderOgImage({
    eyebrow: "Antes de assinar",
    title: "Analisar contrato CLT com IA",
    subtitle: "Salário, jornada, benefícios, aviso prévio e cláusulas que costumam pegar",
  });
}
