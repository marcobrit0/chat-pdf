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
      <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
        <div className="flex items-center gap-6">
          <Link
            href="/app"
            className="whitespace-nowrap font-display text-lg font-semibold leading-none tracking-tight text-midnight-ink"
          >
            <span>ChatPDF</span>
            <span className="hidden sm:inline"> Brasil</span>
          </Link>
          <span
            aria-hidden="true"
            className="hidden h-5 w-px bg-subtle-gray sm:block"
          />
          <Link
            href="/app"
            className="hidden text-sm text-charcoal-text underline-offset-4 hover:underline sm:inline"
          >
            Biblioteca
          </Link>
        </div>

        <div className="flex items-center gap-2">
          {isPremium ? (
            <>
              <span className="hidden items-center gap-1.5 rounded-full border border-midnight-ink/20 bg-canvas px-3 py-1 font-condensed text-[11px] uppercase tracking-[0.18em] text-midnight-ink sm:inline-flex">
                <Dot /> Premium ativo
              </span>
              <Link
                href="/precos"
                className="rounded-[length:var(--radius-buttons)] border border-midnight-ink px-3 py-2 text-sm font-medium text-midnight-ink hover:bg-canvas"
              >
                Assinatura
              </Link>
            </>
          ) : (
            <>
              <span className="hidden text-xs text-faded-stone sm:inline">
                {email}
              </span>
              <Link
                href="/precos"
                className="rounded-[length:var(--radius-buttons)] bg-apollo-gold px-4 py-2 text-sm font-medium text-midnight-ink hover:opacity-90"
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
