"use client";

import { HeroImageMarquee } from "@/components/landing/hero-image-marquee";
import { ProgressiveBlur } from "@/components/landing/progressive-blur";

export function HeroShowcaseStage() {
  return (
    <div className="hero-showcase-stage relative h-[min(56vw,28rem)] w-full bg-transparent sm:h-[30rem] md:h-[34rem]">
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
        className="z-[2]"
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
        className="z-[2]"
      />
    </div>
  );
}
