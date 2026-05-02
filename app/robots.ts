import type { MetadataRoute } from "next";

import { getSiteUrl } from "@/lib/seo";

/** Crawl rules: allow all; sitemap URL derived from SITE_URL env. */
export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
