import type { ReactNode } from "react";

type Tone = "muted" | "ink" | "accent" | "white";

const toneClass: Record<Tone, string> = {
  muted: "text-faded-stone",
  ink: "text-midnight-ink",
  accent: "text-apollo-gold",
  white: "text-crisp-white",
};

/**
 * Section-eyebrow — uppercase condensed label that sits above section
 * headings. Replaces ~60 ad-hoc copies of
 * `eyebrow text-faded-stone`.
 */
export function Eyebrow({
  children,
  tone = "muted",
  className = "",
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <p className={`eyebrow ${toneClass[tone]} ${className}`.trim()}>{children}</p>
  );
}

/**
 * Mono code/meta label — short codes, page numbers, "exemplo" style chips.
 * Replaces ~30 ad-hoc copies of
 * `font-mono text-caption tracking-[0.06em] text-faded-stone` (uppercase
 * variant; pass `casing="normal"` for non-upper).
 */
export function MonoLabel({
  children,
  tone = "muted",
  casing = "upper",
  className = "",
}: {
  children: ReactNode;
  tone?: Tone;
  casing?: "upper" | "normal";
  className?: string;
}) {
  const base =
    casing === "upper"
      ? "mono-label"
      : "font-mono text-caption leading-[1.2] tracking-[0.06em]";
  return (
    <span className={`${base} ${toneClass[tone]} ${className}`.trim()}>
      {children}
    </span>
  );
}

type ChipVariant = "outline" | "solid-ink" | "solid-canvas" | "accent" | "live";

const chipVariantClass: Record<ChipVariant, string> = {
  outline:
    "border border-subtle-gray bg-canvas text-charcoal-text",
  "solid-canvas":
    "border border-subtle-gray bg-crisp-white text-charcoal-text",
  "solid-ink": "bg-midnight-ink text-crisp-white",
  accent: "bg-apollo-gold text-midnight-ink",
  live: "border border-subtle-gray bg-crisp-white text-charcoal-text",
};

/**
 * Pill / badge — outline by default. The `live` variant adds the green status
 * dot used in the hero ("Resumo grátis · Sem cadastro").
 */
export function Chip({
  children,
  variant = "outline",
  className = "",
}: {
  children: ReactNode;
  variant?: ChipVariant;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 eyebrow ${chipVariantClass[variant]} ${className}`.trim()}
    >
      {variant === "live" ? (
        <span
          aria-hidden="true"
          className="inline-block h-1.5 w-1.5 rounded-full bg-status-dot"
        />
      ) : null}
      {children}
    </span>
  );
}
