"use client";

import { Check } from "lucide-react";
import { useI18n } from "@/components/providers/i18n-provider";

export function TrustRow() {
  const { dict } = useI18n();

  return (
    <section aria-label={dict.trust.label} className="relative border-y border-[var(--border)]">
      <div className="wrap py-5 sm:py-6">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
          <p className="shrink-0 text-[11.5px] font-medium text-ink/80">{dict.trust.title}</p>
          <ul className="flex flex-wrap gap-x-4 gap-y-2">
            {dict.trust.slots.map((slot) => (
              <li key={slot} className="flex items-center gap-1.5 text-[11.5px] text-muted">
                <span className="grid size-4 place-items-center rounded-full bg-emerald-soft text-emerald-ink">
                  <Check className="size-2.5" aria-hidden />
                </span>
                {slot}
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-2 max-w-[860px] text-[10.5px] leading-relaxed text-muted/80">{dict.trust.note}</p>
      </div>
    </section>
  );
}
