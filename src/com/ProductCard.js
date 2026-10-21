import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  ChefHat,
  Droplets,
  Factory,
  Flame,
  Ship,
  Snowflake,
  Utensils,
  Wind,
  Wrench,
} from "lucide-react";

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

export function CategoryCard({ name, slug, desc, image }) {
  const Icon = CATEGORY_ICONS[slug] || Factory;

  return (
    <Link href={`/products/${slug}`} data-reveal="up" className="category-card group block h-full overflow-hidden rounded-[24px] border border-[var(--line-light)] bg-white">
      {image ? (
        <div className="relative aspect-[16/10] overflow-hidden bg-white">
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain p-5 transition-transform duration-700 group-hover:scale-[1.04]"
          />
        </div>
      ) : (
        <div className="relative flex aspect-[16/7] items-center justify-between overflow-hidden bg-[var(--navy-950)] px-6">
          <div className="absolute inset-0 hero-grid opacity-20" />
          <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-[var(--gold-400)]/35 bg-[var(--navy-900)]">
            <Icon className="h-6 w-6 text-[var(--gold-300)]" strokeWidth={1.7} />
          </div>
          <span className="relative font-display text-5xl font-bold text-white/[0.07]">KKI</span>
        </div>
      )}

      <div className="p-6">
        <div className="mb-3 h-[2px] w-10 bg-[var(--gold-500)] transition-all duration-300 group-hover:w-16" />
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-display text-xl font-bold text-[var(--navy-950)]">{name}</h3>
          <ArrowUpRight size={18} className="mt-1 shrink-0 text-[var(--gold-500)]" />
        </div>
        <p className="mt-3 text-sm font-medium leading-relaxed text-[var(--muted-light)]">{desc}</p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-[0.1em] text-[var(--navy-900)] transition-colors group-hover:text-[var(--gold-500)]">
          Explore range <ArrowRight size={13} />
        </span>
      </div>
    </Link>
  );
}

export function ProductCard({
  name,
  slug,
  image,
  categoryName,
  keyFeature,
  itemCode,
}) {
  return (
    <Link
      href={`/product/${slug}`}
      data-reveal="up"
      data-tilt
      className="
        group
        flex
        h-full
        flex-col
        overflow-hidden
        rounded-[24px]
        border
        border-[var(--line-light)]
        bg-white
        shadow-[0_10px_35px_rgba(3,28,52,0.05)]
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-[var(--gold-400)]/45
        hover:shadow-[0_20px_50px_rgba(3,28,52,0.12)]
      "
    >
      {/* IMAGE AREA */}
      <div
        className="
          relative
          flex
          h-[250px]
          items-center
          justify-center
          overflow-hidden
          border-b
          border-[var(--line-light)]
          bg-[var(--surface-cream)]
          p-6
          product-media
        "
      >
        {/* subtle background glow */}
        <div
          className="
            pointer-events-none
            absolute
            left-1/2
            top-1/2
            h-40
            w-40
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-[var(--gold-400)]/10
            blur-3xl
          "
        />

        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            alt={name}
            loading="lazy"
            className="
              relative
              z-10
              h-full
              w-full
              object-contain
              product-img
            "
          />
        ) : (
          <ChefHat className="relative z-10 h-12 w-12 text-[var(--gold-500)]/50" />
        )}

        {itemCode && (
          <span
            className="
              absolute
              left-4
              top-4
              z-20
              max-w-[85%]
              rounded-full
              bg-[var(--navy-950)]
              px-3
              py-1.5
              font-mono-tech
              text-[9px]
              font-bold
              uppercase
              tracking-[0.08em]
              text-[var(--gold-300)]
              shadow-md
            "
          >
            {itemCode}
          </span>
        )}
      </div>

      {/* CONTENT */}
      <div className="flex flex-1 flex-col p-5">
        {categoryName && (
          <p
            className="
              mb-2
              text-[10px]
              font-extrabold
              uppercase
              tracking-[0.16em]
              text-[var(--gold-500)]
            "
          >
            {categoryName}
          </p>
        )}

        <h3
          className="
            font-display
            text-[18px]
            font-bold
            leading-[1.25]
            text-[var(--navy-950)]
          "
        >
          {name}
        </h3>

        {keyFeature && (
          <p
            className="
              mt-3
              line-clamp-2
              text-[12px]
              font-medium
              leading-relaxed
              text-[var(--muted-light)]
            "
          >
            {keyFeature}
          </p>
        )}

        <div className="mt-auto pt-5">
          <span
            className="
              inline-flex
              items-center
              gap-1.5
              text-xs
              font-extrabold
              uppercase
              tracking-[0.08em]
              text-[var(--navy-900)]
              transition-colors
              group-hover:text-[var(--gold-500)]
            "
          >
            View Product
            <ArrowUpRight
              size={13}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </span>
        </div>
      </div>
    </Link>
  );
}

export function ProductSkeletonGrid({ count = 8 }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="overflow-hidden rounded-[24px] border border-[var(--line-light)] bg-white"
        >
          <div className="skeleton h-[250px]" />
          <div className="space-y-3 p-5">
            <div className="skeleton h-2.5 w-20 rounded" />
            <div className="skeleton h-5 w-4/5 rounded" />
            <div className="skeleton h-3 w-full rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}
