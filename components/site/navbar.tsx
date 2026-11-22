"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Menu, Search, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Logo } from "@/components/brand/logo";
import { useI18n } from "@/components/providers/i18n-provider";
import { useCommand } from "@/components/site/command-palette";
import { ButtonLink } from "@/components/ui/button";
import { LangToggle } from "@/components/ui/lang-toggle";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export function Navbar() {
  const { dict } = useI18n();
  const command = useCommand();
  const reduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const links = [
    { label: dict.nav.product, href: "/#mahsulot" },
    { label: dict.nav.solutions, href: "/#yechimlar" },
    { label: dict.nav.ai, href: "/#ai-cfo" },
    { label: dict.nav.pricing, href: "/narxlar" },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-[70]">
      <div className="wrap pt-2.5 sm:pt-4">
        <div
          className={`glass flex items-center justify-between gap-3 rounded-2xl px-3 py-2 transition-all duration-300 ease-balans sm:px-4 ${
            scrolled ? "shadow-float" : "shadow-none"
          }`}
        >
          <Link
            href="/"
            aria-label={`BALANS AI — ${dict.nav.home}`}
            className="shrink-0 rounded-lg focus-visible:outline-offset-4"
          >
            <Logo />
          </Link>

          <nav aria-label="Asosiy" className="hidden items-center gap-1 lg:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2 text-[13.5px] font-medium text-muted transition-colors hover:bg-[var(--elevated)] hover:text-ink"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={command.open}
              aria-label={dict.command.title}
              title={`${dict.command.title} · ⌘K`}
              className="grid size-11 place-items-center rounded-lg border border-[var(--border)] text-muted transition hover:border-[var(--border-strong)] hover:text-ink"
            >
              <Search className="size-[17px]" aria-hidden />
            </button>
            <LangToggle className="hidden sm:inline-flex" />
            <ThemeToggle />
            <Link
              href="/kirish"
              className="hidden rounded-lg px-3 py-2 text-[13.5px] font-medium text-muted transition hover:text-ink md:block"
            >
              {dict.nav.login}
            </Link>
            <ButtonLink href="/royxatdan-otish" size="sm" className="hidden md:inline-flex">
              {dict.nav.cta}
              <ArrowUpRight className="size-3.5" aria-hidden />
            </ButtonLink>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label={dict.nav.openMenu}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="grid size-11 place-items-center rounded-lg border border-[var(--border)] text-ink transition hover:border-[var(--border-strong)] lg:hidden"
            >
              <Menu className="size-[18px]" aria-hidden />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <div className="fixed inset-0 z-[75] lg:hidden">
            <motion.button
              type="button"
              aria-label={dict.nav.close}
              onClick={() => setMenuOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 cursor-default bg-[#03060c]/65 backdrop-blur-sm"
            />
            <motion.div
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label={dict.nav.menu}
              initial={reduce ? undefined : { y: "100%" }}
              animate={reduce ? undefined : { y: 0 }}
              exit={reduce ? undefined : { y: "100%" }}
              transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
              className="glass absolute inset-x-0 bottom-0 max-h-[88dvh] overflow-y-auto rounded-t-3xl p-4 pb-[calc(16px+env(safe-area-inset-bottom,0px))]"
            >
              <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-[var(--border-strong)]" aria-hidden />
              <div className="mb-4 flex items-center justify-between">
                <Logo />
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  aria-label={dict.nav.close}
                  className="grid size-11 place-items-center rounded-lg border border-[var(--border)] text-muted"
                >
                  <X className="size-4" aria-hidden />
                </button>
              </div>

              <nav aria-label="Mobil" className="flex flex-col">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex min-h-[52px] items-center justify-between border-b border-[var(--border)] text-[15px] font-medium text-ink"
                  >
                    {link.label}
                    <ArrowUpRight className="size-4 text-muted" aria-hidden />
                  </Link>
                ))}
                <Link
                  href="/kirish"
                  onClick={() => setMenuOpen(false)}
                  className="flex min-h-[52px] items-center justify-between border-b border-[var(--border)] text-[15px] font-medium text-ink"
                >
                  {dict.nav.login}
                  <ArrowUpRight className="size-4 text-muted" aria-hidden />
                </Link>
              </nav>

              <div className="mt-5 flex items-center justify-between gap-3">
                <LangToggle />
                <ThemeToggle />
              </div>

              <ButtonLink
                href="/royxatdan-otish"
                onClick={() => setMenuOpen(false)}
                size="lg"
                className="mt-4 w-full"
              >
                {dict.nav.cta}
                <ArrowUpRight className="size-4" aria-hidden />
              </ButtonLink>
              <p className="mt-3 text-center text-[11px] text-muted">{dict.common.noCard}</p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
}
