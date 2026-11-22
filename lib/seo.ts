import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "./site";

type PageMeta = {
  title: string;
  description: string;
  path: `/${string}` | "/";
  locale?: string;
  noindex?: boolean;
};

export function pageMetadata({ title, description, path, locale, noindex = false }: PageMeta): Metadata {
  const url = `${SITE_URL}${path === "/" ? "" : path}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale,
      title,
      description,
      url,
      images: [
        {
          url: `${SITE_URL}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: "BALANS AI — AI buxgalteriya va biznes boshqaruv platformasi",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${SITE_URL}/opengraph-image`],
    },
    ...(noindex ? { robots: { index: false, follow: false } } : {}),
  };
}
