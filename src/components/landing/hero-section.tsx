"use client";

import Link from "next/link";
import { HeroShowcaseStage } from "@landing/components/landing/hero-showcase-stage";
import { motion } from "framer-motion";
import { LANDING_COPY } from "@landing/content/landing-copy";
import { APP_LINKS } from "@landing/lib/app-url";
import { PillButton } from "@landing/components/landing/pill-button";

const HERO_BG = "/hero/hiker-misty-mountains.webp";

export function HeroSection() {
  const { hero, announcement } = LANDING_COPY;

  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-x-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="hero-bg-ken-burns absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${HERO_BG})` }}
          role="img"
          aria-label="Hiker walking toward misty mountains at golden hour"
        />
      </div>

      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-black/50"
        aria-hidden
      />

      <div className="relative z-10 flex flex-1 flex-col justify-center px-4 pt-24 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto flex w-full max-w-2xl flex-col items-center text-center"
        >
          <Link
            href="#how-it-works"
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-white backdrop-blur-md transition-colors hover:bg-white/15"
          >
            <span>{announcement}</span>
            <span aria-hidden>→</span>
          </Link>

          <h1 className="font-display text-4xl leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-[3.25rem]">
            {hero.headline.before}
            <span className="text-accent">{hero.headline.highlight}</span>
            {hero.headline.after}
          </h1>
          <p className="mt-5 max-w-lg text-base font-light leading-relaxed text-white/90 sm:text-lg">
            {hero.subheadline}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <PillButton href={APP_LINKS.startBrand()} variant="hero">
              {hero.cta}
            </PillButton>
          </div>
        </motion.div>
      </div>

      <motion.aside
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.15 }}
        className="relative z-10 mt-10 w-full shrink-0 pb-28"
      >
        <HeroShowcaseStage />
      </motion.aside>
    </section>
  );
}
