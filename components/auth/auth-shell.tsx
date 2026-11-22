import { Check, ShieldCheck } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { BalanceLine } from "@/components/brand/balance-line";
import { Logo } from "@/components/brand/logo";

export function AuthShell({
  title,
  sub,
  asideTitle,
  asideFacts,
  asideNote,
  children,
}: {
  title: string;
  sub: string;
  asideTitle: string;
  asideFacts: string[];
  asideNote: string;
  children: ReactNode;
}) {
  return (
    <div className="relative min-h-dvh overflow-hidden pb-16 pt-24 sm:pt-28 lg:pt-32">
      <div className="aurora" aria-hidden>
        <div className="aurora-blob aurora-emerald -left-24 top-10 h-[380px] w-[440px] opacity-25" />
        <div className="aurora-blob aurora-violet right-0 top-1/3 h-[420px] w-[480px] opacity-25" />
      </div>

      <div className="wrap relative">
        <div className="grid gap-4 lg:grid-cols-[1fr_.9fr] lg:gap-6">
          <div className="glass rounded-3xl p-5 sm:p-7 lg:p-9">
            <Link href="/" aria-label="BALANS AI" className="inline-block">
              <Logo />
            </Link>
            <h1 className="t-h2 mt-7 text-[26px] sm:text-[32px]">{title}</h1>
            <p className="mt-2 max-w-[440px] text-[13px] leading-relaxed text-muted">{sub}</p>
            <div className="mt-6">{children}</div>
          </div>

          <aside className="relative hidden overflow-hidden rounded-3xl border border-[var(--border)] bg-[linear-gradient(160deg,color-mix(in_srgb,var(--emerald)_9%,var(--surface)),var(--surface)_50%,color-mix(in_srgb,var(--violet)_7%,var(--surface)))] p-7 lg:flex lg:flex-col lg:justify-between">
            <div className="islimi absolute inset-0" aria-hidden />
            <div className="relative">
              <span className="rounded-full border border-emerald/25 bg-emerald-soft px-2.5 py-1 text-[10px] font-medium text-emerald-ink">
                BALANS AI
              </span>
              <h2 className="mt-5 max-w-[320px] font-display text-[24px] font-semibold leading-tight text-ink">
                {asideTitle}
              </h2>
              <ul className="mt-6 space-y-2.5">
                {asideFacts.map((fact) => (
                  <li key={fact} className="flex items-start gap-2 text-[12px] text-ink/85">
                    <span className="mt-0.5 grid size-4 shrink-0 place-items-center rounded-full bg-emerald-soft text-emerald-ink">
                      <Check className="size-2.5" aria-hidden />
                    </span>
                    {fact}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <BalanceLine quiet className="opacity-80" />
              <p className="mt-2 flex items-start gap-2 rounded-xl border border-[var(--border)] bg-[color-mix(in_srgb,var(--surface)_60%,transparent)] px-3 py-2.5 text-[10px] leading-relaxed text-muted">
                <ShieldCheck className="mt-px size-3.5 shrink-0 text-emerald-ink" aria-hidden />
                {asideNote}
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
