
const fs = require("fs");
const path = require("path");

require("dotenv").config({
  path: path.join(process.cwd(), ".env.local"),
});

const ROOT = process.cwd();

const manifestPath = path.join(
  ROOT,
  "cutaway-reports",
  "catalogue-manifest.json"
);

// Generated artwork is reviewed before publication.
const outputDir = path.join(
  ROOT,
  "cutaway-reports",
  "generated-images"
);

const publicDir = path.join(ROOT, "public");

fs.mkdirSync(outputDir, { recursive: true });

const args = process.argv.slice(2);

function getOption(name, fallback) {
  const index = args.indexOf(name);
  return index >= 0 && args[index + 1]
    ? args[index + 1]
    : fallback;
}

const limit = Math.max(
  1,
  Number(getOption("--limit", "1")) || 1
);

const selectedSlug = getOption("--slug", "");

if (!fs.existsSync(manifestPath)) {
  console.error("Missing catalogue-manifest.json");
  console.error("Run prepare-cutaways.js first.");
  process.exit(1);
}

if (!process.env.OPENAI_API_KEY) {
  console.error("OPENAI_API_KEY is not configured.");
  process.exit(1);
}

const products = JSON.parse(
  fs.readFileSync(manifestPath, "utf8")
);

const candidates = products.filter((product) => {
  if (product.cutawayImageExists) return false;

  if (selectedSlug && product.slug !== selectedSlug) {
    return false;
  }

  const existing = path.join(
    outputDir,
    `${product.slug}.png`
  );

  return !fs.existsSync(existing);
});

const selected = candidates.slice(0, limit);

if (!selected.length) {
  console.log("No ungenerated products matched.");
  process.exit(0);
}

function getComponents(product) {
  const slug = product.slug;

  if (slug.includes("burner-gas-range")) {
    return [
      "Burner heads",
      "Cast iron pan supports",
      "Gas control knobs",
      "Stainless steel body",
      "Removable drip tray",
    ];
  }

  if (slug.includes("fryer")) {
    return [
      "Frying tank",
      "Basket",
      "Temperature control",
      "Heating assembly",
      "Drain system where specified",
    ];
  }

  if (slug.includes("griller")) {
    return [
      "Upper grill plate",
      "Lower grill plate",
      "Hinged handle",
      "Temperature controls",
    ];
  }

  if (
    slug.includes("refrigerator") ||
    slug.includes("freezer")
  ) {
    return [
      "Insulated cabinet",
      "Door seals",
      "Interior storage",
      "Temperature controller",
      "Conceptual cooling components",
    ];
  }

  if (slug.includes("spiral-dough-mixer")) {
    return [
      "Spiral mixing hook",
      "Stainless steel bowl",
      "Safety guard",
      "Drive assembly",
      "Motor housing",
      "Control panel",
    ];
  }

  if (slug.includes("planetary-bakery-mixer")) {
    return [
      "Planetary mixing head",
      "Mixing attachment",
      "Bowl",
      "Bowl support",
      "Motor and gear housing",
    ];
  }

  if (slug.includes("dough-kneading-machine")) {
    return [
      "Kneading bowl",
      "Kneading shaft",
      "Drive housing",
      "Motor",
      "Supporting structure",
    ];
  }

  if (slug.includes("dishwasher")) {
    return [
      "Liftable hood",
      "Washing chamber",
      "Dish rack",
      "Spray arms",
      "Circulation pump",
    ];
  }

  if (slug.includes("vegetable-cutting")) {
    return [
      "Feed opening",
      "Cutting disc",
      "Processing chamber",
      "Motor housing",
      "Controls",
    ];
  }

  if (slug.includes("water-cooler")) {
    return [
      "Storage tank",
      "Water outlet",
      "Insulated cabinet",
      "Conceptual cooling system",
    ];
  }

  if (slug.includes("table")) {
    return [
      "Stainless steel tabletop",
      "Supporting legs",
      "Cross bracing or seat supports",
      "Frame connections",
    ];
  }

  if (slug.includes("trolley")) {
    return [
      "Stainless steel frame",
      "Storage trays or pans",
      "Handles",
      "Castors",
    ];
  }

  return [
    "Outer equipment housing",
    "Processing or working assembly",
    "Motor or power system where applicable",
    "Operator controls",
  ];
}

function makePrompt(product) {
  const components = getComponents(product);

  return `
Create ONE premium commercial-kitchen product
technical cutaway illustration.

PRODUCT:
${product.name}

ITEM CODE:
${product.itemCode}

DESCRIPTION:
${product.description}

SPECIFICATIONS:
${product.specifications}

SUGGESTED COMPONENTS:
${components.join(", ")}

IMPORTANT INSTRUCTIONS:

The supplied image is the ACTUAL catalogue
product photograph.

Use it as the main reference for the exterior
shape, proportions, and identifiable features.

Maintain the recognizable appearance of this
specific equipment. Do not replace it with
another product family.

Create an isometric three-quarter technical
cutaway view, with selected outer panels
removed or partially transparent to reveal
plausible internal components.

Show several relevant components clearly.

If exact internal construction is unknown,
keep the illustrated mechanism conceptual.
Do not invent precise engineering claims.

Use brushed stainless steel materials,
realistic lighting, and a clean white background.

Professional premium technical illustration
for a commercial kitchen equipment website.

Do NOT draw component numbers, captions,
arrows, legends, or text over the image.
Those will be added separately through
the website's interactive hotspot system.

Keep the entire product visible with ample
white margin around it.

Landscape composition.
`;
}

async function main() {
  const { default: OpenAI, toFile } = await import("openai");

  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  console.log(`Generating ${selected.length} illustration(s).`);

  for (let i = 0; i < selected.length; i++) {
    const product = selected[i];

    console.log(
      `[${i + 1}/${selected.length}] ${product.name}`
    );

    const relativeImage = product.image.replace(/^\/+/, "");

    const photoPath = path.join(
      publicDir,
      relativeImage
    );

    const destination = path.join(
      outputDir,
      `${product.slug}.png`
    );

    if (!fs.existsSync(photoPath)) {
      console.warn(
        "  SKIPPED: product photo missing:",
        photoPath
      );
      continue;
    }

    try {
      const response = await client.images.edit({
        model: "gpt-image-1.5",
        image: await toFile(
            fs.readFileSync(photoPath),
            path.basename(photoPath),
            {
                type: path.extname(photoPath).toLowerCase() === ".jpg" ||
                    path.extname(photoPath).toLowerCase() === ".jpeg"
                ? "image/jpeg"
                : path.extname(photoPath).toLowerCase() === ".webp"
                    ? "image/webp"
                    : "image/png",
            }
        ),
        prompt: makePrompt(product),
        size: "1536x1024",
        quality: "medium",
      });

      const base64 = response.data?.[0]?.b64_json;

      if (!base64) {
        throw new Error("Image data was not returned.");
      }

      fs.writeFileSync(
        destination,
        Buffer.from(base64, "base64")
      );

      console.log("  SAVED:", destination);
    } catch (error) {
      console.error(
        "  FAILED:",
        error.message
      );
    }
  }

  console.log("\nGeneration pass finished.");
  console.log("Review images in:", outputDir);
  console.log("Existing public illustrations were preserved.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
