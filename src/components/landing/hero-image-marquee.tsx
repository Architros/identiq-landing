"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CdnImage } from "@landing/components/landing/cdn-image";
import {
  HERO_MARQUEE_IMAGES,
  type LandingTemplateImage,
} from "@landing/content/landing-media";
import { cn } from "@landing/lib/utils";

const MARQUEE_LOOP_SECONDS = 45;

type TileLimits = {
  maxHeight: number;
  maxWidth: number;
};

function getTileLimits(viewportWidth: number): TileLimits {
  if (viewportWidth >= 768) {
    return { maxHeight: 440, maxWidth: 520 };
  }
  if (viewportWidth >= 640) {
    return { maxHeight: 380, maxWidth: 420 };
  }
  return { maxHeight: 300, maxWidth: 280 };
}

function wrapOffset(offset: number, halfWidth: number) {
  if (halfWidth <= 0) return offset;
  let next = offset;
  while (next < -halfWidth) next += halfWidth;
  while (next > 0) next -= halfWidth;
  return next;
}

/** Uniform row height; width follows aspect ratio (object-cover crops overflow). */
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

function useMarqueeTileLimits(): TileLimits {
  const [limits, setLimits] = useState<TileLimits>(() =>
    typeof window !== "undefined"
      ? getTileLimits(window.innerWidth)
      : { maxHeight: 440, maxWidth: 520 },
  );

  useEffect(() => {
    const update = () => setLimits(getTileLimits(window.innerWidth));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

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

export function HeroImageMarquee({ className }: { className?: string }) {
  const limits = useMarqueeTileLimits();
  const reducedMotion = usePrefersReducedMotion();
  const loop = [...HERO_MARQUEE_IMAGES, ...HERO_MARQUEE_IMAGES];

  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const halfWidthRef = useRef(0);
  const dragRef = useRef({ active: false, startX: 0, startOffset: 0 });
  const [isDragging, setIsDragging] = useState(false);

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
    const track = trackRef.current;
    if (!track) return;
    const ro = new ResizeObserver(() => measureHalfWidth());
    ro.observe(track);
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
      if (half > 0 && !dragRef.current.active) {
        const speed = half / MARQUEE_LOOP_SECONDS;
        offsetRef.current = wrapOffset(offsetRef.current - speed * dt, half);
        applyTransform();
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reducedMotion, limits, applyTransform]);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reducedMotion || e.button !== 0) return;
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    e.currentTarget.style.touchAction = "none";
    dragRef.current = {
      active: true,
      startX: e.clientX,
      startOffset: offsetRef.current,
    };
    setIsDragging(true);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.active) return;
    e.preventDefault();
    const half = halfWidthRef.current;
    const next =
      dragRef.current.startOffset + (e.clientX - dragRef.current.startX);
    offsetRef.current = half > 0 ? wrapOffset(next, half) : next;
    applyTransform();
  };

  const endDrag = (target: HTMLDivElement, pointerId: number) => {
    if (!dragRef.current.active) return;
    dragRef.current.active = false;
    setIsDragging(false);
    target.style.touchAction = "";
    if (target.hasPointerCapture(pointerId)) {
      target.releasePointerCapture(pointerId);
    }
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    endDrag(e.currentTarget, e.pointerId);
  };

  const onPointerCancel = (e: React.PointerEvent<HTMLDivElement>) => {
    endDrag(e.currentTarget, e.pointerId);
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative flex h-full w-full items-center overflow-hidden bg-transparent select-none",
        !reducedMotion && "cursor-grab",
        isDragging && "cursor-grabbing",
        className,
      )}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerCancel}
      aria-hidden
    >
      <div
        ref={trackRef}
        className={cn(
          "hero-marquee-track flex w-max items-center gap-4 px-2 sm:px-4",
          reducedMotion && "hero-marquee-track--static",
        )}
      >
        {loop.map((image, index) => (
          <MarqueeTile
            key={`${image.id}-${index}`}
            image={image}
            limits={limits}
            priority={index < HERO_MARQUEE_IMAGES.length}
          />
        ))}
      </div>
    </div>
  );
}
