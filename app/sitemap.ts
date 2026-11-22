import type { MetadataRoute } from "next";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://balans.ai";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/narxlar", "/kirish", "/royxatdan-otish", "/maxfiylik", "/shartlar"];
  return routes.map((route) => ({
    url: `${BASE}${route}`,
    lastModified: new Date("2026-11-20"),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/narxlar" ? 0.9 : 0.6,
  }));
}
