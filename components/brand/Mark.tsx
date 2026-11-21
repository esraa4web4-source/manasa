import type { CSSProperties } from "react";

export type MarkVariant = "default" | "reversed" | "mono" | "mono-light" | "tile" | "tile-beacon";

/**
 * The Manara mark: a lowercase "m" drawn as two arches with the beacon lantern above the centre stem.
 * Use `reversed` on night, `default` on paper.
 */
export function Mark({ variant = "default", style }: { variant?: MarkVariant; style?: CSSProperties }) {
  let ink = variant === "reversed" || variant === "mono-light" ? "var(--on-night)" : "var(--ink)";
  let dot = variant === "mono" || variant === "mono-light" ? ink : "var(--beacon)";
  let bg: string | null = null;
  if (variant === "tile") {
    bg = "var(--night)";
    ink = "var(--on-night)";
  }
  if (variant === "tile-beacon") {
    bg = "var(--beacon)";
    ink = "var(--night)";
    dot = "var(--night)";
  }
  return (
    <span data-mark={variant} style={style}>
      <svg viewBox="0 0 64 64" aria-hidden="true">
        {bg && <rect width="64" height="64" rx="15" style={{ fill: bg }} />}
        <path
          d="M16 54V36a8 8 0 0 1 16 0v18M32 36a8 8 0 0 1 16 0v18"
          fill="none"
          style={{ stroke: ink }}
          strokeWidth={8}
          strokeLinecap="butt"
        />
        <circle cx="32" cy="15" r="5.5" style={{ fill: dot }} />
      </svg>
    </span>
  );
}

/** EN lockup: "manara labs" in Instrument Sans. AR lockup: "منارة" in Alexandria 600. */
export function Logo({
  variant = "reversed",
  href = "#top",
  label,
  arabic = false,
}: {
  variant?: MarkVariant;
  href?: string;
  label: string;
  arabic?: boolean;
}) {
  return (
    <a className="mn-logo" href={href} aria-label={label}>
      <Mark variant={variant} />
      {arabic ? (
        <span className="mn-wordmark-ar">منارة</span>
      ) : (
        <span className="mn-wordmark">
          manara<span>labs</span>
        </span>
      )}
    </a>
  );
}
