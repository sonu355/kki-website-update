"use client";
import { useState } from "react";
import { PageHeader } from "@/com/UI";
import { CheckCircle2, Send } from "lucide-react";

const OPENINGS = [
  { role: "Production Engineer", type: "Full-time · Manufacturing Unit" },
  { role: "Site Installation Technician", type: "Full-time · Field" },
  { role: "Sales & Business Development Executive", type: "Full-time · Office" },
];

export default function CareerPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", position: "", message: "" });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      const res = await fetch("/api/career", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      setStatus(data.success ? "success" : "error");
      if (data.success) setForm({ name: "", email: "", phone: "", position: "", message: "" });
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-[var(--off-white)]">
      <PageHeader eyebrow="Careers" title="Build Kitchens That Perform"
        subtitle="Join a manufacturing team engineering commercial kitchens across India." />

      <section className="py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10">
          <div>
            <h3 className="font-display font-bold text-2xl text-[var(--ink)] mb-6">Current Openings</h3>
            <div className="space-y-4">
              {OPENINGS.map((o) => (
                <div key={o.role} className="bg-white border border-[var(--steel-200)] rounded-xl p-6">
                  <p className="font-semibold text-[var(--ink)] mb-1">{o.role}</p>
                  <p className="text-xs text-[var(--steel-500)] uppercase tracking-widest">{o.type}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 space-y-2">
              {["Competitive compensation", "On-the-job engineering training", "Nationwide project exposure"].map((t) => (
                <div key={t} className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[var(--gold-500)] flex-shrink-0" />
                  <span className="text-sm text-[var(--ink)]/80">{t}</span>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bg-white border border-[var(--steel-200)] rounded-2xl p-8 space-y-5 h-fit">
            <h3 className="font-display font-bold text-xl text-[var(--ink)] mb-2">Apply Now</h3>
            <input required placeholder="Full Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full rounded-xl border border-[var(--steel-200)] px-4 py-3 text-sm focus:outline-none focus:border-[#c8912f]/60" />
            <input required placeholder="Phone Number" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full rounded-xl border border-[var(--steel-200)] px-4 py-3 text-sm focus:outline-none focus:border-[#c8912f]/60" />
            <input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full rounded-xl border border-[var(--steel-200)] px-4 py-3 text-sm focus:outline-none focus:border-[#c8912f]/60" />
            <input placeholder="Position Applying For" value={form.position} onChange={(e) => setForm({ ...form, position: e.target.value })}
              className="w-full rounded-xl border border-[var(--steel-200)] px-4 py-3 text-sm focus:outline-none focus:border-[#c8912f]/60" />
            <textarea rows={4} placeholder="Tell us about yourself" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full rounded-xl border border-[var(--steel-200)] px-4 py-3 text-sm focus:outline-none focus:border-[#c8912f]/60" />
            <button type="submit" disabled={loading}
              className="w-full gold-gradient text-black font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 disabled:opacity-60">
              <Send size={16} /> {loading ? "Submitting..." : "Submit Application"}
            </button>
            {status === "success" && <p className="text-sm text-green-400">Application submitted — we'll be in touch.</p>}
            {status === "error" && <p className="text-sm text-red-400">Could not submit right now. (Connect a database to enable this form.)</p>}
          </form>
        </div>
      </section>
    </main>
  );
}
