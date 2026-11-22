import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: { path: string; priority: number; changeFrequency: "weekly" | "monthly" }[] = [
    { path: "", priority: 1, changeFrequency: "weekly" },
    { path: "/narxlar", priority: 0.9, changeFrequency: "monthly" },
    { path: "/maxfiylik", priority: 0.3, changeFrequency: "monthly" },
    { path: "/shartlar", priority: 0.3, changeFrequency: "monthly" },
  ];

  return routes.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: new Date("2026-11-22"),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
