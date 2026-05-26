"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LANDING_COPY } from "@landing/content/landing-copy";
import { APP_LINKS } from "@landing/lib/app-url";
import { cn } from "@landing/lib/utils";
import { PillButton } from "@landing/components/landing/pill-button";

/** Crossfade zone ends when hero bottom clears the viewport (next section under nav). */
const BLEND_ZONE_PX = 56;

function computeNavBlend(scrollY: number, heroHeight: number): number {
  const start = Math.max(0, heroHeight - BLEND_ZONE_PX);
  const end = heroHeight;
  if (scrollY <= start) return 0;
  if (scrollY >= end) return 1;
  return (scrollY - start) / (end - start);
}

export function LandingNav() {
  const [navBlend, setNavBlend] = useState(0);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      setNavBlend(computeNavBlend(window.scrollY, hero.offsetHeight));
    };

    const onScroll = () => {
      if (frame !== 0) return;
      frame = window.requestAnimationFrame(update);
    };

    const resizeObserver = new ResizeObserver(update);
    resizeObserver.observe(hero);

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
      resizeObserver.disconnect();
      if (frame !== 0) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <header
      className={cn(
        "landing-nav fixed inset-x-0 top-0 z-50 border-b backdrop-blur-xl",
        "transition-[background-color,border-color,box-shadow] duration-500 ease-out",
        navBlend < 0.02 && "border-transparent shadow-none",
      )}
      style={{ "--nav-blend": navBlend } as React.CSSProperties}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="nav-brand flex items-center gap-3 transition-colors duration-500 ease-out hover:opacity-90"
        >
          <Image
            src="/brand/logo-identiq.svg"
            alt=""
            width={40}
            height={29}
            className="h-9 w-auto"
            priority
          />
          <span className="font-display text-xl tracking-tight">identiq</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {LANDING_COPY.nav.links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="nav-link text-sm transition-colors duration-500 ease-out"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href={APP_LINKS.login()}
            className="nav-signin hidden px-3 py-2 text-sm transition-colors duration-500 ease-out sm:inline-block"
          >
            Sign in
          </Link>
          <PillButton
            href={APP_LINKS.startBrand()}
            variant="accent"
            className="px-4 py-2 sm:px-5"
          >
            {LANDING_COPY.nav.cta}
          </PillButton>
        </div>
      </nav>
    </header>
  );
}
