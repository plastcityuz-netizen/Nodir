import { describe, expect, it } from "vitest";
import {
  ADDONS,
  PLANS,
  PLAN_LIMITS,
  TRIAL,
  formatPlanLimit,
  getPlan,
  isWithinLimit,
  monthlyEquivalent,
  nearingLimit,
  yearlySaving,
} from "@/lib/pricing.config";

describe("tarif konfiguratsiyasi", () => {
  it("yillik narx = oylik × 10 (2 oy bepul)", () => {
    for (const plan of PLANS) {
      if (plan.monthly !== null && plan.yearly !== null) {
        expect(plan.yearly).toBe(plan.monthly * 10);
      }
    }
  });

  it("to‘rt tarif mavjud va bittasi ommabop", () => {
    expect(PLANS).toHaveLength(4);
    expect(PLANS.filter((plan) => plan.popular)).toHaveLength(1);
    expect(getPlan("business").monthly).toBe(990_000);
  });

  it("Enterprise narxi kelishuv asosida", () => {
    const enterprise = getPlan("enterprise");
    expect(enterprise.custom).toBe(true);
    expect(enterprise.monthly).toBeNull();
  });

  it("yillik tejash va oylik ekvivalent", () => {
    const start = getPlan("start");
    expect(yearlySaving(start)).toBe(449_000 * 2);
    expect(monthlyEquivalent(start)).toBe(Math.round(4_490_000 / 12));
  });

  it("sinov — birinchi oy bepul, 30 kun, karta shart emas", () => {
    expect(TRIAL.days).toBe(30);
    expect(TRIAL.firstMonthFree).toBe(true);
    expect(TRIAL.cardRequired).toBe(false);
    expect(TRIAL.reminders).toEqual([7, 3, 1]);
  });

  it("qo‘shimcha xizmatlar narxi va davriyligi", () => {
    expect(ADDONS.map((addon) => addon.price)).toEqual([59_000, 290_000, 990_000]);
    expect(ADDONS.map((addon) => addon.cadence)).toEqual(["month", "month", "once"]);
    expect(ADDONS[0].unit).toEqual({ uz: "oy", ru: "мес" });
    expect(ADDONS[2].unit.ru).toBe("разово");
  });
});

describe("limitlar", () => {
  it("Start limiti 3 foydalanuvchi", () => {
    expect(isWithinLimit("start", { users: 3, companies: 1, aiQuestions: 30 })).toBe(true);
    expect(isWithinLimit("start", { users: 4, companies: 1, aiQuestions: 30 })).toBe(false);
  });

  it("Premium AI limiti aniq, kompaniya 3 ta", () => {
    expect(isWithinLimit("premium", { users: 30, companies: 3, aiQuestions: 2_000 })).toBe(true);
    expect(isWithinLimit("premium", { users: 30, companies: 3, aiQuestions: 2_001 })).toBe(false);
    expect(isWithinLimit("premium", { users: 30, companies: 4, aiQuestions: 0 })).toBe(false);
  });

  it("limitlar faqat PLANS dan hosil qilinadi", () => {
    for (const plan of PLANS) {
      expect(PLAN_LIMITS[plan.id]).toEqual(plan.limits);
    }
  });

  it("standart tariflarda “cheksiz” da’vosi yo‘q", () => {
    for (const plan of PLANS.filter((item) => !item.custom)) {
      expect(plan.limits.users).not.toBeNull();
      expect(plan.limits.companies).not.toBeNull();
      expect(plan.limits.aiQuestions).not.toBeNull();
    }
    expect(formatPlanLimit(2_000, "uz", "aiQuestions")).toBe("2 000 savol/oy");
    expect(formatPlanLimit(null, "uz", "users")).toBe("Kelishuv bo‘yicha");
  });

  it("limitga yaqinlashganda yumshoq upsell", () => {
    expect(nearingLimit("business", { users: 9, companies: 1, aiQuestions: 10 })).toBe(true);
    expect(nearingLimit("premium", { users: 2, companies: 1, aiQuestions: 10 })).toBe(false);
  });
});
