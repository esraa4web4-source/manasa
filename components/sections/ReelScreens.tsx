import type { ReactNode } from "react";
import { Cover } from "@/components/brand/Cover";
import { Icon } from "@/components/brand/Icon";
import { Mark } from "@/components/brand/Mark";
import type { IconName } from "@/lib/icons";

/*
 * Twelve LMS screen fragments for the hero reel, built from the design system's mx- mockup classes.
 * Mockups show sample data for an English-language client (and one Arabic client app), per the brand rule
 * "keep product mockups in the language of the client they depict".
 */

type Tone = "surface" | "night" | "tide" | "beacon";

function Screen({ tone = "surface", children }: { tone?: Tone; children: ReactNode }) {
  return <div className={`rs rs--${tone}`}>{children}</div>;
}

const Head = ({ icon, children }: { icon: IconName; children: ReactNode }) => (
  <div className="rs-head">
    <Icon name={icon} size={13} />
    <span>{children}</span>
  </div>
);

export const REEL_SCREENS: { icon: IconName; node: ReactNode }[] = [
  {
    icon: "chart",
    node: (
      <Screen>
        <Head icon="home">Academy overview</Head>
        <div className="rs-kpis">
          <div className="mx-panel"><span className="mx-kpi__label">Students</span><b>1,248</b><span className="mx-delta">▲ 8.2%</span></div>
          <div className="mx-panel"><span className="mx-kpi__label">Completion</span><b>78%</b><span className="mx-delta">▲ 4 pts</span></div>
        </div>
        <div className="mx-panel rs-grow">
          <div className="mx-panel__head"><h3>Enrolments</h3><span>Weekly</span></div>
          <div className="mx-bars">
            {[38, 52, 46, 61, 57, 70].map((h, i) => <span key={i} style={{ height: `${h}%` }} />)}
            <span className="is-hi" style={{ height: "92%" }} />
            <span className="is-beacon" style={{ height: "34%" }} />
          </div>
        </div>
      </Screen>
    ),
  },
  {
    icon: "video",
    node: (
      <Screen tone="night">
        <div className="rs-video">
          <span className="rs-play"><Icon name="playSolid" size={16} /></span>
          <div className="mx-progress mx-progress--beacon"><i style={{ width: "42%" }} /></div>
        </div>
        <b className="rs-title">Lesson 6 · Projectile motion</b>
        <div className="rs-curriculum">
          <div><span className="rs-check is-done"><Icon name="check" size={10} /></span>Vectors &amp; components<em>12:40</em></div>
          <div><span className="rs-check is-done"><Icon name="check" size={10} /></span>Free fall<em>09:15</em></div>
          <div className="is-now"><span className="rs-check" />Projectile motion<em>18:02</em></div>
          <div><span className="rs-check" />Practice set<em>Quiz</em></div>
        </div>
      </Screen>
    ),
  },
  {
    icon: "quiz",
    node: (
      <Screen>
        <div className="rs-row">
          <span className="mx-tag mx-tag--beacon">Q 8 / 25</span>
          <span className="mx-tag"><Icon name="clock" size={10} /> 24:10</span>
        </div>
        <b className="rs-title">Find f′(1) for f(x) = 3x⁴ − 2x² + 5x − 7</b>
        <div className="rs-options">
          <div>A · f′(1) = 9</div>
          <div className="is-picked">B · f′(1) = 13</div>
          <div>C · f′(1) = 17</div>
          <div>D · f′(1) = 21</div>
        </div>
        <div className="rs-dots">{Array.from({ length: 10 }, (_, i) => <i key={i} className={i < 7 ? "is-done" : i === 7 ? "is-now" : ""} />)}</div>
      </Screen>
    ),
  },
  {
    icon: "award",
    node: (
      <Screen tone="night">
        <span className="rs-over">Quiz complete</span>
        <div className="rs-score">17<span>/20</span></div>
        <span className="rs-muted">Newton’s laws · 85%</span>
        <div className="rs-stack">
          <div className="rs-line"><span>Accuracy</span><div className="mx-progress mx-progress--beacon"><i style={{ width: "85%" }} /></div></div>
          <div className="rs-line"><span>Time</span><div className="mx-progress mx-progress--beacon"><i style={{ width: "62%" }} /></div></div>
        </div>
        <span className="mn-badge mn-badge--night rs-badge"><Icon name="check" />Passed</span>
      </Screen>
    ),
  },
  {
    icon: "card",
    node: (
      <Screen>
        <Cover n={3} style={{ borderRadius: 8 }} />
        <span className="mn-badge mn-badge--tide rs-badge">Bestseller</span>
        <b className="rs-title">Financial Accounting, from zero to final exam</b>
        <span className="rs-muted">42 lessons · certificate</span>
        <div className="rs-row rs-push">
          <span className="mx-avatar mx-avatar--sm">KF</span>
          <b className="rs-price">$49</b>
        </div>
        <span className="mn-btn mn-btn--primary mn-btn--sm rs-btn">Enrol now</span>
      </Screen>
    ),
  },
  {
    icon: "award",
    node: (
      <Screen tone="beacon">
        <div className="rs-cert">
          <Mark style={{ display: "block", width: 22 }} />
          <span className="rs-over">Certificate of completion</span>
          <b className="rs-cert-name">Layla Hassan</b>
          <span className="rs-muted">Financial Accounting 101</span>
          <div className="rs-row rs-push rs-cert-foot">
            <span className="rs-sign">Dr. K. Fathy</span>
            <span className="rs-seal"><Icon name="award" size={16} /></span>
          </div>
        </div>
      </Screen>
    ),
  },
  {
    icon: "calendar",
    node: (
      <Screen>
        <Head icon="calendar">This week</Head>
        <div className="rs-sched">
          {[
            ["MON", "18:00", "Live revision · Unit 4", "Live", "tide"],
            ["WED", "20:00", "Quiz 4 opens", "Exam", "beacon"],
            ["THU", "17:30", "Office hours", "Q&A", ""],
            ["SAT", "11:00", "Mock final", "Exam", "beacon"],
          ].map(([d, t, label, tag, tone]) => (
            <div key={d}>
              <span className="rs-day"><b>{d}</b>{t}</span>
              <span className="rs-sched-label">{label}</span>
              <span className={`mx-tag${tone ? ` mx-tag--${tone}` : ""}`}>{tag}</span>
            </div>
          ))}
        </div>
      </Screen>
    ),
  },
  {
    icon: "layers",
    node: (
      <Screen>
        <Head icon="chart">Topic mastery</Head>
        <div className="rs-heat">
          {[3, 4, 2, 4, 1, 3, 4, 3, 2, 4, 4, 2, 1, 3, 4, 3, 4, 2, 3, 1, 4, 3, 2, 4].map((v, i) => (
            <i key={i} data-v={v} />
          ))}
        </div>
        <div className="mx-panel rs-alert">
          <span className="mx-tag mx-tag--danger">3 at risk</span>
          <span>Vectors · Week 5</span>
        </div>
      </Screen>
    ),
  },
  {
    icon: "mobile",
    node: (
      <Screen tone="tide">
        <div className="rs-ar" dir="rtl" lang="ar">
          <b className="rs-title">مساء الخير، عمر</b>
          <div className="rs-continue">
            <span>تابع التعلّم</span>
            <b>الفيزياء · حركة المقذوفات</b>
            <div className="mx-progress mx-progress--beacon"><i style={{ width: "64%" }} /></div>
          </div>
          <Cover n={2} style={{ borderRadius: 8 }} />
          <div className="rs-row rs-chip-ar"><span>اختبار قوانين نيوتن</span><span className="mx-tag mx-tag--beacon">الخميس</span></div>
        </div>
      </Screen>
    ),
  },
  {
    icon: "ai",
    node: (
      <Screen tone="night">
        <div className="rs-row">
          <span className="mx-avatar mx-avatar--beacon mx-avatar--sm">✦</span>
          <b>AI assistant</b>
        </div>
        <span className="rs-muted">10 questions drafted from Lecture 6</span>
        <div className="rs-ai">
          {[
            ["MCQ", "A ball is launched at 30°…"],
            ["Short", "Explain why horizontal velocity…"],
            ["MCQ", "Maximum height occurs when…"],
          ].map(([k, q]) => (
            <div key={q}><span className="mx-tag">{k}</span>{q}</div>
          ))}
        </div>
        <span className="mn-btn mn-btn--beacon mn-btn--sm rs-btn">Add to question bank</span>
      </Screen>
    ),
  },
  {
    icon: "card",
    node: (
      <Screen>
        <Head icon="card">Payments</Head>
        <div className="mx-panel rs-rev">
          <span className="mx-kpi__label">Revenue · Nov</span>
          <b>$18.4k</b>
          <span className="mx-delta">▲ 12%</span>
        </div>
        <div className="rs-tx">
          {[
            ["SA", "Sara A.", "$49"],
            ["MK", "Mohamed K.", "$120"],
            ["NR", "Nour R.", "$49"],
          ].map(([i, n, a]) => (
            <div key={n}>
              <span className="mx-avatar mx-avatar--sm">{i}</span>
              <span className="rs-sched-label">{n}</span>
              <b>{a}</b>
              <span className="mx-tag mx-tag--success">Paid</span>
            </div>
          ))}
        </div>
      </Screen>
    ),
  },
  {
    icon: "chart",
    node: (
      <Screen>
        <Head icon="lms">My progress</Head>
        <div className="rs-ring-wrap">
          <div className="mx-ring" style={{ ["--p" as string]: 64 }} data-label="64%" />
          <div className="rs-stack">
            <b>Unit 4 of 6</b>
            <span className="rs-muted">Mechanics</span>
          </div>
        </div>
        <div className="rs-streak">
          {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
            <span key={i} className={i < 5 ? "is-on" : ""}>{d}</span>
          ))}
        </div>
        <span className="rs-muted rs-center">12-day study streak</span>
      </Screen>
    ),
  },
];
