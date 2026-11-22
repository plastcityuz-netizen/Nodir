"use client";

import { Check, Factory as FactoryIcon, Gauge, PackageSearch, TriangleAlert } from "lucide-react";
import { useI18n } from "@/components/providers/i18n-provider";
import { AreaChart } from "@/components/dashboard/charts";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { DEFECT_TREND } from "@/lib/mock/demo";

export function Factory() {
  const { dict } = useI18n();

  return (
    <section className="section relative">
      <div className="wrap">
        <div className="relative overflow-hidden rounded-3xl border border-[var(--border)] bg-[linear-gradient(155deg,var(--surface),color-mix(in_srgb,var(--surface)_70%,var(--bg)))] p-5 sm:p-8 lg:p-10">
          <div
            className="pointer-events-none absolute -right-20 top-0 h-[420px] w-[420px] rounded-full opacity-30 blur-[100px]"
            style={{ background: "radial-gradient(circle,rgba(45,212,255,.35),transparent 70%)" }}
            aria-hidden
          />
          <div className="grid gap-8 lg:grid-cols-[.92fr_1.08fr] lg:items-center lg:gap-12">
            <div>
              <Reveal>
                <SectionHeading
                  eyebrow={dict.factory.eyebrow}
                  title={dict.factory.title}
                  sub={dict.factory.sub}
                />
              </Reveal>
              <Reveal delay={0.08}>
                <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                  {dict.factory.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2 text-[12px] leading-snug text-ink/85">
                      <span className="mt-0.5 grid size-4 shrink-0 place-items-center rounded-full bg-emerald-soft text-emerald-ink">
                        <Check className="size-2.5" aria-hidden />
                      </span>
                      {bullet}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-[10px] text-muted">{dict.factory.note}</p>
              </Reveal>
            </div>

            <Reveal delay={0.1}>
              <div className="glass rounded-2xl p-3 sm:p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="grid size-8 place-items-center rounded-lg bg-[color-mix(in_srgb,var(--cyan)_12%,transparent)] text-[var(--cyan)]">
                      <FactoryIcon className="size-4" aria-hidden />
                    </span>
                    <div>
                      <div className="text-[12px] font-semibold text-ink">{dict.factory.bomTitle}</div>
                      <div className="text-[9.5px] text-muted">{dict.factory.bomSub}</div>
                    </div>
                  </div>
                  <span className="rounded border border-[var(--border)] px-1.5 py-0.5 text-[8.5px] text-muted">BOM</span>
                </div>

                <div className="mt-3 overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)]">
                  <div className="grid grid-cols-[1.3fr_.8fr_.7fr] gap-2 border-b border-[var(--border)] px-2.5 py-1.5 text-[8.5px] uppercase tracking-[0.1em] text-muted">
                    <span>{dict.modules.items.production.title}</span>
                    <span className="text-right">{dict.mock.qty}</span>
                    <span className="text-right">{dict.mock.sum}</span>
                  </div>
                  {dict.factory.rows.map((row) => (
                    <div
                      key={row.name}
                      className="grid grid-cols-[1.3fr_.8fr_.7fr] gap-2 border-b border-[var(--border)] px-2.5 py-1.5 text-[10px] last:border-0"
                    >
                      <span className="truncate text-ink/85">{row.name}</span>
                      <span className="text-right text-muted num">{row.qty}</span>
                      <span className="text-right text-ink num">{row.cost}</span>
                    </div>
                  ))}
                  <div className="flex items-center justify-between bg-[color-mix(in_srgb,var(--elevated)_60%,transparent)] px-2.5 py-2">
                    <span className="text-[10px] font-medium text-ink">{dict.factory.totalLabel}</span>
                    <span className="text-[11.5px] font-semibold text-emerald-ink num">{dict.factory.total}</span>
                  </div>
                </div>

                <div className="mt-2.5 grid grid-cols-3 gap-1.5">
                  {dict.factory.metrics.map((metric, index) => {
                    const Icon = [TriangleAlert, PackageSearch, Gauge][index] ?? Gauge;
                    return (
                      <div key={metric.label} className="rounded-xl border border-[var(--border)] bg-[var(--surface)] px-2.5 py-2">
                        <div className="flex items-center gap-1 text-[8.5px] text-muted">
                          <Icon className="size-2.5" aria-hidden />
                          {metric.label}
                        </div>
                        <div className="mt-0.5 text-[12px] font-semibold text-ink num">{metric.value}</div>
                        <div className="text-[8px] text-muted">{metric.note}</div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-2.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-2.5">
                  <div className="flex items-center justify-between text-[9px] text-muted">
                    <span>{dict.factory.chartTitle}</span>
                    <span className="text-emerald-ink num">1,8%</span>
                  </div>
                  <AreaChart
                    values={DEFECT_TREND}
                    height={46}
                    id="factory-defect"
                    tone="cyan"
                    showGrid={false}
                    className="mt-1"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
