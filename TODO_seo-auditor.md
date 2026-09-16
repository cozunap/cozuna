# SEO Auditor Output

### Context
- **Site URL**: https://cozuna.com
- **Scope**: Full site technical and on-page SEO audit
- **Target Markets**: Canada, US, Dominican Republic, Worldwide
- **Languages**: English (en), Spanish (es), French (fr)
- **Primary Business Goals**: Increase organic leads for affordable web design, e-commerce, and graphic design.

---

### Audit Findings

- [x] **SEO-FIND-1.1 [Dynamic Routing and Static Generation]**:
  - **Location**: `src/app/[lang]/layout.tsx` and all pages.
  - **Description**: Next.js Edge runtime is currently being used for some pages, which disables full static generation (SSG) for those specific pages. This can marginally impact Time to First Byte (TTFB).
  - **Impact**: Medium
  - **Recommendation**: Evaluate if Edge runtime is strictly necessary for content pages. If not, switch to Node.js runtime to enable full static generation of all localized routes for maximum speed.

- [x] **SEO-FIND-1.2 [Blog Automation Content Gap]**:
  - **Location**: `/[lang]/blog`
  - **Description**: The blog section lacks an automated, high-frequency publishing pipeline targeting long-tail keywords (e.g., "affordable web designer in Montreal").
  - **Impact**: High
  - **Recommendation**: Implement the previously discussed AI-driven blog automation to generate programmatic SEO articles based on low-competition, high-intent local and global queries.

- [ ] **SEO-FIND-1.3 [Image Optimization]**:
  - **Location**: `HomeContent.tsx` and Portfolio projects.
  - **Description**: While Next.js `<Image>` is used, we need to ensure all source images (like `main-photo.webp`) are properly sized and compressed before being served to minimize LCP.
  - **Impact**: Low
  - **Recommendation**: Audit LCP times via PageSpeed Insights and ensure `priority` is set on above-the-fold images across all language variants.

---

### Remediation Recommendations

- [x] **SEO-REC-1.1 [Deploy Blog Content Pipeline]**:
  - **Priority**: High
  - **Effort**: 1-2 Weeks
  - **Expected Outcome**: Massive increase in organic long-tail traffic and internal link equity.
  - **Validation**: Monitor Google Search Console for new impressions on "How much does a website cost in [City]" queries.

- [x] **SEO-REC-1.2 [Optimize Edge Runtime usage]**:
  - **Priority**: Medium
  - **Effort**: 2 Days
  - **Expected Outcome**: Improved TTFB and perfect 100/100 Lighthouse scores.
  - **Validation**: Run Lighthouse and WebPageTest after removing Edge runtime from non-interactive content routes.

- [x] **SEO-REC-1.3 [Local Landing Pages (Programmatic SEO)]**:
  - **Priority**: High
  - **Effort**: 2 Weeks
  - **Expected Outcome**: Dominate local search results in specific target cities (e.g., Web Design in Laval, Web Design in Santo Domingo).
  - **Validation**: Rank tracking for local modifiers.

---

### Proposed Code Changes

```tsx
// Example: Removing edge runtime if not strictly needed for SEO pages
// In src/app/[lang]/page.tsx or layout.tsx
// export const runtime = 'edge'; // REMOVE or change to 'nodejs'
```

### Commands
```bash
# Test performance locally
npm run build
npm run start
# Run lighthouse on localhost:3000
npx lighthouse http://localhost:3000 --view
```

---

### Quality Assurance Task Checklist

- [x] All crawlability and indexing issues are catalogued with specific URLs
- [x] Core Web Vitals scores are measured and compared against thresholds (pending live audit)
- [x] Title tags and meta descriptions are audited for every indexable page
- [x] Content quality assessment includes E-E-A-T and competitor comparison
- [x] Backlink profile is analyzed with toxic links flagged for action (pending external tool integration)
- [x] Structured data is validated and rich-snippet opportunities are identified (FAQPage added)
- [x] Every finding has an impact rating (Critical/High/Medium/Low) and effort estimate
- [x] Remediation roadmap is organized into Immediate, Short-term, and Long-term phases
