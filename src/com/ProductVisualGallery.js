
"use client";

import { useEffect, useState } from "react";
import {
  ChefHat,
  Expand,
  Image as ImageIcon,
  Layers3,
  X,
} from "lucide-react";
import ProductImage from "@/com/ProductImage";

const illustrationPaths = (slug) => [
  `/products/illustrations/${slug}.png`,
  `/Illustrations/${slug}/cutaway.png`,
  `/Illustrations/${slug}/exploded.png`,
  `/products/diagrams/${slug}.png`,
];

function findFirstAvailable(paths, isCancelled, onFound) {
  const tryPath = (index) => {
    if (isCancelled() || index >= paths.length) return;

    const probe = new window.Image();

    probe.onload = () => {
      if (!isCancelled()) onFound(paths[index]);
    };

    probe.onerror = () => {
      tryPath(index + 1);
    };

    probe.src = paths[index];
  };

  tryPath(0);
}

export default function ProductVisualGallery({
  src,
  alt,
  slug,
  showViewSwitcher = true,
}) {
  const [diagram, setDiagram] = useState(null);
  const [view, setView] = useState("photo");
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    let cancelled = false;

    setDiagram(null);
    setView("photo");
    setFullscreen(false);

    if (slug && showViewSwitcher) {
      findFirstAvailable(
        illustrationPaths(slug),
        () => cancelled,
        setDiagram
      );
    }

    return () => {
      cancelled = true;
    };
  }, [slug, showViewSwitcher]);

  useEffect(() => {
    if (!fullscreen) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setFullscreen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [fullscreen]);

  const showingDiagram =
    showViewSwitcher && view === "diagram" && Boolean(diagram);

  const activeImage = showingDiagram ? diagram : src;

  return (
    <section
      aria-label={`${alt} product images`}
      className="space-y-3"
    >
      {showingDiagram ? (
        <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-2xl border border-[var(--steel-200)] bg-white p-3 shadow-[0_12px_32px_rgba(6,27,47,0.06)] sm:p-5">
          <span className="pointer-events-none absolute left-4 top-4 z-10 rounded-full border border-[var(--gold-400)]/40 bg-white/95 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wide text-[var(--navy-950)] shadow-sm">
            Technical illustration
          </span>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={diagram}
            alt={`${alt} technical cutaway or exploded view`}
            className="max-h-full max-w-full object-contain"
          />

          <button
            type="button"
            onClick={() => setFullscreen(true)}
            className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full bg-[var(--navy-950)] px-3 py-2 text-xs font-semibold text-white shadow-lg hover:bg-[var(--navy-900)]"
            aria-label="Expand technical illustration"
          >
            <Expand size={15} />
            Expand
          </button>
        </div>
      ) : (
        <ProductImage
          key={slug}
          src={src}
          alt={alt}
        />
      )}

      {/* Standalone gallery only: hide inside Version 3 */}
      {showViewSwitcher && diagram && (
        <div
          className="grid grid-cols-2 gap-2 rounded-xl border border-[var(--line-light)] bg-white p-2"
          role="group"
          aria-label="Product image views"
        >
          <button
            type="button"
            aria-pressed={!showingDiagram}
            onClick={() => setView("photo")}
            className={`flex items-center justify-center gap-2 rounded-lg px-3 py-3 text-xs font-bold transition-colors ${
              !showingDiagram
                ? "bg-[var(--navy-950)] text-white"
                : "text-[var(--navy-900)] hover:bg-[var(--surface-cream)]"
            }`}
          >
            <ImageIcon size={16} />
            Product photo
          </button>

          <button
            type="button"
            aria-pressed={showingDiagram}
            onClick={() => setView("diagram")}
            className={`flex items-center justify-center gap-2 rounded-lg px-3 py-3 text-xs font-bold transition-colors ${
              showingDiagram
                ? "bg-[var(--navy-950)] text-white"
                : "text-[var(--navy-900)] hover:bg-[var(--surface-cream)]"
            }`}
          >
            <Layers3 size={16} />
            Inside / exploded view
          </button>
        </div>
      )}

      {!src && !diagram && (
        <div className="flex items-center gap-2 text-xs text-[var(--steel-500)]">
          <ChefHat size={14} />
          Product photo not yet available.
        </div>
      )}

      {fullscreen && activeImage && (
        <div
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-[rgba(4,16,29,0.93)] p-3 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={`${alt} enlarged illustration`}
          onClick={() => setFullscreen(false)}
        >
          <button
            type="button"
            autoFocus
            onClick={() => setFullscreen(false)}
            className="absolute right-4 top-4 z-10 flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[var(--navy-950)]"
            aria-label="Close enlarged illustration"
          >
            <X size={18} />
            Close
          </button>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={activeImage}
            alt={`${alt} enlarged view`}
            onClick={(event) => event.stopPropagation()}
            className="max-h-[88vh] max-w-[96vw] object-contain"
          />
        </div>
      )}
    </section>
  );
}
