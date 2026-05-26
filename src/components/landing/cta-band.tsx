"use client";

import { LANDING_COPY } from "@landing/content/landing-copy";
import { APP_LINKS } from "@landing/lib/app-url";
import { PillButton } from "@landing/components/landing/pill-button";

const HERO_BG = "/hero/hiker-misty-mountains.webp";

export function CtaBand() {
  const { ctaBand } = LANDING_COPY;

  return (
    <section className="relative overflow-hidden py-20 sm:py-24">
      <div className="absolute inset-0" aria-hidden>
        <div
          className="hero-bg-ken-burns absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${HERO_BG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/50 to-black/65" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="glass-panel mx-auto max-w-2xl rounded-2xl px-8 py-10 text-center sm:px-10 sm:py-12">
          <h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
            {ctaBand.title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/90">
            {ctaBand.description}
          </p>
          <div className="mt-8 flex justify-center">
            <PillButton href={APP_LINKS.startBrand()} variant="accent">
              {ctaBand.cta}
            </PillButton>
          </div>
        </div>
      </div>
    </section>
  );
}
