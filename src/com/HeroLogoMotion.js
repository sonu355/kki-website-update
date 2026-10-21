"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function HeroLogoMotion() {
  const wrapperRef = useRef(null);
  const stageRef = useRef(null);
  const logoRef = useRef(null);
  const shineRef = useRef(null);
  const shadowRef = useRef(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const stage = stageRef.current;
    const logo = logoRef.current;
    const shine = shineRef.current;
    const shadow = shadowRef.current;

    if (!wrapper || !stage || !logo || !shine || !shadow) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion) {
      gsap.set(stage, { opacity: 1, y: 0, rotateX: 0, rotateY: 0, scale: 1 });
      return;
    }

    gsap.set(stage, {
      transformPerspective: 1400,
      transformStyle: "preserve-3d",
      transformOrigin: "50% 50%",
      willChange: "transform",
    });

    gsap.set(logo, {
      transformStyle: "preserve-3d",
      transformOrigin: "50% 50%",
      willChange: "transform",
    });

    // On a first page load the brand intro covers the hero, so hold this
    // entrance until the intro reports it has finished.
    const introPending =
      document.documentElement.classList.contains("intro-pending");
    const intro = gsap.timeline({ delay: 0.15, paused: introPending });
    const playIntro = () => intro.play();
    if (introPending) {
      window.addEventListener("kki:intro-done", playIntro, { once: true });
    }

    intro.fromTo(
      stage,
      {
        autoAlpha: 0,
        y: 34,
        rotateX: 8,
        rotateY: -10,
        scale: 0.95,
      },
      {
        autoAlpha: 1,
        y: 0,
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        duration: 1,
        ease: "power3.out",
      }
    );

    intro.fromTo(
      logo,
      {
        scale: 0.94,
        z: -20,
      },
      {
        scale: 1,
        z: 28,
        duration: 0.9,
        ease: "power3.out",
      },
      0.1
    );

    /* floating motion */
    gsap.to(stage, {
      y: -10,
      duration: 3.6,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 1,
    });

    gsap.to(logo, {
      y: -6,
      scale: 1.01,
      duration: 3.2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 1,
    });

    gsap.to(shadow, {
      scaleX: 0.88,
      opacity: 0.16,
      duration: 3.6,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 1,
    });

    /* metallic sweep */
    gsap.fromTo(
      shine,
      {
        xPercent: -220,
        opacity: 0,
      },
      {
        keyframes: [
          { opacity: 0, duration: 0.08 },
          { opacity: 0.34, duration: 0.22 },
          { opacity: 0, duration: 0.75 },
        ],
        xPercent: 420,
        duration: 1.2,
        repeat: -1,
        repeatDelay: 4.2,
        ease: "power2.inOut",
        delay: 1.5,
      }
    );

    const onPointerMove = (event) => {
      if (event.pointerType !== "mouse") return;

      const rect = wrapper.getBoundingClientRect();

      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      gsap.to(stage, {
        rotateY: x * 8,
        rotateX: -y * 6,
        duration: 0.45,
        ease: "power2.out",
        overwrite: "auto",
      });

      gsap.to(logo, {
        x: x * 8,
        y: y * 5 - 6,
        rotateY: x * 3,
        rotateX: -y * 2,
        duration: 0.45,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    const onPointerLeave = () => {
      gsap.to(stage, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.7,
        ease: "power3.out",
        overwrite: "auto",
      });

      gsap.to(logo, {
        x: 0,
        rotateX: 0,
        rotateY: 0,
        duration: 0.7,
        ease: "power3.out",
        overwrite: "auto",
      });
    };

    wrapper.addEventListener("pointermove", onPointerMove);
    wrapper.addEventListener("pointerleave", onPointerLeave);

    return () => {
      wrapper.removeEventListener("pointermove", onPointerMove);
      wrapper.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("kki:intro-done", playIntro);
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="relative flex w-full items-center justify-center"
      style={{ perspective: "1400px" }}
    >
      <div
        ref={stageRef}
        className="relative flex min-h-[420px] w-full items-center justify-center sm:min-h-[480px] lg:min-h-[560px]"
      >
        {/* soft ambient glow behind logo */}
        <div
          className="
            pointer-events-none absolute left-1/2 top-1/2
            h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2
            rounded-full bg-[radial-gradient(circle,rgba(212,170,98,0.12),transparent_60%)]
            blur-[40px]
          "
        />

        {/* subtle navy glow */}
        <div
          className="
            pointer-events-none absolute left-1/2 top-1/2
            h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2
            rounded-full bg-[radial-gradient(circle,rgba(10,49,86,0.35),transparent_65%)]
            blur-[50px]
          "
        />

        {/* moving shine */}
        <div
          ref={shineRef}
          className="
            pointer-events-none absolute -left-[20%] top-[8%] z-20
            h-[82%] w-[18%] -skew-x-[16deg]
            bg-gradient-to-r from-transparent via-white/35 to-transparent
            blur-[6px]
          "
        />

        {/* logo */}
        <div
          ref={logoRef}
          className="relative z-10 flex items-center justify-center"
        >
          <Image
            src="/logo.PNG"
            alt="Kitchen King Industries"
            width={1000}
            height={1100}
            priority
            className="
              h-auto w-[88%] max-w-[500px] object-contain
              drop-shadow-[0_24px_30px_rgba(0,0,0,0.35)]
            "
          />
        </div>

        {/* soft floor shadow */}
        <div
          ref={shadowRef}
          className="
            pointer-events-none absolute bottom-[10%] left-1/2
            h-6 w-[52%] -translate-x-1/2 rounded-full
            bg-black/20 blur-2xl
          "
        />
      </div>
    </div>
  );
}