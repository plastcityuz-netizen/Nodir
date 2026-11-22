import { z } from "zod";
import { isPhoneComplete, isValidEmail, isValidTin } from "./format";

export type ValidationMessages = {
  required: string;
  company: string;
  tin: string;
  phone: string;
  email: string;
  password: string;
  identifier: string;
  terms: string;
};

export function createSignupSchema(m: ValidationMessages) {
  return z.object({
    company: z.string().trim().min(2, m.company),
    tin: z
      .string()
      .trim()
      .min(1, m.required)
      .refine((value) => isValidTin(value), m.tin),
    phone: z
      .string()
      .trim()
      .min(1, m.required)
      .refine((value) => isPhoneComplete(value), m.phone),
    email: z
      .string()
      .trim()
      .min(1, m.required)
      .refine((value) => isValidEmail(value), m.email),
    plan: z.enum(["start", "business", "premium", "enterprise"]),
    terms: z.literal(true, { errorMap: () => ({ message: m.terms }) }),
  });
}

export function createLoginSchema(m: ValidationMessages) {
  return z.object({
    identifier: z
      .string()
      .trim()
      .min(1, m.required)
      .refine((value) => isValidEmail(value) || isPhoneComplete(value), m.identifier),
    password: z.string().min(8, m.password),
  });
}

export type SignupValues = z.infer<ReturnType<typeof createSignupSchema>>;
export type LoginValues = z.infer<ReturnType<typeof createLoginSchema>>;
