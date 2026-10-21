import { PageHeader, SectionHeading, GoldButton } from "@/com/UI";
import { CLIENT_TYPES } from "@/com/SiteData";
import { Building, ArrowRight } from "lucide-react";

export const metadata = { title: "Projects" };

const PROJECT_TYPES = [
  { title: "Hotel Kitchen Rollouts", desc: "Multi-outlet kitchen fit-outs for hotel chains, including banquet and specialty cooking stations." },
  { title: "Hospital Kitchen & Canteen", desc: "Hygienic, code-compliant kitchens for patient catering and staff canteens." },
  { title: "Marine Galley Fit-Outs", desc: "Compact galley equipment supply and installation for ships and offshore platforms." },
  { title: "Industrial Canteen Setups", desc: "Bulk cooking and serving lines for large industrial and corporate workforces." },
  { title: "Cloud Kitchen Facilities", desc: "Space-efficient, high-output kitchen setups for delivery-first brands." },
  { title: "Institutional Kitchens", desc: "Kitchen equipment for educational campuses, defense establishments and airports." },
];

export default function ProjectsPage() {
  return (
    <main className="bg-[var(--off-white)]">
      <PageHeader eyebrow="Our Projects"
        title="Delivered Across Hospitality, Healthcare & Marine"
        subtitle="A track record of kitchen and galley projects executed across diverse, high-volume environments." />

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {PROJECT_TYPES.map((p) => (
              <div key={p.title} className="card-glow bg-[var(--steel-100)] border border-[var(--steel-200)] rounded-2xl p-7">
                <div className="w-12 h-12 rounded-xl bg-[var(--gold-500)]/10 border border-[var(--gold-500)]/30 flex items-center justify-center mb-5">
                  <Building className="w-6 h-6 text-[var(--gold-500)]" />
                </div>
                <h3 className="font-display font-bold text-lg text-[var(--ink)] mb-2">{p.title}</h3>
                <p className="text-[var(--steel-500)] text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>

          <SectionHeading eyebrow="Client Categories" center title="Who We Work With" />
          <div className="flex flex-wrap justify-center gap-3 mb-4">
            {CLIENT_TYPES.map((c) => (
              <span key={c} className="px-5 py-2.5 rounded-xl bg-[var(--steel-100)] border border-[var(--steel-200)] text-sm text-[var(--ink)]/80">{c}</span>
            ))}
          </div>

          <div className="text-center mt-14">
            <GoldButton href="/contact">Start Your Project <ArrowRight size={16} /></GoldButton>
          </div>
        </div>
      </section>
    </main>
  );
}
