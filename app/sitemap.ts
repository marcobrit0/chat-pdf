import type { MetadataRoute } from "next";

import { getSiteUrl } from "@/lib/seo";
import { programmaticSlugs } from "@/lib/seo/programmatic-seo-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const now = new Date();

  /**
   * Priority bands:
   *  1.0  homepage
   *  0.9  primary product pages (chat, summary, pricing)
   *  0.8  high-intent landing pages (contracts, editais, comparisons)
   *  0.7  use-case landings
   *  0.5  synonyms / lower-intent SEO
   *  0.3  legal / login
   */
  const entries: Array<{ path: string; priority: number; freq: "daily" | "weekly" | "monthly" }> = [
    { path: "/", priority: 1.0, freq: "weekly" },

    // Primary product pages
    { path: "/resumir-pdf", priority: 0.9, freq: "weekly" },
    { path: "/chat-pdf", priority: 0.9, freq: "weekly" },
    { path: "/precos", priority: 0.9, freq: "weekly" },
    { path: "/guias", priority: 0.7, freq: "weekly" },
    { path: "/guias/como-resumir-pdf-com-ia", priority: 0.6, freq: "monthly" },
    { path: "/guias/como-ler-edital-de-licitacao", priority: 0.6, freq: "monthly" },
    { path: "/guias/como-analisar-contrato-clt", priority: 0.6, freq: "monthly" },
    { path: "/guias/como-entender-apolice-de-seguro", priority: 0.6, freq: "monthly" },
    { path: "/guias/como-entender-laudo-medico", priority: 0.6, freq: "monthly" },
    { path: "/guias/como-conferir-boleto-antes-de-pagar", priority: 0.6, freq: "monthly" },
    { path: "/guias/comparar-versoes-de-pdf", priority: 0.6, freq: "monthly" },
    { path: "/guias/ocr-para-pdf", priority: 0.6, freq: "monthly" },
    { path: "/guias/pdf-protegido-por-senha", priority: 0.6, freq: "monthly" },

    // High-intent comparisons (primary commercial keywords)
    { path: "/chatpdf-vs-chatgpt", priority: 0.85, freq: "weekly" },
    { path: "/chatpdf-vs-smallpdf", priority: 0.8, freq: "weekly" },
    { path: "/chatpdf-vs-adobe-acrobat-ai", priority: 0.8, freq: "weekly" },
    { path: "/alternativa-ao-chatpdf", priority: 0.8, freq: "weekly" },
    { path: "/chatpdf-em-portugues", priority: 0.8, freq: "weekly" },
    { path: "/chatgpt-pdf", priority: 0.7, freq: "weekly" },

    // High-intent use cases
    { path: "/analisar-contrato-clt", priority: 0.8, freq: "weekly" },
    { path: "/analisar-contrato-com-ia", priority: 0.8, freq: "weekly" },
    { path: "/resumir-contrato-pdf", priority: 0.8, freq: "weekly" },
    { path: "/analisar-contrato-de-prestacao-de-servicos", priority: 0.75, freq: "weekly" },
    { path: "/ler-edital-com-ia", priority: 0.8, freq: "weekly" },
    { path: "/resumir-edital-de-licitacao", priority: 0.75, freq: "weekly" },
    { path: "/analisar-apolice-de-seguro", priority: 0.75, freq: "weekly" },
    { path: "/entender-laudo-medico", priority: 0.75, freq: "weekly" },
    { path: "/comparar-pdfs", priority: 0.75, freq: "weekly" },
    { path: "/analisar-proposta-comercial", priority: 0.7, freq: "weekly" },
    { path: "/resumir-relatorio-pdf", priority: 0.7, freq: "weekly" },
    { path: "/resumir-boleto-ou-fatura", priority: 0.7, freq: "weekly" },
    { path: "/resumo-de-pdf", priority: 0.7, freq: "weekly" },

    // Synonyms / lower-intent
    { path: "/ia-pdf", priority: 0.5, freq: "monthly" },
    { path: "/pdf-ia", priority: 0.5, freq: "monthly" },
    { path: "/ia-para-resumir-pdf", priority: 0.5, freq: "monthly" },

    // Legal (lower). /login and /app are intentionally excluded — they are
    // noindex auth surfaces and listing them only wastes crawl budget.
    { path: "/termos", priority: 0.3, freq: "monthly" },
    { path: "/privacidade", priority: 0.3, freq: "monthly" },

    // Programmatic SEO: persona × document-type long-tail landings.
    // Lower priority than canonical use-cases (0.8) to avoid signaling
    // them as primary entry points.
    ...programmaticSlugs.map((slug) => ({
      path: `/${slug}`,
      priority: 0.7,
      freq: "weekly" as const,
    })),
  ];

  return entries.map((entry) => ({
    url: `${base}${entry.path}`,
    lastModified: now,
    changeFrequency: entry.freq,
    priority: entry.priority,
  }));
}
