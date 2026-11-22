import clsx from "clsx";
import type { ReactNode } from "react";

const tones = {
  emerald: "border-emerald/25 bg-emerald-soft text-emerald-ink",
  muted: "border-[var(--border)] bg-[var(--elevated)] text-muted",
  violet: "border-violet/30 bg-[color-mix(in_srgb,var(--violet)_12%,transparent)] text-[var(--violet)]",
  warning: "border-warning/30 bg-[color-mix(in_srgb,var(--warning)_12%,transparent)] text-warning",
  danger: "border-danger/30 bg-[color-mix(in_srgb,var(--danger)_12%,transparent)] text-danger",
  info: "border-info/30 bg-[color-mix(in_srgb,var(--info)_12%,transparent)] text-info",
} as const;

export function Badge({
  children,
  tone = "muted",
  className,
  dot = false,
}: {
  children: ReactNode;
  tone?: keyof typeof tones;
  className?: string;
  dot?: boolean;
}) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium leading-none tracking-[0.01em]",
        tones[tone],
        className,
      )}
    >
      {dot && <span className="size-1.5 rounded-full bg-current" aria-hidden />}
      {children}
    </span>
  );
}
