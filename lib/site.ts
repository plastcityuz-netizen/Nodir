/**
 * Saytning yagona manzili. Productionda NEXT_PUBLIC_SITE_URL bilan almashtiriladi.
 * Vercel preview/local uchun hozirgi deployment manzili ishlatiladi.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://nodir-fbl2.vercel.app").replace(
  /\/+$/,
  "",
);

export const SITE_NAME = "BALANS AI";
export const SITE_DESCRIPTION =
  "Buxgalteriya, savdo, ombor, ishlab chiqarish, HR va moliya bitta aqlli platformada. AI CFO tahlil qiladi va qaror uchun tayyor tavsiya beradi. Birinchi oy bepul.";
