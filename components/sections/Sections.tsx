import { Icon } from "@/components/brand/Icon";
import { pad2 } from "@/lib/i18n";
import { START_HREF, type Dict } from "@/lib/i18n/types";

type Props = { t: Dict };

export function BuiltFor({ t }: Props) {
  const b = t.builtFor;
  return (
    <section className="trust" aria-label={b.aria}>
      <div className="mn-container">
        <span className="t-overline mn-muted">{b.label}</span>
        <ul>
          {b.items.map((a) => (
            <li key={a.label}>
              <Icon name={a.icon} size={18} />
              {a.label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function ValueProp({ t }: Props) {
  const v = t.value;
  return (
    <section className="mn-section" aria-labelledby="vp-title">
      <div className="mn-container vp">
        <div className="mn-section-head">
          <span className="mn-eyebrow">{v.eyebrow}</span>
          <h2 className="sec" id="vp-title">{v.title}</h2>
          <p>{v.intro}</p>
          <a className="mn-btn mn-btn--link" href="#process">
            {v.link} <Icon name="arrow" size={16} flip />
          </a>
        </div>
        <ol className="vp-list">
          {v.points.map((p, i) => (
            <li key={p.title}>
              <span className="n">{pad2(i + 1, t.locale)}</span>
              <div>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Services({ t }: Props) {
  const s = t.services;
  return (
    <section className="mn-section" id="services" style={{ background: "var(--surface-sunken)" }} aria-labelledby="services-title">
      <div className="mn-container">
        <div className="head-row">
          <div className="mn-section-head">
            <span className="mn-eyebrow">{s.eyebrow}</span>
            <h2 className="sec" id="services-title">{s.title}</h2>
          </div>
          <p className="mn-muted" style={{ maxWidth: 380 }}>{s.intro}</p>
        </div>
        <div className="mn-grid-3">
          {s.items.map((item) => (
            <article
              key={item.title}
              className={item.featured ? "mn-card mn-card--night mn-service mn-night-glow" : "mn-card mn-card--interactive mn-service"}
            >
              <span className={item.featured ? "mn-icon-tile mn-icon-tile--night" : "mn-icon-tile"}>
                <Icon name={item.icon} />
              </span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
              <ul className="mn-ticks">
                {item.ticks.map((tick) => <li key={tick}>{tick}</li>)}
              </ul>
              <div className="mn-service__foot">
                <span>{item.foot}</span>
                <Icon name="arrowUpRight" size={18} flip />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Process({ t }: Props) {
  const p = t.process;
  return (
    <section
      className="mn-section"
      id="process"
      style={{ background: "var(--surface)", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}
      aria-labelledby="process-title"
    >
      <div className="mn-container">
        <div className="head-row">
          <div className="mn-section-head">
            <span className="mn-eyebrow">{p.eyebrow}</span>
            <h2 className="sec" id="process-title">{p.title}</h2>
          </div>
          <p className="mn-muted" style={{ maxWidth: 380 }}>{p.intro}</p>
        </div>
        <ol className="mn-steps" style={{ margin: 0, padding: 0, listStyle: "none" }}>
          {p.steps.map((s, i) => (
            <li key={s.title} className={i === 0 ? "mn-step is-current" : "mn-step"}>
              <span className="mn-step__num">{pad2(i + 1, t.locale)}</span>
              <span className="mn-step__meta">{s.meta}</span>
              <h4>{s.title}</h4>
              <p>{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Faq({ t }: Props) {
  const f = t.faq;
  return (
    <section className="mn-section" id="faq" style={{ background: "var(--surface-sunken)" }} aria-labelledby="faq-title">
      <div className="mn-container faq-grid">
        <div className="mn-section-head">
          <span className="mn-eyebrow">{f.eyebrow}</span>
          <h2 className="sec" id="faq-title">{f.title}</h2>
          <p>{f.intro}</p>
          <a className="mn-btn mn-btn--secondary" href={START_HREF}>{f.cta}</a>
        </div>
        <div className="mn-faq">
          {f.items.map((item, i) => (
            <details key={item.q} open={i === 0}>
              <summary>{item.q}</summary>
              <div>{item.a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
