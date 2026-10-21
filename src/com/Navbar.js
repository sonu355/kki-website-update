
"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  ArrowRight,
  ChefHat,
  ChevronDown,
  Download,
  Droplets,
  Factory,
  Flame,
  Mail,
  Menu,
  MessageCircle,
  Phone,
  Ship,
  Snowflake,
  Sparkles,
  Utensils,
  Wind,
  Wrench,
  X,
} from "lucide-react";

import { CONTACT, PRODUCT_CATEGORIES } from "./SiteData";

/* ============================================================
   CATEGORY ICONS
============================================================ */

const CATEGORY_ICONS = {
  "cooking-equipment": Flame,
  "preparation-equipment": ChefHat,
  "storage-equipment": Snowflake,
  "serving-equipment": Utensils,
  "washing-equipment": Droplets,
  "bakery-equipment": ChefHat,
  "galley-equipment": Ship,
  "exhaust-ventilation": Wind,
  "custom-fabrication": Wrench,
};

const FALLBACK_CATEGORIES = PRODUCT_CATEGORIES.map((item) => ({
  slug: item.slug,
  name: item.name,
  desc: item.desc,
  link: `/products/${item.slug}`,
}));

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About KKI", href: "/about" },
  { label: "Marine & Galley", href: "/marine-galley" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
];

/* ============================================================
   COMPONENT
============================================================ */

export default function Navbar() {
  const pathname = usePathname();
  const productsMenuRef = useRef(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showProducts, setShowProducts] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [productCategories, setProductCategories] =
    useState(FALLBACK_CATEGORIES);

  /* ============================================================
     SCROLL STATE
  ============================================================ */

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 28);
    };

    onScroll();

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  /* ============================================================
     CLOSE MENUS ON ROUTE CHANGE
  ============================================================ */

  useEffect(() => {
    setIsMenuOpen(false);
    setShowProducts(false);
  }, [pathname]);

  /* ============================================================
     ESCAPE KEY AND OUTSIDE CLICK
  ============================================================ */

  useEffect(() => {
    const onEscape = (event) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        setShowProducts(false);
      }
    };

    const onOutsidePointer = (event) => {
      if (
        productsMenuRef.current &&
        !productsMenuRef.current.contains(event.target)
      ) {
        setShowProducts(false);
      }
    };

    window.addEventListener("keydown", onEscape);
    document.addEventListener("pointerdown", onOutsidePointer);

    return () => {
      window.removeEventListener("keydown", onEscape);
      document.removeEventListener(
        "pointerdown",
        onOutsidePointer
      );
    };
  }, []);

  /* ============================================================
     MOBILE BODY LOCK
  ============================================================ */

  useEffect(() => {
    if (!isMenuOpen) return;

    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = oldOverflow;
    };
  }, [isMenuOpen]);

  /* ============================================================
     DATABASE CATEGORIES
  ============================================================ */

  useEffect(() => {
    let active = true;

    async function fetchCategories() {
      try {
        const response = await fetch("/api/category");

        if (!response.ok) return;

        const data = await response.json();

        if (
          !active ||
          !data?.success ||
          !Array.isArray(data.categories) ||
          !data.categories.length
        ) {
          return;
        }

        const descriptions = Object.fromEntries(
          PRODUCT_CATEGORIES.map((item) => [
            item.slug,
            item.desc,
          ])
        );

        const categories = data.categories
          .filter((category) => category.slug)
          .map((category) => ({
            slug: category.slug,
            name: category.name,
            desc:
              descriptions[category.slug] ||
              "Commercial kitchen equipment engineered for professional use.",
            link: `/products/${category.slug}`,
          }));

        if (categories.length) {
          setProductCategories(categories);
        }
      } catch {
        // Use fallback categories when API is unavailable.
      }
    }

    fetchCategories();

    return () => {
      active = false;
    };
  }, []);

  /* ============================================================
     ACTIVE ROUTES
  ============================================================ */

  const isActive = (href) => {
    if (href === "/") return pathname === "/";

    return (
      pathname === href ||
      pathname?.startsWith(`${href}/`)
    );
  };

  const productsActive =
    pathname?.startsWith("/products") ||
    pathname?.startsWith("/product/");

  const getNavClass = (href) =>
    `nav-link-premium whitespace-nowrap ${
      isActive(href) ? "is-active" : ""
    }`;

  /* ============================================================
     RENDER
  ============================================================ */

  return (
    <header className="fixed inset-x-0 top-0 z-[100] w-full">

      {/* ======================================================
          TOP CONTACT BAR
      ====================================================== */}

      <div
        className={`
          hidden overflow-hidden bg-[var(--navy-950)]
          text-white transition-all duration-300 md:block
          ${
            isScrolled
              ? "max-h-0 opacity-0"
              : "max-h-9 opacity-100"
          }
        `}
      >
        <div
          className="
            flex h-9 w-full items-center
            justify-between gap-5
            px-4 text-[11px] font-semibold
            tracking-wide
            sm:px-5 lg:px-6
          "
        >
          {/* LEFT: CONTACT INFORMATION */}

          <div className="flex min-w-0 items-center gap-4 lg:gap-6">
            <a
              href={`tel:${CONTACT.phonePrimaryRaw}`}
              className="
                inline-flex shrink-0 items-center gap-1.5
                transition-colors
                hover:text-[var(--gold-300)]
              "
            >
              <Phone
                size={12}
                className="text-[var(--gold-400)]"
              />
              <span>{CONTACT.phonePrimary}</span>
            </a>

            <a
              href={`mailto:${CONTACT.email}`}
              className="
                inline-flex min-w-0 items-center gap-1.5
                transition-colors
                hover:text-[var(--gold-300)]
              "
            >
              <Mail
                size={12}
                className="shrink-0 text-[var(--gold-400)]"
              />

              <span className="truncate">
                {CONTACT.email}
              </span>
            </a>

            <a
              href={CONTACT.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="
                hidden shrink-0 items-center gap-1.5
                transition-colors
                hover:text-[var(--gold-300)]
                lg:inline-flex
              "
            >
              <MessageCircle
                size={12}
                className="text-[var(--gold-400)]"
              />
              WhatsApp Us
            </a>
          </div>

          {/* RIGHT: ENGINEERING CAPABILITIES */}

          <p
            className="
              ml-auto hidden shrink-0 whitespace-nowrap
              text-right text-[10px] font-bold uppercase
              tracking-[0.15em] text-white/75
              lg:block
            "
          >
            Design <span className="text-[var(--gold-400)]">•</span>{" "}
            Fabrication <span className="text-[var(--gold-400)]">•</span>{" "}
            Installation <span className="text-[var(--gold-400)]">•</span>{" "}
            AMC
          </p>
        </div>
      </div>

      {/* ======================================================
          MAIN NAVIGATION
      ====================================================== */}

      <nav
        aria-label="Main navigation"
        className={`
          relative border-b transition-all duration-300
          ${
            isScrolled
              ? `
                border-black/[0.06]
                bg-white/[0.96]
                shadow-[0_12px_36px_rgba(3,24,45,0.10)]
                backdrop-blur-xl
              `
              : `
                border-black/[0.05]
                bg-white
                shadow-sm
              `
          }
        `}
      >
        <div
          className="
            w-full px-4
            sm:px-5 lg:px-6
          "
        >
          <div
            className={`
              flex items-center justify-between gap-4
              transition-[height] duration-300
              ${
                isScrolled
                  ? "h-[78px]"
                  : "h-[96px]"
              }
            `}
          >
            {/* =================================================
                KKI LOGO AND BRAND NAME
            ================================================= */}

            <Link
              href="/"
              aria-label="Kitchen King Industries home"
              className="
                group flex min-w-0 shrink-0
                items-center gap-3
                lg:gap-3.5
              "
            >
              <div
                className={`
                  relative flex shrink-0 items-center
                  justify-center transition-all duration-300
                  ${
                    isScrolled
                      ? "h-[62px] w-[62px]"
                      : "h-[76px] w-[76px]"
                  }
                `}
              >
                <Image
                  src="/logo.PNG"
                  alt="Kitchen King Industries"
                  width={210}
                  height={235}
                  priority

                  // Required by the existing BrandIntro animation.
                  data-kki-nav-logo

                  className="
                    h-full w-full object-contain
                    transition-transform duration-300
                    group-hover:scale-[1.04]
                  "
                />
              </div>

              <div className="flex min-w-0 flex-col justify-center">
                <span
                  className="
                    font-display text-[15px] font-extrabold
                    uppercase leading-[1.14]
                    tracking-[0.025em]
                    text-[var(--navy-950)]
                    sm:text-[17px]
                    2xl:text-[19px]
                  "
                >
                  Kitchen King
                </span>

                <span
                  className="
                    mt-0.5 text-[10px] font-extrabold
                    uppercase tracking-[0.28em]
                    text-[var(--gold-500)]
                    sm:text-[11px]
                  "
                >
                  Industries
                </span>

                <span
                  className="
                    mt-1 hidden max-w-[230px]
                    text-[9px] font-medium
                    leading-tight text-[var(--muted-light)]
                    2xl:block
                  "
                >
                  Commercial Kitchen &amp; Galley Equipment
                </span>
              </div>
            </Link>

            {/* =================================================
                DESKTOP NAVIGATION
            ================================================= */}

            <div
              className="
                ml-auto hidden shrink-0 items-center
                justify-end gap-0
                xl:flex 2xl:gap-1
              "
            >
              {/* HOME AND ABOUT */}

              {NAV_LINKS.slice(0, 2).map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className={getNavClass(href)}
                  aria-current={isActive(href) ? "page" : undefined}
                >
                  {label}
                </Link>
              ))}

              {/* ===============================================
                  PRODUCTS MEGA MENU
              =============================================== */}

              <div
                ref={productsMenuRef}
                className="relative"
                onMouseEnter={() => setShowProducts(true)}
                onMouseLeave={() => setShowProducts(false)}
              >
                <div className="flex items-center">
                  <Link
                    href="/products"
                    className={`
                      nav-link-premium inline-flex
                      items-center gap-1 whitespace-nowrap
                      ${
                        productsActive
                          ? "is-active"
                          : ""
                      }
                    `}
                    aria-current={productsActive ? "page" : undefined}
                  >
                    Products
                  </Link>

                  <button
                    type="button"
                    onClick={() =>
                      setShowProducts((current) => !current)
                    }
                    aria-label="Toggle products categories"
                    aria-expanded={showProducts}
                    aria-haspopup="true"
                    className="
                      -ml-1 flex h-9 w-6 items-center
                      justify-center rounded-md
                      text-[var(--navy-900)]
                      transition-colors
                      hover:text-[var(--gold-500)]
                    "
                  >
                    <ChevronDown
                      size={14}
                      className={`
                        transition-transform duration-300
                        ${showProducts ? "rotate-180" : ""}
                      `}
                    />
                  </button>
                </div>

                {showProducts && (
                  <div
                    className="
                      absolute left-1/2 top-full z-[120]
                      w-[min(920px,calc(100vw-48px))]
                      -translate-x-1/2 pt-3
                    "
                  >
                    <div
                      className="
                        animate-fadeInDown overflow-hidden
                        rounded-[24px] border
                        border-[var(--line-light)]
                        bg-white
                        shadow-[0_30px_90px_rgba(3,24,45,0.20)]
                      "
                    >
                      {/* MEGA MENU HEADER */}

                      <div
                        className="
                          flex items-center justify-between
                          gap-5 border-b
                          border-[var(--line-light)]
                          bg-[var(--surface-soft)]
                          px-6 py-4
                        "
                      >
                        <div>
                          <p
                            className="
                              text-[10px] font-extrabold
                              uppercase tracking-[0.20em]
                              text-[var(--gold-500)]
                            "
                          >
                            Product Range
                          </p>

                          <p
                            className="
                              mt-1 text-sm font-semibold
                              text-[var(--navy-950)]
                            "
                          >
                            Commercial kitchen and galley equipment
                          </p>
                        </div>

                        <Link
                          href="/products"
                          className="
                            inline-flex shrink-0 items-center gap-2
                            text-xs font-extrabold uppercase
                            tracking-[0.08em]
                            text-[var(--navy-900)]
                            transition-colors
                            hover:text-[var(--gold-500)]
                          "
                        >
                          View All
                          <ArrowRight size={14} />
                        </Link>
                      </div>

                      {/* CATEGORY GRID AND CTA */}

                      <div className="grid grid-cols-[1fr_245px]">
                        {/* CATEGORY GRID */}

                        <div className="grid grid-cols-3 gap-2 p-5">
                          {productCategories.map((category) => {
                            const Icon =
                              CATEGORY_ICONS[category.slug] ||
                              Factory;

                            return (
                              <Link
                                key={category.slug}
                                href={category.link}
                                className="
                                  group rounded-2xl border
                                  border-transparent p-3
                                  transition-all duration-300
                                  hover:border-[var(--gold-400)]/30
                                  hover:bg-[var(--surface-cream)]
                                "
                              >
                                <div className="flex items-start gap-3">
                                  <div
                                    className="
                                      flex h-10 w-10 shrink-0
                                      items-center justify-center
                                      rounded-xl border
                                      border-[var(--gold-400)]/25
                                      bg-[var(--navy-950)]
                                      transition-transform duration-300
                                      group-hover:-translate-y-0.5
                                    "
                                  >
                                    <Icon
                                      size={17}
                                      strokeWidth={1.7}
                                      className="text-[var(--gold-300)]"
                                    />
                                  </div>

                                  <div className="min-w-0">
                                    <p
                                      className="
                                        text-[13px] font-bold
                                        leading-tight
                                        text-[var(--navy-950)]
                                        transition-colors
                                        group-hover:text-[var(--gold-500)]
                                      "
                                    >
                                      {category.name}
                                    </p>

                                    <p
                                      className="
                                        mt-1.5 line-clamp-2
                                        text-[10px] font-medium
                                        leading-relaxed
                                        text-[var(--muted-light)]
                                      "
                                    >
                                      {category.desc}
                                    </p>
                                  </div>
                                </div>
                              </Link>
                            );
                          })}
                        </div>

                        {/* CTA PANEL */}

                        <div
                          className="
                            relative overflow-hidden
                            bg-[var(--navy-950)] p-6
                          "
                        >
                          <div className="absolute inset-0 hero-grid opacity-20" />

                          <div className="relative">
                            <Sparkles
                              size={24}
                              className="text-[var(--gold-300)]"
                            />

                            <p
                              className="
                                mt-5 text-[10px] font-extrabold
                                uppercase tracking-[0.18em]
                                text-[var(--gold-300)]
                              "
                            >
                              Custom Requirement?
                            </p>

                            <h3
                              className="
                                mt-2 font-display text-xl
                                font-bold leading-tight text-white
                              "
                            >
                              Equipment built around your kitchen.
                            </h3>

                            <p
                              className="
                                mt-3 text-xs font-medium
                                leading-relaxed
                                text-[var(--muted-dark)]
                              "
                            >
                              Share your layout, capacity or equipment
                              requirement with our team.
                            </p>

                            <Link
                              href="/contact"
                              className="
                                mt-5 inline-flex items-center
                                gap-2 rounded-full
                                bg-[var(--gold-300)]
                                px-4 py-2.5
                                text-[10px] font-extrabold
                                uppercase tracking-[0.08em]
                                text-[var(--navy-950)]
                                transition-transform
                                hover:-translate-y-0.5
                              "
                            >
                              Request Quote
                              <ArrowRight size={13} />
                            </Link>

                            <a
                              href="/catalogues/kitchen-king-product-catalogue-2026-27.pdf"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="
                                mt-4 flex items-center gap-2
                                text-[10px] font-bold
                                text-white/70
                                transition-colors hover:text-white
                              "
                            >
                              <Download size={12} />
                              Product Catalogue
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* OTHER NAVIGATION LINKS */}

              {NAV_LINKS.slice(2).map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className={getNavClass(href)}
                  aria-current={isActive(href) ? "page" : undefined}
                >
                  {label}
                </Link>
              ))}

              {/* REQUEST QUOTE */}

              <Link
                href="/contact"
                className="
                  ml-2 inline-flex shrink-0 items-center
                  justify-center gap-2 rounded-full
                  bg-[var(--navy-950)] px-4 py-3
                  text-[11px] font-extrabold uppercase
                  tracking-[0.055em] text-white
                  shadow-lg shadow-[var(--navy-950)]/10
                  transition-all duration-300
                  hover:-translate-y-0.5
                  hover:bg-[var(--gold-500)]
                  hover:shadow-xl
                  2xl:px-5
                "
              >
                Request Quote
                <ArrowRight size={14} />
              </Link>
            </div>

            {/* =================================================
                MOBILE / TABLET MENU BUTTON
            ================================================= */}

            <button
              type="button"
              onClick={() =>
                setIsMenuOpen((current) => !current)
              }
              aria-label={
                isMenuOpen
                  ? "Close navigation"
                  : "Open navigation"
              }
              aria-expanded={isMenuOpen}
              aria-controls="kki-mobile-navigation"
              className="
                inline-flex h-11 w-11 shrink-0
                items-center justify-center
                rounded-xl border
                border-[var(--line-light)]
                text-[var(--navy-950)]
                transition-all
                hover:border-[var(--gold-400)]
                hover:text-[var(--gold-500)]
                xl:hidden
              "
            >
              {isMenuOpen ? (
                <X size={22} />
              ) : (
                <Menu size={22} />
              )}
            </button>
          </div>
        </div>

        {/* ======================================================
            MOBILE / TABLET NAVIGATION
        ====================================================== */}

        {isMenuOpen && (
          <div
            id="kki-mobile-navigation"
            className="
              animate-fadeInDown max-h-[calc(100dvh-78px)]
              overflow-y-auto border-t
              border-[var(--line-light)]
              bg-white xl:hidden
            "
          >
            <div
              className="
                mx-auto w-full max-w-7xl
                px-5 py-5 sm:px-6
              "
            >
              {/* HOME AND ABOUT */}

              {NAV_LINKS.slice(0, 2).map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`
                    mobile-nav-link
                    ${
                      isActive(href)
                        ? "text-[var(--gold-500)]"
                        : ""
                    }
                  `}
                >
                  {label}
                </Link>
              ))}

              {/* PRODUCTS BUTTON */}

              <div className="flex items-center">
                <Link
                  href="/products"
                  onClick={() => setIsMenuOpen(false)}
                  className={`
                    mobile-nav-link flex-1
                    ${
                      productsActive
                        ? "text-[var(--gold-500)]"
                        : ""
                    }
                  `}
                >
                  Products
                </Link>

                <button
                  type="button"
                  onClick={() =>
                    setShowProducts((current) => !current)
                  }
                  aria-label="Toggle product categories"
                  aria-expanded={showProducts}
                  className="
                    flex h-10 w-11 items-center
                    justify-center rounded-lg
                    text-[var(--navy-950)]
                    hover:bg-[var(--surface-cream)]
                  "
                >
                  <ChevronDown
                    size={17}
                    className={`
                      transition-transform duration-300
                      ${showProducts ? "rotate-180" : ""}
                    `}
                  />
                </button>
              </div>

              {/* MOBILE PRODUCT CATEGORIES */}

              {showProducts && (
                <div
                  className="
                    my-2 grid gap-1 rounded-2xl
                    bg-[var(--surface-cream)]
                    p-2 sm:grid-cols-2
                  "
                >
                  {productCategories.map((category) => {
                    const Icon =
                      CATEGORY_ICONS[category.slug] ||
                      Factory;

                    return (
                      <Link
                        key={category.slug}
                        href={category.link}
                        onClick={() => setIsMenuOpen(false)}
                        className="
                          flex items-center gap-3
                          rounded-xl px-3 py-3
                          text-sm font-semibold
                          text-[var(--navy-900)]
                          transition-colors
                          hover:bg-white
                          hover:text-[var(--gold-500)]
                        "
                      >
                        <Icon
                          size={16}
                          className="
                            shrink-0 text-[var(--gold-500)]
                          "
                        />

                        {category.name}
                      </Link>
                    );
                  })}
                </div>
              )}

              {/* OTHER NAV LINKS */}

              {NAV_LINKS.slice(2).map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`
                    mobile-nav-link
                    ${
                      isActive(href)
                        ? "text-[var(--gold-500)]"
                        : ""
                    }
                  `}
                >
                  {label}
                </Link>
              ))}

              {/* MOBILE CONTACT AND CTA */}

              <div
                className="
                  mt-5 grid gap-3 border-t
                  border-[var(--line-light)]
                  pt-5 sm:grid-cols-2
                "
              >
                <a
                  href={`tel:${CONTACT.phonePrimaryRaw}`}
                  className="
                    flex items-center gap-3
                    rounded-xl
                    bg-[var(--surface-cream)]
                    p-4 text-sm font-semibold
                    text-[var(--navy-950)]
                  "
                >
                  <Phone
                    size={17}
                    className="text-[var(--gold-500)]"
                  />
                  {CONTACT.phonePrimary}
                </a>

                <Link
                  href="/contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="
                    inline-flex items-center
                    justify-center gap-2
                    rounded-xl
                    bg-[var(--navy-950)]
                    px-5 py-4
                    text-sm font-bold text-white
                    transition-colors
                    hover:bg-[var(--navy-900)]
                  "
                >
                  Request Quote
                  <ArrowRight size={15} />
                </Link>

                <a
                  href={`mailto:${CONTACT.email}`}
                  className="
                    flex min-w-0 items-center gap-3
                    rounded-xl
                    bg-[var(--surface-cream)]
                    p-4 text-sm font-semibold
                    text-[var(--navy-950)]
                  "
                >
                  <Mail
                    size={17}
                    className="shrink-0 text-[var(--gold-500)]"
                  />
                  <span className="truncate">
                    {CONTACT.email}
                  </span>
                </a>

                <a
                  href={CONTACT.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    flex items-center gap-3
                    rounded-xl
                    bg-[var(--surface-cream)]
                    p-4 text-sm font-semibold
                    text-[var(--navy-950)]
                  "
                >
                  <MessageCircle
                    size={17}
                    className="text-[var(--gold-500)]"
                  />
                  WhatsApp Us
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
