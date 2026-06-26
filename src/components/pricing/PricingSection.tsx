'use client';

import { PRICING_MATRIX, TIERS } from '@/lib/pricing-matrix';
import { PricingSwitcher } from './PricingSwitcher';
import { PricingCard } from './PricingCard';
import { ScrollReveal } from '@/components/layout/ScrollReveal';

/**
 * PricingSection — Light-background section wrapping the pricing matrix.
 *
 * It updates prices via direct DOM writes — no React state propagation.
 */
export function PricingSection() {
  return (
    <section
      id="pricing"
      className="relative py-24 md:py-32 bg-bg-light"
    >
      {/* Decorative top accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-accent-secondary to-accent" aria-hidden="true" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-secondary mb-4">
            <span className="text-accent mr-2" aria-hidden="true">{"///"}</span>
            Pricing
          </p>
          <h2 className="font-mono text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-bg-dark mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="font-sans text-base sm:text-lg text-bg-dark/60 max-w-2xl mx-auto">
            Start free, scale as your data operations grow. No hidden fees,
            no surprise charges — just predictable, honest pricing.
          </p>
        </div>

        {/* Switcher (client component — isolated re-renders) */}
        <PricingSwitcher />

        {/* Tier cards grid */}
        <ScrollReveal className="reveal-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto items-start">
            {TIERS.map((tier, index) => (
              <div
                key={tier}
                className="reveal-child"
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <PricingCard
                  tier={tier}
                  config={PRICING_MATRIX[tier]}
                />
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
