import {
  ArrowRight,
  ArrowUpRight,
  Download,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
} from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import React from "react";

import {
  CONTACT,
  PRODUCT_CATEGORIES,
} from "./SiteData";


const quickLinks = [
  {
    href: "/about",
    label: "About KKI",
  },
  {
    href: "/manufacturing",
    label: "Manufacturing",
  },
  {
    href: "/marine-galley",
    label: "Marine & Galley",
  },
  {
    href: "/projects",
    label: "Projects",
  },
  {
    href: "/gallery",
    label: "Gallery",
  },
  {
    href: "/contact",
    label: "Contact",
  },
];


function FooterLink({
  href,
  children,
}) {
  return (
    <li>
      <Link
        href={href}
        className="
          group
          inline-flex
          items-center
          gap-2
          py-1

          text-sm
          text-[var(--muted-dark)]

          transition-colors

          hover:text-[var(--gold-300)]
        "
      >
        <span
          className="
            h-1
            w-1

            rounded-full

            bg-[var(--gold-500)]/70

            transition-all

            group-hover:w-3
          "
        />

        {children}
      </Link>
    </li>
  );
}


function FooterHeading({
  children,
}) {
  return (
    <h4
      className="
        mb-5
        text-[11px]
        font-bold
        uppercase
        tracking-[0.2em]
        text-[var(--gold-300)]
      "
    >
      {children}
    </h4>
  );
}


export default function Footer() {
  return (
    <footer
      className="
        navy-surface
        border-t
        border-white/5
      "
    >
      <div className="h-[2px] gold-gradient" />


      {/* =====================================================
          FOOTER CTA
      ===================================================== */}

      <div
        className="
          relative
          overflow-hidden
          border-b
          border-white/10
          bg-white/[0.025]
        "
      >
        <div className="absolute inset-0 hero-grid opacity-15" />

        <div
          className="
            relative
            mx-auto
            flex
            max-w-7xl
            flex-col
            gap-6
            px-4
            py-10

            sm:px-6

            lg:flex-row
            lg:items-center
            lg:justify-between
            lg:px-8
          "
        >
          <div>
            <p
              className="
                text-[10px]
                font-extrabold
                uppercase
                tracking-[0.2em]
                text-[var(--gold-300)]
              "
            >
              Planning a new kitchen?
            </p>

            <h3
              className="
                mt-2
                max-w-2xl
                font-display
                text-2xl
                font-bold
                text-white

                sm:text-3xl
              "
            >
              Tell us your capacity,
              layout or equipment
              requirement.
            </h3>
          </div>

          <Link
            href="/contact"
            className="
              inline-flex
              shrink-0
              items-center
              justify-center
              gap-2

              rounded-full

              bg-[var(--gold-300)]

              px-6
              py-3.5

              text-xs
              font-extrabold
              uppercase
              tracking-[0.08em]
              text-[var(--navy-950)]

              transition-all

              hover:-translate-y-1
              hover:bg-[#f2d9a5]
            "
          >
            Request a Quotation

            <ArrowRight
              size={15}
            />
          </Link>
        </div>
      </div>


      {/* =====================================================
          MAIN FOOTER
      ===================================================== */}

      <div
        className="
          mx-auto
          max-w-7xl

          px-4
          py-16

          sm:px-6
          lg:px-8
        "
      >
        <div
          className="
            grid
            gap-12

            md:grid-cols-2

            lg:grid-cols-[1.2fr_0.72fr_1.35fr_1.15fr]
          "
        >

          {/* BRAND */}

          <div>
            <div
              className="
                mb-6
                inline-block

                rounded-[20px]

                border
                border-[var(--gold-400)]/25

                bg-[var(--surface-cream)]

                p-4

                shadow-2xl
              "
            >
              <Image
                src="/logo.PNG"
                alt="Kitchen King Industries"

                width={230}
                height={255}

                className="
                  h-[124px]
                  w-auto
                  object-contain
                "
              />
            </div>

            <p
              className="
                max-w-sm

                text-sm
                leading-relaxed
                text-[var(--muted-dark)]
              "
            >
              Commercial kitchen,
              galley, exhaust and
              custom stainless-steel
              equipment — from design
              and fabrication to
              installation and support.
            </p>


            <div
              className="
                mt-5
                flex
                flex-wrap
                gap-2
              "
            >
              {[
                "SS304",
                "Turnkey",
                "Marine & Galley",
              ].map(
                (item) => (
                  <span
                    key={item}
                    className="
                      inline-flex
                      items-center
                      gap-1.5

                      rounded-full

                      border
                      border-white/10

                      bg-white/[0.04]

                      px-3
                      py-1.5

                      text-[9px]
                      font-bold
                      uppercase
                      tracking-[0.08em]
                      text-white/75
                    "
                  >
                    <ShieldCheck
                      size={11}
                      className="
                        text-[var(--gold-300)]
                      "
                    />

                    {item}
                  </span>
                )
              )}
            </div>


            <a
              href="https://www.sagengineering.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="
                mt-5
                inline-flex
                items-center
                gap-1.5

                text-xs
                font-bold
                text-[var(--gold-300)]

                transition-colors

                hover:text-white
              "
            >
              A specialised company of
              SAG Engineering

              <ArrowUpRight
                size={13}
              />
            </a>


            <div
              className="
                mt-6
                flex
                flex-col
                gap-2
              "
            >
              <a
                href="/catalogues/kitchen-king-product-catalogue-2026-27.pdf"
                target="_blank"
                rel="noreferrer"
                className="
                  inline-flex
                  items-center
                  gap-2

                  text-xs
                  font-semibold
                  text-white/65

                  transition-colors

                  hover:text-[var(--gold-300)]
                "
              >
                <Download
                  size={13}
                />

                Product Catalogue
                2026-27
              </a>

              <a
                href="/catalogues/kitchen-king-galley-catalogue.pdf"
                target="_blank"
                rel="noreferrer"
                className="
                  inline-flex
                  items-center
                  gap-2

                  text-xs
                  font-semibold
                  text-white/65

                  transition-colors

                  hover:text-[var(--gold-300)]
                "
              >
                <Download
                  size={13}
                />

                Marine & Galley
                Catalogue
              </a>
            </div>
          </div>


          {/* COMPANY */}

          <div>
            <FooterHeading>
              Company
            </FooterHeading>

            <ul className="space-y-1">
              {quickLinks.map(
                (item) => (
                  <FooterLink
                    key={
                      item.href
                    }
                    href={
                      item.href
                    }
                  >
                    {item.label}
                  </FooterLink>
                )
              )}
            </ul>
          </div>


          {/* PRODUCTS */}

          <div>
            <FooterHeading>
              Product Range
            </FooterHeading>

            <ul
              className="
                grid
                gap-x-5

                sm:grid-cols-2
              "
            >
              {PRODUCT_CATEGORIES.map(
                (item) => (
                  <FooterLink
                    key={
                      item.slug
                    }
                    href={`/products/${item.slug}`}
                  >
                    {item.name}
                  </FooterLink>
                )
              )}
            </ul>
          </div>


          {/* CONTACT */}

          <div>
            <FooterHeading>
              Contact
            </FooterHeading>

            <div className="space-y-4">

              <a
                href={`tel:${CONTACT.phonePrimaryRaw}`}
                className="
                  flex
                  items-start
                  gap-3

                  text-sm
                  text-[var(--muted-dark)]

                  transition-colors

                  hover:text-white
                "
              >
                <span
                  className="
                    mt-0.5

                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center

                    rounded-full

                    border
                    border-white/10

                    bg-white/5

                    text-[var(--gold-300)]
                  "
                >
                  <Phone
                    size={15}
                  />
                </span>

                <span>
                  <small
                    className="
                      block

                      text-[9px]
                      uppercase
                      tracking-[0.16em]
                      text-white/40
                    "
                  >
                    Call us
                  </small>

                  {
                    CONTACT.phonePrimary
                  }

                  {" / "}

                  {
                    CONTACT.phoneSecondary
                  }
                </span>
              </a>


              <a
                href={`mailto:${CONTACT.email}`}
                className="
                  flex
                  items-start
                  gap-3

                  text-sm
                  text-[var(--muted-dark)]

                  transition-colors

                  hover:text-white
                "
              >
                <span
                  className="
                    mt-0.5

                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center

                    rounded-full

                    border
                    border-white/10

                    bg-white/5

                    text-[var(--gold-300)]
                  "
                >
                  <Mail
                    size={15}
                  />
                </span>

                <span>
                  <small
                    className="
                      block

                      text-[9px]
                      uppercase
                      tracking-[0.16em]
                      text-white/40
                    "
                  >
                    Email
                  </small>

                  {CONTACT.email}
                </span>
              </a>


              <div
                className="
                  flex
                  items-start
                  gap-3

                  text-sm
                  text-[var(--muted-dark)]
                "
              >
                <span
                  className="
                    mt-0.5

                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center

                    rounded-full

                    border
                    border-white/10

                    bg-white/5

                    text-[var(--gold-300)]
                  "
                >
                  <MapPin
                    size={15}
                  />
                </span>

                <span>
                  <small
                    className="
                      block

                      text-[9px]
                      uppercase
                      tracking-[0.16em]
                      text-white/40
                    "
                  >
                    Mumbai
                  </small>

                  {CONTACT.address}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* =====================================================
          COPYRIGHT
      ===================================================== */}

      <div
        className="
          border-t
          border-white/10
        "
      >
        <div
          className="
            mx-auto
            flex
            max-w-7xl
            flex-col
            items-center
            justify-between
            gap-3

            px-4
            py-5

            text-[11px]
            text-white/60

            sm:flex-row
            sm:px-6

            lg:px-8
          "
        >
          <p>
            ©{" "}
            {new Date().getFullYear()}{" "}
            Kitchen King Industries.
            All rights reserved.
          </p>

          <div
            className="
              flex
              items-center
              gap-4
            "
          >
            <Link
              href="/privacy-policy"
              className="
                transition-colors
                hover:text-white
              "
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="
                transition-colors
                hover:text-white
              "
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}