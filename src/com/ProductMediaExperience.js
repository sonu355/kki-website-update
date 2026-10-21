
"use client";

import { useEffect, useRef, useState } from "react";

import ProductVisualGallery from "@/com/ProductVisualGallery";
import ProductComponentOverview from "@/com/ProductComponentOverview";
import UniversalProduct3D, {
  has3DProduct,
} from "@/com/UniversalProduct3D";
import Refrigerator3DViewer from "@/com/Refrigerator3DViewer";

import {
  Camera,
  Box,
  Layers,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus,
  RotateCcw,
} from "lucide-react";

// ==========================================
// NORMALIZE HOTSPOT JSON
// ==========================================

function normalizeHotspots(data) {
  const source = Array.isArray(data)
    ? data
    : Array.isArray(data?.parts)
      ? data.parts
      : Array.isArray(data?.hotspots)
        ? data.hotspots
        : [];

  return source
    .map((part, index) => {
      const x = Number(part.x ?? part.position?.x);
      const y = Number(part.y ?? part.position?.y);

      if (!Number.isFinite(x) || !Number.isFinite(y)) {
        return null;
      }

      return {
        id: part.id ?? index + 1,
        name: part.name ?? part.label ?? `Part ${index + 1}`,
        description: part.description ?? "",
        x: Math.max(0, Math.min(100, x)),
        y: Math.max(0, Math.min(100, y)),
      };
    })
    .filter(Boolean);
}

// ==========================================
// FIND PRODUCT ILLUSTRATIONS
// ==========================================

function getIllustrationCandidates(slug) {
  const safeSlug = encodeURIComponent(slug);

  return [
    {
      image: `/products/illustrations/${safeSlug}.png`,
      json: `/products/illustrations/${safeSlug}.json`,
    },
    {
      image: `/Illustrations/${safeSlug}/cutaway.png`,
      json: `/Illustrations/${safeSlug}/cutaway.json`,
    },
    {
      image: `/Illustrations/${safeSlug}/exploded.png`,
      json: `/Illustrations/${safeSlug}/exploded.json`,
    },
    {
      image: `/products/diagrams/${safeSlug}.png`,
      json: `/products/diagrams/${safeSlug}.json`,
    },
  ];
}

// ==========================================
// CUTAWAY ILLUSTRATION WITH ZOOM
// ==========================================

function CutawayViewer({ src, name, hotspots }) {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [zoom, setZoom] = useState(1);

  const normalContainerRef = useRef(null);
  const expandedContainerRef = useRef(null);

  const selected =
    selectedIndex === null
      ? null
      : hotspots[selectedIndex] ?? null;

  // ------------------------------------------
  // RESET STATE WHEN IMAGE CHANGES
  // ------------------------------------------

  useEffect(() => {
    setSelectedIndex(null);
    setExpanded(false);
    setZoom(1);
  }, [src]);

  // ------------------------------------------
  // FULLSCREEN ESCAPE + SCROLL LOCK
  // ------------------------------------------

  useEffect(() => {
    if (!expanded) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setExpanded(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [expanded]);

  // ------------------------------------------
  // ZOOM ACTIONS
  // ------------------------------------------

  function updateZoom(nextValue) {
    setZoom(
      Math.max(
        1,
        Math.min(3, Number(nextValue.toFixed(2)))
      )
    );
  }

  function zoomIn() {
    updateZoom(zoom + 0.25);
  }

  function zoomOut() {
    updateZoom(zoom - 0.25);
  }

  function resetZoom() {
    setZoom(1);

    if (normalContainerRef.current) {
      normalContainerRef.current.scrollTo({
        top: 0,
        left: 0,
      });
    }

    if (expandedContainerRef.current) {
      expandedContainerRef.current.scrollTo({
        top: 0,
        left: 0,
      });
    }
  }

  // ------------------------------------------
  // MOUSE WHEEL ZOOM
  // CTRL + WHEEL TO AVOID ACCIDENTAL PAGE ZOOM
  // ------------------------------------------

  useEffect(() => {
    const containers = [
      normalContainerRef.current,
      expandedContainerRef.current,
    ].filter(Boolean);

    const handleWheel = (event) => {
      if (!event.ctrlKey) return;

      event.preventDefault();

      setZoom((current) => {
        const direction = event.deltaY < 0 ? 0.1 : -0.1;

        return Math.max(
          1,
          Math.min(
            3,
            Number((current + direction).toFixed(2))
          )
        );
      });
    };

    containers.forEach((container) => {
      container.addEventListener(
        "wheel",
        handleWheel,
        { passive: false }
      );
    });

    return () => {
      containers.forEach((container) => {
        container.removeEventListener(
          "wheel",
          handleWheel
        );
      });
    };
  }, [expanded]);

  // ------------------------------------------
  // HOTSPOT NAVIGATION
  // ------------------------------------------

  function changePart(direction) {
    if (!hotspots.length) return;

    setSelectedIndex((current) => {
      if (current === null) return 0;

      return (
        current + direction + hotspots.length
      ) % hotspots.length;
    });
  }

  // ------------------------------------------
  // ZOOM CONTROL BUTTONS
  // ------------------------------------------

  function renderZoomControls() {
    return (
      <div className="flex flex-wrap items-center justify-center gap-2 border-t border-[#ded8ce] bg-[#faf8f4] p-3">

        <button
          type="button"
          onClick={zoomOut}
          disabled={zoom <= 1}
          title="Zoom Out"
          aria-label="Zoom Out"
          className="flex items-center justify-center gap-1 rounded-lg border border-[#ded8ce] bg-white px-3 py-2 text-xs font-semibold text-[#061b2f] transition-colors hover:bg-[#f0ede7] disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Minus size={14} />
          Zoom Out
        </button>

        <span className="min-w-[55px] text-center text-xs font-bold text-[#061b2f]">
          {Math.round(zoom * 100)}%
        </span>

        <button
          type="button"
          onClick={zoomIn}
          disabled={zoom >= 3}
          title="Zoom In"
          aria-label="Zoom In"
          className="flex items-center justify-center gap-1 rounded-lg border border-[#ded8ce] bg-white px-3 py-2 text-xs font-semibold text-[#061b2f] transition-colors hover:bg-[#f0ede7] disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Plus size={14} />
          Zoom In
        </button>

        <button
          type="button"
          onClick={resetZoom}
          title="Reset Zoom"
          aria-label="Reset Zoom"
          className="flex items-center justify-center gap-1 rounded-lg bg-[#061b2f] px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#123653]"
        >
          <RotateCcw size={14} />
          Reset
        </button>

      </div>
    );
  }

  // ------------------------------------------
  // ILLUSTRATION WITH HOTSPOTS
  // ------------------------------------------

  function renderDiagram(large = false) {
    return (
      <div
        ref={large ? expandedContainerRef : normalContainerRef}
        className={`w-full overflow-auto overscroll-contain bg-white ${
          large ? "max-h-[78vh]" : "max-h-[520px]"
        }`}
      >
        <div
          className="relative mx-auto"
          style={{
            width: `${zoom * 100}%`,
            minWidth: "100%",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={`${name} cutaway illustration`}
            className="block h-auto w-full select-none"
            draggable={false}
          />

          {/* CLICKABLE COMPONENT HOTSPOTS */}
          {hotspots.map((part, index) => (
            <button
              key={`${part.id}-${index}`}
              type="button"
              onClick={() => setSelectedIndex(index)}
              title={part.name}
              aria-label={`View ${part.name}`}
              aria-pressed={selectedIndex === index}
              style={{
                left: `${part.x}%`,
                top: `${part.y}%`,
              }}
              className={`absolute z-10 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white text-[10px] font-bold shadow-lg transition-transform hover:scale-125 ${
                large ? "h-8 w-8" : "h-7 w-7"
              } ${
                selectedIndex === index
                  ? "bg-[#bd8431] text-white"
                  : "bg-[#0879d1] text-white"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    );
  }

  // ------------------------------------------
  // SELECTED COMPONENT DETAILS
  // ------------------------------------------

  function renderSelectedPart() {
    if (!selected) return null;

    return (
      <div className="border-t border-[#ded8ce] bg-[#f8f5ee] p-4">

        <p className="text-sm font-bold text-[#061b2f]">
          {selected.name}
        </p>

        {selected.description && (
          <p className="mt-1 text-xs leading-relaxed text-[#536270]">
            {selected.description}
          </p>
        )}

        <div className="mt-3 flex items-center gap-2">

          <button
            type="button"
            onClick={() => changePart(-1)}
            aria-label="Previous component"
            className="rounded-lg border border-[#ded8ce] bg-white p-2"
          >
            <ChevronLeft size={16} />
          </button>

          <button
            type="button"
            onClick={() => changePart(1)}
            aria-label="Next component"
            className="rounded-lg border border-[#ded8ce] bg-white p-2"
          >
            <ChevronRight size={16} />
          </button>

          <button
            type="button"
            onClick={() => setSelectedIndex(null)}
            className="ml-auto text-xs font-semibold text-[#061b2f] underline"
          >
            Clear Selection
          </button>

        </div>
      </div>
    );
  }

  // ==========================================
  // CUTAWAY VIEWER RENDER
  // ==========================================

  return (
    <>
      {/* NORMAL CUTAWAY VIEW */}
      <section className="overflow-hidden rounded-2xl border border-[#ded8ce] bg-white">

        {/* HEADER */}
        <div className="flex items-center justify-between gap-3 border-b border-[#ded8ce] p-4">

          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#bd8431]">
              Technical illustration
            </p>

            <h3 className="mt-1 text-sm font-bold text-[#061b2f]">
              {name}
            </h3>
          </div>

          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="flex shrink-0 items-center gap-2 rounded-lg bg-[#061b2f] px-3 py-2 text-xs font-semibold text-white"
          >
            <Maximize2 size={14} />
            Expand
          </button>

        </div>

        {/* CUTAWAY IMAGE */}
        {renderDiagram(false)}

        {/* ZOOM CONTROLS */}
        {renderZoomControls()}

        {/* SELECTED PART */}
        {renderSelectedPart()}

        {/* NO HOTSPOT DATA */}
        {hotspots.length === 0 && (
          <p className="border-t border-[#ded8ce] px-4 py-3 text-xs text-[#536270]">
            Cutaway illustration available. Component labels will appear
            when a matching hotspot JSON file is added.
          </p>
        )}

        <p className="px-4 py-3 text-xs leading-relaxed text-[#64727f]">
          Illustrative technical view. Internal details may differ
          from the actual manufactured product.
        </p>

      </section>

      {/* FULLSCREEN CUTAWAY */}
      {expanded && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${name} cutaway illustration`}
          className="fixed inset-0 z-[10000] overflow-y-auto bg-black/90 p-3 sm:p-6"
        >
          <div className="mx-auto w-full max-w-6xl">

            {/* FULLSCREEN HEADER */}
            <div className="mb-4 flex items-center justify-between gap-3 text-white">

              <h3 className="text-sm font-semibold">
                {name} — Cutaway View
              </h3>

              <button
                type="button"
                onClick={() => setExpanded(false)}
                aria-label="Close illustration"
                className="rounded-lg bg-white/15 p-2 hover:bg-white/25"
              >
                <X size={20} />
              </button>

            </div>

            <div className="overflow-hidden rounded-xl bg-white">

              {/* FULLSCREEN IMAGE */}
              {renderDiagram(true)}

              {/* FULLSCREEN ZOOM CONTROLS */}
              {renderZoomControls()}

              {/* SELECTED COMPONENT */}
              {renderSelectedPart()}

            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ==========================================
// MAIN PRODUCT MEDIA EXPERIENCE
// ==========================================

export default function ProductMediaExperience({
  slug,
  name,
  image,
}) {
  const [mode, setMode] = useState("photo");
  const [cutawayUrl, setCutawayUrl] = useState(null);
  const [hotspots, setHotspots] = useState([]);

  const supports3D = has3DProduct(slug);
  const supportsCutaway = Boolean(cutawayUrl);

  // ------------------------------------------
  // AUTO-DETECT ILLUSTRATIONS
  // ------------------------------------------

  useEffect(() => {
    let cancelled = false;

    setMode("photo");
    setCutawayUrl(null);
    setHotspots([]);

    const candidates = getIllustrationCandidates(slug);

    async function findCutaway() {
      for (const candidate of candidates) {
        if (cancelled) return;

        const imageExists = await new Promise((resolve) => {
          const probe = new window.Image();

          probe.onload = () => resolve(true);
          probe.onerror = () => resolve(false);
          probe.src = candidate.image;
        });

        if (!imageExists) continue;
        if (cancelled) return;

        setCutawayUrl(candidate.image);

        try {
          const response = await fetch(candidate.json);

          if (response.ok) {
            const data = await response.json();

            if (!cancelled) {
              setHotspots(normalizeHotspots(data));
            }
          }
        } catch {
          // Illustration can display without hotspot JSON.
        }

        return;
      }
    }

    findCutaway();

    return () => {
      cancelled = true;
    };
  }, [slug]);

  // ------------------------------------------
  // STANDARD THREE TABS
  // ------------------------------------------

  const tabs = [
    {
      id: "photo",
      label: "Product Photo",
      Icon: Camera,
      available: true,
    },
    {
      id: "3d",
      label: "Interactive 3D",
      Icon: Box,
      available: supports3D,
    },
    {
        id: "cutaway",
        label: supportsCutaway ? "Cutaway View" : "Component Overview",
        Icon: Layers,
        available: true,
    },
  ];

  const activeMode =
    mode === "3d" && !supports3D
      ? "photo"
        : mode;

  // ==========================================
  // COMPONENT RENDER
  // ==========================================

  return (
    <div className="space-y-3">

      {/* TOP THREE VIEWING TABS */}
      <div
        role="group"
        aria-label="Product viewing modes"
        className="grid grid-cols-3 gap-1.5 rounded-xl border border-[#ded8ce] bg-white p-1.5 sm:gap-2 sm:p-2"
      >
        {tabs.map(({ id, label, Icon, available }) => (
          <button
            key={id}
            type="button"
            disabled={!available}
            onClick={() => setMode(id)}
            aria-pressed={activeMode === id}
            title={
              available
                ? label
                : id === "cutaway"
                  ? "Cutaway illustration not yet available"
                  : "3D model not yet available"
            }
            className={`flex min-h-11 min-w-0 flex-col items-center justify-center gap-1 rounded-lg px-1 py-2 text-center text-[10px] font-bold transition-colors sm:flex-row sm:gap-2 sm:px-2 sm:text-xs ${
              !available
                ? "cursor-not-allowed bg-[#f6f2ea] text-[#a6a19a]"
                : activeMode === id
                  ? "bg-[#061b2f] text-white shadow-sm"
                  : "bg-[#f6f2ea] text-[#061b2f] hover:bg-[#eae3d7]"
            }`}
          >
            <Icon size={15} className="shrink-0" />
            <span>{label}</span>
          </button>
        ))}
      </div>

      {/* PRODUCT PHOTO */}
      {activeMode === "photo" && (
        <ProductVisualGallery
          key={`${slug}-photo`}
          src={image}
          alt={name}
          slug={slug}
          showViewSwitcher={false}
        />
      )}

      {/* INTERACTIVE 3D */}
      {activeMode === "3d" && supports3D && (
        slug === "four-door-vertical-refrigerator" ? (
          <Refrigerator3DViewer key={slug} />
        ) : (
          <UniversalProduct3D
            key={slug}
            slug={slug}
            name={name}
          />
        )
      )}

      {/* CUTAWAY ILLUSTRATION */}
      {activeMode === "cutaway" && supportsCutaway && (
        <CutawayViewer
          key={`${slug}-${cutawayUrl}`}
          src={cutawayUrl}
          name={name}
          hotspots={hotspots}
        />
      )}{activeMode === "cutaway" && (
            supportsCutaway ? (
                <CutawayViewer
                key={`${slug}-${cutawayUrl}`}
                src={cutawayUrl}
                name={name}
                hotspots={hotspots}
                />
            ) : (
                <ProductComponentOverview
                key={slug}
                slug={slug}
                name={name}
                image={image}
                />
            )
        )}

      {/* CURRENT VIEW INFORMATION */}
      <p className="text-center text-xs leading-relaxed text-[#64727f]">
        {activeMode === "photo"
          ? "Original product photograph."
          : activeMode === "3d"
            ? "Drag to rotate, open available parts, and explore the conceptual 3D model."
            : "Use Zoom + / Zoom −, Expand, and numbered markers to inspect the cutaway illustration."}
      </p>

    </div>
  );
}
