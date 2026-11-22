"use client";

import { ArrowUpRight } from "lucide-react";
import { BalanceLine } from "@/components/brand/balance-line";
import { useI18n } from "@/components/providers/i18n-provider";
import { ArrowRight, ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

export function FinalCta() {
  const { dict } = useI18n();

  return (
    <section className="relative pb-16 pt-4 sm:pb-20 lg:pb-24">
      <div className="wrap">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-emerald/20 bg-[linear-gradient(160deg,color-mix(in_srgb,var(--emerald)_10%,var(--surface)),var(--surface)_45%,color-mix(in_srgb,var(--violet)_8%,var(--surface)))] px-5 pb-8 pt-10 text-center sm:px-10 sm:pb-12 sm:pt-14">
            <div className="pointer-events-none absolute inset-0" aria-hidden>
              <div className="aurora">
                <div className="aurora-blob aurora-emerald left-[8%] top-[-20%] h-[320px] w-[420px] opacity-50" />
                <div className="aurora-blob aurora-violet right-[6%] top-[-10%] h-[300px] w-[380px] opacity-40" />
                <div className="aurora-blob aurora-cyan left-[42%] bottom-[-30%] h-[300px] w-[420px] opacity-30" />
              </div>
              <div className="islimi absolute inset-0" />
            </div>

            <div className="relative z-10 mx-auto max-w-[720px]">
              <span className="t-eyebrow text-emerald-ink">{dict.cta.eyebrow}</span>
              <h2 className="t-h2 mt-4 text-ink">{dict.cta.title}</h2>
              <p className="t-lead mx-auto mt-4 max-w-[520px]">{dict.cta.sub}</p>

              <div className="mt-7 flex flex-col items-center justify-center gap-2.5 sm:flex-row">
                <ButtonLink href="/royxatdan-otish" size="lg" className="w-full sm:w-auto">
                  {dict.cta.primary}
                  <ArrowRight />
                </ButtonLink>
                <ButtonLink href="/narxlar" variant="glass" size="lg" className="w-full sm:w-auto">
                  {dict.cta.secondary}
                  <ArrowUpRight className="size-4" aria-hidden />
                </ButtonLink>
              </div>
              <p className="mt-4 text-[10.5px] text-muted">{dict.cta.note}</p>
            </div>

            <BalanceLine quiet className="relative z-10 mx-auto mt-6 max-w-[560px] opacity-80" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
