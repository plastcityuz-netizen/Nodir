import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "BALANS AI — biznes boshqaruv platformasi",
    short_name: "BALANS AI",
    description:
      "Buxgalteriya, savdo, ombor, ishlab chiqarish, HR va moliya bitta platformada. Birinchi oy bepul.",
    start_url: "/",
    display: "standalone",
    background_color: "#060A12",
    theme_color: "#060A12",
    lang: "uz-Latn",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
    ],
  };
}
