import { describe, expect, it } from "vitest";
import { uz } from "@/lib/i18n/uz";
import { ru } from "@/lib/i18n/ru";

const forbidden = [
  /\bTODO\b/i,
  /bosqich/i,
  /этап/i,
  /egasi tasdiqlaydi/i,
  /подтверждает владелец/i,
  /lorem ipsum/i,
  /\+998 71 200 00 00/,
];

function strings(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(strings);
  if (value && typeof value === "object") return Object.values(value).flatMap(strings);
  return [];
}

describe("production matnlari", () => {
  it("foydalanuvchiga ko‘rinadigan TODO yoki bosqich izlari yo‘q", () => {
    for (const dict of [uz, ru]) {
      for (const text of strings(dict)) {
        for (const pattern of forbidden) {
          expect(text, `Taqiqlangan matn: ${text}`).not.toMatch(pattern);
        }
      }
    }
  });

  it("aloqa uchun faqat brend emaili ishlatiladi", () => {
    expect(uz.footer.email).toBe("salom@balans.ai");
    expect(ru.footer.email).toBe("salom@balans.ai");
    expect("phone" in uz.footer).toBe(false);
    expect("telegram" in uz.footer).toBe(false);
  });

  it("demo rejim va sinov shartlari bir xil tilda tushuntirilgan", () => {
    expect(uz.auth.demoNotice).toMatch(/demo/i);
    expect(ru.auth.demoNotice).toMatch(/демо/i);
    expect(uz.pricing.sub).toMatch(/30|birinchi oy|sinov/i);
    expect(ru.pricing.sub).toMatch(/пробн|первый месяц/i);
  });
});
