import type { ReactNode } from "react";

type Bg = "canvas" | "white" | "ash" | "midnight";
type Size = "sm" | "md" | "lg";

const bgClass: Record<Bg, string> = {
  canvas: "bg-canvas",
  white: "bg-crisp-white",
  ash: "bg-ash-gray",
  midnight: "bg-midnight-ink",
};

const sizeClass: Record<Size, string> = {
  sm: "py-section-sm",
  md: "py-section-md",
  lg: "py-section-lg",
};

type Props = {
  children: ReactNode;
  bg?: Bg;
  size?: Size;
  /** Hairline bottom separator. Defaults to true on light surfaces. */
  bordered?: boolean;
  className?: string;
  id?: string;
};

/**
 * Page-level section wrapper. One vertical rhythm (sm/md/lg), one of four
 * backgrounds, one optional bottom border. Direct children should compose
 * with `<Container>` for inner width.
 */
export function Section({
  children,
  bg = "canvas",
  size = "md",
  bordered,
  className = "",
  id,
}: Props) {
  const showBorder = bordered ?? bg !== "midnight";
  const borderClass = showBorder
    ? bg === "midnight"
      ? "border-b border-midnight-ink"
      : "border-b border-subtle-gray"
    : "";
  return (
    <section
      id={id}
      className={`${bgClass[bg]} ${sizeClass[size]} ${borderClass} ${className}`.trim()}
    >
      {children}
    </section>
  );
}
