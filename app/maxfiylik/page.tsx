import type { Metadata } from "next";
import { LegalPage } from "@/components/site/legal-page";
import { getI18n, OG_LOCALE } from "@/lib/i18n/server";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const { dict, lang } = await getI18n();
  return pageMetadata({
    title: dict.meta.privacyTitle,
    description: dict.meta.privacyDescription,
    path: "/maxfiylik",
    locale: OG_LOCALE[lang],
  });
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
      updatedAt="2026-11-22"
      homeLabel={dict.nav.home}
    />
  );
}
