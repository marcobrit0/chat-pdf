import type { Metadata } from "next";

import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Resumir PDF",
  description:
    "Resuma PDFs longos com IA — landing SEO Resumir PDF (stub Fase 0).",
  path: "/resumir-pdf",
});

export default function ResumirPdfPage() {
  return (
    <div className="mx-auto w-full max-w-6xl flex-1 px-4 py-14 sm:px-6">
      <h1 className="font-display text-3xl font-semibold tracking-tight text-midnight-ink md:text-4xl">
        Resumir PDF
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-charcoal-text">
        O resumo inteligente de PDFs será integrado nas próximas fases.
      </p>
    </div>
  );
}
