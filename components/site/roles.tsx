"use client";

import { motion } from "framer-motion";
import { Check, Eye, EyeOff, Lock } from "lucide-react";
import { useState } from "react";
import { useI18n } from "@/components/providers/i18n-provider";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function Roles() {
  const { dict } = useI18n();
  const [activeIndex, setActiveIndex] = useState(0);
  const active = dict.roles.tabs[activeIndex] ?? dict.roles.tabs[0];

  if (!active) return null;

  return (
    <section id="rollar" className="section relative">
      <div className="wrap">
        <Reveal>
          <SectionHeading eyebrow={dict.roles.eyebrow} title={dict.roles.title} sub={dict.roles.sub} />
        </Reveal>

        <Reveal delay={0.06}>
          <div
            role="tablist"
            aria-label={dict.roles.eyebrow}
            className="mt-8 flex gap-1.5 overflow-x-auto no-scrollbar rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-1.5"
          >
            {dict.roles.tabs.map((tab, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  id={`role-tab-${tab.id}`}
                  aria-selected={isActive}
                  aria-controls={`role-panel-${tab.id}`}
                  onClick={() => setActiveIndex(index)}
                  className="relative min-h-[44px] shrink-0 rounded-xl px-3.5 text-[12.5px] font-medium transition-colors sm:flex-1"
                >
                  {isActive && (
                    <motion.span
                      layoutId="role-tab-pill"
                      className="absolute inset-0 rounded-xl border border-emerald/25 bg-emerald-soft"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className={`relative z-10 ${isActive ? "text-emerald-ink" : "text-muted hover:text-ink"}`}>
                    {tab.name}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div
            role="tabpanel"
            id={`role-panel-${active.id}`}
            aria-labelledby={`role-tab-${active.id}`}
            key={active.id}
            className="mt-3 grid gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-6 lg:grid-cols-[1.1fr_1fr] lg:gap-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="t-eyebrow text-muted">{dict.roles.eyebrow}</p>
              <h3 className="mt-2 font-display text-[22px] font-semibold text-ink sm:text-[26px]">{active.name}</h3>
              <p className="mt-1.5 max-w-[420px] text-[13px] leading-relaxed text-muted">{active.desc}</p>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div>
                  <div className="mb-2 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-emerald-ink">
                    <Eye className="size-3" aria-hidden />
                    {dict.roles.seesTitle}
                  </div>
                  <ul className="space-y-1.5">
                    {active.sees.map((item) => (
                      <li key={item} className="flex items-start gap-1.5 text-[11.5px] text-ink/85">
                        <Check className="mt-0.5 size-3 shrink-0 text-emerald-ink" aria-hidden />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="mb-2 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-muted">
                    <EyeOff className="size-3" aria-hidden />
                    {dict.roles.hidesTitle}
                  </div>
                  <ul className="space-y-1.5">
                    {active.hides.map((item) => (
                      <li key={item} className="flex items-start gap-1.5 text-[11.5px] text-muted">
                        <Lock className="mt-0.5 size-3 shrink-0 opacity-70" aria-hidden />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-xl border border-[var(--border)] bg-[color-mix(in_srgb,var(--elevated)_40%,transparent)] p-3.5"
            >
              <div className="flex items-center justify-between">
                <span className="text-[9.5px] font-semibold uppercase tracking-[0.12em] text-muted">
                  {active.name} · {dict.mock.dashboard}
                </span>
                <span className="rounded bg-emerald-soft px-1.5 py-0.5 text-[8.5px] text-emerald-ink">
                  RBAC
                </span>
              </div>
              <div className="mt-3 grid gap-1.5 sm:grid-cols-3">
                {active.kpis.map((kpi) => (
                  <div key={kpi.label} className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-2.5 py-2">
                    <div className="text-[8.5px] uppercase tracking-[0.06em] text-muted">{kpi.label}</div>
                    <div className="mt-1 text-[13px] font-semibold text-ink num">{kpi.value}</div>
                  </div>
                ))}
              </div>

              <div className="mt-3 space-y-1.5">
                {[0, 1, 2].map((row) => (
                  <div
                    key={row}
                    className="flex items-center justify-between rounded-lg border border-[var(--border)] bg-[var(--surface)] px-2.5 py-1.5"
                  >
                    <span className="flex items-center gap-1.5">
                      <span
                        className={`size-1.5 rounded-full ${row === 2 ? "bg-warning" : "bg-emerald"}`}
                        aria-hidden
                      />
                      <span className="h-1.5 rounded bg-[var(--border)]" style={{ width: `${58 + row * 12}px` }} />
                    </span>
                    <span className="h-1.5 w-10 rounded bg-[var(--border)]" />
                  </div>
                ))}
              </div>

              <p className="mt-3 flex items-start gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-2.5 py-2 text-[9.5px] leading-relaxed text-muted">
                <Lock className="mt-px size-3 shrink-0" aria-hidden />
                {active.hiddenNote}
              </p>
            </motion.div>
          </div>
        </Reveal>

        <p className="mt-3 text-[10.5px] text-muted">
          {dict.roles.matrixNote} · {dict.common.demoData}.
        </p>
      </div>
    </section>
  );
}
