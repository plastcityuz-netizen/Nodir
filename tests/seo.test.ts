import { describe, expect, it } from "vitest";
import { pageMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";
import sitemap from "@/app/sitemap";
import robots from "@/app/robots";

describe("SEO metadata", () => {
  it("canonical va OG manzillari mutlaq", () => {
    const meta = pageMetadata({
      title: "Narxlar",
      description: "Tavsif",
      path: "/narxlar",
      locale: "uz_UZ",
    });
    expect(meta.alternates?.canonical).toBe("/narxlar");
    const images = meta.openGraph?.images;
    const first = Array.isArray(images) ? images[0] : images;
    expect(typeof first === "object" && first !== null && "url" in first ? first.url : first).toContain(
      SITE_URL,
    );
  });

  it("auth sahifalari indekslanmaydi", () => {
    const meta = pageMetadata({
      title: "Kirish",
      description: "Tavsif",
      path: "/kirish",
      noindex: true,
    });
    expect(meta.robots).toEqual({ index: false, follow: false });
  });

  it("sitemap faqat ommaviy sahifalarni o‘z ichiga oladi", () => {
    const urls = sitemap().map((entry) => entry.url);
    expect(urls).toContain(`${SITE_URL}/narxlar`);
    expect(urls).toContain(`${SITE_URL}/maxfiylik`);
    expect(urls.some((url) => url.includes("/kirish"))).toBe(false);
    expect(urls.some((url) => url.includes("/royxatdan-otish"))).toBe(false);
  });

  it("robots auth sahifalarini yopadi va sitemap’ni ko‘rsatadi", () => {
    const result = robots();
    const rules = Array.isArray(result.rules) ? result.rules : [result.rules];
    const disallow = rules.flatMap((rule) => (rule ? (rule.disallow ?? []) : []));
    expect(disallow).toContain("/kirish");
    expect(disallow).toContain("/royxatdan-otish");
    expect(result.sitemap).toBe(`${SITE_URL}/sitemap.xml`);
  });
});
