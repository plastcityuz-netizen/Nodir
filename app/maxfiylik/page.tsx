import type { Metadata } from "next";
import { LegalPage } from "@/components/site/legal-page";
import { getI18n } from "@/lib/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const { dict } = await getI18n();
  return { title: dict.meta.privacyTitle, alternates: { canonical: "/maxfiylik" } };
}

export default async function PrivacyPage() {
  const { dict } = await getI18n();
  return (
    <LegalPage
      title={dict.legal.privacy.title}
      intro={dict.legal.privacy.intro}
      sections={dict.legal.privacy.sections}
      draftNote={dict.legal.draftNote}
      updatedLabel={dict.legal.updated}
      updatedAt="2026-11-20"
      homeLabel={dict.nav.home}
    />
  );
}
