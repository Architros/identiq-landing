"use client";

import { motion } from "framer-motion";
import { LandingStaticBillingPlans } from "@landing/components/landing/landing-static-billing-plans";
import { LANDING_COPY } from "@landing/content/landing-copy";

export function PricingSection() {
  const { pricing } = LANDING_COPY;

  return (
    <section
      id="pricing"
      className="scroll-mt-20 border-b border-border bg-sidebar-active/40 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45 }}
          className="mb-10 text-center"
        >
          <p className="text-sm font-medium uppercase tracking-wider text-accent">
            {pricing.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-3xl tracking-tight text-foreground sm:text-4xl">
            {pricing.title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted">
            {pricing.description}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          <LandingStaticBillingPlans />
        </motion.div>
      </div>
    </section>
  );
}
