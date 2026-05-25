import Link from "next/link";
import { cn } from "@/lib/utils";

type PillButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "hero" | "accent" | "ghost";
  className?: string;
};

const variantClass: Record<NonNullable<PillButtonProps["variant"]>, string> = {
  hero: "bg-white text-foreground hover:bg-white/90",
  accent: "bg-accent text-on-accent hover:opacity-90",
  ghost:
    "border border-white/30 bg-white/10 text-white backdrop-blur-md hover:bg-white/20",
};

export function PillButton({
  href,
  children,
  variant = "hero",
  className,
}: PillButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition-colors",
        variantClass[variant],
        className,
      )}
    >
      {children}
    </Link>
  );
}
