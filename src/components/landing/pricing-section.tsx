"use client";

import { LANDING_COPY } from "@landing/content/landing-copy";
import { APP_LINKS } from "@landing/lib/app-url";
import { PillButton } from "@landing/components/landing/pill-button";

type LandingPlan = {
  name: string;
  price: string;
  billed: string;
  tagline: string;
  features: string[];
  featured?: boolean;
};

const PLANS: LandingPlan[] = [
  {
    name: "Starter",
    price: "$7/mo",
    billed: "Billed monthly",
    tagline: "Get started.",
    features: ["120 tokens / month", "40+ images / period", "200 stored assets"],
  },
  {
    name: "Pro",
    price: "$29/mo",
    billed: "Billed monthly",
    tagline: "Ship daily.",
    featured: true,
    features: ["550 tokens / month", "183+ images / period", "500 stored assets"],
  },
  {
    name: "Studio",
    price: "$49/mo",
    billed: "Billed monthly",
    tagline: "Run at volume.",
    features: ["1,100 tokens / month", "366+ images / period", "1,200 stored assets"],
  },
] as const;

export function PricingSection() {
  const { pricing } = LANDING_COPY;

  return (
    <section
      id="pricing"
      className="scroll-mt-20 border-b border-border bg-sidebar-active/40 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-accent">
            {pricing.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-3xl tracking-tight text-foreground sm:text-4xl">
            {pricing.title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted">
            {pricing.description}
          </p>
        </div>

        <section className="overflow-visible rounded-2xl border border-border bg-surface p-6 sm:p-8">
          <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {PLANS.map((plan) => (
              <article
                key={plan.name}
                className={`rounded-2xl border p-5 ${
                  plan.featured
                    ? "border-accent/40 shadow-md ring-1 ring-accent/25"
                    : "border-border bg-background/50"
                }`}
              >
                <h3 className="text-sm font-semibold text-foreground">{plan.name}</h3>
                <p className="mt-2 font-display text-3xl text-foreground">{plan.price}</p>
                <p className="mt-1 text-xs text-muted">{plan.billed}</p>
                <p className="mt-3 text-sm text-muted">{plan.tagline}</p>
                <ul className="mt-4 space-y-2 text-sm text-foreground">
                  {plan.features.map((feature) => (
                    <li key={feature}>• {feature}</li>
                  ))}
                </ul>
                <div className="mt-5">
                  <PillButton
                    href={APP_LINKS.startBrand()}
                    variant="accent"
                    shellClassName="w-full"
                    className="w-full"
                  >
                    Buy tokens
                  </PillButton>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
