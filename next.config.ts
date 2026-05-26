import type { NextConfig } from "next";
import { existsSync } from "node:fs";
import path from "node:path";
import { resolveSharedSrcRoot } from "./lib/resolve-shared-src.mjs";

const projectDir = __dirname;
const sharedSrc = resolveSharedSrcRoot(projectDir);
const sharedRepoRoot = existsSync(path.join(projectDir, "vendor/identiq/src"))
  ? path.join(projectDir, "vendor/identiq")
  : path.join(projectDir, "..");

const appBase = (
  process.env.NEXT_PUBLIC_APP_URL ?? "https://app.tryidentiq.com"
).replace(/\/$/, "");

const nextConfig: NextConfig = {
  outputFileTracingRoot: sharedRepoRoot,
  experimental: {
    externalDir: true,
  },
  async rewrites() {
    return [
      {
        source: "/api/billing/:path*",
        destination: `${appBase}/api/billing/:path*`,
      },
    ];
  },
  turbopack: {
    resolveAlias: {
      "@": sharedSrc,
      "@landing": path.join(projectDir, "src"),
    },
  },
  webpack: (config) => {
    config.resolve ??= {};
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": sharedSrc,
      "@landing": path.join(projectDir, "src"),
    };
    return config;
  },
};

export default nextConfig;
