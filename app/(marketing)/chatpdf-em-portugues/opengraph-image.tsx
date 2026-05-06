import {
  ogImageContentType,
  ogImageSize,
  renderOgImage,
} from "@/components/seo/og-image";

export const runtime = "edge";
export const alt = "ChatPDF em português brasileiro — feito no Brasil";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return renderOgImage({
    eyebrow: "ChatPDF em português",
    title: "Chat com PDF feito pro Brasil",
    subtitle: "Modos pra CLT, edital, apólice e laudo — em real, sem cadastro pra começar",
  });
}
