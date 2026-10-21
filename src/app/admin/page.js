"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, Tag, Package, Newspaper, Image as ImageIcon, LogOut } from "lucide-react";
import { resolveImageUrl } from "@/lib/image";

const TABS = [
  { key: "categories", label: "Categories", Icon: Tag },
  { key: "products", label: "Products", Icon: Package },
  { key: "blog", label: "Blog", Icon: Newspaper },
  { key: "homepage", label: "Homepage Images", Icon: ImageIcon },
];

export default function AdminPage() {
  const [tab, setTab] = useState("categories");
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <main className="bg-[var(--off-white)] min-h-screen pt-32 pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-start justify-between gap-4 mb-2">
          <h1 className="font-display font-bold text-3xl text-[var(--ink)]">Admin Panel</h1>
          <button onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-[var(--steel-500)] border border-[var(--steel-200)] hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition-colors flex-shrink-0">
            <LogOut size={15} /> Logout
          </button>
        </div>
        <p className="text-[var(--steel-500)] text-sm mb-8">
          Manage categories, products, blog posts and homepage images. Requires a connected MySQL database (see README).
        </p>

        <div className="flex flex-wrap gap-2 mb-10 border-b border-[var(--steel-200)] pb-4">
          {TABS.map(({ key, label, Icon }) => (
            <button key={key} onClick={() => setTab(key)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                tab === key ? "gold-gradient text-black" : "bg-white text-[var(--steel-500)] border border-[var(--steel-200)] hover:text-[var(--ink)]"
              }`}>
              <Icon size={15} /> {label}
            </button>
          ))}
        </div>

        {tab === "categories" && <CategoryManager />}
        {tab === "products" && <ProductManager />}
        {tab === "blog" && <BlogManager />}
        {tab === "homepage" && <HomepageManager />}
      </div>
    </main>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label className="text-xs text-[var(--steel-500)] mb-1.5 block">{label}</label>
      {children}
    </div>
  );
}
const inputCls = "w-full rounded-xl border border-[var(--steel-200)] bg-[var(--steel-100)] px-4 py-3 text-sm text-[var(--ink)] focus:outline-none focus:border-[#c8912f]/60";

function CategoryManager() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [msg, setMsg] = useState(null);

  const load = () => fetch("/api/category").then((r) => r.json()).then((d) => setCategories(d.success ? d.categories : [])).catch(() => {});
  useEffect(() => { load(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("name", name);
    if (image) fd.append("image", image);
    const res = await fetch("/api/category", { method: "POST", body: fd });
    const data = await res.json();
    setMsg(data.message);
    if (data.success) { setName(""); setImage(null); load(); }
  };

  const del = async (id) => {
    await fetch("/api/category", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    load();
  };

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <form onSubmit={submit} className="bg-white border border-[var(--steel-200)] rounded-2xl p-6 space-y-4 h-fit">
        <h3 className="font-semibold text-[var(--ink)] mb-2">Add Category</h3>
        <Field label="Name"><input required value={name} onChange={(e) => setName(e.target.value)} className={inputCls} /></Field>
        <Field label="Image"><input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} className={inputCls} /></Field>
        <button className="w-full gold-gradient text-black font-bold py-3 rounded-xl flex items-center justify-center gap-2"><Plus size={16} /> Add Category</button>
        {msg && <p className="text-xs text-[var(--steel-500)]">{msg}</p>}
      </form>
      <div className="lg:col-span-2 space-y-3">
        {categories.map((c) => (
          <div key={c.id} className="flex items-center justify-between bg-white border border-[var(--steel-200)] rounded-xl p-4">
            <span className="text-sm text-[var(--ink)] font-medium">{c.name}</span>
            <button onClick={() => del(c.id)} className="text-[var(--steel-500)] hover:text-red-400"><Trash2 size={16} /></button>
          </div>
        ))}
        {categories.length === 0 && <p className="text-[var(--steel-500)] text-sm">No categories yet — or database not connected.</p>}
      </div>
    </div>
  );
}

function ProductManager() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ name: "", categoryId: "", description: "", specifications: "", featured: false });
  const [image, setImage] = useState(null);
  const [msg, setMsg] = useState(null);

  const load = () => {
    fetch("/api/admin/getallproduct").then((r) => r.json()).then((d) => setProducts(d.success ? d.products : [])).catch(() => {});
    fetch("/api/category/withoutimage").then((r) => r.json()).then((d) => setCategories(d.success ? d.categories : [])).catch(() => {});
  };
  useEffect(() => { load(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    if (image) fd.append("image", image);
    const res = await fetch("/api/postproduct", { method: "POST", body: fd });
    const data = await res.json();
    setMsg(data.message);
    if (data.success) { setForm({ name: "", categoryId: "", description: "", specifications: "", featured: false }); setImage(null); load(); }
  };

  const del = async (id) => {
    await fetch(`/api/admin/productsdel/${id}`, { method: "DELETE" });
    load();
  };

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <form onSubmit={submit} className="bg-white border border-[var(--steel-200)] rounded-2xl p-6 space-y-4 h-fit">
        <h3 className="font-semibold text-[var(--ink)] mb-2">Add Product</h3>
        <Field label="Name"><input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputCls} /></Field>
        <Field label="Category">
          <select required value={form.categoryId} onChange={(e) => setForm({ ...form, categoryId: e.target.value })} className={inputCls}>
            <option value="">Select category</option>
            {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </Field>
        <Field label="Description"><textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className={inputCls} /></Field>
        <Field label="Specifications"><textarea rows={3} value={form.specifications} onChange={(e) => setForm({ ...form, specifications: e.target.value })} className={inputCls} /></Field>
        <Field label="Image"><input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} className={inputCls} /></Field>
        <label className="flex items-center gap-2 text-sm text-[var(--ink)]/80">
          <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} /> Featured on homepage
        </label>
        <button className="w-full gold-gradient text-black font-bold py-3 rounded-xl flex items-center justify-center gap-2"><Plus size={16} /> Add Product</button>
        {msg && <p className="text-xs text-[var(--steel-500)]">{msg}</p>}
      </form>
      <div className="lg:col-span-2 space-y-3">
        {products.map((p) => (
          <div key={p.id} className="flex items-center justify-between bg-white border border-[var(--steel-200)] rounded-xl p-4">
            <div>
              <p className="text-sm text-[var(--ink)] font-medium">{p.name}</p>
              <p className="text-xs text-[var(--steel-500)]">{p.categoryName}</p>
            </div>
            <button onClick={() => del(p.id)} className="text-[var(--steel-500)] hover:text-red-400"><Trash2 size={16} /></button>
          </div>
        ))}
        {products.length === 0 && <p className="text-[var(--steel-500)] text-sm">No products yet — or database not connected.</p>}
      </div>
    </div>
  );
}

function BlogManager() {
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState({ title: "", excerpt: "", content: "", author: "Kitchen King Industries" });
  const [coverImage, setCoverImage] = useState(null);
  const [msg, setMsg] = useState(null);

  const load = () => fetch("/api/blog").then((r) => r.json()).then((d) => setBlogs(d.success ? d.blogs : [])).catch(() => {});
  useEffect(() => { load(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    if (coverImage) fd.append("coverImage", coverImage);
    const res = await fetch("/api/blog", { method: "POST", body: fd });
    const data = await res.json();
    setMsg(data.message || (data.success ? "Published" : "Error"));
    if (data.success) { setForm({ title: "", excerpt: "", content: "", author: "Kitchen King Industries" }); setCoverImage(null); load(); }
  };

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <form onSubmit={submit} className="bg-white border border-[var(--steel-200)] rounded-2xl p-6 space-y-4 h-fit">
        <h3 className="font-semibold text-[var(--ink)] mb-2">Write Blog Post</h3>
        <Field label="Title"><input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={inputCls} /></Field>
        <Field label="Excerpt"><textarea rows={2} value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} className={inputCls} /></Field>
        <Field label="Content"><textarea rows={6} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} className={inputCls} /></Field>
        <Field label="Cover Image"><input type="file" accept="image/*" onChange={(e) => setCoverImage(e.target.files[0])} className={inputCls} /></Field>
        <button className="w-full gold-gradient text-black font-bold py-3 rounded-xl flex items-center justify-center gap-2"><Plus size={16} /> Publish Post</button>
        {msg && <p className="text-xs text-[var(--steel-500)]">{msg}</p>}
      </form>
      <div className="lg:col-span-2 space-y-3">
        {blogs.map((b) => (
          <div key={b.id} className="bg-white border border-[var(--steel-200)] rounded-xl p-4">
            <p className="text-sm text-[var(--ink)] font-medium">{b.title}</p>
            <p className="text-xs text-[var(--steel-500)]">{new Date(b.createdAt).toLocaleDateString()}</p>
          </div>
        ))}
        {blogs.length === 0 && <p className="text-[var(--steel-500)] text-sm">No blog posts yet — or database not connected.</p>}
      </div>
    </div>
  );
}

function HomepageManager() {
  const [images, setImages] = useState([]);
  const [section, setSection] = useState("hero");
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState(null);

  const load = () => fetch("/api/homepage").then((r) => r.json()).then((d) => setImages(d.success ? d.images : [])).catch(() => {});
  useEffect(() => { load(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("section", section);
    fd.append("caption", caption);
    fd.append("sortOrder", 0);
    if (file) fd.append("image", file);
    const res = await fetch("/api/homepage", { method: "POST", body: fd });
    const data = await res.json();
    setMsg(data.success ? "Image saved" : data.message || "Error");
    if (data.success) { setCaption(""); setFile(null); load(); }
  };

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <form onSubmit={submit} className="bg-white border border-[var(--steel-200)] rounded-2xl p-6 space-y-4 h-fit">
        <h3 className="font-semibold text-[var(--ink)] mb-2">Add Homepage / Gallery Image</h3>
        <Field label="Section">
          <select value={section} onChange={(e) => setSection(e.target.value)} className={inputCls}>
            <option value="hero">Hero</option>
            <option value="facility">Manufacturing Facility</option>
            <option value="gallery">Gallery</option>
          </select>
        </Field>
        <Field label="Caption"><input value={caption} onChange={(e) => setCaption(e.target.value)} className={inputCls} /></Field>
        <Field label="Image"><input required type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} className={inputCls} /></Field>
        <button className="w-full gold-gradient text-black font-bold py-3 rounded-xl flex items-center justify-center gap-2"><Plus size={16} /> Upload Image</button>
        {msg && <p className="text-xs text-[var(--steel-500)]">{msg}</p>}
      </form>
      <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-3">
        {images.map((img) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={img.id} src={resolveImageUrl(img.image)} alt={img.caption || "image"} className="rounded-lg aspect-square object-cover border border-[var(--steel-200)]" />
        ))}
        {images.length === 0 && <p className="text-[var(--steel-500)] text-sm col-span-full">No images yet — or database not connected.</p>}
      </div>
    </div>
  );
}
