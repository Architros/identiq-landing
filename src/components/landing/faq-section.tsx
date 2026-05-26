"use client";

import Link from "next/link";
import { FaqAccordion } from "@/components/marketing/faq-accordion";
import { LANDING_COPY } from "@landing/content/landing-copy";

export function FaqSection() {
  const { faq } = LANDING_COPY;

  return (
    <section
      id="faq"
      className="scroll-mt-20 border-b border-border bg-background py-20 sm:py-28"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-accent">
            {faq.eyebrow}
          </p>
          <h2 className="mt-3 font-display text-3xl tracking-tight text-foreground sm:text-4xl">
            {faq.title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted">
            {faq.description}
          </p>
        </div>

        <div>
          <FaqAccordion />
          <p className="mt-6 rounded-xl bg-sidebar-active/40 px-4 py-3 text-center text-sm text-muted">
            {faq.footer}{" "}
            <Link
              href={faq.footerCtaHref}
              className="font-medium text-accent hover:underline"
            >
              {faq.footerCta}
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
