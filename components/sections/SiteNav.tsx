"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/brand/Icon";
import { Logo } from "@/components/brand/Mark";
import { LOCALE_PATH, START_HREF, type Dict, type Locale } from "@/lib/i18n/types";

type Props = { nav: Dict["nav"]; homeLabel: string; locale: Locale };

const LANGS: { locale: Locale; label: string; title: string }[] = [
  { locale: "en", label: "EN", title: "English" },
  { locale: "ar", label: "ع", title: "العربية" },
];

export function SiteNav({ nav, homeLabel, locale }: Props) {
  const [stuck, setStuck] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the section currently in view (beacon dot on the active link).
  useEffect(() => {
    const els = nav.links.map((l) => document.getElementById(l.href.slice(1))).filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(`#${e.target.id}`);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [nav.links]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div className={`site-nav on-night${stuck ? " is-stuck" : ""}${open ? " is-open" : ""}`}>
      <nav className="mn-nav mn-nav--night" aria-label={nav.label}>
        <Logo label={homeLabel} arabic={locale === "ar"} />
        <div className="mn-nav__links">
          {nav.links.map((l) => (
            <a key={l.href} href={l.href} className={active === l.href ? "is-active" : undefined}>
              {l.label}
            </a>
          ))}
        </div>
        <div className="mn-nav__end">
          <span className="mn-lang" role="group" aria-label={nav.langLabel}>
            {LANGS.map((l) =>
              l.locale === locale ? (
                <span key={l.locale} className="is-on" aria-current="page" lang={l.locale} title={l.title}>
                  {l.label}
                </span>
              ) : (
                <a key={l.locale} href={LOCALE_PATH[l.locale]} hrefLang={l.locale} lang={l.locale} title={l.title}>
                  <span>{l.label}</span>
                </a>
              ),
            )}
          </span>
          <a className="mn-btn mn-btn--beacon mn-btn--sm nav-cta-full" href={START_HREF}>
            {nav.primaryCta}
          </a>
          <span className="nav-mobile">
            <a className="mn-btn mn-btn--beacon mn-btn--sm" href={START_HREF} onClick={close}>
              {nav.startShort}
            </a>
            <button
              type="button"
              className="mn-btn mn-btn--night-outline mn-btn--sm mn-btn--icon"
              aria-label={open ? nav.menuClose : nav.menuOpen}
              aria-expanded={open}
              aria-controls="nav-drawer"
              onClick={() => setOpen((o) => !o)}
            >
              <Icon name={open ? "close" : "menu"} size={20} />
            </button>
          </span>
        </div>
      </nav>
      <div id="nav-drawer" className="nav-drawer" hidden={!open}>
        {nav.links.map((l) => (
          <a key={l.href} href={l.href} onClick={close}>
            {l.label}
          </a>
        ))}
        {LANGS.filter((l) => l.locale !== locale).map((l) => (
          <a key={l.locale} href={LOCALE_PATH[l.locale]} hrefLang={l.locale} lang={l.locale}>
            {l.title}
          </a>
        ))}
        <a className="mn-btn mn-btn--beacon mn-btn--lg mn-btn--block" href={START_HREF} onClick={close}>
          {nav.primaryCta} <Icon name="arrow" size={18} flip />
        </a>
      </div>
    </div>
  );
}
