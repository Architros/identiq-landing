"use client";

import { motion } from "framer-motion";
import { LANDING_COPY } from "@landing/content/landing-copy";
import { APP_LINKS } from "@landing/lib/app-url";
import { PillButton } from "@landing/components/landing/pill-button";

export function CtaBand() {
  const { ctaBand } = LANDING_COPY;

  return (
    <section className="bg-foreground py-20 text-white sm:py-24">
      <div className="mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45 }}
        >
          <h2 className="font-display text-3xl tracking-tight sm:text-4xl">
            {ctaBand.title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-white/75">
            {ctaBand.description}
          </p>
          <div className="mt-8 flex justify-center">
            <PillButton href={APP_LINKS.startBrand()} variant="hero">
              {ctaBand.cta}
            </PillButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
