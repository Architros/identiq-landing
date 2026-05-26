"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@landing/lib/utils";

const SPRING_CONFIG = { stiffness: 300, damping: 30, mass: 0.5 };
const OPACITY_DURATION_BASE = 0.8;
const OPACITY_DURATION_VARIATION = 0.2;
const OPACITY_EASE = [0.4, 0, 0.2, 1] as const;
const OPACITY_DELAY_CYCLE = 1.5;
const OPACITY_DELAY_STEP = 0.02;
const MIN_OPACITY_MULTIPLIER = 0.5;
const MAX_OPACITY_MULTIPLIER = 1.5;
const MIN_OPACITY_FALLBACK = 0.3;
const PROXIMITY_MULTIPLIER = 1.2;
const PROXIMITY_OPACITY_BOOST = 0.8;

type Dot = {
  id: string;
  baseX: number;
  baseY: number;
  opacity: number;
};

type DotConfig = {
  dotSize: number;
  dotSpacing: number;
  repulsionRadius: number;
  repulsionStrength: number;
};

type DotComponentProps = {
  dot: Dot;
  index: number;
  dotSize: number;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  repulsionRadius: number;
  repulsionStrength: number;
};

function calculateDistance(x1: number, y1: number, x2: number, y2: number): number {
  const dx = x1 - x2;
  const dy = y1 - y2;
  return Math.sqrt(dx * dx + dy * dy);
}

function generateDots(width: number, height: number, spacing: number): Dot[] {
  const dots: Dot[] = [];
  const cols = Math.ceil(width / spacing);
  const rows = Math.ceil(height / spacing);
  const centerX = width / 2;
  const centerY = height / 2;
  const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY);

  for (let row = 0; row <= rows; row++) {
    for (let col = 0; col <= cols; col++) {
      const baseX = col * spacing;
      const baseY = row * spacing;
      const dx = baseX - centerX;
      const dy = baseY - centerY;
      const distanceFromCenter = Math.sqrt(dx * dx + dy * dy);
      const edgeFactor = Math.min(distanceFromCenter / (maxDistance * 0.7), 1);

      if (((row * 7 + col * 13) % 10) / 10 > edgeFactor) continue;

      const pattern = (row + col) % 3;
      const baseOpacities = [0.25, 0.4, 0.55];
      const opacity = baseOpacities[pattern]! * edgeFactor;

      dots.push({
        id: `dot-${row}-${col}`,
        baseX,
        baseY,
        opacity,
      });
    }
  }

  return dots;
}

function DotComponent({
  dot,
  index,
  dotSize,
  mouseX,
  mouseY,
  repulsionRadius,
  repulsionStrength,
}: DotComponentProps) {
  const posX = useTransform([mouseX, mouseY], () => {
    const mx = mouseX.get();
    const my = mouseY.get();
    if (!Number.isFinite(mx) || !Number.isFinite(my)) return 0;

    const dx = dot.baseX - mx;
    const dy = dot.baseY - my;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < repulsionRadius) {
      const force = (1 - distance / repulsionRadius) * repulsionStrength;
      return Math.cos(Math.atan2(dy, dx)) * force;
    }
    return 0;
  });

  const posY = useTransform([mouseX, mouseY], () => {
    const mx = mouseX.get();
    const my = mouseY.get();
    if (!Number.isFinite(mx) || !Number.isFinite(my)) return 0;

    const dx = dot.baseX - mx;
    const dy = dot.baseY - my;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < repulsionRadius) {
      const force = (1 - distance / repulsionRadius) * repulsionStrength;
      return Math.sin(Math.atan2(dy, dx)) * force;
    }
    return 0;
  });

  const opacityBoost = useTransform([mouseX, mouseY], () => {
    const mx = mouseX.get();
    const my = mouseY.get();
    if (!Number.isFinite(mx) || !Number.isFinite(my)) return 0;

    const distance = calculateDistance(dot.baseX, dot.baseY, mx, my);
    const maxDistance = repulsionRadius * PROXIMITY_MULTIPLIER;

    if (distance < maxDistance) {
      return (1 - distance / maxDistance) * PROXIMITY_OPACITY_BOOST;
    }
    return 0;
  });

  const x = useSpring(posX, SPRING_CONFIG);
  const y = useSpring(posY, SPRING_CONFIG);

  const baseMinOpacity = Math.max(
    dot.opacity * MIN_OPACITY_MULTIPLIER,
    MIN_OPACITY_FALLBACK,
  );
  const baseMaxOpacity = Math.min(dot.opacity * MAX_OPACITY_MULTIPLIER, 1);

  const animatedOpacity = useSpring(
    useTransform(opacityBoost, (boost) =>
      Math.min(baseMinOpacity + boost, 1),
    ),
    { stiffness: 150, damping: 25 },
  );

  const delay = (index * OPACITY_DELAY_STEP) % OPACITY_DELAY_CYCLE;

  return (
    <motion.div
      animate={{
        opacity: [baseMinOpacity, baseMaxOpacity, baseMinOpacity],
      }}
      className="absolute rounded-full bg-foreground/20 will-change-transform"
      initial={{ opacity: baseMinOpacity }}
      style={{
        width: dotSize,
        height: dotSize,
        left: dot.baseX,
        top: dot.baseY,
        x,
        y,
        opacity: animatedOpacity,
      }}
      transition={{
        opacity: {
          duration:
            OPACITY_DURATION_BASE + (index % 4) * OPACITY_DURATION_VARIATION,
          repeat: Number.POSITIVE_INFINITY,
          ease: OPACITY_EASE,
          delay,
          times: [0, 0.5, 1],
        },
      }}
    />
  );
}

function DotsLayer({
  config,
  mouseX,
  mouseY,
}: {
  config: DotConfig;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
}) {
  const layerRef = useRef<HTMLDivElement>(null);
  const [dots, setDots] = useState<Dot[]>([]);

  useEffect(() => {
    const updateDots = () => {
      if (!layerRef.current) return;
      const rect = layerRef.current.getBoundingClientRect();
      setDots(generateDots(rect.width, rect.height, config.dotSpacing));
    };

    updateDots();
    const resizeObserver = new ResizeObserver(updateDots);
    if (layerRef.current) resizeObserver.observe(layerRef.current);
    return () => resizeObserver.disconnect();
  }, [config.dotSpacing]);

  return (
    <div ref={layerRef} className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background/90" />
      {dots.map((dot, index) => (
        <DotComponent
          key={dot.id}
          dot={dot}
          dotSize={config.dotSize}
          index={index}
          mouseX={mouseX}
          mouseY={mouseY}
          repulsionRadius={config.repulsionRadius}
          repulsionStrength={config.repulsionStrength}
        />
      ))}
    </div>
  );
}

export type MouseEffectTextureProps = {
  children: ReactNode;
  id?: string;
  className?: string;
  dotSize?: number;
  dotSpacing?: number;
  repulsionRadius?: number;
  repulsionStrength?: number;
};

/** Section wrapper with interactive dot texture behind content. */
export function MouseEffectTexture({
  children,
  id,
  className,
  dotSize = 2,
  dotSpacing = 18,
  repulsionRadius = 90,
  repulsionStrength = 22,
}: MouseEffectTextureProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(Number.POSITIVE_INFINITY);
  const mouseY = useMotionValue(Number.POSITIVE_INFINITY);

  const config: DotConfig = {
    dotSize,
    dotSpacing,
    repulsionRadius,
    repulsionStrength,
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    mouseX.set(Number.POSITIVE_INFINITY);
    mouseY.set(Number.POSITIVE_INFINITY);
  };

  return (
    <div
      id={id}
      ref={containerRef}
      className={cn("relative overflow-hidden", className)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      <DotsLayer config={config} mouseX={mouseX} mouseY={mouseY} />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
