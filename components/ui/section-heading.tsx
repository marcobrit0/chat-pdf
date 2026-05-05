import type { ReactNode } from "react";

import { Eyebrow } from "@/components/ui/labels";

type Align = "start" | "center";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  cta?: ReactNode;
  align?: Align;
  /** Width clamp for the title block. Defaults to a wide measure. */
  maxWidth?: "narrow" | "default" | "wide" | "none";
  /** Color overrides for dark sections. */
  tone?: "ink" | "white";
  /** Eyebrow color override. Defaults to muted on light, white on dark. */
  eyebrowTone?: "muted" | "accent" | "white";
  className?: string;
};

const titleMax: Record<NonNullable<Props["maxWidth"]>, string> = {
  narrow: "max-w-[540px]",
  default: "max-w-[640px]",
  wide: "max-w-[880px]",
  none: "",
};

/**
 * Eyebrow + h2 + optional CTA. The exact pattern repeated five times on the
 * home page (sections "Como funciona", "Casos de uso", "PDFIA vs alternativas",
 * "Preço", "Perguntas frequentes", final CTA).
 *
 * The h2 binds to `text-heading-lg` (48px) with fluid clamp down to 32px so it
 * scales gracefully on small screens without per-instance arbitrary classes.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  cta,
  align = "start",
  maxWidth = "default",
  tone = "ink",
  eyebrowTone,
  className = "",
}: Props) {
  const titleColor = tone === "white" ? "text-crisp-white" : "text-midnight-ink";
  const descColor = tone === "white" ? "text-soft-stone" : "text-charcoal-text";
  const resolvedEyebrowTone =
    eyebrowTone ?? (tone === "white" ? "white" : "muted");

  const headingBlock = (
    <div className={`${titleMax[maxWidth]} ${align === "center" ? "mx-auto text-center" : ""}`.trim()}>
      {eyebrow ? <Eyebrow tone={resolvedEyebrowTone}>{eyebrow}</Eyebrow> : null}
      <h2
        className={`mt-3.5 font-display text-heading-lg font-semibold ${titleColor} text-[clamp(32px,4vw,48px)]`.trim()}
      >
        {title}
      </h2>
      {description ? (
        <p className={`mt-4 text-body-lg ${descColor}`.trim()}>{description}</p>
      ) : null}
    </div>
  );

  if (!cta) {
    return <div className={className}>{headingBlock}</div>;
  }

  return (
    <div
      className={`flex flex-col gap-6 md:flex-row md:items-end md:justify-between ${className}`.trim()}
    >
      {headingBlock}
      <div className="self-start md:self-end">{cta}</div>
    </div>
  );
}
