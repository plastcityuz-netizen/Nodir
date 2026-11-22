"use client";

import { ArrowRight, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useI18n } from "@/components/providers/i18n-provider";

export function MobileTrialBar() {
  const { dict } = useI18n();
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 620);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (dismissed) return null;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-[60] px-3 pb-[calc(10px+env(safe-area-inset-bottom,0px))] transition-all duration-300 md:hidden ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <div className="glass flex items-center gap-2 rounded-2xl p-2 pl-3 shadow-float">
        <div className="min-w-0 flex-1">
          <p className="truncate text-[11.5px] font-medium text-ink">{dict.common.trial}</p>
          <p className="truncate text-[9.5px] text-muted">{dict.common.noCard}</p>
        </div>
        <Link
          href="/royxatdan-otish"
          className="inline-flex min-h-11 shrink-0 items-center gap-1 rounded-xl bg-emerald-fill px-3 text-[11.5px] font-semibold text-[#04130E]"
        >
          {dict.nav.cta}
          <ArrowRight className="size-3.5" aria-hidden />
        </Link>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          aria-label={dict.common.close}
          className="grid size-11 shrink-0 place-items-center rounded-lg text-muted"
        >
          <X className="size-4" aria-hidden />
        </button>
      </div>
    </div>
  );
}
