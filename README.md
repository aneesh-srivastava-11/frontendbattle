# NexusFlow — AI-Driven Data Automation Platform

Premium SaaS landing page built with **Next.js 16** (App Router) + **TypeScript** + **Tailwind CSS v4**. Zero external UI or animation libraries — all motion via native CSS Transitions/Animations.

---

## Architecture Documentation

### 1. Re-Render Isolation Strategy (Pricing Switcher)

The billing toggle (Monthly/Annual) and currency selector (INR/USD/EUR) are designed to update displayed prices **without triggering any React re-renders** on the page, parent section, or sibling cards.

**Data flow:** `DOM event → matrix lookup → textContent write`

**Implementation details** (`/src/components/pricing/PricingSwitcher.tsx`):

1. The toggle is an **uncontrolled native `<input type="checkbox">`** and the currency picker is an **uncontrolled native `<select>`**. Neither is backed by `useState`.
2. In a single `useEffect` (runs once on mount), plain `addEventListener('change', ...)` handlers are attached to both elements via `useRef`.
3. On every change event, the handler:
   - Reads `.checked` (billing) and `.value` (currency) directly from the DOM elements
   - Calls `calculatePrice(tier, currency, billing)` — a **pure function** from `/src/lib/pricing-matrix.ts`
   - Writes the result into the price `<span>` elements via `document.getElementById('price-{tier}').textContent`
4. The price `<span>` elements use deterministic IDs (`price-spark`, `price-flow`, `price-scale`, etc.) and are rendered in **JetBrains Mono** — monospaced digits ensure no width reflow when values change.

**Why no re-render occurs:**
- No `useState` exists in the update path
- No React state changes → no component re-renders
- The parent `PricingSection`, sibling `PricingCard` components, and the page itself are never notified of the change

**Verification:** Open React DevTools Profiler → Start recording → Toggle billing/currency → Stop recording. Zero component highlights appear outside the initial mount.

---

### 2. Context-Lock Implementation (Bento ↔ Accordion)

`/src/components/features/BentoAccordion.tsx` implements a context-lock that preserves the user's focus across responsive breakpoint transitions.

**Continuous tracking:**
- A `hoveredIndexRef` (React `useRef`) is updated on every `mouseenter` and `focus` event on each bento card
- On `mouseleave`/`blur`, the ref is cleared only if the index still matches (prevents race conditions)
- This tracking runs **continuously**, not only during resize events

**Breakpoint detection:**
- A `window.matchMedia('(max-width: 767px)')` listener fires on breakpoint crossing
- On **desktop → mobile** transition: if `hoveredIndexRef.current` is non-null, that index is passed to `setActiveIndex()` to open the corresponding accordion panel
- On **mobile → desktop** transition: `activeIndex` naturally persists as a visual highlight

**Why this works:**
- The `useRef` is always current because it's updated on real `mouseenter`/`focus` events, not checked lazily on resize
- The `matchMedia` listener fires synchronously at the exact breakpoint crossing, not on a polling interval

---

### 3. Motion Timing Compliance

All animations adhere to the spec's timing constraints:

| Category | Duration | Easing | Examples |
|---|---|---|---|
| **Micro-interactions** | 150ms | `ease-out` | Hover states, toggle switches, chevron rotation, nav transitions |
| **Structural reflows** | 300ms | `ease-in-out` | Accordion panel open/close (`grid-template-rows: 0fr → 1fr`) |
| **Entry orchestration** | ≤500ms total | `ease-out` | Hero stagger: eyebrow (0ms) → headline (100ms) → copy (200ms) → CTAs (300ms) |
| **Scroll-reveal** | 500ms | `ease-out` | Metrics strip: staggered 0/100/200/300ms per card |

**`prefers-reduced-motion` compliance:**
A global media query in `globals.css` suppresses all transitions and animations:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

### 4. Color & Type Token Mapping

**Color tokens** (from `colorPallet.pdf`):

| CSS Variable | PDF Name | Hex | Usage |
|---|---|---|---|
| `--bg-dark` | Oceanic Noir | `#172B36` | Primary dark surface (hero, deep sections) |
| `--bg-dark-elevated` | Nocturnal Expedition | `#114C5A` | Elevated/card surface on dark sections |
| `--bg-light` | Arctic Powder | `#F1F6F4` | Primary light surface (pricing section) |
| `--bg-light-elevated` | Mystic Mint | `#D9E8E2` | Secondary light surface, muted text |
| `--accent` | Forsythia | `#FFC801` | Primary accent — CTAs, highlights on dark |
| `--accent-secondary` | Deep Saffron | `#FF9932` | Secondary accent — gradients, hover glows |

**Typography** (from `fonts.pdf`, loaded via `next/font/google`):

| Font | Variable | Usage |
|---|---|---|
| **JetBrains Mono** | `--font-jetbrains-mono` | Headlines, eyebrow labels, pricing numbers, section titles |
| **Inter** | `--font-inter` | Body copy, navigation, form fields, buttons, FAQ text |

**Contrast pairings** (per PDF spec):
- Dark surfaces: `--bg-light` and `--accent` text
- Light surfaces: `--bg-dark` text
- Muted text on dark: `--bg-light-elevated`
- Accent highlights: `--accent` on dark, `--accent-secondary` on light

---

## Tech Stack

- **Next.js 16.2.9** (App Router, Turbopack)
- **React 19.2.4**
- **TypeScript 5.x**
- **Tailwind CSS 4.x** (via `@tailwindcss/postcss`)
- **Zero external UI/animation libraries**

## Icon Components

All 14 SVG icons from `/givenassets` are converted to typed React components in `/src/components/icons/`. Hardcoded `#000000` values replaced with `currentColor` so icons inherit their container's text color.

| Icon | Component | Feature Mapping |
|---|---|---|
| `cog-8-tooth` | `Cog8Tooth` | Automation / configuration |
| `cube-16-solid` | `Cube16Solid` | Modular building blocks |
| `link` / `link-solid` | `LinkIcon` / `LinkSolid` | Integrations / connections |
| `search` | `Search` | Smart search / query |
| `arrow-path` | `ArrowPath` | Sync / pipeline / automation |
| `arrow-trending-up` | `ArrowTrendingUp` | Analytics / performance |
| `chart-pie` | `ChartPie` | Analytics / metrics |
| `chevron-down/up` | `ChevronDown` / `ChevronUp` | Accordion disclosure |
| `chevron-left/right` | `ChevronLeft` / `ChevronRight` | Navigation / CTAs |
| `x-mark` | `XMark` | Close control (mobile nav) |

## Getting Started

```bash
npm install
npm run dev    # Development server
npm run build  # Production build
npm run lint   # ESLint check
```

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout (fonts, metadata)
│   ├── page.tsx            # Page composition
│   └── globals.css         # Design tokens, animations
├── components/
│   ├── icons/              # 14 SVG icon components
│   ├── layout/             # Header, Footer
│   ├── sections/           # Hero, MetricsStrip
│   ├── features/           # BentoAccordion
│   └── pricing/            # PricingSection, PricingSwitcher, PricingCard
└── lib/
    └── pricing-matrix.ts   # Data model + calculatePrice()
```
