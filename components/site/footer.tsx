"use client";

import { ArrowUp, Mail, MapPin } from "lucide-react";
import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { useI18n } from "@/components/providers/i18n-provider";
import { LangToggle } from "@/components/ui/lang-toggle";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export function Footer() {
  const { dict } = useI18n();
  const year = new Date().getFullYear();

  const columns = [
    {
      title: dict.footer.product,
      links: [
        { label: dict.footer.links.features, href: "/#mahsulot" },
        { label: dict.footer.links.ai, href: "/#ai-cfo" },
        { label: dict.footer.links.roles, href: "/#rollar" },
        { label: dict.footer.links.pricing, href: "/narxlar" },
      ],
    },
    {
      title: dict.footer.company,
      links: [
        { label: dict.footer.links.trial, href: "/royxatdan-otish" },
        { label: dict.footer.links.signup, href: "/royxatdan-otish" },
        { label: dict.footer.links.login, href: "/kirish" },
        { label: dict.footer.links.contact, href: "mailto:salom@balans.ai" },
      ],
    },
    {
      title: dict.footer.legal,
      links: [
        { label: dict.footer.links.privacy, href: "/maxfiylik" },
        { label: dict.footer.links.terms, href: "/shartlar" },
        { label: dict.footer.links.offer, href: "/narxlar#faq" },
      ],
    },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-[var(--border)] pb-[calc(96px+env(safe-area-inset-bottom,0px))] pt-16 sm:pt-20 md:pb-[calc(24px+env(safe-area-inset-bottom,0px))]">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="islimi absolute inset-x-0 bottom-0 h-[420px]" />
        <div
          className="absolute -left-20 bottom-0 h-[360px] w-[560px] rounded-full opacity-30 blur-[100px]"
          style={{ background: "radial-gradient(circle, rgba(25,227,166,.35), transparent 70%)" }}
        />
      </div>

      <div className="wrap relative">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_.75fr_.75fr_.9fr]">
          <div className="max-w-[360px]">
            <Logo />
            <p className="mt-4 text-[13.5px] leading-relaxed text-muted">{dict.footer.desc}</p>
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-emerald/25 bg-emerald-soft px-2.5 py-1 text-[11px] font-medium text-emerald-ink">
                {dict.common.trial}
              </span>
              <span className="rounded-full border border-[var(--border)] px-2.5 py-1 text-[11px] text-muted">
                {dict.common.noCard}
              </span>
            </div>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                {column.title}
              </h2>
              <ul className="mt-4 flex flex-col gap-2.5">
                {column.links.map((link) => (
                  <li key={`${column.title}-${link.label}`}>
                    <Link
                      href={link.href}
                      className="text-[13.5px] text-ink/85 transition-colors hover:text-emerald-ink"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
              {dict.footer.contact}
            </h2>
            <ul className="mt-4 flex flex-col gap-3">
              <li>
                <a
                  href="mailto:salom@balans.ai"
                  className="inline-flex items-center gap-2 text-[13.5px] text-ink/85 transition hover:text-emerald-ink"
                >
                  <Mail className="size-3.5 text-muted" aria-hidden />
                  {dict.footer.email}
                </a>
              </li>
              <li className="inline-flex items-center gap-2 text-[13.5px] text-ink/85">
                <MapPin className="size-3.5 text-muted" aria-hidden />
                {dict.footer.location}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-[var(--border)] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11.5px] text-muted">
            <span suppressHydrationWarning>
              © {year} BALANS AI. {dict.footer.rights}
            </span>
            <span className="hidden sm:inline" aria-hidden>
              ·
            </span>
            <span>{dict.footer.madeIn}</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-muted">{dict.footer.lang}</span>
              <LangToggle />
            </div>
            <div className="flex items-center gap-2">
              <span className="sr-only">{dict.footer.theme}</span>
              <ThemeToggle />
            </div>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="inline-flex min-h-11 items-center gap-1.5 rounded-lg border border-[var(--border)] px-3 text-[11.5px] text-muted transition hover:text-ink"
            >
              <ArrowUp className="size-3.5" aria-hidden />
              {dict.footer.top}
            </button>
          </div>
        </div>

        <p className="mt-4 text-[10.5px] leading-relaxed text-muted/70">{dict.footer.demoNote}</p>
      </div>
    </footer>
  );
}
