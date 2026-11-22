"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowDownRight,
  ArrowLeft,
  ArrowUpRight,
  Banknote,
  Info,
  ReceiptText,
  Search,
  Sparkles,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { useI18n } from "@/components/providers/i18n-provider";
import { AreaChart, Donut } from "@/components/dashboard/charts";
import { ButtonLink } from "@/components/ui/button";
import { money, formatPercent } from "@/lib/format";
import {
  CASH_FLOW,
  DEMO_COMPANY,
  EXPENSE_BREAKDOWN,
  EXPENSE_LABELS,
  KPI,
  SALES_TREND,
  TRANSACTIONS,
  type DemoTransactionType,
} from "@/lib/mock/demo";

type Period = 3 | 6;
type TypeFilter = "all" | DemoTransactionType;

const TYPE_ORDER: DemoTransactionType[] = ["income", "expense", "tax", "payroll"];

function KpiCard({
  label,
  value,
  delta,
  deltaLabel,
  icon,
  invert = false,
}: {
  label: string;
  value: string;
  delta: number;
  deltaLabel: string;
  icon: React.ReactNode;
  invert?: boolean;
}) {
  const positive = invert ? delta < 0 : delta > 0;
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-3 sm:p-4">
      <div className="flex items-center justify-between gap-2">
        <span className="text-[10px] font-medium uppercase tracking-[0.1em] text-muted">{label}</span>
        <span className="grid size-7 place-items-center rounded-lg bg-emerald-soft text-emerald-ink">{icon}</span>
      </div>
      <div className="mt-3 font-display text-[18px] font-semibold leading-tight tracking-tight text-ink num sm:text-[22px] lg:text-[24px]">
        {value}
      </div>
      <div className="mt-2 flex items-center gap-1.5">
        <span
          className={`inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[9.5px] font-medium num ${
            positive
              ? "bg-[color-mix(in_srgb,var(--success)_12%,transparent)] text-success"
              : "bg-[color-mix(in_srgb,var(--danger)_12%,transparent)] text-danger"
          }`}
        >
          {delta > 0 ? (
            <ArrowUpRight className="size-3" aria-hidden />
          ) : (
            <ArrowDownRight className="size-3" aria-hidden />
          )}
          {formatPercent(delta)}
        </span>
        <span className="text-[9px] text-muted">{deltaLabel}</span>
      </div>
    </div>
  );
}

function RevenueTrend({ months }: { months: Period }) {
  const { dict, lang } = useI18n();
  const data = SALES_TREND.slice(-months);
  const max = Math.max(...data.map((item) => item.revenue), 1);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-[14px] font-semibold text-ink">{dict.dashboard.trendTitle}</h2>
          <p className="mt-0.5 text-[10.5px] text-muted">{dict.dashboard.trendSub}</p>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-[10px] text-muted">
          <span className="inline-flex items-center gap-1.5">
            <span className="size-2 rounded-sm bg-emerald" aria-hidden />
            {dict.dashboard.revenueLegend}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="size-2 rounded-sm bg-violet" aria-hidden />
            {dict.dashboard.profitLegend}
          </span>
        </div>
      </div>

      <div className="mt-5 flex h-[210px] items-end gap-2 sm:gap-3" role="group" aria-label={dict.dashboard.trendTitle}>
        {data.map((item) => {
          const revenue = item.revenue * 1_000_000;
          const profit = item.profit * 1_000_000;
          return (
            <div
              key={item.key}
              className="group relative flex h-full min-w-0 flex-1 flex-col justify-end outline-none"
              role="img"
              aria-label={`${item.month[lang]}: ${dict.dashboard.revenueLegend} ${money(revenue, lang, {
                compact: true,
              })}, ${dict.dashboard.profitLegend} ${money(profit, lang, { compact: true })}`}
            >
              <div className="pointer-events-none absolute inset-x-0 bottom-[calc(100%-4px)] z-10 mx-auto hidden w-max max-w-[160px] rounded-lg sm:block border border-[var(--border-strong)] bg-[var(--glass-solid)] px-2 py-1 text-[9px] leading-relaxed text-ink opacity-0 shadow-float backdrop-blur transition group-hover:opacity-100 group-focus-within:opacity-100">
                <div className="font-semibold">{item.month[lang]}</div>
                <div className="num text-emerald-ink">
                  {dict.dashboard.revenueLegend}: {money(revenue, lang, { compact: true })}
                </div>
                <div className="num text-violet">
                  {dict.dashboard.profitLegend}: {money(profit, lang, { compact: true })}
                </div>
              </div>
              <div className="flex min-h-0 flex-1 items-end justify-center gap-1">
                <div
                  className="w-[42%] max-w-[20px] rounded-t-[3px] bg-[linear-gradient(180deg,var(--emerald),color-mix(in_srgb,var(--emerald)_55%,transparent))] transition-all"
                  style={{ height: `${Math.max((item.revenue / max) * 100, 3)}%` }}
                />
                <div
                  className="w-[42%] max-w-[20px] rounded-t-[3px] bg-[linear-gradient(180deg,var(--violet),color-mix(in_srgb,var(--violet)_45%,transparent))] transition-all"
                  style={{ height: `${Math.max((item.profit / max) * 100, 3)}%` }}
                />
              </div>
              <span className="mt-2 truncate text-center text-[9px] text-muted">{item.month[lang]}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function DemoDashboard() {
  const { dict, lang } = useI18n();
  const [period, setPeriod] = useState<Period>(6);
  const [query, setQuery] = useState("");
  const [type, setType] = useState<TypeFilter>("all");

  const cashValues = CASH_FLOW.map((point) => point.value);
  const cashMin = Math.min(...cashValues);
  const cashMax = Math.max(...cashValues);
  const expenseTotal = EXPENSE_BREAKDOWN.reduce((sum, item) => sum + item.value, 0);

  const filtered = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase(lang === "uz" ? "uz-UZ" : "ru-RU");
    return TRANSACTIONS.filter((item) => {
      if (type !== "all" && item.type !== type) return false;
      if (!needle) return true;
      return (
        item.name[lang].toLocaleLowerCase(lang === "uz" ? "uz-UZ" : "ru-RU").includes(needle) ||
        item.date.includes(needle) ||
        String(item.amount).includes(needle)
      );
    });
  }, [lang, query, type]);

  const statusTone: Record<(typeof TRANSACTIONS)[number]["status"], string> = {
    paid: "border-emerald/25 bg-emerald-soft text-emerald-ink",
    pending: "border-warning/30 bg-[color-mix(in_srgb,var(--warning)_10%,transparent)] text-warning",
    planned: "border-[var(--border)] bg-[var(--elevated)] text-muted",
  };

  return (
    <div className="relative pb-16 pt-24 sm:pt-28 lg:pt-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] grid-lines opacity-30" aria-hidden />
      <div className="wrap relative">
        <div className="flex flex-col gap-4 rounded-3xl border border-[var(--border)] bg-[linear-gradient(150deg,color-mix(in_srgb,var(--emerald)_7%,var(--surface)),var(--surface)_45%,color-mix(in_srgb,var(--violet)_5%,var(--surface)))] p-5 sm:p-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-warning/30 bg-[color-mix(in_srgb,var(--warning)_10%,transparent)] px-2.5 py-1 text-[9.5px] font-semibold uppercase tracking-[0.08em] text-warning">
                <Info className="size-3" aria-hidden />
                {dict.dashboard.demoBadge}
              </span>
              <span className="text-[10.5px] text-muted">
                {DEMO_COMPANY.name[lang]} · {DEMO_COMPANY.period}
              </span>
            </div>
            <h1 className="t-h2 mt-3 text-ink">{dict.dashboard.title}</h1>
            <p className="mt-2 max-w-[640px] text-[12.5px] leading-relaxed text-muted">{dict.dashboard.sub}</p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row lg:shrink-0">
            <ButtonLink href="/" variant="glass" size="sm">
              <ArrowLeft aria-hidden />
              {dict.dashboard.back}
            </ButtonLink>
            <ButtonLink href="/narxlar" size="sm">
              {dict.dashboard.pricingCta}
              <ArrowUpRight className="size-3.5" aria-hidden />
            </ButtonLink>
          </div>
        </div>

        <p className="mt-3 flex items-start gap-2 rounded-xl border border-warning/20 bg-[color-mix(in_srgb,var(--warning)_6%,transparent)] px-3 py-2.5 text-[10.5px] leading-relaxed text-muted">
          <Info className="mt-px size-3.5 shrink-0 text-warning" aria-hidden />
          {dict.dashboard.demoNote}
        </p>

        <div className="mt-4 grid grid-cols-2 gap-2.5 lg:grid-cols-4">
          <KpiCard
            label={dict.dashboard.kpi.revenue}
            value={money(KPI.revenue, lang, { compact: true })}
            delta={KPI.revenueDelta}
            deltaLabel={dict.dashboard.kpi.delta}
            icon={<TrendingUp className="size-3.5" aria-hidden />}
          />
          <KpiCard
            label={dict.dashboard.kpi.expenses}
            value={money(KPI.expenses, lang, { compact: true })}
            delta={KPI.expensesDelta}
            deltaLabel={dict.dashboard.kpi.delta}
            icon={<ReceiptText className="size-3.5" aria-hidden />}
            invert
          />
          <KpiCard
            label={dict.dashboard.kpi.profit}
            value={money(KPI.profit, lang, { compact: true })}
            delta={KPI.profitDelta}
            deltaLabel={dict.dashboard.kpi.delta}
            icon={<Sparkles className="size-3.5" aria-hidden />}
          />
          <KpiCard
            label={dict.dashboard.kpi.cash}
            value={money(KPI.cash, lang, { compact: true })}
            delta={KPI.cashDelta}
            deltaLabel={dict.dashboard.kpi.delta}
            icon={<Wallet className="size-3.5" aria-hidden />}
          />
        </div>

        <div className="mt-3 grid gap-3 lg:grid-cols-[1.4fr_.85fr]">
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-5">
            <div className="mb-1 flex items-center justify-between gap-2">
              <span className="text-[10px] font-medium uppercase tracking-[0.1em] text-muted">
                {dict.dashboard.period}
              </span>
              <div className="inline-flex rounded-lg border border-[var(--border)] p-0.5" role="group" aria-label={dict.dashboard.period}>
                {([3, 6] as const).map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setPeriod(value)}
                    aria-pressed={period === value}
                    className={`min-h-8 rounded-md px-2.5 text-[10px] font-medium transition ${
                      period === value ? "bg-emerald-soft text-emerald-ink" : "text-muted hover:text-ink"
                    }`}
                  >
                    {value === 3 ? dict.dashboard.periods.m3 : dict.dashboard.periods.m6}
                  </button>
                ))}
              </div>
            </div>
            <RevenueTrend months={period} />
          </div>

          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-5">
            <h2 className="text-[14px] font-semibold text-ink">{dict.dashboard.cashTitle}</h2>
            <p className="mt-0.5 text-[10.5px] text-muted">{dict.dashboard.cashSub}</p>
            <AreaChart
              values={cashValues}
              height={112}
              id="dashboard-cash"
              className="mt-4"
              title={dict.dashboard.cashTitle}
              description={`${dict.dashboard.range}: ${money(cashMin, lang, { compact: true })} — ${money(
                cashMax,
                lang,
                { compact: true },
              )}`}
            />
            <div className="mt-1 flex items-center justify-between text-[8.5px] text-muted num">
              <span>01.11</span>
              <span>10.11</span>
              <span>20.11</span>
              <span>30.11</span>
            </div>
            <dl className="mt-3 grid grid-cols-2 gap-2">
              <div className="rounded-lg border border-[var(--border)] px-2.5 py-2">
                <dt className="text-[9px] text-muted">{dict.dashboard.range} · min</dt>
                <dd className="mt-0.5 text-[11px] font-semibold text-ink num">
                  {money(cashMin, lang, { compact: true })}
                </dd>
              </div>
              <div className="rounded-lg border border-[var(--border)] px-2.5 py-2">
                <dt className="text-[9px] text-muted">{dict.dashboard.range} · max</dt>
                <dd className="mt-0.5 text-[11px] font-semibold text-emerald-ink num">
                  {money(cashMax, lang, { compact: true })}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="mt-3 grid gap-3 lg:grid-cols-[.85fr_1.15fr]">
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-5">
            <h2 className="text-[14px] font-semibold text-ink">{dict.dashboard.expensesTitle}</h2>
            <p className="mt-0.5 text-[10.5px] text-muted">{dict.dashboard.expensesSub}</p>
            <div className="mt-4 flex flex-col items-center gap-4 sm:flex-row">
              <Donut
                slices={EXPENSE_BREAKDOWN.map((item) => ({ value: item.value, color: item.color }))}
                size={142}
                centerLabel={dict.dashboard.kpi.expenses}
                centerValue={money(expenseTotal, lang, { compact: true, withLabel: false })}
              />
              <ul className="w-full space-y-1.5">
                {EXPENSE_BREAKDOWN.map((item) => (
                  <li key={item.key} className="flex items-center gap-2 text-[10.5px]">
                    <span className="size-2 shrink-0 rounded-sm" style={{ background: item.color }} aria-hidden />
                    <span className="min-w-0 flex-1 truncate text-muted">{EXPENSE_LABELS[item.key][lang]}</span>
                    <span className="shrink-0 text-ink num">{money(item.value, lang, { compact: true })}</span>
                    <span className="w-10 shrink-0 text-right text-muted num">
                      {formatPercent((item.value / expenseTotal) * 100, { signed: false })}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="rounded-2xl border border-[var(--border)] bg-[linear-gradient(150deg,color-mix(in_srgb,var(--violet)_8%,var(--surface)),var(--surface)_60%)] p-4 sm:p-5">
            <div className="flex items-center justify-between gap-2">
              <div>
                <h2 className="flex items-center gap-1.5 text-[14px] font-semibold text-ink">
                  <Sparkles className="size-3.5 text-violet" aria-hidden />
                  {dict.dashboard.aiTitle}
                </h2>
                <p className="mt-0.5 text-[10.5px] text-muted">{dict.dashboard.aiSub}</p>
              </div>
              <span className="shrink-0 rounded-full border border-[var(--border)] px-2 py-0.5 text-[8.5px] uppercase tracking-[0.08em] text-muted">
                {dict.dashboard.aiDemo}
              </span>
            </div>
            <ol className="mt-4 space-y-2">
              {dict.dashboard.insights.map((insight, index) => (
                <li
                  key={insight}
                  className="flex items-start gap-2.5 rounded-xl border border-[var(--border)] bg-[color-mix(in_srgb,var(--elevated)_35%,transparent)] p-3"
                >
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-emerald-soft text-[9px] font-semibold text-emerald-ink num">
                    {index + 1}
                  </span>
                  <span className="text-[11px] leading-relaxed text-ink/85">{insight}</span>
                </li>
              ))}
            </ol>
            <ButtonLink href="/#ai-cfo" variant="glass" size="sm" className="mt-3">
              {dict.dashboard.aiCta}
              <ArrowUpRight className="size-3.5" aria-hidden />
            </ButtonLink>
          </div>
        </div>

        <div className="mt-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-[14px] font-semibold text-ink">{dict.dashboard.tableTitle}</h2>
              <p className="mt-0.5 text-[10.5px] text-muted">{dict.dashboard.tableSub}</p>
            </div>
            <p className="text-[10px] text-muted" aria-live="polite">
              {dict.dashboard.showing.replace("{n}", String(filtered.length))}
            </p>
          </div>

          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <label className="relative min-w-0 flex-1">
              <span className="sr-only">{dict.dashboard.search}</span>
              <Search className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted" aria-hidden />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={dict.dashboard.searchPh}
                className="h-11 w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] pl-9 pr-3 text-[16px] text-ink outline-none transition placeholder:text-[11.5px] placeholder:text-muted/70 focus:border-emerald/50 focus:ring-4 focus:ring-emerald/10 sm:text-[12.5px]"
              />
            </label>
            <select
              value={type}
              onChange={(event) => setType(event.target.value as TypeFilter)}
              aria-label={dict.dashboard.filterAll}
              className="h-11 rounded-xl border border-[var(--border)] bg-[var(--bg)] px-3 text-[16px] text-ink outline-none transition focus:border-emerald/50 focus:ring-4 focus:ring-emerald/10 sm:text-[12.5px]"
            >
              <option value="all">{dict.dashboard.filterAll}</option>
              {TYPE_ORDER.map((value) => (
                <option key={value} value={value}>
                  {dict.dashboard.types[value]}
                </option>
              ))}
            </select>
          </div>

          {filtered.length === 0 ? (
            <p role="status" className="mt-4 rounded-xl border border-[var(--border)] px-3 py-6 text-center text-[11.5px] text-muted">
              {dict.dashboard.empty}
            </p>
          ) : (
            <>
              <div className="mt-4 hidden overflow-x-auto md:block">
                <table className="w-full border-collapse text-left">
                  <caption className="sr-only">{dict.dashboard.tableTitle}</caption>
                  <thead>
                    <tr className="border-b border-[var(--border)]">
                      {[
                        dict.dashboard.columns.date,
                        dict.dashboard.columns.name,
                        dict.dashboard.columns.type,
                        dict.dashboard.columns.amount,
                        dict.dashboard.columns.status,
                      ].map((column, index) => (
                        <th
                          key={column}
                          scope="col"
                          className={`px-3 py-2 text-[9.5px] font-semibold uppercase tracking-[0.08em] text-muted ${
                            index === 3 ? "text-right" : index === 4 ? "text-right" : ""
                          }`}
                        >
                          {column}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((item) => (
                      <tr key={item.id} className="border-b border-[var(--border)] last:border-0">
                        <td className="whitespace-nowrap px-3 py-2.5 text-[10.5px] text-muted num">{item.date}</td>
                        <td className="px-3 py-2.5 text-[11.5px] text-ink">{item.name[lang]}</td>
                        <td className="px-3 py-2.5">
                          <span className="rounded-md border border-[var(--border)] px-1.5 py-0.5 text-[9px] text-muted">
                            {dict.dashboard.types[item.type]}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-3 py-2.5 text-right text-[11.5px] font-medium text-ink num">
                          {money(item.amount, lang, { compact: true })}
                        </td>
                        <td className="px-3 py-2.5 text-right">
                          <span className={`inline-flex rounded-full border px-2 py-0.5 text-[9px] ${statusTone[item.status]}`}>
                            {dict.dashboard.statuses[item.status]}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <ul className="mt-4 space-y-2 md:hidden">
                {filtered.map((item) => (
                  <li key={item.id} className="rounded-xl border border-[var(--border)] p-3">
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-[11.5px] font-medium text-ink">{item.name[lang]}</span>
                      <span className="shrink-0 text-[11px] font-semibold text-ink num">
                        {money(item.amount, lang, { compact: true })}
                      </span>
                    </div>
                    <div className="mt-1.5 flex items-center justify-between gap-2 text-[9.5px] text-muted">
                      <span className="num">{item.date}</span>
                      <span>{dict.dashboard.types[item.type]}</span>
                      <span className={`rounded-full border px-2 py-0.5 ${statusTone[item.status]}`}>
                        {dict.dashboard.statuses[item.status]}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3">
          <p className="flex items-start gap-2 text-[10px] leading-relaxed text-muted">
            <Banknote className="mt-px size-3.5 shrink-0 text-emerald-ink" aria-hidden />
            {dict.dashboard.demoNote}
          </p>
          <Link href="/" className="text-[10.5px] font-medium text-emerald-ink hover:underline">
            {dict.dashboard.back}
          </Link>
        </div>
      </div>
    </div>
  );
}
