import { describe, expect, it } from "vitest";
import { createLoginSchema, createSignupSchema } from "@/lib/validation";

const messages = {
  required: "required",
  company: "company",
  tin: "tin",
  phone: "phone",
  email: "email",
  password: "password",
  identifier: "identifier",
  terms: "terms",
};

const signup = createSignupSchema(messages);
const login = createLoginSchema(messages);

const validSignup = {
  company: "MCHJ «Nur Tekstil»",
  tin: "301234567",
  phone: "+998 90 123 45 67",
  email: "salom@balans.ai",
  plan: "business" as const,
  terms: true as const,
};

describe("ro‘yxatdan o‘tish formasi", () => {
  it("to‘g‘ri ma’lumotlarni qabul qiladi", () => {
    expect(signup.safeParse(validSignup).success).toBe(true);
  });

  it("STIR 9 raqam bo‘lishi shart", () => {
    const result = signup.safeParse({ ...validSignup, tin: "12345" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.tin?.[0]).toBe("tin");
    }
  });

  it("telefon to‘liq bo‘lishi shart", () => {
    expect(signup.safeParse({ ...validSignup, phone: "+998 90 12" }).success).toBe(false);
  });

  it("email formati tekshiriladi", () => {
    expect(signup.safeParse({ ...validSignup, email: "salom@balans" }).success).toBe(false);
  });

  it("shartlarga rozilik majburiy", () => {
    const result = signup.safeParse({ ...validSignup, terms: false });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.terms?.[0]).toBe("terms");
    }
  });

  it("noma’lum tarif qabul qilinmaydi", () => {
    expect(signup.safeParse({ ...validSignup, plan: "free" as never }).success).toBe(false);
  });
});

describe("kirish formasi", () => {
  it("email bilan ishlaydi", () => {
    expect(login.safeParse({ identifier: "salom@balans.ai", password: "kamida8belgi" }).success).toBe(true);
  });

  it("telefon bilan ishlaydi", () => {
    expect(login.safeParse({ identifier: "+998 90 123 45 67", password: "kamida8belgi" }).success).toBe(true);
  });

  it("qisqa parolni rad etadi", () => {
    expect(login.safeParse({ identifier: "salom@balans.ai", password: "123" }).success).toBe(false);
  });

  it("noto‘g‘ri identifikatorni rad etadi", () => {
    expect(login.safeParse({ identifier: "salom", password: "kamida8belgi" }).success).toBe(false);
  });
});
