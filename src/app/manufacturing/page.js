import { PageHeader, SectionHeading, GoldButton } from "@/com/UI";
import { PROCESS_STEPS, CERTIFICATIONS } from "@/com/SiteData";
import { Factory, Cog, ShieldCheck, ArrowRight } from "lucide-react";

export const metadata = { title: "Manufacturing" };

const CAPABILITIES = [
  "Precision Sheet Metal Cutting & Bending",
  "TIG & Spot Welding of SS304/316",
  "Surface Finishing & Polishing",
  "CNC-Assisted Fabrication",
  "In-House Quality Inspection",
  "Custom Jig-Based Production",
];

export default function ManufacturingPage() {
  return (
    <main className="bg-[var(--off-white)]">
      <PageHeader eyebrow="Our Manufacturing Facility"
        title="Precision Manufacturing, Purpose-Built for Kitchens"
        subtitle="Modern machinery, skilled fabricators and disciplined quality control — all under one roof." />

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-14 items-center">
          <div className="aspect-[4/3] rounded-2xl border border-[var(--steel-200)] bg-gradient-to-br from-[var(--steel-100)] to-white steel-texture flex items-center justify-center">
            <Factory className="w-20 h-20 text-[#c8912f]/40" />
          </div>
          <div>
            <SectionHeading eyebrow="Manufacturing Unit" title="Built for Consistency at Scale" />
            <p className="text-[var(--ink)]/80 leading-relaxed mb-6">
              Our production facility fabricates equipment end-to-end in premium SS304 stainless steel —
              from raw sheet to finished, inspected product — giving us full control over quality and lead times.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {CAPABILITIES.map((c) => (
                <div key={c} className="flex items-center gap-2.5">
                  <Cog className="w-4 h-4 text-[var(--gold-500)] flex-shrink-0" />
                  <span className="text-sm text-[var(--ink)]/80">{c}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-[var(--steel-100)] border-y border-[var(--steel-200)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Our Manufacturing Process" center title="From Consultation to Commissioning" />
          <div className="grid md:grid-cols-5 gap-6">
            {PROCESS_STEPS.map((p) => (
              <div key={p.step}>
                <p className="font-display text-4xl font-bold text-[#c8912f]/25 mb-3">{p.step}</p>
                <h3 className="font-display font-bold text-[var(--ink)] mb-2">{p.title}</h3>
                <p className="text-[var(--steel-500)] text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Quality Standards" center title="Certifications & Compliance" />
          <div className="grid sm:grid-cols-2 gap-4">
            {CERTIFICATIONS.map((c) => (
              <div key={c} className="flex items-start gap-3 bg-white border border-[var(--steel-200)] rounded-xl p-5">
                <ShieldCheck className="w-5 h-5 text-[var(--gold-500)] flex-shrink-0 mt-0.5" />
                <span className="text-sm text-[var(--ink)]/80">{c}</span>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <GoldButton href="/contact">Discuss a Custom Order <ArrowRight size={16} /></GoldButton>
          </div>
        </div>
      </section>
    </main>
  );
}
