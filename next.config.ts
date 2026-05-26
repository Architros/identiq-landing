import type { NextConfig } from "next";

import path from "node:path";

const projectDir = __dirname;

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(projectDir, ".."),
  experimental: {
    externalDir: true,
  },
  turbopack: {
    resolveAlias: {
      "@": "../src",
      "@landing": "./src",
    },
  },
  webpack: (config) => {
    const path = require("node:path") as typeof import("node:path");
    const projectDir = __dirname;
    config.resolve ??= {};
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.join(projectDir, "../src"),
      "@landing": path.join(projectDir, "src"),
    };
    return config;
  },
};

export default nextConfig;
