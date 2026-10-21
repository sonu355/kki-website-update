"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChefHat } from "lucide-react";
import { PRODUCT_CATEGORIES } from "@/com/SiteData";

/**
 * Inline category-to-product picker: pick a category chip, its products
 * slide in right below — no page navigation. The animated version of a
 * static "browse by category" list.
 */
export default function CategoryExplorer() {
  const [active, setActive] = useState(PRODUCT_CATEGORIES[0]?.slug ?? "");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!active) return;
    let cancelled = false;
    setLoading(true);
    fetch(`/api/getproducts/getcatid?category=${encodeURIComponent(active)}`)
      .then((r) => r.json())
      .then((d) => {
        if (cancelled) return;
        const all = d.success ? d.products || [] : [];
        // Keep the grid's last row full (2 cols on mobile, 4 on desktop):
        // show 8, else 4, else whatever's there down to an even number.
        const count =
          all.length >= 8 ? 8 : all.length >= 4 ? 4 : all.length - (all.length % 2);
        setProducts(all.slice(0, count));
      })
      .catch(() => !cancelled && setProducts([]))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [active]);

  return (
    <div data-reveal="up">
      {/* Category chips */}
      <div className="flex flex-wrap justify-center gap-2.5">
        {PRODUCT_CATEGORIES.map((c) => {
          const isActive = c.slug === active;
          return (
            <button
              key={c.slug}
              type="button"
              onClick={() => setActive(c.slug)}
              aria-pressed={isActive}
              className={`rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-wide transition-all duration-300 hover:-translate-y-0.5 ${
                isActive
                  ? "border-[var(--gold-500)] bg-[var(--navy-950)] text-[var(--gold-300)] shadow-md shadow-black/10"
                  : "border-[var(--line-light)] bg-white text-[var(--steel-500)] hover:border-[var(--gold-400)]/50 hover:text-[var(--navy-900)]"
              }`}
            >
              {c.name}
            </button>
          );
        })}
      </div>

      {/* Product strip for the active category */}
      <div className="explorer-panel mt-10 rounded-3xl border border-[var(--line-light)] bg-white p-5 sm:p-7">
        {loading ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4" aria-hidden="true">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-2.5">
                <div className="skeleton aspect-square rounded-xl" />
                <div className="skeleton h-3 w-4/5 rounded" />
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-10 text-center">
            <ChefHat className="h-9 w-9 text-[#c8912f]/40" />
            <p className="text-sm text-[var(--steel-500)]">
              Products for this category are being added — check back soon, or ask us directly.
            </p>
          </div>
        ) : (
          <div key={active} className="explorer-grid grid grid-cols-2 gap-4 sm:grid-cols-4">
            {products.map((p, i) => (
              <Link
                key={p.id}
                href={`/product/${p.slug}`}
                className="explorer-item group block"
                style={{ "--i": i }}
              >
                <div className="aspect-square overflow-hidden rounded-xl border border-[var(--line-light)] bg-[var(--surface-cream)]">
                  {p.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={p.image}
                      alt={p.name}
                      className="h-full w-full object-contain p-3 transition-transform duration-500 group-hover:scale-110"
                      draggable="false"
                    />
                  ) : (
                    <div className="grid h-full w-full place-items-center">
                      <ChefHat className="h-8 w-8 text-[#c8912f]/30" />
                    </div>
                  )}
                </div>
                <p className="mt-2.5 line-clamp-2 text-xs font-semibold text-[var(--ink)] transition-colors group-hover:text-[var(--gold-500)]">
                  {p.name}
                </p>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-6 flex justify-center border-t border-[var(--line-light)] pt-5">
          <Link
            href={`/products/${active}`}
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-[var(--gold-500)] transition-colors hover:text-[var(--navy-900)]"
          >
            View full range
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </div>
  );
}
