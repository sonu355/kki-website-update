"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

/**
 * Premium entry animation for the Kitchen King brand.
 *
 * The logo enters in a CSS/GSAP 3D scene, then docks into the real navbar
 * logo position. It runs once per full page load; client-side route changes
 * do not replay it because RootLayout remains mounted.
 */
export default function BrandIntro() {
  const [finished, setFinished] = useState(false);
  const overlayRef = useRef(null);
  const dockRef = useRef(null);
  const logo3dRef = useRef(null);
  const shadowRef = useRef(null);
  const accentRef = useRef(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    let raf1 = 0;
    let raf2 = 0;
    let target = null;
    let disposed = false;

    const html = document.documentElement;
    const previousOverflow = html.style.overflow;

    const restorePage = () => {
      html.style.overflow = previousOverflow;
      if (target) {
        target.style.visibility = "";
        target.style.opacity = "";
      }
    };

    // Lets the hero / reveal animations start only once the intro is really over.
    const markIntroDone = () => {
      html.classList.remove("intro-pending");
      window.dispatchEvent(new Event("kki:intro-done"));
    };

    const finishImmediately = () => {
      if (disposed) return;
      timelineRef.current?.kill();
      restorePage();
      markIntroDone();
      setFinished(true);
    };

    const runIntro = () => {
      if (disposed) return;

      const overlay = overlayRef.current;
      const dock = dockRef.current;
      const logo3d = logo3dRef.current;
      const shadow = shadowRef.current;
      const accent = accentRef.current;
      target = document.querySelector("[data-kki-nav-logo]");

      if (!overlay || !dock || !logo3d || !target) {
        finishImmediately();
        return;
      }

      // Accessibility: avoid a forced animation for visitors who request less motion.
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        finishImmediately();
        return;
      }

      html.style.overflow = "hidden";
      target.style.visibility = "hidden";

      gsap.set(overlay, { autoAlpha: 1 });
      gsap.set(dock, {
        x: 0,
        y: 0,
        scale: 1,
        transformOrigin: "50% 50%",
      });
      gsap.set(logo3d, {
        autoAlpha: 0,
        scale: 0.46,
        rotationY: -78,
        rotationX: 16,
        rotationZ: -3,
        z: -240,
        transformOrigin: "50% 50%",
        transformPerspective: 1400,
        force3D: true,
      });
      gsap.set(shadow, { autoAlpha: 0, scaleX: 0.35, scaleY: 0.55 });
      gsap.set(accent, { autoAlpha: 0, scale: 0.7 });

      const dockIntoNavbar = () => {
        if (disposed) return;

        const sourceRect = dock.getBoundingClientRect();
        const targetRect = target.getBoundingClientRect();

        const sourceCenterX = sourceRect.left + sourceRect.width / 2;
        const sourceCenterY = sourceRect.top + sourceRect.height / 2;
        const targetCenterX = targetRect.left + targetRect.width / 2;
        const targetCenterY = targetRect.top + targetRect.height / 2;
        const scale = Math.max(0.08, targetRect.width / sourceRect.width);

        const x = targetCenterX - sourceCenterX;
        const y = targetCenterY - sourceCenterY;

        const dockTimeline = gsap.timeline();
        dockTimeline
          .to(accent, { autoAlpha: 0, scale: 1.15, duration: 0.28, ease: "power2.in" }, 0)
          .to(shadow, { autoAlpha: 0, scaleX: 0.2, duration: 0.34, ease: "power2.in" }, 0)
          .to(
            dock,
            {
              x,
              y,
              scale,
              duration: 1.02,
              ease: "expo.inOut",
              force3D: true,
            },
            0
          )
          .to(
            logo3d,
            {
              rotationY: 0,
              rotationX: 0,
              rotationZ: 0,
              z: 0,
              duration: 0.72,
              ease: "power3.inOut",
            },
            0.08
          )
          .add(() => {
            // Swap the moving intro logo for the real navbar image at the exact
            // same location, then remove the intro layer.
            target.style.visibility = "visible";
            target.style.opacity = "1";
          }, 0.88)
          .to(overlay, { autoAlpha: 0, duration: 0.34, ease: "power2.out" }, 0.88)
          .add(() => {
            restorePage();
            if (!disposed) {
              markIntroDone();
              setFinished(true);
            }
          });
      };

      const tl = gsap.timeline({ defaults: { overwrite: "auto" } });
      timelineRef.current = tl;

      tl.to(accent, { autoAlpha: 1, scale: 1, duration: 0.6, ease: "power2.out" }, 0.08)
        .to(shadow, { autoAlpha: 0.28, scaleX: 1, scaleY: 1, duration: 0.78, ease: "power3.out" }, 0.1)
        .to(
          logo3d,
          {
            autoAlpha: 1,
            scale: 1,
            rotationY: 14,
            rotationX: -4,
            rotationZ: 0,
            z: 78,
            duration: 0.98,
            ease: "power4.out",
          },
          0.08
        )
        .to(
          logo3d,
          {
            rotationY: -7,
            rotationX: 2.5,
            z: 30,
            duration: 0.34,
            ease: "sine.inOut",
          },
          0.88
        )
        .to(
          logo3d,
          {
            rotationY: 0,
            rotationX: 0,
            z: 0,
            duration: 0.36,
            ease: "power2.out",
          },
          1.18
        )
        .add(dockIntoNavbar, 1.5);
    };

    // Two animation frames avoid React development-mode effect probing and
    // ensure the navbar has completed layout before its coordinates are read.
    raf1 = window.requestAnimationFrame(() => {
      raf2 = window.requestAnimationFrame(runIntro);
    });

    return () => {
      disposed = true;
      window.cancelAnimationFrame(raf1);
      window.cancelAnimationFrame(raf2);
      timelineRef.current?.kill();
      restorePage();
    };
  }, []);

  if (finished) return null;

  return (
    <div ref={overlayRef} className="brand-intro" aria-hidden="true">
      <div ref={accentRef} className="brand-intro__accent" />
      <div ref={dockRef} className="brand-intro__dock">
        <div className="brand-intro__stage">
          <img
            ref={logo3dRef}
            src="/logo.PNG"
            alt=""
            className="brand-intro__logo"
            draggable="false"
          />
        </div>
        <div ref={shadowRef} className="brand-intro__shadow" />
      </div>
    </div>
  );
}
