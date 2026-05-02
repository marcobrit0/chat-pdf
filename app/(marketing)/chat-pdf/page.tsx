import type { Metadata } from "next";

import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Chat PDF",
  description:
    "Pergunte aos seus documentos PDF em linguagem natural — landing SEO Chat PDF.",
  path: "/chat-pdf",
});

export default function ChatPdfPage() {
  return (
    <div className="mx-auto w-full max-w-6xl flex-1 px-4 py-14 sm:px-6">
      <h1 className="font-display text-3xl font-semibold tracking-tight text-midnight-ink md:text-4xl">
        Chat PDF
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-charcoal-text">
        Em breve você poderá fazer perguntas sobre o conteúdo dos seus PDFs e
        receber respostas citando o documento.
      </p>
    </div>
  );
}
