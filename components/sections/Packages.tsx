"use client";

import { useId, useState } from "react";
import { Icon } from "@/components/brand/Icon";
import { START_HREF, type Dict } from "@/lib/i18n/types";
import { trackGlassLight, useInView } from "@/lib/useInView";

/** Three tiny arches (the logo's arcade) with the first `level` lit in beacon. */
function LevelGlyph({ level }: { level: number }) {
  return (
    <svg className="pkg-glyph" viewBox="0 0 40 16" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <path
          key={i}
          d={`M${2 + i * 13} 16V8a5 5 0 0 1 10 0v8`}
          className={i < level ? "is-lit" : undefined}
          strokeWidth="2.4"
        />
      ))}
    </svg>
  );
}

/**
 * Packages as a staircase: three levels rising toward the reading end, joined by a dashed beacon beam,
 * each with a lantern marker. A "Which sounds like you?" picker moves the "Best fit" badge.
 */
export function Packages({ t }: { t: Dict["packages"] }) {
  const [pick, setPick] = useState(1);
  const [sectionRef, inView] = useInView<HTMLElement>(0.12);
  const name = useId();

  return (
    <section ref={sectionRef} className={`mn-section pkgs on-night${inView ? " is-in" : ""}`} id="packages" aria-labelledby="packages-title">
      {/* Soft, static colour behind the frosted cards. */}
      <div className="glass-backdrop" aria-hidden="true">
        <span className="gb gb--lantern" />
        <span className="gb gb--arch" />
        <span className="gb gb--sea" />
        <span className="gb gb--dots" />
      </div>
      <div className="mn-container">
        <div className="head-row">
          <div className="mn-section-head">
            <span className="mn-eyebrow">{t.eyebrow}</span>
            <h2 className="sec" id="packages-title">{t.title}</h2>
            <p>{t.intro}</p>
          </div>
          <fieldset className="pkg-picker">
            <legend className="mn-label">{t.pickerLabel}</legend>
            <div className="pkg-picker__track" style={{ ["--i" as string]: pick }}>
              <span className="pkg-picker__thumb" aria-hidden="true" />
              {t.tiers.map((tier, i) => (
                <label key={tier.name}>
                  <input type="radio" name={name} value={i} checked={pick === i} onChange={() => setPick(i)} />
                  <span>{tier.audience}</span>
                </label>
              ))}
            </div>
          </fieldset>
        </div>

        <div className={`pkg-stage${inView ? " is-in" : ""}`}>
          <svg className="pkg-beam" viewBox="0 0 1000 120" preserveAspectRatio="none" aria-hidden="true">
            <line x1="0" y1="120" x2="1000" y2="0" pathLength={1} />
          </svg>

          <div className="pkg-grid">
            {t.tiers.map((tier, i) => {
              const featured = i === 1;
              const match = pick === i;
              return (
                <article
                  key={tier.name}
                  className={`pkg glass pkg--${i + 1}${featured ? " pkg--night glass--warm" : ""}${match ? " is-match" : ""}`}
                  onPointerMove={trackGlassLight}
                  aria-labelledby={`pkg-${i}`}
                >
                  <span className="pkg-lantern" aria-hidden="true" />
                  <div className="pkg-top">
                    <span className="pkg-level">
                      <LevelGlyph level={i + 1} />
                      {tier.level}
                    </span>
                    <span className={`mn-badge ${featured ? "mn-badge--beacon" : "mn-badge--tide"} pkg-fit`} aria-hidden={!match}>
                      <Icon name="check" />
                      {t.bestFit}
                    </span>
                  </div>
                  <h3 id={`pkg-${i}`}>{tier.name}</h3>
                  <p className="pkg-summary">{tier.summary}</p>

                  <div className="pkg-time">
                    <span>{t.timelineLabel}</span>
                    <b>{tier.timeline}</b>
                  </div>

                  {tier.inherits && <p className="pkg-inherits">{tier.inherits}</p>}
                  <ul className="mn-ticks">
                    {tier.features.map((f) => <li key={f}>{f}</li>)}
                  </ul>

                  <a className={`mn-btn mn-btn--block ${featured ? "mn-btn--beacon" : "mn-btn--night-outline"} pkg-cta`} href={START_HREF}>
                    {tier.cta} <Icon name="arrow" size={18} flip />
                  </a>
                </article>
              );
            })}
          </div>
        </div>

        <div className="pkg-foot">
          <div className="pkg-addons">
            <span className="t-overline mn-muted">{t.addOnsTitle}</span>
            <ul>
              {t.addOns.map((a) => (
                <li key={a.label} className="mn-chip">
                  <Icon name={a.icon} size={16} />
                  {a.label}
                </li>
              ))}
            </ul>
          </div>
          <p className="mn-muted pkg-note">
            <Icon name="file" size={16} />
            {t.quoteNote} {t.footnote}
          </p>
        </div>
      </div>
    </section>
  );
}
