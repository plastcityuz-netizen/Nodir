import type { Metadata } from "next";
import { DemoDashboard } from "@/components/dashboard/demo-dashboard";
import { getI18n, OG_LOCALE } from "@/lib/i18n/server";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const { dict, lang } = await getI18n();
  return pageMetadata({
    title: dict.meta.dashboardTitle,
    description: dict.meta.dashboardDescription,
    path: "/dashboard",
    locale: OG_LOCALE[lang],
    noindex: true,
  });
}

export default function DashboardPage() {
  return <DemoDashboard />;
}
