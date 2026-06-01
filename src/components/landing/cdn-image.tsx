import { cn } from "@landing/lib/utils";

type CdnImageProps = {
  src: string;
  alt?: string;
  className?: string;
  /** Fill a `position: relative` parent (object-cover). */
  fill?: boolean;
  priority?: boolean;
  width?: number;
  height?: number;
  draggable?: boolean;
};

/**
 * Local landing assets — same pattern as hero background: direct URL, no image proxy.
 * Use `priority` for above-the-fold hero marquee tiles (eager + high fetch priority).
 */
export function CdnImage({
  src,
  alt = "",
  className,
  fill = false,
  priority = false,
  width,
  height,
  draggable = true,
}: CdnImageProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      draggable={draggable}
      loading={priority ? "eager" : "lazy"}
      decoding={priority ? "sync" : "async"}
      fetchPriority={priority ? "high" : undefined}
      className={cn(fill && "absolute inset-0 h-full w-full", className)}
    />
  );
}
