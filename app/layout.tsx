import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Footer } from "@/components/site/footer";
import { Navbar } from "@/components/site/navbar";
import { ScrollProgress } from "@/components/site/scroll-progress";
import { CommandProvider } from "@/components/site/command-palette";
import { I18nProvider } from "@/components/providers/i18n-provider";
import { MotionProvider } from "@/components/providers/motion-provider";
import { ToastProvider } from "@/components/providers/toast-provider";
import { getI18n, HTML_LANG, OG_LOCALE } from "@/lib/i18n/server";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://balans.ai";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#060A12" },
    { media: "(prefers-color-scheme: light)", color: "#F5F7FA" },
  ],
};

export async function generateMetadata(): Promise<Metadata> {
  const { lang, dict } = await getI18n();
  return {
    metadataBase: new URL(SITE_URL),
    title: dict.meta.title,
    description: dict.meta.description,
    applicationName: "BALANS AI",
    keywords: [
      "buxgalteriya",
      "biznes boshqaruv",
      "AI CFO",
      "ERP O‘zbekiston",
      "ombor",
      "savdo",
      "бухгалтерия",
      "Узбекистан",
    ],
    authors: [{ name: "BALANS AI" }],
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      siteName: "BALANS AI",
      locale: OG_LOCALE[lang],
      title: dict.meta.title,
      description: dict.meta.description,
      url: SITE_URL,
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "BALANS AI" }],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.description,
      images: ["/opengraph-image"],
    },
    robots: { index: true, follow: true },
  };
}

const themeScript = `(function(){try{var k='balans_theme';var s=localStorage.getItem(k);var prefersLight=window.matchMedia('(prefers-color-scheme: light)').matches;var t=(s==='light'||s==='dark')?s:(prefersLight?'light':'dark');var e=document.documentElement;e.classList.remove('dark','light');e.classList.add(t);e.style.colorScheme=t;var c=navigator.connection||navigator.mozConnection;if((navigator.hardwareConcurrency&&navigator.hardwareConcurrency<=4)||(navigator.deviceMemory&&navigator.deviceMemory<=4)||(c&&c.saveData)){e.classList.add('lite')}}catch(err){}})();`;

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { lang } = await getI18n();

  return (
    <html lang={HTML_LANG[lang]} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <link
          rel="preload"
          href="/fonts/inter-latin-wght-normal.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/manrope-latin-wght-normal.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        {lang === "ru" && (
          <>
            <link
              rel="preload"
              href="/fonts/inter-cyrillic-wght-normal.woff2"
              as="font"
              type="font/woff2"
              crossOrigin="anonymous"
            />
            <link
              rel="preload"
              href="/fonts/manrope-cyrillic-wght-normal.woff2"
              as="font"
              type="font/woff2"
              crossOrigin="anonymous"
            />
          </>
        )}
      </head>
      <body className="min-h-dvh antialiased">
        <a
          href="#asosiy"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-emerald-fill focus:px-4 focus:py-2 focus:text-[#04130E]"
        >
          Asosiy kontentga o‘tish
        </a>
        <I18nProvider initialLang={lang}>
          <MotionProvider>
            <ToastProvider>
              <CommandProvider>
                <ScrollProgress />
                <Navbar />
                <main id="asosiy">{children}</main>
                <Footer />
              </CommandProvider>
            </ToastProvider>
          </MotionProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
