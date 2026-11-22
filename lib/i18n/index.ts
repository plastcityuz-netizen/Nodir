import { ru } from "./ru";
import { uz, type Dictionary } from "./uz";

export const LANGUAGES = ["uz", "ru"] as const;
export type Lang = (typeof LANGUAGES)[number];

export const LANG_COOKIE = "balans_lang";
export const DEFAULT_LANG: Lang = "uz";

export const LANG_LABEL: Record<Lang, string> = { uz: "UZ", ru: "RU" };
export const HTML_LANG: Record<Lang, string> = { uz: "uz-Latn", ru: "ru" };
export const OG_LOCALE: Record<Lang, string> = { uz: "uz_UZ", ru: "ru_RU" };

const dictionaries: Record<Lang, Dictionary> = { uz, ru };

export function isLang(value: unknown): value is Lang {
  return typeof value === "string" && (LANGUAGES as readonly string[]).includes(value);
}

export function getDictionary(lang: Lang): Dictionary {
  return dictionaries[lang];
}

export function otherLang(lang: Lang): Lang {
  return lang === "uz" ? "ru" : "uz";
}

export type { Dictionary };
