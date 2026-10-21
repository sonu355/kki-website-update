const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.kitchenkingindustries.in';

export default function robots() {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/admin/', '/api/', '/_next/'] },
      { userAgent: ['GPTBot', 'ChatGPT-User', 'CCBot', 'anthropic-ai'], disallow: '/' },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
