import { describe, expect, it } from "vitest";
import {
  canWrite,
  isTrialActive,
  subscriptionState,
  trialDaysLeft,
  trialEnd,
  trialReminder,
} from "@/lib/trial";

const start = new Date("2026-11-01T09:30:00Z");

describe("birinchi oy bepul", () => {
  it("sinov 30 kundan keyin tugaydi", () => {
    expect(trialEnd(start).toISOString()).toBe("2026-12-01T00:00:00.000Z");
  });

  it("birinchi kuni 30 kun qoladi", () => {
    expect(trialDaysLeft(start, start)).toBe(30);
  });

  it("15-kuni 16 kun qoladi", () => {
    expect(trialDaysLeft(start, new Date("2026-11-15T10:00:00Z"))).toBe(16);
  });

  it("tugagach 0 va eslatma yo‘q", () => {
    const after = new Date("2026-12-02T10:00:00Z");
    expect(trialDaysLeft(start, after)).toBe(0);
    expect(isTrialActive(start, after)).toBe(false);
    expect(trialReminder(start, after)).toBeNull();
  });

  it("7/3/1 kun qolganda eslatma", () => {
    expect(trialReminder(start, new Date("2026-11-24T10:00:00Z"))).toBe(7);
    expect(trialReminder(start, new Date("2026-11-28T10:00:00Z"))).toBe(3);
    expect(trialReminder(start, new Date("2026-11-30T10:00:00Z"))).toBe(1);
    expect(trialReminder(start, new Date("2026-11-25T10:00:00Z"))).toBeNull();
  });
});

describe("obuna holatlari", () => {
  it("sinov faol", () => {
    expect(subscriptionState({ trialStartedAt: start, now: new Date("2026-11-10T00:00:00Z") })).toBe("trial");
  });

  it("to‘lov kechiksa 3 kunlik imtiyoz", () => {
    const paidUntil = new Date("2026-11-20T00:00:00Z");
    expect(subscriptionState({ trialStartedAt: start, paidUntil, now: new Date("2026-11-22T00:00:00Z") })).toBe("past_due");
    expect(subscriptionState({ trialStartedAt: start, paidUntil, now: new Date("2026-11-24T00:00:00Z") })).toBe("read_only");
  });

  it("faol obuna yozishga ruxsat beradi", () => {
    const paidUntil = new Date("2026-12-20T00:00:00Z");
    const status = subscriptionState({ trialStartedAt: start, paidUntil, now: new Date("2026-12-01T00:00:00Z") });
    expect(status).toBe("active");
    expect(canWrite(status)).toBe(true);
  });

  it("faqat ko‘rish rejimida yozib bo‘lmaydi", () => {
    const status = subscriptionState({ trialStartedAt: start, now: new Date("2027-01-01T00:00:00Z") });
    expect(status).toBe("read_only");
    expect(canWrite(status)).toBe(false);
  });
});
