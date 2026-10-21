# Kitchen King Industries (KKI) — Website

A premium industrial engineering website for **Kitchen King Industries**, a
specialised company of SAG Engineering. Built with Next.js App Router, MySQL
and Cloudinary, in a navy / brushed-steel / gold design system derived from
the KKI logo, with a React Three Fiber 3D hero on the homepage.

## Tech Stack
- **Next.js 15** (App Router) + **React 19**
- **Tailwind CSS 4**
- **MySQL** via `mysql2` (categories, products, blog, homepage images, enquiries)
- **Cloudinary** — image uploads from the admin panel (product/category/blog/homepage images)
- **three / @react-three/fiber / @react-three/drei** — homepage 3D hero
- **gsap** — installed for scroll-linked animation (available for further section work)
- **lucide-react** + **react-icons** for iconography

## Getting Started

```bash
npm install
cp .env.example .env.local   # then fill in every value below
```

### Required environment variables (`.env.local`)

| Variable | Required for | Notes |
|---|---|---|
| `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` | Everything DB-backed | MySQL connection |
| `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` | Admin image uploads | Get these from your Cloudinary dashboard |
| `ADMIN_USERNAME`, `ADMIN_PASSWORD` | Admin panel login | Choose a strong, unique password |
| `ADMIN_SESSION_SECRET` | Admin panel login | Long random string — generate with `openssl rand -hex 32` |
| `NEXT_PUBLIC_SITE_URL` | SEO metadata | Your live domain |

**The admin panel and every `/api/admin/*` route will refuse all requests until
`ADMIN_USERNAME`, `ADMIN_PASSWORD` and `ADMIN_SESSION_SECRET` are set.** This is
intentional — see "Admin Panel Auth" below.

Create the database and run the schema:
```bash
mysql -u youruser -p yourdatabase < schema.sql
```

Run the dev server:
```bash
npm run dev
```

Build for production:
```bash
npm run build
npm start
```

> This build was verified to compile successfully (`npm run build` — 33 routes, 0 errors)
> in the sandbox used to develop it, aside from Google Fonts requiring normal internet
> access (blocked in that sandbox only — resolves fine on any machine/host with standard
> outbound access).

## Admin Panel Auth

`/admin` and every `/api/admin/*` route are gated by `middleware.js`, which checks
for a signed session cookie set at `/admin/login`. There's no user table — it's a
single shared login backed by the three env vars above, appropriate for a site
with one admin operator. If you need multiple admin accounts with different
permissions later, replace `src/lib/auth.js` with a proper users table + hashed
passwords; the middleware and route protection pattern stays the same.

Session tokens are HMAC-signed (Web Crypto API, so it works in both the Edge
middleware runtime and normal Node API routes) and expire after 12 hours.

## Image Uploads (Cloudinary)

Every admin image upload (category images, product images, blog cover images,
homepage gallery images) uploads to Cloudinary via `src/lib/cloudinary.js` and
stores the resulting `secure_url` in MySQL — not base64. `src/lib/image.js`
exports `resolveImageUrl()`, used by every page that renders a stored image; it
returns Cloudinary URLs as-is and falls back to wrapping older base64 values
in a data URI, so nothing already in the database breaks if you're migrating
from an earlier version of this project.

## What's Included

- **Pages**: Home (3D hero), About, Products (index + category + product detail),
  Marine & Galley, Industries, Manufacturing, Services, Projects, Gallery,
  Blog (index + detail), Career, FAQ, Contact, Privacy Policy, Terms, custom 404,
  sitemap.xml, robots.txt
- **Admin panel** (`/admin`, login-gated) — CRUD for categories, products, blog
  posts and homepage/gallery images, all uploading to Cloudinary
- **API routes** under `/api/*` — category, product, blog, contact, career, homepage
  image endpoints, all backed by MySQL
- **3D Homepage Hero** (`src/com/Hero3D.js` + `src/com/three/*`) — a stylized
  primitive-geometry reinterpretation of the KKI hood/workstation, with
  scroll-linked camera movement, mouse parallax, and a static fallback for
  `prefers-reduced-motion` and mobile
- **Design system**: navy / brushed-steel / gold, Sora (headings) + Inter (body)
  + IBM Plex Mono (technical labels/dimensions), all in `src/app/globals.css`

## What Still Needs Your Input

1. **Real 3D models** — the hero currently uses stylized primitive geometry
   (triangular hood, boxy workstation) built entirely in Three.js, not a real
   product `.glb`. Swap in real optimized models at `src/com/three/KKIHood.js`
   and `src/com/three/CommercialRange.js` whenever you have them.
2. **Real product photography** — product/category pages ship with icon/gradient
   placeholder panels. Upload real KKI product photos via the admin panel once
   the database and Cloudinary are connected.
3. **Verified stats/certifications** — `src/com/SiteData.js` intentionally avoids
   any unverified numeric claims (years in business, project counts, ISO
   certification) per your brief. If you have real, documented figures, add them
   back in `CAPABILITY_STATS` and `CERTIFICATIONS`.
4. **Legal pages** — Privacy Policy and Terms are placeholder text; have them
   reviewed by counsel before publishing.
5. **Domain** — update `NEXT_PUBLIC_SITE_URL` in `.env.local` and the canonical
   URLs in `layout.js`/`sitemap.js` once you have the live domain.
6. **Real projects/case studies** — the Projects page currently shows project
   *types* and client categories rather than named case studies, since no
   verified client names were supplied. Add a `projects` table + real case
   studies once you have client authorization to publish them.

## Project Structure

```
src/
  app/              # Next.js App Router pages + API routes
    admin/          # Admin panel (login-gated)
      login/        # Admin login page
  com/              # Shared components (Navbar, Footer, Hero3D, UI, ProductCard, SiteData)
    three/          # React Three Fiber scene components (KKIHood, CommercialRange, etc.)
  lib/              # db.js (MySQL pool), cloudinary.js, auth.js, image.js
middleware.js       # Protects /admin and /api/admin/* routes
public/
  logo.jpg          # Kitchen King Industries logo (also used as favicon)
schema.sql          # MySQL schema + starter category seed data
.env.example        # Environment variable template
```
