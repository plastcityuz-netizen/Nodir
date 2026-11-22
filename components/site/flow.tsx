"use client";

import { Database, LineChart, Lightbulb, Zap } from "lucide-react";
import { useI18n } from "@/components/providers/i18n-provider";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

const icons = [Database, LineChart, Lightbulb, Zap];

export function Flow() {
  const { dict } = useI18n();

  return (
    <section className="section relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-[linear-gradient(90deg,transparent,var(--border-strong),transparent)]" aria-hidden />
      <div className="wrap relative">
        <Reveal>
          <SectionHeading
            eyebrow={dict.flow.eyebrow}
            title={dict.flow.title}
            sub={dict.flow.sub}
            align="center"
          />
        </Reveal>

        <div className="relative mt-12 grid gap-3 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-4">
          <div
            className="pointer-events-none absolute left-[6%] right-[6%] top-[42px] hidden h-px bg-[linear-gradient(90deg,transparent,var(--emerald),var(--cyan),var(--violet),var(--warning))] opacity-40 lg:block"
            aria-hidden
          />
          {dict.flow.steps.map((step, index) => {
            const Icon = icons[index] ?? Database;
            return (
              <Reveal key={step.key} delay={index * 0.08} className="relative">
                <div className="group relative h-full overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 transition-colors duration-300 hover:border-emerald/30">
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="grid size-10 place-items-center rounded-xl border border-emerald/25 bg-emerald-soft text-emerald-ink">
                      <Icon className="size-[18px]" aria-hidden />
                    </span>
                    <span className="font-display text-[11px] font-semibold tracking-[0.18em] text-muted">
                      0{index + 1}
                    </span>
                  </div>
                  <div className="mt-5 flex items-baseline gap-2">
                    <span className="rounded bg-[var(--elevated)] px-1.5 py-0.5 font-mono text-[9.5px] uppercase tracking-[0.12em] text-emerald-ink">
                      {step.key}
                    </span>
                    <h3 className="text-[15px] font-semibold text-ink">{step.title}</h3>
                  </div>
                  <p className="mt-2.5 text-[12.5px] leading-relaxed text-muted">{step.text}</p>
                  <p className="mt-4 flex items-center gap-1.5 border-t border-[var(--border)] pt-3 text-[10.5px] text-ink/70">
                    <span className="h-1 w-1 rounded-full bg-emerald" aria-hidden />
                    {step.example}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
