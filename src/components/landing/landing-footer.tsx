import Link from "next/link";
import { APP_LINKS } from "@landing/lib/app-url";

const COPYRIGHT_YEAR = new Date().getFullYear();

export function LandingFooter() {
  return (
    <footer className="border-t border-border bg-background px-4 py-8 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="font-display text-sm text-foreground">identiq</p>
        <p className="flex flex-wrap items-center justify-center gap-x-1.5 gap-y-1 text-center text-xs text-muted">
          <span>© {COPYRIGHT_YEAR} Identiq</span>
          <span className="text-border" aria-hidden>
            ·
          </span>
          <Link
            href={APP_LINKS.privacy()}
            className="underline-offset-2 transition-colors hover:text-foreground hover:underline"
          >
            Privacy Policy
          </Link>
          <span className="text-border" aria-hidden>
            ·
          </span>
          <Link
            href={APP_LINKS.terms()}
            className="underline-offset-2 transition-colors hover:text-foreground hover:underline"
          >
            Terms &amp; Conditions
          </Link>
        </p>
      </div>
    </footer>
  );
}
