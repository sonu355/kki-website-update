import Hero3D from "@/com/Hero3D";
import HomeExperience from "@/com/HomeExperience";
import IndustriesMarquee from "@/com/IndustriesMarquee";
import FAQAccordion from "@/com/FAQAccordion";
import SolutionsCarousel from "@/com/SolutionsCarousel";
import CategoryExplorer from "@/com/CategoryExplorer";

import {
  GoldButton,
  GhostButton,
  IconTile,
  SectionHeading,
  StatBlock,
} from "@/com/UI";

import {
  CAPABILITY_STATS,
  FEATURES,
  MARINE_POINTS,
  PROCESS_STEPS,
  PRODUCT_CATEGORIES,
  HOME_FAQS,
} from "@/com/SiteData";

import {
  ArrowRight,
  CheckCircle2,
  Download,
  ExternalLink,
  FileDown,
  Ship,
  Sparkles,
  ShieldCheck,
  Wrench,
  Utensils,
  Snowflake,
  Droplets,
} from "lucide-react";

import Link from "next/link";


const FEATURED_CATEGORIES = [
  "cooking-equipment",
  "preparation-equipment",
  "storage-equipment",
  "washing-equipment",
  "galley-equipment",
  "custom-fabrication",
];


const DELIVERY_POINTS = [
  "In-house stainless-steel fabrication",
  "Commercial and marine applications",
  "Custom equipment and site layouts",
  "Installation and AMC support",
];


const QUICK_SOLUTIONS = [
  {
    title: "Cooking",
    text: "Heavy-duty ranges, fryers and commercial cooking systems.",
    href: "/products/cooking-equipment",
    icon: Utensils,
  },
  {
    title: "Preparation",
    text: "High-output preparation equipment for demanding kitchens.",
    href: "/products/preparation-equipment",
    icon: Wrench,
  },
  {
    title: "Refrigeration",
    text: "Reliable refrigeration and freezer systems for cold storage.",
    href: "/products/storage-equipment",
    icon: Snowflake,
  },
  {
    title: "Washing",
    text: "Professional dishwashing equipment designed for daily service.",
    href: "/products/washing-equipment",
    icon: Droplets,
  },
];


export default function HomePage() {
  const featured = PRODUCT_CATEGORIES.filter((item) =>
    FEATURED_CATEGORIES.includes(item.slug)
  );

  return (
    <main className="overflow-hidden bg-[var(--surface-cream)]">

      {/* =====================================================
          GLOBAL HOMEPAGE MOTION
      ===================================================== */}
      <HomeExperience />


      {/* =====================================================
          HERO
      ===================================================== */}
      <Hero3D />


      {/* =====================================================
          CAPABILITY STATS
      ===================================================== */}
      <section
        data-home-reveal
        className="
          relative
          border-b
          border-[var(--line-light)]
          bg-[var(--surface-cream)]
          py-10
        "
      >
        <div
          className="
            pointer-events-none
            absolute
            left-1/2
            top-0
            h-px
            w-[70%]
            -translate-x-1/2
            bg-gradient-to-r
            from-transparent
            via-[var(--gold-400)]/40
            to-transparent
          "
        />

        <div
          data-home-grid
          className="
            mx-auto
            grid
            max-w-7xl
            grid-cols-2
            gap-6
            px-4
            sm:px-6
            md:grid-cols-4
            md:gap-10
            lg:px-8
          "
        >
          {CAPABILITY_STATS.map((s) => (
            <div
              key={s.label}
              data-home-card
              className="h-full"
            >
              <StatBlock {...s} dark={false} />
            </div>
          ))}
        </div>
      </section>


      {/* =====================================================
          QUICK SOLUTIONS STRIP
      ===================================================== */}
      <section
        data-home-reveal
        className="
          relative
          overflow-hidden
          bg-[var(--navy-950)]
          py-8
        "
      >
        <div className="absolute inset-0 hero-grid opacity-20" />

        <div
          data-home-grid
          className="
            relative
            mx-auto
            grid
            max-w-7xl
            gap-3
            px-4
            sm:grid-cols-2
            sm:px-6
            lg:grid-cols-4
            lg:px-8
          "
        >
          {QUICK_SOLUTIONS.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.title}
                href={item.href}
                data-home-card
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-2xl
                  border
                  border-white/10
                  bg-[var(--navy-900)]
                  p-5

                  transition-all
                  duration-300

                  hover:-translate-y-1
                  hover:border-[var(--gold-400)]/40
                  hover:bg-[var(--navy-900)]/80
                "
              >
                <div
                  className="
                    pointer-events-none
                    absolute
                    -right-8
                    -top-8
                    h-24
                    w-24
                    rounded-full
                    bg-[var(--gold-400)]/5
                    blur-2xl
                    transition-all
                    duration-500
                    group-hover:bg-[var(--gold-400)]/15
                  "
                />

                <div
                  className="
                    relative
                    flex
                    items-start
                    gap-4
                  "
                >
                  <div
                    className="
                      flex
                      h-11
                      w-11
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      border
                      border-[var(--gold-400)]/25
                      bg-[var(--navy-950)]
                    "
                  >
                    <Icon
                      size={19}
                      className="text-[var(--gold-300)]"
                      strokeWidth={1.7}
                    />
                  </div>

                  <div>
                    <h3
                      className="
                        font-display
                        text-lg
                        font-bold
                        text-white
                      "
                    >
                      {item.title}
                    </h3>

                    <p
                      className="
                        mt-1
                        text-xs
                        font-medium
                        leading-relaxed
                        text-[var(--muted-dark)]
                      "
                    >
                      {item.text}
                    </p>

                    <span
                      className="
                        mt-3
                        inline-flex
                        items-center
                        gap-1.5
                        text-[10px]
                        font-extrabold
                        uppercase
                        tracking-[0.1em]
                        text-[var(--gold-300)]
                      "
                    >
                      Explore
                      <ArrowRight
                        size={12}
                        className="
                          transition-transform
                          duration-300
                          group-hover:translate-x-1
                        "
                      />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>


      {/* =====================================================
          OUR SOLUTIONS
      ===================================================== */}
      <section
        data-home-reveal
        className="
          relative
          overflow-hidden
          bg-white
          pt-24
          pb-14
          lg:pt-28
          lg:pb-16
        "
      >
        <div
          data-parallax="40"
          className="
            pointer-events-none
            absolute
            -right-40
            top-10
            h-[420px]
            w-[420px]
            rounded-full
            border
            border-[var(--gold-400)]/10
          "
        />

        <div
          className="
            relative
            mx-auto
            max-w-7xl
            px-4
            sm:px-6
            lg:px-8
          "
        >
          <div
            className="
              mb-12
              flex
              flex-col
              gap-6
              lg:flex-row
              lg:items-end
              lg:justify-between
            "
          >
            <SectionHeading
              eyebrow="Our Solutions"
              title="Commercial equipment built around real kitchen work."
              subtitle="Heavy-duty commercial kitchen and galley equipment designed around workflow, hygiene, durability and serviceability."
            />

            <GhostButton
              href="/products"
              className="shrink-0 self-start lg:mb-12"
            >
              View All Products
              <ArrowRight size={16} />
            </GhostButton>
          </div>


          <SolutionsCarousel items={featured} />
        </div>
      </section>


      {/* =====================================================
          EXPLORE BY CATEGORY
      ===================================================== */}
      <section
        data-home-reveal
        className="
          border-b
          border-[var(--line-light)]
          bg-[var(--surface-cream)]
          pt-14
          pb-16
          lg:pt-16
          lg:pb-20
        "
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            center
            eyebrow="Browse The Range"
            title="Pick a category, see the equipment."
            subtitle="Every category below is built and fabricated in-house."
          />
          <CategoryExplorer />
        </div>
      </section>


      {/* =====================================================
          ABOUT / ENGINEERING
      ===================================================== */}
      <section
        data-home-reveal
        className="
          relative
          overflow-hidden
          bg-[var(--surface-cream)]
          pt-16
          pb-24
          lg:pt-20
          lg:pb-28
        "
      >
        <div
          data-parallax="28"
          className="
            pointer-events-none
            absolute
            -left-32
            top-24
            h-[360px]
            w-[360px]
            rounded-full
            bg-[var(--gold-400)]/5
            blur-3xl
          "
        />

        <div
          className="
            relative
            mx-auto
            grid
            max-w-7xl
            items-center
            gap-14
            px-4
            sm:px-6
            lg:grid-cols-[1fr_0.92fr]
            lg:px-8
          "
        >
          <div>
            <SectionHeading
              eyebrow="About Kitchen King Industries"
              title="Complete kitchen engineering, not just equipment supply."
              subtitle="Kitchen King Industries delivers commercial kitchen and galley solutions from layout planning and fabrication through installation, commissioning and after-sales support."
            />

            <div className="flex flex-wrap gap-3">
              <GoldButton href="/about">
                About KKI
                <ArrowRight size={16} />
              </GoldButton>

              <GhostButton href="/manufacturing">
                Manufacturing Facility
              </GhostButton>
            </div>
          </div>


          <div
            data-float
            className="
              relative
              overflow-hidden
              rounded-[30px]
              border
              border-[var(--gold-400)]/25
              bg-[var(--navy-950)]
              p-7
              shadow-[0_28px_70px_rgba(2,24,45,0.16)]
              sm:p-9
            "
          >
            <div className="absolute inset-0 hero-grid opacity-15" />

            <div
              className="
                pointer-events-none
                absolute
                -right-24
                -top-24
                h-56
                w-56
                rounded-full
                bg-[var(--gold-400)]/10
                blur-3xl
              "
            />

            <div className="relative">
              <p
                className="
                  text-[11px]
                  font-extrabold
                  uppercase
                  tracking-[0.22em]
                  text-[var(--gold-300)]
                "
              >
                What We Deliver
              </p>

              <h3
                className="
                  mt-4
                  font-display
                  text-2xl
                  font-bold
                  text-white
                  sm:text-3xl
                "
              >
                Engineering support from requirement to handover.
              </h3>

              <div
                data-home-grid
                className="
                  mt-7
                  grid
                  gap-3
                  sm:grid-cols-2
                "
              >
                {DELIVERY_POINTS.map((item) => (
                  <div
                    key={item}
                    data-home-card
                    className="
                      flex
                      min-h-[78px]
                      items-center
                      gap-3
                      rounded-2xl
                      border
                      border-white/12
                      bg-[var(--navy-900)]
                      p-4

                      transition-all
                      duration-300

                      hover:border-[var(--gold-400)]/35
                      hover:bg-[var(--navy-900)]/80
                    "
                  >
                    <CheckCircle2
                      size={18}
                      className="
                        shrink-0
                        text-[var(--gold-300)]
                      "
                    />

                    <span
                      className="
                        text-sm
                        font-semibold
                        leading-snug
                        text-white
                      "
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <div
                className="
                  mt-7
                  border-t
                  border-white/15
                  pt-6
                "
              >
                <p
                  className="
                    font-display
                    text-4xl
                    font-bold
                    text-[var(--gold-300)]
                  "
                >
                  SS304
                </p>

                <p
                  className="
                    mt-1
                    text-xs
                    font-bold
                    uppercase
                    tracking-[0.15em]
                    text-[var(--muted-dark)]
                  "
                >
                  Food-grade stainless-steel fabrication
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* =====================================================
          WHY KITCHEN KING
      ===================================================== */}
      <section
        data-home-reveal
        className="
          bg-white
          py-24
          lg:py-28
        "
      >
        <div
          className="
            mx-auto
            max-w-7xl
            px-4
            sm:px-6
            lg:px-8
          "
        >
          <SectionHeading
            eyebrow="Why Kitchen King"
            center
            title="Industrial discipline, hospitality understanding."
            subtitle="Every project is designed around real operating conditions — heat, cleaning cycles, speed, space and maintenance access."
          />

          <div
            data-home-grid
            className="
              grid
              gap-5
              sm:grid-cols-2
              lg:grid-cols-4
            "
          >
            {FEATURES.slice(0, 4).map((f) => (
              <div
                key={f.title}
                data-home-card
                className="h-full"
              >
                <IconTile {...f} />
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* =====================================================
          MARINE & GALLEY
      ===================================================== */}
      <section
        data-home-reveal
        className="
          relative
          overflow-hidden
          bg-[var(--navy-900)]
          py-24
          lg:py-28
        "
      >
        <div className="absolute inset-0 hero-grid opacity-25" />

        <div
          data-parallax="55"
          className="
            pointer-events-none
            absolute
            -right-32
            top-20
            h-[500px]
            w-[500px]
            rounded-full
            border
            border-[var(--gold-400)]/10
          "
        />

        <div
          data-parallax="32"
          className="
            pointer-events-none
            absolute
            -left-28
            bottom-[-180px]
            h-[420px]
            w-[420px]
            rounded-full
            bg-[var(--gold-400)]/5
            blur-3xl
          "
        />

        <div
          className="
            relative
            mx-auto
            grid
            max-w-7xl
            items-center
            gap-14
            px-4
            sm:px-6
            lg:grid-cols-[1fr_0.92fr]
            lg:px-8
          "
        >
          <div>
            <div
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-[var(--gold-400)]/35
                bg-[var(--navy-950)]
                px-4
                py-2
                text-[11px]
                font-extrabold
                uppercase
                tracking-[0.18em]
                text-[var(--gold-300)]
              "
            >
              <Ship size={14} />
              Marine &amp; Galley
            </div>

            <h2
              className="
                mt-6
                font-display
                text-4xl
                font-bold
                leading-tight
                text-white
                sm:text-5xl
              "
            >
              Engineered for motion.
              <br />
              Built for service at sea.
            </h2>

            <p
              className="
                mt-5
                max-w-xl
                text-base
                font-medium
                leading-relaxed
                text-[var(--muted-dark)]
              "
            >
              Marine galley systems demand compact layouts, secure
              equipment, corrosion resistance and service access.
              We design those constraints into the equipment from
              the start.
            </p>

            <div
              data-home-grid
              className="
                mt-7
                grid
                gap-3
                sm:grid-cols-2
              "
            >
              {MARINE_POINTS.map((item) => (
                <div
                  key={item}
                  data-home-card
                  className="
                    flex
                    items-center
                    gap-2.5
                    text-sm
                    font-semibold
                    text-white
                  "
                >
                  <CheckCircle2
                    size={16}
                    className="
                      shrink-0
                      text-[var(--gold-300)]
                    "
                  />

                  {item}
                </div>
              ))}
            </div>

            <div
              className="
                mt-9
                flex
                flex-wrap
                gap-3
              "
            >
              <GoldButton href="/marine-galley">
                Explore Marine &amp; Galley
                <ArrowRight size={16} />
              </GoldButton>

              <a
                href="/catalogues/kitchen-king-galley-catalogue.pdf"
                target="_blank"
                rel="noreferrer"
                className="premium-dark-ghost-btn"
              >
                Galley Catalogue
                <Download size={16} />
              </a>
            </div>
          </div>


          <div
            data-float
            className="
              relative
              overflow-hidden
              rounded-[30px]
              border
              border-[var(--gold-400)]/30
              bg-[var(--navy-950)]
              p-8
              shadow-[0_30px_80px_rgba(0,0,0,0.24)]
              sm:p-10
            "
          >
            <div
              className="
                pointer-events-none
                absolute
                right-0
                top-0
                h-48
                w-48
                rounded-full
                bg-[var(--gold-400)]/8
                blur-3xl
              "
            />

            <div className="relative">
              <Ship
                size={42}
                strokeWidth={1.6}
                className="text-[var(--gold-300)]"
              />

              <p
                className="
                  mt-6
                  text-[11px]
                  font-extrabold
                  uppercase
                  tracking-[0.2em]
                  text-[var(--gold-300)]
                "
              >
                Marine Galley Engineering
              </p>

              <h3
                className="
                  mt-3
                  font-display
                  text-3xl
                  font-bold
                  text-white
                "
              >
                Purpose-built systems for constrained spaces.
              </h3>

              <p
                className="
                  mt-4
                  leading-relaxed
                  text-[var(--muted-dark)]
                "
              >
                Compact, secure and serviceable systems engineered
                for marine operating conditions, restricted
                footprints and demanding duty cycles.
              </p>

              <div
                data-home-grid
                className="
                  mt-7
                  grid
                  grid-cols-2
                  gap-3
                "
              >
                {[
                  "Compact Layouts",
                  "Secure Mounting",
                  "Service Access",
                  "Marine Materials",
                ].map((label) => (
                  <div
                    key={label}
                    data-home-card
                    className="
                      rounded-xl
                      border
                      border-white/12
                      bg-[var(--navy-900)]
                      px-4
                      py-4
                      text-xs
                      font-bold
                      uppercase
                      tracking-[0.08em]
                      text-white

                      transition-all
                      duration-300

                      hover:border-[var(--gold-400)]/35
                    "
                  >
                    {label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* =====================================================
          PROCESS
      ===================================================== */}
      <section
        data-process
        data-home-reveal
        className="
          relative
          bg-[var(--surface-cream)]
          py-24
          lg:py-28
        "
      >
        <div
          className="
            mx-auto
            max-w-7xl
            px-4
            sm:px-6
            lg:px-8
          "
        >
          <SectionHeading
            eyebrow="Our Process"
            center
            title="From requirement to commissioning."
            subtitle="A practical project flow that keeps design, fabrication and site execution connected."
          />

          <div
            className="
              relative
              grid
              gap-4
              md:grid-cols-5
            "
          >
            <div
              className="
                pointer-events-none
                absolute
                left-[5%]
                right-[5%]
                top-[38px]
                hidden
                h-px
                bg-gradient-to-r
                from-transparent
                via-[var(--gold-400)]/45
                to-transparent
                md:block
              "
            />

            {PROCESS_STEPS.map((item, index) => (
              <div
                key={item.step}
                data-process-step
                className="
                  group
                  relative
                  rounded-[22px]
                  border
                  border-[var(--line-light)]
                  bg-white
                  p-6
                  shadow-sm

                  transition-all
                  duration-300

                  hover:-translate-y-2
                  hover:border-[var(--gold-400)]/50
                  hover:shadow-[0_20px_50px_rgba(3,28,52,0.10)]
                "
              >
                <span
                  className="
                    font-display
                    text-4xl
                    font-bold
                    text-[var(--gold-500)]
                  "
                >
                  {item.step}
                </span>

                <h3
                  className="
                    mt-4
                    font-display
                    font-bold
                    text-[var(--navy-950)]
                  "
                >
                  {item.title}
                </h3>

                <p
                  className="
                    mt-2
                    text-sm
                    leading-relaxed
                    text-[var(--muted-light)]
                  "
                >
                  {item.desc}
                </p>

                {index < PROCESS_STEPS.length - 1 && (
                  <span
                    className="
                      absolute
                      -right-3
                      top-9
                      z-10
                      hidden
                      h-px
                      w-6
                      bg-[var(--gold-400)]/55
                      md:block
                    "
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* =====================================================
          CATALOGUE
      ===================================================== */}
      <section
        data-home-reveal
        className="
          relative
          overflow-hidden
          bg-white
          py-24
          lg:py-28
        "
      >
        <div
          data-parallax="28"
          className="
            pointer-events-none
            absolute
            right-[5%]
            top-10
            h-72
            w-72
            rounded-full
            bg-[var(--gold-400)]/5
            blur-3xl
          "
        />

        <div
          className="
            relative
            mx-auto
            grid
            max-w-7xl
            items-center
            gap-14
            px-4
            sm:px-6
            lg:grid-cols-[0.78fr_1.22fr]
            lg:px-8
          "
        >
          <div
            data-float
            className="
              mx-auto
              w-full
              max-w-[390px]
              rounded-[30px]
              border
              border-[var(--gold-400)]/30
              bg-[var(--navy-950)]
              p-9
              shadow-[0_30px_70px_rgba(2,24,45,0.18)]
            "
          >
            <div className="flex items-center justify-between">
              <span
                className="
                  text-[11px]
                  font-extrabold
                  uppercase
                  tracking-[0.22em]
                  text-[var(--gold-300)]
                "
              >
                Kitchen King Industries
              </span>

              <FileDown
                size={26}
                className="text-[var(--gold-300)]"
              />
            </div>

            <div
              className="
                mt-20
                border-y
                border-white/15
                py-8
              "
            >
              <p
                className="
                  font-display
                  text-5xl
                  font-bold
                  leading-none
                  text-white
                "
              >
                PRODUCT
                <br />
                CATALOGUE
              </p>

              <p
                className="
                  mt-4
                  font-display
                  text-2xl
                  font-bold
                  text-[var(--gold-300)]
                "
              >
                2026-27
              </p>
            </div>

            <p
              className="
                mt-8
                text-sm
                font-semibold
                leading-relaxed
                text-[var(--muted-dark)]
              "
            >
              Commercial kitchen and galley equipment range.
            </p>
          </div>


          <div>
            <div
              className="
                inline-flex
                items-center
                gap-2
                text-[11px]
                font-extrabold
                uppercase
                tracking-[0.2em]
                text-[var(--gold-500)]
              "
            >
              <Sparkles size={14} />
              Product Catalogue 2026-27
            </div>

            <h2
              className="
                mt-5
                font-display
                text-4xl
                font-bold
                leading-tight
                text-[var(--navy-950)]
                sm:text-5xl
              "
            >
              Explore the complete Kitchen King range.
            </h2>

            <p
              className="
                mt-5
                max-w-2xl
                text-base
                font-medium
                leading-relaxed
                text-[var(--muted-light)]
              "
            >
              Browse commercial cooking, preparation,
              refrigeration, washing, serving, ship galley and
              custom stainless-steel equipment in the latest
              catalogue.
            </p>

            <div
              className="
                mt-8
                flex
                flex-wrap
                gap-3
              "
            >
              <a
                href="/catalogues/kitchen-king-product-catalogue-2026-27.pdf"
                target="_blank"
                rel="noreferrer"
                className="premium-primary-btn"
              >
                Download Product Catalogue
                <Download size={17} />
              </a>

              <Link
                href="/products"
                className="premium-outline-btn"
              >
                Browse Online
                <ExternalLink size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>


      {/* =====================================================
          INDUSTRIES
      ===================================================== */}
      <section
        data-home-reveal
        className="
          border-y
          border-[var(--line-light)]
          bg-[var(--surface-cream)]
          py-20
        "
      >
        <div
          className="
            mx-auto
            grid
            max-w-7xl
            items-center
            gap-10
            px-4
            sm:px-6
            lg:grid-cols-[0.75fr_1.25fr]
            lg:px-8
          "
        >
          <div>
            <p
              className="
                text-[11px]
                font-extrabold
                uppercase
                tracking-[0.2em]
                text-[var(--gold-500)]
              "
            >
              Industries We Serve
            </p>

            <h2
              className="
                mt-3
                font-display
                text-3xl
                font-bold
                text-[var(--navy-950)]
              "
            >
              Built for demanding service environments.
            </h2>
          </div>

          <div className="min-w-0">
            <IndustriesMarquee />
          </div>
        </div>
      </section>


      {/* =====================================================
          FAQ
      ===================================================== */}
      <section
        data-home-reveal
        className="
          border-b
          border-[var(--line-light)]
          bg-[var(--off-white)]
          py-24
          lg:py-28
        "
      >
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            center
            eyebrow="FAQs"
            title="Frequently asked questions"
            subtitle="Answers to what teams usually ask before starting a kitchen project with us."
          />
          <FAQAccordion items={HOME_FAQS} />
        </div>
      </section>


      {/* =====================================================
          FINAL CTA
      ===================================================== */}
      <section
        data-home-reveal
        className="
          relative
          overflow-hidden
          bg-[var(--navy-950)]
          py-24
        "
      >
        <div className="absolute inset-0 hero-grid opacity-20" />

        <div
          data-parallax="45"
          className="
            pointer-events-none
            absolute
            -right-32
            -top-36
            h-[430px]
            w-[430px]
            rounded-full
            border
            border-[var(--gold-400)]/10
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            left-[18%]
            top-1/2
            h-64
            w-64
            -translate-y-1/2
            rounded-full
            bg-[var(--gold-400)]/5
            blur-3xl
          "
        />

        <div
          className="
            relative
            mx-auto
            grid
            max-w-7xl
            items-center
            gap-10
            px-4
            sm:px-6
            lg:grid-cols-[1fr_auto]
            lg:px-8
          "
        >
          <div>
            <div
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-[var(--gold-400)]/30
                bg-[var(--navy-900)]
                px-4
                py-2
              "
            >
              <ShieldCheck
                size={14}
                className="text-[var(--gold-300)]"
              />

              <p
                className="
                  text-[10px]
                  font-extrabold
                  uppercase
                  tracking-[0.18em]
                  text-[var(--gold-300)]
                "
              >
                Kitchen King Industries
              </p>
            </div>

            <h2
              className="
                mt-5
                max-w-3xl
                font-display
                text-3xl
                font-bold
                leading-tight
                text-white
                sm:text-4xl
              "
            >
              Ready to build a commercial kitchen that works as hard
              as your team?
            </h2>

            <p
              className="
                mt-4
                max-w-2xl
                text-base
                font-medium
                leading-relaxed
                text-[var(--muted-dark)]
              "
            >
              Share your layout, capacity, menu or equipment
              requirement. Our team can help define the right
              configuration.
            </p>
          </div>

          <div
            className="
              flex
              flex-col
              gap-3
              sm:flex-row
              lg:flex-col
            "
          >
            <GoldButton href="/contact">
              Request a Quotation
              <ArrowRight size={16} />
            </GoldButton>

            <a
              href="tel:+917738023814"
              className="
                premium-dark-ghost-btn
                justify-center
              "
            >
              Call 77380 23814
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}