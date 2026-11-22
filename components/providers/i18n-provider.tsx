"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import {
  DEFAULT_LANG,
  HTML_LANG,
  LANG_COOKIE,
  getDictionary,
  otherLang,
  type Dictionary,
  type Lang,
} from "@/lib/i18n";

type I18nValue = {
  lang: Lang;
  dict: Dictionary;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
};

const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({
  initialLang,
  children,
}: {
  initialLang: Lang;
  children: ReactNode;
}) {
  const [lang, setLangState] = useState<Lang>(initialLang);
  const router = useRouter();

  const setLang = useCallback(
    (next: Lang) => {
      setLangState(next);
      const maxAge = 60 * 60 * 24 * 365;
      document.cookie = `${LANG_COOKIE}=${next};path=/;max-age=${maxAge};samesite=lax`;
      document.documentElement.lang = HTML_LANG[next] ?? next;
      router.refresh();
    },
    [router],
  );

  const value = useMemo<I18nValue>(
    () => ({
      lang,
      dict: getDictionary(lang ?? DEFAULT_LANG),
      setLang,
      toggleLang: () => setLang(otherLang(lang)),
    }),
    [lang, setLang],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n faqat I18nProvider ichida ishlaydi");
  return ctx;
}
