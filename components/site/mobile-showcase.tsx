"use client";

import {
  BarChart3,
  Box,
  Check,
  Home,
  MoreHorizontal,
  Smartphone,
  Sparkles,
  Wallet,
} from "lucide-react";
import type { CSSProperties } from "react";
import { useI18n } from "@/components/providers/i18n-provider";
import { AreaChart, Sparkline } from "@/components/dashboard/charts";
import { BalanceMark } from "@/components/brand/logo";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { KPI, SALES_TREND } from "@/lib/mock/demo";
import { money } from "@/lib/format";

const darkVars = {
  "--bg": "#060A12",
  "--surface": "#0D1422",
  "--elevated": "#131C2E",
  "--border": "rgba(255,255,255,.08)",
  "--border-strong": "rgba(255,255,255,.14)",
  "--text": "#EAF0FA",
  "--muted": "#8B97AD",
  "--emerald": "#19E3A6",
  "--emerald-fill": "#19E3A6",
  "--emerald-ink": "#19E3A6",
  "--emerald-soft": "rgba(25,227,166,.12)",
  "--violet": "#7C5CFF",
  "--cyan": "#2DD4FF",
  "--success": "#22C55E",
  "--warning": "#FFB020",
  "--danger": "#FF5C7A",
  "--info": "#38BDF8",
} as CSSProperties;

const tabIcons = [Home, BarChart3, Sparkles, Box, Wallet];

export function MobileShowcase() {
  const { dict, lang } = useI18n();

  return (
    <section className="section relative overflow-hidden">
      <div className="wrap">
        <div className="grid gap-10 lg:grid-cols-[1fr_.85fr] lg:items-center lg:gap-16">
          <div>
            <Reveal>
              <SectionHeading eyebrow={dict.mobile.eyebrow} title={dict.mobile.title} sub={dict.mobile.sub} />
            </Reveal>
            <Reveal delay={0.08}>
              <ul className="mt-7 grid gap-2.5 sm:grid-cols-2">
                {dict.mobile.points.map((point) => (
                  <li key={point} className="flex items-start gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 py-2.5 text-[12px] text-ink/85">
                    <span className="mt-0.5 grid size-4 shrink-0 place-items-center rounded-full bg-emerald-soft text-emerald-ink">
                      <Check className="size-2.5" aria-hidden />
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald/25 bg-emerald-soft px-2.5 py-1 text-[10.5px] font-medium text-emerald-ink">
                  <Smartphone className="size-3" aria-hidden />
                  PWA
                </span>
                <span className="rounded-full border border-[var(--border)] px-2.5 py-1 text-[10.5px] text-muted">
                  {dict.mobile.note}
                </span>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.05}>
            <div className="relative mx-auto w-[286px] max-w-full sm:w-[310px]">
              <div
                className="pointer-events-none absolute inset-0 -z-10 scale-110 rounded-full opacity-50 blur-3xl"
                style={{ background: "radial-gradient(circle,rgba(25,227,166,.25),transparent 65%)" }}
                aria-hidden
              />
              <div className="rounded-[40px] border-[7px] border-[#1b2433] bg-[#070b13] shadow-float">
                <div className="relative overflow-hidden rounded-[33px]" style={darkVars}>
                  <div className="absolute left-1/2 top-2 z-20 h-[18px] w-[86px] -translate-x-1/2 rounded-full bg-[#070b13]" aria-hidden />
                  <div className="bg-bg px-3 pb-16 pt-8 text-ink">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <BalanceMark className="size-5" />
                        <span className="text-[8px] font-semibold uppercase tracking-[0.14em]">
                          {dict.mobile.phoneTitle}
                        </span>
                      </div>
                      <span className="grid size-6 place-items-center rounded-full bg-emerald-soft text-[8px] font-semibold text-emerald-ink">
                        SN
                      </span>
                    </div>

                    <div className="mt-3 rounded-2xl border border-emerald/20 bg-[linear-gradient(150deg,rgba(25,227,166,.16),rgba(25,227,166,.03))] p-3">
                      <div className="text-[8px] uppercase tracking-[0.1em] text-muted">{dict.mobile.phoneProfit}</div>
                      <div className="mt-1 flex items-baseline gap-1">
                        <span className="font-display text-[22px] font-semibold leading-none num">
                          {(KPI.profit / 1_000_000).toFixed(1).replace(".", ",")}
                        </span>
                        <span className="text-[9px] text-muted">{dict.mock.mln}</span>
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-[8px] text-success num">▲ 12,4%</span>
                        <Sparkline values={SALES_TREND.map((item) => item.profit)} width={70} height={20} />
                      </div>
                    </div>

                    <div className="mt-2 grid grid-cols-2 gap-2">
                      <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-2">
                        <div className="text-[8px] text-muted">{dict.mobile.phoneCash}</div>
                        <div className="mt-0.5 text-[11px] font-semibold num">
                          {money(KPI.cash, lang, { compact: true })}
                        </div>
                      </div>
                      <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-2">
                        <div className="text-[8px] text-muted">{dict.mobile.phoneDebt}</div>
                        <div className="mt-0.5 text-[11px] font-semibold num">
                          {money(KPI.receivable, lang, { compact: true })}
                        </div>
                      </div>
                    </div>

                    <div className="mt-2 rounded-xl border border-violet/25 bg-[color-mix(in_srgb,var(--violet)_10%,transparent)] p-2.5">
                      <div className="flex items-center gap-1 text-[8px] font-semibold uppercase tracking-[0.08em]">
                        <Sparkles className="size-2.5 text-[var(--violet)]" aria-hidden />
                        {dict.mobile.phoneAi}
                      </div>
                      <p className="mt-1 text-[9px] leading-snug text-ink/85">{dict.mobile.phoneAiText}</p>
                    </div>

                    <div className="mt-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-2">
                      <AreaChart
                        values={[412, 428, 421, 447, 438, 461, 455, 472, 466, 486]}
                        height={48}
                        id="phone-cash"
                        showGrid={false}
                        strokeWidth={1.5}
                      />
                    </div>
                  </div>

                  <div className="absolute inset-x-0 bottom-0 border-t border-[var(--border)] bg-[color-mix(in_srgb,var(--surface)_92%,transparent)] px-2 pb-2 pt-1.5 backdrop-blur-md">
                    <div className="flex items-center justify-between">
                      {dict.mobile.tabs.map((tab, index) => {
                        const Icon = tabIcons[index] ?? MoreHorizontal;
                        const active = index === 0;
                        return (
                          <span
                            key={tab}
                            className={`flex flex-1 flex-col items-center gap-0.5 rounded-lg py-1 ${
                              active ? "text-[var(--emerald)]" : "text-[var(--muted)]"
                            }`}
                          >
                            <Icon className="size-3.5" aria-hidden />
                            <span className="text-[6.5px]">{tab}</span>
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -right-6 top-16 hidden rotate-3 rounded-xl border border-[var(--glass-border)] bg-[var(--glass-solid)] px-2.5 py-1.5 text-[9px] text-ink shadow-float backdrop-blur-md sm:block">
                {dict.common.demoData}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
