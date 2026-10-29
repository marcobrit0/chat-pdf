import type { Metadata } from "next";

import {
  fontAbcDiatype,
  fontFoundersMono,
  fontSeasonMix,
  fontSoehne,
} from "@/app/fonts";
import { PostHogProvider } from "@/components/analytics/PostHogProvider";
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
      <body className="flex min-h-full flex-col font-sans">
        <PostHogProvider>{children}</PostHogProvider>
        <script
          async
          src="https://app.tellpin.com/widget/v0.1.21/widget.js"
          data-fbai-key="pk_live_0481a39d0f014e3e984d173809672c720b05292b04fe402685e8ef3bf8f5b7e3"
        />
      </body>
    </html>
  );
}
