import type { Metadata } from "next";
import { Faq } from "@/components/site/faq";
import { MobileTrialBar } from "@/components/site/mobile-trial-bar";
import { Pricing } from "@/components/site/pricing";
import { getI18n, OG_LOCALE } from "@/lib/i18n/server";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const { dict, lang } = await getI18n();
  return pageMetadata({
    title: dict.meta.pricingTitle,
    description: dict.meta.pricingDescription,
    path: "/narxlar",
    locale: OG_LOCALE[lang],
  });
}

export default function PricingPage() {
  return (
    <>
      <Pricing detailed />
      <Faq />
      <MobileTrialBar />
    </>
  );
}
