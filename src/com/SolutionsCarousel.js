"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CategoryCard } from "@/com/ProductCard";

/**
 * Swipeable "Our Solutions" carousel — one card centered on mobile, a
 * peeking multi-card track on larger screens. Drag/swipe on touch and
 * mouse, arrow buttons, and dot pagination. No external library.
 */
export default function SolutionsCarousel({ items }) {
  const trackRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [perView, setPerView] = useState(1);
  const drag = useRef({ active: false, startX: 0, startScroll: 0 });

  const maxIndex = Math.max(0, items.length - perView);

  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      setPerView(w >= 1024 ? 3 : w >= 640 ? 2 : 1);
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  useEffect(() => {
    setIndex((i) => Math.min(i, Math.max(0, items.length - perView)));
  }, [perView, items.length]);

  const goTo = (i) => setIndex(Math.max(0, Math.min(maxIndex, i)));

  const onPointerDown = (e) => {
    drag.current = {
      active: true,
      startX: e.clientX,
      startScroll: index,
    };
    trackRef.current?.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e) => {
    if (!drag.current.active || !trackRef.current) return;
    const dx = e.clientX - drag.current.startX;
    const cardWidth = trackRef.current.offsetWidth / perView;
    trackRef.current.style.setProperty(
      "--drag",
      `${dx - drag.current.startScroll * cardWidth}px`
    );
  };

  const endDrag = (e) => {
    if (!drag.current.active || !trackRef.current) return;
    const dx = e.clientX - drag.current.startX;
    trackRef.current.style.removeProperty("--drag");
    drag.current.active = false;
    if (Math.abs(dx) > 48) {
      goTo(index + (dx < 0 ? 1 : -1));
    }
  };

  return (
    <div data-reveal="up">
      <div
        ref={trackRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        className="solutions-track flex touch-pan-y cursor-grab select-none gap-6 active:cursor-grabbing"
        style={{
          transform: `translateX(calc(-${index * (100 / perView)}% + var(--drag, 0px)))`,
        }}
      >
        {items.map((c) => (
          <div
            key={c.slug}
            className="shrink-0"
            style={{ width: `calc(${100 / perView}% - ${((perView - 1) * 24) / perView}px)` }}
          >
            <CategoryCard {...c} />
          </div>
        ))}
      </div>

      {maxIndex > 0 && (
        <div className="mt-8 flex items-center justify-center gap-5">
          <button
            type="button"
            aria-label="Previous solutions"
            onClick={() => goTo(index - 1)}
            disabled={index === 0}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[var(--line-light)] bg-white text-[var(--navy-900)] transition-all hover:border-[var(--gold-400)] hover:text-[var(--gold-500)] disabled:opacity-30"
          >
            <ChevronLeft size={17} />
          </button>

          <div className="flex items-center gap-2">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => goTo(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === index ? "w-6 bg-[var(--gold-500)]" : "w-2 bg-[var(--steel-200)] hover:bg-[var(--gold-300)]"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            aria-label="Next solutions"
            onClick={() => goTo(index + 1)}
            disabled={index === maxIndex}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[var(--line-light)] bg-white text-[var(--navy-900)] transition-all hover:border-[var(--gold-400)] hover:text-[var(--gold-500)] disabled:opacity-30"
          >
            <ChevronRight size={17} />
          </button>
        </div>
      )}
    </div>
  );
}
