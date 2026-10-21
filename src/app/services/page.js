import { PageHeader, SectionHeading, IconTile, GoldButton } from "@/com/UI";
import { Factory, Wrench, HardHat, ClipboardCheck, Ship, Settings, ArrowRight } from "lucide-react";

export const metadata = { title: "Services" };

const SERVICES = [
  { title: "Design & Consultation", desc: "Kitchen layout planning, workflow design and equipment specification for new or renovated facilities.", Icon: ClipboardCheck },
  { title: "Manufacturing & Fabrication", desc: "In-house SS304 fabrication of all core kitchen equipment to exact project specifications.", Icon: Factory },
  { title: "Supply", desc: "Reliable supply of standard and custom commercial kitchen equipment for single or multi-site rollouts.", Icon: Settings },
  { title: "Installation", desc: "On-site installation and commissioning by our own technical installation teams.", Icon: HardHat },
  { title: "AMC & Maintenance", desc: "Annual Maintenance Contracts covering scheduled servicing, repairs and spare parts.", Icon: Wrench },
  { title: "Marine & Galley Fit-Out", desc: "Specialised galley equipment supply and installation for ships and offshore platforms.", Icon: Ship },
];

export default function ServicesPage() {
  return (
    <main className="bg-[var(--off-white)]">
      <PageHeader eyebrow="Our Services"
        title="Complete Commercial Kitchen Engineering"
        subtitle="Manufacturer. Supplier. Designer. Fabricator. Installation Partner. AMC & Maintenance Services." />

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((s) => <IconTile key={s.title} {...s} />)}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[var(--steel-100)] border-y border-[var(--steel-200)] text-center">
        <SectionHeading eyebrow="Turnkey Solutions" center title="One Partner, Start to Finish"
          subtitle="From the first site visit to ongoing maintenance, our team stays involved through the full lifecycle of your kitchen." />
        <GoldButton href="/contact">Request a Quotation <ArrowRight size={16} /></GoldButton>
      </section>
    </main>
  );
}
