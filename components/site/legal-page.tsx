import Link from "next/link";
import { ArrowLeft, FileWarning } from "lucide-react";
import { formatDate } from "@/lib/format";

export function LegalPage({
  title,
  intro,
  sections,
  draftNote,
  updatedLabel,
  updatedAt,
  homeLabel,
}: {
  title: string;
  intro: string;
  sections: { h: string; p: string }[];
  draftNote: string;
  updatedLabel: string;
  updatedAt: string;
  homeLabel: string;
}) {
  return (
    <div className="relative overflow-hidden pb-20 pt-28 sm:pt-32 lg:pt-36">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[380px] grid-lines opacity-30" aria-hidden />
      <div className="wrap relative">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-[12px] text-muted transition hover:text-ink"
        >
          <ArrowLeft className="size-3.5" aria-hidden />
          {homeLabel}
        </Link>
        <div className="mt-6 grid gap-6 lg:grid-cols-[.32fr_.68fr] lg:gap-12">
          <div>
            <h1 className="t-h2 text-[30px] sm:text-[38px]">{title}</h1>
            <p className="mt-3 text-[11px] text-muted">
              {updatedLabel}: {formatDate(updatedAt)}
            </p>
            <div className="mt-5 flex items-start gap-2 rounded-xl border border-warning/25 bg-[color-mix(in_srgb,var(--warning)_7%,transparent)] px-3 py-2.5 text-[10.5px] leading-relaxed text-muted">
              <FileWarning className="mt-px size-3.5 shrink-0 text-warning" aria-hidden />
              {draftNote}
            </div>
          </div>

          <div className="max-w-[760px]">
            <p className="text-[14px] leading-relaxed text-ink/85">{intro}</p>
            <div className="mt-7 space-y-6">
              {sections.map((section, index) => (
                <section key={section.h}>
                  <h2 className="flex items-baseline gap-2 font-display text-[16px] font-semibold text-ink">
                    <span className="text-[11px] text-emerald-ink num">{String(index + 1).padStart(2, "0")}</span>
                    {section.h}
                  </h2>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-muted">{section.p}</p>
                </section>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
