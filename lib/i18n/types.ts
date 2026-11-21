import type { IconName } from "../icons";

export type Locale = "en" | "ar";

export type Link = { href: string; label: string };
export type IconItem = { icon: IconName; label: string };

/** Every visible string on the landing page. Plain data only, so slices can be passed to client components. */
export type Dict = {
  locale: Locale;
  dir: "ltr" | "rtl";
  meta: { title: string; description: string };
  skip: string;
  brand: { homeLabel: string };
  nav: {
    label: string;
    links: Link[];
    primaryCta: string;
    startShort: string;
    menuOpen: string;
    menuClose: string;
    langLabel: string;
  };
  hero: {
    eyebrow: string;
    title: { before: string; accent: string; after: string };
    lead: string;
    secondaryCta: string;
    facts: IconItem[];
    visualLabel: string;
    /** Small pill above the headline. */
    pill: string;
    /** Two decorative callouts beside the headline and CTA (desktop only). */
    notes: [string, string];
    /** One caption per reel screen, in REEL_SCREENS order (12). */
    reelLabels: string[];
    pause: string;
    play: string;
  };
  builtFor: { label: string; aria: string; items: IconItem[] };
  value: { eyebrow: string; title: string; intro: string; link: string; points: { title: string; body: string }[] };
  services: {
    eyebrow: string;
    title: string;
    intro: string;
    items: { icon: IconName; title: string; body: string; ticks: string[]; foot: string; featured?: boolean }[];
  };
  process: { eyebrow: string; title: string; intro: string; steps: { meta: string; title: string; body: string }[] };
  packages: {
    eyebrow: string;
    title: string;
    intro: string;
    pickerLabel: string;
    bestFit: string;
    timelineLabel: string;
    quoteNote: string;
    tiers: {
      level: string;
      name: string;
      /** Shown in the "Which sounds like you?" picker. */
      audience: string;
      summary: string;
      timeline: string;
      /** e.g. "Everything in Launch, plus:" (omitted on the first level). */
      inherits?: string;
      features: string[];
      cta: string;
    }[];
    addOnsTitle: string;
    addOns: IconItem[];
    footnote: string;
  };
  why: {
    eyebrow: string;
    title: string;
    intro: string;
    /** Order: custom, tech & AI, responsive, scalable, security, support. */
    items: { icon: IconName; title: string; body: string; beacon?: boolean }[];
    /** Text inside the live tile illustrations (marketing visuals, so they are translated). */
    visuals: {
      devices: [string, string, string];
      demoBrand: string;
      demoCourses: [string, string, string];
      aiTag: string;
      aiPrompt: string;
      aiLines: [string, string, string];
      aiDone: string;
      palettesLabel: string;
      paletteNames: [string, string, string];
      courseTitle: string;
      courseMeta: string;
      enrol: string;
      scaleFrom: number;
      scaleTo: number;
      studentsLabel: string;
      sameCode: string;
      security: [string, string, string];
      loadLabel: string;
      loadValue: string;
      chatName: string;
      chatQ: string;
      chatTyping: string;
      chatA: string;
      chatTime: string;
    };
  };
  faq: { eyebrow: string; title: string; intro: string; cta: string; items: { q: string; a: string }[] };
  start: {
    eyebrow: string;
    title: { before: string; accent: string };
    lead: string;
    facts: IconItem[];
    form: {
      aria: string;
      name: string;
      namePh: string;
      email: string;
      emailPh: string;
      typeLegend: string;
      types: string[];
      idea: string;
      ideaPh: string;
      whatsapp: string;
      errors: { name: string; emailMissing: string; emailInvalid: string; idea: string };
      done: { badge: string; title: string; before: string; after: string; again: string };
    };
  };
  footer: {
    tagline: string;
    servicesTitle: string;
    companyTitle: string;
    contactTitle: string;
    company: Link[];
    otherLanguage: { href: string; label: string; lang: Locale };
    rights: string;
    privacy: string;
    terms: string;
  };
  /** Placeholders — replace with real details before launch. */
  contact: { email: string; whatsapp: string; location: string };
};

export const START_HREF = "#start";
export const LOCALE_PATH: Record<Locale, string> = { en: "/", ar: "/ar" };
