import { BrandRegisterForm } from "@landing/components/landing/brand-register-form";
import { LANDING_COPY } from "@landing/content/landing-copy";

const HERO_BG = "/hero/hiker-misty-mountains.webp";

/**
 * Server-rendered hero copy so headline/CTA are visible on first paint
 * (no framer-motion opacity:0 that can stick before hydration).
 */
export function HeroSection() {
  const { hero } = LANDING_COPY;

  return (
    <section
      id="hero"
      className="relative flex min-h-svh flex-col overflow-x-hidden"
    >
      <div className="absolute inset-0 overflow-hidden" aria-hidden>
        <div
          className="hero-bg-ken-burns absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${HERO_BG})` }}
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/55 via-black/25 to-black/50" />
      </div>

      <div className="relative z-10 flex flex-1 flex-col justify-center px-4 pt-24 sm:px-6 lg:px-8">
        <div className="hero-copy mx-auto flex w-full max-w-4xl flex-col items-center text-center sm:pt-4">
          <h1 className="font-display text-5xl leading-[1.08] tracking-tight text-white sm:text-6xl lg:text-7xl">
            {hero.headline.before}
            {hero.headline.highlight ? (
              <span className="text-accent">{hero.headline.highlight}</span>
            ) : null}
            {hero.headline.after}
          </h1>
          <p className="mt-6 max-w-xl text-lg font-light leading-relaxed text-white/90 sm:mt-7 sm:text-xl lg:text-2xl">
            {hero.subheadline}
          </p>
          <div className="mt-8 flex w-full justify-center sm:mt-10">
            <BrandRegisterForm
              placeholder={hero.registerPlaceholder}
              submitLabel={hero.registerCta}
              variant="hero"
            />
          </div>
        </div>
      </div>

    </section>
  );
}
