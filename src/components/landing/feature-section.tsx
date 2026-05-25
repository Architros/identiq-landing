"use client";

import { motion } from "framer-motion";
import { CdnImage } from "@/components/landing/cdn-image";
import { LANDING_COPY } from "@/content/landing-copy";
import { getFeatureImages, type LandingTemplateImage } from "@/content/landing-media";
import { APP_LINKS } from "@/lib/app-url";
import { cn } from "@/lib/utils";
import { PillButton } from "@/components/landing/pill-button";

type FeatureSectionProps = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  cta: string;
  imageOffset: number;
  imageCount: number;
  reversed?: boolean;
};

function FeatureMediaGrid({ images }: { images: LandingTemplateImage[] }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {images.map((img, i) => (
        <div
          key={img.id}
          className={cn(
            "relative overflow-hidden rounded-[var(--radius-card)] bg-muted/20 ring-1 ring-border/60",
            i === 0 ? "col-span-2 aspect-[16/9]" : "aspect-square",
          )}
        >
          <CdnImage
            src={img.imageUrl}
            alt=""
            fill
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
}

export function FeatureSection({
  id,
  eyebrow,
  title,
  description,
  cta,
  imageOffset,
  imageCount,
  reversed = false,
}: FeatureSectionProps) {
  const images = getFeatureImages(imageOffset, imageCount);

  return (
    <section id={id} className="scroll-mt-20 border-b border-border bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div
          className={cn(
            "grid items-center gap-12 lg:grid-cols-2 lg:gap-16",
            reversed && "lg:[&>*:first-child]:order-2",
          )}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.45 }}
          >
            <p className="text-sm font-medium uppercase tracking-wider text-accent">
              {eyebrow}
            </p>
            <h2 className="mt-3 font-display text-3xl leading-tight tracking-tight text-foreground sm:text-4xl">
              {title}
            </h2>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-muted">
              {description}
            </p>
            <div className="mt-8">
              <PillButton href={APP_LINKS.startBrand()} variant="accent">
                {cta}
              </PillButton>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.08 }}
          >
            <FeatureMediaGrid images={images} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function FeatureSections() {
  const { features } = LANDING_COPY;

  return (
    <div id="product">
      {features.map((feature, index) => (
        <FeatureSection
          key={feature.id}
          id={feature.id}
          eyebrow={feature.eyebrow}
          title={feature.title}
          description={feature.description}
          cta={feature.cta}
          imageOffset={feature.imageOffset}
          imageCount={feature.imageCount}
          reversed={index % 2 === 1}
        />
      ))}
    </div>
  );
}
