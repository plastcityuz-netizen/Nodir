import clsx from "clsx";
import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

export type ButtonVariant = "primary" | "glass" | "ghost" | "outline" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

const base =
  "group relative inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-xl font-medium transition-[transform,background-color,border-color,color,box-shadow] duration-300 ease-balans disabled:pointer-events-none disabled:opacity-50 active:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-emerald";

const sizes: Record<ButtonSize, string> = {
  sm: "h-11 px-3.5 text-[13px] rounded-lg",
  md: "h-11 px-5 text-sm",
  lg: "min-h-[52px] px-6 text-[15px]",
};

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-emerald-fill text-[#04130E] shadow-[0_14px_38px_-14px_rgba(25,227,166,.55)] hover:shadow-[0_18px_50px_-12px_rgba(25,227,166,.65)] hover:brightness-[1.06]",
  glass:
    "glass text-ink hover:border-[var(--border-strong)] hover:bg-[color-mix(in_srgb,var(--surface)_70%,transparent)]",
  ghost: "text-ink/90 hover:bg-[var(--elevated)] hover:text-ink",
  outline:
    "border border-[var(--border-strong)] text-ink hover:border-emerald hover:text-emerald-ink bg-transparent",
  danger: "bg-danger text-white hover:brightness-110",
};

export function buttonStyles({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
} = {}): string {
  return clsx(base, sizes[size], variants[variant], className);
}

type CommonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  className?: string;
};

export function Button({
  variant,
  size,
  className,
  children,
  ...props
}: CommonProps & ComponentProps<"button">) {
  return (
    <button className={buttonStyles({ variant, size, className })} {...props}>
      {children}
    </button>
  );
}

export function ButtonLink({
  variant,
  size,
  className,
  children,
  ...props
}: CommonProps & ComponentProps<typeof Link>) {
  return (
    <Link className={buttonStyles({ variant, size, className })} {...props}>
      {children}
    </Link>
  );
}

export function ArrowRight({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      className={clsx("size-4 transition-transform duration-300 ease-balans group-hover:translate-x-0.5", className)}
    >
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
