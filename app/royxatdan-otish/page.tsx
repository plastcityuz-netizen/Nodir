import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/auth-shell";
import { SignupForm } from "@/components/auth/signup-form";
import { getI18n } from "@/lib/i18n/server";
import { PLANS, type PlanId } from "@/lib/pricing.config";

export async function generateMetadata(): Promise<Metadata> {
  const { dict } = await getI18n();
  return { title: dict.meta.signupTitle, alternates: { canonical: "/royxatdan-otish" } };
}

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string }>;
}) {
  const { dict } = await getI18n();
  const params = await searchParams;
  const requested = params.plan;
  const plan = PLANS.find((item) => item.id === requested)?.id ?? "business";
  const initialPlan: PlanId = plan;

  return (
    <AuthShell
      title={dict.auth.signupTitle}
      sub={dict.auth.signupSub}
      asideTitle={dict.cta.title}
      asideFacts={dict.auth.successFacts}
      asideNote={dict.auth.demoNotice}
    >
      <SignupForm initialPlan={initialPlan} />
    </AuthShell>
  );
}
