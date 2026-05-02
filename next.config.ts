import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // pdf-parse v2 pulls pdfjs + optional native canvas — keep in Node runtime, not bundled for edge.
  serverExternalPackages: ["pdf-parse", "pdfjs-dist", "@napi-rs/canvas"],
  async redirects() {
    return [{ source: "/pricing", destination: "/precos", permanent: true }];
  },
};

export default nextConfig;
