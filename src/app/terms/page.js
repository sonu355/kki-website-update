export const metadata = { title: "Terms & Conditions" };

export default function TermsPage() {
  return (
    <main className="bg-[var(--off-white)] pt-40 pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-display font-bold text-4xl text-[var(--ink)] mb-8">Terms &amp; Conditions</h1>
        <div className="space-y-6 text-[var(--ink)]/80 text-sm leading-relaxed">
          <p>These terms govern your use of the Kitchen King Industries website. By using this site, you
            agree to the terms below.</p>
          <h2 className="text-[var(--ink)] font-semibold text-lg mt-8">Use of Content</h2>
          <p>All content, branding and product information on this site is the property of Kitchen King
            Industries / SAG Engineering and may not be reproduced without permission.</p>
          <h2 className="text-[var(--ink)] font-semibold text-lg mt-8">Product Information</h2>
          <p>Specifications shown on this site are indicative. Final specifications are confirmed in
            writing at the time of quotation and order.</p>
          <h2 className="text-[var(--ink)] font-semibold text-lg mt-8">Quotations & Orders</h2>
          <p>Quotations are subject to separate commercial terms agreed at the time of order confirmation.</p>
          <p className="text-[var(--steel-500)] text-xs pt-6">This is placeholder terms text — replace with content reviewed by your legal counsel before publishing.</p>
        </div>
      </div>
    </main>
  );
}
