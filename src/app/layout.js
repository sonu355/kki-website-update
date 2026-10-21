import React from "react";

import {
  Sora,
  Inter,
  IBM_Plex_Mono,
} from "next/font/google";

import "./globals.css";

import Navbar from "@/com/Navbar";
import BrandIntro from "@/com/BrandIntro";
import Footer from "@/com/Footer";
import PageTransition from "@/com/PageTransition";
import SiteMotion from "@/com/SiteMotion";
import FloatingContact from "@/com/FloatingContact";

import { Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

import { CONTACT } from "@/com/SiteData";


// Runs before first paint: enables the motion CSS (unless the visitor prefers
// reduced motion) and holds hero animations until the brand intro has finished.
const MOTION_BOOT = `(function(){try{var d=document.documentElement;if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;d.classList.add("js-motion","intro-pending");setTimeout(function(){d.classList.remove("intro-pending")},4600)}catch(e){}})();`;

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: [
    "500",
    "600",
    "700",
    "800",
  ],
});


const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: [
    "300",
    "400",
    "500",
    "600",
    "700",
    "800",
  ],
});


const plexMono =
  IBM_Plex_Mono({
    variable:
      "--font-plexmono",

    subsets: ["latin"],

    weight: [
      "400",
      "500",
      "600",
    ],
  });


export const metadata = {
  title: {
    default:
      "Kitchen King Industries | Commercial Kitchen & Galley Equipment Manufacturer",

    template:
      "%s | Kitchen King Industries",
  },

  description:
    "Kitchen King Industries (KKI), a specialised company of SAG Engineering, designs, manufactures and installs commercial, hotel, industrial, marine galley and institutional kitchen equipment in stainless steel — nationwide project execution with AMC support.",

  keywords: [
    "Commercial Kitchen Equipment Manufacturer in Mumbai",
    "Kitchen Equipment Manufacturer in Ghatkopar",
    "Stainless Steel Kitchen Equipment Manufacturer in Mumbai",
    "Industrial Kitchen Equipment Manufacturer in Mumbai",
    "Fast Food Equipment Supplier Mumbai",
    "Galley Hot Plate Manufacturer India",
    "Canteen Kitchen Equipment Supplier India",
    "Food Warming Showcase Supplier Mumbai",
    "Hotel Kitchen Equipment Supplier in Mumbai",
    "commercial kitchen equipment manufacturer",
    "commercial kitchen equipment manufacturer Mumbai",
    "hotel kitchen equipment supplier",
    "galley equipment manufacturer",
    "marine galley equipment India",
    "industrial kitchen equipment fabricator",
    "stainless steel kitchen fabrication",
    "cloud kitchen equipment supplier",
    "hospital kitchen equipment manufacturer",
    "kitchen exhaust system manufacturer",
    "Kitchen King Industries",
    "SAG Engineering",
  ],

  authors: [
    {
      name:
        "Kitchen King Industries",
    },
  ],

  creator:
    "Kitchen King Industries",

  publisher:
    "Kitchen King Industries",

  openGraph: {
    title:
      "Kitchen King Industries | Commercial Kitchen & Galley Equipment Manufacturer",

    description:
      "Engineering commercial kitchens — manufacturing, supply, design, fabrication, installation and AMC for hotels, hospitals, marine and industrial clients.",

    url:
      "https://www.kitchenkingindustries.in",

    siteName:
      "Kitchen King Industries",

    locale:
      "en_IN",

    type:
      "website",
  },

  twitter: {
    card:
      "summary_large_image",

    title:
      "Kitchen King Industries | Commercial Kitchen Equipment Manufacturer",

    description:
      "A specialised company of SAG Engineering — engineering commercial kitchens nationwide.",
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
    },
  },

  alternates: {
    canonical:
      "https://www.kitchenkingindustries.in",
  },

  icons: {
    icon:
      "/logo.PNG",
  },
};


export default function RootLayout({
  children,
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: MOTION_BOOT }} />
        <meta
          name="author"
          content="Kitchen King Industries"
        />

        <meta
          name="geo.region"
          content="IN-MH"
        />

        <meta
          name="geo.placename"
          content="Mumbai"
        />
      </head>

      <body
        className={`
          ${sora.variable}
          ${inter.variable}
          ${plexMono.variable}

          relative

          bg-[var(--off-white)]

          antialiased
        `}
      >

        {/* Initial website entry animation */}
        <BrandIntro />


        {/* Global navigation */}
        <Navbar />


        {/* Smooth internal page change */}
        <PageTransition>
          {children}
        </PageTransition>


        {/* Global footer */}
        <Footer />


        {/* Scroll reveals, card tilt, magnetic buttons, back-to-top */}
        <SiteMotion />
        <FloatingContact />


        {/* ==================================================
            FLOATING CONTACT
        ================================================== */}

        <div
          className="
            fixed
            bottom-6
            right-5
            z-[80]

            flex
            flex-col
            gap-3
          "
        >

          {/* WHATSAPP */}

          <a
            href={
              CONTACT.whatsappLink
            }

            target="_blank"
            rel="noopener noreferrer"

            aria-label="Chat on WhatsApp"
            title="Chat on WhatsApp"

            className="
              group
              relative

              flex
              h-13
              w-13
              items-center
              justify-center

              rounded-full

              bg-[#25D366]

              text-white

              shadow-lg
              shadow-black/20

              transition-all
              duration-300

              hover:-translate-y-1
              hover:scale-105
              hover:shadow-xl
            "
          >
            <FaWhatsapp
              size={26}
            />

            <span
              className="
                pointer-events-none
                absolute
                right-full
                mr-3

                whitespace-nowrap

                rounded-lg

                bg-[var(--navy-950)]

                px-3
                py-1.5

                text-xs
                font-semibold
                text-white

                opacity-0

                shadow-lg

                transition-all
                duration-200

                group-hover:-translate-x-1
                group-hover:opacity-100
              "
            >
              WhatsApp Us
            </span>
          </a>


          {/* PHONE */}

          <a
            href={`tel:${CONTACT.phonePrimaryRaw}`}

            aria-label="Call us"
            title="Call us"

            className="
              group
              relative

              flex
              h-13
              w-13
              items-center
              justify-center

              rounded-full

              gold-gradient

              text-white

              shadow-lg
              shadow-black/20

              transition-all
              duration-300

              hover:-translate-y-1
              hover:scale-105
              hover:shadow-xl
            "
          >
            <Phone
              size={22}
            />

            <span
              className="
                pointer-events-none
                absolute
                right-full
                mr-3

                whitespace-nowrap

                rounded-lg

                bg-[var(--navy-950)]

                px-3
                py-1.5

                text-xs
                font-semibold
                text-white

                opacity-0

                shadow-lg

                transition-all
                duration-200

                group-hover:-translate-x-1
                group-hover:opacity-100
              "
            >
              Call Us
            </span>
          </a>
        </div>
      </body>
    </html>
  );
}