/**
 * Footer band using Ash Gray (section surface) for visual segmentation.
 */
export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-subtle-gray bg-ash-gray">
      <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-faded-stone sm:px-6">
        <p className="font-condensed tracking-tight">
          © {new Date().getFullYear()} ChatPDF Brasil. Conteúdo de marketing em
          construção — Fase 0.
        </p>
      </div>
    </footer>
  );
}
