import type { CSSProperties, ReactNode } from "react";

type CoverId = 1 | 2 | 3 | 4 | 5 | 6;

const dotGrid: ReactNode[] = [];
for (let x = 0; x < 9; x++)
  for (let y = 0; y < 6; y++) dotGrid.push(<circle key={`${x}-${y}`} cx={180 + x * 16} cy={24 + y * 26} r="2" />);

/** Generated course covers: abstract arches, bars and rings in brand colours (no stock photos). */
const COVERS: Record<CoverId, [string, ReactNode]> = {
  1: [
    "--night",
    <>
      <path d="M196 180V96a44 44 0 0 1 88 0v84" style={{ fill: "var(--night-raised)" }} />
      <path d="M216 180v-80a24 24 0 0 1 48 0v80" style={{ fill: "var(--tide)" }} />
      <circle cx="240" cy="54" r="10" style={{ fill: "var(--beacon)" }} />
    </>,
  ],
  2: [
    "--tide-soft",
    <>
      <path d="M180 180v-70a30 30 0 0 1 60 0v70M240 110a30 30 0 0 1 60 0v70" fill="none" style={{ stroke: "var(--tide)" }} strokeWidth="26" />
      <circle cx="240" cy="48" r="12" style={{ fill: "var(--beacon)" }} />
    </>,
  ],
  3: [
    "--beacon-soft",
    <>
      <rect x="170" y="40" width="22" height="140" rx="4" style={{ fill: "var(--night)" }} />
      <rect x="204" y="72" width="22" height="108" rx="4" style={{ fill: "var(--night)" }} />
      <rect x="238" y="20" width="22" height="160" rx="4" style={{ fill: "var(--beacon)" }} />
      <rect x="272" y="96" width="22" height="84" rx="4" style={{ fill: "var(--night)" }} />
    </>,
  ],
  4: [
    "--tide",
    <>
      <circle cx="250" cy="180" r="110" fill="none" style={{ stroke: "var(--tide-strong)" }} strokeWidth="18" />
      <circle cx="250" cy="180" r="70" fill="none" style={{ stroke: "var(--tide-strong)" }} strokeWidth="18" />
      <circle cx="250" cy="180" r="30" style={{ fill: "var(--beacon)" }} />
    </>,
  ],
  5: [
    "--night",
    <>
      <g style={{ fill: "var(--night-line)" }}>{dotGrid}</g>
      <path d="M190 180v-60a20 20 0 0 1 40 0v60" style={{ fill: "var(--beacon)" }} />
    </>,
  ],
  6: [
    "--surface-sunken",
    <>
      <path d="M150 180V80a50 50 0 0 1 100 0v100" style={{ fill: "var(--night)" }} />
      <path d="M250 180v-50a25 25 0 0 1 50 0v50" style={{ fill: "var(--tide)" }} />
      <circle cx="200" cy="64" r="10" style={{ fill: "var(--beacon)" }} />
    </>,
  ],
};

export function Cover({ n, style }: { n: CoverId; style?: CSSProperties }) {
  const [ground, art] = COVERS[n];
  return (
    <div className="mx-cover" data-cover={n} style={style}>
      <svg viewBox="0 0 320 180" preserveAspectRatio="xMaxYMid slice" aria-hidden="true">
        <rect width="320" height="180" style={{ fill: `var(${ground})` }} />
        {art}
      </svg>
    </div>
  );
}
