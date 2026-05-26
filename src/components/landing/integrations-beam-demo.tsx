"use client";

import Image from "next/image";
import { forwardRef, useRef } from "react";
import { AnimatedBeam } from "@landing/components/ui/animated-beam";
import { cn } from "@landing/lib/utils";

const PLATFORMS = [
  { slug: "instagram", label: "Instagram" },
  { slug: "linkedin", label: "LinkedIn" },
  { slug: "x", label: "X" },
  { slug: "facebook", label: "Facebook" },
  { slug: "tiktok", label: "TikTok" },
  { slug: "youtube", label: "YouTube" },
  { slug: "pinterest", label: "Pinterest" },
  { slug: "threads", label: "Threads" },
] as const;

const BRAND_SWATCHES = ["#f86e29", "#1c1917", "#ffb07a"] as const;

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => (
  <div
    ref={ref}
    className={cn(
      "z-10 flex size-12 items-center justify-center rounded-full border-2 border-border bg-surface p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
      className,
    )}
  >
    {children}
  </div>
));
Circle.displayName = "Circle";

export function IntegrationsBeamDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const identiqRef = useRef<HTMLDivElement>(null);
  const platform1Ref = useRef<HTMLDivElement>(null);
  const platform2Ref = useRef<HTMLDivElement>(null);
  const platform3Ref = useRef<HTMLDivElement>(null);
  const platform4Ref = useRef<HTMLDivElement>(null);
  const platform5Ref = useRef<HTMLDivElement>(null);
  const platform6Ref = useRef<HTMLDivElement>(null);
  const platform7Ref = useRef<HTMLDivElement>(null);
  const platform8Ref = useRef<HTMLDivElement>(null);

  const platformRefs = [
    platform1Ref,
    platform2Ref,
    platform3Ref,
    platform4Ref,
    platform5Ref,
    platform6Ref,
    platform7Ref,
    platform8Ref,
  ];

  return (
    <div
      className={cn(
        "relative flex h-[500px] w-full items-center justify-center overflow-hidden p-6 sm:p-10",
        "[mask-image:linear-gradient(to_top,transparent_10%,#000_100%)]",
      )}
      ref={containerRef}
    >
      <div className="flex size-full min-w-[36rem] max-w-3xl flex-row items-stretch justify-between gap-8 sm:gap-10">
        <div className="flex flex-col justify-center">
          <div ref={brandRef} className="z-10 flex flex-col items-center gap-2">
            <div className="w-full max-w-[11rem] rounded-[var(--radius-card)] border border-border bg-surface p-4 shadow-sm">
              <div className="flex items-center gap-2.5">
                <Image
                  src="/brand/logo-identiq.svg"
                  alt=""
                  width={32}
                  height={32}
                  className="h-8 w-8"
                />
                <div>
                  <p className="text-sm font-medium text-foreground">Northline</p>
                  <p className="text-[10px] uppercase tracking-wide text-muted">
                    Your brand kit
                  </p>
                </div>
              </div>
              <div className="mt-3 flex gap-1.5">
                {BRAND_SWATCHES.map((color) => (
                  <span
                    key={color}
                    className="h-5 w-5 rounded-full ring-1 ring-border"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <div className="flex flex-col items-center gap-2">
            <Circle
              ref={identiqRef}
              className="size-16 border-accent/40 bg-surface ring-2 ring-accent/30"
            >
              <Image
                src="/brand/logo-identiq.svg"
                alt=""
                width={36}
                height={36}
                className="h-9 w-9"
              />
            </Circle>
            <span className="font-display text-sm text-foreground">identiq</span>
          </div>
        </div>

        <div className="flex flex-col justify-center gap-2">
          {PLATFORMS.map((platform, i) => (
            <Circle
              key={platform.slug}
              ref={platformRefs[i]}
              className="size-10 border-border/80 bg-white p-2"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/integrations/${platform.slug}.svg`}
                alt={platform.label}
                className="h-full w-full object-contain"
              />
            </Circle>
          ))}
        </div>
      </div>

      {PLATFORMS.map((platform, i) => (
        <AnimatedBeam
          key={platform.slug}
          containerRef={containerRef}
          fromRef={platformRefs[i]}
          toRef={identiqRef}
          duration={3}
          pathColor="#d6d3d1"
          pathOpacity={0.25}
        />
      ))}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={identiqRef}
        toRef={brandRef}
        duration={3}
        pathColor="#d6d3d1"
        pathOpacity={0.25}
      />
    </div>
  );
}
