import Link from "next/link";

const navItems = [
  { href: "/chat-pdf", label: "Chat PDF" },
  { href: "/resumir-pdf", label: "Resumir PDF" },
  { href: "/guias", label: "Guias" },
  { href: "/precos", label: "Preços" },
] as const;

/**
 * Sticky marketing header: Ash Gray surface (DESIGN.md), Soehne navigation links.
 */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-subtle-gray bg-crisp-white/95 backdrop-blur">
      <div className="mx-auto flex min-h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link
          href="/"
          className="whitespace-nowrap font-display text-lg font-semibold leading-none tracking-tight text-midnight-ink"
        >
          <span>ChatPDF</span>
          <span className="hidden sm:inline"> Brasil</span>
        </Link>
        <nav
          className="hidden items-center justify-end gap-x-6 text-sm text-charcoal-text md:flex"
          aria-label="Principal"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-opacity hover:opacity-80"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href="/resumir-pdf"
            className="hidden rounded-[length:var(--radius-buttons)] border border-midnight-ink px-3 py-2 text-sm font-medium text-midnight-ink sm:inline-flex"
          >
            Resumir PDF
          </Link>
          <Link
            href="/app"
            className="rounded-[length:var(--radius-buttons)] bg-apollo-gold px-3 py-2 text-sm font-medium text-midnight-ink"
          >
            Entrar no app
          </Link>
        </div>
      </div>
    </header>
  );
}
