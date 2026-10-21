import { Factory, ShieldCheck, Wrench, Clock, Ship, HardHat, Users, Award } from 'lucide-react';

// Real contact details as supplied in Kitchen King Industries' printed catalogue.

export const CONTACT = {
  phonePrimary: "77380 23814",
  phonePrimaryRaw: "+917738023814",

  phoneSecondary: "",
  phoneSecondaryRaw: "",

  email: "kki.sales@kitchenkingindustries.com",

  address:
    "Factory No.15, DK Market, Subhash Nagar, Jangleshwar Road, Asalpha Village, Ghatkopar (W), Survey No.23, Mumbai - 400086",

  whatsappLink:
    "https://wa.me/917738023814?text=Hello%2C%20I%20am%20interested%20in%20Kitchen%20King%20Industries%20equipment.",
};


// Capability statements — deliberately non-numeric/unverified-claim-free.
// Replace with real, documented figures if/when supplied by the business.
export const CAPABILITY_STATS = [
  { value: "SS304", label: "Food-Grade Fabrication" },
  { value: "In-House", label: "Manufacturing Unit" },
  { value: "9", label: "Product Categories" },
  { value: "Turnkey", label: "Design to Installation" },
];

export const FEATURES = [
  { title: "In-House Manufacturing Unit", desc: "Own fabrication facility producing SS304 equipment end-to-end, not just assembled.", Icon: Factory },
  { title: "Premium SS304 Fabrication", desc: "Food-grade stainless steel built for daily heavy-duty commercial use.", Icon: ShieldCheck },
  { title: "Custom Engineering", desc: "Every kitchen is designed to the site, the menu and the workflow.", Icon: Wrench },
  { title: "Structured Project Planning", desc: "Production planning built to keep multi-site rollouts on schedule.", Icon: Clock },
  { title: "Marine & Galley Expertise", desc: "Equipment engineered for ships, offshore rigs and confined galley spaces.", Icon: Ship },
  { title: "Installation & AMC", desc: "Turnkey installation backed by scheduled annual maintenance contracts.", Icon: HardHat },
  { title: "Experienced Engineers", desc: "A technical team fluent in commercial kitchen design standards.", Icon: Users },
  { title: "Backed by SAG Engineering", desc: "Engineering discipline and manufacturing systems inherited from our parent company.", Icon: Award },
];

export const INDUSTRIES = [
  "Hotels", "Restaurants", "Hospitals", "Resorts", "Cruise Ships", "Navy",
  "Merchant Marine", "Food Courts", "Industrial Canteens", "Cloud Kitchens",
  "Corporate Cafeterias", "Educational Institutions", "Airports", "Defense Projects",
];

export const PRODUCT_CATEGORIES = [
  { slug: "cooking-equipment", name: "Cooking Equipment", image: null, desc: "Ranges, tandoors, griddles, fryers and bulk cooking lines built for continuous commercial service." },
  { slug: "preparation-equipment", name: "Preparation Equipment", image: null, desc: "Work tables, cutting stations and mixers engineered for high-volume prep." },
  { slug: "storage-equipment", name: "Storage & Refrigeration", image: null, desc: "Cold storage, chest freezers, racks and SS cabinets for safe, organized storage." },
  { slug: "serving-equipment", name: "Serving Equipment", image: null, desc: "Bain maries, display counters and service lines for hotels, canteens and QSRs." },
  { slug: "washing-equipment", name: "Washing Equipment", image: null, desc: "Sinks, dishwashing lines and waste disposal units for fast, hygienic cleanup." },
  { slug: "bakery-equipment", name: "Bakery Equipment", image: null, desc: "Ovens, dough mixers, sheeters and provers for bakery and confectionery production." },
  { slug: "galley-equipment", name: "Galley Equipment", image: null, desc: "Marine-grade cooking and prep equipment engineered for ships and offshore platforms." },
  { slug: "exhaust-ventilation", name: "Exhaust & Ventilation", image: null, desc: "Kitchen exhaust hoods, ducting and fresh-air systems for a safe, code-compliant kitchen." },
  { slug: "custom-fabrication", name: "Custom Fabrication", image: null, desc: "Bespoke stainless steel fabrication for non-standard layouts and specialised equipment." },
];

export const PROCESS_STEPS = [
  { step: "01", title: "Site Study & Consultation", desc: "Our engineers study your menu, footfall and layout to define kitchen requirements." },
  { step: "02", title: "Design & Engineering", desc: "Detailed kitchen layout, workflow planning and equipment specification." },
  { step: "03", title: "In-House Fabrication", desc: "Precision manufacturing in SS304 at our own production facility." },
  { step: "04", title: "Installation & Commissioning", desc: "On-site installation, testing and handover by our technical team." },
  { step: "05", title: "AMC & Maintenance", desc: "Ongoing annual maintenance contracts to keep your kitchen running." },
];

// Verifiable, non-numeric standards only — no ISO or third-party certification
// claims until the business supplies certificates to back them.
export const CERTIFICATIONS = [
  "Food-Grade SS304 Material Standards",
  "Compliant Kitchen Exhaust & Ventilation Design",
  "Engineering Systems Backed by SAG Engineering",
  "Custom-Built to Project & Site Requirements",
];

export const FAQS = [
  { q: "Do you manufacture equipment in-house or outsource it?", a: "All core fabrication happens at our own manufacturing unit in SS304, giving us direct control over quality and lead times." },
  { q: "Can you design a kitchen from scratch?", a: "Yes — our engineers handle layout planning, equipment specification, fabrication, installation and commissioning as a turnkey project." },
  { q: "Do you supply marine and galley equipment?", a: "Yes, we design and fabricate galley equipment for ships, offshore platforms and the merchant marine, built to withstand constant motion and space constraints." },
  { q: "Do you offer AMC after installation?", a: "Yes, we offer Annual Maintenance Contracts covering scheduled servicing, breakdown support and spare parts." },
  { q: "What industries do you serve?", a: "Hotels, restaurants, hospitals, resorts, cruise ships, defense establishments, cloud kitchens, corporate cafeterias, educational institutions and airports." },
  { q: "Is Kitchen King Industries related to SAG Engineering?", a: "Yes, Kitchen King Industries is a specialised company of SAG Engineering, focused specifically on commercial kitchen and galley equipment." },
];

export const CLIENT_TYPES = ["Hotel Chains", "Hospital Groups", "Marine Operators", "Corporate Cafeterias", "Defense Establishments", "Cloud Kitchen Brands"];

// Marine & Galley — surfaced on the homepage per the brief's requirement that
// marine equipment be a major, dedicated part of the site, not just another category.
export const MARINE_POINTS = [
  "Confined-space optimised layouts",
  "Corrosion-resistant, marine-grade stainless steel",
  "Secure mounting for constant motion",
  "Ergonomic galley workflow engineering",
];

export const HOME_FAQS = [
  {
    q: "What kind of commercial kitchen equipment does Kitchen King Industries manufacture?",
    a: "We manufacture cooking, preparation, storage, washing, bakery and galley equipment in SS304 stainless steel, along with exhaust/ventilation systems and custom fabrication for non-standard layouts.",
  },
  {
    q: "Do you handle the full kitchen setup, or only supply equipment?",
    a: "We handle the full lifecycle — site study, layout planning, in-house fabrication, installation and commissioning, plus after-sales support and AMC.",
  },
  {
    q: "Can equipment be customized to my kitchen's layout and menu?",
    a: "Yes. Every project starts with our engineers studying your menu, footfall and available space, and equipment is engineered to that specific layout rather than sold off a fixed catalogue.",
  },
  {
    q: "Do you supply equipment for ships and offshore platforms?",
    a: "Yes. We design marine and galley equipment for the space, motion and safety constraints of ships, offshore rigs and confined galleys, in addition to land-based commercial kitchens.",
  },
  {
    q: "Which industries and kitchen types do you work with?",
    a: "Hotels, restaurants, hospitals, resorts, cruise ships, the navy and merchant marine, food courts, industrial canteens, cloud kitchens, corporate cafeterias, educational institutions, airports and defense projects.",
  },
];
