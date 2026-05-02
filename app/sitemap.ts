import type { MetadataRoute } from "next";

import { getSiteUrl } from "@/lib/seo";

/**
 * Static routes for Phase 0. Expand when new marketing or app pages ship.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const now = new Date();
  const paths = [
    "/",
    "/precos",
    "/login",
    "/chat-pdf",
    "/resumir-pdf",
    "/analisar-contrato-com-ia",
    "/ia-pdf",
    "/pdf-ia",
    "/ia-para-resumir-pdf",
    "/ler-edital-com-ia",
    "/resumir-edital-de-licitacao",
    "/analisar-apolice-de-seguro",
    "/entender-laudo-medico",
    "/guias",
    "/guias/como-resumir-pdf-com-ia",
    "/termos",
    "/privacidade",
    "/app",
  ] as const;

  return paths.map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
