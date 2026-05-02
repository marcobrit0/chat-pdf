import type { MetadataRoute } from "next";

import { getSiteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const now = new Date();

  const standardPaths = [
    "/",
    "/precos",
    "/login",
    "/chat-pdf",
    "/resumir-pdf",
    "/resumo-de-pdf",
    "/chatgpt-pdf",
    "/comparar-pdfs",
    "/analisar-contrato-com-ia",
    "/resumir-contrato-pdf",
    "/analisar-contrato-clt",
    "/analisar-contrato-de-prestacao-de-servicos",
    "/ia-pdf",
    "/pdf-ia",
    "/ia-para-resumir-pdf",
    "/ler-edital-com-ia",
    "/resumir-edital-de-licitacao",
    "/analisar-apolice-de-seguro",
    "/entender-laudo-medico",
    "/resumir-relatorio-pdf",
    "/analisar-proposta-comercial",
    "/resumir-boleto-ou-fatura",
    "/guias",
    "/guias/como-resumir-pdf-com-ia",
    "/termos",
    "/privacidade",
    "/app",
  ] as const;

  // Comparison pages — higher commercial intent, slightly higher priority
  const comparisonPaths = [
    "/alternativa-ao-chatpdf",
    "/chatpdf-em-portugues",
    "/chatpdf-vs-chatgpt",
    "/chatpdf-vs-smallpdf",
    "/chatpdf-vs-adobe-acrobat-ai",
  ] as const;

  return [
    ...standardPaths.map((path) => ({
      url: `${base}${path}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: path === "/" ? 1 : 0.7,
    })),
    ...comparisonPaths.map((path) => ({
      url: `${base}${path}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
