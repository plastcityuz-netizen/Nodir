"use client";

import clsx from "clsx";
import {
  ArrowUpRight,
  Bell,
  ChevronDown,
  Command,
  Search,
  Sparkles,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { useI18n } from "@/components/providers/i18n-provider";
import { CountUp } from "@/components/ui/count-up";
import { AreaChart, ScoreGauge, Sparkline } from "@/components/dashboard/charts";
import { CASH_FLOW, KPI, SALES_TREND } from "@/lib/mock/demo";
import { formatPercent, money } from "@/lib/format";
import { BalanceMark } from "@/components/brand/logo";

function Delta({ value, invert = false }: { value: number; invert?: boolean }) {
  const positive = invert ? value < 0 : value > 0;
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1 text-[10px] font-medium num",
        positive ? "text-success" : "text-danger",
      )}
    >
      {value > 0 ? <TrendingUp className="size-3" aria-hidden /> : <TrendingDown className="size-3" aria-hidden />}
      {formatPercent(value)}
    </span>
  );
}

export function DashboardPreview({
  className,
  showFloating = true,
}: {
  className?: string;
  showFloating?: boolean;
}) {
  const { dict, lang } = useI18n();
  const cashValues = CASH_FLOW.map((point) => point.value);

  return (
    <div className={clsx("relative", className)}>
      <div
        className="pointer-events-none absolute -inset-6 -z-10 opacity-70 blur-2xl"
        style={{
          background:
            "radial-gradient(60% 55% at 30% 20%, rgba(25,227,166,.18), transparent 70%), radial-gradient(55% 50% at 85% 80%, rgba(124,92,255,.16), transparent 70%)",
        }}
        aria-hidden
      />
      <div className="glass relative rounded-[22px] p-1.5 shadow-float sm:rounded-[26px] sm:p-2">
        <div className="overflow-hidden rounded-[17px] border border-[var(--border)] bg-[color-mix(in_srgb,var(--surface)_94%,transparent)] sm:rounded-[20px]">
          {/* ilova sarlavhasi */}
          <div className="flex items-center justify-between gap-2 border-b border-[var(--border)] px-2.5 py-2 sm:px-3.5 sm:py-2.5">
            <div className="flex min-w-0 items-center gap-2">
              <BalanceMark className="size-5 shrink-0" />
              <span className="truncate text-[10.5px] font-semibold uppercase tracking-[0.1em] text-ink">
                {dict.hero.dashCompany}
              </span>
              <span className="hidden items-center gap-1 rounded-md border border-[var(--border)] bg-[var(--elevated)] px-1.5 py-0.5 text-[9px] text-muted sm:inline-flex">
                {dict.hero.dashPeriod}
                <ChevronDown className="size-2.5" aria-hidden />
              </span>
            </div>
            <div className="flex shrink-0 items-center gap-1.5">
              <span className="hidden items-center gap-1.5 rounded-md border border-[var(--border)] px-2 py-1 text-[9px] text-muted md:flex">
                <Search className="size-3" aria-hidden />
                {dict.nav.search}
                <span className="flex items-center gap-0.5 rounded border border-[var(--border)] px-1 py-px text-[8px]">
                  <Command className="size-2" aria-hidden />K
                </span>
              </span>
              <span className="relative grid size-6 place-items-center rounded-md border border-[var(--border)] text-muted">
                <Bell className="size-3" aria-hidden />
                <span className="absolute right-1 top-1 size-1 rounded-full bg-emerald" aria-hidden />
              </span>
              <span className="grid size-6 place-items-center rounded-full bg-emerald-soft text-[9px] font-semibold text-emerald-ink">
                SN
              </span>
            </div>
          </div>

          <div className="grid gap-1.5 p-1.5 sm:grid-cols-2 sm:gap-2 sm:p-2.5">
            {/* chap ustun */}
            <div className="flex flex-col gap-1.5 sm:gap-2">
              <div className="relative overflow-hidden rounded-xl border border-emerald/20 bg-[linear-gradient(150deg,color-mix(in_srgb,var(--emerald)_14%,transparent),color-mix(in_srgb,var(--emerald)_4%,transparent))] p-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-muted">
                    {dict.hero.kpiProfit}
                  </span>
                  <Delta value={KPI.profitDelta} />
                </div>
                <div className="mt-2 flex items-baseline gap-1.5">
                  <CountUp
                    value={KPI.profit / 1_000_000}
                    format={(value) => value.toFixed(1).replace(".", ",")}
                    className="font-display text-[26px] font-semibold leading-none tracking-tight text-ink num sm:text-[30px]"
                  />
                  <span className="text-[12px] font-medium text-muted">{dict.mock.mln}</span>
                </div>
                <div className="mt-2 flex items-end justify-between gap-2">
                  <span className="text-[9px] leading-tight text-muted">{dict.hero.kpiDelta}</span>
                  <Sparkline values={SALES_TREND.map((item) => item.profit)} />
                </div>
              </div>

              <div className="hidden grid-cols-2 gap-1.5 sm:grid sm:gap-2">
                <div className="rounded-xl border border-[var(--border)] bg-[color-mix(in_srgb,var(--elevated)_60%,transparent)] p-2.5">
                  <span className="text-[9px] uppercase tracking-[0.1em] text-muted">{dict.hero.kpiRevenue}</span>
                  <div className="mt-1.5 text-[13px] font-semibold text-ink num">
                    {money(KPI.revenue, lang, { compact: true, decimals: 2 })}
                  </div>
                  <Delta value={KPI.revenueDelta} />
                </div>
                <div className="rounded-xl border border-[var(--border)] bg-[color-mix(in_srgb,var(--elevated)_60%,transparent)] p-2.5">
                  <span className="text-[9px] uppercase tracking-[0.1em] text-muted">{dict.hero.kpiCash}</span>
                  <div className="mt-1.5 text-[13px] font-semibold text-ink num">
                    {money(KPI.cash, lang, { compact: true })}
                  </div>
                  <Delta value={KPI.cashDelta} />
                </div>
              </div>

              <div className="hidden items-center justify-between rounded-xl border border-[var(--border)] px-2.5 py-2 sm:flex">
                <span className="text-[9px] text-muted">{dict.mock.vat} · 25.11.2026</span>
                <span className="text-[10px] font-medium text-warning num">{money(18_400_000, lang, { compact: true })}</span>
              </div>
            </div>

            {/* o‘ng ustun */}
            <div className="flex flex-col gap-1.5 sm:gap-2">
              <div className="rounded-xl border border-[var(--border)] bg-[color-mix(in_srgb,var(--elevated)_40%,transparent)] p-2.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-medium text-ink">{dict.hero.chartTitle}</span>
                  <div className="flex items-center gap-0.5 rounded-md border border-[var(--border)] p-0.5 text-[8px]">
                    <span className="rounded bg-emerald-soft px-1 py-0.5 font-medium text-emerald-ink">30</span>
                    <span className="px-1 py-0.5 text-muted">90</span>
                    <span className="px-1 py-0.5 text-muted">365</span>
                  </div>
                </div>
                <div className="mt-2">
                  <AreaChart values={cashValues} height={78} id="hero-cash" strokeWidth={1.8} />
                </div>
                <div className="mt-1 flex items-center justify-between text-[8.5px] text-muted num">
                  <span>01.11</span>
                  <span>10.11</span>
                  <span>20.11</span>
                  <span className="text-emerald-ink">{money(KPI.cash, lang, { compact: true })}</span>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-xl border border-violet/20 bg-[linear-gradient(140deg,color-mix(in_srgb,var(--violet)_12%,transparent),color-mix(in_srgb,var(--cyan)_6%,transparent))] p-2.5">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-[9.5px] font-semibold uppercase tracking-[0.1em] text-ink">
                    <Sparkles className="size-3 text-violet" aria-hidden />
                    {dict.hero.aiTitle}
                  </span>
                  <span className="flex gap-1" aria-hidden>
                    <span className="size-1 rounded-full bg-violet/70" />
                    <span className="size-1 rounded-full bg-violet/40" />
                    <span className="size-1 rounded-full bg-violet/20" />
                  </span>
                </div>
                <p className="mt-1.5 text-[10.5px] leading-snug text-ink/90">{dict.hero.aiText}</p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-[8.5px] text-muted">{dict.hero.aiMeta}</span>
                  <span className="inline-flex items-center gap-0.5 text-[9px] font-medium text-emerald-ink">
                    {dict.hero.aiLink}
                    <ArrowUpRight className="size-2.5" aria-hidden />
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Balans Score strip */}
          <div className="hidden items-center justify-between gap-3 border-t border-[var(--border)] px-3 py-2 sm:flex sm:px-3.5">
            <div className="flex items-center gap-2.5">
              <span className="grid size-7 place-items-center rounded-lg bg-emerald-soft font-display text-[11px] font-semibold text-emerald-ink num">
                {KPI.score}
              </span>
              <div>
                <div className="text-[9px] uppercase tracking-[0.1em] text-muted">{dict.hero.score}</div>
                <div className="flex items-center gap-1 text-[9px] text-emerald-ink">
                  <span className="size-1 rounded-full bg-emerald" aria-hidden />
                  {dict.hero.scoreNote}
                </div>
              </div>
            </div>
            <div className="flex flex-1 items-center gap-1" aria-hidden>
              {[82, 74, 71, 84].map((part, index) => (
                <div key={index} className="h-1.5 flex-1 overflow-hidden rounded-full bg-[var(--border)]">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${part}%`,
                      background: ["var(--emerald)", "var(--cyan)", "var(--violet)", "var(--warning)"][index],
                      opacity: 0.85,
                    }}
                  />
                </div>
              ))}
            </div>
            <span className="hidden text-[8.5px] text-muted sm:block">UZS</span>
          </div>
        </div>
      </div>

      {showFloating && (
        <>
          <div className="pointer-events-none absolute -left-6 top-[38%] hidden w-[168px] rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-solid)] p-3 shadow-float backdrop-blur-xl lg:block xl:-left-14">
            <div className="flex items-center justify-between">
              <span className="text-[9px] uppercase tracking-[0.12em] text-muted">{dict.hero.score}</span>
              <span className="text-[9px] text-emerald-ink">{dict.hero.scoreNote}</span>
            </div>
            <div className="mx-auto mt-1 w-[132px]">
              <ScoreGauge value={KPI.score} size={132} label={dict.hero.score} />
            </div>
          </div>
          <div className="pointer-events-none absolute -right-4 bottom-[22%] hidden w-[190px] rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-solid)] p-3 shadow-float backdrop-blur-xl lg:block xl:-right-10">
            <div className="flex items-center gap-2">
              <span className="grid size-6 place-items-center rounded-md bg-emerald-soft">
                <TrendingUp className="size-3 text-emerald-ink" aria-hidden />
              </span>
              <span className="text-[9px] uppercase tracking-[0.1em] text-muted">{dict.hero.kpiCash}</span>
            </div>
            <div className="mt-2 font-display text-[15px] font-semibold text-ink num">
              {money(KPI.cash, lang, { compact: true })}
            </div>
            <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-[var(--border)]">
              <div className="h-full w-[64%] rounded-full bg-emerald" />
            </div>
            <div className="mt-2 text-[8.5px] text-muted">{dict.mock.bankCash}</div>
          </div>
        </>
      )}
    </div>
  );
}
