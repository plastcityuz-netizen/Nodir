import { describe, expect, it } from "vitest";
import {
  CASH_FLOW,
  DEBTORS,
  DEMO_COMPANY,
  EXPENSE_BREAKDOWN,
  KPI,
  SALES_TREND,
  TRANSACTIONS,
} from "@/lib/mock/demo";
import { ru } from "@/lib/i18n/ru";

describe("demo ma’lumotlar izchilligi", () => {
  it("tushum − xarajat = sof foyda", () => {
    expect(KPI.revenue - KPI.expenses).toBe(KPI.profit);
  });

  it("xarajat toifalari yig‘indisi jami xarajatga teng", () => {
    expect(EXPENSE_BREAKDOWN.reduce((sum, item) => sum + item.value, 0)).toBe(KPI.expenses);
  });

  it("cash flow oxiri kassa qoldig‘iga teng", () => {
    expect(Math.round((CASH_FLOW[CASH_FLOW.length - 1]?.value ?? 0) / 1_000_000)).toBe(486);
    expect(KPI.cash).toBe(486_200_000);
  });

  it("oylik trend oxirgi oyi KPI bilan mos", () => {
    const last = SALES_TREND[SALES_TREND.length - 1];
    expect(last?.revenue).toBe(KPI.revenue / 1_000_000);
    expect(last?.profit).toBe(KPI.profit / 1_000_000);
  });

  it("debitorlar yig‘indisi 48,2 mln", () => {
    expect(DEBTORS.reduce((sum, item) => sum + item.amount, 0)).toBe(48_200_000);
  });

  it("kompaniya nomi va ombor qatorlari ruschada ham mahalliy", () => {
    expect(DEMO_COMPANY.name.ru).toContain("ООО");
    expect(DEMO_COMPANY.name.uz).toContain("MCHJ");
    expect(ru.modules.mini.stockItems.every((item) => /[А-Яа-яЁё]/.test(item.name))).toBe(true);
    expect(ru.a11y.skip).toMatch(/[А-Яа-яЁё]/);
  });

  it("operatsiyalar demo va ijobiy summaga ega", () => {
    for (const item of TRANSACTIONS) {
      expect(item.amount).toBeGreaterThan(0);
      expect(item.name.uz.length).toBeGreaterThan(0);
      expect(item.name.ru.length).toBeGreaterThan(0);
    }
  });
});
