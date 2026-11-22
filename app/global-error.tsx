"use client";

/* global-error alohida html/body render qiladi — Link bu yerda ishonchli emas */
/* eslint-disable @next/next/no-html-link-for-pages */
import { useEffect, useState } from "react";
import "./globals.css";

const COPY = {
  uz: {
    title: "Nimadir noto‘g‘ri ketdi.",
    body: "Sahifani yangilang yoki bosh sahifaga qayting.",
    retry: "Qayta urinish",
    home: "Bosh sahifa",
    htmlLang: "uz-Latn",
  },
  ru: {
    title: "Что-то пошло не так.",
    body: "Обновите страницу или вернитесь на главную.",
    retry: "Попробовать снова",
    home: "Главная",
    htmlLang: "ru",
  },
} as const;

export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  const [lang, setLang] = useState<keyof typeof COPY>("uz");

  useEffect(() => {
    const fromCookie = document.cookie.match(/(?:^|;\s*)balans_lang=(uz|ru)/)?.[1];
    if (fromCookie === "ru" || fromCookie === "uz") setLang(fromCookie);
    else if (navigator.language.toLowerCase().startsWith("ru")) setLang("ru");
  }, []);

  const copy = COPY[lang];

  return (
    <html lang={copy.htmlLang} className="dark">
      <body>
        <div className="flex min-h-dvh flex-col items-center justify-center gap-4 bg-bg px-6 text-center text-ink">
          <span className="font-display text-[11px] uppercase tracking-[0.3em] text-muted">BALANS AI</span>
          <h1 className="font-display text-3xl font-semibold">{copy.title}</h1>
          <p className="max-w-sm text-sm text-muted">{copy.body}</p>
          <div className="mt-2 flex gap-2">
            <button
              type="button"
              onClick={() => reset()}
              className="min-h-11 rounded-xl bg-emerald-fill px-5 text-sm font-medium text-[#04130E]"
            >
              {copy.retry}
            </button>
            <a
              href="/"
              className="min-h-11 rounded-xl border border-[var(--border-strong)] px-5 text-sm leading-[44px] text-ink"
            >
              {copy.home}
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
