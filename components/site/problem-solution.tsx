"use client";

import { ArrowRight, Check, Minus, X } from "lucide-react";
import { useI18n } from "@/components/providers/i18n-provider";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function ProblemSolution() {
  const { dict } = useI18n();

  return (
    <section id="yechimlar" className="section relative">
      <div className="wrap">
        <Reveal>
          <SectionHeading eyebrow={dict.problem.eyebrow} title={dict.problem.title} sub={dict.problem.sub} />
        </Reveal>

        <div className="mt-10 grid gap-4 lg:mt-14 lg:grid-cols-[1fr_auto_1fr] lg:items-stretch lg:gap-5">
          <Reveal delay={0.05}>
            <div className="relative h-full overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-7">
              <div className="flex items-baseline justify-between gap-3">
                <div>
                  <h3 className="t-h3 text-ink">{dict.problem.beforeTitle}</h3>
                  <p className="mt-1 text-[12.5px] text-muted">{dict.problem.beforeSub}</p>
                </div>
                <span className="rounded-full border border-danger/25 bg-[color-mix(in_srgb,var(--danger)_8%,transparent)] px-2 py-1 text-[10px] font-medium text-danger">
                  {dict.problem.beforeItems.length} ×
                </span>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-2.5">
                {dict.problem.beforeItems.map((item, index) => (
                  <div
                    key={item.title}
                    className="relative rounded-xl border border-dashed border-[var(--border-strong)] bg-[color-mix(in_srgb,var(--elevated)_40%,transparent)] p-3"
                    style={{ transform: `rotate(${[-1.4, 1.2, -0.8, 1.6][index] ?? 0}deg)` }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="grid size-6 place-items-center rounded-md bg-[color-mix(in_srgb,var(--danger)_10%,transparent)] text-danger">
                        <X className="size-3" aria-hidden />
                      </span>
                      <span className="text-[13px] font-medium text-ink">{item.title}</span>
                    </div>
                    <p className="mt-2 text-[10.5px] leading-snug text-muted">{item.note}</p>
                    <span className="absolute -right-1.5 -top-1.5 grid size-4 place-items-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[8px] text-muted">
                      ?
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-4 flex items-center gap-1.5 text-[10.5px] text-muted">
                <span className="h-px w-4 bg-danger/50" aria-hidden />
                {dict.problem.compareHead[0]}
              </p>
            </div>
          </Reveal>

          <div className="hidden items-center justify-center lg:flex">
            <span className="grid size-10 place-items-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-muted">
              <ArrowRight className="size-4" aria-hidden />
            </span>
          </div>

          <Reveal delay={0.12}>
            <div className="relative h-full overflow-hidden rounded-2xl border border-emerald/25 bg-[linear-gradient(160deg,color-mix(in_srgb,var(--emerald)_8%,var(--surface)),var(--surface)_55%)] p-5 sm:p-7">
              <div
                className="pointer-events-none absolute -right-10 -top-10 size-48 rounded-full opacity-40 blur-3xl"
                style={{ background: "radial-gradient(circle,rgba(25,227,166,.5),transparent 70%)" }}
                aria-hidden
              />
              <div className="flex items-baseline justify-between gap-3">
                <div>
                  <h3 className="t-h3 text-ink">{dict.problem.afterTitle}</h3>
                  <p className="mt-1 text-[12.5px] text-muted">{dict.problem.afterSub}</p>
                </div>
                <span className="rounded-full border border-emerald/30 bg-emerald-soft px-2 py-1 text-[10px] font-medium text-emerald-ink">
                  1 ×
                </span>
              </div>

              <div className="mt-6 space-y-2">
                {dict.problem.afterItems.map((item) => (
                  <div
                    key={item.title}
                    className="flex items-start gap-3 rounded-xl border border-[var(--border)] bg-[color-mix(in_srgb,var(--elevated)_50%,transparent)] p-3"
                  >
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-emerald-soft text-emerald-ink">
                      <Check className="size-3" aria-hidden />
                    </span>
                    <div>
                      <div className="text-[13px] font-medium text-ink">{item.title}</div>
                      <p className="mt-0.5 text-[10.5px] leading-snug text-muted">{item.note}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center gap-2 text-[10.5px] text-emerald-ink">
                <span className="h-px w-4 bg-emerald/60" aria-hidden />
                {dict.problem.compareHead[1]}
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.08}>
          <div className="mt-4 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
            <div className="grid grid-cols-[1.1fr_1fr_1fr] gap-2 border-b border-[var(--border)] px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.1em] text-muted sm:px-5 sm:text-[10.5px]">
              <span>{dict.problem.eyebrow}</span>
              <span className="flex items-center gap-1.5">
                <Minus className="size-3" aria-hidden />
                {dict.problem.compareHead[0]}
              </span>
              <span className="flex items-center gap-1.5 text-emerald-ink">
                <Check className="size-3" aria-hidden />
                {dict.problem.compareHead[1]}
              </span>
            </div>
            <ul>
              {dict.problem.compare.map((row) => (
                <li
                  key={row.label}
                  className="grid grid-cols-[1.1fr_1fr_1fr] gap-2 border-b border-[var(--border)] px-4 py-3 text-[12px] last:border-0 sm:px-5 sm:text-[13px]"
                >
                  <span className="font-medium text-ink">{row.label}</span>
                  <span className="text-muted">{row.old}</span>
                  <span className="flex items-start gap-1.5 text-ink/90">
                    <Check className="mt-0.5 size-3 shrink-0 text-emerald-ink" aria-hidden />
                    {row.next}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
