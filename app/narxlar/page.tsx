import type { Metadata } from "next";
import { Faq } from "@/components/site/faq";
import { MobileTrialBar } from "@/components/site/mobile-trial-bar";
import { Pricing } from "@/components/site/pricing";
import { getI18n } from "@/lib/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const { dict } = await getI18n();
  return {
    title: dict.meta.pricingTitle,
    description: dict.meta.pricingDescription,
    alternates: { canonical: "/narxlar" },
  };
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
