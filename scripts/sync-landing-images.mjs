import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const OUTPUT_DIR = path.join(process.cwd(), "public/landing/templates");
const QUALITY = Number(process.env.LANDING_IMAGE_WEBP_QUALITY ?? "72");

const SOURCES = [
  ["009070d6-4131-42a2-9f83-3cb27195a7b6", "https://assets.tryidentiq.com/library/templates/009070d6-4131-42a2-9f83-3cb27195a7b6.png"],
  ["039694df-2cf3-4a21-9d05-ca6c20aab95b", "https://assets.tryidentiq.com/library/templates/039694df-2cf3-4a21-9d05-ca6c20aab95b.png"],
  ["0797a669-6dd5-4fd3-81bf-942c7e8ffd98", "https://assets.tryidentiq.com/library/templates/0797a669-6dd5-4fd3-81bf-942c7e8ffd98.png"],
  ["0a635aa0-9d5d-431c-ae4b-cfdd740776dc", "https://assets.tryidentiq.com/library/templates/0a635aa0-9d5d-431c-ae4b-cfdd740776dc.png"],
  ["1330a303-a3e6-49e2-b4ec-4e75f33a1b39", "https://assets.tryidentiq.com/library/templates/1330a303-a3e6-49e2-b4ec-4e75f33a1b39.png"],
  ["179edd39-6bb9-4b39-874d-de3dc1bca13e", "https://assets.tryidentiq.com/library/templates/179edd39-6bb9-4b39-874d-de3dc1bca13e.png"],
  ["23ea8379-7dbd-434e-9d5c-a017b7b79971", "https://assets.tryidentiq.com/library/templates/23ea8379-7dbd-434e-9d5c-a017b7b79971.png"],
  ["249c3a93-414d-4e8f-8b0c-aa8f19775c6c", "https://assets.tryidentiq.com/library/templates/249c3a93-414d-4e8f-8b0c-aa8f19775c6c.png"],
  ["34a11c19-12b0-4f5b-8457-6ab7ee8c725b", "https://assets.tryidentiq.com/library/templates/34a11c19-12b0-4f5b-8457-6ab7ee8c725b.png"],
  ["4bb374c0-e5d6-4b98-969e-40b4fc459bca", "https://assets.tryidentiq.com/library/templates/4bb374c0-e5d6-4b98-969e-40b4fc459bca.png"],
  ["5613b5d5-6738-4299-b75f-823d4089d20f", "https://assets.tryidentiq.com/library/templates/5613b5d5-6738-4299-b75f-823d4089d20f.png"],
  ["7a74d42d-c1ff-4156-a11f-5c75cdf53430", "https://assets.tryidentiq.com/library/templates/7a74d42d-c1ff-4156-a11f-5c75cdf53430.png"],
];

await mkdir(OUTPUT_DIR, { recursive: true });

for (const [id, url] of SOURCES) {
  const out = path.join(OUTPUT_DIR, `${id}.webp`);
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Download failed (${res.status}) for ${url}`);
  }
  const input = Buffer.from(await res.arrayBuffer());
  const compressed = await sharp(input)
    .rotate()
    .webp({ quality: QUALITY, effort: 5 })
    .toBuffer();
  await writeFile(out, compressed);
  console.log(`saved ${id}.webp (${Math.round(compressed.length / 1024)}KB)`);
}

