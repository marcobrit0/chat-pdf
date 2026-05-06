import Image from "next/image";
import Link from "next/link";

type Props = {
  isPremium: boolean;
  email: string | null;
};

/**
 * Minimal authenticated-app chrome. Keeps the workspace focused (no marketing
 * nav noise) but gives the user an anchor: logo home, biblioteca, plan status,
 * and an explicit upgrade path for non-Premium accounts.
 */
export function AppShellHeader({ isPremium, email }: Props) {
  return (
    <header className="sticky top-0 z-40 border-b border-subtle-gray bg-crisp-white/95 backdrop-blur">
      <div className="container-page flex min-h-16 items-center justify-between gap-3">
        <div className="flex items-center gap-6">
          <Link
            href="/app"
            aria-label="PDFIA — biblioteca"
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
          <span
            aria-hidden="true"
            className="hidden h-5 w-px bg-subtle-gray sm:block"
          />
          <Link
            href="/app"
            className="hidden text-body-sm text-charcoal-text underline-offset-4 hover:underline sm:inline"
          >
            Biblioteca
          </Link>
        </div>

        <div className="flex items-center gap-2">
          {isPremium ? (
            <>
              <span className="hidden items-center gap-1.5 rounded-full border border-midnight-ink/20 bg-canvas px-3 py-1 eyebrow text-midnight-ink sm:inline-flex">
                <Dot /> Premium ativo
              </span>
              <Link
                href="/precos"
                className="rounded-lg border border-midnight-ink px-3 py-2 text-body-sm font-medium text-midnight-ink hover:bg-canvas"
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
            </>
          )}
        </div>
      </div>
    </header>
  );
}

function Dot() {
  return (
    <span
      aria-hidden="true"
      className="inline-block h-1.5 w-1.5 rounded-full bg-midnight-ink"
    />
  );
}
