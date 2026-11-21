import { ar } from "./ar";
import { en } from "./en";
import type { Dict, Locale } from "./types";

export const dictionaries: Record<Locale, Dict> = { en, ar };

/** Two-digit step/list numbers: 01 in English, ٠١ (Arabic-Indic) in Arabic. */
export function pad2(n: number, locale: Locale) {
  const s = String(n).padStart(2, "0");
  return locale === "ar" ? s.replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[Number(d)]) : s;
}

export * from "./types";
