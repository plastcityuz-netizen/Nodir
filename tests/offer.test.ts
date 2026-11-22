import { describe, expect, it } from "vitest";
import {
  TRIAL_OFFER,
  trialChip,
  trialFacts,
  trialShort,
  trialSummary,
} from "@/lib/offer";
import { getPlan, PLAN_LIMITS, PLANS, TRIAL } from "@/lib/pricing.config";
import { uz } from "@/lib/i18n/uz";
import { ru } from "@/lib/i18n/ru";

describe("sinov shartlari — yagona manba", () => {
  it("barcha sinov matnlari TRIAL qiymatlaridan hosil bo‘ladi", () => {
    for (const lang of ["uz", "ru"] as const) {
      expect(trialChip(lang)).toContain(String(TRIAL.days));
      expect(trialShort(lang)).toContain(String(TRIAL.days));
      expect(trialSummary(lang)).toContain(String(TRIAL.days));
      expect(trialSummary(lang)).toContain(String(TRIAL.aiQuestions));
      expect(trialSummary(lang)).toContain(getPlan(TRIAL.level).name);
      expect(trialFacts(lang).join(" ")).toContain(String(TRIAL.days));
      expect(trialFacts(lang).join(" ")).toContain(String(TRIAL.aiQuestions));
    }
    expect(TRIAL_OFFER.level).toBe(getPlan(TRIAL.level).name);
  });

  it("lug‘atlardagi sinov matnlari markaziy matn bilan bir xil", () => {
    expect(uz.auth.successFacts).toEqual(trialFacts("uz"));
    expect(ru.auth.successFacts).toEqual(trialFacts("ru"));
    expect(uz.cta.note).toContain(trialChip("uz"));
    expect(ru.cta.note).toContain(trialChip("ru"));
    expect(uz.pricing.faq[0]?.a).toBe(trialSummary("uz"));
    expect(ru.pricing.faq[0]?.a).toBe(trialSummary("ru"));
    expect(uz.faq.items[1]?.a).toContain(trialSummary("uz"));
    expect(ru.faq.items[1]?.a).toContain(trialSummary("ru"));
  });

  it("Premium tarifi aniq AI limitiga ega, cheksiz emas", () => {
    expect(PLAN_LIMITS.premium.aiQuestions).toBe(2_000);
    expect(PLANS.filter((plan) => !plan.custom).every((plan) => plan.limits.aiQuestions !== null)).toBe(true);
  });
});
