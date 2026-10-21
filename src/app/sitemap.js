export const dynamic = 'force-dynamic';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.kitchenkingindustries.in';

const STATIC_PAGES = [
  { url: BASE_URL, priority: 1.0, changeFrequency: 'monthly' },
  { url: `${BASE_URL}/about`, priority: 0.8, changeFrequency: 'monthly' },
  { url: `${BASE_URL}/products`, priority: 0.9, changeFrequency: 'weekly' },
  { url: `${BASE_URL}/industries`, priority: 0.7, changeFrequency: 'monthly' },
  { url: `${BASE_URL}/manufacturing`, priority: 0.7, changeFrequency: 'monthly' },
  { url: `${BASE_URL}/services`, priority: 0.7, changeFrequency: 'monthly' },
  { url: `${BASE_URL}/projects`, priority: 0.6, changeFrequency: 'monthly' },
  { url: `${BASE_URL}/gallery`, priority: 0.5, changeFrequency: 'monthly' },
  { url: `${BASE_URL}/blog`, priority: 0.6, changeFrequency: 'weekly' },
  { url: `${BASE_URL}/career`, priority: 0.4, changeFrequency: 'monthly' },
  { url: `${BASE_URL}/faq`, priority: 0.4, changeFrequency: 'monthly' },
  { url: `${BASE_URL}/contact`, priority: 0.8, changeFrequency: 'monthly' },
];

const PRODUCT_CATEGORIES = [
  'cooking-equipment', 'preparation-equipment', 'storage-equipment',
  'serving-equipment', 'washing-equipment', 'bakery-equipment',
  'galley-equipment', 'exhaust-ventilation', 'custom-fabrication',
];

export default async function sitemap() {
  const now = new Date();

  const staticEntries = STATIC_PAGES.map(({ url, priority, changeFrequency }) => ({
    url, lastModified: now, changeFrequency, priority,
  }));

  const categoryEntries = PRODUCT_CATEGORIES.map((slug) => ({
    url: `${BASE_URL}/products/${slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  let productEntries = [];
  try {
    const res = await fetch(`${BASE_URL}/api/getproducts`, { next: { revalidate: 3600 } });
    const data = await res.json();
    if (data.success && Array.isArray(data.products)) {
      productEntries = data.products.filter((p) => p.slug).map((p) => ({
        url: `${BASE_URL}/product/${p.slug}`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.7,
      }));
    }
  } catch {
    // static entries still returned
  }

  return [...staticEntries, ...categoryEntries, ...productEntries];
}
