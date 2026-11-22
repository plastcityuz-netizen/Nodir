"use client";

import clsx from "clsx";
import { useId, type ComponentProps, type ReactNode } from "react";

export function Field({
  label,
  error,
  hint,
  icon,
  className,
  ...props
}: {
  label: string;
  error?: string;
  hint?: ReactNode;
  icon?: ReactNode;
} & ComponentProps<"input">) {
  const id = useId();
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;

  return (
    <div className={clsx("flex flex-col gap-1.5", className)}>
      <label htmlFor={id} className="text-[12.5px] font-medium text-muted">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" aria-hidden>
            {icon}
          </span>
        )}
        <input
          id={id}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : hint ? hintId : undefined}
          className={clsx(
            "h-12 w-full rounded-xl border bg-[var(--surface)] px-3.5 text-[16px] text-ink outline-none transition placeholder:text-[color-mix(in_srgb,var(--muted)_70%,transparent)] focus:border-emerald/70 focus:ring-4 focus:ring-emerald/10",
            icon ? "pl-10" : "",
            error ? "border-danger/70" : "border-[var(--border)]",
          )}
          {...props}
        />
      </div>
      {error ? (
        <p id={errorId} role="alert" className="flex items-start gap-1.5 text-[12px] text-danger">
          <span aria-hidden>▲</span>
          {error}
        </p>
      ) : hint ? (
        <p id={hintId} className="text-[12px] text-muted">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
