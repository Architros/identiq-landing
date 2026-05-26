"use client";

import { motion } from "framer-motion";
import { APP_LINKS } from "@landing/lib/app-url";
import { PillButton } from "@landing/components/landing/pill-button";

const STEPS = [
  {
    step: "01",
    title: "Describe your brand",
    description:
      "Name, domain, feeling, colors, and fonts — start with essentials and refine after generation.",
  },
  {
    step: "02",
    title: "Generate your kit",
    description:
      "AI produces logos, palettes, typography, and a starter pack of on-brand assets.",
  },
  {
    step: "03",
    title: "Ship campaigns",
    description:
      "Remix library templates, use studio presets, and export assets ready for social and ads.",
  },
] as const;

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="scroll-mt-20 border-b border-border bg-sidebar-active/40 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45 }}
          className="mb-14 text-center"
        >
          <p className="text-sm font-medium uppercase tracking-wider text-accent">
            How it works
          </p>
          <h2 className="mt-3 font-display text-3xl tracking-tight text-foreground sm:text-4xl">
            Three steps to a launch-ready brand
          </h2>
        </motion.div>

        <ol className="grid gap-8 md:grid-cols-3">
          {STEPS.map((item, i) => (
            <motion.li
              key={item.step}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="rounded-[var(--radius-card)] border border-border bg-surface p-6"
            >
              <span className="font-display text-2xl text-accent">{item.step}</span>
              <h3 className="mt-4 text-lg font-medium text-foreground">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
            </motion.li>
          ))}
        </ol>

        <div className="mt-12 flex justify-center">
          <PillButton href={APP_LINKS.startBrand()} variant="accent">
            Start your brand
          </PillButton>
        </div>
      </div>
    </section>
  );
}
