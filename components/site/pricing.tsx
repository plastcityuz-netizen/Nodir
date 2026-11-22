"use client";

import clsx from "clsx";
import { motion } from "framer-motion";
import { Check, ChevronDown, Minus, Sparkles } from "lucide-react";
import { useState } from "react";
import { useI18n } from "@/components/providers/i18n-provider";
import { Accordion } from "@/components/ui/accordion";
import { ArrowRight, ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { SegmentedSwitch } from "@/components/ui/switch";
import { money } from "@/lib/format";
import { ADDONS, PLANS, TRIAL, monthlyEquivalent, type Plan } from "@/lib/pricing.config";

type Billing = "monthly" | "yearly";

function PlanCard({
  plan,
  billing,
  active,
}: {
  plan: Plan;
  billing: Billing;
  active: boolean;
}) {
  const { dict, lang } = useI18n();
  const price = billing === "monthly" ? plan.monthly : plan.yearly;
  const perMonth = monthlyEquivalent(plan);

  const priceNode = plan.custom ? (
    <div className="flex min-h-[52px] items-baseline">
      <span className="font-display text-[24px] font-semibold tracking-tight text-ink sm:text-[26px]">
        {dict.pricing.customPrice}
      </span>
    </div>
  ) : (
    <div>
      <div className="flex min-h-[46px] items-baseline gap-1.5">
        <span className="font-display text-[30px] font-semibold leading-none tracking-tight text-ink num sm:text-[34px]">
          {money(price ?? 0, lang, { withLabel: false })}
        </span>
        <span className="text-[12px] text-muted">
          {lang === "uz" ? "so‘m" : "сум"} / {billing === "monthly" ? dict.common.month : dict.common.yearly}
        </span>
      </div>
      <p className="mt-1 h-4 text-[10.5px] text-muted">
        {billing === "yearly" && perMonth
          ? `≈ ${money(perMonth, lang)} ${dict.common.perMonth} · ${dict.pricing.save}`
          : plan.monthly
            ? dict.pricing.monthlyNote
            : ""}
      </p>
    </div>
  );

  return (
    <article
      className={clsx(
        "relative flex h-full flex-col rounded-2xl border p-4 transition-all duration-300 sm:p-5",
        active
          ? "border-emerald/40 bg-[linear-gradient(165deg,color-mix(in_srgb,var(--emerald)_9%,var(--surface)),var(--surface)_55%)] shadow-[0_24px_70px_-40px_rgba(25,227,166,.55)]"
          : "border-[var(--border)] bg-[var(--surface)] hover:border-[var(--border-strong)]",
      )}
    >
      {active && (
        <span className="absolute -top-3 left-4 inline-flex items-center gap-1 rounded-full bg-emerald-fill px-2.5 py-1 text-[9.5px] font-semibold uppercase tracking-[0.08em] text-[#04130E]">
          <Sparkles className="size-2.5" aria-hidden />
          {dict.pricing.popular}
        </span>
      )}

      <div className="flex items-baseline justify-between gap-2">
        <h3 className="font-display text-[17px] font-semibold text-ink">{plan.name}</h3>
        <span className="rounded-full border border-[var(--border)] px-2 py-0.5 text-[9px] text-muted">
          {dict.pricing.trialChip}
        </span>
      </div>
      <p className="mt-1 min-h-[34px] text-[11px] leading-snug text-muted">{plan.audience[lang]}</p>

      <motion.div
        key={`${plan.id}-${billing}`}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        className="mt-4"
      >
        {priceNode}
      </motion.div>

      <ButtonLink
        href={plan.custom ? "mailto:salom@balans.ai?subject=BALANS%20AI%20Enterprise" : `/royxatdan-otish?plan=${plan.id}`}
        variant={active ? "primary" : "outline"}
        size="md"
        className="mt-4 w-full"
      >
        {plan.custom ? dict.pricing.ctaCustom : dict.pricing.ctaTrial}
        <ArrowRight />
      </ButtonLink>
      <p className="mt-1.5 text-center text-[9.5px] text-muted">
        {plan.custom ? dict.footer.contact : dict.common.noCard}
      </p>

      <ul className="mt-4 space-y-2 border-t border-[var(--border)] pt-4">
        <li className="flex items-start justify-between gap-2 text-[11.5px]">
          <span className="text-muted">{dict.pricing.labels.companies}</span>
          <span className="text-right font-medium text-ink">{plan.companies[lang]}</span>
        </li>
        <li className="flex items-start justify-between gap-2 text-[11.5px]">
          <span className="text-muted">{dict.pricing.labels.users}</span>
          <span className="text-right font-medium text-ink">{plan.users[lang]}</span>
        </li>
        <li className="flex items-start justify-between gap-2 text-[11.5px]">
          <span className="text-muted">{dict.pricing.labels.ai}</span>
          <span className="max-w-[60%] text-right font-medium text-ink">{plan.ai[lang]}</span>
        </li>
        <li className="pt-1">
          <span className="text-[10.5px] text-muted">{dict.pricing.labels.modules}</span>
          <p className="mt-1 text-[11px] leading-relaxed text-ink/85">{plan.modules[lang]}</p>
        </li>
      </ul>
    </article>
  );
}

export function Pricing({ detailed = false }: { detailed?: boolean }) {
  const { dict, lang } = useI18n();
  const [billing, setBilling] = useState<Billing>("monthly");

  return (
    <section id="narxlar" className={clsx("relative", detailed ? "pt-28 sm:pt-32 lg:pt-36" : "section")}>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] grid-lines opacity-40" aria-hidden />
      <div className="wrap relative">
        <Reveal>
          <SectionHeading
            eyebrow={dict.pricing.eyebrow}
            title={dict.pricing.title}
            sub={dict.pricing.sub}
            align={detailed ? "left" : "center"}
            level={detailed ? 1 : 2}
          />
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mt-7 flex flex-col items-center gap-3">
            <SegmentedSwitch<Billing>
              label={dict.pricing.monthly}
              value={billing}
              onChange={setBilling}
              options={[
                { value: "monthly", label: dict.pricing.monthly },
                { value: "yearly", label: dict.pricing.yearly, hint: dict.pricing.save },
              ]}
            />
            <p className="text-[10.5px] text-muted">
              {billing === "yearly" ? dict.pricing.yearlyNote : dict.pricing.monthlyNote}
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.07}>
          <div className="mt-7 flex flex-col items-center justify-between gap-3 rounded-2xl border border-emerald/25 bg-[color-mix(in_srgb,var(--emerald)_7%,transparent)] px-4 py-3 sm:flex-row">
            <div className="flex items-center gap-2.5">
              <span className="grid size-8 place-items-center rounded-lg bg-emerald-fill text-[#04130E]">
                <Sparkles className="size-4" aria-hidden />
              </span>
              <div>
                <p className="text-[12.5px] font-semibold text-ink">{dict.pricing.trialChip}</p>
                <p className="text-[10.5px] text-muted">{dict.pricing.sub}</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5">
              {dict.hero.micro.map((item) => (
                <span key={item} className="inline-flex items-center gap-1.5 text-[10.5px] text-ink/85">
                  <Check className="size-3 text-emerald-ink" aria-hidden />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-3.5">
          {PLANS.map((plan, index) => (
            <Reveal key={plan.id} delay={Math.min(index * 0.05, 0.2)} className="h-full">
              <PlanCard plan={plan} billing={billing} active={plan.popular} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.08}>
          <div className="mt-4 grid gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 sm:grid-cols-[1fr_auto] sm:items-center sm:p-5">
            <div>
              <div className="flex items-center gap-2">
                <span className="grid size-7 place-items-center rounded-lg bg-emerald-soft text-emerald-ink">
                  <Sparkles className="size-3.5" aria-hidden />
                </span>
                <h3 className="text-[13px] font-semibold text-ink">{dict.pricing.addonsTitle}</h3>
              </div>
              <ul className="mt-3 grid gap-2 sm:grid-cols-3">
                {dict.pricing.addons.map((addon, index) => (
                  <li key={addon.title} className="rounded-lg border border-[var(--border)] px-2.5 py-2">
                    <div className="text-[10.5px] text-muted">{addon.title}</div>
                    <div className="mt-0.5 text-[11px] font-medium text-ink num">
                      {money(ADDONS[index]?.price ?? 0, lang)} ·{" "}
                      {index === 2 ? (lang === "uz" ? "bir martalik" : "разово") : dict.common.perMonth}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col items-start gap-2 sm:items-end">
              <span className="rounded-full border border-[var(--border)] px-2.5 py-1 text-[9.5px] text-muted">
                {TRIAL.days} {lang === "uz" ? "kun bepul" : "дней бесплатно"}
              </span>
              <ButtonLink href="/royxatdan-otish" size="sm">
                {dict.common.start}
                <ArrowRight />
              </ButtonLink>
            </div>
          </div>
        </Reveal>

        <p className="mt-3 text-[10px] leading-relaxed text-muted">
          {dict.pricing.vatNote}{" "}
          <span className="rounded border border-warning/30 px-1.5 py-0.5 text-[9px] text-warning">
            {dict.pricing.vatShort}
          </span>
        </p>

        {!detailed && (
          <div className="mt-8 flex justify-center">
            <ButtonLink href="/narxlar" variant="glass" size="md">
              {dict.pricing.compareTitle}
              <ArrowRight />
            </ButtonLink>
          </div>
        )}

        {detailed && (
          <>
            <Reveal>
              <div className="mt-14">
                <h2 className="t-h3 font-display text-ink">{dict.pricing.compareTitle}</h2>
                <p className="mt-2 max-w-[720px] text-[12.5px] text-muted">{dict.pricing.compareSub}</p>

                <div className="mt-5 hidden overflow-x-auto rounded-2xl border border-[var(--border)] md:block">
                  <table className="w-full border-collapse text-left">
                    <caption className="sr-only">{dict.pricing.compareTitle}</caption>
                    <thead>
                      <tr className="border-b border-[var(--border)] bg-[var(--surface)]">
                        <th scope="col" className="px-4 py-3 text-[10.5px] font-semibold uppercase tracking-[0.1em] text-muted">
                          {dict.pricing.labels.modules}
                        </th>
                        {PLANS.map((plan) => (
                          <th
                            key={plan.id}
                            scope="col"
                            className={clsx(
                              "px-3 py-3 text-center text-[11px] font-semibold",
                              plan.popular ? "bg-emerald-soft text-emerald-ink" : "text-ink",
                            )}
                          >
                            {plan.name}
                            {plan.popular && <span className="ml-1 text-[8px] uppercase">★</span>}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {dict.pricing.compareFeatures.map((feature, index) => (
                        <tr
                          key={feature.label}
                          className={clsx(
                            "border-b border-[var(--border)] last:border-0",
                            index % 2 === 1 ? "bg-[color-mix(in_srgb,var(--surface)_60%,transparent)]" : "bg-[color-mix(in_srgb,var(--bg)_40%,transparent)]",
                          )}
                        >
                          <th scope="row" className="px-4 py-2.5 text-[11.5px] font-normal text-ink/85">
                            {feature.label}
                          </th>
                          {feature.values.map((value, planIndex) => (
                            <td
                              key={`${feature.label}-${planIndex}`}
                              className={clsx(
                                "px-3 py-2.5 text-center text-[11px] num",
                                planIndex === 1 ? "bg-[color-mix(in_srgb,var(--emerald)_7%,transparent)] text-ink" : "text-muted",
                              )}
                            >
                              {value === "+" ? (
                                <Check className="mx-auto size-3.5 text-emerald-ink" aria-label={lang === "uz" ? "bor" : "есть"} />
                              ) : value === "—" ? (
                                <Minus className="mx-auto size-3.5 opacity-50" aria-label={lang === "uz" ? "yo‘q" : "нет"} />
                              ) : (
                                value
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-5 space-y-2 md:hidden">
                  {dict.pricing.compareFeatures.map((feature) => (
                    <details key={feature.label} className="group rounded-xl border border-[var(--border)] bg-[var(--surface)]">
                      <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between px-3.5 py-3 text-[12px] font-medium text-ink">
                        {feature.label}
                        <ChevronDown className="size-4 text-muted transition-transform group-open:rotate-180" aria-hidden />
                      </summary>
                      <dl className="grid grid-cols-2 gap-2 border-t border-[var(--border)] px-3.5 py-2.5">
                        {feature.values.map((value, planIndex) => (
                          <div key={`${feature.label}-m-${planIndex}`} className="flex items-center justify-between gap-2 rounded-lg border border-[var(--border)] px-2 py-1.5">
                            <dt className="text-[10px] text-muted">{PLANS[planIndex]?.name}</dt>
                            <dd className="text-[10.5px] font-medium text-ink num">
                              {value === "+" ? (
                                <Check className="size-3 text-emerald-ink" aria-label={lang === "uz" ? "bor" : "есть"} />
                              ) : value === "—" ? (
                                <Minus className="size-3 opacity-50" aria-label={lang === "uz" ? "yo‘q" : "нет"} />
                              ) : (
                                value
                              )}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    </details>
                  ))}
                </div>
                <p className="mt-2 text-[10px] text-muted">{dict.pricing.fairness}</p>
              </div>
            </Reveal>

            <Reveal>
              <div className="mt-14 grid gap-5 lg:grid-cols-[.7fr_1.3fr] lg:gap-10">
                <div>
                  <h2 className="t-h3 font-display text-ink">{dict.pricing.faqTitle}</h2>
                  <p className="mt-2 text-[12.5px] text-muted">{dict.pricing.book}</p>
                  <ButtonLink
                    href="mailto:salom@balans.ai?subject=BALANS%20AI%20tariflar"
                    variant="glass"
                    size="sm"
                    className="mt-4"
                  >
                    {dict.pricing.bookCta}
                    <ArrowRight />
                  </ButtonLink>
                </div>
                <div id="faq">
                  <Accordion items={dict.pricing.faq} defaultOpen={0} />
                </div>
              </div>
            </Reveal>
          </>
        )}
      </div>
    </section>
  );
}
