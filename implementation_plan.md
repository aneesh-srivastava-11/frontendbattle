# AI Data Automation SaaS Landing Page — Implementation Plan

Build a premium landing page for **"NexusFlow"**, an AI-driven data automation platform. Single page, dark-first aesthetic, fully spec-compliant.

> [!NOTE]
> **Approved amendments**: Next.js 16, pricing tiers = **Spark / Flow / Scale**, social proof = metrics strip.

---

## User Review Required

> [!IMPORTANT]
> **Product naming**: I've chosen **"NexusFlow"** as the fictional brand name. The tagline will be along the lines of *"Automate your data pipelines with AI-driven intelligence."* — open to your preference.

> [!IMPORTANT]
> **Tailwind CSS version**: The spec says Tailwind CSS. I'll use **Tailwind v4** (the latest, installed via `@tailwindcss/postcss`). It uses CSS-native `@theme` configuration instead of `tailwind.config.js`. Confirm if you'd prefer Tailwind v3 with the classic config instead.

> [!WARNING]
> **`given-assets` vs `givenassets`**: Your repo currently has the folder named `givenassets` (no hyphen). The spec references `/given-assets`. I'll keep the existing `givenassets` folder as-is (it's reference-only and won't be imported into the app). The icons will be converted into React components under `components/icons/`.

## Open Questions

> [!IMPORTANT]
> **Pricing tier names & features**: I'll define 3 tiers — **Starter**, **Pro**, **Enterprise** — with realistic AI-automation feature lists. Are there specific feature names or tier structures you'd prefer?

> [!IMPORTANT]
> **Social proof section**: The spec says "logos or a metrics strip." I plan to do a **metrics strip** (large monospaced numbers like "99.9% Uptime", "10M+ Pipelines", "500+ Integrations", "< 12ms Latency") inspired by the demo video's statistics section, since we can't use external logo images. Is this approach acceptable, or would you prefer placeholder company name text as logos?

---

## Proposed Changes

The build is organized into **9 sequential phases**, each ending with a green `next build` verification. Dependencies flow top-down — each phase builds on the previous.

---

### Phase 1 — Project Scaffolding & Toolchain

Bootstrap a clean Next.js 15 App Router project with TypeScript and Tailwind CSS. No external UI/animation libraries.

#### [NEW] Project root (scaffolded via `npx create-next-app`)

- `npx -y create-next-app@latest ./ --typescript --tailwind --eslint --app --src-dir --no-import-alias --no-turbopack` (Next.js 16)
- Run in `e:\hackathons\frotendbattle`
- Immediately verify: `npm run build` passes

#### [MODIFY] [package.json](file:///e:/hackathons/frotendbattle/package.json)
- Verify **zero banned dependencies**: no framer-motion, radix, shadcn, headlessui, tailwindui, or any prebuilt component kit
- Only allowed deps: `next`, `react`, `react-dom`, `typescript`, `tailwindcss`, `@tailwindcss/postcss`, `eslint`

#### [MODIFY] [.gitignore](file:///e:/hackathons/frotendbattle/.gitignore)
- Ensure `node_modules`, `.next`, `out` are ignored
- Do NOT gitignore `givenassets/` (it's reference material that stays in the repo)

**Checkpoint**: `npm run build` → clean exit, no 404/500.

---

### Phase 2 — Icon Component Prep (14 SVGs → React Components)

Convert every SVG from `givenassets/` into a typed React component under `src/components/icons/`. Replace hardcoded `#000000` with `currentColor`.

#### [NEW] `src/components/icons/` directory — 14 icon files + barrel export

Each icon file follows this pattern:

```typescript
// src/components/icons/ChevronDown.tsx
import { SVGProps } from 'react';

export function ChevronDown(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...props}>
      <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m19.5 8.25-7.5 7.5-7.5-7.5"/>
    </svg>
  );
}
```

**Icon file list** (all in `src/components/icons/`):

| File | Component | `currentColor` target | Normalized viewBox |
|---|---|---|---|
| `ChevronRight.tsx` | `ChevronRight` | `stroke` | `0 0 24 24` |
| `ChevronLeft.tsx` | `ChevronLeft` | `stroke` | `0 0 24 24` |
| `ChevronUp.tsx` | `ChevronUp` | `stroke` | `0 0 24 24` |
| `ChevronUpSolid.tsx` | `ChevronUpSolid` | `fill` | `0 0 24 24` |
| `ChevronDown.tsx` | `ChevronDown` | `stroke` | `0 0 24 24` |
| `Cog8Tooth.tsx` | `Cog8Tooth` | `stroke` (root `fill` → `"none"`) | `0 0 24 24` |
| `Cube16Solid.tsx` | `Cube16Solid` | `fill` | `0 0 16 16` |
| `Link.tsx` | `LinkIcon` | `stroke` (root `fill` → `"none"`) | `0 0 24 24` |
| `LinkSolid.tsx` | `LinkSolid` | `fill` | `0 0 24 24` |
| `Search.tsx` | `Search` | `fill` | `0 0 20 20` |
| `XMark.tsx` | `XMark` | `stroke` | `0 0 24 24` |
| `ArrowPath.tsx` | `ArrowPath` | `stroke` (root `fill` → `"none"`) | `0 0 24 24` |
| `ArrowTrendingUp.tsx` | `ArrowTrendingUp` | `stroke` | `0 0 24 24` |
| `ChartPie.tsx` | `ChartPie` | `stroke` (root `fill` → `"none"`) | `0 0 24 24` |

#### [NEW] [index.ts](file:///e:/hackathons/frotendbattle/src/components/icons/index.ts)
- Barrel export of all 14 icon components

**Key conversion rules**:
- Normalize all `width`/`height` to `24`/`24` (except `Cube16Solid` which keeps `16`/`16` and `Search` which keeps `20`/`20` — preserve original viewBox)
- Stroke-based: `stroke="#000000"` → `stroke="currentColor"`, keep `fill="none"` 
- Fill-based: `fill="#000000"` → `fill="currentColor"`
- Mixed (cog-8-tooth, arrow-path, chart-pie, link): root SVG has `fill="#000000"` which must become `fill="none"`, inner paths use `stroke="#000000"` → `stroke="currentColor"`
- All props spread onto root `<svg>` via `{...props}` for className/style override
- Standardize JSX attribute names: `stroke-linecap` → `strokeLinecap`, `stroke-linejoin` → `strokeLinejoin`, `stroke-width` → `strokeWidth`, `fill-rule` → `fillRule`, `clip-rule` → `clipRule`

**Checkpoint**: `npm run build` — all icon components compile without error.

---

### Phase 3 — Design System & Global Styles

Set up the color tokens, typography, and Tailwind theme extension from the spec's exact values.

#### [MODIFY] [layout.tsx](file:///e:/hackathons/frotendbattle/src/app/layout.tsx)
- Import fonts via `next/font/google`:
  ```typescript
  import { JetBrains_Mono, Inter } from 'next/font/google';
  
  const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });
  const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
  ```
- Apply both font variables to `<html>` className
- Set `<html lang="en">` for accessibility

#### [MODIFY] [globals.css](file:///e:/hackathons/frotendbattle/src/app/globals.css)
- Define CSS custom properties under `:root`:
  ```css
  :root {
    --bg-dark: #172B36;
    --bg-dark-elevated: #114C5A;
    --bg-light: #F1F6F4;
    --bg-light-elevated: #D9E8E2;
    --accent: #FFC801;
    --accent-secondary: #FF9932;
  }
  ```
- Extend Tailwind via `@theme` (Tailwind v4 syntax):
  ```css
  @theme {
    --color-bg-dark: var(--bg-dark);
    --color-bg-dark-elevated: var(--bg-dark-elevated);
    --color-bg-light: var(--bg-light);
    --color-bg-light-elevated: var(--bg-light-elevated);
    --color-accent: var(--accent);
    --color-accent-secondary: var(--accent-secondary);
    --font-family-sans: var(--font-sans);
    --font-family-mono: var(--font-mono);
  }
  ```
- Base resets: `body` background `--bg-dark`, default text color `--bg-light`
- `prefers-reduced-motion` media query: disable all transitions/animations globally
  ```css
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
  ```
- Define reusable animation keyframes:
  - `@keyframes fade-in-up` — for entry animations (opacity 0→1, translateY 20px→0)
  - `@keyframes glow-pulse` — subtle accent glow for hover states

**Checkpoint**: `npm run build` — fonts load, tokens resolve, page renders with correct dark background.

---

### Phase 4 — Page Layout & Header/Footer (Semantic HTML Shell)

Build the semantic HTML skeleton with `<header>`, `<main>`, `<section>`s, and `<footer>`.

#### [NEW] [Header.tsx](file:///e:/hackathons/frotendbattle/src/components/layout/Header.tsx)
- Sticky `<header>` with `<nav>` inside
- Left: NexusFlow logo (text-based, JetBrains Mono, with accent color highlight)
- Right: Desktop nav links (Features, Pricing, About) + primary CTA button ("Get Started")
- Mobile: hamburger button → slide-in nav panel (uses `XMark` icon for close, animated 200ms ease-out)
- All nav links use `<a href="#section-id">` for in-page scroll
- Mobile menu open/close: CSS transition on transform (translateX), 200ms ease-out
- Hamburger and close buttons have `aria-label`s

#### [NEW] [Footer.tsx](file:///e:/hackathons/frotendbattle/src/components/layout/Footer.tsx)
- `<footer>` with dark elevated background (`--bg-dark-elevated`)
- 4-column grid: Brand/tagline | Product links | Company links | Legal links
- Bottom bar: copyright text, centered
- Newsletter signup form (email input + "Subscribe" button styled with `--accent`)
- Large watermark-style "NEXUSFLOW" text stretching edge-to-edge (inspired by demo footer)

#### [MODIFY] [page.tsx](file:///e:/hackathons/frotendbattle/src/app/page.tsx)
- Import Header, Footer
- Stub out `<main>` with placeholder `<section>` elements for each section (Hero, Features, Pricing, Social Proof)
- Each `<section>` gets a unique `id` for anchor links
- Add SEO metadata export:
  ```typescript
  export const metadata: Metadata = {
    title: 'NexusFlow — AI-Driven Data Automation Platform',
    description: 'Automate your data pipelines with intelligent AI agents. Real-time sync, smart transformations, and enterprise-grade reliability.',
    openGraph: {
      title: 'NexusFlow — AI-Driven Data Automation Platform',
      description: 'Automate your data pipelines with intelligent AI agents.',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'NexusFlow — AI-Driven Data Automation Platform',
      description: 'Automate your data pipelines with intelligent AI agents.',
    },
  };
  ```

**Checkpoint**: `npm run build` — page renders with header, empty sections, footer. SEO meta tags present in HTML source.

---

### Phase 5 — Hero Section

The above-the-fold section: dark background, bold typography, clear CTAs.

#### [NEW] [Hero.tsx](file:///e:/hackathons/frotendbattle/src/components/sections/Hero.tsx)
- **Eyebrow**: Small monospaced label in `--accent` color: `"AI-POWERED AUTOMATION"` (JetBrains Mono, uppercase, tracking-widest, with a decorative `///` prefix like the demo)
- **Headline** (`<h1>`): `"Transform Raw Data Into Actionable Intelligence"` — JetBrains Mono, large (text-4xl md:text-6xl), bold, `--bg-light` color
- **Supporting copy** (`<p>`): `"NexusFlow orchestrates your entire data pipeline — from ingestion to insight — with AI agents that learn, adapt, and optimize in real time."` — Inter, text-lg, `--bg-light-elevated` color (slightly muted)
- **CTA row**:
  - Primary: `"Start Automating"` — solid `--accent` bg, `--bg-dark` text, hover glow effect (box-shadow with `--accent-secondary`), 150ms ease-out transition
  - Secondary: `"Watch Demo"` — outlined with `--accent` border, `--accent` text, hover fill transition
  - Both use ChevronRight icon inline
- **Entry animation**: CSS `fade-in-up` animation on load, staggered (eyebrow 0ms, headline 100ms, copy 200ms, CTAs 300ms) — total orchestration ≤ 500ms
- Content is server-rendered text (no client-side injection)
- **Background**: Subtle gradient overlay from `--bg-dark` to a slightly lighter shade, with a radial gradient accent glow behind the headline using `--accent` at very low opacity (5-8%)

#### [MODIFY] [page.tsx](file:///e:/hackathons/frotendbattle/src/app/page.tsx)
- Replace Hero placeholder with `<Hero />` component

**Checkpoint**: `npm run build` — Hero renders with correct fonts, colors, animations. `<h1>` is present and unique.

---

### Phase 6 — Feature Showcase: Bento-to-Accordion (Feature 2)

The most complex component. Desktop = CSS Grid Bento. Mobile = Accordion. Context-lock on resize.

#### [NEW] [BentoAccordion.tsx](file:///e:/hackathons/frotendbattle/src/components/features/BentoAccordion.tsx)

**Data model** — array of 6 features, each with:
```typescript
interface FeatureItem {
  icon: React.ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
  gridArea: string; // CSS grid-area name for bento placement
}
```

**Feature content** (using icon→feature mapping from spec):
| # | Icon | Title | Description |
|---|---|---|---|
| 1 | `Cog8Tooth` | Automated Workflows | Configure complex data pipelines with zero-code automation rules. |
| 2 | `Cube16Solid` | Modular Primitives | Build with composable, reusable pipeline building blocks. |
| 3 | `LinkSolid` | Seamless Integrations | Connect 500+ data sources with pre-built connectors. |
| 4 | `Search` | Smart Query Engine | AI-powered search across all your connected datasets. |
| 5 | `ArrowPath` | Continuous Sync | Real-time data synchronization with conflict resolution. |
| 6 | `ArrowTrendingUp` | Performance Analytics | Monitor pipeline health with real-time metrics dashboards. |

**Desktop layout (≥ 768px)** — CSS Grid Bento:
```
┌──────────┬───────┬──────────┐
│  Card 1  │ Card 2│  Card 3  │
│  (2 col) │       │  (1 col) │
├──────────┼───────┴──────────┤
│  Card 4  │     Card 5       │
│  (1 col) │     (2 col)      │
├──────────┴───────┬──────────┤
│     Card 6       │  (empty) │
│     (2 col)      │          │
└──────────────────┴──────────┘
```
- `grid-template-columns: repeat(3, 1fr)` with `grid-template-areas`
- Each card: `--bg-dark-elevated` background, rounded corners, padding
- **Hover/focus interaction**: On `mouseenter`/`focus`, card reveals an accent-colored gradient glow — `background: linear-gradient(135deg, var(--accent) 0%, var(--accent-secondary) 100%)` at low opacity as a pseudo-element or overlay. Transition 150ms ease-out.
- Card content: Icon (in `--accent` color, 32px), title (JetBrains Mono, `--bg-light`), description (Inter, `--bg-light-elevated`)

**Mobile layout (< 768px)** — Accordion:
- Cards stack vertically as collapsible panels
- Each panel header: Icon + Title + `ChevronDown` (rotates to `ChevronUp` on open)
- Chevron rotation: CSS `transform: rotate(180deg)`, 150ms ease-out
- Panel body: slides open via `max-height` transition (or `grid-template-rows: 0fr → 1fr`), 300ms ease-in-out
- Only one panel open at a time

**State management** (all local, never lifted):
```typescript
'use client';
// Local state only — never lifted to page level
const [activeIndex, setActiveIndex] = useState<number | null>(null);
const hoveredIndexRef = useRef<number | null>(null);
const isMobileRef = useRef(false);
```

**Continuous hover/focus tracking**:
- Attach `mouseenter` and `focus` event listeners to each bento card
- On enter/focus: `hoveredIndexRef.current = index`
- On leave/blur: `hoveredIndexRef.current = null` (only if still the same index)
- This runs continuously, not just on resize

**Context-lock (matchMedia listener)**:
```typescript
useEffect(() => {
  const mql = window.matchMedia('(max-width: 767px)');
  
  const handleBreakpoint = (e: MediaQueryListEvent | MediaQueryList) => {
    const wasMobile = isMobileRef.current;
    isMobileRef.current = e.matches;
    
    if (!wasMobile && e.matches) {
      // Desktop → Mobile: transfer hovered/focused index to accordion
      if (hoveredIndexRef.current !== null) {
        setActiveIndex(hoveredIndexRef.current);
      }
    }
    // Mobile → Desktop: activeIndex persists as highlight naturally
  };
  
  handleBreakpoint(mql); // initial check
  mql.addEventListener('change', handleBreakpoint);
  return () => mql.removeEventListener('change', handleBreakpoint);
}, []);
```

**Section wrapper**:
- Eyebrow: `"PLATFORM FEATURES"` (JetBrains Mono, `--accent`)
- Section headline: `"Everything You Need to Ship Data Products"` (JetBrains Mono, `<h2>`)
- Dark section background (`--bg-dark`)

#### [MODIFY] [page.tsx](file:///e:/hackathons/frotendbattle/src/app/page.tsx)
- Replace Features placeholder with `<BentoAccordion />` in a `<section id="features">`

**Checkpoint**: `npm run build` — Bento renders on desktop, accordion on mobile. Resize mid-hover transfers index.

---

### Phase 7 — Pricing Section (Feature 1 — Matrix-Driven, Re-Render Isolated)

The highest-stakes component for the Profiler grading.

#### [NEW] [pricing-matrix.ts](file:///e:/hackathons/frotendbattle/src/lib/pricing-matrix.ts)

**Data model**:
```typescript
type Currency = 'INR' | 'USD' | 'EUR';
type BillingCycle = 'monthly' | 'annual';
type Tier = 'spark' | 'flow' | 'scale';

interface TierConfig {
  name: string;
  baseRate: Record<Currency, number>; // monthly base in each currency
  regionalTariff: Record<Currency, number>; // multiplier
  features: string[];
  highlighted?: boolean; // for the "recommended" card
}

const PRICING_MATRIX: Record<Tier, TierConfig> = {
  spark: {
    name: 'Spark',
    baseRate: { INR: 1500, USD: 19, EUR: 17 },
    regionalTariff: { INR: 1.0, USD: 1.0, EUR: 1.05 },
    features: ['5 Automated Pipelines', '10K Records/month', 'Email Support', 'Basic Analytics'],
  },
  flow: {
    name: 'Flow',
    baseRate: { INR: 5000, USD: 59, EUR: 54 },
    regionalTariff: { INR: 1.0, USD: 1.0, EUR: 1.05 },
    features: ['Unlimited Pipelines', '1M Records/month', 'Priority Support', 'Advanced Analytics', 'Custom Integrations', 'Team Collaboration'],
    highlighted: true,
  },
  scale: {
    name: 'Scale',
    baseRate: { INR: 15000, USD: 179, EUR: 164 },
    regionalTariff: { INR: 1.0, USD: 1.0, EUR: 1.05 },
    features: ['Everything in Flow', 'Unlimited Records', 'Dedicated Account Manager', 'SLA Guarantee', 'SSO & SAML', 'Custom Deployment', 'On-Premise Option'],
  },
};
```

**Pure calculation function**:
```typescript
function calculatePrice(tier: Tier, currency: Currency, billing: BillingCycle): number {
  const config = PRICING_MATRIX[tier];
  const monthly = config.baseRate[currency] * config.regionalTariff[currency];
  return billing === 'annual'
    ? Math.round(monthly * 12 * 0.8) // 20% annual discount
    : Math.round(monthly);
}
```

**Currency symbols**:
```typescript
const CURRENCY_SYMBOLS: Record<Currency, string> = { INR: '₹', USD: '$', EUR: '€' };
```

#### [NEW] [PricingSection.tsx](file:///e:/hackathons/frotendbattle/src/components/pricing/PricingSection.tsx)

The wrapper `<section>` — light background (`--bg-light`) for visual alternation.
- Eyebrow: `"PRICING"` (JetBrains Mono, `--bg-dark` color on light bg)
- Headline (`<h2>`): `"Simple, Transparent Pricing"` (JetBrains Mono)
- Renders the currency selector, billing toggle, and 3 tier cards

#### [NEW] [PricingSwitcher.tsx](file:///e:/hackathons/frotendbattle/src/components/pricing/PricingSwitcher.tsx)

**Architecture for zero re-renders** (the critical part):

This is a `'use client'` component but uses **no React state** for the billing/currency values.

```typescript
'use client';
export function PricingSwitcher() {
  const toggleRef = useRef<HTMLInputElement>(null);
  const selectRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    const toggle = toggleRef.current!;
    const select = selectRef.current!;

    const update = () => {
      const billing: BillingCycle = toggle.checked ? 'annual' : 'monthly';
      const currency = select.value as Currency;

      // Direct DOM writes — no setState, no re-render
      for (const tier of TIERS) {
        const priceEl = document.getElementById(`price-${tier}`);
        const symbolEl = document.getElementById(`symbol-${tier}`);
        const periodEl = document.getElementById(`period-${tier}`);
        if (priceEl) priceEl.textContent = calculatePrice(tier, currency, billing).toLocaleString();
        if (symbolEl) symbolEl.textContent = CURRENCY_SYMBOLS[currency];
        if (periodEl) periodEl.textContent = billing === 'annual' ? '/year' : '/month';
      }
    };

    toggle.addEventListener('change', update);
    select.addEventListener('change', update);
    update(); // initial render with defaults

    return () => {
      toggle.removeEventListener('change', update);
      select.removeEventListener('change', update);
    };
  }, []);

  return (
    <div className="...">
      {/* Uncontrolled native toggle */}
      <label>
        <span>Monthly</span>
        <input ref={toggleRef} type="checkbox" defaultChecked={false} />
        <span>Annual <span className="text-accent">Save 20%</span></span>
      </label>
      {/* Uncontrolled native select */}
      <select ref={selectRef} defaultValue="USD">
        <option value="INR">₹ INR</option>
        <option value="USD">$ USD</option>
        <option value="EUR">€ EUR</option>
      </select>
    </div>
  );
}
```

The toggle will be styled as a custom pill-shaped switcher using CSS only (hidden `<input>`, styled `<label>` with sliding knob via `::after` pseudo-element, 150ms ease-out transition).

#### [NEW] [PricingCard.tsx](file:///e:/hackathons/frotendbattle/src/components/pricing/PricingCard.tsx)

**Server component** (or a minimal client component with zero state):
```typescript
export function PricingCard({ tier, config }: { tier: Tier; config: TierConfig }) {
  return (
    <article className={`... ${config.highlighted ? 'border-accent ring-accent/20 ring-2' : ''}`}>
      <h3>{config.name}</h3>
      <div className="font-mono text-4xl">
        <span id={`symbol-${tier}`}>$</span>
        <span id={`price-${tier}`}>{/* populated by JS */}</span>
        <span id={`period-${tier}`} className="text-sm font-sans">/month</span>
      </div>
      <ul>
        {config.features.map(f => <li key={f}>{f}</li>)}
      </ul>
      <button>Get Started</button>
    </article>
  );
}
```

- Price `<span>` elements use JetBrains Mono (monospaced digits = no width reflow on change)
- Cards have `--bg-dark-elevated` bg on dark parent, or `white` bg on light parent
- Highlighted card (Pro) gets `--accent` border and a subtle glow
- Hover: card lifts slightly (`transform: translateY(-4px)`, `box-shadow` increase), 150ms ease-out

#### [MODIFY] [page.tsx](file:///e:/hackathons/frotendbattle/src/app/page.tsx)
- Replace Pricing placeholder with `<PricingSection />`

**Checkpoint**: `npm run build` — Pricing renders. Toggle/select update price text without React re-renders (verifiable via React DevTools Profiler showing zero highlights on the section/card components during toggle).

---

### Phase 8 — Social Proof (Metrics Strip) + Entry Animations

#### [NEW] [MetricsStrip.tsx](file:///e:/hackathons/frotendbattle/src/components/sections/MetricsStrip.tsx)

Inspired by the demo video's statistics section. A dark section (`--bg-dark`) with large monospaced numbers.

**Layout**: 4-column grid on desktop, 2×2 on tablet, stacked on mobile.

| Metric | Value | Label |
|---|---|---|
| Uptime | `99.9%` | Platform Reliability |
| Pipelines | `10M+` | Data Pipelines Processed |
| Integrations | `500+` | Pre-Built Connectors |
| Latency | `<12ms` | Average Response Time |

- Numbers: JetBrains Mono, text-4xl/5xl, `--accent` color
- Labels: Inter, text-sm, `--bg-light-elevated` color (muted)
- Each metric card has a subtle top-border accent line (`border-top: 2px solid var(--accent)`)
- Corner accents (decorative `┐` bracket in top-right, matching demo video)

**Entry animation**: `IntersectionObserver`-based. When the strip scrolls into view, each metric fades in and slides up, staggered 100ms per card (total 400ms). Uses CSS classes toggled by JS — content is already in the DOM (server-rendered), just visually hidden until intersection.

#### [MODIFY] [page.tsx](file:///e:/hackathons/frotendbattle/src/app/page.tsx)
- Add `<MetricsStrip />` between Pricing and Footer

**Checkpoint**: `npm run build` — Metrics strip renders, animation triggers on scroll.

---

### Phase 9 — README, Final Polish & Verification

#### [NEW] [README.md](file:///e:/hackathons/frotendbattle/README.md)

Document the four required topics:

**1. Re-render Isolation Strategy**
> The billing toggle and currency selector are uncontrolled native `<input>` and `<select>` elements. Event listeners are attached once via `useEffect`/`useRef` in `PricingSwitcher.tsx`. On change, the handler:
> 1. Reads the toggle's `.checked` and select's `.value` directly from the DOM
> 2. Calls `calculatePrice()` from `pricing-matrix.ts` (pure function, no React state)
> 3. Writes the result directly into the price `<span>` elements via `document.getElementById().textContent`
>
> No `useState` exists in the update path. No React state changes → no re-renders. The parent `PricingSection`, sibling `PricingCard` components, and the page itself are never notified of the change. This is verifiable in React DevTools Profiler: toggling currency/billing produces zero component highlights.

**2. Context-Lock Implementation**
> `BentoAccordion.tsx` maintains a `hoveredIndexRef` (useRef) that is continuously updated by `mouseenter`/`focus` event listeners on every bento card. A `window.matchMedia('(max-width: 767px)')` listener fires on breakpoint crossing. When crossing from desktop→mobile, if `hoveredIndexRef.current` is non-null, that index is applied to `setActiveIndex()` to open the corresponding accordion panel. The ref is always current because it's updated on every real hover/focus event, not only checked at resize time.

**3. Motion Timing Compliance**
> - Micro-interactions (hover, toggle, chevron): 150ms ease-out (CSS `transition: all 150ms ease-out`)
> - Structural reflows (bento↔accordion): 300ms ease-in-out (CSS `transition: all 300ms ease-in-out`)
> - Entry orchestration: staggered CSS `animation-delay` totaling ≤ 500ms
> - `prefers-reduced-motion`: All transitions/animations suppressed via global media query in `globals.css`

**4. Color & Type Token Mapping**
> Table mapping each CSS custom property to its `colorPallet.pdf` / `fonts.pdf` source value.

#### [MODIFY] [layout.tsx](file:///e:/hackathons/frotendbattle/src/app/layout.tsx)
- Final metadata polish: ensure all Open Graph / Twitter card tags are complete
- Verify `lang="en"` on `<html>`

#### Final verification checklist:
- [ ] `npm run build` — clean exit, zero errors/warnings
- [ ] Heading hierarchy: single `<h1>` in Hero, `<h2>` for each section
- [ ] All icons have `aria-label` or meaningful `alt` text
- [ ] No banned libraries in `package.json`
- [ ] No hardcoded price strings in any component
- [ ] `prefers-reduced-motion` disables all animation
- [ ] No lorem ipsum anywhere
- [ ] No reference video brand name/copy/logo reuse
- [ ] Mobile nav uses `XMark` icon with `aria-label="Close menu"`

---

## Verification Plan

### Automated Tests

```bash
# Build verification (must pass at every phase)
npm run build

# Lint check
npm run lint

# Search for banned dependencies
npx -y depcheck --ignores="@types/*,typescript,eslint*,@eslint*"

# Verify no hardcoded prices
grep -r "baseRate\|calculatePrice" src/components/pricing/
# Should show only imports/calls, never raw numbers like "$59"
```

### Manual Verification

1. **React DevTools Profiler**: Record a session → toggle billing/currency → verify zero component re-renders outside `PricingSwitcher`
2. **Responsive test**: Open DevTools → resize from desktop → mobile while hovering a bento card → verify the correct accordion panel opens
3. **`prefers-reduced-motion`**: Toggle in DevTools → verify all animations are suppressed
4. **Lighthouse audit**: Run on the built page → verify SEO score ≥ 90, accessibility ≥ 90
5. **View source**: Confirm all text content is present in the HTML (server-rendered, not client-injected)

---

## File Tree Summary

```
e:\hackathons\frotendbattle\
├── givenassets/              # Reference only — NOT imported into app
│   ├── fonts.pdf
│   ├── colorPallet.pdf
│   ├── demo.mp4
│   └── *.svg (14 icon source files)
├── src/
│   ├── app/
│   │   ├── layout.tsx        # Fonts, metadata, global providers
│   │   ├── page.tsx          # Page composition + SEO metadata
│   │   └── globals.css       # Design tokens, base styles, animations
│   ├── components/
│   │   ├── icons/            # 14 typed React icon components + index.ts
│   │   │   ├── ChevronDown.tsx
│   │   │   ├── ChevronLeft.tsx
│   │   │   ├── ChevronRight.tsx
│   │   │   ├── ChevronUp.tsx
│   │   │   ├── ChevronUpSolid.tsx
│   │   │   ├── Cog8Tooth.tsx
│   │   │   ├── Cube16Solid.tsx
│   │   │   ├── LinkIcon.tsx
│   │   │   ├── LinkSolid.tsx
│   │   │   ├── Search.tsx
│   │   │   ├── XMark.tsx
│   │   │   ├── ArrowPath.tsx
│   │   │   ├── ArrowTrendingUp.tsx
│   │   │   ├── ChartPie.tsx
│   │   │   └── index.ts
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   └── Footer.tsx
│   │   ├── sections/
│   │   │   ├── Hero.tsx
│   │   │   └── MetricsStrip.tsx
│   │   ├── features/
│   │   │   └── BentoAccordion.tsx
│   │   └── pricing/
│   │       ├── PricingSection.tsx
│   │       ├── PricingSwitcher.tsx
│   │       └── PricingCard.tsx
│   └── lib/
│       └── pricing-matrix.ts
├── README.md
├── package.json
├── tsconfig.json
├── next.config.ts
└── postcss.config.mjs
```
