"use client";

import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import { CdnImage } from "@landing/components/landing/cdn-image";
import {
  HERO_MARQUEE_IMAGES,
  type LandingTemplateImage,
} from "@landing/content/landing-media";
import { cn } from "@landing/lib/utils";

const ROW_A_LOOP_SECONDS = 42;
const ROW_B_LOOP_SECONDS = 48;

/** Stable SSR/hydration default — matches ~md showcase stage height. */
const SSR_SHELL_HEIGHT_PX = 640;

type TileLimits = {
  maxHeight: number;
  maxWidth: number;
};

/** Size tiles from available marquee shell height so both rows stay tall and visible. */
function getTileLimitsFromShellHeight(shellHeight: number): TileLimits {
  const gap = 16;
  const rowHeight = Math.floor((shellHeight - gap) / 2);
  const maxHeight = Math.max(176, Math.min(rowHeight, 360));
  const maxWidth = Math.round(maxHeight * 1.55);
  return { maxHeight, maxWidth };
}

const SSR_TILE_LIMITS = getTileLimitsFromShellHeight(SSR_SHELL_HEIGHT_PX);

function wrapOffset(offset: number, halfWidth: number) {
  if (halfWidth <= 0) return offset;
  let next = offset;
  while (next < -halfWidth) next += halfWidth;
  while (next > 0) next -= halfWidth;
  return next;
}

export function fitMarqueeTile(
  image: LandingTemplateImage,
  limits: TileLimits,
): { width: number; height: number } {
  const height = limits.maxHeight;
  const width = Math.min(
    Math.round(height * (image.width / image.height)),
    limits.maxWidth,
  );
  return { width, height };
}

function useMarqueeTileLimits(shellRef: RefObject<HTMLDivElement | null>) {
  const [limits, setLimits] = useState<TileLimits>(SSR_TILE_LIMITS);

  useEffect(() => {
    const shell = shellRef.current;
    if (!shell) return;

    const update = () => {
      setLimits(getTileLimitsFromShellHeight(shell.clientHeight));
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(shell);
    return () => ro.disconnect();
  }, [shellRef]);

  return limits;
}

function usePrefersReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return reducedMotion;
}

function splitIntoRows(images: LandingTemplateImage[]) {
  const rowA: LandingTemplateImage[] = [];
  const rowB: LandingTemplateImage[] = [];

  images.forEach((image, index) => {
    if (index % 2 === 0) {
      rowA.push(image);
    } else {
      rowB.push(image);
    }
  });

  if (rowB.length === 0) rowB.push(...rowA);
  return { rowA, rowB };
}

function MarqueeTile({
  image,
  limits,
  priority = false,
}: {
  image: LandingTemplateImage;
  limits: TileLimits;
  priority?: boolean;
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
        width={image.width}
        height={image.height}
        priority={priority}
        className="pointer-events-none block h-full w-full object-cover select-none"
        draggable={false}
      />
    </div>
  );
}

function MarqueeRow({
  images,
  limits,
  reducedMotion,
  loopSeconds,
  direction = "left",
}: {
  images: LandingTemplateImage[];
  limits: TileLimits;
  reducedMotion: boolean;
  loopSeconds: number;
  direction?: "left" | "right";
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const halfWidthRef = useRef(0);
  const loop = [...images, ...images];

  const applyTransform = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    track.style.transform = `translateX(${offsetRef.current}px)`;
  }, []);

  const measureHalfWidth = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    halfWidthRef.current = track.scrollWidth / 2;
    offsetRef.current = wrapOffset(offsetRef.current, halfWidthRef.current);
    applyTransform();
  }, [applyTransform]);

  useEffect(() => {
    const ro = new ResizeObserver(measureHalfWidth);
    if (trackRef.current) ro.observe(trackRef.current);
    measureHalfWidth();
    return () => ro.disconnect();
  }, [measureHalfWidth, limits]);

  useEffect(() => {
    if (reducedMotion) return;

    let raf = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;

      const half = halfWidthRef.current;
      if (half > 0) {
        const speed = half / loopSeconds;
        const signedSpeed = direction === "left" ? -speed : speed;
        offsetRef.current = wrapOffset(offsetRef.current + signedSpeed * dt, half);
        applyTransform();
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reducedMotion, limits, applyTransform]);

  return (
    <div
      className={cn(
        "relative h-full w-full overflow-hidden",
        reducedMotion && "hero-marquee-row--static",
      )}
    >
      <div
        ref={trackRef}
        className={cn(
          "hero-marquee-track hero-marquee-row-track flex w-max items-start gap-3 sm:gap-4",
          reducedMotion && "hero-marquee-row-track--static",
        )}
      >
        {loop.map((image, index) => {
          const isBaseCycle = index < images.length;
          return (
          <MarqueeTile
            key={`${image.id}-${index}`}
            image={image}
            limits={limits}
            priority={isBaseCycle && index < 2}
          />
          );
        })}
      </div>
    </div>
  );
}

export function HeroImageMarquee({ className }: { className?: string }) {
  const shellRef = useRef<HTMLDivElement>(null);
  const limits = useMarqueeTileLimits(shellRef);
  const reducedMotion = usePrefersReducedMotion();
  const { rowA, rowB } = splitIntoRows(HERO_MARQUEE_IMAGES);

  return (
    <div
      ref={shellRef}
      className={cn(
        "hero-marquee-shell relative flex h-full w-full select-none flex-col items-stretch justify-start gap-4 pt-0 sm:gap-5",
        className,
      )}
      aria-hidden
    >
      <div
        className="hero-marquee-row shrink-0"
        style={{ height: limits.maxHeight }}
      >
        <MarqueeRow
          images={rowA}
          limits={limits}
          reducedMotion={reducedMotion}
          loopSeconds={ROW_A_LOOP_SECONDS}
          direction="left"
        />
      </div>
      <div
        className="hero-marquee-row hero-marquee-row--offset shrink-0"
        style={{ height: limits.maxHeight }}
      >
        <MarqueeRow
          images={rowB}
          limits={limits}
          reducedMotion={reducedMotion}
          loopSeconds={ROW_B_LOOP_SECONDS}
          direction="right"
        />
      </div>
    </div>
  );
}
