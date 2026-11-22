/**
 * Yagona formatlash qatlami.
 * Pul, sana, foiz va katta sonlar faqat shu fayl orqali formatlanadi (QA talabi).
 * O‘zbekcha standart: bo‘linmas probel (U+00A0), kasr ajratgichi — vergul.
 */

const NBSP = "\u00A0";

export const CURRENCY_LABEL = {
  uz: "so‘m",
  ru: "сум",
} as const;

export type Currency = keyof typeof CURRENCY_LABEL;

type MoneyOptions = {
  currency?: Currency;
  compact?: boolean;
  signed?: boolean;
  withLabel?: boolean;
  decimals?: number;
};

function groupInteger(value: string): string {
  return value.replace(/\B(?=(\d{3})+(?!\d))/g, NBSP);
}

function formatDecimal(value: number, decimals: number): string {
  const fixed = Math.abs(value).toFixed(decimals);
  const [intPart = "0", fracPart] = fixed.split(".");
  const int = groupInteger(intPart);
  return fracPart ? `${int},${fracPart}` : int;
}

/** 1 250 000 so‘m · 1,2 mlrd so‘m · 450 ming so‘m */
export function formatMoney(value: number, options: MoneyOptions = {}): string {
  const { currency = "uz", compact = false, signed = false, withLabel = true, decimals } = options;
  const safe = Number.isFinite(value) ? value : 0;
  const sign = signed ? (safe > 0 ? "+" : safe < 0 ? "−" : "") : safe < 0 ? "−" : "";
  const abs = Math.abs(safe);
  const label = withLabel ? `${NBSP}${CURRENCY_LABEL[currency]}` : "";

  if (compact) {
    if (abs >= 1_000_000_000) {
      return `${sign}${formatDecimal(abs / 1_000_000_000, decimals ?? 1)}${NBSP}mlrd${label}`;
    }
    if (abs >= 1_000_000) {
      return `${sign}${formatDecimal(abs / 1_000_000, decimals ?? 1)}${NBSP}mln${label}`;
    }
    if (abs >= 1_000) {
      return `${sign}${formatDecimal(abs / 1_000, decimals ?? 0)}${NBSP}ming${label}`;
    }
    return `${sign}${formatDecimal(abs, decimals ?? 0)}${label}`;
  }

  return `${sign}${formatDecimal(abs, decimals ?? 0)}${label}`;
}

/** Tilga mos valyuta bilan pul formati */
export function money(value: number, lang: "uz" | "ru", options: MoneyOptions = {}): string {
  return formatMoney(value, { ...options, currency: lang === "ru" ? "ru" : "uz" });
}

/** 18,4% — ishora ixtiyoriy */
export function formatPercent(value: number, options: { signed?: boolean; decimals?: number } = {}): string {
  const { signed = true, decimals = 1 } = options;
  const safe = Number.isFinite(value) ? value : 0;
  const sign = signed ? (safe > 0 ? "+" : safe < 0 ? "−" : "") : "";
  return `${sign}${formatDecimal(Math.abs(safe), decimals)}%`;
}

/** 12.03.2025 */
export function formatDate(value: Date | string | number): string {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${day}.${month}.${date.getFullYear()}`;
}

/** 12.03.2025, 14:05 */
export function formatDateTime(value: Date | string | number): string {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${formatDate(date)}, ${hours}:${minutes}`;
}

/** Katta sonlarni qisqartirish: 1 250 000 → 1,25 mln */
export function formatCompactNumber(value: number): string {
  return formatMoney(value, { compact: true, withLabel: false, decimals: 1 });
}

/** Oddiy butun son: 12 480 */
export function formatNumber(value: number, decimals = 0): string {
  return formatDecimal(value, decimals);
}

/** Qarz muddati va shunga o‘xshash kun hisoblari */
export function formatDays(count: number, lang: "uz" | "ru" = "uz"): string {
  if (lang === "ru") return `${formatNumber(count)} дн.`;
  return `${formatNumber(count)} kun`;
}

const PHONE_DIGITS = /\D+/g;

/** +998 90 123 45 67 formatiga keltiradi (9 xonali milliy raqam) */
export function normalizePhone(input: string): string {
  const digits = input.replace(PHONE_DIGITS, "");
  const local = digits.startsWith("998") ? digits.slice(3) : digits;
  return local.slice(0, 9);
}

export function formatPhone(input: string): string {
  const digits = normalizePhone(input);
  const [a = "", b = "", c = ""] = [digits.slice(0, 2), digits.slice(2, 5), digits.slice(5, 7)];
  const d = digits.slice(7, 9);
  let out = "+998";
  if (a) out += ` ${a}`;
  if (b) out += ` ${b}`;
  if (c) out += ` ${c}`;
  if (d) out += ` ${d}`;
  return out;
}

export function isPhoneComplete(input: string): boolean {
  return normalizePhone(input).length === 9;
}

/** STIR — 9 raqam */
export function normalizeTin(input: string): string {
  return input.replace(PHONE_DIGITS, "").slice(0, 9);
}

export function isValidTin(input: string): boolean {
  return /^\d{9}$/.test(normalizeTin(input));
}

export function isValidEmail(input: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(input.trim());
}

/** Solishtirma delta: ▲ +18,4% / ▼ −6,2% / · 0,0% */
export function formatDelta(value: number): string {
  if (value === 0) return `· ${formatDecimal(0, 1)}%`;
  const arrow = value > 0 ? "▲" : "▼";
  const text = formatPercent(value, { signed: false });
  return `${arrow} ${text}`;
}

/** Ishorani so‘z bilan ham ko‘rsatish (faqat rangga tayanmaslik uchun) */
export function trendLabel(value: number, lang: "uz" | "ru" = "uz"): string {
  const word = value === 0 ? (lang === "ru" ? "без изменений" : "o‘zgarishsiz") : value > 0 ? (lang === "ru" ? "o‘sish" : "o‘sish") : lang === "ru" ? "pasayish" : "pasayish";
  return `${formatDelta(value)} ${word}`;
}
