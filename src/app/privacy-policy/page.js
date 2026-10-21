export const metadata = { title: "Privacy Policy" };

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-[var(--off-white)] pt-40 pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-display font-bold text-4xl text-[var(--ink)] mb-8">Privacy Policy</h1>
        <div className="space-y-6 text-[var(--ink)]/80 text-sm leading-relaxed">
          <p>Kitchen King Industries ("KKI", "we", "us") respects your privacy. This policy explains what
            information we collect through this website and how it is used.</p>
          <h2 className="text-[var(--ink)] font-semibold text-lg mt-8">Information We Collect</h2>
          <p>We collect information you submit through our contact, quotation and career forms — such as
            your name, email, phone number and message content.</p>
          <h2 className="text-[var(--ink)] font-semibold text-lg mt-8">How We Use It</h2>
          <p>Submitted information is used solely to respond to your enquiry, provide quotations, and
            process job applications. We do not sell or rent your information to third parties.</p>
          <h2 className="text-[var(--ink)] font-semibold text-lg mt-8">Cookies</h2>
          <p>This site may use basic cookies for essential functionality and analytics. You can control
            cookie preferences through your browser settings.</p>
          <h2 className="text-[var(--ink)] font-semibold text-lg mt-8">Contact</h2>
          <p>For privacy-related questions, contact us at sales@sagenginnering.in.</p>
          <p className="text-[var(--steel-500)] text-xs pt-6">This is placeholder policy text — replace with content reviewed by your legal counsel before publishing.</p>
        </div>
      </div>
    </main>
  );
}
