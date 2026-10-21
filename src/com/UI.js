import React from "react";
import CountUp from "@/com/CountUp";

export function Eyebrow({ children, dark = false }) {
  return (
    <div className="mb-4 inline-flex items-center gap-3">
      <span className="h-px w-9 bg-[var(--gold-500)]" />
      <span className={`text-[10px] font-extrabold uppercase tracking-[0.22em] sm:text-[11px] ${dark ? "text-[var(--gold-300)]" : "text-[var(--gold-500)]"}`}>
        {children}
      </span>
    </div>
  );
}

export function SectionHeading({ eyebrow, title, subtitle, center = false, light = false }) {
  return (
    <div data-reveal="up" className={`mb-11 ${center ? "flex flex-col items-center text-center" : ""}`}>
      {eyebrow && <Eyebrow dark={light}>{eyebrow}</Eyebrow>}
      <h2 className={`font-display text-3xl font-bold leading-[1.08] sm:text-4xl md:text-[2.85rem] ${light ? "text-white" : "text-[var(--navy-950)]"}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 max-w-2xl text-[15px] font-medium leading-relaxed sm:text-base ${light ? "text-[var(--muted-dark)]" : "text-[var(--muted-light)]"}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

export function PageHeader({ eyebrow, title, subtitle }) {
  return (
    <section className="hero-grid relative overflow-hidden bg-[var(--navy-950)] pb-24 pt-44">
      <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <div className="hero-fade" style={{ "--d": 0 }}><Eyebrow dark>{eyebrow}</Eyebrow></div>
        <h1 className="hero-fade font-display text-4xl font-bold leading-[1.03] text-white sm:text-5xl md:text-6xl" style={{ "--d": 120 }}>{title}</h1>
        {subtitle && <p className="hero-fade mx-auto mt-5 max-w-2xl text-base font-medium leading-relaxed text-[var(--muted-dark)] sm:text-lg" style={{ "--d": 260 }}>{subtitle}</p>}
      </div>
      <div className="absolute inset-x-0 bottom-0 h-1 bg-[var(--gold-500)]" />
    </section>
  );
}

export function IconTile({ Icon, title, desc }) {
  return (
    <div data-reveal="up" className="card-glow h-full rounded-[22px] border border-[var(--line-light)] bg-white p-7">
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--navy-950)] shadow-lg shadow-[var(--navy-950)]/10">
        <Icon className="h-5 w-5 text-[var(--gold-300)]" strokeWidth={1.8} />
      </div>
      <h3 className="mb-2 font-display text-lg font-bold text-[var(--navy-950)]">{title}</h3>
      <p className="text-sm font-medium leading-relaxed text-[var(--muted-light)]">{desc}</p>
    </div>
  );
}

export function GoldButton({ href, children, className = "" }) {
  return (
    <a href={href} className={`inline-flex items-center justify-center gap-2 rounded-full bg-[var(--gold-300)] px-6 py-3.5 text-[11px] font-black uppercase tracking-[0.08em] text-[var(--navy-950)] shadow-lg shadow-black/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#f2d9a5] hover:shadow-xl ${className}`}>
      {children}
    </a>
  );
}

export function GhostButton({ href, children, className = "", dark = false }) {
  return (
    <a href={href} className={`inline-flex items-center justify-center gap-2 rounded-full border px-6 py-3.5 text-[11px] font-black uppercase tracking-[0.08em] transition-all duration-300 ${
      dark
        ? "border-white/35 bg-[var(--navy-900)] text-white hover:border-[var(--gold-300)] hover:bg-[var(--navy-800)]"
        : "border-[var(--line-light)] bg-white text-[var(--navy-900)] hover:border-[var(--gold-500)] hover:text-[var(--gold-500)]"
    } ${className}`}>
      {children}
    </a>
  );
}

export function StatBlock({ value, label, dark = true }) {
  return (
    <div className="text-center">
      <p className={`font-display text-2xl font-bold sm:text-3xl ${dark ? "text-[var(--gold-300)]" : "text-[var(--navy-950)]"}`}><CountUp value={value} /></p>
      <p className={`mt-1.5 text-[9px] font-extrabold uppercase tracking-[0.14em] sm:text-[10px] ${dark ? "text-[var(--muted-dark)]" : "text-[var(--muted-light)]"}`}>{label}</p>
    </div>
  );
}
