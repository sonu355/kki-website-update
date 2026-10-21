"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowUp } from "lucide-react";

/**
 * Sitewide motion layer (mounted once in layout.js).
 *
 *  - Scroll reveals for any element carrying `data-reveal`
 *    (values: "up" (default) | "left" | "right" | "zoom").
 *    Elements revealed in the same scroll batch are staggered automatically.
 *  - Pointer tilt + gold spotlight on cards (.category-card, .card-glow, [data-tilt]).
 *  - Magnetic pull on the .premium-*-btn buttons.
 *  - Gold sweep line on every route change.
 *  - Back-to-top button with a scroll-progress ring.
 *
 * Everything is skipped for visitors who prefer reduced motion, and the tilt /
 * magnetic effects are skipped on touch devices.
 */

const REVEAL = "[data-reveal]";
const TILT = ".category-card, .card-glow, [data-tilt]";
const MAGNET =
  ".premium-primary-btn, .premium-secondary-btn, .premium-outline-btn, .premium-dark-ghost-btn";

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ------------------------------------------------------------------ */
/* Scroll reveals                                                       */
/* ------------------------------------------------------------------ */
function RevealEngine({ pathname }) {
  useEffect(() => {
    const html = document.documentElement;

    // Reduced motion: the CSS never hides anything, nothing to do.
    if (!html.classList.contains("js-motion")) return;

    const seen = new WeakSet();
    const isAdmin = pathname?.startsWith("/admin");

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) =>
              a.boundingClientRect.top - b.boundingClientRect.top ||
              a.boundingClientRect.left - b.boundingClientRect.left
          );

        visible.forEach((entry, i) => {
          const el = entry.target;
          io.unobserve(el);

          const delay = Math.min(i, 7) * 70;
          el.style.transitionDelay = `${delay}ms`;
          el.classList.add("is-in");

          // Hand the element back to its own hover styles once revealed.
          setTimeout(() => {
            el.removeAttribute("data-reveal");
            el.style.transitionDelay = "";
          }, delay + 1000);
        });
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0 }
    );

    const scan = () => {
      // Inner-page sections with no reveal markup of their own get their main
      // container revealed automatically. The homepage has its own GSAP layer.
      if (!isAdmin) {
        document
          .querySelectorAll("main > section:not(.hero-grid) > div")
          .forEach((el) => {
            if (seen.has(el) || el.hasAttribute("data-reveal")) return;
            if (el.className.toString().includes("absolute")) return;
            if (el.closest("[data-home-reveal],[data-home-grid]")) return;
            if (el.closest("section")?.querySelector(REVEAL)) return;
            el.setAttribute("data-reveal", "up");
          });
      }

      document.querySelectorAll(REVEAL).forEach((el) => {
        if (seen.has(el)) return;
        seen.add(el);

        // Homepage sections are animated by HomeExperience (GSAP): skip them.
        if (el.closest("[data-home-reveal],[data-home-grid]") || isAdmin) {
          el.removeAttribute("data-reveal");
          return;
        }
        io.observe(el);
      });
    };

    let started = false;
    let raf = 0;
    const scheduleScan = () => {
      if (!started || raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        scan();
      });
    };

    const start = () => {
      if (started) return;
      started = true;
      scan();
    };

    // Content that arrives later (product grids fetched on the client, etc.).
    const mo = new MutationObserver(scheduleScan);
    mo.observe(document.body, { childList: true, subtree: true });

    // On a first full page load, wait for the brand intro to finish so the
    // above-the-fold reveals are actually seen.
    let fallback = 0;
    if (html.classList.contains("intro-pending")) {
      window.addEventListener("kki:intro-done", start, { once: true });
      fallback = window.setTimeout(start, 4700);
    } else {
      start();
    }

    return () => {
      window.removeEventListener("kki:intro-done", start);
      window.clearTimeout(fallback);
      cancelAnimationFrame(raf);
      mo.disconnect();
      io.disconnect();
    };
  }, [pathname]);

  return null;
}

/* ------------------------------------------------------------------ */
/* Pointer effects: card tilt + spotlight, magnetic buttons             */
/* ------------------------------------------------------------------ */
function PointerEffects() {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let raf = 0;
    let lastEvent = null;
    let activeCard = null;
    let activeBtn = null;

    const resetCard = (el) => {
      if (!el) return;
      el.style.setProperty("--rx", "0deg");
      el.style.setProperty("--ry", "0deg");
      el.style.setProperty("--px", "0");
      el.style.setProperty("--py", "0");
    };
    const resetBtn = (el) => {
      if (!el) return;
      el.style.setProperty("--tx", "0px");
      el.style.setProperty("--ty", "0px");
    };

    const frame = () => {
      raf = 0;
      const ev = lastEvent;
      if (!ev || !(ev.target instanceof Element)) return;

      const card = ev.target.closest(TILT);
      if (activeCard && activeCard !== card) resetCard(activeCard);
      activeCard = card;

      if (card) {
        const r = card.getBoundingClientRect();
        const px = (ev.clientX - r.left) / r.width;
        const py = (ev.clientY - r.top) / r.height;
        card.style.setProperty("--mx", `${(px * 100).toFixed(1)}%`);
        card.style.setProperty("--my", `${(py * 100).toFixed(1)}%`);
        card.style.setProperty("--px", ((px - 0.5) * 2).toFixed(3));
        card.style.setProperty("--py", ((py - 0.5) * 2).toFixed(3));
        card.style.setProperty("--ry", `${((px - 0.5) * 6).toFixed(2)}deg`);
        card.style.setProperty("--rx", `${((0.5 - py) * 5).toFixed(2)}deg`);
      }

      const btn = ev.target.closest(MAGNET);
      if (activeBtn && activeBtn !== btn) resetBtn(activeBtn);
      activeBtn = btn;

      if (btn) {
        const r = btn.getBoundingClientRect();
        const dx = ev.clientX - (r.left + r.width / 2);
        const dy = ev.clientY - (r.top + r.height / 2);
        btn.style.setProperty("--tx", `${(dx * 0.16).toFixed(1)}px`);
        btn.style.setProperty("--ty", `${(dy * 0.28).toFixed(1)}px`);
      }
    };

    const onMove = (ev) => {
      lastEvent = ev;
      if (!raf) raf = requestAnimationFrame(frame);
    };

    const onLeaveWindow = () => {
      resetCard(activeCard);
      resetBtn(activeBtn);
      activeCard = null;
      activeBtn = null;
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeaveWindow);

    return () => {
      document.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeaveWindow);
      cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}

/* ------------------------------------------------------------------ */
/* Back to top with scroll progress ring                                */
/* ------------------------------------------------------------------ */
const RING = 2 * Math.PI * 21;

function BackToTop() {
  const [state, setState] = useState({ p: 0, show: false });

  useEffect(() => {
    let raf = 0;

    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const y = window.scrollY;
      const p = max > 0 ? Math.min(1, y / max) : 0;
      const next = { p: Math.round(p * 500) / 500, show: y > 520 };
      setState((prev) =>
        prev.p === next.p && prev.show === next.show ? prev : next
      );
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <button
      type="button"
      aria-label="Back to top"
      aria-hidden={!state.show}
      tabIndex={state.show ? 0 : -1}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-6 left-5 z-[80] grid h-12 w-12 place-items-center rounded-full bg-[var(--navy-950)] text-[var(--gold-300)] shadow-lg shadow-black/25 transition-all duration-300 hover:-translate-y-1 hover:text-white ${
        state.show
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <svg
        viewBox="0 0 48 48"
        className="pointer-events-none absolute inset-0 h-full w-full -rotate-90"
        aria-hidden="true"
      >
        <circle
          cx="24"
          cy="24"
          r="21"
          fill="none"
          stroke="rgba(235,205,145,0.22)"
          strokeWidth="2"
        />
        <circle
          cx="24"
          cy="24"
          r="21"
          fill="none"
          stroke="var(--gold-400)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={RING}
          strokeDashoffset={RING * (1 - state.p)}
        />
      </svg>
      <ArrowUp size={18} />
    </button>
  );
}

/* ------------------------------------------------------------------ */

export default function SiteMotion() {
  const pathname = usePathname();

  return (
    <>
      {/* Re-mounts on each route change, replaying the sweep. */}
      <div key={pathname} className="route-sweep" aria-hidden="true" />
      <RevealEngine pathname={pathname} />
      <PointerEffects />
      <BackToTop />
    </>
  );
}
