"use client";

import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import { useI18n } from "@/components/providers/i18n-provider";
import { Reveal } from "@/components/ui/reveal";

export function Contact() {
  const { dict } = useI18n();
  const contact = dict.contact;

  return (
    <section id="aloqa" className="scroll-mt-24 py-16 lg:py-24">
      <div className="wrap">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-10">
            <div
              className="pointer-events-none absolute -right-24 -top-24 size-64 rounded-full opacity-40 blur-3xl"
              style={{ background: "var(--violet)" }}
              aria-hidden
            />
            <div className="relative grid gap-8 lg:grid-cols-[1.15fr_.85fr] lg:items-center">
              <div>
                <span className="t-eyebrow text-emerald-ink">{contact.eyebrow}</span>
                <h2 className="t-h2 mt-3 text-ink">{contact.title}</h2>
                <p className="t-lead mt-4 max-w-[520px]">{contact.sub}</p>
              </div>

              <div className="space-y-3">
                <a
                  href={`mailto:${contact.email}`}
                  className="group flex items-center gap-3 rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-3.5 transition-colors hover:border-emerald/40"
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-emerald-soft text-emerald-ink">
                    <Mail className="size-[18px]" aria-hidden />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[10px] uppercase tracking-[0.14em] text-muted">
                      {contact.emailCta}
                    </span>
                    <span className="mt-0.5 block break-all text-sm font-semibold text-ink">
                      {contact.email}
                    </span>
                  </span>
                  <ArrowUpRight className="size-4 shrink-0 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                </a>

                <div className="flex items-start gap-3 rounded-2xl border border-[var(--border)] p-3.5">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[var(--surface-2)] text-ink">
                    <MapPin className="size-[18px]" aria-hidden />
                  </span>
                  <span>
                    <span className="block text-sm font-medium text-ink">{contact.location}</span>
                    <span className="mt-0.5 block text-[11px] leading-relaxed text-muted">{contact.note}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
