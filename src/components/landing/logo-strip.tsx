"use client";

import { motion } from "framer-motion";
import { LANDING_COPY } from "@landing/content/landing-copy";

export function LogoStrip() {
  const { logoStrip } = LANDING_COPY;

  return (
    <section className="border-y border-white/10 bg-black/80 py-8 text-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4 }}
          className="mb-6 text-center text-xs font-medium uppercase tracking-[0.2em] text-white/50"
        >
          {logoStrip.label}
        </motion.p>
        <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {logoStrip.items.map((item, i) => (
            <motion.li
              key={item}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
              className="font-display text-lg tracking-tight text-white/70 sm:text-xl"
            >
              {item}
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
