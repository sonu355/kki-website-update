import { PageHeader, SectionHeading, GoldButton } from "@/com/UI";
import { MARINE_POINTS } from "@/com/SiteData";
import { Ship, Anchor, ShieldCheck, Wrench, ArrowRight, CheckCircle2, Download } from "lucide-react";

export const metadata = {
  title: "Marine & Galley Equipment",
  description: "Marine-grade galley equipment engineered for ships, offshore platforms and the merchant marine — confined-space optimised, corrosion-resistant SS304 fabrication from Kitchen King Industries.",
};

const GALLEY_ENVIRONMENTS = [
  { title: "Merchant Vessels", desc: "Galley layouts engineered for crew mess operations within tight vessel footprints." },
  { title: "Naval & Defense Craft", desc: "Rugged, secure-mounted equipment built to defense-grade durability expectations." },
  { title: "Offshore Platforms", desc: "Corrosion-resistant fabrication for constant humidity and salt exposure." },
  { title: "Cruise & Passenger Ships", desc: "High-throughput galley systems for large-scale passenger catering." },
];

const PRODUCT_FAMILIES = [
  "Marine Cooking Ranges", "Compact Galley Workstations", "Marine-Grade Sinks & Wash Units",
  "Secured Storage & Refrigeration", "Galley Exhaust & Ventilation", "Custom Galley Fabrication",
];

export default function MarineGalleyPage() {
  return (
    <main className="bg-[var(--off-white)]">
      <PageHeader eyebrow="Marine & Galley"
        title="Engineered for motion. Built for service at sea."
        subtitle="Galley equipment is a different engineering problem from a land-based kitchen — confined space, constant motion, corrosion, and zero tolerance for equipment that isn't secured properly." />

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <SectionHeading eyebrow="Why Marine Is Different" title="Compact-Space Engineering, Not a Scaled-Down Kitchen" />
            <p className="text-[var(--steel-500)] leading-relaxed mb-6">
              Every galley fit-out starts from the vessel's real constraints — hull layout, available
              footprint, motion at sea and access for maintenance — rather than adapting a standard
              commercial kitchen design.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {MARINE_POINTS.map((t) => (
                <div key={t} className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[var(--gold-500)] flex-shrink-0" />
                  <span className="text-sm text-[var(--ink)]/80">{t}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="aspect-[4/3] rounded-2xl border border-[var(--steel-200)] bg-gradient-to-br from-[var(--steel-100)] to-white steel-texture-light flex items-center justify-center">
            <Ship className="w-20 h-20 text-[var(--gold-500)]/40" />
          </div>
        </div>
      </section>

      <section className="py-24 navy-surface steel-texture">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Galley Environments" center light
            title="Built for Every Type of Vessel" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {GALLEY_ENVIRONMENTS.map((e) => (
              <div key={e.title} className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <Anchor className="w-8 h-8 text-[var(--gold-400)] mb-4" />
                <h3 className="font-display font-bold text-white mb-2">{e.title}</h3>
                <p className="text-[var(--steel-300)] text-sm leading-relaxed">{e.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Product Families" center title="Galley Equipment We Fabricate" />
          <div className="flex flex-wrap justify-center gap-3">
            {PRODUCT_FAMILIES.map((p) => (
              <span key={p} className="px-5 py-2.5 rounded-xl bg-[var(--steel-100)] border border-[var(--steel-200)] text-sm text-[var(--ink)]/80">{p}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-[var(--steel-100)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid sm:grid-cols-2 gap-6">
          <div className="card-glow bg-white border border-[var(--steel-200)] rounded-2xl p-8">
            <ShieldCheck className="w-9 h-9 text-[var(--gold-500)] mb-4" />
            <h3 className="font-display font-bold text-lg text-[var(--ink)] mb-2">Material & Durability</h3>
            <p className="text-[var(--steel-500)] text-sm leading-relaxed">
              Marine-grade stainless fabrication built to resist corrosion from constant salt-air and
              humidity exposure, with secure mounting for stability at sea.
            </p>
          </div>
          <div className="card-glow bg-white border border-[var(--steel-200)] rounded-2xl p-8">
            <Wrench className="w-9 h-9 text-[var(--gold-500)] mb-4" />
            <h3 className="font-display font-bold text-lg text-[var(--ink)] mb-2">Project Workflow</h3>
            <p className="text-[var(--steel-500)] text-sm leading-relaxed">
              Vessel-specific consultation, fabrication and installation — coordinated around your
              vessel's schedule and access constraints.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 text-center bg-white">
        <SectionHeading eyebrow="Get Started" center title="Request a Marine Consultation" />
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <GoldButton href="/contact">Talk to Our Marine Team <ArrowRight size={16} /></GoldButton>
          <a
            href="/catalogues/sag-marine-core-catalogue-2026.pdf"
            target="_blank"
            rel="noreferrer"
            className="premium-outline-btn"
          >
            Download Marine Catalogue <Download size={16} />
          </a>
        </div>
      </section>
    </main>
  );
}
