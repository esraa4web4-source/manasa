import { Fragment } from "react";
import { Icon } from "@/components/brand/Icon";
import { START_HREF, type Dict } from "@/lib/i18n/types";
import { REEL_SCREENS } from "./ReelScreens";
import { ScreenReel } from "./ScreenReel";

/** Hand-drawn-feel curved arrow in beacon for the decorative callouts. */
function NoteArrow({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 80 48" fill="none" aria-hidden="true">
      <path d="M4 6c18 2 40 10 52 26 3 4 5 8 6 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M54 38l8 6 4-10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Hero({ t }: { t: Dict }) {
  const h = t.hero;
  const cards = REEL_SCREENS.map((s, i) => (
    <Fragment key={i}>
      {s.node}
      <span className="reel-chip" lang={t.locale}>
        <Icon name={s.icon} size={12} />
        {h.reelLabels[i]}
      </span>
    </Fragment>
  ));

  return (
    <header className="hero hero--reel on-night" id="top">
      <div className="hero-glow" aria-hidden="true" />
      <div className="mn-container hero-copy">
        <span className="hero-pill">
          <i aria-hidden="true" />
          {h.pill}
        </span>
        <h1>
          {h.title.before}
          {/* EN: one Instrument Serif italic word. AR: the key phrase in beacon (Arabic is never set in the Latin serif). */}
          <span className={t.locale === "ar" ? "ar-accent" : "t-accent"}>{h.title.accent}</span>
          {h.title.after}
        </h1>
        <p className="lead">{h.lead}</p>
        <span className="hero-note hero-note--a" aria-hidden="true">
          {h.notes[0]}
          <NoteArrow className="hero-note__arrow" />
        </span>
      </div>

      {/* Cards come first: compact copy above, buttons below the reel (as in the Reelmark reference). */}
      <ScreenReel cards={cards} label={h.visualLabel} pauseLabel={h.pause} playLabel={h.play} direction={t.locale === "ar" ? -1 : 1} />

      <div className="mn-container hero-actions">
        <div className="hero-ctas">
          <span className="hero-note hero-note--b" aria-hidden="true">
            <NoteArrow className="hero-note__arrow" />
            {h.notes[1]}
          </span>
          <a className="mn-btn mn-btn--beacon mn-btn--lg" href={START_HREF}>
            {t.nav.primaryCta} <Icon name="arrow" size={18} flip />
          </a>
          <a className="mn-btn mn-btn--night-outline mn-btn--lg" href="#packages">
            {h.secondaryCta}
          </a>
        </div>
        <ul className="hero-facts">
          {h.facts.map((f) => (
            <li key={f.label}>
              <Icon name={f.icon} size={18} />
              {f.label}
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
