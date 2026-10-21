import { PageHeader, SectionHeading, GoldButton } from "@/com/UI";
import { CERTIFICATIONS, CAPABILITY_STATS } from "@/com/SiteData";
import { CheckCircle2, ArrowRight, Factory, ShieldCheck } from "lucide-react";

export const metadata = { title: "About Us" };

export default function AboutPage() {
  return (
    <main className="bg-[var(--off-white)]">
      <PageHeader eyebrow="About Kitchen King Industries"
        title="Engineering Commercial Kitchens, Backed by SAG"
        subtitle="A specialised company of SAG Engineering, built to manufacture, design and install commercial kitchen equipment nationwide." />

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <SectionHeading eyebrow="Who We Are" title="A Manufacturing Company, Not a Trading Company" />
            <p className="text-[var(--ink)]/80 leading-relaxed mb-5">
              Kitchen King Industries (KKI) is a manufacturing company backed by SAG Engineering, delivering
              complete commercial kitchen engineering solutions — hotel, restaurant, hospital, industrial,
              cloud kitchen and marine galley equipment — built in-house from premium stainless steel.
            </p>
            <p className="text-[var(--steel-500)] leading-relaxed mb-8">
              While we carry our own identity and specialisation in commercial kitchens, we inherit SAG
              Engineering&apos;s manufacturing discipline, machinery and experienced engineering team —
              giving clients the confidence of an established parent company behind every project.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {["Modern Manufacturing Technology", "Experienced Engineers", "Nationwide Project Execution", "High-Quality SS Fabrication"].map((t) => (
                <div key={t} className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[var(--gold-500)] flex-shrink-0" />
                  <span className="text-sm text-[var(--ink)]/80">{t}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="aspect-[4/3] rounded-2xl border border-[var(--steel-200)] bg-gradient-to-br from-[var(--steel-100)] to-white steel-texture-light flex items-center justify-center">
            <Factory className="w-20 h-20 text-[var(--gold-500)]/40" />
          </div>
        </div>
      </section>

      <section className="py-20 navy-surface steel-texture">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          {CAPABILITY_STATS.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-display text-4xl font-bold gold-text-gradient">{s.value}</p>
              <p className="text-[var(--steel-300)] text-xs uppercase tracking-widest mt-2">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Relationship with Our Parent Brand" center
            title="A Specialised Company of SAG Engineering"
            subtitle="SAG Engineering's manufacturing experience and quality systems support Kitchen King Industries' focused specialisation in commercial kitchen and galley equipment." />
          <div className="bg-[var(--steel-100)] border border-[var(--gold-500)]/20 rounded-2xl p-10 text-center">
            <ShieldCheck className="w-10 h-10 text-[var(--gold-500)] mx-auto mb-5" />
            <p className="text-[var(--ink)]/80 leading-relaxed max-w-2xl mx-auto">
              Kitchen King Industries operates as a distinct brand focused entirely on commercial kitchen
              engineering, while drawing on SAG Engineering&apos;s manufacturing infrastructure, workforce
              and quality standards to deliver consistent, dependable results.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[var(--steel-100)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Standards We Build To" center title="Quality You Can Verify" />
          <div className="grid sm:grid-cols-2 gap-4">
            {CERTIFICATIONS.map((c) => (
              <div key={c} className="flex items-start gap-3 bg-white border border-[var(--steel-200)] rounded-xl p-5">
                <CheckCircle2 className="w-5 h-5 text-[var(--gold-500)] flex-shrink-0 mt-0.5" />
                <span className="text-sm text-[var(--ink)]/80">{c}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 text-center bg-white">
        <GoldButton href="/contact">Talk to Our Team <ArrowRight size={16} /></GoldButton>
      </section>
    </main>
  );
}
