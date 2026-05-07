import Image from "next/image";
import Link from "next/link";

type Props = {
  isPremium: boolean;
  email: string | null;
};

/**
 * Authenticated-app chrome on the same warm canvas as the marketing site —
 * keeps the workspace and homepage visually unified. Logo routes home; the
 * "Biblioteca" eyebrow anchors the user inside the app.
 */
export function AppShellHeader({ isPremium, email }: Props) {
  return (
    <header className="sticky top-0 z-40 border-b border-subtle-gray bg-canvas">
      <div className="container-page flex min-h-16 items-center justify-between gap-3">
        <div className="flex items-center gap-6">
          <Link href="/" aria-label="PDFIA — início" className="flex items-center">
            <Image
              src="/pdfia-logo.png"
              alt="PDFIA"
              width={809}
              height={172}
              className="h-[22px] w-auto"
              priority
            />
          </Link>
          <span
            aria-hidden="true"
            className="hidden h-5 w-px bg-subtle-gray sm:block"
          />
          <span className="hidden eyebrow text-charcoal-text sm:inline">
            Biblioteca
          </span>
        </div>

        <div className="flex items-center gap-3.5">
          {isPremium ? (
            <>
              <span className="hidden items-center gap-2 rounded-full border border-subtle-gray bg-crisp-white px-3 py-1 eyebrow text-charcoal-text sm:inline-flex">
                <span
                  aria-hidden="true"
                  className="inline-block h-1.5 w-1.5 rounded-full bg-status-dot"
                />
                Premium ativo
              </span>
              <Link
                href="/precos"
                className="rounded-lg border border-midnight-ink px-3 py-2 text-body-sm font-medium text-midnight-ink transition-colors hover:bg-midnight-ink hover:text-crisp-white"
              >
                Assinatura
              </Link>
            </>
          ) : (
            <>
              <span className="hidden text-caption text-faded-stone sm:inline">
                {email}
              </span>
              <Link
                href="/precos"
                className="rounded-lg bg-apollo-gold px-4 py-2 text-body-sm font-medium text-midnight-ink hover:opacity-90"
              >
                Fazer upgrade
              </Link>
              <Link
                href="/precos"
                className="hidden rounded-lg border border-midnight-ink px-3 py-2 text-body-sm font-medium text-midnight-ink transition-colors hover:bg-midnight-ink hover:text-crisp-white sm:inline-flex"
              >
                Assinatura
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
