
"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Download,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import HeroEmbers from "./HeroEmbers";
import HeroEquipment3D from "./HeroEquipment3D";
import { PRODUCT_CATEGORIES } from "./SiteData";

const LINE_ONE = "Precision engineered for".split(" ");
const LINE_TWO = "serious kitchens.".split(" ");

function Words({ words, offset = 0, className = "" }) {
  return words.map((word, i) => (
    <React.Fragment key={`${word}-${i}`}>
      <span className="hero-mask">
        <span
          className={`hero-word ${className}`}
          style={{ "--i": offset + i }}
        >
          {word}
        </span>
      </span>{" "}
    </React.Fragment>
  ));
}

export default function Hero3D() {
  return (
    <section className="relative overflow-hidden bg-[var(--navy-950)] pt-[138px] md:pt-[154px]">
      <div className="absolute inset-0 hero-grid opacity-30" />

      <HeroEmbers />

      <div className="pointer-events-none absolute -right-40 top-20 h-[34rem] w-[34rem] rounded-full border border-[var(--gold-400)]/10" />
      <div className="pointer-events-none absolute -right-20 top-40 h-[22rem] w-[22rem] rounded-full border border-white/5" />

      <div className="relative mx-auto grid min-h-[690px] max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8 lg:py-16">
        {/* LEFT: EXISTING BRAND MESSAGE */}
        <div className="relative z-10 max-w-2xl">
          <div
            className="hero-fade inline-flex items-center gap-2 rounded-full border border-[var(--gold-400)]/45 bg-[var(--navy-900)] px-4 py-2"
            style={{ "--d": 0 }}
          >
            <Sparkles size={14} className="text-[var(--gold-300)]" />
            <span className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[var(--gold-300)]">
              Complete Commercial Kitchen Solutions
            </span>
          </div>

          <h1
            aria-label="Precision engineered for serious kitchens."
            className="mt-7 max-w-[760px] font-display text-5xl font-bold leading-[0.98] text-white sm:text-6xl lg:text-[70px]"
          >
            <span aria-hidden="true">
              <Words words={LINE_ONE} />
              <Words
                words={LINE_TWO}
                offset={LINE_ONE.length}
                className="text-[var(--gold-300)]"
              />
            </span>
          </h1>

          <p
            className="hero-fade mt-7 max-w-xl text-base font-medium leading-relaxed text-[var(--muted-dark)] sm:text-lg"
            style={{ "--d": 620 }}
          >
            Commercial kitchen, stainless-steel fabrication,
            exhaust and marine galley equipment engineered for
            dependable daily service.
          </p>

          <div
            className="hero-fade mt-9 flex flex-col gap-3 sm:flex-row"
            style={{ "--d": 760 }}
          >
            <Link href="/products" className="premium-primary-btn">
              Explore Products
              <ArrowRight size={17} />
            </Link>

            <a
              href="/catalogues/kitchen-king-product-catalogue-2026-27.pdf"
              className="premium-secondary-btn"
              target="_blank"
              rel="noreferrer"
            >
              Download Catalogue
              <Download size={17} />
            </a>
          </div>

          <div
            className="hero-fade mt-10 grid max-w-xl gap-3 sm:grid-cols-3"
            style={{ "--d": 900 }}
          >
            {[
              "SS304 Fabrication",
              "Turnkey Projects",
              "Marine & Galley",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-2 rounded-xl border border-white/15 bg-[var(--navy-900)] px-3.5 py-3"
              >
                <ShieldCheck
                  size={15}
                  className="shrink-0 text-[var(--gold-300)]"
                />

                <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-white">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: ACTUAL INTERACTIVE 3D */}
        <div className="hero-fade relative z-10 flex min-h-[400px] items-center justify-center lg:min-h-[560px]" style={{ "--d": 450 }}>
          <HeroEquipment3D />
        </div>
      </div>

      {/* EXISTING CATEGORY TICKER */}
      <div
        className="hero-fade relative z-10 mx-auto mt-10 max-w-7xl border-t border-white/10 px-4 pb-10 pt-6 sm:px-6 lg:px-8"
        style={{ "--d": 1040 }}
      >
        <div className="marquee">
          <div className="marquee__row">
            <div
              className="marquee__track"
              style={{ animationDuration: "34s" }}
            >
              {[0, 1].map((copy) => (
                <ul
                  key={copy}
                  className="marquee__group"
                  aria-hidden={copy === 1 ? "true" : undefined}
                >
                  {PRODUCT_CATEGORIES.map((c) => (
                    <li key={c.slug} className="hero-ticker-chip">
                      {c.name}
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="h-2 bg-[var(--gold-500)]" />
    </section>
  );
}
