export type LandingTemplateImage = {
  id: string;
  imageUrl: string;
  width: number;
  height: number;
};

const LOCAL_IMAGE_ROOT = "/landing/templates";

/** Curated subset copied into `public/landing/templates` and served locally. */
export const LANDING_TEMPLATE_IMAGES: LandingTemplateImage[] = [
  { id: "009070d6-4131-42a2-9f83-3cb27195a7b6", imageUrl: `${LOCAL_IMAGE_ROOT}/009070d6-4131-42a2-9f83-3cb27195a7b6.webp`, width: 1122, height: 1402 },
  { id: "039694df-2cf3-4a21-9d05-ca6c20aab95b", imageUrl: `${LOCAL_IMAGE_ROOT}/039694df-2cf3-4a21-9d05-ca6c20aab95b.webp`, width: 1536, height: 1024 },
  { id: "0797a669-6dd5-4fd3-81bf-942c7e8ffd98", imageUrl: `${LOCAL_IMAGE_ROOT}/0797a669-6dd5-4fd3-81bf-942c7e8ffd98.webp`, width: 1536, height: 1024 },
  { id: "0a635aa0-9d5d-431c-ae4b-cfdd740776dc", imageUrl: `${LOCAL_IMAGE_ROOT}/0a635aa0-9d5d-431c-ae4b-cfdd740776dc.webp`, width: 1537, height: 1023 },
  { id: "1330a303-a3e6-49e2-b4ec-4e75f33a1b39", imageUrl: `${LOCAL_IMAGE_ROOT}/1330a303-a3e6-49e2-b4ec-4e75f33a1b39.webp`, width: 1672, height: 941 },
  { id: "179edd39-6bb9-4b39-874d-de3dc1bca13e", imageUrl: `${LOCAL_IMAGE_ROOT}/179edd39-6bb9-4b39-874d-de3dc1bca13e.webp`, width: 1983, height: 793 },
  { id: "23ea8379-7dbd-434e-9d5c-a017b7b79971", imageUrl: `${LOCAL_IMAGE_ROOT}/23ea8379-7dbd-434e-9d5c-a017b7b79971.webp`, width: 1390, height: 1132 },
  { id: "249c3a93-414d-4e8f-8b0c-aa8f19775c6c", imageUrl: `${LOCAL_IMAGE_ROOT}/249c3a93-414d-4e8f-8b0c-aa8f19775c6c.webp`, width: 1536, height: 1024 },
  { id: "34a11c19-12b0-4f5b-8457-6ab7ee8c725b", imageUrl: `${LOCAL_IMAGE_ROOT}/34a11c19-12b0-4f5b-8457-6ab7ee8c725b.webp`, width: 1024, height: 1536 },
  { id: "4bb374c0-e5d6-4b98-969e-40b4fc459bca", imageUrl: `${LOCAL_IMAGE_ROOT}/4bb374c0-e5d6-4b98-969e-40b4fc459bca.webp`, width: 1536, height: 1024 },
  { id: "5613b5d5-6738-4299-b75f-823d4089d20f", imageUrl: `${LOCAL_IMAGE_ROOT}/5613b5d5-6738-4299-b75f-823d4089d20f.webp`, width: 1080, height: 1350 },
  { id: "7a74d42d-c1ff-4156-a11f-5c75cdf53430", imageUrl: `${LOCAL_IMAGE_ROOT}/7a74d42d-c1ff-4156-a11f-5c75cdf53430.webp`, width: 1536, height: 1024 },
];

/** Hero marquee strip — first 10 templates with one swap for visual variety. */
export const HERO_MARQUEE_IMAGES: LandingTemplateImage[] = [
  ...LANDING_TEMPLATE_IMAGES.slice(0, 7),
  LANDING_TEMPLATE_IMAGES[11],
  ...LANDING_TEMPLATE_IMAGES.slice(8, 10),
];

export const SHOWCASE_COLLAGE_LAYOUT = [
  "col-span-2 row-span-2",
  "row-span-2",
  "",
  "",
  "col-span-2",
  "",
  "row-span-2",
  "",
] as const;

export function getFeatureImages(offset: number, count: number) {
  return LANDING_TEMPLATE_IMAGES.slice(offset, offset + count);
}

export function getShowcaseImages(count = 8) {
  return LANDING_TEMPLATE_IMAGES.slice(0, count);
}
