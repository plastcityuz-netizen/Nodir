"use client";

import { useI18n } from "@/components/providers/i18n-provider";
import type { Lang } from "@/lib/i18n";

export function LangToggle({ className }: { className?: string }) {
  const { lang, setLang, dict } = useI18n();
  const options: { value: Lang; label: string }[] = [
    { value: "uz", label: "UZ" },
    { value: "ru", label: "RU" },
  ];

  return (
    <div
      role="group"
      aria-label={dict.nav.lang}
      className={`inline-flex items-center rounded-lg border border-[var(--border)] p-0.5 text-[11px] font-semibold tracking-wide ${className ?? ""}`}
    >
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => setLang(option.value)}
          aria-pressed={lang === option.value}
          className={`grid min-h-11 min-w-9 place-items-center rounded-[7px] px-1.5 transition ${
            lang === option.value
              ? "bg-[var(--elevated)] text-ink shadow-[inset_0_1px_0_var(--glass-inner)]"
              : "text-muted hover:text-ink"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
