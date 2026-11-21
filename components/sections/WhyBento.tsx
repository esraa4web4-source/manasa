"use client";

import { useEffect, useState, useSyncExternalStore, type ReactNode } from "react";
import { Cover } from "@/components/brand/Cover";
import { Icon } from "@/components/brand/Icon";
import { Mark } from "@/components/brand/Mark";
import type { IconName } from "@/lib/icons";
import type { Dict } from "@/lib/i18n/types";
import { useInView } from "@/lib/useInView";

type Why = Dict["why"];
type Props = { t: Why; locale: Dict["locale"] };

const DEVICE_ICONS: IconName[] = ["platform", "responsive", "mobile"];
const COVERS = [4, 3, 1] as const; // per brand palette in the "custom" tile

const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";
function subscribeReduced(cb: () => void) {
  const mq = window.matchMedia(REDUCED_QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}
function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeReduced,
    () => window.matchMedia(REDUCED_QUERY).matches,
    () => false,
  );
}

/** Cycles 0..n-1 every `ms` while `active`; stops for good once the visitor picks a value. */
function useAutoCycle(n: number, ms: number, active: boolean) {
  const [i, setI] = useState(0);
  const [manual, setManual] = useState(false);
  useEffect(() => {
    if (!active || manual) return;
    const id = window.setInterval(() => setI((v) => (v + 1) % n), ms);
    return () => window.clearInterval(id);
  }, [active, manual, n, ms]);
  const pick = (v: number) => {
    setManual(true);
    setI(v);
  };
  return [i, pick] as const;
}

/** Counts from `from` to `to` once `start` turns true (ease-out), formatted for the locale. */
function useCountUp(from: number, to: number, start: boolean, reduced: boolean, locale: string) {
  const [v, setV] = useState(from);
  useEffect(() => {
    if (!start || reduced) return;
    let raf = 0;
    const t0 = performance.now();
    const dur = 2200;
    const step = (now: number) => {
      const p = Math.min(1, (now - t0) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      // Grow on a log scale so 50 → 50,000 feels steady instead of jumping straight to thousands.
      setV(Math.round(Math.exp(Math.log(from) + (Math.log(to) - Math.log(from)) * eased)));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [start, reduced, from, to]);
  // Under reduced motion, show the final number straight away.
  return new Intl.NumberFormat(locale === "ar" ? "ar-EG" : "en-US").format(reduced && start ? to : v);
}

function Tile({
  area,
  item,
  night,
  visual,
  index,
}: {
  area: string;
  item: Why["items"][number];
  night?: boolean;
  visual: ReactNode;
  index: number;
}) {
  return (
    <article className={`tile tile--${area}${night ? " tile--night on-night" : ""}`} style={{ ["--i" as string]: index }}>
      <div className="tile-visual">{visual}</div>
      <div className="tile-body">
        <span className={`mn-icon-tile${night ? " mn-icon-tile--night" : item.beacon ? " mn-icon-tile--beacon" : ""}`}>
          <Icon name={item.icon} />
        </span>
        <div>
          <h3>{item.title}</h3>
          <p>{item.body}</p>
        </div>
      </div>
    </article>
  );
}

/**
 * "Why choose us" as a bento grid. Each tile shows its promise working: a page that reflows across devices,
 * AI drafting questions, a course page changing brand colours, 50 → 50,000 students, security checks with a
 * load meter, and a support chat. Animations start when the section scrolls into view; under reduced motion
 * every tile shows its finished state, and the device and colour pickers still work by click.
 */
export function WhyBento({ t, locale }: Props) {
  const v = t.visuals;
  const [ref, inView] = useInView<HTMLElement>(0.15);
  const reduced = usePrefersReducedMotion();
  const live = inView && !reduced;
  const [device, pickDevice] = useAutoCycle(3, 2400, live);
  const [palette, pickPalette] = useAutoCycle(3, 2600, live);
  const students = useCountUp(v.scaleFrom, v.scaleTo, inView, reduced, locale);
  const [custom, tech, responsive, scale, security, support] = t.items;
  const qLabel = (n: number) => (locale === "ar" ? `س${"٠١٢٣٤٥٦٧٨٩"[n]}` : `Q${n}`);

  return (
    <section ref={ref} className={`mn-section why-bento${inView ? " is-in" : ""}`} aria-labelledby="why-title">
      <div className="mn-container">
        <div className="mn-section-head mn-section-head--center" style={{ marginBottom: 48 }}>
          <span className="mn-eyebrow">{t.eyebrow}</span>
          <h2 className="sec" id="why-title">{t.title}</h2>
          <p>{t.intro}</p>
        </div>

        <div className="bento">
          {/* 1 · Responsive: one page reflowing across devices (container queries). */}
          <Tile
            area="resp"
            index={0}
            item={responsive}
            visual={
              <div className="rv">
                <div className="rv-tabs" role="group" aria-label={responsive.title}>
                  {v.devices.map((d, i) => (
                    <button key={d} type="button" className={device === i ? "is-on" : undefined} aria-pressed={device === i} onClick={() => pickDevice(i)}>
                      <Icon name={DEVICE_ICONS[i]} size={15} />
                      {d}
                    </button>
                  ))}
                </div>
                <div className="rv-stage" aria-hidden="true">
                  <div className="rv-frame" data-step={device}>
                    <div className="rv-bar"><i /><i /><i /></div>
                    <div className="rv-page">
                      <div className="rv-nav">
                        <b><Mark style={{ display: "block", width: 16 }} />{v.demoBrand}</b>
                        <span className="rv-links"><i /><i /><i /></span>
                        <span className="rv-burger"><i /><i /><i /></span>
                      </div>
                      <div className="rv-hero">
                        <span className="rv-h" />
                        <span className="rv-h rv-h--short" />
                        <span className="rv-btn" />
                      </div>
                      <div className="rv-grid">
                        {v.demoCourses.map((c, i) => (
                          <div key={c} className="rv-card">
                            <Cover n={([2, 3, 1] as const)[i]} style={{ borderRadius: 6 }} />
                            <b>{c}</b>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            }
          />

          {/* 2 · Tech & AI: a prompt becomes drafted questions. */}
          <Tile
            area="ai"
            index={1}
            night
            item={tech}
            visual={
              <div className="ai" aria-hidden="true">
                <div className="ai-head">
                  <span className="mx-avatar mx-avatar--beacon mx-avatar--sm">✦</span>
                  <b>{v.aiTag}</b>
                </div>
                <div className="ai-prompt">
                  <span>{v.aiPrompt}</span>
                  <span className="ai-send"><Icon name="arrow" size={14} flip /></span>
                </div>
                <ol className="ai-lines">
                  {v.aiLines.map((l, i) => (
                    <li key={l} style={{ ["--d" as string]: i }}>
                      <span className="mx-tag">{qLabel(i + 1)}</span>
                      <span>{l}</span>
                    </li>
                  ))}
                </ol>
                <span className="ai-done"><Icon name="check" size={14} />{v.aiDone}</span>
              </div>
            }
          />

          {/* 3 · Custom: the same course page in different brand colours. */}
          <Tile
            area="cust"
            index={2}
            item={custom}
            visual={
              <div className="cu" data-p={palette}>
                <div className="cu-card" aria-hidden="true">
                  <Cover n={COVERS[palette]} style={{ borderRadius: 8 }} />
                  <b>{v.courseTitle}</b>
                  <span>{v.courseMeta}</span>
                  <span className="cu-btn">{v.enrol}</span>
                </div>
                <div className="cu-swatches" role="group" aria-label={v.palettesLabel}>
                  {v.paletteNames.map((n, i) => (
                    <button key={n} type="button" className={`sw sw--${i}`} aria-label={n} aria-pressed={palette === i} onClick={() => pickPalette(i)} />
                  ))}
                </div>
              </div>
            }
          />

          {/* 4 · Scalable: 50 → 50,000 students on the same platform. */}
          <Tile
            area="scale"
            index={3}
            item={scale}
            visual={
              <div className="sc" aria-hidden="true">
                <div className="sc-count">
                  <b>{students}</b>
                  <span>{v.studentsLabel}</span>
                </div>
                <div className="sc-bars">
                  {[14, 22, 30, 42, 55, 68, 82, 100].map((h, i) => (
                    <i key={i} style={{ ["--h" as string]: `${h}%`, ["--d" as string]: i }} />
                  ))}
                </div>
                <span className="sc-note"><Icon name="check" size={13} />{v.sameCode}</span>
              </div>
            }
          />

          {/* 5 · Security & performance: protections tick on, plus a load meter. */}
          <Tile
            area="sec"
            index={4}
            item={security}
            visual={
              <div className="se" aria-hidden="true">
                <div className="se-shield">
                  <Icon name="shield" size={34} />
                  <span className="se-scan" />
                </div>
                <ul className="se-checks">
                  {v.security.map((s, i) => (
                    <li key={s} style={{ ["--d" as string]: i }}>
                      <span className="se-tick"><Icon name="check" size={11} /></span>
                      {s}
                    </li>
                  ))}
                </ul>
                <div className="se-load">
                  <span>{v.loadLabel}</span>
                  <div className="se-meter"><i /></div>
                  <b>{v.loadValue}</b>
                </div>
              </div>
            }
          />

          {/* 6 · Support: a client message, typing, then the fix. */}
          <Tile
            area="supp"
            index={5}
            item={support}
            visual={
              <div className="ch" aria-hidden="true">
                <div className="ch-msg ch-msg--in">
                  <span className="mx-avatar mx-avatar--sm">{locale === "ar" ? "ل" : "DL"}</span>
                  <div>
                    <small>{v.chatName}</small>
                    <p>{v.chatQ}</p>
                  </div>
                </div>
                <div className="ch-typing"><i /><i /><i /><span>{v.chatTyping}</span></div>
                <div className="ch-msg ch-msg--out">
                  <div>
                    <p><Icon name="check" size={13} /> {v.chatA}</p>
                    <small>{v.chatTime}</small>
                  </div>
                  {/* Neutral ground: the amber lantern never sits on an amber fill (logo rule). */}
                  <span className="mx-avatar mx-avatar--ink mx-avatar--sm"><Mark style={{ display: "block", width: 14 }} /></span>
                </div>
              </div>
            }
          />
        </div>
      </div>
    </section>
  );
}
