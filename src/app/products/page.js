
import Link from "next/link";
import { ArrowRight, Package, Layers3 } from "lucide-react";
import { getDatabase } from "@/lib/mongodb";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Commercial Kitchen Equipment Manufacturer in Mumbai",
  description:
    "Explore commercial kitchen equipment, stainless steel equipment, industrial kitchen solutions and marine galley equipment from Kitchen King Industries, Mumbai.",
};

async function getProductsData() {
  const db = await getDatabase();

  const [categories, products] = await Promise.all([
    db
      .collection("category")
      .find({})
      .sort({ id: 1 })
      .toArray(),

    db
      .collection("product")
      .find({})
      .sort({ id: -1 })
      .toArray(),
  ]);

  return { categories, products };
}

export default async function ProductsPage() {
  let categories = [];
  let products = [];
  let error = false;

  try {
    const data = await getProductsData();
    categories = data.categories;
    products = data.products;
  } catch (err) {
    console.error("PRODUCTS PAGE ERROR:", err);
    error = true;
  }

  const categoryMap = new Map(
    categories.map((category) => [
      category.id,
      category,
    ])
  );

  return (
    <main className="min-h-screen bg-[#f6f2ea]">

      {/* PAGE INTRO */}

      <section className="bg-[#061b2f] px-5 pb-20 pt-44 text-white sm:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#d0a154]">
            Kitchen King Industries
          </p>

          <h1 className="max-w-4xl text-4xl font-extrabold leading-tight md:text-5xl">
            Commercial Kitchen Equipment
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/70">
            Explore professionally engineered commercial kitchen,
            industrial cooking, stainless steel fabrication and
            marine galley equipment.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <span className="rounded-full border border-white/20 px-4 py-2 text-sm">
              {categories.length} Categories
            </span>

            <span className="rounded-full border border-white/20 px-4 py-2 text-sm">
              {products.length} Products
            </span>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">

        {error ? (
          <div className="rounded-2xl border border-red-200 bg-white p-8 text-center">
            <h2 className="text-xl font-bold text-[#061b2f]">
              Unable to load products
            </h2>

            <p className="mt-3 text-gray-600">
              Please try refreshing the page.
            </p>
          </div>
        ) : (
          <>
            {/* PRODUCT CATEGORIES */}

            <section>
              <div className="mb-8">
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#b98532]">
                  Explore Our Range
                </p>

                <h2 className="text-3xl font-extrabold text-[#061b2f]">
                  Product Categories
                </h2>
              </div>

              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {categories.map((category) => {
                  const count = products.filter(
                    (product) =>
                      product.categoryId === category.id
                  ).length;

                  return (
                    <Link
                      key={category.id}
                      href={`/products/${category.slug}`}
                      className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#d0a154] hover:shadow-lg"
                    >
                      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#061b2f] text-[#d0a154]">
                        <Layers3 size={23} />
                      </div>

                      <h3 className="text-lg font-bold text-[#061b2f]">
                        {category.name}
                      </h3>

                      <p className="mt-2 text-sm text-gray-500">
                        {count} {count === 1 ? "Product" : "Products"}
                      </p>

                      <div className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#b98532]">
                        View Category
                        <ArrowRight
                          size={16}
                          className="transition-transform group-hover:translate-x-1"
                        />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>

            {/* ALL PRODUCTS */}

            <section className="mt-20">
              <div className="mb-8">
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#b98532]">
                  Our Collection
                </p>

                <h2 className="text-3xl font-extrabold text-[#061b2f]">
                  All Products
                </h2>

                <p className="mt-3 text-gray-600">
                  Discover equipment manufactured for commercial
                  kitchens, hospitality and industrial applications.
                </p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {products.map((product) => {
                  const category = categoryMap.get(
                    product.categoryId
                  );

                  const image =
                    typeof product.image === "string"
                      ? product.image.trim()
                      : "";

                  const validImage =
                    image.startsWith("/") ||
                    image.startsWith("https://") ||
                    image.startsWith("http://") ||
                    image.startsWith("data:image/");

                  return (
                    <Link
                      key={product.id}
                      href={`/product/${product.slug}`}
                      className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#d0a154]/50 hover:shadow-xl"
                    >
                      <div className="flex aspect-[4/3] items-center justify-center overflow-hidden bg-[#edf1f4]">
                        {validImage ? (
                          <img
                            src={image}
                            alt={product.name}
                            loading="lazy"
                            className="h-full w-full object-contain p-5 transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <Package
                            size={52}
                            className="text-[#b5bec7]"
                          />
                        )}
                      </div>

                      <div className="p-5">
                        <p className="mb-2 text-[11px] font-bold uppercase tracking-wide text-[#b98532]">
                          {category?.name || "Kitchen Equipment"}
                        </p>

                        <h3 className="min-h-[48px] text-base font-bold leading-snug text-[#061b2f]">
                          {product.name}
                        </h3>

                        {product.itemCode && (
                          <p className="mt-2 text-xs text-gray-500">
                            Code: {product.itemCode}
                          </p>
                        )}

                        <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
                          <span className="text-sm font-semibold text-[#061b2f]">
                            View Details
                          </span>

                          <ArrowRight
                            size={18}
                            className="text-[#b98532] transition-transform group-hover:translate-x-1"
                          />
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          </>
        )}
      </div>
    </main>
  );
}
