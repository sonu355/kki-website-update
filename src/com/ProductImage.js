"use client";

import { useRef, useState } from "react";
import { ChefHat, ZoomIn, RotateCcw, Plus, Minus } from "lucide-react";

const ZOOM_STEPS = [1, 1.4, 1.85];

/**
 * Product detail image: clip-path reveal on load, gentle idle float, cursor
 * zoom on mouse devices, plus a drag-to-tilt "rotate" control and +/- zoom
 * buttons. There is only one product photo, so the tilt is a stylistic
 * pseudo-3D flourish (perspective + rotateY), not a real multi-angle spin.
 */
export default function ProductImage({ src, alt }) {
  const frameRef = useRef(null);
  const [zoomHover, setZoomHover] = useState(false);
  const [zoomStep, setZoomStep] = useState(0);
  const [tilt, setTilt] = useState(0);
  const drag = useRef({ active: false, startX: 0, startTilt: 0 });

  const onMove = (e) => {
    if (e.pointerType !== "mouse") return;
    const el = frameRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--zx", `${(((e.clientX - r.left) / r.width) * 100).toFixed(1)}%`);
    el.style.setProperty("--zy", `${(((e.clientY - r.top) / r.height) * 100).toFixed(1)}%`);
  };

  const onDragStart = (e) => {
    drag.current = { active: true, startX: e.clientX, startTilt: tilt };
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onDragMove = (e) => {
    if (!drag.current.active) return;
    const dx = e.clientX - drag.current.startX;
    setTilt(Math.max(-22, Math.min(22, drag.current.startTilt + dx * 0.25)));
  };
  const onDragEnd = () => {
    drag.current.active = false;
    setTilt(0);
  };

  const cycleZoom = () => setZoomStep((s) => (s + 1) % ZOOM_STEPS.length);
  const resetZoom = () => setZoomStep(0);

  // Cursor hover-zoom only applies at the base zoom level, so it never
  // compounds with the +/- zoom controls.
  const scale = ZOOM_STEPS[zoomStep] * (zoomHover && zoomStep === 0 ? 1.75 : 1);

  return (
    <div
      ref={frameRef}
      onPointerEnter={(e) => e.pointerType === "mouse" && setZoomHover(true)}
      onPointerMove={onMove}
      onPointerLeave={() => setZoomHover(false)}
      className={`pd-frame steel-texture relative flex aspect-square items-center justify-center overflow-hidden rounded-2xl border border-[var(--steel-200)] bg-gradient-to-br from-[var(--steel-100)] to-white ${
        zoomHover ? "is-zoom" : ""
      }`}
    >
      {/* corner brackets that draw in */}
      <span className="pd-corner pd-corner--tl" aria-hidden="true" />
      <span className="pd-corner pd-corner--tr" aria-hidden="true" />
      <span className="pd-corner pd-corner--bl" aria-hidden="true" />
      <span className="pd-corner pd-corner--br" aria-hidden="true" />

      {src ? (
        <>
          <div
            className="pd-float h-full w-full touch-pan-y"
            style={{ perspective: "900px" }}
            onPointerDown={onDragStart}
            onPointerMove={onDragMove}
            onPointerUp={onDragEnd}
            onPointerCancel={onDragEnd}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={alt}
              className="pd-img h-full w-full cursor-grab object-contain p-6 active:cursor-grabbing"
              style={{
                transform: `rotateY(${tilt}deg) scale(${scale})`,
                transformOrigin: "var(--zx, 50%) var(--zy, 50%)",
              }}
              draggable="false"
            />
          </div>

          <span className="pd-hint" aria-hidden="true">
            <ZoomIn size={13} /> Drag to tilt · hover to zoom
          </span>

          {/* Zoom controls, echoing a product-viewer toolbar */}
          <div className="pd-controls">
            <button
              type="button"
              aria-label="Zoom out"
              onClick={() => setZoomStep((s) => Math.max(0, s - 1))}
              disabled={zoomStep === 0}
              className="pd-control-btn"
            >
              <Minus size={14} />
            </button>
            <button
              type="button"
              aria-label="Zoom in"
              onClick={cycleZoom}
              disabled={zoomStep === ZOOM_STEPS.length - 1}
              className="pd-control-btn"
            >
              <Plus size={14} />
            </button>
            <button
              type="button"
              aria-label="Reset view"
              onClick={resetZoom}
              className="pd-control-btn"
            >
              <RotateCcw size={13} />
            </button>
          </div>
        </>
      ) : (
        <ChefHat className="h-16 w-16 text-[#c8912f]/40" />
      )}
    </div>
  );
}
