"use client";

import { motion } from "framer-motion";
import { IntegrationsBeamDemo } from "@landing/components/landing/integrations-beam-demo";
import { PillButton } from "@landing/components/landing/pill-button";
import { LANDING_COPY } from "@landing/content/landing-copy";
import { APP_LINKS } from "@landing/lib/app-url";

export function IntegrationsSection() {
  const { integrations } = LANDING_COPY;

  return (
    <section
      id="channels"
      className="scroll-mt-20 border-b border-border bg-background py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45 }}
          className="mb-12 text-center"
        >
          <p className="text-sm font-medium uppercase tracking-wider text-accent">
            {integrations.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-3xl tracking-tight text-foreground sm:text-4xl">
            {integrations.title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted">
            {integrations.description}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="group rounded-[var(--radius-card)] bg-surface p-4 shadow-sm ring-1 ring-border sm:p-6 lg:p-8"
        >
          <div className="max-w-full overflow-x-auto overscroll-x-contain [-ms-overflow-style:none] [scrollbar-width:thin] [&::-webkit-scrollbar]:h-1.5">
            <IntegrationsBeamDemo />
          </div>

          <div className="mt-6 flex flex-col items-start justify-between gap-4 border-t border-border pt-6 sm:flex-row sm:items-center">
            <div>
              <h3 className="text-lg font-medium text-foreground">
                {integrations.cardTitle}
              </h3>
              <p className="mt-1 max-w-xl text-sm leading-relaxed text-muted">
                {integrations.cardDescription}
              </p>
            </div>
            <PillButton
              href={APP_LINKS.startBrand()}
              variant="accent"
              shellClassName="shrink-0"
            >
              {integrations.cta}
            </PillButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
