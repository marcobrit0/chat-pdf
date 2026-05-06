import {
  ogImageContentType,
  ogImageSize,
  renderOgImage,
} from "@/components/seo/og-image";

export const runtime = "edge";
export const alt = "Ler edital de licitação com IA — antes de montar proposta";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return renderOgImage({
    eyebrow: "Antes de montar proposta",
    title: "Ler edital de licitação com IA",
    subtitle: "Objeto, prazo, habilitação, julgamento e penalidade — em minutos",
  });
}
