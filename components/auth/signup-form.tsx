"use client";

import { ArrowRight, BadgeCheck, Check, Landmark, Mail, Phone } from "lucide-react";
import { useState } from "react";
import { useI18n } from "@/components/providers/i18n-provider";
import { Button, ButtonLink } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { normalizeTin } from "@/lib/format";
import { PLANS, TRIAL, type PlanId } from "@/lib/pricing.config";
import { createSignupSchema } from "@/lib/validation";

export function SignupForm({ initialPlan }: { initialPlan: PlanId }) {
  const { dict, lang } = useI18n();
  const schema = createSignupSchema(dict.auth.errors);

  const [values, setValues] = useState({
    company: "",
    tin: "",
    phone: "",
    email: "",
    plan: initialPlan,
    terms: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");

  const update = (key: keyof typeof values, value: string | boolean) => {
    setValues((state) => ({ ...state, [key]: value }));
  };

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (status === "loading") return;
    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      const flat = parsed.error.flatten().fieldErrors;
      setErrors({
        company: flat.company?.[0] ?? "",
        tin: flat.tin?.[0] ?? "",
        phone: flat.phone?.[0] ?? "",
        email: flat.email?.[0] ?? "",
        terms: flat.terms?.[0] ?? "",
      });
      return;
    }
    setErrors({});
    setStatus("loading");
    window.setTimeout(() => setStatus("done"), 700);
  };

  if (status === "done") {
    return (
      <div>
        <div className="rounded-2xl border border-emerald/30 bg-[linear-gradient(150deg,color-mix(in_srgb,var(--emerald)_12%,transparent),transparent)] p-5">
          <div className="flex items-center gap-2 text-emerald-ink">
            <BadgeCheck className="size-4" aria-hidden />
            <span className="text-[10px] font-semibold uppercase tracking-[0.1em]">Demo</span>
          </div>
          <h2 className="mt-2 font-display text-[20px] font-semibold text-ink">{dict.auth.successTitle}</h2>
          <p className="mt-1 text-[12px] text-muted">{dict.auth.successSub}</p>
          <ul className="mt-3 grid gap-1.5">
            {dict.auth.successFacts.map((fact) => (
              <li key={fact} className="flex items-start gap-1.5 text-[11.5px] text-ink/85">
                <Check className="mt-0.5 size-3 shrink-0 text-emerald-ink" aria-hidden />
                {fact}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-5 flex flex-col gap-2 sm:flex-row">
          <ButtonLink href="/narxlar" size="md">
            {dict.auth.backPricing}
            <ArrowRight />
          </ButtonLink>
          <ButtonLink href="/" size="md" variant="glass">
            {dict.auth.backHome}
          </ButtonLink>
        </div>
        <p className="mt-3 text-[10px] leading-relaxed text-muted">{dict.auth.note}</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="space-y-4">
      <Field
        label={dict.auth.company}
        placeholder={dict.auth.companyPh}
        icon={<Landmark className="size-4" aria-hidden />}
        value={values.company}
        onChange={(event) => update("company", event.target.value)}
        error={errors.company}
        autoComplete="organization"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label={dict.auth.stir}
          placeholder={dict.auth.stirPh}
          inputMode="numeric"
          value={values.tin}
          onChange={(event) => update("tin", normalizeTin(event.target.value))}
          error={errors.tin}
          hint={`${values.tin.length}/9`}
        />
        <Field
          label={dict.auth.phone}
          placeholder={dict.auth.phonePh}
          type="tel"
          inputMode="tel"
          icon={<Phone className="size-4" aria-hidden />}
          value={values.phone}
          onChange={(event) => update("phone", event.target.value)}
          error={errors.phone}
          autoComplete="tel"
        />
      </div>

      <Field
        label={dict.auth.email}
        placeholder={dict.auth.emailPh}
        type="email"
        inputMode="email"
        icon={<Mail className="size-4" aria-hidden />}
        value={values.email}
        onChange={(event) => update("email", event.target.value)}
        error={errors.email}
        autoComplete="email"
      />

      <div className="flex flex-col gap-1.5">
        <label htmlFor="signup-plan" className="text-[12.5px] font-medium text-muted">
          {dict.auth.plan}
        </label>
        <select
          id="signup-plan"
          value={values.plan}
          onChange={(event) => update("plan", event.target.value)}
          className="h-12 w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3.5 text-[16px] text-ink outline-none transition focus:border-emerald/70 focus:ring-4 focus:ring-emerald/10 sm:text-[14px]"
        >
          {PLANS.map((plan) => (
            <option key={plan.id} value={plan.id}>
              {plan.name} —{" "}
              {plan.monthly
                ? lang === "uz"
                  ? `${(plan.monthly / 1000).toLocaleString("ru-RU").replace(/\u00A0/g, " ")} ming so‘m/oy`
                  : `${(plan.monthly / 1000).toLocaleString("ru-RU").replace(/\u00A0/g, " ")} тыс. сум/мес`
                : dict.pricing.customPrice}
            </option>
          ))}
        </select>
        <p className="text-[11px] leading-relaxed text-muted">{dict.auth.planNote}</p>
      </div>

      <label className="flex cursor-pointer items-start gap-2.5 rounded-xl border border-[var(--border)] bg-[color-mix(in_srgb,var(--elevated)_30%,transparent)] px-3 py-3">
        <input
          type="checkbox"
          checked={values.terms}
          onChange={(event) => update("terms", event.target.checked)}
          aria-invalid={Boolean(errors.terms)}
          className="mt-0.5 size-4 shrink-0 accent-[var(--emerald)]"
        />
        <span className="text-[11.5px] leading-relaxed text-ink/85">
          {dict.auth.terms}{" "}
          <a href="/shartlar" className="text-emerald-ink underline underline-offset-2">
            ({dict.auth.termsLink})
          </a>
        </span>
      </label>
      {errors.terms && (
        <p className="flex items-center gap-1.5 text-[12px] text-danger">
          <span aria-hidden>▲</span>
          {errors.terms}
        </p>
      )}

      <Button type="submit" size="lg" className="w-full" disabled={status === "loading"}>
        {status === "loading" ? dict.auth.submitting : dict.auth.submit}
        <ArrowRight />
      </Button>

      <div className="flex flex-wrap items-center justify-between gap-2 text-[10.5px] text-muted">
        <span>
          {TRIAL.days} {lang === "uz" ? "kun · karta shart emas" : "дней · карта не нужна"}
        </span>
        <span className="inline-flex items-center gap-1 text-emerald-ink">
          <BadgeCheck className="size-3" aria-hidden />
          {dict.auth.loginDemoTitle}
        </span>
      </div>
      <p className="text-[10px] leading-relaxed text-muted">{dict.auth.note}</p>
    </form>
  );
}
