"use client";

import { motion } from "framer-motion";

export function SegmentedSwitch<T extends string>({
  value,
  options,
  onChange,
  label,
  className,
}: {
  value: T;
  options: { value: T; label: string; hint?: string }[];
  onChange: (value: T) => void;
  label: string;
  className?: string;
}) {
  return (
    <div
      role="radiogroup"
      aria-label={label}
      className={`relative inline-flex items-center gap-0.5 rounded-full border border-[var(--border)] bg-[var(--surface)] p-1 ${className ?? ""}`}
    >
      {options.map((option) => {
        const active = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(option.value)}
            className="relative z-10 flex min-h-11 items-center gap-1.5 rounded-full px-4 text-[13px] font-medium transition-colors"
          >
            {active && (
              <motion.span
                layoutId={`segmented-${label}`}
                className="absolute inset-0 -z-10 rounded-full bg-[var(--elevated)] shadow-[inset_0_1px_0_var(--glass-inner)]"
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
              />
            )}
            <span className={active ? "text-ink" : "text-muted"}>{option.label}</span>
            {option.hint && (
              <span
                className={`rounded-full px-1.5 py-0.5 text-[10px] font-semibold leading-none ${
                  active ? "bg-emerald-soft text-emerald-ink" : "bg-[var(--elevated)] text-muted"
                }`}
              >
                {option.hint}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
