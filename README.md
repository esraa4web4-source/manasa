# Manara Labs — landing page

Next.js (App Router) + TypeScript build of the **LandingDesktop / LandingMobile** reference composition from the Manara Labs design system (`../Manara Labs`), in English and Arabic.

| URL | Language |
|---|---|
| `/` | English (`lang="en"`, LTR) |
| `/ar` | Arabic (`lang="ar" dir="rtl"`) |

```bash
npm install
npm run dev     # http://localhost:3000 and http://localhost:3000/ar
npm run build
```

Set `NEXT_PUBLIC_SITE_URL` (for example `https://manaralabs.com`) in production so canonical and `hreflang` URLs are absolute.

## Structure

```
app/(en)/layout.tsx, page.tsx      → "/"   root layout with <html lang="en">
app/(ar)/layout.tsx, ar/page.tsx   → "/ar" root layout with <html lang="ar" dir="rtl">
components/RootDocument.tsx        fonts, global CSS, per-locale metadata + hreflang
components/Landing.tsx             the page, composed from components/sections/*
lib/i18n/en.ts, ar.ts              every visible string (typed by lib/i18n/types.ts)
```

To change copy, edit `lib/i18n/en.ts` and `lib/i18n/ar.ts`. TypeScript flags any key missing from either language.

## How it maps to the design system

| Design system | Here |
|---|---|
| `tokens.css` | `app/styles/tokens.css` (copied unchanged) |
| `components/bundle.css` | `app/styles/bundle.css` (Google Fonts `@import` removed; fonts are self-hosted via `next/font` and wired to the font tokens in `app/styles/globals.css`) |
| `bundle.js` → `Manara.icon / mark / cover` | `components/brand/Icon.tsx`, `Mark.tsx`, `Cover.tsx` (`lib/icons.ts` is generated from bundle.js) |
| Page-level styles in `LandingDesktop/preview.html` | `app/styles/landing.css` (the Arabic/RTL rules are at the bottom) |

If the design system changes, re-copy `tokens.css` and `bundle.css` (dropping the first `@import` line).

### Arabic rules applied

- Headings use Alexandria (`t-ar-*` scale) and UI/body text uses IBM Plex Sans Arabic. Arabic is set one size larger than English with about 1.6–1.75× leading, and is never letter-spaced.
- The hero and CTA accent is the key phrase in beacon, not Instrument Serif italic, because the serif has no Arabic glyphs.
- Copy uses Arabic-Indic numerals (٠١, ٤–٦ أسابيع).
- The Arabic logo lockup is «منارة» in Alexandria 600.
- Arrows are mirrored with `<Icon flip />`.
- Product mockups stay in English and LTR (`dir="ltr" lang="en"`), following the rule that mockups keep the language of the client they depict.
- Email inputs and phone numbers are isolated as LTR inside the Arabic text.

## Before launch

- `components/sections/StartProject.tsx` validates the form but does not send it yet. Wire `onSubmit` to your CRM or email service, for example through a Route Handler. The form already knows which language it was sent from.
- Replace the placeholders in `contact` in both dictionaries, and the social and legal links in `Footer.tsx`.
- Have a native speaker review `lib/i18n/ar.ts` before launch.
- The Featured work and Client stories sections were removed. If you add them back, keep portfolio pieces badged "Concept project" and testimonials honest until they are real (brand rule).
