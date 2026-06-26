/**
 * Pricing Matrix — Data Model & Pure Calculation Functions
 *
 * Architecture:
 * - Single multi-dimensional config object: PRICING_MATRIX[tier][currency]
 * - Pure function calculatePrice() computes displayed values at runtime
 * - NO hardcoded final price strings anywhere
 * - Annual price = baseRate × regionalTariff × 12 × 0.8 (20% discount)
 */

export type Currency = 'INR' | 'USD' | 'EUR';
export type BillingCycle = 'monthly' | 'annual';
export type Tier = 'spark' | 'flow' | 'scale';

export interface TierConfig {
  name: string;
  baseRate: Record<Currency, number>;
  regionalTariff: Record<Currency, number>;
  features: string[];
  highlighted?: boolean;
  badge?: string;
}

export const TIERS: Tier[] = ['spark', 'flow', 'scale'];

export const PRICING_MATRIX: Record<Tier, TierConfig> = {
  spark: {
    name: 'Spark',
    baseRate: { INR: 1500, USD: 19, EUR: 17 },
    regionalTariff: { INR: 1.0, USD: 1.0, EUR: 1.05 },
    features: [
      '5 Automated Pipelines',
      '10K Records/month',
      'Email Support',
      'Basic Analytics',
    ],
  },
  flow: {
    name: 'Flow',
    baseRate: { INR: 5000, USD: 59, EUR: 54 },
    regionalTariff: { INR: 1.0, USD: 1.0, EUR: 1.05 },
    features: [
      'Unlimited Pipelines',
      '1M Records/month',
      'Priority Support',
      'Advanced Analytics',
      'Custom Integrations',
      'Team Collaboration',
    ],
    highlighted: true,
    badge: 'Most Popular',
  },
  scale: {
    name: 'Scale',
    baseRate: { INR: 15000, USD: 179, EUR: 164 },
    regionalTariff: { INR: 1.0, USD: 1.0, EUR: 1.05 },
    features: [
      'Everything in Flow',
      'Unlimited Records',
      'Dedicated Account Manager',
      'SLA Guarantee',
      'SSO & SAML',
      'Custom Deployment',
      'On-Premise Option',
    ],
  },
};

export const CURRENCY_SYMBOLS: Record<Currency, string> = {
  INR: '₹',
  USD: '$',
  EUR: '€',
};

/**
 * Calculate price from the matrix.
 * Monthly: baseRate × regionalTariff (rounded)
 * Annual:  baseRate × regionalTariff × 12 × 0.8 (20% discount, rounded)
 */
export function calculatePrice(
  tier: Tier,
  currency: Currency,
  billing: BillingCycle
): number {
  const config = PRICING_MATRIX[tier];
  const monthly = config.baseRate[currency] * config.regionalTariff[currency];
  return billing === 'annual'
    ? Math.round(monthly * 12 * 0.8)
    : Math.round(monthly);
}

/**
 * Format price with locale-aware number formatting.
 */
export function formatPrice(price: number): string {
  return price.toLocaleString('en-IN');
}
