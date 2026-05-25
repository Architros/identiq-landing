import type { CSSProperties } from "react";

type ProgressiveBlurProps = {
  className?: string;
  position?: "top" | "bottom" | "left" | "right";
  height?: string;
  width?: string;
  blurAmount?: string;
  /** 0–1: how far the fade extends inward (higher = longer, softer ramp). */
  fadeStrength?: number;
};

function softMask(
  position: "top" | "bottom" | "left" | "right",
  fadeStrength: number,
): string {
  const mid = Math.round(18 + fadeStrength * 28);
  const far = Math.round(55 + fadeStrength * 35);

  switch (position) {
    case "left":
      return `linear-gradient(to right, #000 0%, rgba(0,0,0,0.75) ${mid * 0.35}%, rgba(0,0,0,0.35) ${mid}%, rgba(0,0,0,0.12) ${far}%, transparent 100%)`;
    case "right":
      return `linear-gradient(to left, #000 0%, rgba(0,0,0,0.75) ${mid * 0.35}%, rgba(0,0,0,0.35) ${mid}%, rgba(0,0,0,0.12) ${far}%, transparent 100%)`;
    case "top":
      return `linear-gradient(to bottom, #000 0%, rgba(0,0,0,0.75) ${mid * 0.35}%, rgba(0,0,0,0.35) ${mid}%, rgba(0,0,0,0.12) ${far}%, transparent 100%)`;
    case "bottom":
      return `linear-gradient(to top, #000 0%, rgba(0,0,0,0.75) ${mid * 0.35}%, rgba(0,0,0,0.35) ${mid}%, rgba(0,0,0,0.12) ${far}%, transparent 100%)`;
  }
}

/**
 * Edge blur with no tint — mask-only fade so start/end are invisible.
 */
export function ProgressiveBlur({
  className = "",
  position = "left",
  height = "150px",
  width = "min(42vw, 360px)",
  blurAmount = "16px",
  fadeStrength = 0.65,
}: ProgressiveBlurProps) {
  const isTop = position === "top";
  const isBottom = position === "bottom";
  const isLeft = position === "left";
  const isVertical = isTop || isBottom;

  const positionStyle: CSSProperties = isVertical
    ? {
        left: 0,
        width: "100%",
        height,
        ...(isTop ? { top: 0 } : { bottom: 0 }),
      }
    : {
        top: 0,
        height: "100%",
        width,
        ...(isLeft ? { left: 0 } : { right: 0 }),
      };

  const mask = softMask(position, fadeStrength);

  return (
    <div
      className={`pointer-events-none absolute z-[1] select-none ${className}`}
      style={{
        ...positionStyle,
        background: "transparent",
        maskImage: mask,
        WebkitMaskImage: mask,
        WebkitBackdropFilter: `blur(${blurAmount})`,
        backdropFilter: `blur(${blurAmount})`,
      }}
      aria-hidden
    />
  );
}
