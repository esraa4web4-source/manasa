import type { CSSProperties } from "react";
import { ICONS, type IconName } from "@/lib/icons";

type IconProps = {
  name: IconName;
  size?: number;
  className?: string;
  style?: CSSProperties;
  /** Directional icon (arrows): mirrored automatically under dir="rtl". */
  flip?: boolean;
};

/** Design-system line icon. Mirrors `Manara.icon()` from bundle.js: an <i> wrapper with an inline SVG in currentColor. */
export function Icon({ name, size = 24, className, style, flip }: IconProps) {
  return (
    <i className={className} style={{ display: "inline-flex", ...style }} aria-hidden="true">
      <svg
        viewBox="0 0 24 24"
        width={size}
        height={size}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className={flip ? "flip" : undefined}
        dangerouslySetInnerHTML={{ __html: ICONS[name] }}
      />
    </i>
  );
}
