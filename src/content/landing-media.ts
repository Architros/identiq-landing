export type LandingTemplateImage = {
  id: string;
  imageUrl: string;
  width: number;
  height: number;
};

/** Curated subset from main app library — no JSON import dependency. */
export const LANDING_TEMPLATE_IMAGES: LandingTemplateImage[] = [
  {
    id: "009070d6-4131-42a2-9f83-3cb27195a7b6",
    imageUrl:
      "https://assets.tryidentiq.com/library/templates/009070d6-4131-42a2-9f83-3cb27195a7b6.png",
    width: 1122,
    height: 1402,
  },
  {
    id: "039694df-2cf3-4a21-9d05-ca6c20aab95b",
    imageUrl:
      "https://assets.tryidentiq.com/library/templates/039694df-2cf3-4a21-9d05-ca6c20aab95b.png",
    width: 1536,
    height: 1024,
  },
  {
    id: "0797a669-6dd5-4fd3-81bf-942c7e8ffd98",
    imageUrl:
      "https://assets.tryidentiq.com/library/templates/0797a669-6dd5-4fd3-81bf-942c7e8ffd98.png",
    width: 1536,
    height: 1024,
  },
  {
    id: "0a635aa0-9d5d-431c-ae4b-cfdd740776dc",
    imageUrl:
      "https://assets.tryidentiq.com/library/templates/0a635aa0-9d5d-431c-ae4b-cfdd740776dc.png",
    width: 1537,
    height: 1023,
  },
  {
    id: "1330a303-a3e6-49e2-b4ec-4e75f33a1b39",
    imageUrl:
      "https://assets.tryidentiq.com/library/templates/1330a303-a3e6-49e2-b4ec-4e75f33a1b39.png",
    width: 1672,
    height: 941,
  },
  {
    id: "179edd39-6bb9-4b39-874d-de3dc1bca13e",
    imageUrl:
      "https://assets.tryidentiq.com/library/templates/179edd39-6bb9-4b39-874d-de3dc1bca13e.png",
    width: 1983,
    height: 793,
  },
  {
    id: "23ea8379-7dbd-434e-9d5c-a017b7b79971",
    imageUrl:
      "https://assets.tryidentiq.com/library/templates/23ea8379-7dbd-434e-9d5c-a017b7b79971.png",
    width: 1390,
    height: 1132,
  },
  {
    id: "249c3a93-414d-4e8f-8b0c-aa8f19775c6c",
    imageUrl:
      "https://assets.tryidentiq.com/library/templates/249c3a93-414d-4e8f-8b0c-aa8f19775c6c.png",
    width: 1536,
    height: 1024,
  },
  {
    id: "34a11c19-12b0-4f5b-8457-6ab7ee8c725b",
    imageUrl:
      "https://assets.tryidentiq.com/library/templates/34a11c19-12b0-4f5b-8457-6ab7ee8c725b.png",
    width: 1024,
    height: 1536,
  },
  {
    id: "4bb374c0-e5d6-4b98-969e-40b4fc459bca",
    imageUrl:
      "https://assets.tryidentiq.com/library/templates/4bb374c0-e5d6-4b98-969e-40b4fc459bca.png",
    width: 1536,
    height: 1024,
  },
  {
    id: "5613b5d5-6738-4299-b75f-823d4089d20f",
    imageUrl:
      "https://assets.tryidentiq.com/library/templates/5613b5d5-6738-4299-b75f-823d4089d20f.png",
    width: 1080,
    height: 1350,
  },
  {
    id: "7a74d42d-c1ff-4156-a11f-5c75cdf53430",
    imageUrl:
      "https://assets.tryidentiq.com/library/templates/7a74d42d-c1ff-4156-a11f-5c75cdf53430.png",
    width: 1536,
    height: 1024,
  },
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
