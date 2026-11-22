import { describe, expect, it } from "vitest";
import { uz } from "@/lib/i18n/uz";
import { ru } from "@/lib/i18n/ru";
import { dictionariesShape } from "./helpers";

describe("tarjimalar", () => {
  it("uz va ru bir xil kalitlarga ega", () => {
    expect(dictionariesShape(ru)).toEqual(dictionariesShape(uz));
  });

  it("bo‘sh matn yo‘q", () => {
    const walk = (value: unknown): string[] => {
      if (typeof value === "string") return value.trim().length === 0 ? ["bo‘sh"] : [];
      if (Array.isArray(value)) return value.flatMap(walk);
      if (value && typeof value === "object") return Object.values(value).flatMap(walk);
      return [];
    };
    expect(walk(uz)).toHaveLength(0);
    expect(walk(ru)).toHaveLength(0);
  });

  it("ruscha matnda kirill harflari bor", () => {
    expect(/[а-яА-Я]/.test(ru.hero.sub)).toBe(true);
  });

  it("o‘zbekcha matnda lotin kengaytmasi (o‘) ishlatiladi", () => {
    expect(uz.pricing.title.includes("o‘")).toBe(true);
  });
});
