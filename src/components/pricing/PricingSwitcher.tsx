'use client';

import { useEffect, useRef } from 'react';
import {
  calculatePrice,
  formatPrice,
  CURRENCY_SYMBOLS,
  TIERS,
  type Currency,
  type BillingCycle,
} from '@/lib/pricing-matrix';

/**
 * PricingSwitcher — Re-Render-Isolated Currency & Billing Toggle
 *
 * ARCHITECTURE (zero re-renders):
 * - The toggle (checkbox) and currency select are UNCONTROLLED native elements
 * - Event listeners attached once via useEffect/useRef
 * - On change: reads DOM values → matrix lookup → writes textContent to price <span>s
 * - NO useState in the update path → NO React re-renders
 * - Parent PricingSection, sibling PricingCards are never notified
 *
 * Verifiable via React DevTools Profiler: toggling produces zero highlights
 * on any component other than this switcher's initial mount.
 */
export function PricingSwitcher() {
  const toggleRef = useRef<HTMLInputElement>(null);
  const selectRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    const toggle = toggleRef.current;
    const select = selectRef.current;
    if (!toggle || !select) return;

    const update = () => {
      const billing: BillingCycle = toggle.checked ? 'annual' : 'monthly';
      const currency = select.value as Currency;
      const symbol = CURRENCY_SYMBOLS[currency];

      // Direct DOM writes — no setState, no re-render
      for (const tier of TIERS) {
        const priceEl = document.getElementById(`price-${tier}`);
        const symbolEl = document.getElementById(`symbol-${tier}`);
        const periodEl = document.getElementById(`period-${tier}`);

        if (priceEl) {
          priceEl.textContent = formatPrice(
            calculatePrice(tier, currency, billing)
          );
        }
        if (symbolEl) symbolEl.textContent = symbol;
        if (periodEl) periodEl.textContent = billing === 'annual' ? '/year' : '/mo';
      }

      // Update the toggle label visuals and aria attributes
      toggle.setAttribute('aria-checked', String(toggle.checked));
      const toggleTrack = document.getElementById('billing-toggle-track');
      if (toggleTrack) {
        toggleTrack.setAttribute('data-annual', String(toggle.checked));
      }
    };

    toggle.addEventListener('change', update);
    select.addEventListener('change', update);

    // Initial render with defaults
    update();

    return () => {
      toggle.removeEventListener('change', update);
      select.removeEventListener('change', update);
    };
  }, []);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
      {/* Billing toggle: Monthly / Annual */}
      <div className="flex items-center gap-3">
        <span className="font-sans text-sm text-bg-dark/70">Monthly</span>

        <label className="relative inline-flex items-center cursor-pointer" aria-label="Toggle billing cycle">
          <input
            ref={toggleRef}
            type="checkbox"
            role="switch"
            aria-checked="false"
            className="sr-only peer"
            defaultChecked={false}
          />
          {/* Custom toggle track */}
          <div
            id="billing-toggle-track"
            data-annual="false"
            className="w-12 h-7 rounded-full bg-bg-dark-elevated/30 border border-bg-dark/20
                       peer-checked:bg-accent/20 peer-checked:border-accent/40
                       after:content-[''] after:absolute after:top-[3px] after:left-[3px]
                       after:w-5 after:h-5 after:rounded-full after:bg-bg-dark
                       after:shadow-md after:transition-all after:duration-150 after:ease-out
                       peer-checked:after:translate-x-5 peer-checked:after:bg-accent
                       transition-colors duration-150 ease-out"
          />
        </label>

        <span className="font-sans text-sm text-bg-dark/70">
          Annual{' '}
          <span className="inline-flex items-center rounded-full bg-accent/15 px-2 py-0.5 text-xs font-semibold text-accent-secondary">
            Save 20%
          </span>
        </span>
      </div>

      {/* Currency select */}
      <select
        ref={selectRef}
        defaultValue="USD"
        className="rounded-lg bg-white border border-bg-dark/20 px-3 py-2 font-sans text-sm text-bg-dark
                   focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20
                   transition-colors duration-150 ease-out cursor-pointer"
        aria-label="Select currency"
      >
        <option value="USD">$ USD</option>
        <option value="INR">₹ INR</option>
        <option value="EUR">€ EUR</option>
      </select>
    </div>
  );
}
