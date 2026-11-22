import { cookies } from "next/headers";
import { DEFAULT_LANG, getDictionary, isLang, LANG_COOKIE, type Dictionary, type Lang } from ".";

export async function getLang(): Promise<Lang> {
  const store = await cookies();
  const value = store.get(LANG_COOKIE)?.value;
  return isLang(value) ? value : DEFAULT_LANG;
}

export async function getI18n(): Promise<{ lang: Lang; dict: Dictionary }> {
  const lang = await getLang();
  return { lang, dict: getDictionary(lang) };
}

export * from ".";
