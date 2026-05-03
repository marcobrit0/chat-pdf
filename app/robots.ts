import type { MetadataRoute } from "next";

import { getSiteUrl } from "@/lib/seo";

/**
 * Crawl rules. Marketing surface is public; everything below it is private:
 * - /api/* — server endpoints, no SEO value, may leak internals
 * - /app/*  — authed product surface, behind login
 * - /auth/* — magic-link callback URLs, transient and user-specific
 */
export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/app/", "/auth/"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
