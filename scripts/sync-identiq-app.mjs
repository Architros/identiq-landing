/**
 * Vercel / standalone landing builds clone the main identiq app for shared @/ imports.
 * In the monorepo (../src present), cloning is skipped.
 */
import { execSync } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const siblingSrc = path.join(root, "../src/components");
const vendorRoot = path.join(root, "vendor/identiq");
const vendorSrc = path.join(vendorRoot, "src/components");

if (existsSync(siblingSrc)) {
  console.log("[sync-identiq-app] Monorepo ../src detected — skipping clone.");
  process.exit(0);
}

if (existsSync(vendorSrc)) {
  console.log("[sync-identiq-app] vendor/identiq already present — skipping clone.");
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

console.log(`[sync-identiq-app] Cloning ${repo} @ ${ref} → vendor/identiq`);
execSync(
  `git clone --depth 1 --branch "${ref}" "${cloneUrl}" "${vendorRoot}"`,
  { stdio: "inherit", cwd: root },
);

if (!existsSync(vendorSrc)) {
  console.error("[sync-identiq-app] Clone succeeded but src/components is missing.");
  process.exit(1);
}

console.log("[sync-identiq-app] Done.");
