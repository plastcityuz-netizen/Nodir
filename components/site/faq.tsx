"use client";

import { Mail, MessageCircle } from "lucide-react";
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
                  <a
                    href="https://t.me/balansai"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-[var(--border)] px-3 text-[12px] text-ink/85 transition hover:border-emerald/30 hover:text-emerald-ink"
                  >
                    <MessageCircle className="size-3.5" aria-hidden />
                    Telegram · {dict.footer.telegram}
                  </a>
                </div>
                <p className="mt-2 text-[9.5px] leading-relaxed text-muted/80">{dict.footer.todoNote}</p>
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
