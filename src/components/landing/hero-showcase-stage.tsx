"use client";

import { HeroImageMarquee } from "@landing/components/landing/hero-image-marquee";
import { ProgressiveBlur } from "@landing/components/landing/progressive-blur";

export function HeroShowcaseStage() {
  return (
    <div className="hero-showcase-stage relative h-[min(92vw,44rem)] w-full bg-transparent sm:h-160 md:h-176">
      <div className="absolute inset-0 z-0 bg-transparent">
        <HeroImageMarquee className="h-full bg-transparent" />
      </div>

      <ProgressiveBlur
        position="left"
        width="min(28vw, 200px)"
        blurAmount="8px"
        fadeStrength={0.45}
      />
      <ProgressiveBlur
        position="left"
        width="min(36vw, 260px)"
        blurAmount="18px"
        fadeStrength={0.7}
        className="z-2"
      />
      <ProgressiveBlur
        position="right"
        width="min(28vw, 200px)"
        blurAmount="8px"
        fadeStrength={0.45}
      />
      <ProgressiveBlur
        position="right"
        width="min(36vw, 260px)"
        blurAmount="18px"
        fadeStrength={0.7}
        className="z-2"
      />
      <ProgressiveBlur
        position="bottom"
        height="min(16vh, 100px)"
        blurAmount="12px"
        fadeStrength={0.45}
      />
    </div>
  );
}
