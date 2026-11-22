/**
 * YAGONA MANBA: tariflar, narxlar, limitlar va sinov shartlari.
 * UI, hisob-kitob va testlar faqat shu fayldan o‘qiydi.
 *
 * Qiymatlar O‘zbekiston bozoridagi o‘rtacha narxlarga moslangan boshlang‘ich
 * taklif. Yakuniy shartlar shartnomada belgilanadi, shu jumladan QQS holati
 * va “karta shart emas” va’dasi.
 */

export type PlanId = "start" | "business" | "premium" | "enterprise";
export type LimitKey = "users" | "companies" | "aiQuestions";
export type PriceLang = "uz" | "ru";

/** Raqamli limitlar. `null` — tarif bo‘yicha individual kelishuv. */
export type PlanLimits = Record<LimitKey, number | null>;

export type Plan = {
  id: PlanId;
  name: string;
  monthly: number | null;
  /** Yillik narx = oylik × 10 (2 oy bepul) */
  yearly: number | null;
  audience: { uz: string; ru: string };
  popular: boolean;
  custom: boolean;
  limits: PlanLimits;
  modules: { uz: string; ru: string };
};

export const YEARLY = {
  months: 12,
  /** Yillik to‘lovda to‘lanadigan oylar soni */
  paidMonths: 10,
} as const;

export const YEARLY_FREE_MONTHS = YEARLY.months - YEARLY.paidMonths;

export const TRIAL = {
  /** Birinchi oy bepul = 30 kun */
  days: 30,
  firstMonthFree: true,
  /** Sinov davrida Premium darajasidagi imkoniyatlar ochiq */
  level: "premium" as PlanId,
  aiQuestions: 100,
  cardRequired: false,
  graceDays: 3,
  reminders: [7, 3, 1] as const,
} as const;

export const PLANS: Plan[] = [
  {
    id: "start",
    name: "Start",
    monthly: 449_000,
    yearly: 4_490_000,
    audience: { uz: "YaTT va kichik do‘konlar", ru: "ИП и небольшие магазины" },
    popular: false,
    custom: false,
    limits: { users: 3, companies: 1, aiQuestions: 30 },
    modules: {
      uz: "Buxgalteriya, Savdo, Ombor, asosiy hisobotlar",
      ru: "Бухгалтерия, Продажи, Склад, базовые отчёты",
    },
  },
  {
    id: "business",
    name: "Business",
    monthly: 990_000,
    yearly: 9_900_000,
    audience: { uz: "Rivojlanayotgan MCHJ va savdo kompaniyalari", ru: "Растущие ООО и торговые компании" },
    popular: true,
    custom: false,
    limits: { users: 10, companies: 1, aiQuestions: 300 },
    modules: {
      uz: "Start + Xarid, Moliya va cash flow, HR va ish haqi, rollar va ruxsatlar, Balans Score, asosiy ishlab chiqarish",
      ru: "Start + Закупки, Финансы и cash flow, HR и зарплата, роли и права, Balans Score, базовое производство",
    },
  },
  {
    id: "premium",
    name: "Premium",
    monthly: 1_790_000,
    yearly: 17_900_000,
    audience: { uz: "Zavodlar va ko‘p tarmoqli kompaniyalar", ru: "Заводы и многопрофильные компании" },
    popular: false,
    custom: false,
    // “Cheksiz” emas: aniq yuqori limit. Haqiqiy backend bu limitni tekshiradi.
    limits: { users: 30, companies: 3, aiQuestions: 2_000 },
    modules: {
      uz: "Business + to‘liq ishlab chiqarish va tannarx tahlili, audit log, integratsiyalar, shaxsiy menejer",
      ru: "Business + полное производство и анализ себестоимости, audit log, интеграции, персональный менеджер",
    },
  },
  {
    id: "enterprise",
    name: "Enterprise",
    monthly: null,
    yearly: null,
    audience: { uz: "Yirik kompaniyalar", ru: "Крупные компании" },
    popular: false,
    custom: true,
    // Individual shartnoma: raqamli limitlar kelishuvda belgilanadi.
    limits: { users: null, companies: null, aiQuestions: null },
    modules: {
      uz: "Premium + SLA, maxsus integratsiya, o‘qitish, alohida muhit",
      ru: "Premium + SLA, индивидуальная интеграция, обучение, отдельный контур",
    },
  },
];

export const ADDONS = [
  { key: "user", price: 59_000, cadence: "month", unit: { uz: "oy", ru: "мес" } },
  { key: "company", price: 290_000, cadence: "month", unit: { uz: "oy", ru: "мес" } },
  { key: "migration", price: 990_000, cadence: "once", unit: { uz: "bir martalik", ru: "разово" } },
] as const;

export const VAT = {
  /** QQS holati hali aniqlanmagan — UI’da to‘lov sahifasida ko‘rsatiladi deb yoziladi */
  confirmed: false,
  rate: 0.12,
} as const;

export function getPlan(id: PlanId): Plan {
  const plan = PLANS.find((item) => item.id === id);
  if (!plan) throw new Error(`Noma’lum tarif: ${id}`);
  return plan;
}

export function yearlySaving(plan: Plan): number {
  if (plan.monthly === null || plan.yearly === null) return 0;
  return plan.monthly * YEARLY.months - plan.yearly;
}

export function monthlyEquivalent(plan: Plan): number | null {
  if (plan.yearly === null) return null;
  return Math.round(plan.yearly / YEARLY.months);
}

/** Tarif limitini foydalanuvchiga ko‘rsatiladigan matnga aylantiradi. */
export function formatPlanLimit(
  value: number | null,
  lang: PriceLang,
  key: LimitKey,
): string {
  if (value === null) {
    // Null faqat individual shartnoma (Enterprise) uchun ishlatiladi.
    return lang === "uz" ? "Kelishuv bo‘yicha" : "По договорённости";
  }
  if (key === "aiQuestions") {
    return `${value.toLocaleString("ru-RU").replace(/\u00A0/g, " ")} ${
      lang === "uz" ? "savol/oy" : "вопросов/мес"
    }`;
  }
  return String(value);
}

export function planLimit(plan: Plan, key: LimitKey, lang: PriceLang): string {
  return formatPlanLimit(plan.limits[key], lang, key);
}

/**
 * Tarif limitlari faqat PLANS yozuvlaridan hosil qilinadi — ikkinchi marta
 * qo‘lda yozilmaydi. Obuna logikasi shu obyektga tayanadi.
 */
export const PLAN_LIMITS: Record<PlanId, PlanLimits> = Object.fromEntries(
  PLANS.map((plan) => [plan.id, plan.limits]),
) as Record<PlanId, PlanLimits>;

export type UsageSnapshot = { users: number; companies: number; aiQuestions: number };

export function isWithinLimit(planId: PlanId, usage: UsageSnapshot): boolean {
  const limits = PLAN_LIMITS[planId];
  for (const key of ["users", "companies", "aiQuestions"] as const) {
    const limit = limits[key];
    if (limit !== null && usage[key] > limit) return false;
  }
  return true;
}

/** Qaysi limitga yaqinlashgan (yumshoq upsell uchun) */
export function nearingLimit(planId: PlanId, usage: UsageSnapshot): boolean {
  const limits = PLAN_LIMITS[planId];
  return (["users", "companies", "aiQuestions"] as const).some((key) => {
    const limit = limits[key];
    return limit !== null && usage[key] / limit >= 0.8;
  });
}
