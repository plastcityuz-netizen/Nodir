"use client";

import { RotateCcw } from "lucide-react";
import { BalanceLine } from "@/components/brand/balance-line";
import { useI18n } from "@/components/providers/i18n-provider";
import { Button, ButtonLink } from "@/components/ui/button";

export default function ErrorPage({ reset }: { error: Error; reset: () => void }) {
  const { dict } = useI18n();

  return (
    <div className="relative flex min-h-dvh items-center overflow-hidden pb-16 pt-28">
      <div className="aurora" aria-hidden>
        <div className="aurora-blob aurora-emerald left-1/2 top-1/4 h-[380px] w-[460px] -translate-x-1/2 opacity-20" />
      </div>
      <div className="wrap relative text-center">
        <div className="mx-auto max-w-[560px]">
          <span className="font-display text-[11px] font-semibold uppercase tracking-[0.28em] text-danger">
            500
          </span>
          <h1 className="t-h2 mt-4 text-[28px] sm:text-[38px]">{dict.error.title}</h1>
          <p className="t-lead mx-auto mt-3 max-w-[420px] text-[14px]">{dict.error.sub}</p>
        </div>
        <div className="mx-auto mt-8 max-w-[520px]">
          <BalanceLine broken />
        </div>
        <div className="mt-6 flex flex-col items-center justify-center gap-2 sm:flex-row">
          <Button size="md" onClick={() => reset()}>
            <RotateCcw className="size-4" aria-hidden />
            {dict.error.retry}
          </Button>
          <ButtonLink href="/" variant="glass" size="md">
            {dict.nav.home}
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
