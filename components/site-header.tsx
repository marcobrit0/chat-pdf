import Link from "next/link";

const navItems = [
  { href: "/chat-pdf", label: "Chat PDF" },
  { href: "/resumir-pdf", label: "Resumir PDF" },
  { href: "/precos", label: "Preços" },
  { href: "/login", label: "Entrar" },
] as const;

/**
 * Sticky marketing header: Ash Gray surface (DESIGN.md), Soehne navigation links.
 */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-subtle-gray bg-ash-gray">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-6 px-4 sm:px-6">
        <Link
          href="/"
          className="font-display text-base font-semibold tracking-tight text-midnight-ink"
        >
          ChatPDF Brasil
        </Link>
        <nav
          className="flex flex-wrap items-center justify-end gap-x-6 gap-y-2 text-base text-charcoal-text"
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
      </div>
    </header>
  );
}
