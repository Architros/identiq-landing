import type { NextConfig } from "next";
import path from "node:path";
import { resolveSharedSrcRoot } from "./lib/resolve-shared-src.mjs";

const projectDir = __dirname;
const sharedSrc = resolveSharedSrcRoot(projectDir);

const nextConfig: NextConfig = {
  // vendor/identiq lives inside this project — do not set tracing root to vendor
  // (causes broken serverless bundles / post-build deploy failures on Vercel).
  experimental: {
    externalDir: true,
  },
  outputFileTracingExcludes: {
    "*": [
      "vendor/identiq/node_modules/**",
      "vendor/identiq/.git/**",
      "vendor/identiq/.next/**",
    ],
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
