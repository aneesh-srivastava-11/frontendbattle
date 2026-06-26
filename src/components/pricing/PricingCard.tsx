import { ChevronRight } from '@/components/icons';
import {
  calculatePrice,
  formatPrice,
  CURRENCY_SYMBOLS,
  type Tier,
  type TierConfig,
} from '@/lib/pricing-matrix';

/**
 * PricingCard — Displays a single pricing tier.
 *
 * Price <span> elements have deterministic IDs (price-{tier}, symbol-{tier}, period-{tier})
 * so PricingSwitcher can write to them via textContent without triggering re-renders.
 *
 * Uses JetBrains Mono for price digits — monospaced ensures no width reflow on value change.
 */
export function PricingCard({
  tier,
  config,
}: {
  tier: Tier;
  config: TierConfig;
}) {
  const isHighlighted = config.highlighted;

  const defaultPrice = formatPrice(calculatePrice(tier, 'USD', 'monthly'));
  const defaultSymbol = CURRENCY_SYMBOLS['USD'];

  return (
    <article
      className={`relative flex flex-col rounded-2xl p-8 transition-all duration-150 ease-out
        ${
          isHighlighted
            ? 'bg-bg-dark text-bg-light border-2 border-accent shadow-xl shadow-accent/10 scale-[1.02] md:scale-105'
            : 'bg-white text-bg-dark border border-bg-dark/10 hover:-translate-y-1 hover:shadow-lg'
        }`}
    >
      {/* Badge */}
      {config.badge && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center rounded-full bg-accent px-4 py-1 font-sans text-xs font-bold text-bg-dark">
          {config.badge}
        </span>
      )}

      {/* Tier name */}
      <h3 className="font-mono text-lg font-bold tracking-tight mb-2">
        {config.name}
      </h3>

      {/* Price display — JetBrains Mono, DOM-isolated via IDs */}
      <div className="flex items-baseline gap-1 mb-6">
        <span
          id={`symbol-${tier}`}
          className="font-mono text-2xl font-bold"
        >
          {defaultSymbol}
        </span>
        <span
          id={`price-${tier}`}
          className="font-mono text-4xl sm:text-5xl font-extrabold tracking-tighter"
        >
          {defaultPrice}
        </span>
        <span
          id={`period-${tier}`}
          className={`font-sans text-sm ml-1 ${
            isHighlighted ? 'text-bg-light-elevated' : 'text-bg-dark/50'
          }`}
        >
          /mo
        </span>
      </div>

      {/* Feature list */}
      <ul className="flex-1 space-y-3 mb-8">
        {config.features.map((feature) => (
          <li
            key={feature}
            className={`flex items-start gap-2 font-sans text-sm ${
              isHighlighted ? 'text-bg-light-elevated' : 'text-bg-dark/70'
            }`}
          >
            <span className="mt-0.5 text-accent" aria-hidden="true">✓</span>
            {feature}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <a
        href="#"
        className={`group inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 font-sans text-sm font-semibold transition-all duration-150 ease-out
          ${
            isHighlighted
              ? 'bg-accent text-bg-dark hover:bg-accent-secondary shadow-lg shadow-accent/20'
              : 'bg-bg-dark text-bg-light hover:bg-bg-dark-elevated'
          }`}
      >
        {config.name === 'Scale' ? 'Contact Sales' : 'Get Started'}
        <ChevronRight
          className="w-4 h-4 transition-transform duration-150 ease-out group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </a>
    </article>
  );
}
