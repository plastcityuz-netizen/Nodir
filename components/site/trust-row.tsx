"use client";

import { useI18n } from "@/components/providers/i18n-provider";

const shapes = [
  "M4 16 L12 4 L20 16 Z",
  "M4 8 h16 M4 16 h16",
  "M6 6 h12 v12 H6 Z",
  "M12 4 a8 8 0 1 0 0 16 a8 8 0 1 0 0-16",
  "M4 16 L12 8 L20 16 L12 20 Z",
];

export function TrustRow() {
  const { dict } = useI18n();

  return (
    <section aria-label={dict.trust.label} className="relative border-y border-[var(--border)]">
      <div className="wrap py-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-10">
          <div className="shrink-0">
            <div className="flex items-center gap-2">
              <span className="t-eyebrow text-muted">{dict.trust.label}</span>
              <span className="rounded border border-warning/30 bg-[color-mix(in_srgb,var(--warning)_10%,transparent)] px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-warning">
                TODO
              </span>
            </div>
            <p className="mt-1 max-w-[260px] text-[12px] leading-snug text-ink/80">{dict.trust.title}</p>
          </div>

          <div className="flex-1 overflow-x-auto no-scrollbar">
            <ul className="flex min-w-max items-center gap-2.5">
              {dict.trust.slots.map((slot, index) => (
                <li
                  key={slot}
                  title={`TODO: ${slot}`}
                  className="flex items-center gap-2 rounded-lg border border-dashed border-[var(--border-strong)] px-3 py-2 opacity-70 transition-opacity hover:opacity-100"
                >
                  <svg viewBox="0 0 24 24" className="size-4 text-muted" fill="none" aria-hidden>
                    <path
                      d={shapes[index % shapes.length]}
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="text-[11.5px] text-muted">{slot}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-3 max-w-[860px] text-[10.5px] leading-relaxed text-muted/80">{dict.trust.note}</p>
      </div>
    </section>
  );
}
