"use client";
import { useEffect, useState, use } from "react";
import Link from "next/link";
import { ArrowLeft, Newspaper } from "lucide-react";
import { resolveImageUrl } from "@/lib/image";

export default function BlogDetailPage({ params }) {
  const { slug } = use(params);
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetch(`/api/bloggetbyid/${slug}`)
      .then((r) => r.json())
      .then((d) => { if (d.success) setBlog(d.blog); else setNotFound(true); })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  return (
    <main className="bg-[var(--off-white)] pt-32 pb-24 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-[var(--steel-500)] hover:text-[var(--gold-500)] mb-8 transition-colors">
          <ArrowLeft size={15} /> Back to Blog
        </Link>
        {loading ? (
          <p className="text-[var(--steel-500)] text-sm">Loading article…</p>
        ) : notFound || !blog ? (
          <div className="text-center py-24 bg-white border border-[var(--steel-200)] rounded-2xl">
            <Newspaper className="w-12 h-12 text-[#c8912f]/40 mx-auto mb-5" />
            <h1 className="font-display font-bold text-2xl text-[var(--ink)] mb-3">Article Not Found</h1>
            <p className="text-[var(--steel-500)] text-sm">This article isn&apos;t available yet.</p>
          </div>
        ) : (
          <article>
            <h1 className="font-display font-bold text-3xl sm:text-4xl text-[var(--ink)] mb-4">{blog.title}</h1>
            <p className="text-xs uppercase tracking-widest text-[var(--gold-500)] mb-8">
              {blog.author} · {new Date(blog.createdAt).toLocaleDateString()}
            </p>
            {blog.coverImage && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={resolveImageUrl(blog.coverImage)} alt={blog.title} className="w-full rounded-2xl mb-8 border border-[var(--steel-200)]" />
            )}
            <div className="prose prose-invert max-w-none text-[var(--ink)]/80 leading-relaxed whitespace-pre-line">{blog.content}</div>
          </article>
        )}
      </div>
    </main>
  );
}
