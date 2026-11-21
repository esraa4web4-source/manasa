"use client";

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { Icon } from "@/components/brand/Icon";

type Props = {
  /** One node per card. Rendered on the server; this component only positions them. */
  cards: ReactNode[];
  label: string;
  pauseLabel: string;
  playLabel: string;
  /** +1 drifts left → right (English), -1 drifts right → left (Arabic). */
  direction: 1 | -1;
};

const SPEED = 34; // px per second at full speed
const GAP = 22; // px between cards
const MAX_TILT = 34; // degrees at the viewport edge
const EDGE_GROWTH = 0.34; // extra scale at the viewport edge
const PUSH_GAIN = 7; // px/s of extra speed per px of mouse travel
const MAX_PUSH = 1400; // px/s cap for mouse or swipe momentum
const PUSH_DECAY = 2.6; // how fast momentum fades back to the auto-drift (per second)

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

/**
 * A curved, endlessly drifting strip of screens: cards near the edges grow and turn toward the viewer, like the
 * inside of a cylinder. Pure transforms driven by requestAnimationFrame. Moving the mouse across it pushes the cards
 * the same way with momentum (a swipe on touch); it pauses off-screen, and the auto-drift stays still (with a play
 * button) under prefers-reduced-motion.
 */
export function ScreenReel({ cards, label, pauseLabel, playLabel, direction }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(true);
  const playingRef = useRef(true);
  const hoverRef = useRef(false);

  useIsoLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      playingRef.current = false;
      setPlaying(false);
    }
  }, []);

  useIsoLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const els = Array.from(root.querySelectorAll<HTMLElement>(".reel-card"));
    const n = els.length;
    let width = 0;
    let cardW = 0;
    let loop = 1;
    let offset = 0;
    let speed = playingRef.current ? SPEED : 0;
    let visible = true;
    let raf = 0;
    let last = 0;

    const measure = () => {
      width = root.clientWidth;
      cardW = els[0]?.offsetWidth ?? 220;
      loop = n * (cardW + GAP);
    };

    const place = () => {
      const half = width / 2;
      for (let i = 0; i < n; i++) {
        // Card centre relative to the reel centre, wrapped into [-loop/2, loop/2).
        let c = (((i * (cardW + GAP) + offset) % loop) + loop) % loop;
        c -= loop / 2;
        const d = Math.max(-1.25, Math.min(1.25, c / (half + cardW / 2)));
        const el = els[i];
        if (Math.abs(c) > half + cardW * 1.6) {
          el.style.visibility = "hidden";
          continue;
        }
        el.style.visibility = "visible";
        const scale = 1 + EDGE_GROWTH * d * d;
        el.style.transform = `translate3d(${half + c - cardW / 2}px, -50%, 0) rotateY(${(-d * MAX_TILT).toFixed(2)}deg) scale(${scale.toFixed(3)})`;
        el.style.zIndex = String(100 + Math.round(Math.abs(d) * 50));
      }
    };

    /*
     * Pointer-driven motion. Moving the mouse across the reel pushes the cards the same way (left → right or
     * right → left) with momentum; on touch, a horizontal swipe drags them and flings on release.
     * `push` is extra velocity in px/s that decays back to the slow auto-drift.
     */
    let push = 0;
    let lastX: number | null = null;
    let dragging = false;
    let lastMoveT = 0;

    const tick = (t: number) => {
      // Cap the step at 0.25s: keeps true speed on slow devices, but avoids a jump after the tab was hidden.
      const dt = last ? Math.min(0.25, (t - last) / 1000) : 0;
      last = t;
      // While the pointer is over the reel it is in control, so the auto-drift eases to a stop.
      const target = playingRef.current && !hoverRef.current ? SPEED : 0;
      speed += (target - speed) * Math.min(1, dt * 4); // ease in/out instead of a hard stop
      // While a finger drags, the strip follows it exactly; momentum applies only after release.
      if (!dragging) {
        push *= Math.exp(-dt * PUSH_DECAY);
        offset += (direction * speed + push) * dt;
      }
      place();
      raf = visible ? requestAnimationFrame(tick) : 0;
    };

    const onEnter = (e: PointerEvent) => {
      lastX = e.clientX;
      if (e.pointerType === "mouse") hoverRef.current = true;
    };
    const onMove = (e: PointerEvent) => {
      if (lastX === null) lastX = e.clientX;
      const dx = e.clientX - lastX;
      lastX = e.clientX;
      if (e.pointerType === "mouse") {
        push = Math.max(-MAX_PUSH, Math.min(MAX_PUSH, push + dx * PUSH_GAIN));
      } else if (dragging) {
        offset += dx; // finger drags the strip 1:1
        // Track release velocity (px/s), lightly smoothed, from the real time between events.
        const now = performance.now();
        const v = dx / Math.max(0.008, (now - lastMoveT) / 1000);
        lastMoveT = now;
        push = Math.max(-MAX_PUSH, Math.min(MAX_PUSH, push * 0.5 + v * 0.5));
        place();
      }
    };
    const onDown = (e: PointerEvent) => {
      if (e.pointerType === "mouse") return;
      dragging = true;
      hoverRef.current = true;
      lastX = e.clientX;
      lastMoveT = performance.now();
      push = 0;
    };
    const onUp = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") {
        dragging = false;
        hoverRef.current = false;
      }
    };
    const onLeave = (e: PointerEvent) => {
      lastX = null;
      if (e.pointerType === "mouse") hoverRef.current = false;
    };

    root.addEventListener("pointerenter", onEnter);
    root.addEventListener("pointermove", onMove);
    root.addEventListener("pointerdown", onDown);
    root.addEventListener("pointerup", onUp);
    root.addEventListener("pointercancel", onUp);
    root.addEventListener("pointerleave", onLeave);

    const start = () => {
      if (!raf) {
        last = 0;
        raf = requestAnimationFrame(tick);
      }
    };

    measure();
    place();
    setReady(true);

    const ro = new ResizeObserver(() => {
      measure();
      place();
    });
    ro.observe(root);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
    });
    io.observe(root);
    start();

    return () => {
      cancelAnimationFrame(raf);
      root.removeEventListener("pointerenter", onEnter);
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerdown", onDown);
      root.removeEventListener("pointerup", onUp);
      root.removeEventListener("pointercancel", onUp);
      root.removeEventListener("pointerleave", onLeave);
      ro.disconnect();
      io.disconnect();
    };
  }, [direction]);

  const toggle = () => {
    playingRef.current = !playingRef.current;
    setPlaying(playingRef.current);
  };

  return (
    <div className="reel-wrap">
      <div
        ref={rootRef}
        className={`reel${ready ? " is-ready" : ""}`}
        role="img"
        aria-label={label}
        dir="ltr"
      >
        {cards.map((card, i) => (
          <div className="reel-card" key={i} aria-hidden="true">
            {card}
          </div>
        ))}
      </div>
      <button type="button" className="reel-toggle mn-btn mn-btn--night-outline mn-btn--sm mn-btn--icon" onClick={toggle} aria-label={playing ? pauseLabel : playLabel} aria-pressed={!playing}>
        <Icon name={playing ? "pause" : "playSolid"} size={16} />
      </button>
    </div>
  );
}
