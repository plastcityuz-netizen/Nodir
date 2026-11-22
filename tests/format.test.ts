import { describe, expect, it } from "vitest";
import {
  formatCompactNumber,
  formatDate,
  formatDelta,
  formatMoney,
  formatPercent,
  formatPhone,
  isPhoneComplete,
  isValidEmail,
  isValidTin,
  normalizeTin,
  trendLabel,
} from "@/lib/format";

const NBSP = "\u00A0";

describe("formatMoney", () => {
  it("guruhlarni bo‘linmas probel bilan ajratadi", () => {
    expect(formatMoney(1_250_000)).toBe(`1${NBSP}250${NBSP}000${NBSP}so‘m`);
  });

  it("ruscha valyuta yorlig‘ini qo‘llab-quvvatlaydi", () => {
    expect(formatMoney(449_000, { currency: "ru" })).toBe(`449${NBSP}000${NBSP}сум`);
  });

  it("katta summani mlrd ga qisqartiradi", () => {
    expect(formatMoney(1_200_000_000, { compact: true })).toContain("1,2");
    expect(formatMoney(1_200_000_000, { compact: true })).toContain("mlrd");
  });

  it("ruscha qisqartmalar bilan yozadi", () => {
    expect(formatMoney(1_200_000_000, { compact: true, currency: "ru" })).toBe(
      `1,2${NBSP}млрд${NBSP}сум`,
    );
    expect(formatMoney(2_400_000, { compact: true, currency: "ru", withLabel: false })).toBe(
      `2,4${NBSP}млн`,
    );
  });

  it("manfiy qiymatda minus belgisini qo‘yadi", () => {
    expect(formatMoney(-500_000)).toBe(`−500${NBSP}000${NBSP}so‘m`);
  });

  it("noto‘g‘ri qiymatda 0 qaytaradi", () => {
    expect(formatMoney(Number.NaN)).toBe(`0${NBSP}so‘m`);
  });

  it("yorliqsiz va kasrli format", () => {
    expect(formatMoney(1234.5, { withLabel: false, decimals: 1 })).toBe("1\u00A0234,5");
  });
});

describe("formatPercent va formatDelta", () => {
  it("kasr vergul bilan", () => {
    expect(formatPercent(18.4)).toBe("+18,4%");
    expect(formatPercent(-6.2)).toBe("−6,2%");
  });

  it("trend so‘zini tilga moslaydi", () => {
    expect(trendLabel(4.2, "ru")).toContain("рост");
    expect(trendLabel(-4.2, "ru")).toContain("снижение");
    expect(trendLabel(0, "ru")).toContain("без изменений");
    expect(trendLabel(4.2)).toContain("o‘sish");
  });

  it("delta yo‘nalishni belgi bilan ko‘rsatadi", () => {
    expect(formatDelta(12.4)).toContain("▲");
    expect(formatDelta(-4)).toContain("▼");
    expect(formatDelta(0)).toContain("·");
  });
});

describe("sana va telefon", () => {
  it("DD.MM.YYYY", () => {
    expect(formatDate("2026-11-20T00:00:00Z")).toMatch(/^\d{2}\.\d{2}\.2026$/);
  });

  it("telefonni formatlaydi", () => {
    expect(formatPhone("901234567")).toBe("+998 90 123 45 67");
    expect(formatPhone("+998 (90) 123-45-67")).toBe("+998 90 123 45 67");
  });

  it("to‘liq telefonni tekshiradi", () => {
    expect(isPhoneComplete("+998 90 123 45 67")).toBe(true);
    expect(isPhoneComplete("+998 90 123")).toBe(false);
  });
});

describe("STIR va email", () => {
  it("STIR 9 raqam", () => {
    expect(isValidTin("301234567")).toBe(true);
    expect(isValidTin("30123456")).toBe(false);
    expect(isValidTin("30123456a")).toBe(false);
  });

  it("STIR kiritishda faqat raqam qoladi", () => {
    expect(normalizeTin("301-234-567")).toBe("301234567");
  });

  it("email tekshiruvi", () => {
    expect(isValidEmail("salom@balans.ai")).toBe(true);
    expect(isValidEmail("salom@balans")).toBe(false);
    expect(isValidEmail("salom balans.ai")).toBe(false);
  });
});

describe("formatCompactNumber", () => {
  it("millionni qisqartiradi", () => {
    expect(formatCompactNumber(2_400_000)).toBe("2,4\u00A0mln");
  });
});
