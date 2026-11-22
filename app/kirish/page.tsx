import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/auth-shell";
import { LoginForm } from "@/components/auth/login-form";
import { getI18n } from "@/lib/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const { dict } = await getI18n();
  return { title: dict.meta.loginTitle, alternates: { canonical: "/kirish" } };
}

export default async function LoginPage() {
  const { dict } = await getI18n();
  return (
    <AuthShell
      title={dict.auth.loginTitle}
      sub={dict.auth.loginSub}
      asideTitle={dict.auth.signupTitle}
      asideFacts={dict.auth.successFacts}
      asideNote={dict.security.note}
    >
      <LoginForm />
    </AuthShell>
  );
}
