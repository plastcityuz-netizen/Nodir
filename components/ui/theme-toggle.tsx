"use client";

import { Moon, Sun } from "lucide-react";
import { applyTheme, getActiveTheme, otherTheme } from "@/lib/theme";
import { useI18n } from "@/components/providers/i18n-provider";

export function ThemeToggle({ className }: { className?: string }) {
  const { dict } = useI18n();

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    applyTheme(otherTheme(getActiveTheme()), { x: event.clientX, y: event.clientY });
  };

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dict.nav.theme}
      title={dict.nav.theme}
      className={`grid size-11 place-items-center rounded-lg border border-[var(--border)] text-muted transition hover:border-[var(--border-strong)] hover:text-ink ${className ?? ""}`}
    >
      <Sun className="hidden size-[18px] dark:block" aria-hidden />
      <Moon className="size-[18px] dark:hidden" aria-hidden />
    </button>
  );
}
