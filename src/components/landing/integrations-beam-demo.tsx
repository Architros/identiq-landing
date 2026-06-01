"use client";

import Image from "next/image";
import { forwardRef, useRef } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ColorsIcon,
  Image01Icon,
  LayoutGridIcon,
  Megaphone01Icon,
  Share08Icon,
  TextIcon,
  Tick01Icon,
} from "@hugeicons/core-free-icons";
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

const BRAND_SWATCHES = ["#f86e29", "#1c1917", "#ffb07a", "#fafaf9"] as const;

const BRAND_INCLUDES = [
  { icon: ColorsIcon, label: "Color palette" },
  { icon: TextIcon, label: "Typography" },
  { icon: Megaphone01Icon, label: "Brand voice" },
  { icon: LayoutGridIcon, label: "Templates" },
  { icon: Image01Icon, label: "Logo assets" },
  { icon: Share08Icon, label: "Ad & social sizes" },
] as const;

const PlatformNode = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => (
  <div
    ref={ref}
    className={cn(
      "z-10 flex size-12 items-center justify-center rounded-full border-2 border-border bg-surface p-2.5 shadow-sm",
      className,
    )}
  >
    {children}
  </div>
));
PlatformNode.displayName = "PlatformNode";

const IdentiqHub = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative z-10 size-[4.5rem] sm:size-[4.75rem]",
      className,
    )}
  >
    <span
      className="absolute inset-0 translate-x-[6px] translate-y-[3px] rounded-md bg-[#d45a1f]"
      aria-hidden
    />
    <span
      className="absolute inset-0 translate-x-[3px] translate-y-[6px] rounded-md bg-[#b84818]"
      aria-hidden
    />
    <div className="relative flex size-full items-center justify-center rounded-md border border-black/10 bg-accent p-2.5 shadow-[0_1px_0_rgba(255,255,255,0.25)_inset,0_6px_16px_rgba(248,110,41,0.45)]">
      {children}
    </div>
  </div>
));
IdentiqHub.displayName = "IdentiqHub";

export function IntegrationsBeamDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const brandOutRef = useRef<HTMLDivElement>(null);
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
      ref={containerRef}
      className="relative flex min-h-[34rem] w-full min-w-[42rem] items-center justify-center overflow-visible px-2 pt-6 pb-2 sm:min-w-[46rem] sm:px-6 sm:pt-8 sm:pb-2"
    >
      <div className="flex w-full max-w-4xl items-center justify-between gap-3 sm:gap-5">
        <div
          ref={brandRef}
          className="z-10 w-[11.5rem] shrink-0 sm:w-[13rem]"
        >
          <div className="relative rounded-[var(--radius-card)] border border-border p-3.5 ring-1 ring-border/80 sm:p-4">
            <div
              ref={brandOutRef}
              className="pointer-events-none absolute right-0 top-1/2 h-0.5 w-0.5 -translate-y-1/2"
              aria-hidden
            />
            <div className="flex items-center gap-2.5 border-b border-border pb-3">
              <Image
                src="/brand/logo-identiq.svg"
                alt=""
                width={36}
                height={36}
                className="h-9 w-9 shrink-0"
              />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-foreground">
                  Northline
                </p>
                <p className="text-[10px] font-medium uppercase tracking-wide text-muted">
                  Your brand kit
                </p>
              </div>
            </div>

            <ul
              className="mt-3 space-y-1.5"
              aria-label="Included in your brand kit"
            >
              {BRAND_INCLUDES.map(({ icon, label }) => (
                <li
                  key={label}
                  className="flex items-center gap-2 rounded-lg bg-surface px-2 py-1.5 text-xs text-foreground ring-1 ring-border/60"
                >
                  <HugeiconsIcon
                    icon={icon}
                    size={14}
                    color="currentColor"
                    strokeWidth={2}
                    className="shrink-0 text-accent"
                  />
                  <span className="leading-tight">{label}</span>
                  <HugeiconsIcon
                    icon={Tick01Icon}
                    size={12}
                    color="currentColor"
                    strokeWidth={2}
                    className="ml-auto shrink-0 text-accent"
                  />
                </li>
              ))}
            </ul>

            <div className="mt-3 border-t border-border pt-3">
              <p className="text-[10px] font-medium uppercase tracking-wide text-muted">
                Palette
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {BRAND_SWATCHES.map((color) => (
                  <span
                    key={color}
                    className="h-6 w-6 rounded-full ring-1 ring-border"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </div>

            <div className="mt-3 border-t border-border pt-3">
              <p className="text-[10px] font-medium uppercase tracking-wide text-muted">
                Type
              </p>
              <p className="mt-1 font-display text-2xl leading-none text-foreground">
                Aa
              </p>
              <p className="mt-0.5 text-[10px] text-muted">
                Display · Geist Sans
              </p>
            </div>
          </div>
        </div>

        <div className="flex shrink-0 flex-col items-center justify-center gap-2 px-1">
          <IdentiqHub ref={identiqRef}>
            <Image
              src="/brand/logo-identiq.svg"
              alt="Identiq"
              width={40}
              height={40}
              className="h-9 w-9 brightness-0 invert"
            />
          </IdentiqHub>
          <span className="font-display text-sm font-medium text-foreground">
            identiq
          </span>
        </div>

        <div className="grid shrink-0 grid-cols-2 gap-2 sm:gap-2.5">
          {PLATFORMS.map((platform, i) => (
            <PlatformNode
              key={platform.slug}
              ref={platformRefs[i]}
              className="size-10 bg-white p-2 sm:size-11"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/integrations/${platform.slug}.svg`}
                alt={platform.label}
                className="h-full w-full object-contain"
              />
            </PlatformNode>
          ))}
        </div>
      </div>

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={brandOutRef}
        toRef={identiqRef}
        duration={3.5}
        curvature={0}
        pathColor="#d6d3d1"
        pathOpacity={0.45}
        pathWidth={2.5}
        startXOffset={0}
        endXOffset={0}
      />
      {PLATFORMS.map((platform, i) => (
        <AnimatedBeam
          key={platform.slug}
          containerRef={containerRef}
          fromRef={identiqRef}
          toRef={platformRefs[i]}
          duration={3}
          curvature={20 + (i % 3) * 12}
          pathColor="#d6d3d1"
          pathOpacity={0.4}
          pathWidth={2}
          startXOffset={8}
        />
      ))}
    </div>
  );
}
