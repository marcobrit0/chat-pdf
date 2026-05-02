import type { Metadata } from "next";

import {
  fontAbcDiatype,
  fontFoundersMono,
  fontSeasonMix,
  fontSoehne,
} from "@/app/fonts";
import { getSiteUrl } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: siteConfig.name,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.defaultDescription,
  openGraph: {
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${fontSeasonMix.variable} ${fontSoehne.variable} ${fontAbcDiatype.variable} ${fontFoundersMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">{children}</body>
    </html>
  );
}
