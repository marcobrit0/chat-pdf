import type { Metadata } from "next";

import { siteConfig } from "@/lib/site";

/**
 * Public site origin used for canonical URLs, sitemap, and robots.
 * Set NEXT_PUBLIC_SITE_URL in production (e.g. https://www.example.com).
 */
export function getSiteUrl(): string {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "") ||
    "http://localhost:3000";
  return raw.replace(/\/$/, "");
}

/**
 * Builds an absolute URL from a path like `/pricing` (leading slash optional).
 */
export function absoluteUrl(path: string): string {
  const base = getSiteUrl();
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}

const BRAND_SEPARATOR = " · ";

/**
 * Returns `<page-title> · ChatPDF Brasil`, but if the title already mentions
 * "ChatPDF Brasil" or "ChatPDF" we leave it alone — avoids the SERP duplication
 * that the layout's title.template was producing.
 */
function withBrand(title: string): string {
  const t = title.trim();
  if (/chatpdf/i.test(t)) return t;
  return `${t}${BRAND_SEPARATOR}${siteConfig.name}`;
}

/**
 * Constructs Next.js Metadata with canonical URL and basic Open Graph fields.
 * Use on leaf pages for consistent SEO primitives across marketing routes.
 *
 * Uses `title.absolute` so the root layout's title.template is bypassed —
 * branding is appended deterministically by withBrand() instead, which avoids
 * "ChatPDF Brasil · ChatPDF Brasil" when the leaf title already includes brand.
 */
export function buildPageMetadata(input: {
  title: string;
  description: string;
  path: string;
  /** When false, ask crawlers not to index (e.g. authenticated shells later). */
  index?: boolean;
  /** Override the social-share title if you want it shorter than the SERP title. */
  ogTitle?: string;
}): Metadata {
  const canonical = absoluteUrl(input.path);
  const index = input.index !== false;
  const fullTitle = withBrand(input.title);
  return {
    title: { absolute: fullTitle },
    description: input.description,
    alternates: { canonical },
    robots: index
      ? { index: true, follow: true }
      : { index: false, follow: false },
    openGraph: {
      title: input.ogTitle ?? fullTitle,
      description: input.description,
      url: canonical,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: "website",
    },
  };
}
