"use client";
import { useState } from "react";
import { PageHeader } from "@/com/UI";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2 } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { CONTACT } from "@/com/SiteData";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      setStatus(data.success ? "success" : "error");
      if (data.success) setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-[var(--off-white)]">
      <PageHeader eyebrow="Contact Us"
        title="Let's Engineer Your Kitchen"
        subtitle="Reach out for a site visit, product catalogue or a formal quotation." />

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-5 gap-10">
          {/* Info column */}
          <div className="lg:col-span-2 space-y-5">
            <a href={`tel:${CONTACT.phonePrimaryRaw}`} className="flex items-start gap-4 bg-white border border-[var(--steel-200)] rounded-2xl p-6 hover:border-[#c8912f]/40 transition-colors">
              <div className="w-11 h-11 rounded-xl bg-[#c8912f]/10 border border-[#c8912f]/30 flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-[var(--gold-500)]" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-[var(--steel-500)] mb-1">Call Us</p>
                <p className="text-[var(--ink)] font-semibold">{CONTACT.phonePrimary} / {CONTACT.phoneSecondary}</p>
              </div>
            </a>
            <a href={`mailto:${CONTACT.email}`} className="flex items-start gap-4 bg-white border border-[var(--steel-200)] rounded-2xl p-6 hover:border-[#c8912f]/40 transition-colors">
              <div className="w-11 h-11 rounded-xl bg-[#c8912f]/10 border border-[#c8912f]/30 flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-[var(--gold-500)]" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-[var(--steel-500)] mb-1">Email Us</p>
                <p className="text-[var(--ink)] font-semibold">{CONTACT.email}</p>
              </div>
            </a>
            <div className="flex items-start gap-4 bg-white border border-[var(--steel-200)] rounded-2xl p-6">
              <div className="w-11 h-11 rounded-xl bg-[#c8912f]/10 border border-[#c8912f]/30 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-[var(--gold-500)]" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-[var(--steel-500)] mb-1">Manufacturing Unit</p>
                <p className="text-[var(--ink)] font-semibold">{CONTACT.address}</p>
              </div>
            </div>
            <div className="flex items-start gap-4 bg-white border border-[var(--steel-200)] rounded-2xl p-6">
              <div className="w-11 h-11 rounded-xl bg-[#c8912f]/10 border border-[#c8912f]/30 flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-[var(--gold-500)]" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-[var(--steel-500)] mb-1">Business Hours</p>
                <p className="text-[var(--ink)] font-semibold">Mon – Sat, 9:00 AM – 6:00 PM</p>
              </div>
            </div>
            <a href={CONTACT.whatsappLink} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold py-3.5 rounded-xl hover:opacity-90 transition-opacity">
              <FaWhatsapp size={18} /> Chat on WhatsApp
            </a>
            <div className="aspect-video rounded-2xl overflow-hidden border border-[var(--steel-200)]">
              <iframe title="map" className="w-full h-full" loading="lazy"
                src="https://www.google.com/maps?q=Ghatkopar+West+Mumbai&output=embed" />
            </div>
          </div>

          {/* Form column */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="bg-white border border-[var(--steel-200)] rounded-2xl p-8 space-y-5">
              <h3 className="font-display font-bold text-2xl text-[var(--ink)] mb-2">Request a Quotation</h3>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-xs text-[var(--steel-500)] mb-1.5 block">Full Name *</label>
                  <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full rounded-xl border border-[var(--steel-200)] px-4 py-3 text-sm focus:outline-none focus:border-[#c8912f]/60" placeholder="Your name" />
                </div>
                <div>
                  <label className="text-xs text-[var(--steel-500)] mb-1.5 block">Phone Number</label>
                  <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full rounded-xl border border-[var(--steel-200)] px-4 py-3 text-sm focus:outline-none focus:border-[#c8912f]/60" placeholder="+91 00000 00000" />
                </div>
              </div>
              <div>
                <label className="text-xs text-[var(--steel-500)] mb-1.5 block">Email Address</label>
                <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-xl border border-[var(--steel-200)] px-4 py-3 text-sm focus:outline-none focus:border-[#c8912f]/60" placeholder="you@company.com" />
              </div>
              <div>
                <label className="text-xs text-[var(--steel-500)] mb-1.5 block">Subject</label>
                <input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="w-full rounded-xl border border-[var(--steel-200)] px-4 py-3 text-sm focus:outline-none focus:border-[#c8912f]/60" placeholder="e.g. Hotel kitchen fit-out enquiry" />
              </div>
              <div>
                <label className="text-xs text-[var(--steel-500)] mb-1.5 block">Message *</label>
                <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full rounded-xl border border-[var(--steel-200)] px-4 py-3 text-sm focus:outline-none focus:border-[#c8912f]/60" placeholder="Tell us about your project..." />
              </div>
              <button type="submit" disabled={loading}
                className="w-full gold-gradient text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 disabled:opacity-60">
                <Send size={16} /> {loading ? "Sending..." : "Send Enquiry"}
              </button>
              {status === "success" && (
                <p className="flex items-center gap-2 text-sm text-green-600"><CheckCircle2 size={16} /> Thanks — we'll be in touch shortly.</p>
              )}
              {status === "error" && (
                <p className="text-sm text-red-600">Could not submit right now — please call or WhatsApp us directly. (Connect a database to enable this form.)</p>
              )}
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
