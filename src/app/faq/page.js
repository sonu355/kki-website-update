import { PageHeader, GoldButton } from "@/com/UI";
import { FAQS } from "@/com/SiteData";
import { ArrowRight } from "lucide-react";

export const metadata = { title: "FAQ" };

export default function FaqPage() {
  return (
    <main className="bg-[var(--off-white)]">
      <PageHeader eyebrow="FAQ" title="Frequently Asked Questions"
        subtitle="Answers to common questions about our manufacturing, projects and support." />
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4 mb-12">
            {FAQS.map((f) => (
              <div key={f.q} className="bg-white border border-[var(--steel-200)] rounded-xl p-6">
                <h3 className="font-semibold text-[var(--ink)] mb-2">{f.q}</h3>
                <p className="text-[var(--steel-500)] text-sm leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <GoldButton href="/contact">Still Have Questions? Contact Us <ArrowRight size={16} /></GoldButton>
          </div>
        </div>
      </section>
    </main>
  );
}
