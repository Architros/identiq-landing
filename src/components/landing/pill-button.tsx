import Link from "next/link";
import { TextureButton } from "@/components/ui/texture-button";
import { cn } from "@landing/lib/utils";

type PillButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "hero" | "accent" | "ghost";
  /** Padding/size on the inner surface (e.g. compact nav). */
  className?: string;
  /** Layout on the outer shell (e.g. shrink-0). */
  shellClassName?: string;
};

const variantClass: Record<"hero" | "ghost", string> = {
  hero: "bg-white text-foreground hover:bg-white/90",
  ghost:
    "border border-white/30 bg-white/10 text-white backdrop-blur-md hover:bg-white/20",
};

const accentDefaultInner =
  "px-6 py-3 text-sm font-medium";

export function PillButton({
  href,
  children,
  variant = "hero",
  className,
  shellClassName,
}: PillButtonProps) {
  if (variant === "accent") {
    return (
      <TextureButton
        href={href}
        variant="accent"
        shape="pill"
        className={shellClassName}
        innerClassName={cn(accentDefaultInner, className)}
      >
        {children}
      </TextureButton>
    );
  }

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
