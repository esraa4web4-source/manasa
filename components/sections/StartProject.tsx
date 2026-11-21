"use client";

import { useState, type FormEvent } from "react";
import { Icon } from "@/components/brand/Icon";
import type { Dict } from "@/lib/i18n/types";
import { trackGlassLight, useInView } from "@/lib/useInView";

type Field = "name" | "email" | "idea";
type Errors = Partial<Record<Field, string>>;
type Props = { start: Dict["start"]; primaryCta: string; locale: Dict["locale"] };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(data: FormData, msg: Dict["start"]["form"]["errors"]): Errors {
  const errors: Errors = {};
  if (!String(data.get("name") ?? "").trim()) errors.name = msg.name;
  const email = String(data.get("email") ?? "").trim();
  if (!email) errors.email = msg.emailMissing;
  else if (!EMAIL_RE.test(email)) errors.email = msg.emailInvalid;
  if (String(data.get("idea") ?? "").trim().length < 10) errors.idea = msg.idea;
  return errors;
}

export function StartProject({ start, primaryCta, locale }: Props) {
  const f = start.form;
  const [errors, setErrors] = useState<Errors>({});
  const [sentTo, setSentTo] = useState<string | null>(null);
  const [ctaRef, inView] = useInView<HTMLDivElement>(0.2);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const next = validate(data, f.errors);
    setErrors(next);
    const firstInvalid = Object.keys(next)[0];
    if (firstInvalid) {
      e.currentTarget.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }
    // TODO: send `data` (plus `locale`) to your CRM / email endpoint, e.g. a Route Handler at app/api/start/route.ts.
    void locale;
    setSentTo(String(data.get("email")));
  }

  const field = (k: Field) => ({
    name: k,
    className: `mn-input${errors[k] ? " is-error" : ""}`,
    "aria-invalid": !!errors[k],
    "aria-describedby": errors[k] ? `err-${k}` : undefined,
  });
  const error = (k: Field) => errors[k] && <span className="mn-hint is-error" id={`err-${k}`}>{errors[k]}</span>;

  return (
    <section className="mn-section" id="start" aria-labelledby="start-title">
      <div className="mn-container">
        <div ref={ctaRef} className={`cta on-night cta--glass${inView ? " is-in" : ""}`}>
          {/* Soft, static colour behind the frosted form. */}
          <div className="glass-backdrop" aria-hidden="true">
            <span className="gb gb--lantern" />
            <span className="gb gb--arch" />
            <span className="gb gb--sea" />
            <span className="gb gb--dots" />
          </div>
          <div className="stack-sm">
            <span className="mn-eyebrow">{start.eyebrow}</span>
            <h2 id="start-title">
              {start.title.before}
              <span className={locale === "ar" ? "ar-accent" : "t-accent"} style={{ color: "var(--beacon)" }}>
                {start.title.accent}
              </span>
            </h2>
            <p className="cta-lead">{start.lead}</p>
            <ul className="hero-facts" style={{ borderTop: 0, paddingTop: 0 }}>
              {start.facts.map((fact) => (
                <li key={fact.label}>
                  <Icon name={fact.icon} size={18} />
                  {fact.label}
                </li>
              ))}
            </ul>
          </div>

          {sentTo ? (
            <div className="form-done glass" role="status" aria-live="polite" onPointerMove={trackGlassLight}>
              <span className="mn-badge mn-badge--success"><Icon name="check" />{f.done.badge}</span>
              <h3>{f.done.title}</h3>
              <p className="mn-muted">
                {f.done.before}
                <bdi style={{ color: "var(--ink)", fontWeight: 600 }}>{sentTo}</bdi>
                {f.done.after}
              </p>
              <button type="button" className="mn-btn mn-btn--night-outline" onClick={() => setSentTo(null)}>
                {f.done.again}
              </button>
            </div>
          ) : (
            <form className="glass" noValidate onSubmit={onSubmit} aria-label={f.aria} onPointerMove={trackGlassLight}>
              <div className="mn-grid-2" style={{ gap: 12 }}>
                <label className="mn-field">
                  <span className="mn-label">{f.name}</span>
                  <input {...field("name")} autoComplete="name" placeholder={f.namePh} />
                  {error("name")}
                </label>
                <label className="mn-field">
                  <span className="mn-label">{f.email}</span>
                  {/* Email addresses are always LTR, even on the Arabic page. */}
                  <input {...field("email")} type="email" dir="ltr" autoComplete="email" placeholder={f.emailPh} />
                  {error("email")}
                </label>
              </div>

              <fieldset className="mn-field">
                <legend className="mn-label">{f.typeLegend}</legend>
                <div className="mn-row" style={{ gap: 8 }}>
                  {f.types.map((type, i) => (
                    <label key={type} style={{ position: "relative" }}>
                      <input className="chip-input" type="radio" name="type" value={type} defaultChecked={i === 0} />
                      <span className="mn-chip">{type}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <label className="mn-field">
                <span className="mn-label">{f.idea}</span>
                <textarea {...field("idea")} style={{ minHeight: 96 }} placeholder={f.ideaPh} />
                {error("idea")}
              </label>

              <button type="submit" className="mn-btn mn-btn--beacon mn-btn--lg mn-btn--block">
                {primaryCta} <Icon name="arrow" size={18} flip />
              </button>
              <span className="mn-hint" style={{ textAlign: "center" }}>{f.whatsapp}</span>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
