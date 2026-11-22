"use client";

import { ArrowRight, CheckCircle2, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/components/providers/i18n-provider";
import { Button, ButtonLink } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { createLoginSchema } from "@/lib/validation";

export function LoginForm() {
  const { dict } = useI18n();
  const messages = dict.auth.errors;
  const schema = createLoginSchema(messages);

  const [values, setValues] = useState({ identifier: "", password: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const [notice, setNotice] = useState("");
  const timer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current !== null) window.clearTimeout(timer.current);
    };
  }, []);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (status === "loading") return;
    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      const flat = parsed.error.flatten().fieldErrors;
      setErrors({
        identifier: flat.identifier?.[0] ?? "",
        password: flat.password?.[0] ?? "",
      });
      return;
    }
    setErrors({});
    setStatus("loading");
    timer.current = window.setTimeout(() => {
      timer.current = null;
      setStatus("done");
    }, 650);
  };

  if (status === "done") {
    return (
      <div className="rounded-2xl border border-emerald/25 bg-[color-mix(in_srgb,var(--emerald)_7%,transparent)] p-5">
        <div className="flex items-center gap-2 text-emerald-ink">
          <CheckCircle2 className="size-4" aria-hidden />
          <h2 className="text-[14px] font-semibold">{dict.auth.loginDemoTitle}</h2>
        </div>
        <p className="mt-2 text-[12px] leading-relaxed text-ink/85">{dict.auth.loginDemoText}</p>
        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          <ButtonLink href="/" size="sm" variant="glass">
            {dict.auth.backHome}
          </ButtonLink>
          <ButtonLink href="/royxatdan-otish" size="sm">
            {dict.auth.signupLink}
            <ArrowRight />
          </ButtonLink>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="space-y-4">
      <Field
        label={dict.auth.identifier}
        placeholder={dict.auth.identifierPh}
        icon={<Mail className="size-4" aria-hidden />}
        value={values.identifier}
        onChange={(event) => setValues((state) => ({ ...state, identifier: event.target.value }))}
        error={errors.identifier}
        autoComplete="username"
      />
      <Field
        label={dict.auth.password}
        placeholder={dict.auth.passwordPh}
        type="password"
        icon={<Lock className="size-4" aria-hidden />}
        value={values.password}
        onChange={(event) => setValues((state) => ({ ...state, password: event.target.value }))}
        error={errors.password}
        autoComplete="current-password"
      />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setNotice(dict.auth.forgotNote)}
          className="text-[11.5px] text-muted underline decoration-[var(--border-strong)] underline-offset-4 transition hover:text-ink"
        >
          {dict.auth.forgot}
        </button>
        <span className="text-[11px] text-muted">
          {dict.auth.noAccount}{" "}
          <Link href="/royxatdan-otish" className="font-medium text-emerald-ink hover:underline">
            {dict.auth.signupLink}
          </Link>
        </span>
      </div>

      {notice && (
        <p
          role="status"
          className="rounded-xl border border-[var(--border)] bg-[color-mix(in_srgb,var(--elevated)_40%,transparent)] px-3 py-2.5 text-[11px] leading-relaxed text-muted"
        >
          {notice}
        </p>
      )}

      <Button type="submit" size="lg" className="w-full" disabled={status === "loading"}>
        {status === "loading" ? dict.auth.loggingIn : dict.auth.loginCta}
        <ArrowRight />
      </Button>

      <p className="rounded-xl border border-[var(--border)] bg-[color-mix(in_srgb,var(--elevated)_40%,transparent)] px-3 py-2.5 text-[10px] leading-relaxed text-muted">
        {dict.auth.demoNotice}
      </p>
    </form>
  );
}
