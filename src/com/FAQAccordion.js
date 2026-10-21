"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

/**
 * Accessible accordion for the homepage FAQ section. Height animates via a
 * CSS grid-rows trick (no JS measuring, no layout thrash).
 */
export default function FAQAccordion({ items }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="divide-y divide-[var(--line-light)] rounded-2xl border border-[var(--line-light)] bg-white">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={item.q} data-reveal="up">
            <h3>
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? -1 : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <span className="font-display text-[15px] font-semibold text-[var(--navy-950)] sm:text-base">
                  {item.q}
                </span>
                <Plus
                  size={18}
                  className={`shrink-0 text-[var(--gold-500)] transition-transform duration-300 ${
                    isOpen ? "rotate-45" : ""
                  }`}
                />
              </button>
            </h3>
            <div
              className="faq-panel grid transition-[grid-template-rows] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <p className="px-6 pb-5 text-sm leading-relaxed text-[var(--steel-500)]">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
