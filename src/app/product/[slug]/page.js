
"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";

import { GoldButton } from "@/com/UI";
import ProductMediaExperience from "@/com/ProductMediaExperience";
import { ProductCard } from "@/com/ProductCard";

import {
  ChefHat,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Download,
} from "lucide-react";

function DetailSkeleton() {
  return (
    <div
      className="grid gap-12 lg:grid-cols-2"
      aria-hidden="true"
    >
      <div className="skeleton aspect-square rounded-2xl" />

      <div className="space-y-4 pt-2">
        <div className="skeleton h-3 w-28 rounded" />
        <div className="skeleton h-10 w-4/5 rounded" />
        <div className="skeleton h-3 w-full rounded" />
        <div className="skeleton h-3 w-11/12 rounded" />
        <div className="skeleton h-40 w-full rounded-xl" />
      </div>
    </div>
  );
}

export default function ProductDetailPage({ params }) {
  const { slug } = use(params);

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  // ==========================================
  // FETCH PRODUCT DETAILS
  // ==========================================

  useEffect(() => {
    let cancelled = false;

    setLoading(true);
    setNotFound(false);
    setRelated([]);
    setProduct(null);

    fetch(`/api/getbyslugproduct/${encodeURIComponent(slug)}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unable to load product");
        }

        return response.json();
      })
      .then((data) => {
        if (cancelled) return;

        if (data.success && data.product) {
          setProduct(data.product);
        } else {
          setNotFound(true);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setNotFound(true);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  // ==========================================
  // FETCH RELATED PRODUCTS
  // ==========================================

  useEffect(() => {
    if (!product?.categorySlug) return;

    let cancelled = false;

    fetch(
      `/api/getproducts/getcatid?category=${encodeURIComponent(
        product.categorySlug
      )}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (cancelled || !data.success) return;

        setRelated(
          (data.products || [])
            .filter((item) => item.slug !== slug)
            .slice(0, 4)
        );
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [product, slug]);

  // ==========================================
  // PRODUCT SPECIFICATIONS
  // ==========================================

  const specLines = (product?.specifications || "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  return (
    <main className="min-h-screen bg-[var(--off-white)] pb-24 pt-32">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

        {/* BACK TO PRODUCTS */}

        <Link
          href="/products"
          className="group mb-8 inline-flex items-center gap-2 text-sm text-[var(--steel-500)] transition-colors hover:text-[var(--gold-500)]"
        >
          <ArrowLeft
            size={15}
            className="transition-transform duration-300 group-hover:-translate-x-1"
          />
          Back to Products
        </Link>

        {/* LOADING STATE */}

        {loading ? (
          <DetailSkeleton />
        ) : notFound || !product ? (

          /* PRODUCT NOT FOUND */

          <div className="rounded-2xl border border-[var(--steel-200)] bg-white py-24 text-center">
            <ChefHat className="mx-auto mb-5 h-12 w-12 text-[#c8912f]/40" />

            <h1 className="mb-3 font-display text-2xl font-bold text-[var(--ink)]">
              Product Not Found
            </h1>

            <p className="mx-auto mb-8 max-w-md text-sm text-[var(--steel-500)]">
              This product isn&apos;t available yet — connect a database
              and add products via the admin panel to populate
              individual product pages.
            </p>

            <GoldButton href="/contact">
              Ask About This Product
              <ArrowRight size={16} />
            </GoldButton>
          </div>

        ) : (
          <>

            {/* ==========================================
                PRODUCT MAIN SECTION
            ========================================== */}

            <div className="grid gap-12 lg:grid-cols-2">

              {/* ==========================================
                  PRODUCT MEDIA - VERSION 3
                  PHOTO / 3D / CUTAWAY
              ========================================== */}

              <div className="pd-image-in self-start lg:sticky lg:top-28">

                <ProductMediaExperience
                  key={slug}
                  slug={slug}
                  name={product.name}
                  image={product.image}
                />

              </div>

              {/* ==========================================
                  PRODUCT INFORMATION
              ========================================== */}

              <div>

                {/* CATEGORY */}

                {product.categoryName && (
                  <p
                    className="hero-fade mb-3 text-xs uppercase tracking-widest text-[var(--gold-500)]"
                    style={{ "--d": 100 }}
                  >
                    {product.categoryName}
                  </p>
                )}

                {/* PRODUCT NAME */}

                <h1
                  className="hero-fade mb-5 font-display text-3xl font-bold text-[var(--ink)] sm:text-4xl"
                  style={{ "--d": 180 }}
                >
                  {product.name}
                </h1>

                {/* DESCRIPTION */}

                {product.description && (
                  <p
                    className="hero-fade mb-6 leading-relaxed text-[var(--ink)]/80"
                    style={{ "--d": 260 }}
                  >
                    {product.description}
                  </p>
                )}

                {/* ==========================================
                    SPECIFICATIONS
                ========================================== */}

                {specLines.length > 0 && (
                  <div
                    className="hero-fade mb-8 rounded-xl border border-[var(--steel-200)] bg-white p-6"
                    style={{ "--d": 340 }}
                  >

                    <h3 className="mb-4 flex items-center gap-2 font-semibold text-[var(--ink)]">
                      <CheckCircle2 className="h-4 w-4 text-[var(--gold-500)]" />
                      Specifications
                    </h3>

                    <ul className="space-y-2">

                      {specLines.map((line, index) => (
                        <li
                          key={index}
                          className="spec-row hero-fade text-sm text-[var(--steel-500)]"
                          style={{
                            "--d": 460 + Math.min(index, 12) * 70,
                          }}
                        >
                          {line}
                        </li>
                      ))}

                    </ul>

                  </div>
                )}

                {/* ==========================================
                    QUOTATION & CATALOGUE
                ========================================== */}

                <div
                  className="hero-fade flex flex-col gap-3 sm:flex-row"
                  style={{ "--d": 520 }}
                >

                  <Link
                    href="/contact"
                    className="premium-primary-btn"
                  >
                    Request a Quotation
                    <ArrowRight size={16} />
                  </Link>

                  <a
                    href="/catalogues/kitchen-king-product-catalogue-2026-27.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="premium-outline-btn"
                  >
                    Catalogue
                    <Download size={16} />
                  </a>

                </div>

              </div>
            </div>

            {/* ==========================================
                RELATED PRODUCTS
            ========================================== */}

            {related.length > 0 && (
              <section className="mt-24">

                <h2
                  data-reveal="up"
                  className="mb-8 font-display text-2xl font-bold text-[var(--navy-950)]"
                >
                  More in {product.categoryName}
                </h2>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

                  {related.map((item) => (
                    <ProductCard
                      key={item.id}
                      name={item.name}
                      slug={item.slug}
                      image={item.image}
                      categoryName={item.categoryName}
                      itemCode={item.itemCode}
                      keyFeature={item.keyFeature}
                    />
                  ))}

                </div>

              </section>
            )}

          </>
        )}

      </div>
    </main>
  );
}
