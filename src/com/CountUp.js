"use client";

import { useEffect, useRef, useState } from "react";

const GLYPHS = "ABCDEFGHJKLMNPQRSTUVWXYZ0123456789";

/**
 * Stat value that animates once when scrolled into view.
 * Numbers count up; text values (e.g. "SS304") decode left to right.
 * Server markup is the final value, so it is correct without JavaScript.
 */
export default function CountUp({ value, duration = 1400 }) {
  const ref = useRef(null);
  const [text, setText] = useState(String(value));

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const final = String(value);
    const target = parseFloat(final);
    const numeric = /^\d+(\.\d+)?$/.test(final);
    let raf = 0;

    // Lock the width so scrambling glyphs never shift the layout.
    el.style.minWidth = `${el.offsetWidth}px`;

    const run = () => {
      const t0 = performance.now();
      const tick = (now) => {
        const p = Math.min(1, (now - t0) / duration);
        const e = 1 - Math.pow(1 - p, 3);

        if (numeric) {
          setText(
            Number.isInteger(target)
              ? String(Math.round(target * e))
              : (target * e).toFixed(1)
          );
        } else {
          const settled = Math.floor(e * final.length);
          setText(
            final
              .split("")
              .map((c, i) =>
                i < settled || c === " " || c === "-"
                  ? c
                  : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
              )
              .join("")
          );
        }

        if (p < 1) raf = requestAnimationFrame(tick);
        else setText(final);
      };
      raf = requestAnimationFrame(tick);
    };

    let started = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          started = true;
          io.disconnect();
          run();
        }
      },
      { threshold: 0.6 }
    );
    io.observe(el);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, duration]);

  return (
    <span
      ref={ref}
      aria-label={String(value)}
      className="inline-block tabular-nums"
    >
      <span aria-hidden="true">{text}</span>
    </span>
  );
}
