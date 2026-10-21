"use client";
import { useEffect, useState } from "react";
import { PageHeader } from "@/com/UI";
import { Factory, ChefHat, Ship, HardHat, Building2, Wrench } from "lucide-react";
import { resolveImageUrl } from "@/lib/image";

const CATEGORIES = [
  { label: "Factory", Icon: Factory },
  { label: "Kitchen Installations", Icon: ChefHat },
  { label: "Hotel Projects", Icon: Building2 },
  { label: "Marine Galley Projects", Icon: Ship },
  { label: "Manufacturing Process", Icon: Wrench },
  { label: "Completed Projects", Icon: HardHat },
];

export default function GalleryPage() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch("/api/homepage")
      .then((r) => r.json())
      .then((d) => { if (d.success) setImages(d.images || []); })
      .catch(() => {});
  }, []);

  return (
    <main className="bg-[var(--off-white)]">
      <PageHeader eyebrow="Gallery"
        title="Factory, Installations & Completed Projects"
        subtitle="A look at our manufacturing floor, on-site installations and finished kitchen projects." />

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CATEGORIES.map(({ label, Icon }) => (
              <div key={label} className="aspect-[4/3] rounded-2xl border border-[var(--steel-200)] bg-gradient-to-br from-[var(--steel-100)] to-white steel-texture flex flex-col items-center justify-center gap-4 card-glow">
                <Icon className="w-10 h-10 text-[#c8912f]/50" />
                <p className="text-sm font-semibold text-[var(--ink)]/80 uppercase tracking-widest">{label}</p>
              </div>
            ))}
          </div>
          {images.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
              {images.map((img) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={img.id} src={resolveImageUrl(img.image)} alt={img.caption || "Gallery image"}
                  className="rounded-xl object-cover aspect-square w-full border border-[var(--steel-200)]" />
              ))}
            </div>
          )}
          <p className="text-center text-[var(--steel-500)] text-sm mt-10">
            Connect a database and upload images via the admin panel to populate this gallery.
          </p>
        </div>
      </section>
    </main>
  );
}
