"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { PageHeader } from "@/com/UI";
import { Newspaper, Calendar } from "lucide-react";
import { resolveImageUrl } from "@/lib/image";

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/blog")
      .then((r) => r.json())
      .then((d) => setBlogs(d.success ? d.blogs || [] : []))
      .catch(() => setBlogs([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="bg-[var(--off-white)]">
      <PageHeader eyebrow="Blog" title="Insights from Kitchen King Industries"
        subtitle="Notes on commercial kitchen design, stainless steel fabrication and industry standards." />
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <p className="text-[var(--steel-500)] text-sm">Loading articles…</p>
          ) : blogs.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.map((b) => (
                <Link key={b.id} href={`/blog/${b.slug}`} className="card-glow block bg-white border border-[var(--steel-200)] rounded-2xl overflow-hidden">
                  <div className="aspect-video bg-gradient-to-br from-[var(--steel-100)] to-white flex items-center justify-center">
                    {b.coverImage ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={resolveImageUrl(b.coverImage)} alt={b.title} className="w-full h-full object-cover" />
                    ) : (
                      <Newspaper className="w-8 h-8 text-[#c8912f]/40" />
                    )}
                  </div>
                  <div className="p-6">
                    <p className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-[var(--steel-500)] mb-2">
                      <Calendar size={11} /> {new Date(b.createdAt).toLocaleDateString()}
                    </p>
                    <h3 className="font-display font-bold text-[var(--ink)] text-lg leading-snug">{b.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white border border-[var(--steel-200)] rounded-2xl">
              <Newspaper className="w-10 h-10 text-[#c8912f]/40 mx-auto mb-4" />
              <p className="text-[var(--steel-500)] text-sm max-w-md mx-auto">
                No articles published yet. Connect a database and publish posts via the admin panel.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
