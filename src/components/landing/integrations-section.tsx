"use client";

import { IntegrationsBeamDemo } from "@landing/components/landing/integrations-beam-demo";
import { LANDING_COPY } from "@landing/content/landing-copy";

export function IntegrationsSection() {
  const { integrations } = LANDING_COPY;

  return (
    <section
      id="channels"
      className="scroll-mt-20 border-b border-border bg-background pt-12 pb-4 sm:pt-16 sm:pb-6"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-accent">
            {integrations.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-3xl tracking-tight text-foreground sm:text-4xl">
            {integrations.title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted">
            {integrations.description}
          </p>
        </div>

        <div className="max-w-full overflow-x-auto overscroll-x-contain [-ms-overflow-style:none] [scrollbar-width:thin] [&::-webkit-scrollbar]:h-1.5">
          <IntegrationsBeamDemo />
        </div>
      </div>
    </section>
  );
}
