import { ArrowRight } from "lucide-react";
import { BalanceLine } from "@/components/brand/balance-line";
import { ButtonLink } from "@/components/ui/button";
import type { Metadata } from "next";
import { getI18n } from "@/lib/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const { dict } = await getI18n();
  return { title: dict.meta.notFoundTitle, robots: { index: false, follow: false } };
}

export default async function NotFound() {
  const { dict } = await getI18n();
  return (
    <div className="relative flex min-h-dvh items-center overflow-hidden pb-16 pt-28">
      <div className="aurora" aria-hidden>
        <div className="aurora-blob aurora-violet left-1/2 top-1/3 h-[420px] w-[520px] -translate-x-1/2 opacity-25" />
      </div>
      <div className="wrap relative text-center">
        <div className="mx-auto max-w-[620px]">
          <span className="font-display text-[11px] font-semibold uppercase tracking-[0.3em] text-muted">
            {dict.notFound.code}
          </span>
          <h1 className="t-h2 mt-4 text-[28px] sm:text-[40px]">{dict.notFound.title}</h1>
          <p className="t-lead mx-auto mt-3 max-w-[440px] text-[14px]">{dict.notFound.sub}</p>
        </div>
        <div className="mx-auto mt-8 max-w-[560px]">
          <BalanceLine broken />
        </div>
        <div className="mt-6 flex flex-col items-center justify-center gap-2 sm:flex-row">
          <ButtonLink href="/" size="md">
            {dict.notFound.cta}
            <ArrowRight />
          </ButtonLink>
          <ButtonLink href="/narxlar" variant="glass" size="md">
            {dict.notFound.pricing}
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
