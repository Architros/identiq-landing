/**
 * Vercel / standalone landing builds clone the main identiq app for shared @/ imports.
 * In the monorepo (../src present), cloning is skipped unless VERCEL=1.
 */
import { execSync } from "node:child_process";
import { existsSync, rmSync } from "node:fs";
import path from "node:path";
import { setTimeout } from "node:timers/promises";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const isVercel = process.env.VERCEL === "1";
const siblingSrc = path.join(root, "../src/components");
const vendorRoot = path.join(root, "vendor/identiq");
const vendorSrc = path.join(vendorRoot, "src/components");
const markerFile = path.join(vendorSrc, "ui/texture-button.tsx");

function vendorIsComplete() {
  return (
    existsSync(markerFile) &&
    existsSync(path.join(vendorSrc, "billing/billing-plans-section.tsx")) &&
    existsSync(path.join(vendorSrc, "marketing/faq-accordion.tsx"))
  );
}

if (existsSync(siblingSrc) && !isVercel) {
  console.log("[sync-identiq-app] Monorepo ../src detected — skipping clone.");
  process.exit(0);
}

if (existsSync(vendorRoot) && (!vendorIsComplete() || isVercel)) {
  console.log("[sync-identiq-app] Refreshing vendor/identiq…");
  rmSync(vendorRoot, { recursive: true, force: true });
} else if (vendorIsComplete()) {
  console.log("[sync-identiq-app] vendor/identiq is up to date — skipping clone.");
  process.exit(0);
}

const ref = process.env.IDENTIQ_APP_REF?.trim() || "main";
const repo =
  process.env.IDENTIQ_APP_REPO?.trim() ||
  "https://github.com/Architros/identiq.git";

let cloneUrl = repo;
const token = process.env.GITHUB_TOKEN?.trim();
if (token && cloneUrl.startsWith("https://github.com/")) {
  cloneUrl = cloneUrl.replace(
    "https://github.com/",
    `https://x-access-token:${token}@github.com/`,
  );
}

function cloneOnce() {
  execSync(
    `git clone --depth 1 --branch "${ref}" "${cloneUrl}" "${vendorRoot}"`,
    { stdio: "inherit", cwd: root },
  );
}

async function main() {
  console.log(`[sync-identiq-app] Cloning ${repo} @ ${ref} → vendor/identiq`);

  let lastError;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      if (existsSync(vendorRoot)) {
        rmSync(vendorRoot, { recursive: true, force: true });
      }
      cloneOnce();
      lastError = undefined;
      break;
    } catch (error) {
      lastError = error;
      console.warn(`[sync-identiq-app] Clone attempt ${attempt} failed.`);
      if (attempt < 3) await setTimeout(2000);
    }
  }

  if (lastError) {
    console.error("[sync-identiq-app] All clone attempts failed.");
    throw lastError;
  }

  if (!vendorIsComplete()) {
    console.error(
      "[sync-identiq-app] Clone finished but required shared files are missing.",
    );
    process.exit(1);
  }

  console.log("[sync-identiq-app] Done.");
}

await main();
