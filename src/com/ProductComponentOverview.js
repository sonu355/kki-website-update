
"use client";

import { useState } from "react";
import { Plus, Minus, RotateCcw, Info } from "lucide-react";

const COMPONENTS = {
  "gas-range": [
    "Burner assembly",
    "Cast iron pan support",
    "Gas control knobs",
    "Stainless steel structure",
    "Drip collection tray",
  ],
  fryer: [
    "Frying tank",
    "Frying basket",
    "Temperature controller",
    "Heating system",
    "Drain arrangement, if fitted",
  ],
  griller: [
    "Upper grilling plate",
    "Lower grilling plate",
    "Hinged handle",
    "Temperature controller",
  ],
  refrigeration: [
    "Insulated cabinet",
    "Door and sealing gasket",
    "Storage shelves or trays",
    "Temperature controller",
    "Cooling system",
  ],
  "bakery-mixer": [
    "Mixing bowl",
    "Mixing attachment",
    "Safety guard, if fitted",
    "Drive system",
    "Operator controls",
  ],
  grinder: [
    "Processing chamber",
    "Grinding mechanism",
    "Motor housing",
    "Feed or discharge arrangement",
  ],
  "preparation-machine": [
    "Main housing",
    "Food processing mechanism",
    "Electric motor",
    "Operator controls",
  ],
  dishwasher: [
    "Washing chamber",
    "Dish rack",
    "Spray system",
    "Water circulation system",
    "Control panel",
  ],
  serving: [
    "Main stainless steel structure",
    "Storage or holding section",
    "Supporting frame",
    "Castors or feet",
  ],
  fabrication: [
    "Stainless steel work surface",
    "Supporting structure",
    "Legs",
    "Bracing or frame connections",
  ],
};

function detectFamily(slug = "") {
  if (slug.includes("gas-range")) return "gas-range";
  if (slug.includes("fryer")) return "fryer";
  if (slug.includes("griller")) return "griller";

  if (
    slug.includes("refrigerator") ||
    slug.includes("freezer") ||
    slug.includes("water-cooler")
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
    slug.includes("pulverizer") ||
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
    slug.includes("dining-table") ||
    slug.includes("work-table")
  ) {
    return "fabrication";
  }

  return "preparation-machine";
}

const PRODUCT_OVERRIDES = {
  "spiral-dough-mixer": [
    "Stainless steel mixing bowl",
    "Spiral mixing hook",
    "Bowl safety guard",
    "Control panel",
    "Motor and drive system",
    "Supporting base",
  ],
  "planetary-bakery-mixer": [
    "Planetary mixing head",
    "Mixing attachments",
    "Stainless steel bowl",
    "Bowl support",
    "Motor and drive",
  ],
  "vegetable-cutting-machine": [
    "Vegetable feed opening",
    "Interchangeable cutting discs",
    "Processing chamber",
    "Electric motor",
    "Discharge opening",
  ],
  "electric-meat-mincer": [
    "Feed tray and hopper",
    "Feed screw",
    "Cutting blade",
    "Grinding plate",
    "Motor housing",
  ],
  "potato-peeler": [
    "Peeling chamber",
    "Abrasive peeling surface",
    "Water inlet",
    "Waste drain",
    "Motor drive",
  ],
  "water-cooler": [
    "Water storage tank",
    "Cooling system",
    "Water dispensing taps",
    "Stainless steel cabinet",
  ],
  "ice-crusher": [
    "Ice feed opening",
    "Shaving blades",
    "Motor",
    "Ice discharge outlet",
  ],
  "tilting-wet-grinder": [
    "Grinding drum",
    "Granite roller assembly",
    "Tilting mechanism",
    "Motor drive",
    "Supporting frame",
  ],
  "electric-plate-warmer": [
    "Plate holding section",
    "Heating system",
    "Temperature controls",
    "Supporting frame",
  ],
};

export default function ProductComponentOverview({
  slug,
  name,
  image,
}) {
  const [zoom, setZoom] = useState(1);
  const [selected, setSelected] = useState(null);

  const family = detectFamily(slug);

  const components =
    PRODUCT_OVERRIDES[slug] ||
    COMPONENTS[family] ||
    COMPONENTS["preparation-machine"];

  const changeZoom = (amount) => {
    setZoom((current) =>
      Math.max(
        1,
        Math.min(3, Number((current + amount).toFixed(2)))
      )
    );
  };

  return (
    <section className="overflow-hidden rounded-2xl border border-[#ded8ce] bg-white">
      <div className="border-b border-[#ded8ce] p-4">
        <p className="text-[10px] font-bold uppercase tracking-widest text-[#bd8431]">
          Interactive Component Overview
        </p>
        <h3 className="mt-1 text-sm font-bold text-[#061b2f]">
          {name}
        </h3>
      </div>

      <div className="max-h-[500px] overflow-auto bg-white">
        <div
          className="relative mx-auto"
          style={{
            width: `${zoom * 100}%`,
            minWidth: "100%",
          }}
        >
          {image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={image}
              alt={`${name} product component overview`}
              className="block h-auto w-full select-none object-contain"
              draggable={false}
            />
          ) : (
            <div className="flex aspect-square items-center justify-center text-sm text-gray-500">
              Product photograph unavailable
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2 border-y border-[#ded8ce] bg-[#faf8f4] p-3">
        <button
          type="button"
          onClick={() => changeZoom(-0.25)}
          disabled={zoom <= 1}
          className="rounded-lg border bg-white p-2 disabled:opacity-40"
          aria-label="Zoom out"
        >
          <Minus size={16} />
        </button>

        <span className="min-w-[52px] text-center text-xs font-bold">
          {Math.round(zoom * 100)}%
        </span>

        <button
          type="button"
          onClick={() => changeZoom(0.25)}
          disabled={zoom >= 3}
          className="rounded-lg border bg-white p-2 disabled:opacity-40"
          aria-label="Zoom in"
        >
          <Plus size={16} />
        </button>

        <button
          type="button"
          onClick={() => setZoom(1)}
          className="flex items-center gap-1 rounded-lg bg-[#061b2f] px-3 py-2 text-xs font-semibold text-white"
        >
          <RotateCcw size={14} />
          Reset
        </button>
      </div>

      <div className="p-4">
        <h4 className="mb-3 text-sm font-bold text-[#061b2f]">
          Component Guide
        </h4>

        <div className="space-y-2">
          {components.map((component, index) => (
            <button
              key={`${slug}-${index}`}
              type="button"
              onClick={() =>
                setSelected(
                  selected === index ? null : index
                )
              }
              aria-pressed={selected === index}
              className={`flex w-full items-center gap-3 rounded-lg border p-3 text-left transition-colors ${
                selected === index
                  ? "border-[#bd8431] bg-[#faf3e5]"
                  : "border-[#e7e0d5] bg-white hover:bg-[#f8f5ee]"
              }`}
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#0879d1] text-xs font-bold text-white">
                {index + 1}
              </span>

              <span className="flex-1 text-xs font-semibold text-[#061b2f]">
                {component}
              </span>

              <Info size={15} className="text-[#64727f]" />
            </button>
          ))}
        </div>

        {selected !== null && (
          <div className="mt-3 rounded-lg bg-[#f8f5ee] p-3">
            <p className="text-sm font-bold text-[#061b2f]">
              {components[selected]}
            </p>
            <p className="mt-1 text-xs text-[#536270]">
              Suggested component for this equipment type.
              Refer to the product specification or manufacturer
              for exact construction and configuration.
            </p>
          </div>
        )}
      </div>

      <p className="px-4 pb-4 text-xs leading-relaxed text-[#64727f]">
        Component names are illustrative guidance. The photograph
        shows the product exterior, not a verified internal cutaway.
      </p>
    </section>
  );
}
