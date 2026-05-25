"use client";

import { useEffect, useState } from "react";
import { CdnImage } from "@/components/landing/cdn-image";
import {
  LANDING_TEMPLATE_IMAGES,
  type LandingTemplateImage,
} from "@/content/landing-media";
import { cn } from "@/lib/utils";

const MARQUEE_IMAGES = LANDING_TEMPLATE_IMAGES.slice(0, 10);

type TileLimits = {
  maxHeight: number;
  maxWidth: number;
  minHeight: number;
};

function getTileLimits(viewportWidth: number): TileLimits {
  if (viewportWidth >= 768) {
    return { maxHeight: 440, maxWidth: 520, minHeight: 210 };
  }
  if (viewportWidth >= 640) {
    return { maxHeight: 380, maxWidth: 420, minHeight: 180 };
  }
  return { maxHeight: 300, maxWidth: 280, minHeight: 150 };
}

/** Fit inside max box while keeping native aspect ratio. */
export function fitMarqueeTile(
  image: LandingTemplateImage,
  limits: TileLimits,
): { width: number; height: number } {
  const ratio = image.width / image.height;
  let height = limits.maxHeight;
  let width = height * ratio;

  if (width > limits.maxWidth) {
    width = limits.maxWidth;
    height = width / ratio;
  }

  if (height < limits.minHeight) {
    height = limits.minHeight;
    width = height * ratio;
    if (width > limits.maxWidth) {
      width = limits.maxWidth;
      height = width / ratio;
    }
  }

  return { width: Math.round(width), height: Math.round(height) };
}

function useMarqueeTileLimits(): TileLimits {
  const [limits, setLimits] = useState<TileLimits>(() =>
    typeof window !== "undefined"
      ? getTileLimits(window.innerWidth)
      : { maxHeight: 440, maxWidth: 520, minHeight: 210 },
  );

  useEffect(() => {
    const update = () => setLimits(getTileLimits(window.innerWidth));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return limits;
}

function MarqueeTile({
  image,
  limits,
}: {
  image: LandingTemplateImage;
  limits: TileLimits;
}) {
  const { width, height } = fitMarqueeTile(image, limits);

  return (
    <div
      className="hero-marquee-tile relative shrink-0 overflow-hidden rounded-xl ring-1 ring-white/20"
      style={{ width, height }}
    >
      <CdnImage
        src={image.imageUrl}
        alt=""
        className="block h-full w-full object-cover"
      />
    </div>
  );
}

export function HeroImageMarquee({ className }: { className?: string }) {
  const limits = useMarqueeTileLimits();
  const loop = [...MARQUEE_IMAGES, ...MARQUEE_IMAGES];

  return (
    <div
      className={cn(
        "relative flex h-full w-full items-center overflow-hidden bg-transparent",
        className,
      )}
      aria-hidden
    >
      <div className="hero-marquee-track flex w-max items-center gap-4 px-2 sm:px-4">
        {loop.map((image, index) => (
          <MarqueeTile key={`${image.id}-${index}`} image={image} limits={limits} />
        ))}
      </div>
    </div>
  );
}
