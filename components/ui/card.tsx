import type { ElementType, ReactNode } from "react";

type Variant = "default" | "elevated" | "callout" | "compact";

const variantClass: Record<Variant, string> = {
  // White surface, subtle hairline, 24px padding, 8px radius. The default
  // content card per DESIGN.md.
  default:
    "rounded-lg border border-subtle-gray bg-crisp-white p-card",
  // Canvas surface, no border, 40px padding. For hero / pricing / premium
  // banners.
  elevated: "rounded-lg bg-canvas p-card-elevated",
  // Ash background, 12px radius, no padding (consumer controls inner layout).
  callout: "rounded-xl bg-ash-gray",
  // Dense surfaces — list rows, sidebar items. 16px padding.
  compact:
    "rounded-lg border border-subtle-gray bg-crisp-white p-card-compact",
};

type Props<T extends ElementType> = {
  as?: T;
  variant?: Variant;
  children: ReactNode;
  className?: string;
  id?: string;
};

/**
 * Card primitive. Three padding tiers, three surfaces — that's it. If a card
 * doesn't fit one of these, fix the design rather than adding a new variant.
 */
export function Card<T extends ElementType = "div">({
  as,
  variant = "default",
  children,
  className = "",
  id,
}: Props<T>) {
  const Tag = (as ?? "div") as ElementType;
  return (
    <Tag id={id} className={`${variantClass[variant]} ${className}`.trim()}>
      {children}
    </Tag>
  );
}
