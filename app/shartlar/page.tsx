import type { Metadata } from "next";
import { LegalPage } from "@/components/site/legal-page";
import { getI18n } from "@/lib/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const { dict } = await getI18n();
  return { title: dict.meta.termsTitle, alternates: { canonical: "/shartlar" } };
}

export default async function TermsPage() {
  const { dict } = await getI18n();
  return (
    <LegalPage
      title={dict.legal.terms.title}
      intro={dict.legal.terms.intro}
      sections={dict.legal.terms.sections}
      draftNote={dict.legal.draftNote}
      updatedLabel={dict.legal.updated}
      updatedAt="2026-11-20"
      homeLabel={dict.nav.home}
    />
  );
}
