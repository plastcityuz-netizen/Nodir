/**
 * YAGONA MANBA: tariflar, narxlar, limitlar va sinov shartlari.
 * UI, hisob-kitob va testlar faqat shu fayldan o‘qiydi.
 *
 * TODO(egasi): quyidagi qiymatlar O‘zbekiston bozoridagi o‘rtacha narxlarga
 * moslangan boshlang‘ich taklif. Ishga tushirishdan oldin egasi tasdiqlaydi,
 * shu jumladan QQS holati va “karta shart emas” va’dasi.
 */

export type PlanId = "start" | "business" | "premium" | "enterprise";

export type Plan = {
  id: PlanId;
  name: string;
  monthly: number | null;
  /** Yillik narx = oylik × 10 (2 oy bepul) */
  yearly: number | null;
  audience: { uz: string; ru: string };
  popular: boolean;
  custom: boolean;
  companies: { uz: string; ru: string };
  users: { uz: string; ru: string };
  ai: { uz: string; ru: string };
  modules: { uz: string; ru: string };
};

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
    companies: { uz: "1", ru: "1" },
    users: { uz: "3", ru: "3" },
    ai: { uz: "30 savol/oy", ru: "30 вопросов/мес" },
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
    companies: { uz: "1", ru: "1" },
    users: { uz: "10", ru: "10" },
    ai: { uz: "300 savol/oy, Ertalabki brif", ru: "300 вопросов/мес, утренний бриф" },
    modules: {
      uz: "Start + Xarid, Moliya va cash flow, HR va ish haqi, rollar (RBAC), Balans Score, asosiy ishlab chiqarish",
      ru: "Start + Закупки, Финансы и cash flow, HR и зарплата, роли (RBAC), Balans Score, базовое производство",
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
    companies: { uz: "3", ru: "3" },
    users: { uz: "30", ru: "30" },
    ai: { uz: "Cheksiz (adolatli foydalanish), “agar … bo‘lsa?” stsenariylari", ru: "Без лимита (fair use), сценарии «что если»" },
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
    companies: { uz: "Cheksiz", ru: "Без лимита" },
    users: { uz: "Cheksiz", ru: "Без лимита" },
    ai: { uz: "Maxsus", ru: "Индивидуально" },
    modules: {
      uz: "Premium + SLA, maxsus integratsiya, o‘qitish, alohida muhit",
      ru: "Premium + SLA, индивидуальная интеграция, обучение, отдельный контур",
    },
  },
];

export const ADDONS = [
  { key: "user", price: 59_000, unit: { uz: "so‘m/oy", ru: "сум/мес" } },
  { key: "company", price: 290_000, unit: { uz: "so‘m/oy", ru: "сум/мес" } },
  { key: "migration", price: 990_000, unit: { uz: "bir martalik", ru: "разово" } },
] as const;

export const VAT = {
  /** TODO(egasi): QQS holati tasdiqlanmagan — UI’da “QQS holati egasi tasdiqlaydi” deb ko‘rsatiladi */
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
  return plan.monthly * 12 - plan.yearly;
}

export function monthlyEquivalent(plan: Plan): number | null {
  if (plan.yearly === null) return null;
  return Math.round(plan.yearly / 12);
}

/** Tarif limitlarini tekshirish — keyingi bosqichda obuna logikasi shu funksiyaga tayanadi */
export type UsageSnapshot = { users: number; companies: number; aiQuestions: number };

export const PLAN_LIMITS: Record<PlanId, { users: number | null; companies: number | null; aiQuestions: number | null }> = {
  start: { users: 3, companies: 1, aiQuestions: 30 },
  business: { users: 10, companies: 1, aiQuestions: 300 },
  premium: { users: 30, companies: 3, aiQuestions: null },
  enterprise: { users: null, companies: null, aiQuestions: null },
};

export function isWithinLimit(planId: PlanId, usage: UsageSnapshot): boolean {
  const limits = PLAN_LIMITS[planId];
  if (limits.users !== null && usage.users > limits.users) return false;
  if (limits.companies !== null && usage.companies > limits.companies) return false;
  if (limits.aiQuestions !== null && usage.aiQuestions > limits.aiQuestions) return false;
  return true;
}

/** Qaysi limitga yaqinlashgan (yumshoq upsell uchun) */
export function nearingLimit(planId: PlanId, usage: UsageSnapshot): boolean {
  const limits = PLAN_LIMITS[planId];
  const check = (used: number, limit: number | null) => limit !== null && used / limit >= 0.8;
  return (
    check(usage.users, limits.users) ||
    check(usage.companies, limits.companies) ||
    check(usage.aiQuestions, limits.aiQuestions)
  );
}
