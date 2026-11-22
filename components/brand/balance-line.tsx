import clsx from "clsx";

/**
 * Brend motivi — “Balans chizig‘i”.
 * Muvozanatda: chiziq tekis va markazda yorug‘ nuqta.
 * Xavf yoki xatolik: chiziq nozik egiladi (broken).
 * Harakat yo‘q — bu komponent statik va yengil.
 */
export function BalanceLine({
  className,
  broken = false,
  quiet = false,
  label,
}: {
  className?: string;
  broken?: boolean;
  quiet?: boolean;
  label?: string;
}) {
  return (
    <div
      className={clsx("relative w-full", quiet && "opacity-80", className)}
      aria-hidden={!label}
      role={label ? "img" : undefined}
      aria-label={label}
    >
      <div className="relative flex h-24 items-center justify-center">
        {/* asosiy chiziq */}
        <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 overflow-hidden">
          <div className="h-full w-full bg-[linear-gradient(90deg,transparent,var(--border-strong)_18%,var(--emerald)_50%,var(--border-strong)_82%,transparent)] opacity-70" />
        </div>

        {broken ? (
          <svg
            viewBox="0 0 800 60"
            className="absolute inset-0 h-full w-full"
            fill="none"
            preserveAspectRatio="none"
            aria-hidden
          >
            <path
              d="M0 30h290c22 0 22-16 40-16s16 16 34 16h-6c28 0 28 18 48 18s18-18 44-18h350"
              stroke="var(--emerald)"
              strokeWidth="1.4"
              strokeLinecap="round"
              opacity="0.85"
              vectorEffect="non-scaling-stroke"
            />
            <circle cx="382" cy="30" r="3.4" fill="var(--danger)" />
            <circle cx="382" cy="30" r="10" fill="var(--danger)" opacity="0.16" />
          </svg>
        ) : (
          <div className="relative z-10 grid place-items-center">
            <div className="absolute size-10 rounded-full bg-emerald/20 blur-md" />
            <div className="relative size-2 rounded-full bg-emerald shadow-[0_0_18px_4px_rgba(25,227,166,.55)]" />
          </div>
        )}
      </div>
    </div>
  );
}
