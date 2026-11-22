import clsx from "clsx";

export function BalanceMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden
      className={clsx("size-8", className)}
    >
      <circle cx="16" cy="16" r="14.25" stroke="var(--border-strong)" strokeWidth="1" />
      <path
        d="M12 8.5a7.5 7.5 0 0 0 0 15"
        stroke="url(#bm-left)"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M20 8.5a7.5 7.5 0 0 1 0 15"
        stroke="url(#bm-right)"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="16" cy="16" r="2.6" fill="var(--emerald)" />
      <circle cx="16" cy="16" r="5.2" fill="var(--emerald)" opacity="0.18" />
      <path d="M16 12.8v-4.3M16 23.5v-4.3" stroke="var(--emerald)" strokeWidth="1" opacity="0.5" />
      <defs>
        <linearGradient id="bm-left" x1="12" y1="8" x2="12" y2="24" gradientUnits="userSpaceOnUse">
          <stop stopColor="var(--emerald)" />
          <stop offset="1" stopColor="var(--cyan)" stopOpacity="0.65" />
        </linearGradient>
        <linearGradient id="bm-right" x1="20" y1="8" x2="20" y2="24" gradientUnits="userSpaceOnUse">
          <stop stopColor="var(--violet)" stopOpacity="0.85" />
          <stop offset="1" stopColor="var(--emerald)" stopOpacity="0.7" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function Logo({
  className,
  compact = false,
  label = "BALANS",
}: {
  className?: string;
  compact?: boolean;
  label?: string;
}) {
  return (
    <span className={clsx("inline-flex items-center gap-2.5", className)}>
      <BalanceMark className="size-8 shrink-0" />
      {!compact && (
        <span className="flex items-baseline gap-1.5">
          <span className="font-display text-[17px] font-bold uppercase leading-none tracking-[0.14em] text-ink">
            {label}
          </span>
          <span className="rounded-[5px] bg-emerald-soft px-1.5 py-0.5 text-[10px] font-semibold leading-none tracking-[0.08em] text-emerald-ink">
            AI
          </span>
        </span>
      )}
    </span>
  );
}
