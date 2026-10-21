import { PageHeader, SectionHeading, GoldButton } from "@/com/UI";
import { INDUSTRIES } from "@/com/SiteData";
import { Building2, ArrowRight } from "lucide-react";

export const metadata = { title: "Industries We Serve" };

const DESCRIPTIONS = {
  "Hotels": "Full-service hotel kitchens, banquet production and specialty cooking stations.",
  "Restaurants": "Cooking lines and prep stations built for busy, fast-paced service.",
  "Hospitals": "Hygienic, hospital-grade kitchen and canteen equipment for patient and staff catering.",
  "Resorts": "Multi-outlet kitchen setups for resorts with varied dining concepts.",
  "Cruise Ships": "Compact, rugged galley equipment engineered for constant motion at sea.",
  "Navy": "Defense-grade galley equipment built to naval specifications.",
  "Merchant Marine": "Reliable galley equipment for long voyages and demanding maritime conditions.",
  "Food Courts": "High-throughput cooking and serving equipment for multi-vendor food courts.",
  "Industrial Canteens": "Bulk cooking and serving lines for large industrial workforces.",
  "Cloud Kitchens": "Space-efficient, high-output equipment for delivery-first kitchen operations.",
  "Corporate Cafeterias": "Efficient, low-maintenance equipment for corporate dining facilities.",
  "Educational Institutions": "Safe, easy-to-operate kitchen equipment for schools and campuses.",
  "Airports": "Large-scale catering equipment for high-volume airport food service.",
  "Defense Projects": "Custom-engineered kitchen and galley solutions for defense installations.",
};

export default function IndustriesPage() {
  return (
    <main className="bg-[var(--off-white)]">
      <PageHeader eyebrow="Industries We Serve"
        title="Kitchens Engineered for Every Sector"
        subtitle="From five-star hotels to naval vessels, our equipment is built to match the demands of the environment it serves." />

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {INDUSTRIES.map((ind) => (
              <div key={ind} className="card-glow bg-white border border-[var(--steel-200)] rounded-2xl p-7">
                <div className="w-12 h-12 rounded-xl bg-[#c8912f]/10 border border-[#c8912f]/30 flex items-center justify-center mb-5">
                  <Building2 className="w-6 h-6 text-[var(--gold-500)]" />
                </div>
                <h3 className="font-display font-bold text-lg text-[var(--ink)] mb-2">{ind}</h3>
                <p className="text-[var(--steel-500)] text-sm leading-relaxed">{DESCRIPTIONS[ind]}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-14">
            <SectionHeading eyebrow="Get Started" center title="Have a Project in Mind?" />
            <GoldButton href="/contact">Discuss Your Requirement <ArrowRight size={16} /></GoldButton>
          </div>
        </div>
      </section>
    </main>
  );
}
