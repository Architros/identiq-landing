import { existsSync } from "node:fs";
import path from "node:path";

/** Directory whose `components/` etc. back the `@/` import alias. */
export function resolveSharedSrcRoot(projectDir) {
  const vendorSrc = path.join(projectDir, "vendor/identiq/src");
  const siblingSrc = path.join(projectDir, "../src");

  // Prefer live monorepo sources so landing always matches local app billing UI.
  if (existsSync(path.join(siblingSrc, "components"))) return siblingSrc;
  if (existsSync(path.join(vendorSrc, "components"))) return vendorSrc;

  return vendorSrc;
}
