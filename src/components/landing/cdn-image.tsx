import { cn } from "@landing/lib/utils";

type CdnImageProps = {
  src: string;
  alt?: string;
  className?: string;
  /** Fill a `position: relative` parent (object-cover). */
  fill?: boolean;
  priority?: boolean;
};

/**
 * Loads template assets directly from the CDN.
 * Avoids Next.js /_next/image proxy, which times out on large remote PNGs in dev.
 */
export function CdnImage({
  src,
  alt = "",
  className,
  fill = false,
  priority = false,
}: CdnImageProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : undefined}
      className={cn(fill && "absolute inset-0 h-full w-full", className)}
    />
  );
}
