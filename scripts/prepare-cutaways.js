
const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const sqlPath = process.argv[2]
  ? path.resolve(process.argv[2])
  : path.join(ROOT, "KKI_PRODUCTS.sql");

const illustrationDir = path.join(
  ROOT,
  "public",
  "products",
  "illustrations"
);

const reportDir = path.join(
  ROOT,
  "cutaway-reports"
);

const draftDir = path.join(
  reportDir,
  "draft-hotspots"
);

const briefDir = path.join(
  reportDir,
  "illustration-briefs"
);

for (const dir of [
  illustrationDir,
  reportDir,
  draftDir,
  briefDir,
]) {
  fs.mkdirSync(dir, { recursive: true });
}

if (!fs.existsSync(sqlPath)) {
  console.error("SQL file not found:", sqlPath);
  process.exit(1);
}

const sql = fs.readFileSync(sqlPath, "utf8");

// Extract values from the catalogue INSERT statements.
const insertPattern =
  /INSERT\s+INTO\s+product\s*\([\s\S]*?\)\s*VALUES\s*\(([\s\S]*?)\)\s*ON\s+DUPLICATE\s+KEY\s+UPDATE/gi;

function parseFields(valuesBlock) {
  const fields = [];
  let current = "";
  let inString = false;
  let escaped = false;

  for (let i = 0; i < valuesBlock.length; i++) {
    const char = valuesBlock[i];

    if (escaped) {
      current += char;
      escaped = false;
      continue;
    }

    if (inString && char === "\\") {
      current += char;
      escaped = true;
      continue;
    }

    if (char === "'") {
      if (inString && valuesBlock[i + 1] === "'") {
        current += "''";
        i++;
        continue;
      }

      inString = !inString;
      current += char;
      continue;
    }

    if (char === "," && !inString) {
      fields.push(current.trim());
      current = "";
      continue;
    }

    current += char;
  }

  fields.push(current.trim());

  return fields;
}

function decodeSqlValue(value) {
  if (!value) return "";

  const trimmed = value.trim();

  if (
    trimmed.startsWith("'") &&
    trimmed.endsWith("'")
  ) {
    return trimmed
      .slice(1, -1)
      .replace(/''/g, "'")
      .replace(/\\n/g, "\n")
      .replace(/\\r/g, "\r")
      .replace(/\\t/g, "\t")
      .replace(/\\'/g, "'");
  }

  return trimmed;
}

function getFamily(slug) {
  if (slug.includes("burner-gas-range")) return "gas-range";
  if (slug.includes("fryer")) return "fryer";
  if (slug.includes("griller")) return "griller";

  if (
    slug.includes("refrigerator") ||
    slug.includes("freezer")
  ) {
    return "refrigeration";
  }

  if (slug.includes("dishwasher")) return "dishwasher";

  if (
    slug.includes("dough") ||
    slug.includes("bakery-mixer")
  ) {
    return "bakery-mixer";
  }

  if (
    slug.includes("grinder") ||
    slug.includes("industrial-mixer")
  ) {
    return "grinder";
  }

  if (
    slug.includes("trolley") ||
    slug.includes("plate-warmer")
  ) {
    return "serving";
  }

  if (
    slug.includes("table")
  ) {
    return "fabrication";
  }

  return "preparation-machine";
}

// These are suggested component groups, not verified
// model-specific internal assemblies.
const familyComponents = {
  "gas-range": [
    "Burner assembly",
    "Cast iron grate",
    "Control knob",
    "Drip tray",
  ],

  fryer: [
    "Frying tank",
    "Basket",
    "Temperature control",
    "Drain assembly",
  ],

  griller: [
    "Upper grilling plate",
    "Lower grilling plate",
    "Handle",
    "Temperature control",
  ],

  refrigeration: [
    "Cabinet",
    "Door and gasket",
    "Interior shelves",
    "Temperature controller",
    "Refrigeration assembly",
  ],

  dishwasher: [
    "Lifting hood",
    "Wash chamber",
    "Dish rack",
    "Spray assembly",
    "Wash pump",
  ],

  "bakery-mixer": [
    "Mixing bowl",
    "Mixing tool",
    "Safety guard",
    "Drive assembly",
    "Control panel",
  ],

  grinder: [
    "Motor housing",
    "Processing assembly",
    "Product container",
    "Control panel",
  ],

  serving: [
    "Main body",
    "Storage compartment",
    "Supporting frame",
    "Castors or feet",
  ],

  fabrication: [
    "Tabletop",
    "Supporting frame",
    "Legs",
    "Bracing",
  ],

  "preparation-machine": [
    "Main housing",
    "Motor assembly",
    "Processing chamber",
    "Controls",
  ],
};

const products = [];
let match;

while ((match = insertPattern.exec(sql)) !== null) {
  const fields = parseFields(match[1]);

  // Expected SQL column order:
  // name, slug, categoryId, itemCode,
  // description, keyFeature, specifications,
  // image, featured
  if (fields.length !== 9) {
    console.warn(
      "Skipping INSERT with unexpected field count:",
      fields.length
    );
    continue;
  }

  const product = {
    name: decodeSqlValue(fields[0]),
    slug: decodeSqlValue(fields[1]),
    categoryVariable: fields[2].trim(),
    itemCode: decodeSqlValue(fields[3]),
    description: decodeSqlValue(fields[4]),
    keyFeature: decodeSqlValue(fields[5]),
    specifications: decodeSqlValue(fields[6]),
    image: decodeSqlValue(fields[7]),
    featured: fields[8].trim() === "1",
  };

  product.family = getFamily(product.slug);
  products.push(product);
}

if (products.length === 0) {
  console.error(
    "No product INSERT statements found. Check SQL input."
  );
  process.exit(1);
}

const manifest = [];
const missingImages = [];

function fileExists(relativePath) {
  return fs.existsSync(
    path.join(ROOT, "public", relativePath)
  );
}

for (const product of products) {
  const { slug, family } = product;

  const imageFile = path.join(
    illustrationDir,
    `${slug}.png`
  );

  const jsonFile = path.join(
    illustrationDir,
    `${slug}.json`
  );

  const legacyImages = [
    `Illustrations/${slug}/cutaway.png`,
    `Illustrations/${slug}/exploded.png`,
    `products/diagrams/${slug}.png`,
  ];

  const newImageExists = fs.existsSync(imageFile);

  const existingLegacy = legacyImages.find(fileExists);

  const hasImage = newImageExists || Boolean(existingLegacy);

  const hasHotspots = fs.existsSync(jsonFile);

  const componentNames =
    familyComponents[family] || [];

  // Drafts are stored outside public, so unreviewed
  // coordinates never appear on your live website.
  const draft = {
    product: product.name,
    slug,
    family,
    reviewStatus: "draft",
    note:
      "Verify components and set x/y percentages after approving the illustration.",
    parts: componentNames.map((name, index) => ({
      id: index + 1,
      name,
      description: "",
      x: null,
      y: null,
    })),
  };

  const draftPath = path.join(
    draftDir,
    `${slug}.json`
  );

  // Never overwrite an existing draft or approved file.
  if (!fs.existsSync(draftPath)) {
    fs.writeFileSync(
      draftPath,
      JSON.stringify(draft, null, 2),
      "utf8"
    );
  }

  const briefPath = path.join(
    briefDir,
    `${slug}.txt`
  );

  if (!fs.existsSync(briefPath)) {
    const brief = [
      `PRODUCT: ${product.name}`,
      `SLUG: ${slug}`,
      `ITEM CODE: ${product.itemCode}`,
      `FAMILY: ${family}`,
      `PHOTO: ${product.image}`,
      "",
      "DESCRIPTION:",
      product.description,
      "",
      "SPECIFICATIONS:",
      product.specifications,
      "",
      "SUGGESTED COMPONENTS TO REVIEW:",
      ...componentNames.map((part) => `- ${part}`),
      "",
      "ILLUSTRATION INSTRUCTIONS:",
      "Create a conceptual product-specific cutaway.",
      "Use the actual catalogue photograph as reference.",
      "Show only technically plausible components.",
      "Do not invent model-specific specifications.",
      "Do not claim the internals are engineering-verified.",
      "Keep the main product centered and labels legible.",
    ].join("\n");

    fs.writeFileSync(
      briefPath,
      brief,
      "utf8"
    );
  }

  const entry = {
    ...product,
    cutawayImageExists: hasImage,
    hotspotJsonExists: hasHotspots,
    cutawayImagePath: newImageExists
      ? `/products/illustrations/${slug}.png`
      : existingLegacy
        ? `/${existingLegacy}`
        : null,
    status: !hasImage
      ? "MISSING_IMAGE"
      : !hasHotspots
        ? "IMAGE_AVAILABLE_JSON_REVIEW"
        : "FILES_PRESENT_REVIEW_REQUIRED",
  };

  manifest.push(entry);

  if (!hasImage) {
    missingImages.push({
      name: product.name,
      slug,
      family,
      imageReference: product.image,
    });
  }
}

fs.writeFileSync(
  path.join(reportDir, "catalogue-manifest.json"),
  JSON.stringify(manifest, null, 2),
  "utf8"
);

fs.writeFileSync(
  path.join(reportDir, "missing-cutaways.json"),
  JSON.stringify(missingImages, null, 2),
  "utf8"
);

const summary = {
  totalProducts: products.length,
  withCutawayImage:
    manifest.filter((p) => p.cutawayImageExists).length,
  withoutCutawayImage: missingImages.length,
  withHotspotJson:
    manifest.filter((p) => p.hotspotJsonExists).length,
  families: [...new Set(products.map((p) => p.family))],
};

fs.writeFileSync(
  path.join(reportDir, "summary.json"),
  JSON.stringify(summary, null, 2),
  "utf8"
);

console.log("\nKKI CUTAWAY PREPARATION COMPLETE");
console.log("----------------------------------");
console.log("Products:", summary.totalProducts);
console.log("Images found:", summary.withCutawayImage);
console.log("Images missing:", summary.withoutCutawayImage);
console.log("Hotspot JSON found:", summary.withHotspotJson);
console.log("Reports:", reportDir);
console.log("\nExisting website assets were not modified.");
