"use client";

import clsx from "clsx";
import {
  ArrowUpRight,
  BookOpen,
  FileBarChart2,
  Factory,
  Package,
  ShoppingCart,
  Sparkles,
  Truck,
  Users,
  Wallet,
  Check,
  Clock,
} from "lucide-react";
import Link from "next/link";
import { useI18n } from "@/components/providers/i18n-provider";
import { AreaChart, MiniBars } from "@/components/dashboard/charts";
import { ArrowRight, ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { money } from "@/lib/format";
import { SALES_TREND } from "@/lib/mock/demo";

const META = [
  { id: "accounting", icon: BookOpen, tone: "emerald" },
  { id: "sales", icon: ShoppingCart, tone: "cyan" },
  { id: "warehouse", icon: Package, tone: "violet" },
  { id: "purchase", icon: Truck, tone: "warning" },
  { id: "production", icon: Factory, tone: "emerald" },
  { id: "hr", icon: Users, tone: "cyan" },
  { id: "finance", icon: Wallet, tone: "violet" },
  { id: "reports", icon: FileBarChart2, tone: "warning" },
] as const;

const toneClasses: Record<string, string> = {
  emerald: "border-emerald/25 bg-emerald-soft text-emerald-ink",
  cyan: "border-cyan/25 bg-[color-mix(in_srgb,var(--cyan)_10%,transparent)] text-[var(--cyan)]",
  violet: "border-violet/25 bg-[color-mix(in_srgb,var(--violet)_10%,transparent)] text-[var(--violet)]",
  warning: "border-warning/25 bg-[color-mix(in_srgb,var(--warning)_10%,transparent)] text-warning",
};

function Row({
  left,
  right,
  status,
}: {
  left: string;
  right: string;
  status: "paid" | "wait";
}) {
  return (
    <div className="flex items-center justify-between gap-2 rounded-lg border border-[var(--border)] bg-[color-mix(in_srgb,var(--elevated)_40%,transparent)] px-2.5 py-1.5">
      <span className="truncate text-[10px] text-ink/85">{left}</span>
      <span className="flex shrink-0 items-center gap-1.5">
        <span className="text-[10px] font-medium text-ink num">{right}</span>
        <span
          className={clsx(
            "grid size-4 place-items-center rounded-full",
            status === "paid" ? "bg-emerald-soft text-emerald-ink" : "bg-[color-mix(in_srgb,var(--warning)_14%,transparent)] text-warning",
          )}
        >
          {status === "paid" ? <Check className="size-2.5" aria-hidden /> : <Clock className="size-2.5" aria-hidden />}
        </span>
      </span>
    </div>
  );
}

function Stock({ label, percent, value }: { label: string; percent: number; value: string }) {
  return (
    <div>
      <div className="flex items-center justify-between text-[9.5px] text-muted">
        <span>{label}</span>
        <span className="num text-ink/80">{value}</span>
      </div>
      <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-[var(--border)]">
        <div
          className={clsx(
            "h-full rounded-full",
            percent < 35 ? "bg-warning" : "bg-[linear-gradient(90deg,var(--emerald),var(--cyan))]",
          )}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

function Mini({ id }: { id: string }) {
  const { dict, lang } = useI18n();
  const mini = dict.modules.mini;

  switch (id) {
    case "accounting":
      return (
        <div className="space-y-1.5">
          <Row left={`№ 1042 · «Baraka Savdo»`} right={money(12_400_000, lang, { compact: true })} status="paid" />
          <Row left={`№ 1043 · «Farg‘ona Textile»`} right={money(8_000_000, lang, { compact: true })} status="wait" />
        </div>
      );
    case "sales":
      return (
        <div>
          <div className="flex items-baseline justify-between">
            <span className="text-[10px] text-muted">{dict.mock.revenue}</span>
            <span className="text-[11px] font-semibold text-ink num">{money(1_486_000_000, lang, { compact: true })}</span>
          </div>
          <div className="mt-2">
            <MiniBars
              values={SALES_TREND.map((item) => item.revenue)}
              labels={lang === "uz" ? ["Iyn", "Iyl", "Avg", "Sen", "Okt", "Noy"] : ["Июн", "Июл", "Авг", "Сен", "Окт", "Ноя"]}
              height={68}
            />
          </div>
        </div>
      );
    case "warehouse":
      return (
        <div className="space-y-2">
          <Stock label="Paxta ip 32/1" percent={64} value="8 240 kg" />
          <Stock label="Bo‘yoq · indigo" percent={28} value="184 kg" />
          <Stock label="Qadoq" percent={82} value="12 800 dona" />
        </div>
      );
    case "purchase":
      return (
        <div className="space-y-1.5">
          <Row left={`«Toshkent Paxta» · ${mini.order} 87`} right={money(84_000_000, lang, { compact: true })} status="paid" />
          <Row left={`«Indigo Color» · ${mini.order} 88`} right={money(16_400_000, lang, { compact: true })} status="wait" />
        </div>
      );
    case "production":
      return (
        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-lg border border-[var(--border)] px-2.5 py-2">
              <div className="text-[9px] text-muted">{mini.cost}</div>
              <div className="mt-0.5 text-[11px] font-semibold text-ink num">42 380</div>
            </div>
            <div className="rounded-lg border border-[var(--border)] px-2.5 py-2">
              <div className="text-[9px] text-muted">{mini.defect}</div>
              <div className="mt-0.5 text-[11px] font-semibold text-warning num">1,8%</div>
            </div>
          </div>
          <div className="flex justify-between rounded-lg bg-[color-mix(in_srgb,var(--elevated)_50%,transparent)] px-2.5 py-1.5 text-[9.5px] text-muted">
            <span>Paxta tolasi</span>
            <span className="text-ink/80 num">1,02 kg</span>
          </div>
        </div>
      );
    case "hr":
      return (
        <div>
          <div className="flex items-center gap-1">
            {["SN", "AK", "MT", "JR", "DL", "GB"].map((initials, index) => (
              <span
                key={initials}
                className={clsx(
                  "grid size-6 place-items-center rounded-full border text-[8.5px] font-semibold",
                  index < 5
                    ? "border-emerald/20 bg-emerald-soft text-emerald-ink"
                    : "border-[var(--border)] bg-[var(--elevated)] text-muted",
                )}
              >
                {initials}
              </span>
            ))}
            <span className="ml-1 text-[9.5px] text-muted">+42</span>
          </div>
          <div className="mt-2.5 flex items-center justify-between rounded-lg border border-[var(--border)] px-2.5 py-1.5">
            <span className="text-[9.5px] text-muted">{mini.payroll}</span>
            <span className="text-[10px] font-medium text-ink num">{money(312_000_000, lang, { compact: true })}</span>
          </div>
        </div>
      );
    case "finance":
      return (
        <div>
          <div className="flex items-baseline justify-between">
            <span className="text-[9.5px] text-muted">{dict.mock.cashBank}</span>
            <span className="text-[11px] font-semibold text-ink num">{money(486_200_000, lang, { compact: true })}</span>
          </div>
          <div className="mt-1.5">
            <AreaChart
              values={[412, 428, 421, 447, 438, 461, 455, 472, 466, 486]}
              height={48}
              id={`module-finance-${lang}`}
              showGrid={false}
            />
          </div>
        </div>
      );
    case "reports":
      return (
        <div className="space-y-1.5">
          <div className="flex items-center justify-between rounded-lg border border-[var(--border)] px-2.5 py-1.5 text-[10px]">
            <span className="flex items-center gap-1.5 text-ink/85">
              <span className="rounded bg-[color-mix(in_srgb,var(--danger)_14%,transparent)] px-1 py-0.5 text-[8px] font-semibold text-danger">
                PDF
              </span>
              {dict.mock.cashflowMonth}
            </span>
            <ArrowUpRight className="size-3 text-muted" aria-hidden />
          </div>
          <Row left={`${mini.email} · Excel`} right="20.11" status="paid" />
        </div>
      );
    default:
      return null;
  }
}

export function Modules() {
  const { dict } = useI18n();
  const items = dict.modules.items;

  const setSpotlight = (event: React.MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--my", `${event.clientY - rect.top}px`);
  };

  return (
    <section id="mahsulot" className="section relative">
      <div className="wrap">
        <Reveal>
          <SectionHeading
            eyebrow={dict.modules.eyebrow}
            title={dict.modules.title}
            sub={dict.modules.sub}
            action={
              <ButtonLink href="/narxlar" variant="glass" size="md">
                {dict.modules.cta}
                <ArrowRight />
              </ButtonLink>
            }
          />
        </Reveal>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 xl:grid-cols-4">
          {META.map((module, index) => {
            const Icon = module.icon;
            const content = items[module.id as keyof typeof items];
            return (
              <Reveal key={module.id} delay={Math.min(index * 0.04, 0.24)} className="h-full">
                <article
                  onMouseMove={setSpotlight}
                  className="spotlight group flex h-full flex-col rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--border-strong)]"
                >
                  <div className="relative z-10">
                    <div className="flex items-center gap-2.5">
                      <span className={clsx("grid size-8 place-items-center rounded-lg border", toneClasses[module.tone])}>
                        <Icon className="size-4" aria-hidden />
                      </span>
                      <h3 className="text-[14px] font-semibold text-ink">{content.title}</h3>
                    </div>
                    <p className="mt-2 min-h-[48px] text-[11.5px] leading-relaxed text-muted">{content.text}</p>
                  </div>
                  <div className="relative z-10 mt-auto border-t border-[var(--border)] pt-3">
                    <Mini id={module.id} />
                  </div>
                </article>
              </Reveal>
            );
          })}

          <Reveal delay={0.1} className="h-full sm:col-span-2 lg:col-span-2 xl:col-span-2">
            <article
              onMouseMove={setSpotlight}
              className="spotlight relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-violet/25 bg-[linear-gradient(150deg,color-mix(in_srgb,var(--violet)_9%,var(--surface)),var(--surface)_55%,color-mix(in_srgb,var(--cyan)_6%,var(--surface)))] p-5"
            >
              <div className="relative z-10 flex flex-wrap items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <span className="grid size-8 place-items-center rounded-lg border border-violet/30 bg-[color-mix(in_srgb,var(--violet)_12%,transparent)] text-violet">
                    <Sparkles className="size-4" aria-hidden />
                  </span>
                  <div>
                    <h3 className="text-[15px] font-semibold text-ink">{items.ai.title}</h3>
                    <p className="mt-0.5 text-[11px] text-muted">{items.ai.text}</p>
                  </div>
                </div>
                <Link
                  href="/#ai-cfo"
                  className="inline-flex items-center gap-1 rounded-lg border border-[var(--border)] px-2.5 py-1.5 text-[10.5px] text-ink/85 transition hover:border-violet/40 hover:text-ink"
                >
                  {dict.common.readMore}
                  <ArrowUpRight className="size-3" aria-hidden />
                </Link>
              </div>

              <div className="relative z-10 mt-5 space-y-2">
                <div className="ml-auto w-fit max-w-[80%] rounded-2xl rounded-br-md border border-[var(--border)] bg-[color-mix(in_srgb,var(--elevated)_70%,transparent)] px-3 py-2 text-[10.5px] text-ink">
                  {dict.ai.suggestions[0]}
                </div>
                <div className="w-fit max-w-[88%] rounded-2xl rounded-bl-md border border-violet/20 bg-[color-mix(in_srgb,var(--violet)_8%,transparent)] px-3 py-2">
                  <p className="text-[10.5px] leading-relaxed text-ink/90">
                    {dict.ai.miniAnswer}
                  </p>
                  <div className="mt-1.5 flex items-center gap-1.5">
                    <span className="rounded border border-[var(--border)] bg-[var(--surface)] px-1.5 py-0.5 text-[8.5px] text-muted">
                      {dict.common.source}: {dict.ai.miniSource}
                    </span>
                    <span className="flex gap-0.5" aria-hidden>
                      <span className="size-1 rounded-full bg-violet" />
                      <span className="size-1 rounded-full bg-violet/50" />
                      <span className="size-1 rounded-full bg-violet/25" />
                    </span>
                  </div>
                </div>
              </div>
            </article>
          </Reveal>

          <Reveal delay={0.14} className="h-full sm:col-span-2 lg:col-span-3 xl:col-span-2">
            <article className="flex h-full flex-col justify-between rounded-2xl border border-[var(--border)] bg-[color-mix(in_srgb,var(--elevated)_40%,transparent)] p-5">
              <div>
                <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">
                  <span className="h-px w-5 bg-emerald" aria-hidden />
                  {dict.common.trial}
                </div>
                <h3 className="mt-3 font-display text-[18px] font-semibold leading-tight text-ink sm:text-[20px]">
                  {dict.cta.title}
                </h3>
                <p className="mt-2 text-[11.5px] leading-relaxed text-muted">{dict.cta.sub}</p>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <ButtonLink href="/royxatdan-otish" size="sm">
                  {dict.common.start}
                  <ArrowRight />
                </ButtonLink>
                <ButtonLink href="/narxlar" variant="glass" size="sm">
                  {dict.nav.pricing}
                </ButtonLink>
              </div>
            </article>
          </Reveal>
        </div>
        <p className="mt-4 text-[10.5px] text-muted/80">{dict.common.demoData}.</p>
      </div>
    </section>
  );
}
