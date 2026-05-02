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

/**
 * Constructs Next.js Metadata with canonical URL and basic Open Graph fields.
 * Use on leaf pages for consistent SEO primitives across marketing routes.
 */
export function buildPageMetadata(input: {
  title: string;
  description: string;
  path: string;
  /** When false, ask crawlers not to index (e.g. authenticated shells later). */
  index?: boolean;
}): Metadata {
  const canonical = absoluteUrl(input.path);
  const index = input.index !== false;
  return {
    title: input.title,
    description: input.description,
    alternates: { canonical },
    robots: index
      ? { index: true, follow: true }
      : { index: false, follow: false },
    openGraph: {
      title: input.title,
      description: input.description,
      url: canonical,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: "website",
    },
  };
}
