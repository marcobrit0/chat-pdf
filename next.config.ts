import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

/** CSP inicial compatível com Next.js (scripts inline do runtime). Ajuste ao adicionar tags de terceiros. */
const CONTENT_SECURITY_POLICY = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  [
    "connect-src 'self'",
    "https://*.supabase.co",
    "wss://*.supabase.co",
    "https://openrouter.ai",
    "https://api.stripe.com",
    "https://checkout.stripe.com",
    "https://*.posthog.com",
    "https://us.i.posthog.com",
    "https://va.vercel-scripts.com",
  ].join(" "),
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "upgrade-insecure-requests",
].join("; ");

const nextConfig: NextConfig = {
  // pdf-parse v2 pulls pdfjs + optional native canvas — keep in Node runtime, not bundled for edge.
  serverExternalPackages: ["pdf-parse", "pdfjs-dist", "@napi-rs/canvas"],
  // pdfjs-dist loads its worker via dynamic import, which Vercel's file tracer
  // doesn't follow — force-include the worker bundle so summarize routes can
  // resolve it at runtime.
  outputFileTracingIncludes: {
    "/api/summarize/anonymous": ["./node_modules/pdfjs-dist/legacy/build/*.mjs"],
    "/api/documents": ["./node_modules/pdfjs-dist/legacy/build/*.mjs"],
  },
  async redirects() {
    return [{ source: "/pricing", destination: "/precos", permanent: true }];
  },
  async headers() {
    const security = [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "X-Frame-Options", value: "DENY" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=(), payment=(self)",
      },
    ];

    if (isProd) {
      security.push(
        { key: "Content-Security-Policy", value: CONTENT_SECURITY_POLICY },
        {
          key: "Strict-Transport-Security",
          value: "max-age=63072000; includeSubDomains; preload",
        },
      );
    }

    return [{ source: "/:path*", headers: security }];
  },
};

export default nextConfig;
