"use client";

/* global-error alohida html/body render qiladi — Link bu yerda ishonchli emas */
/* eslint-disable @next/next/no-html-link-for-pages */
import "./globals.css";

export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  return (
    <html lang="uz-Latn" className="dark">
      <body>
        <div className="flex min-h-dvh flex-col items-center justify-center gap-4 bg-bg px-6 text-center text-ink">
          <span className="font-display text-[11px] uppercase tracking-[0.3em] text-muted">BALANS AI</span>
          <h1 className="font-display text-3xl font-semibold">Nimadir noto‘g‘ri ketdi.</h1>
          <p className="max-w-sm text-sm text-muted">
            Sahifani yangilang yoki bosh sahifaga qayting.
            <br />
            Обновите страницу или вернитесь на главную.
          </p>
          <div className="mt-2 flex gap-2">
            <button
              type="button"
              onClick={() => reset()}
              className="min-h-11 rounded-xl bg-emerald-fill px-5 text-sm font-medium text-[#04130E]"
            >
              Qayta urinish
            </button>
            <a
              href="/"
              className="min-h-11 rounded-xl border border-[var(--border-strong)] px-5 text-sm leading-[44px] text-ink"
            >
              Bosh sahifa
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
