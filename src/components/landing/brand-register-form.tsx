"use client";

import { useState } from "react";
import { TextureButton } from "@/components/ui/texture-button";
import { APP_LINKS } from "@landing/lib/app-url";
import { cn } from "@landing/lib/utils";

type BrandRegisterFormProps = {
  placeholder: string;
  submitLabel: string;
  variant?: "hero" | "light";
  className?: string;
};

export function BrandRegisterForm({
  placeholder,
  submitLabel,
  variant = "hero",
  className,
}: BrandRegisterFormProps) {
  const [brandName, setBrandName] = useState("");
  const isHero = variant === "hero";

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = brandName.trim();
    window.location.assign(APP_LINKS.startBrand(trimmed || undefined));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("w-full max-w-md", className)}
    >
      <label className="sr-only" htmlFor="hero-brand-name">
        Register your brand
      </label>
      <div
        className={cn(
          "flex items-center gap-1 rounded-full p-1.5",
          isHero
            ? "border border-white/25 bg-white/10 backdrop-blur-md"
            : "border border-border bg-background",
        )}
      >
        <input
          id="hero-brand-name"
          name="brandName"
          type="text"
          autoComplete="organization"
          value={brandName}
          onChange={(event) => setBrandName(event.target.value)}
          placeholder={placeholder}
          className={cn(
            "min-w-0 flex-1 bg-transparent px-4 py-2.5 text-sm focus-visible:outline-none",
            isHero
              ? "text-white placeholder:text-white/50"
              : "text-foreground placeholder:text-muted",
          )}
        />
        <TextureButton
          type="submit"
          variant="accent"
          shape="pill"
          className="shrink-0"
          innerClassName="px-5 py-2.5 text-sm font-semibold"
        >
          {submitLabel}
        </TextureButton>
      </div>
    </form>
  );
}
