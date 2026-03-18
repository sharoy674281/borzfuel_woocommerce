# Full SEO Audit Report: borzfuelnutrition.com

**Audit Date:** 2026-03-13
**Business Type:** Norwegian E-commerce (Supplements for Martial Arts)
**Technology:** Next.js App Router + WooCommerce Headless Backend
**Pages Analyzed:** 8

---

## Executive Summary

### Overall SEO Health Score: 51/100

| Category | Weight | Score | Weighted |
|----------|--------|-------|----------|
| Technical SEO | 25% | 72/100 | 18.0 |
| Content Quality | 25% | 38/100 | 9.5 |
| On-Page SEO | 20% | 50/100 | 10.0 |
| Schema / Structured Data | 10% | 35/100 | 3.5 |
| Performance (CWV) | 10% | 55/100 | 5.5 |
| Images | 5% | 50/100 | 2.5 |
| AI Search Readiness | 5% | 34/100 | 1.7 |
| **TOTAL** | | | **50.7** |

### Top 5 Critical Issues
1. **No canonical tags on any page** — high duplicate content risk
2. **No Organization or WebSite schema** — no entity signal for Google Knowledge Graph
3. **Homepage has ~150 words** — critically thin for a YMYL-adjacent supplements site
4. **No "About Us" page** — worst E-E-A-T gap for a health supplements company
5. **Hero video has no poster image** — severely impacts LCP (Core Web Vital)

### Top 5 Quick Wins
1. Add canonical tags via Next.js `metadataBase` + `alternates.canonical` (1 hour)
2. Add Organization + WebSite JSON-LD to root layout (1 hour)
3. Add BreadcrumbList JSON-LD to product pages (30 min)
4. Add security headers in `next.config.ts` (30 min)
5. Fix FAQ to render answers server-side for crawlers (2 hours)

---

## 1. Technical SEO (72/100)

### Crawlability — PASS
- **robots.txt:** Well-configured. Allows all crawlers, blocks `/cart`, `/checkout`, `/api/`, `/order/`
- **Sitemap:** 8 URLs, valid XML, referenced in robots.txt
- Next.js SSR ensures full HTML delivery to crawlers

### Indexability — NEEDS IMPROVEMENT

| Severity | Issue | Detail |
|----------|-------|--------|
| **Critical** | No canonical tags | No `<link rel="canonical">` on any page. Risk of duplicate content via query params or alternate URLs. |
| **High** | Wrong `og:url` on /butikk | Points to homepage URL instead of `/butikk` |
| **High** | Wrong `og:type` on product pages | Uses `"website"` instead of `"product"` |
| **Medium** | No OG image on homepage | Social sharing lacks preview image |
| **Medium** | Product pages not cached (ISR) | Every request triggers fresh WooCommerce API call. No `generateStaticParams`. |

### Security — NEEDS IMPROVEMENT

| Severity | Issue |
|----------|-------|
| **High** | Missing Content-Security-Policy header |
| **High** | Missing X-Frame-Options header (clickjacking risk) |
| **Medium** | Missing X-Content-Type-Options, Referrer-Policy, Permissions-Policy |
| **Low** | X-Powered-By: Next.js exposed |

**Positive:** HTTPS enforced with HTTP 308 redirect. Strong HSTS (2-year max-age). Vercel hosting with modern TLS.

### URL Structure — PASS
- Clean semantic URLs: `/butikk`, `/product/creatine-chewing-tablets`
- Norwegian policy pages: `/vilkar-personvern`, `/frakt-levering`
- Minor: spaces in asset filenames (`logo borzfuel.png`) — use hyphens instead

### Mobile — PASS
- Correct viewport meta tag
- Responsive Tailwind CSS throughout
- Next.js Image with responsive `sizes`

### JavaScript Rendering — GOOD
- Server-side rendering confirmed (`X-Nextjs-Prerender: 1` on homepage)
- Full HTML in initial response
- JSON-LD server-rendered
- **Issue:** FAQ and ProductTabs use client-side `useState` — content hidden from crawlers on initial load

---

## 2. Content Quality (38/100)

### E-E-A-T Assessment

| Dimension | Score | Key Issues |
|-----------|-------|------------|
| **Experience** | 25/100 | Brand story is ~45 words. No founder profiles, bios, or credentials. Testimonials are hardcoded (3 total, first names only, no dates/photos). |
| **Expertise** | 20/100 | GMP claim exists but no certificate image/link. No formulation rationale, scientific references, or dosage explanations. Only 5 FAQ questions, all logistical. |
| **Authoritativeness** | 15/100 | No external citations, press, partnerships, or federation affiliations. No backlink-worthy content. .com domain instead of .no. |
| **Trustworthiness** | 45/100 | Contact info present (email, phone, address). Complete legal pages. Cookie consent. Payment methods listed. But: no trust seals, no verified reviews, newsletter form is broken. |

### Page-by-Page Content Depth

| Page | Word Count | Minimum Needed | Verdict |
|------|-----------|----------------|---------|
| Homepage `/` | ~150 | 500 | CRITICALLY THIN |
| Shop `/butikk` | ~10 | 300 | CRITICALLY THIN |
| Product pages | Depends on WooCommerce | 400+ | UNCERTAIN |
| Legal pages | 250-400 each | 200 | ADEQUATE |

### Critical Content Gaps
- **No "About Us" / "Om oss" page** — most damaging E-E-A-T gap for a supplements site
- **No blog or educational content** — zero informational pages for funnel queries
- **Homepage H1 is "Kreatin Tyggetabletter"** — product name, not site-level heading
- **Newsletter form is non-functional** — button has no onClick handler (broken trust signal)
- **FAQ is client-side rendered** — answers invisible to crawlers on initial load

---

## 3. On-Page SEO (50/100)

### Title Tags — GOOD
- Homepage: "Borzfuel Nutrition — Kosttilskudd for kampsport" ✓
- Template: `%s -- Borzfuel Nutrition` ✓
- Product pages dynamically generated from WooCommerce ✓

### Meta Descriptions — GOOD
- Homepage: "Premium kosttilskudd utviklet for kampsportutøvere. Kreatin, leddstøtte og mer. GMP-sertifisert. Rask levering i hele Norge." ✓
- Product pages: use `short_description` from WooCommerce (quality depends on WC content)

### Heading Structure — NEEDS WORK

| Issue | Severity |
|-------|----------|
| Homepage H1 is a product name, not brand/category heading | High |
| Shop page lacks meaningful headings beyond "Butikk" | Medium |
| Heading hierarchy generally clean on product pages | Pass |

### Internal Linking — NEEDS WORK
- Only ~10 internal links from homepage
- No cross-linking between products (e.g., "Customers also viewed")
- No breadcrumb on shop page
- Category filter URLs (`?kategori=styrke`) are internal links but not in sitemap (acceptable for 2 products)

---

## 4. Schema / Structured Data (35/100)

### Existing Markup

| Page | Schema | Status |
|------|--------|--------|
| Product pages | Product + Offer + AggregateRating + Review | GOOD — well-implemented JSON-LD |
| All other pages | None | MISSING |

### Product Schema Validation

| Property | Status |
|----------|--------|
| @type Product | ✓ Pass |
| name, description, image, url | ✓ Pass |
| brand (Brand type) | ✓ Pass |
| offers (price, currency NOK, availability) | ✓ Pass |
| aggregateRating (conditional) | ✓ Pass |
| review (conditional) | ✓ Pass |
| sku / gtin / mpn | ✗ Missing |
| offers.seller | ✗ Missing |
| offers.shippingDetails | ✗ Missing |
| offers.hasMerchantReturnPolicy | ✗ Missing |
| offers.priceValidUntil | ✗ Missing |

### Missing Schema (by priority)

| Priority | Schema Type | Where |
|----------|------------|-------|
| **Critical** | Organization + WebSite | Root layout (site-wide) |
| **Critical** | BreadcrumbList | Product pages |
| **High** | Product identifiers (SKU) | Product pages |
| **High** | Seller + ShippingDetails + ReturnPolicy | Product offers |
| **Medium** | CollectionPage + ItemList | Shop page |
| **Low** | FAQPage | Homepage (note: Google restricts FAQ rich results to gov/healthcare since Aug 2023, but still useful for AI/GEO) |

---

## 5. Performance / Core Web Vitals (55/100)

### LCP (Largest Contentful Paint) — HIGH RISK

| Severity | Issue |
|----------|-------|
| **Critical** | Hero uses autoplay video as LCP element with **no poster image**. Blank/black screen until video loads. |
| **High** | No `<link rel="preload">` for above-fold content on homepage |
| **Medium** | Product images served from external domain (`checkout.borzfuelnutrition.com`) adding DNS/connection latency |

### INP (Interaction to Next Paint) — LOW-MEDIUM RISK
- 10 async JS chunks on homepage
- React Compiler enabled (positive — reduces re-renders)

### CLS (Cumulative Layout Shift) — LOW RISK
- Inter font preloaded as woff2 (prevents FOIT/FOUT)
- Next.js Image with `fill` + `sizes` reserves space

---

## 6. Images (50/100)

| Issue | Severity |
|-------|----------|
| Alt texts exist but are generic (product name fallback) | Medium |
| Spaces in filenames: `logo borzfuel.png`, `bilde av creatine liggende.jpg` | Low |
| Social gallery images: "BorzFuel athlete", "BorzFuel training" — not descriptive | Medium |
| Next.js Image component used correctly with responsive sizing | Pass |
| No oversized image issues detected (Next.js handles optimization) | Pass |

---

## 7. AI Search Readiness / GEO (34/100)

### AI Crawler Access — PASS
All AI crawlers (GPTBot, ClaudeBot, PerplexityBot, CCBot) allowed via wildcard rule.

### llms.txt — MISSING
No `/llms.txt` or `/.well-known/llms.txt` found.

### Citability — POOR (30/100)

| Issue | Severity |
|-------|----------|
| FAQ answers hidden behind client-side state | Critical |
| Product tab content (reviews, ingredients) hidden behind useState | Critical |
| Content passages too short for optimal AI citation (need 134-167 words) | High |
| No blog or educational content for informational queries | High |
| No FAQPage schema | High |

### Brand Signals — VERY WEAK (22/100)
- No Wikipedia entity
- No YouTube channel (strongest AI citation correlation at 0.737)
- No Reddit presence
- Only 15 total product reviews
- GMP claim with no verifiable certificate link

### Platform Readiness

| Platform | Score |
|----------|-------|
| Google AI Overviews | 35/100 |
| ChatGPT / SearchGPT | 20/100 |
| Perplexity | 25/100 |
| Bing Copilot | 25/100 |

---

## 8. Sitemap Analysis

### Structure — SOUND
- 8 URLs, valid XML
- Correct coverage: all indexable pages included, transactional pages excluded
- Referenced in robots.txt

### Issues

| Severity | Issue |
|----------|-------|
| **High** | All `lastmod` dates identical (`new Date()` on every build). Google learns to ignore lastmod. Use real modification dates from WooCommerce `date_modified`. |
| **Medium** | `priority` and `changefreq` present but ignored by Google. Remove for cleaner XML. |
| **Low** | Category filter URLs not in sitemap (acceptable at current scale) |

---

## Key Files That Need Changes

| File | Changes Needed |
|------|---------------|
| `src/app/layout.tsx` | Add canonical tags, Organization + WebSite JSON-LD, default OG image |
| `src/app/product/[slug]/page.tsx` | Add BreadcrumbList JSON-LD, fix og:type to "product", enhance Product schema (SKU, seller, shipping, returns) |
| `src/app/butikk/page.tsx` | Fix og:url, add CollectionPage + ItemList JSON-LD, add introductory content |
| `src/components/home/Hero.tsx` | Fix H1 to be brand-level, add poster image to video |
| `src/components/home/FAQ.tsx` | Server-render all answers, add FAQPage JSON-LD |
| `src/components/product/ProductTabs.tsx` | Render all tab content in HTML (use CSS toggle, not DOM removal) |
| `src/components/home/Newsletter.tsx` | Fix broken submit button (no onClick handler) |
| `src/app/sitemap.ts` | Use real modification dates, remove priority/changefreq |
| `next.config.ts` | Add security headers, set `poweredByHeader: false` |
