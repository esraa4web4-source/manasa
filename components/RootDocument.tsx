import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Alexandria, IBM_Plex_Mono, IBM_Plex_Sans_Arabic, Instrument_Sans, Instrument_Serif } from "next/font/google";
import { dictionaries } from "@/lib/i18n";
import { LOCALE_PATH, type Locale } from "@/lib/i18n/types";
import "@/app/styles/tokens.css";
import "@/app/styles/bundle.css";
import "@/app/styles/globals.css";
import "@/app/styles/landing.css";
import "@/app/styles/hero-reel.css";
import "@/app/styles/packages.css";
import "@/app/styles/glass.css";
import "@/app/styles/why-bento.css";

const instrumentSans = Instrument_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--ff-instrument-sans" });
const instrumentSerif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--ff-instrument-serif" });
const plexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--ff-plex-mono" });
const plexArabic = IBM_Plex_Sans_Arabic({ subsets: ["arabic"], weight: ["400", "500", "600", "700"], variable: "--ff-plex-arabic" });
const alexandria = Alexandria({ subsets: ["arabic", "latin"], weight: ["400", "500", "600", "700"], variable: "--ff-alexandria" });
const fontVars = [instrumentSans, instrumentSerif, plexMono, plexArabic, alexandria].map((f) => f.variable).join(" ");

/** Set NEXT_PUBLIC_SITE_URL in production so canonical and hreflang URLs are absolute. */
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export function localeMetadata(locale: Locale): Metadata {
  const t = dictionaries[locale];
  return {
    metadataBase: new URL(SITE_URL),
    title: t.meta.title,
    description: t.meta.description,
    alternates: {
      canonical: LOCALE_PATH[locale],
      languages: { en: LOCALE_PATH.en, ar: LOCALE_PATH.ar, "x-default": LOCALE_PATH.en },
    },
    openGraph: { title: t.meta.title, description: t.meta.description, locale: locale === "ar" ? "ar_AR" : "en_US", type: "website" },
  };
}

export const rootViewport: Viewport = { themeColor: "#0b1620" };

/** Shared <html> shell for both root layouts; only lang and dir differ. */
export function RootDocument({ locale, children }: { locale: Locale; children: ReactNode }) {
  const { dir } = dictionaries[locale];
  return (
    <html lang={locale} dir={dir} className={fontVars}>
      <body>{children}</body>
    </html>
  );
}
