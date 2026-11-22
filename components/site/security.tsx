"use client";

import { DatabaseBackup, KeyRound, Lock, ScrollText, ShieldCheck, UserCheck } from "lucide-react";
import { useI18n } from "@/components/providers/i18n-provider";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

const icons = [Lock, ShieldCheck, ScrollText, DatabaseBackup, KeyRound, UserCheck];

export function Security() {
  const { dict } = useI18n();

  return (
    <section className="section relative">
      <div className="wrap">
        <Reveal>
          <SectionHeading eyebrow={dict.security.eyebrow} title={dict.security.title} sub={dict.security.sub} />
        </Reveal>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3">
          {dict.security.items.map((item, index) => {
            const Icon = icons[index] ?? Lock;
            return (
              <Reveal key={item.title} delay={Math.min(index * 0.05, 0.25)}>
                <div className="flex h-full items-start gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 transition-colors hover:border-emerald/25">
                  <span className="grid size-9 shrink-0 place-items-center rounded-xl border border-emerald/20 bg-emerald-soft text-emerald-ink">
                    <Icon className="size-4" aria-hidden />
                  </span>
                  <div>
                    <h3 className="text-[13px] font-semibold text-ink">{item.title}</h3>
                    <p className="mt-1 text-[11.5px] leading-relaxed text-muted">{item.text}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-4 flex max-w-[880px] items-start gap-2 rounded-xl border border-[var(--border)] bg-[color-mix(in_srgb,var(--elevated)_40%,transparent)] px-3.5 py-3 text-[10.5px] leading-relaxed text-muted">
            <ShieldCheck className="mt-px size-3.5 shrink-0 text-emerald-ink" aria-hidden />
            {dict.security.note}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
