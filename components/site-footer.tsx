import Link from "next/link";

/**
 * Footer band using Ash Gray (section surface) for visual segmentation.
 */
export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-subtle-gray bg-ash-gray">
      <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-faded-stone sm:px-6">
        <div className="flex flex-col gap-8 sm:flex-row sm:justify-between sm:gap-12">
          <p className="font-condensed tracking-tight">
            © {new Date().getFullYear()} ChatPDF Brasil. Marketing e guias em português — iterativo (ver docs/PHASE7.md).
          </p>
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-charcoal-text" aria-label="Rodapé">
            <Link href="/guias" className="underline-offset-4 hover:underline">
              Guias
            </Link>
            <Link href="/ler-edital-com-ia" className="underline-offset-4 hover:underline">
              Ler edital com IA
            </Link>
            <Link href="/entender-laudo-medico" className="underline-offset-4 hover:underline">
              Laudo médico
            </Link>
            <Link href="/precos" className="underline-offset-4 hover:underline">
              Preços
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
