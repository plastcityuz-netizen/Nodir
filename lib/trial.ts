import { TRIAL } from "./pricing.config";

/** Obuna holatlari: sinov → faol → kechikkan → faqat ko‘rish */
export type SubscriptionStatus = "trial" | "active" | "past_due" | "read_only" | "canceled";

export const DAY_MS = 24 * 60 * 60 * 1000;

export function startOfUtcDay(input: Date): Date {
  return new Date(Date.UTC(input.getUTCFullYear(), input.getUTCMonth(), input.getUTCDate()));
}

/** Ro‘yxatdan o‘tgan kundan boshlab birinchi oy (30 kun) bepul */
export function trialEnd(start: Date): Date {
  return new Date(startOfUtcDay(start).getTime() + TRIAL.days * DAY_MS);
}

/** Qolgan kunlar — sinov tugagan bo‘lsa 0 */
export function trialDaysLeft(start: Date, now: Date = new Date()): number {
  const left = Math.ceil((trialEnd(start).getTime() - startOfUtcDay(now).getTime()) / DAY_MS);
  return Math.max(0, left);
}

export function isTrialActive(start: Date, now: Date = new Date()): boolean {
  return trialDaysLeft(start, now) > 0;
}

/** 7, 3 yoki 1 kun qolganda eslatma banneri ko‘rsatiladi */
export function trialReminder(start: Date, now: Date = new Date()): 7 | 3 | 1 | null {
  const left = trialDaysLeft(start, now);
  return (TRIAL.reminders as readonly number[]).includes(left) ? (left as 7 | 3 | 1) : null;
}

/**
 * To‘lov kechiksa: 3 kunlik imtiyozli davr, so‘ng faqat ko‘rish va eksport.
 * Ma’lumotlar hech qachon o‘chirilmaydi.
 */
export function subscriptionState(options: {
  trialStartedAt: Date;
  paidUntil?: Date | null;
  now?: Date;
}): SubscriptionStatus {
  const now = options.now ?? new Date();
  const { trialStartedAt, paidUntil = null } = options;
  if (paidUntil && paidUntil.getTime() > now.getTime()) return "active";
  if (paidUntil) {
    const graceEnd = paidUntil.getTime() + TRIAL.graceDays * DAY_MS;
    return now.getTime() <= graceEnd ? "past_due" : "read_only";
  }
  if (isTrialActive(trialStartedAt, now)) return "trial";
  return "read_only";
}

export function canWrite(status: SubscriptionStatus): boolean {
  return status === "trial" || status === "active" || status === "past_due";
}
