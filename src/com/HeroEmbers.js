"use client";

import { useEffect, useRef } from "react";

/**
 * Rising steam and gold embers behind the hero, pushed aside by the cursor.
 * Plain 2D canvas (no extra dependencies). Pauses when off-screen or when the
 * tab is hidden, and renders nothing for visitors who prefer reduced motion.
 */
export default function HeroEmbers() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d");
    const parent = canvas.parentElement;
    if (!ctx || !parent) return;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let raf = 0;
    let onScreen = true;
    let particles = [];
    const mouse = { x: -9999, y: -9999 };

    const rnd = (a, b) => a + Math.random() * (b - a);

    // Pre-rendered soft steam puff.
    const puff = document.createElement("canvas");
    puff.width = puff.height = 128;
    const pctx = puff.getContext("2d");
    const grad = pctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    grad.addColorStop(0, "rgba(255,255,255,0.55)");
    grad.addColorStop(0.5, "rgba(215,226,234,0.18)");
    grad.addColorStop(1, "rgba(215,226,234,0)");
    pctx.fillStyle = grad;
    pctx.fillRect(0, 0, 128, 128);

    const spawn = (type, initial) => ({
      type,
      x: rnd(0, w),
      y: initial ? rnd(0, h) : h + rnd(10, 90),
      vx: rnd(-0.12, 0.12),
      vy: type === "ember" ? -rnd(0.25, 0.8) : -rnd(0.12, 0.3),
      r: type === "ember" ? rnd(0.8, 2.2) : rnd(60, 120),
      phase: rnd(0, Math.PI * 2),
      speed: rnd(0.015, 0.05),
      alpha: type === "ember" ? rnd(0.4, 0.95) : rnd(0.035, 0.075),
    });

    const populate = () => {
      const small = w < 768;
      const embers = small ? 22 : 46;
      const steam = small ? 6 : 12;
      particles = [
        ...Array.from({ length: steam }, () => spawn("steam", true)),
        ...Array.from({ length: embers }, () => spawn("ember", true)),
      ];
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = parent.clientWidth;
      h = parent.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      populate();
    };

    const draw = () => {
      raf = requestAnimationFrame(draw);
      if (!onScreen || document.hidden) return;

      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.phase += p.speed;

        // Gentle sideways drift plus cursor repulsion.
        p.vx += Math.sin(p.phase) * 0.004;
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        const reach = p.type === "ember" ? 130 : 200;
        if (dist < reach && dist > 0.01) {
          const push = (1 - dist / reach) * (p.type === "ember" ? 0.5 : 0.12);
          p.vx += (dx / dist) * push;
          p.vy += (dy / dist) * push * 0.6;
        }

        p.vx *= 0.985;
        p.x += p.vx;
        p.y += p.vy;

        // Ease vertical speed back to its cruising value after a push.
        const cruise = p.type === "ember" ? -0.5 : -0.2;
        p.vy += (cruise - p.vy) * 0.01;

        if (p.y < -p.r * 2 || p.x < -p.r * 2 || p.x > w + p.r * 2) {
          Object.assign(p, spawn(p.type, false));
        }

        // Fade in near the bottom, fade out toward the top.
        const t = Math.max(0, Math.min(1, p.y / h));
        const fade = Math.min(1, (1 - t) * 4) * Math.min(1, t * 2.4 + 0.15);

        if (p.type === "steam") {
          ctx.globalAlpha = p.alpha * fade * 3;
          const size = p.r * (1.3 - t * 0.3) * 2;
          ctx.drawImage(puff, p.x - size / 2, p.y - size / 2, size, size);
        } else {
          const flicker = 0.65 + Math.sin(p.phase * 3) * 0.35;
          const a = p.alpha * fade * flicker;
          ctx.globalAlpha = a * 0.28;
          ctx.fillStyle = "#d0a154";
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = a;
          ctx.fillStyle = "#ebcd91";
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
    };

    const onPointerMove = (e) => {
      if (e.pointerType && e.pointerType !== "mouse") return;
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onPointerLeave = () => {
      mouse.x = mouse.y = -9999;
    };

    const ro = new ResizeObserver(resize);
    ro.observe(parent);

    const io = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onPointerLeave);

    resize();
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("mouseleave", onPointerLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-[1] h-full w-full"
    />
  );
}
