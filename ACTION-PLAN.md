# SEO Action Plan: borzfuelnutrition.com

**Generated:** 2026-03-13
**Current Score:** 51/100
**Target Score:** 75+/100

---

## CRITICAL — Fix Immediately

### 1. Add canonical tags to all pages
**Impact:** Prevents duplicate content penalties
**File:** `src/app/layout.tsx`
**Action:** Set `metadataBase` and add `alternates.canonical` in root layout metadata. Override per-page where needed.
**Effort:** 1 hour

### 2. Add Organization + WebSite JSON-LD (site-wide)
**Impact:** Establishes entity identity in Google Knowledge Graph
**File:** `src/app/layout.tsx`
**Action:** Add `<script type="application/ld+json">` with Organization (name, logo, email, phone, taxID, address) and WebSite schemas.
**Effort:** 1 hour

### 3. Add BreadcrumbList JSON-LD to product pages
**Impact:** Enables breadcrumb rich results in Google
**File:** `src/app/product/[slug]/page.tsx`
**Action:** Add BreadcrumbList JSON-LD alongside existing Product schema.
**Effort:** 30 minutes

### 4. Add poster image to Hero video
**Impact:** Fixes LCP — currently shows blank screen until video loads
**File:** `src/components/home/Hero.tsx`
**Action:** Add `poster="/path-to-poster.jpg"` attribute to `<video>` tag. Use a high-quality frame from the video.
**Effort:** 30 minutes

### 5. Create an "Om oss" (About Us) page
**Impact:** Single most important E-E-A-T fix for a supplements company
**Action:** Create `/om-oss` with:
  - Founder profiles (Armin & August — names found in image filename `armin-og-august-scaled.jpg`)
  - Photos and martial arts credentials
  - Company story and mission (expand the ~45-word brand story to 500+ words)
  - GMP certification details with link to certifying body
  - Org.nr 934 110 374 and Bergen address
**Effort:** 4-6 hours

### 6. Fix homepage H1
**Impact:** H1 "Kreatin Tyggetabletter" signals wrong page topic to search engines
**File:** `src/components/home/Hero.tsx`
**Action:** Change H1 to brand/category level, e.g., "Kosttilskudd for Kampsportutøvere" or "Premium Kosttilskudd for Kampsport"
**Effort:** 15 minutes

---

## HIGH — Fix Within 1 Week

### 7. Add security headers
**Impact:** Protects against XSS, clickjacking; improves trust signals
**File:** `next.config.ts`
**Action:** Add headers config:
```typescript
async headers() {
  return [{
    source: '/:path*',
    headers: [
      { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
    ],
  }];
},
poweredByHeader: false,
```
**Effort:** 30 minutes

### 8. Fix OG metadata on /butikk and product pages
**Impact:** Correct social sharing previews
**Files:** `src/app/butikk/page.tsx`, `src/app/product/[slug]/page.tsx`
**Action:**
- Override `og:url` on /butikk to use correct URL
- Change `og:type` to `"product"` on product pages
- Add default `og:image` to root layout
**Effort:** 1 hour

### 9. Server-render FAQ answers + add FAQPage schema
**Impact:** Makes FAQ content visible to all crawlers and AI systems
**File:** `src/components/home/FAQ.tsx`
**Action:** Render all answers in HTML (use CSS or `<details>`/`<summary>` for toggle). Add FAQPage JSON-LD.
**Effort:** 2-3 hours

### 10. Server-render all ProductTabs content
**Impact:** Makes reviews, ingredients, additional info visible to crawlers
**File:** `src/components/product/ProductTabs.tsx`
**Action:** Render all tab content in DOM, use CSS `display: none/block` to toggle (not conditional rendering).
**Effort:** 1-2 hours

### 11. Enhance Product schema
**Impact:** Better merchant listing eligibility in Google
**File:** `src/app/product/[slug]/page.tsx`
**Action:** Add `sku`, `offers.seller` (reference Organization @id), `shippingDetails`, `hasMerchantReturnPolicy`.
**Effort:** 2 hours

### 12. Add content to shop page
**Impact:** Currently ~10 words — critically thin
**File:** `src/app/butikk/page.tsx`
**Action:** Add 200-300 words of introductory text about the product range, targeting keywords like "kosttilskudd kampsport", "kreatin for utøvere".
**Effort:** 2 hours

### 13. Fix newsletter form
**Impact:** Broken feature damages user trust
**File:** `src/components/home/Newsletter.tsx`
**Action:** Connect submit button to a backend (e.g., Mailchimp, Brevo) or remove the section entirely.
**Effort:** 2-4 hours

---

## MEDIUM — Fix Within 1 Month

### 14. Fix sitemap lastmod dates
**Impact:** Correct freshness signals for Google crawl scheduling
**File:** `src/app/sitemap.ts`
**Action:** Use `product.date_modified` from WooCommerce for product pages. Hardcode real dates for static legal pages. Remove `priority` and `changeFrequency`.
**Effort:** 1-2 hours

### 15. Enable ISR caching for product pages
**Impact:** Reduces TTFB, improves LCP, reduces WooCommerce API load
**File:** `src/app/product/[slug]/page.tsx`
**Action:** Add `generateStaticParams()` to pre-render product pages. Use `revalidate = 60`.
**Effort:** 1-2 hours

### 16. Add CollectionPage + ItemList schema to /butikk
**Impact:** Helps Google understand product catalog structure
**File:** `src/app/butikk/page.tsx`
**Effort:** 1 hour

### 17. Create llms.txt file
**Impact:** Early-adopter advantage for AI search citation
**File:** `public/llms.txt`
**Action:** Describe site, products, citation preferences.
**Effort:** 1 hour

### 18. Improve image alt texts
**Impact:** Better image search visibility and accessibility
**Action:** In WooCommerce, set descriptive alt text (e.g., "BorzFuel Creatine Chewing Tablets - 60 blueberry liposomal creatine tablets"). Update social gallery alts in code.
**Effort:** 1 hour

### 19. Rename asset files (remove spaces)
**Action:** `logo borzfuel.png` → `logo-borzfuel.png`, etc.
**Effort:** 30 minutes

### 20. Add homepage content
**Impact:** Expand from ~150 words to 500+ words
**Action:** Expand brand story, add product philosophy section, add "Why martial artists choose BorzFuel" section.
**Effort:** 3-4 hours

---

## LOW — Backlog

### 21. Launch a blog / content hub
**Impact:** Highest long-term ROI for organic traffic and AI visibility
**Action:** Create `/blogg` section with educational articles:
- "Kreatin for kampsport: Hva utøvere bør vite"
- "Leddstøtte for grapplers: Hvordan forebygge skader"
- "Liposomal kreatin vs vanlig kreatin"
- "Kosttilskudd for MMA-utøvere: En komplett guide"
**Format:** 1000-2000 words per article, question-based H2/H3 headings, cite studies.
**Effort:** Ongoing (1-2 articles/week)

### 22. Build off-site brand presence
**Action:**
- Create YouTube channel (strongest AI citation correlation)
- Post on Reddit (r/MMA, r/bjj, Norwegian fitness subs)
- LinkedIn company page
- Seek Norwegian fitness/MMA media mentions
**Effort:** Ongoing

### 23. Add custom 404 page
**File:** `src/app/not-found.tsx`
**Effort:** 30 minutes

### 24. Add IndexNow integration
**Impact:** Instant indexing notification to Bing/Yandex
**Effort:** 1 hour

### 25. Pull real WooCommerce reviews to homepage
**Impact:** Replace 3 hardcoded testimonials with verified, dated reviews
**File:** `src/components/home/Testimonials.tsx`
**Effort:** 3-4 hours

---

## Implementation Priority Timeline

### Week 1 (Critical + Quick Wins)
- [ ] Items 1-4: Canonical tags, Organization schema, BreadcrumbList, video poster
- [ ] Item 6: Fix homepage H1
- [ ] Item 7: Security headers

### Week 2 (High Priority)
- [ ] Items 8-10: Fix OG metadata, server-render FAQ, server-render ProductTabs
- [ ] Item 11: Enhance Product schema
- [ ] Item 13: Fix newsletter form

### Week 3-4 (Medium Priority)
- [ ] Items 5, 12, 20: Create About page, add shop page content, expand homepage
- [ ] Items 14-19: Sitemap fix, ISR caching, CollectionPage schema, llms.txt, images, asset filenames

### Ongoing
- [ ] Items 21-22: Blog content creation, off-site brand building
- [ ] Items 23-25: 404 page, IndexNow, live testimonials

---

**Estimated score after completing Critical + High items: 70-75/100**
**Estimated score after completing all items: 80-85/100**
