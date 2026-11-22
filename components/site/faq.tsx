"use client";

import { Mail, Sparkles } from "lucide-react";
import Link from "next/link";
import { useI18n } from "@/components/providers/i18n-provider";
import { Accordion } from "@/components/ui/accordion";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function Faq() {
  const { dict } = useI18n();

  return (
    <section className="section relative">
      <div className="wrap">
        <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:gap-14">
          <div>
            <Reveal>
              <SectionHeading eyebrow={dict.faq.eyebrow} title={dict.faq.title} sub={dict.faq.sub} />
            </Reveal>
            <Reveal delay={0.08}>
              <div className="mt-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
                <p className="text-[11.5px] text-muted">{dict.pricing.book}</p>
                <div className="mt-3 flex flex-col gap-2">
                  <a
                    href="mailto:salom@balans.ai"
                    className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-[var(--border)] px-3 text-[12px] text-ink/85 transition hover:border-emerald/30 hover:text-emerald-ink"
                  >
                    <Mail className="size-3.5" aria-hidden />
                    {dict.footer.email}
                  </a>
                  <Link
                    href="/royxatdan-otish"
                    className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-emerald/25 bg-emerald-soft px-3 text-[12px] font-medium text-emerald-ink transition hover:border-emerald/40"
                  >
                    <Sparkles className="size-3.5" aria-hidden />
                    {dict.common.start}
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.05}>
            <Accordion items={dict.faq.items} defaultOpen={0} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
