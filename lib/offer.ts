import { TRIAL, getPlan } from "./pricing.config";

/** Sinov shartlari bo‘yicha yagona matn manbasi. */
export type OfferLang = "uz" | "ru";

const trialPlan = getPlan(TRIAL.level);

export const TRIAL_OFFER = {
  days: TRIAL.days,
  aiQuestions: TRIAL.aiQuestions,
  level: trialPlan.name,
  cardRequired: TRIAL.cardRequired,
} as const;

export function cardShort(lang: OfferLang): string {
  if (lang === "uz") return TRIAL.cardRequired ? "karta talab qilinadi" : "karta shart emas";
  return TRIAL.cardRequired ? "нужна карта" : "карта не нужна";
}

export function cardSentence(lang: OfferLang): string {
  if (lang === "uz") return TRIAL.cardRequired ? "Karta talab qilinadi." : "Karta talab qilinmaydi.";
  return TRIAL.cardRequired ? "Карта требуется." : "Карта не требуется.";
}

function cardFact(lang: OfferLang): string {
  if (lang === "uz") return TRIAL.cardRequired ? "Karta talab qilinadi" : "Karta talab qilinmaydi";
  return TRIAL.cardRequired ? "Карта требуется" : "Карта не требуется";
}

export function trialChip(lang: OfferLang): string {
  return `${TRIAL.days} ${lang === "uz" ? "kun" : "дней"} · ${cardShort(lang)}`;
}

export function trialShort(lang: OfferLang): string {
  return lang === "uz" ? `${TRIAL.days} kunlik sinov` : `${TRIAL.days}-дневный пробный период`;
}

export function trialSummary(lang: OfferLang): string {
  if (lang === "uz") {
    return `Ro‘yxatdan o‘tgan kundan ${TRIAL.days} kun — birinchi oy — bepul. ${cardSentence("uz")} Sinov davrida ${trialPlan.name} darajasidagi imkoniyatlar va ${TRIAL.aiQuestions} ta AI CFO savoli ochiq.`;
  }
  return `С дня регистрации ${TRIAL.days} дней — первый месяц — бесплатно. ${cardSentence("ru")} В пробный период открыты возможности уровня ${trialPlan.name} и ${TRIAL.aiQuestions} вопросов AI CFO.`;
}

export function trialFacts(lang: OfferLang): string[] {
  return [
    lang === "uz" ? `${TRIAL.days} kunlik sinov rejasi` : `${TRIAL.days} дней пробного периода`,
    cardFact(lang),
    lang === "uz"
      ? `${TRIAL.aiQuestions} ta AI CFO savoli`
      : `${TRIAL.aiQuestions} вопросов AI CFO`,
  ];
}
