import {
  ogImageContentType,
  ogImageSize,
  renderOgImage,
} from "@/components/seo/og-image";

export const runtime = "edge";
export const alt = "Entender laudo médico com IA em português — sem virar dr. Google";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return renderOgImage({
    eyebrow: "Antes da consulta",
    title: "Entender laudo médico em português",
    subtitle:
      "Termo técnico em linguagem que dá pra entender, achados destacados, perguntas pra consulta",
  });
}
