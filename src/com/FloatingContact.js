"use client";

import { useState } from "react";
import { Phone, X } from "lucide-react";
import { CONTACT } from "@/com/SiteData";

const WHATSAPP_ICON_PATH =
  "M16.04 3.2c-7.07 0-12.8 5.73-12.8 12.8 0 2.26.6 4.38 1.63 6.22L3.2 28.8l6.77-1.62a12.73 12.73 0 0 0 6.07 1.55h.01c7.07 0 12.8-5.73 12.8-12.8s-5.73-12.73-12.81-12.73Zm0 23.4a10.5 10.5 0 0 1-5.36-1.47l-.38-.23-4.02.96.96-3.92-.25-.4a10.47 10.47 0 0 1-1.61-5.6c0-5.84 4.76-10.6 10.62-10.6 2.83 0 5.5 1.1 7.5 3.11a10.53 10.53 0 0 1 3.1 7.5c0 5.84-4.75 10.6-10.6 10.6Zm5.8-7.94c-.31-.16-1.88-.93-2.17-1.03-.29-.11-.5-.16-.72.16-.21.31-.82 1.03-1.01 1.25-.19.21-.37.24-.68.08-.31-.16-1.32-.49-2.51-1.55-.93-.83-1.55-1.85-1.74-2.16-.18-.31-.02-.48.14-.64.14-.14.31-.37.47-.55.16-.19.21-.31.31-.52.1-.21.05-.4-.03-.55-.08-.16-.72-1.75-.99-2.4-.26-.62-.53-.54-.72-.55h-.62c-.21 0-.55.08-.84.39-.29.31-1.1 1.08-1.1 2.63s1.13 3.05 1.28 3.26c.16.21 2.22 3.4 5.38 4.76.75.33 1.34.52 1.8.67.76.24 1.44.21 1.99.13.6-.09 1.88-.77 2.15-1.51.26-.75.26-1.38.19-1.51-.08-.14-.29-.21-.6-.37Z";

/**
 * Fixed call + WhatsApp cluster, bottom-right. Mirrors the back-to-top button
 * on the opposite corner (see SiteMotion.js).
 */
export default function FloatingContact() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-5 z-[80] flex flex-col items-end gap-3">
      <div
        className={`flex flex-col items-end gap-3 transition-all duration-300 ${
          open
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-3 opacity-0"
        }`}
        aria-hidden={!open}
      >
        <a
          href={CONTACT.whatsappLink}
          target="_blank"
          rel="noreferrer"
          tabIndex={open ? 0 : -1}
          className="fab-item group flex items-center gap-2.5 rounded-full bg-white py-2.5 pl-4 pr-2.5 text-sm font-semibold text-[var(--navy-900)] shadow-lg shadow-black/15 ring-1 ring-black/5 transition-transform hover:-translate-y-0.5"
        >
          WhatsApp Us
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#25D366] text-white">
            <svg viewBox="0 0 32 32" className="h-[18px] w-[18px]" fill="currentColor" aria-hidden="true">
              <path d={WHATSAPP_ICON_PATH} />
            </svg>
          </span>
        </a>

        <a
          href={`tel:${CONTACT.phonePrimaryRaw}`}
          tabIndex={open ? 0 : -1}
          className="fab-item group flex items-center gap-2.5 rounded-full bg-white py-2.5 pl-4 pr-2.5 text-sm font-semibold text-[var(--navy-900)] shadow-lg shadow-black/15 ring-1 ring-black/5 transition-transform hover:-translate-y-0.5"
        >
          Call Us
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[var(--gold-500)] text-white">
            <Phone size={16} fill="currentColor" />
          </span>
        </a>
      </div>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "Close contact options" : "Contact us"}
        className="fab-ring grid h-14 w-14 place-items-center rounded-full bg-[var(--navy-950)] text-[var(--gold-300)] shadow-xl shadow-black/25 transition-transform hover:-translate-y-0.5"
      >
        {open ? (
          <X size={20} />
        ) : (
          <svg viewBox="0 0 32 32" className="h-[22px] w-[22px]" fill="currentColor" aria-hidden="true">
            <path d={WHATSAPP_ICON_PATH} />
          </svg>
        )}
      </button>
    </div>
  );
}
