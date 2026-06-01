import { LandingStaticBillingPlans } from "@landing/components/landing/landing-static-billing-plans";
import { LANDING_COPY } from "@landing/content/landing-copy";

export function PricingSection() {
  const { pricing } = LANDING_COPY;

  return (
    <section
      id="pricing"
      className="scroll-mt-20 border-b border-border bg-sidebar-active/40 py-12 sm:py-16"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 text-center">
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

        <LandingStaticBillingPlans />
      </div>
    </section>
  );
}
