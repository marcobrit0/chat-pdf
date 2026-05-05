import type { ElementType, ReactNode } from "react";

type Props<T extends ElementType> = {
  as?: T;
  children: ReactNode;
  className?: string;
};

/**
 * Page-width wrapper — `mx-auto w-full max-w-[1240px] px-8`. Use on every
 * top-level section so margins line up across pages.
 */
export function Container<T extends ElementType = "div">({
  as,
  children,
  className = "",
}: Props<T>) {
  const Tag = (as ?? "div") as ElementType;
  return <Tag className={`container-page ${className}`.trim()}>{children}</Tag>;
}
