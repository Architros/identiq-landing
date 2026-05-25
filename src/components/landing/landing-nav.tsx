"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { APP_LINKS } from "@/lib/app-url";
import { cn } from "@/lib/utils";
import { PillButton } from "@/components/landing/pill-button";

const NAV_LINKS = [
  { label: "Product", href: "#product" },
  { label: "How it works", href: "#how-it-works" },
] as const;

export function LandingNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled
          ? "border-b border-white/10 bg-black/30 backdrop-blur-xl"
          : "bg-transparent",
      )}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2.5 text-white transition-opacity hover:opacity-90"
        >
          <Image
            src="/brand/logo-icon.svg"
            alt=""
            width={28}
            height={28}
            className="h-7 w-7"
          />
          <span className="font-display text-lg tracking-tight">identiq</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-white/85 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href={APP_LINKS.login()}
            className="hidden px-3 py-2 text-sm text-white/90 transition-colors hover:text-white sm:inline-block"
          >
            Sign in
          </Link>
          <PillButton href={APP_LINKS.startBrand()} variant="hero" className="px-4 py-2.5 text-sm sm:px-5">
            Start your brand
          </PillButton>
        </div>
      </nav>
    </header>
  );
}
