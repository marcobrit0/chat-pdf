import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "secondary-on-dark";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors disabled:opacity-60 disabled:cursor-not-allowed";

const variantClass: Record<Variant, string> = {
  primary:
    "border border-apollo-gold bg-apollo-gold text-midnight-ink hover:opacity-90",
  secondary:
    "border border-midnight-ink text-midnight-ink hover:bg-midnight-ink hover:text-crisp-white",
  ghost: "text-faded-stone hover:text-midnight-ink",
  "secondary-on-dark":
    "border border-crisp-white text-crisp-white hover:bg-crisp-white hover:text-midnight-ink",
};

const sizeClass: Record<Size, string> = {
  sm: "px-3 py-2 text-body-sm",
  md: "px-4 py-3 text-body-sm",
  lg: "px-6 py-4 text-body",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type ButtonProps = CommonProps &
  Omit<ComponentProps<"button">, keyof CommonProps>;

type LinkProps = CommonProps &
  Omit<ComponentProps<typeof Link>, keyof CommonProps>;

/** Plain `<button>` flavor. */
export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`${base} ${variantClass[variant]} ${sizeClass[size]} ${className}`.trim()}
      {...rest}
    >
      {children}
    </button>
  );
}

/** `<Link>` flavor — same visual variants, anchor semantics. */
export function ButtonLink({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...rest
}: LinkProps) {
  return (
    <Link
      className={`${base} ${variantClass[variant]} ${sizeClass[size]} ${className}`.trim()}
      {...rest}
    >
      {children}
    </Link>
  );
}
