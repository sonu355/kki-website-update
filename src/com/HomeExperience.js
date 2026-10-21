"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function HomeExperience() {
  const progressRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      // =====================================================
      // PAGE SCROLL PROGRESS
      // =====================================================

      gsap.to(progressRef.current, {
        scaleX: 1,
        ease: "none",

        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.3,
        },
      });

      // =====================================================
      // GENERAL SECTION REVEALS
      // =====================================================

      gsap.utils.toArray("[data-home-reveal]").forEach((element) => {
        gsap.fromTo(
          element,
          {
            y: 55,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",

            scrollTrigger: {
              trigger: element,
              start: "top 84%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // =====================================================
      // STAGGERED CARDS
      // =====================================================

      gsap.utils.toArray("[data-home-grid]").forEach((grid) => {
        const cards = grid.querySelectorAll("[data-home-card]");

        if (!cards.length) return;

        gsap.fromTo(
          cards,
          {
            y: 45,
            opacity: 0,
            scale: 0.97,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,

            duration: 0.75,
            stagger: 0.1,
            ease: "power3.out",

            scrollTrigger: {
              trigger: grid,
              start: "top 82%",
            },
          }
        );
      });

      // =====================================================
      // PROCESS STEPS
      // =====================================================

      const processSteps = gsap.utils.toArray(
        "[data-process-step]"
      );

      if (processSteps.length) {
        gsap.fromTo(
          processSteps,
          {
            y: 45,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,

            duration: 0.75,
            stagger: 0.16,
            ease: "power3.out",

            scrollTrigger: {
              trigger: "[data-process]",
              start: "top 75%",
            },
          }
        );
      }

      // =====================================================
      // PARALLAX ELEMENTS
      // =====================================================

      gsap.utils.toArray("[data-parallax]").forEach((element) => {
        const strength = Number(
          element.dataset.parallax || 40
        );

        gsap.fromTo(
          element,
          {
            y: -strength,
          },
          {
            y: strength,

            ease: "none",

            scrollTrigger: {
              trigger: element,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });

      // =====================================================
      // FLOATING ELEMENTS
      // =====================================================

      gsap.utils.toArray("[data-float]").forEach((element, index) => {
        gsap.to(element, {
          y: index % 2 === 0 ? -8 : -12,

          duration: 2.7 + index * 0.18,

          repeat: -1,
          yoyo: true,

          ease: "sine.inOut",
        });
      });
    });

    // =======================================================
    // MOUSE GLOW
    // =======================================================

    const handlePointerMove = (event) => {
      if (!glowRef.current) return;

      gsap.to(glowRef.current, {
        x: event.clientX,
        y: event.clientY,

        duration: 0.65,

        ease: "power3.out",
        overwrite: "auto",
      });
    };

    window.addEventListener(
      "pointermove",
      handlePointerMove
    );

    return () => {
      window.removeEventListener(
        "pointermove",
        handlePointerMove
      );

      ctx.revert();

      ScrollTrigger.getAll().forEach((trigger) =>
        trigger.kill()
      );
    };
  }, []);

  return (
    <>
      {/* scroll progress */}
      <div
        ref={progressRef}
        className="
          pointer-events-none
          fixed
          left-0
          top-0
          z-[9999]
          h-[3px]
          w-full
          origin-left
          scale-x-0
          bg-[var(--gold-500)]
        "
      />

      {/* mouse glow */}
      <div
        ref={glowRef}
        className="
          pointer-events-none
          fixed
          left-0
          top-0
          z-[5]
          hidden
          h-[420px]
          w-[420px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full

          bg-[radial-gradient(
            circle,
            rgba(208,161,84,0.08),
            rgba(208,161,84,0.025)_35%,
            transparent_70%
          )]

          blur-xl

          lg:block
        "
      />
    </>
  );
}