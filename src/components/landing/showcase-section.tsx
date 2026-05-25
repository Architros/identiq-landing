"use client";

import { motion } from "framer-motion";
import { CdnImage } from "@/components/landing/cdn-image";
import { LANDING_COPY } from "@/content/landing-copy";
import {
  getShowcaseImages,
  SHOWCASE_COLLAGE_LAYOUT,
} from "@/content/landing-media";
import { cn } from "@/lib/utils";

export function ShowcaseSection() {
  const { showcase } = LANDING_COPY;
  const images = getShowcaseImages(8);

  return (
    <section
      id="showcase"
      className="scroll-mt-20 border-b border-border bg-surface py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45 }}
          className="mb-12 max-w-2xl"
        >
          <p className="text-sm font-medium uppercase tracking-wider text-accent">
            {showcase.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-3xl leading-tight tracking-tight text-foreground sm:text-4xl">
            {showcase.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted">
            {showcase.description}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid h-[min(70vw,420px)] auto-rows-fr grid-cols-4 grid-rows-4 gap-2.5 sm:gap-3"
        >
          {images.map((template, index) => (
            <div
              key={template.id}
              className={cn(
                "relative min-h-[4rem] overflow-hidden rounded-xl bg-muted/20 ring-1 ring-border/50",
                SHOWCASE_COLLAGE_LAYOUT[index] ?? "",
              )}
            >
              <CdnImage
                src={template.imageUrl}
                alt=""
                fill
                className="object-cover"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
