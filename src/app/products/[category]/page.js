"use client";
import { useEffect, useState, use } from "react";
import Link from "next/link";
import { PageHeader } from "@/com/UI";
import { ProductCard, ProductSkeletonGrid } from "@/com/ProductCard";
import { PRODUCT_CATEGORIES } from "@/com/SiteData";
import { ChefHat } from "lucide-react";
// import { resolveImageUrl } from "@/lib/image";

export default function ProductCategoryPage({ params }) {
  const { category } = use(params);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const catInfo = PRODUCT_CATEGORIES.find((c) => c.slug === category);
  const title = catInfo?.name || category.replace(/-/g, " ");

  useEffect(() => {
    setLoading(true);

    fetch(
      `/api/getproducts/getcatid?category=${encodeURIComponent(category)}`
    )
      .then(async (response) => {
        const data = await response.json();

        console.log("PRODUCT API RESPONSE:", data);

        if (!response.ok) {
          throw new Error(
            data.message || "Unable to fetch products"
          );
        }

        return data;
      })
      .then((data) => {
        if (data.success) {
          console.log("PRODUCTS FOUND:", data.products);

          setProducts(data.products || []);
        } else {
          setProducts([]);
        }
      })
      .catch((error) => {
        console.error("PRODUCT FETCH ERROR:", error);
        setProducts([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [category]);

  return (
    <main className="bg-[var(--off-white)]">
      <PageHeader eyebrow="Product Category" title={title} subtitle={catInfo?.desc} />
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 mb-10">
            {PRODUCT_CATEGORIES.map((c) => (
              <Link key={c.slug} href={`/products/${c.slug}`}
                className={`px-4 py-2 rounded-lg text-xs font-semibold border transition-all duration-300 hover:-translate-y-0.5 ${
                  c.slug === category ? "bg-[var(--gold-500)]/10 border-[var(--gold-500)]/45 text-[var(--gold-500)]" : "border-[var(--steel-200)] text-[var(--steel-500)] hover:border-[var(--gold-500)]/35"
                }`}>
                {c.name}
              </Link>
            ))}
          </div>

          {loading ? (
            <ProductSkeletonGrid />
          ) : products.length > 0 ? (
            <div key={category} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((p) => (
                <ProductCard 
                  key={p.id} 
                  name={p.name} 
                  slug={p.slug}
                  image={p.image}
                  categoryName={p.categoryName} 
                  itemCode={p.itemCode}
                  keyFeature={p.keyFeature}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white border border-[var(--steel-200)] rounded-2xl">
              <ChefHat className="w-10 h-10 text-[var(--gold-500)] mx-auto mb-4" />
              <p className="text-[var(--steel-500)] text-sm max-w-md mx-auto">
                No products are listed for this category yet. Connect a database and add products
                via the admin panel — this page will populate automatically.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
