"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navItems = [
  { href: "/", label: "Início" },
  { href: "/resumir-pdf", label: "Resumir PDF" },
  { href: "/#casos-de-uso", label: "Casos de uso" },
  { href: "/guias", label: "Guias" },
  { href: "/precos", label: "Preços" },
] as const;

const useCaseLinks = [
  { href: "/analisar-contrato-clt", label: "Contrato CLT" },
  { href: "/ler-edital-com-ia", label: "Editais" },
  { href: "/analisar-apolice-de-seguro", label: "Apólice de seguro" },
  { href: "/entender-laudo-medico", label: "Laudo médico" },
  { href: "/comparar-pdfs", label: "Comparar PDFs" },
] as const;

const compareLinks = [
  { href: "/chatpdf-vs-chatgpt", label: "vs ChatGPT" },
  { href: "/chatpdf-vs-smallpdf", label: "vs Smallpdf" },
  { href: "/chatpdf-vs-adobe-acrobat-ai", label: "vs Adobe Acrobat AI" },
] as const;

/**
 * Marketing site header (PDFIA Redesign).
 *
 * Design spec (PDFIA Redesign.html → .site-header):
 *  - bg: --color-canvas, hairline bottom border
 *  - inner: max-width 1240px, padding 18px 32px
 *  - brand: 22×22px black square with gold "P" (mono 11px/700) + "PDFIA" wordmark
 *  - nav: 28px gap, 14px charcoal-text
 *  - right: ghost "Entrar" + outline "Resumir um PDF"
 */
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = original;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="border-b border-subtle-gray bg-canvas">
      <div className="container-page flex items-center justify-between gap-6 py-4">
        <Link
          href="/"
          aria-label="PDFIA — início"
          className="flex items-center"
        >
          <Image
            src="/pdfia-logo.png"
            alt="PDFIA"
            width={809}
            height={172}
            className="h-[22px] w-auto"
            priority
          />
        </Link>

        <nav
          className="hidden items-center gap-7 text-body-sm text-charcoal-text md:flex"
          aria-label="Principal"
        >
          {navItems.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname?.startsWith(item.href.split("#")[0] ?? item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={
                  "transition-colors hover:text-midnight-ink " +
                  (active ? "text-midnight-ink" : "")
                }
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2.5">
          <Link
            href="/login"
            className="hidden rounded-lg px-3 py-2 text-body-sm text-charcoal-text transition-colors hover:text-midnight-ink md:inline-flex"
          >
            Entrar
          </Link>
          <Link
            href="/resumir-pdf"
            className="hidden items-center justify-center rounded-lg border border-midnight-ink px-3 py-2 text-body-sm font-medium text-midnight-ink transition-colors hover:bg-midnight-ink hover:text-crisp-white md:inline-flex"
          >
            Resumir um PDF
          </Link>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-sheet"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-midnight-ink text-midnight-ink md:hidden"
          >
            <Hamburger open={open} />
          </button>
        </div>
      </div>

      {open ? (
        <>
          <button
            type="button"
            aria-label="Fechar menu"
            onClick={close}
            className="fixed inset-x-0 top-[60px] bottom-0 z-30 bg-midnight-ink/10 md:hidden"
          />
          <div
            id="mobile-sheet"
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navegação"
            className="fixed inset-x-0 top-[60px] z-40 max-h-[calc(100dvh-60px)] overflow-y-auto border-t border-subtle-gray bg-crisp-white px-4 pb-12 pt-6 sm:px-6 md:hidden"
          >
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={close}
                    className="flex items-center justify-between border-b border-subtle-gray py-3 font-display text-heading font-semibold text-midnight-ink"
                  >
                    {item.label}
                    <span aria-hidden="true" className="text-faded-stone">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-8 grid gap-3">
              <Link
                href="/resumir-pdf"
                onClick={close}
                className="inline-flex items-center justify-center rounded-lg border border-midnight-ink px-5 py-3 text-body font-medium text-midnight-ink"
              >
                Resumir um PDF
              </Link>
              <Link
                href="/login"
                onClick={close}
                className="inline-flex items-center justify-center rounded-lg bg-apollo-gold px-5 py-3 text-body font-medium text-midnight-ink"
              >
                Entrar
              </Link>
            </div>

            <NavGroup
              title="Casos de uso"
              items={[...useCaseLinks]}
              onLinkClick={close}
            />
            <NavGroup
              title="Comparações"
              items={[...compareLinks]}
              onLinkClick={close}
            />
          </div>
        </>
      ) : null}
    </header>
  );
}

function Hamburger({ open }: { open: boolean }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden="true"
    >
      <line
        x1="2"
        y1={open ? "9" : "5"}
        x2="16"
        y2={open ? "9" : "5"}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
        style={{
          transformOrigin: "center",
          transform: open ? "rotate(45deg)" : "none",
          transition: "transform 200ms ease-out",
        }}
      />
      <line
        x1="2"
        y1={open ? "9" : "13"}
        x2="16"
        y2={open ? "9" : "13"}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
        style={{
          transformOrigin: "center",
          transform: open ? "rotate(-45deg)" : "none",
          transition: "transform 200ms ease-out",
        }}
      />
    </svg>
  );
}

function NavGroup({
  title,
  items,
  onLinkClick,
}: {
  title: string;
  items: Array<{ href: string; label: string }>;
  onLinkClick?: () => void;
}) {
  return (
    <section className="mt-10">
      <p className="eyebrow text-faded-stone">{title}</p>
      <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              onClick={onLinkClick}
              className="text-body-sm text-charcoal-text underline-offset-4 hover:underline"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
