import React from 'react';
import Link from 'next/link';
import { Home, Package, Phone, ArrowRight, SearchX } from 'lucide-react';
import { CONTACT } from '@/com/SiteData';

export const metadata = {
  title: '404 — Page Not Found',
  description: 'The page you are looking for does not exist.',
};

const QUICK_LINKS = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/products', label: 'All Products', icon: Package },
  { href: '/contact', label: 'Contact Us', icon: Phone },
];

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[var(--off-white)] flex flex-col items-center justify-center px-4 py-20 relative steel-texture-light">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#c8912f]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#c8912f]/5 rounded-full blur-3xl" />
      </div>

      <div className="relative text-center max-w-lg w-full">
        <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg border border-[#c8912f]/20">
          <SearchX className="w-12 h-12 text-[var(--gold-500)]" />
        </div>

        <div className="text-[120px] font-black leading-none mb-2 gold-text-gradient font-display">404</div>

        <h1 className="text-2xl font-bold text-[var(--ink)] mb-3 font-display">Page Not Found</h1>
        <p className="text-[var(--steel-500)] leading-relaxed mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Try one of the links below or go back to the homepage.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
          {QUICK_LINKS.map(({ href, label, icon: Icon }) => (
            <Link key={label} href={href}>
              <button className={`w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 group ${
                href === '/' ? 'gold-gradient text-black shadow-lg' : 'bg-white hover:bg-[var(--steel-100)] text-[var(--ink)] border border-[var(--steel-200)]'
              }`}>
                <Icon size={15} />
                {label}
                <ArrowRight size={13} className="opacity-0 group-hover:opacity-100 -ml-1 group-hover:translate-x-1 transition-all" />
              </button>
            </Link>
          ))}
        </div>

        <div className="border-t border-[var(--steel-200)] pt-8">
          <p className="text-sm text-[var(--steel-500)] mb-4">Need help? Reach out to us directly.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center text-sm">
            <a href={`tel:${CONTACT.phonePrimaryRaw}`} className="flex items-center justify-center gap-2 text-[var(--gold-500)] hover:text-[var(--ink)] font-semibold transition-colors">
              <Phone size={14} /> {CONTACT.phonePrimary}
            </a>
            <span className="hidden sm:block text-[var(--steel-300)]">|</span>
            <a href={`mailto:${CONTACT.email}`} className="flex items-center justify-center gap-2 text-[var(--gold-500)] hover:text-[var(--ink)] font-semibold transition-colors">
              {CONTACT.email}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
