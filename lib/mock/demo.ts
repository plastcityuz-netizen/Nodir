/**
 * Namunaviy demo ma’lumot. Barcha raqamlar o‘zaro mos:
 * tushum − xarajat = sof foyda; xarajat toifalari yig‘indisi = jami xarajat.
 */
export const DEMO_COMPANY = {
  name: "MCHJ «Nur Tekstil»",
  city: "Toshkent",
  tin: "301234567",
  period: "01–20.11.2026",
  employees: 48,
};

export const KPI = {
  revenue: 1_486_000_000,
  expenses: 1_173_600_000,
  profit: 312_400_000,
  cash: 486_200_000,
  receivable: 148_700_000,
  payable: 96_400_000,
  inventory: 742_500_000,
  profitDelta: 12.4,
  revenueDelta: 8.2,
  expensesDelta: 18,
  cashDelta: 4.6,
  score: 78,
};

export const EXPENSE_BREAKDOWN = [
  { key: "materials", value: 246_000_000, color: "var(--emerald)" },
  { key: "payroll", value: 312_000_000, color: "var(--cyan)" },
  { key: "rent", value: 148_000_000, color: "var(--violet)" },
  { key: "logistics", value: 96_000_000, color: "var(--warning)" },
  { key: "taxes", value: 178_000_000, color: "var(--info)" },
  { key: "other", value: 193_600_000, color: "var(--muted)" },
] as const;

export const EXPENSE_LABELS: Record<(typeof EXPENSE_BREAKDOWN)[number]["key"], { uz: string; ru: string }> = {
  materials: { uz: "Xomashyo", ru: "Сырьё" },
  payroll: { uz: "Ish haqi", ru: "Зарплата" },
  rent: { uz: "Ijara va kommunal", ru: "Аренда и ЖКХ" },
  logistics: { uz: "Logistika", ru: "Логистика" },
  taxes: { uz: "Soliqlar", ru: "Налоги" },
  other: { uz: "Boshqa", ru: "Прочее" },
};

/** 30 kunlik kassa qoldig‘i (mln so‘m) — boshi 412, oxiri 486,2 */
const CASH_POINTS = [
  412, 418, 415, 424, 431, 428, 436, 441, 438, 447, 452, 449, 455, 460, 458, 452, 461, 468, 464,
  471, 476, 472, 479, 474, 480, 484, 479, 483, 481, 486.2,
];

export const CASH_FLOW = CASH_POINTS.map((value, index) => ({
  day: String(index + 1).padStart(2, "0"),
  label: `${String(index + 1).padStart(2, "0")}.11`,
  value: Math.round(value * 1_000_000),
}));

/** Oylik tushum (mln so‘m) */
export const SALES_TREND = [
  { month: "Iyun", revenue: 1_180, profit: 214 },
  { month: "Iyul", revenue: 1_246, profit: 238 },
  { month: "Avgust", revenue: 1_198, profit: 226 },
  { month: "Sentabr", revenue: 1_324, profit: 271 },
  { month: "Oktabr", revenue: 1_373, profit: 278 },
  { month: "Noyabr", revenue: 1_486, profit: 312.4 },
];

export const SCORE_PARTS = [
  { key: "liquidity", uz: "Likvidlik", ru: "Ликвидность", value: 82 },
  { key: "profitability", uz: "Rentabellik", ru: "Рентабельность", value: 74 },
  { key: "debt", uz: "Qarzdorlik", ru: "Долговая нагрузка", value: 71 },
  { key: "inventory", uz: "Ombor aylanishi", ru: "Оборачиваемость склада", value: 84 },
];

export const UPCOMING_PAYMENTS = [
  { key: "vat", label: { uz: "QQS to‘lovi", ru: "Платёж НДС" }, date: "25.11.2026", amount: 18_400_000, tone: "warning" },
  { key: "rent", label: { uz: "Ijara", ru: "Аренда" }, date: "01.12.2026", amount: 48_000_000, tone: "info" },
  { key: "payroll", label: { uz: "Ish haqi", ru: "Зарплата" }, date: "05.12.2026", amount: 312_000_000, tone: "muted" },
] as const;

export const DEBTORS = [
  { name: "«Baraka Savdo» MCHJ", amount: 27_800_000, days: 21 },
  { name: "«Farg‘ona Textile» MCHJ", amount: 12_400_000, days: 12 },
  { name: "«Samarqand Bozor» YaTT", amount: 8_000_000, days: 6 },
];

export const TOP_EXPENSES = [
  { name: { uz: "Xomashyo", ru: "Сырьё" }, value: 246_000_000, share: 21 },
  { name: { uz: "Ish haqi", ru: "Зарплата" }, value: 312_000_000, share: 26.6 },
  { name: { uz: "Soliqlar", ru: "Налоги" }, value: 178_000_000, share: 15.2 },
  { name: { uz: "Ijara", ru: "Аренда" }, value: 148_000_000, share: 12.6 },
  { name: { uz: "Logistika", ru: "Логистика" }, value: 96_000_000, share: 8.2 },
];

export const DEFECT_TREND = [2.9, 2.7, 2.6, 2.4, 2.2, 2.1, 1.9, 1.8];

/** Balans Score yarim doira geometriyasi uchun */
export const SCORE_MAX = 100;
