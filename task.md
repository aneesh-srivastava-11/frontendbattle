# NexusFlow — Build Task Tracker

## Phase 1 — Project Scaffolding
- [x] Run `create-next-app` with Next.js 16 flags
- [x] Verify `npm run build` passes clean
- [x] Confirm zero banned deps in `package.json`

## Phase 2 — Icon Components
- [x] `ChevronDown.tsx`
- [x] `ChevronLeft.tsx`
- [x] `ChevronRight.tsx`
- [x] `ChevronUp.tsx`
- [x] `ChevronUpSolid.tsx`
- [x] `Cog8Tooth.tsx`
- [x] `Cube16Solid.tsx`
- [x] `LinkIcon.tsx`
- [x] `LinkSolid.tsx`
- [x] `Search.tsx`
- [x] `XMark.tsx`
- [x] `ArrowPath.tsx`
- [x] `ArrowTrendingUp.tsx`
- [x] `ChartPie.tsx`
- [x] `index.ts` barrel export
- [x] `npm run build` passes

## Phase 3 — Design System
- [x] Color tokens in `globals.css` (6 tokens)
- [x] `@theme` Tailwind v4 extension
- [x] JetBrains Mono + Inter via `next/font/google`
- [x] `prefers-reduced-motion` global rule
- [x] Animation keyframes (`fade-in-up`, `glow-pulse`)
- [x] `npm run build` passes

## Phase 4 — Semantic Shell
- [x] `Header.tsx` (desktop nav + mobile slide-in with XMark)
- [x] `Footer.tsx` (4-col grid + newsletter)
- [x] `page.tsx` section stubs + SEO metadata
- [x] `layout.tsx` font variables + lang="en"
- [x] `npm run build` passes

## Phase 5 — Hero Section
- [x] Eyebrow label (mono, accent color)
- [x] `<h1>` headline (JetBrains Mono)
- [x] Supporting copy (Inter)
- [x] Primary + secondary CTAs with ChevronRight
- [x] Staggered entry animation (≤ 500ms)
- [x] Background gradient + accent glow
- [x] `npm run build` passes

## Phase 6 — Bento/Accordion (Feature 2)
- [x] Feature data array (6 items with icons)
- [x] Bento CSS Grid layout (desktop ≥ 768px)
- [x] Card hover/focus gradient glow
- [x] Accordion layout (mobile < 768px)
- [x] ChevronDown rotation 150ms ease-out
- [x] Panel slide open 300ms ease-in-out
- [x] `hoveredIndexRef` continuous tracking
- [x] `matchMedia` context-lock on resize
- [x] `npm run build` passes

## Phase 7 — Pricing (Feature 1)
- [x] `pricing-matrix.ts` — data model + `calculatePrice()`
- [x] `PricingSwitcher.tsx` — uncontrolled native toggle + select
- [x] `useEffect` event listeners (no useState in update path)
- [x] `textContent` DOM writes to price spans
- [x] `PricingCard.tsx` — `id` price spans (JetBrains Mono)
- [x] `PricingSection.tsx` — light bg section wrapper
- [x] Spark / Flow / Scale tiers
- [x] `npm run build` passes

## Phase 8 — Metrics Strip
- [x] 4-metric grid (99.9% / 10M+ / 500+ / <12ms)
- [x] IntersectionObserver entry animation
- [x] JetBrains Mono numbers, Inter labels
- [x] `npm run build` passes

## Phase 9 — README + Final Polish
- [x] README: re-render isolation strategy
- [x] README: context-lock implementation
- [x] README: motion timing compliance
- [x] README: color/type token mapping
- [x] Final heading hierarchy audit (single h1)
- [x] All icons have aria-label / alt
- [x] No lorem ipsum check
- [x] `npm run build` — final green ✅
- [/] `npm run lint` — running...
