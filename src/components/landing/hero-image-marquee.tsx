"use client";

import { CdnImage } from "@/components/landing/cdn-image";
import {
  LANDING_TEMPLATE_IMAGES,
  type LandingTemplateImage,
} from "@/content/landing-media";
import { cn } from "@/lib/utils";

const MARQUEE_IMAGES = LANDING_TEMPLATE_IMAGES.slice(0, 10);

function MarqueeTile({ image }: { image: LandingTemplateImage }) {
  return (
    <div
      className={cn(
        "hero-marquee-tile relative h-[15rem] w-auto shrink-0 overflow-hidden rounded-xl ring-1 ring-white/20",
        "sm:h-[17rem] md:h-[19rem]",
      )}
      style={{ aspectRatio: `${image.width} / ${image.height}` }}
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
  const loop = [...MARQUEE_IMAGES, ...MARQUEE_IMAGES];

  return (
    <div
      className={cn(
        "relative flex h-full w-full items-center overflow-hidden bg-transparent",
        className,
      )}
      aria-hidden
    >
      <div className="hero-marquee-track flex w-max items-stretch gap-4 px-2 sm:px-4">
        {loop.map((image, index) => (
          <MarqueeTile key={`${image.id}-${index}`} image={image} />
        ))}
      </div>
    </div>
  );
}
