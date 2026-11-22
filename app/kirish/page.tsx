import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/auth-shell";
import { LoginForm } from "@/components/auth/login-form";
import { getI18n, OG_LOCALE } from "@/lib/i18n/server";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const { dict, lang } = await getI18n();
  return pageMetadata({
    title: dict.meta.loginTitle,
    description: dict.meta.loginDescription,
    path: "/kirish",
    locale: OG_LOCALE[lang],
    noindex: true,
  });
}

export default async function LoginPage() {
  const { dict } = await getI18n();
  return (
    <AuthShell
      title={dict.auth.loginTitle}
      sub={dict.auth.loginSub}
      asideTitle={dict.auth.signupTitle}
      asideFacts={dict.auth.successFacts}
      asideNote={dict.auth.demoNotice}
    >
      <LoginForm />
    </AuthShell>
  );
}
