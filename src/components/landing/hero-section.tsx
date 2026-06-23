import Link from "next/link";
import { HeroShowcaseStage } from "@landing/components/landing/hero-showcase-stage";
import { BrandRegisterForm } from "@landing/components/landing/brand-register-form";
import { LANDING_COPY } from "@landing/content/landing-copy";
import { APP_LINKS } from "@landing/lib/app-url";

const HERO_BG = "/hero/hiker-misty-mountains.webp";

/**
 * Server-rendered hero copy so headline/CTA are visible on first paint
 * (no framer-motion opacity:0 that can stick before hydration).
 */
export function HeroSection() {
  const { hero, announcement } = LANDING_COPY;

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] flex-col overflow-x-hidden"
    >
      <div className="absolute inset-0 overflow-hidden" aria-hidden>
        <div
          className="hero-bg-ken-burns absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${HERO_BG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-black/50" />
      </div>

      <div className="relative z-10 flex flex-1 flex-col justify-center px-4 pt-24 sm:px-6 lg:px-8">
        <div className="hero-copy mx-auto flex w-full max-w-3xl flex-col items-center text-center">
          <Link
            href={APP_LINKS.startBrand()}
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
          <div className="mt-8 flex w-full justify-center">
            <BrandRegisterForm
              placeholder={hero.registerPlaceholder}
              submitLabel={hero.registerCta}
              variant="hero"
            />
          </div>
        </div>
      </div>

      <aside className="relative z-10 mt-6 w-full shrink-0 pb-12 sm:pb-16">
        <HeroShowcaseStage />
      </aside>
    </section>
  );
}
