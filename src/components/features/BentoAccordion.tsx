'use client';

import { useState, useEffect, useRef, useCallback, type CSSProperties, type SVGProps } from 'react';
import {
  Cog8Tooth,
  Cube16Solid,
  LinkSolid,
  Search,
  ArrowPath,
  ArrowTrendingUp,
  ChevronDown,
} from '@/components/icons';
import { ScrollReveal } from '@/components/layout/ScrollReveal';

interface FeatureItem {
  icon: React.ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
  accent: string;
  accentSecondary: string;
}

const FEATURES: FeatureItem[] = [
  {
    icon: Cog8Tooth,
    title: 'Automated Workflows',
    description:
      'Configure complex data pipelines with zero-code automation rules. Set triggers, conditions, and actions that execute autonomously from ETL processes to real-time event handling.',
    accent: '#FFC801',
    accentSecondary: '#FF9932',
  },
  {
    icon: Cube16Solid,
    title: 'Modular Primitives',
    description:
      'Build with composable, reusable pipeline building blocks. Each primitive is self-contained, version-controlled, and designed to snap together like engineering-grade LEGO.',
    accent: '#D9E8E2',
    accentSecondary: '#FFC801',
  },
  {
    icon: LinkSolid,
    title: 'Seamless Integrations',
    description:
      'Connect 500+ data sources with pre-built connectors. From legacy databases to modern SaaS APIs, authenticate once and let NexusFlow handle the rest.',
    accent: '#FF9932',
    accentSecondary: '#FFC801',
  },
  {
    icon: Search,
    title: 'Smart Query Engine',
    description:
      'AI-powered search across all your connected datasets. Ask questions in natural language and get structured results, complete with lineage tracking and confidence scores.',
    accent: '#FFC801',
    accentSecondary: '#D9E8E2',
  },
  {
    icon: ArrowPath,
    title: 'Continuous Sync',
    description:
      'Real-time data synchronization with automatic conflict resolution. Bi-directional sync keeps every system as the single source of truth, with sub-second propagation.',
    accent: '#D9E8E2',
    accentSecondary: '#FF9932',
  },
  {
    icon: ArrowTrendingUp,
    title: 'Performance Analytics',
    description:
      'Monitor pipeline health with real-time metrics dashboards. Track throughput, latency, error rates, and cost per record, then let AI suggest optimizations.',
    accent: '#FF9932',
    accentSecondary: '#D9E8E2',
  },
];

function FeatureMiniVisual({ index }: { index: number }) {
  if (index === 0) {
    return (
      <div className="feature-flow mt-7" aria-hidden="true">
        <svg viewBox="0 0 420 150" className="h-32 w-full overflow-visible">
          <path className="flow-line flow-line-1" d="M40 76 C110 20 165 20 210 74" />
          <path className="flow-line flow-line-2" d="M210 74 C260 128 324 126 382 58" />
          <path className="flow-line flow-line-3" d="M92 118 C152 96 236 98 300 34" />
          {[
            [40, 76, 'TR'],
            [210, 74, 'ETL'],
            [382, 58, 'AI'],
            [92, 118, 'DB'],
            [300, 34, 'OK'],
          ].map(([cx, cy, label]) => (
            <g key={label as string} className="flow-node">
              <circle cx={cx} cy={cy} r="18" />
              <text x={cx} y={Number(cy) + 4}>
                {label}
              </text>
            </g>
          ))}
        </svg>
      </div>
    );
  }

  if (index === 5) {
    return (
      <div className="dashboard-mock mt-7" aria-hidden="true">
        <div className="gauge-wrap">
          <svg viewBox="0 0 88 88" className="h-24 w-24 -rotate-90">
            <circle className="gauge-track" cx="44" cy="44" r="32" />
            <circle className="gauge-value" cx="44" cy="44" r="32" />
          </svg>
          <span className="gauge-label">82%</span>
        </div>
        <div className="bar-stack">
          {[64, 88, 46, 72].map((height, barIndex) => (
            <span
              key={height}
              className="metric-bar"
              style={{
                '--bar-height': `${height}%`,
                transitionDelay: `${160 + barIndex * 80}ms`,
              } as CSSProperties}
            />
          ))}
        </div>
      </div>
    );
  }

  return null;
}

export function BentoAccordion() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const hoveredIndexRef = useRef<number | null>(null);
  const isMobileRef = useRef(false);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const handleMouseEnter = useCallback((index: number) => {
    hoveredIndexRef.current = index;
  }, []);

  const handleMouseLeave = useCallback((index: number) => {
    if (hoveredIndexRef.current === index) {
      hoveredIndexRef.current = null;
    }
  }, []);

  const handleFocus = useCallback((index: number) => {
    hoveredIndexRef.current = index;
  }, []);

  const handleBlur = useCallback((index: number) => {
    if (hoveredIndexRef.current === index) {
      hoveredIndexRef.current = null;
    }
  }, []);

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 767px)');

    const handleBreakpoint = (e: MediaQueryListEvent | MediaQueryList) => {
      const wasMobile = isMobileRef.current;
      isMobileRef.current = e.matches;
      setIsMobile(e.matches);

      if (!wasMobile && e.matches && hoveredIndexRef.current !== null) {
        setActiveIndex(hoveredIndexRef.current);
      }
    };

    handleBreakpoint(mql);
    mql.addEventListener('change', handleBreakpoint);
    return () => mql.removeEventListener('change', handleBreakpoint);
  }, []);

  const toggleAccordion = useCallback((index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  }, []);

  return (
    <section id="features" className="py-24 md:py-32 bg-bg-dark">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-4">
            <span className="text-accent-secondary mr-2" aria-hidden="true">{"///"}</span>
            Platform Features
          </p>
          <h2 className="font-mono text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-bg-light mb-4">
            Everything You Need to Ship{' '}
            <span className="text-accent">Data Products</span>
          </h2>
          <p className="font-sans text-base sm:text-lg text-bg-light-elevated max-w-2xl mx-auto">
            Six core capabilities that cover the entire data lifecycle, from
            ingestion through transformation to actionable insight delivery.
          </p>
        </div>

        <ScrollReveal className="reveal-container">
          {!isMobile && (
            <div
              className="hidden md:grid gap-4"
              style={{
                gridTemplateColumns: 'repeat(3, 1fr)',
                gridTemplateRows: 'auto auto',
                gridTemplateAreas: `
                  "card0 card0 card1"
                  "card2 card3 card3"
                  "card4 card5 card5"
                `,
              }}
            >
              {FEATURES.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={feature.title}
                    ref={(el) => { cardsRef.current[index] = el; }}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={() => handleMouseLeave(index)}
                    onFocus={() => handleFocus(index)}
                    onBlur={() => handleBlur(index)}
                    tabIndex={0}
                    role="article"
                    aria-label={feature.title}
                    className={`reveal-child group relative rounded-2xl p-8 overflow-hidden
                               border transition-all duration-150 ease-out
                               focus:outline-none focus:ring-2 focus:ring-accent/30 focus:ring-offset-2 focus:ring-offset-bg-dark
                               cursor-pointer
                               ${
                                 activeIndex === index
                                   ? 'border-accent bg-bg-dark-elevated/75 shadow-lg shadow-accent/5'
                                   : 'bg-bg-dark-elevated border-bg-light/5 hover:border-accent/30 focus:border-accent/30 hover:shadow-lg hover:shadow-accent/5'
                               }`}
                    style={{
                      gridArea: `card${index}`,
                      transitionDelay: `${index * 70}ms`,
                      '--accent': feature.accent,
                      '--accent-secondary': feature.accentSecondary,
                    } as CSSProperties}
                  >
                    <div className="bento-orb" aria-hidden="true" />
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 group-focus:opacity-100
                                 transition-opacity duration-150 ease-out pointer-events-none rounded-2xl"
                      style={{
                        background:
                          'linear-gradient(135deg, rgba(255,200,1,0.06) 0%, rgba(255,153,50,0.06) 100%)',
                      }}
                      aria-hidden="true"
                    />

                    <div className="relative mb-4 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-accent/10 text-accent group-hover:bg-accent/20 transition-colors duration-150 ease-out">
                      <Icon className="w-6 h-6" aria-hidden="true" />
                    </div>

                    <h3 className="relative font-mono text-lg font-bold text-bg-light mb-2">
                      {feature.title}
                    </h3>
                    <p className="relative font-sans text-sm text-bg-light-elevated leading-relaxed">
                      {feature.description}
                    </p>
                    <FeatureMiniVisual index={index} />
                  </div>
                );
              })}
            </div>
          )}

          <div className={`${isMobile ? 'block' : 'md:hidden'} space-y-3`}>
            {FEATURES.map((feature, index) => {
              const Icon = feature.icon;
              const isOpen = activeIndex === index;

              return (
                <div
                  key={feature.title}
                  className="reveal-child rounded-xl bg-bg-dark-elevated border border-bg-light/5 overflow-hidden"
                  style={{
                    transitionDelay: `${index * 60}ms`,
                    '--accent': feature.accent,
                    '--accent-secondary': feature.accentSecondary,
                  } as CSSProperties}
                >
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="flex items-center gap-4 w-full px-6 py-5 text-left hover:bg-accent/5 transition-colors duration-150 ease-out focus:outline-none focus:bg-accent/5"
                    aria-expanded={isOpen}
                    aria-controls={`accordion-panel-${index}`}
                  >
                    <div className={`mobile-orb-icon flex items-center justify-center w-10 h-10 rounded-lg shrink-0
                                     ${isOpen ? 'bg-accent/20 text-accent' : 'bg-bg-light/5 text-bg-light-elevated'}
                                     transition-colors duration-150 ease-out`}>
                      <Icon className="w-5 h-5" aria-hidden="true" />
                    </div>

                    <span className="flex-1 font-mono text-sm font-semibold text-bg-light">
                      {feature.title}
                    </span>

                    <ChevronDown
                      className={`w-5 h-5 text-bg-light-elevated shrink-0 transition-transform duration-150 ease-out ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                      aria-hidden="true"
                    />
                  </button>

                  <div
                    id={`accordion-panel-${index}`}
                    role="region"
                    className="grid transition-[grid-template-rows] duration-300 ease-in-out"
                    style={{
                      gridTemplateRows: isOpen ? '1fr' : '0fr',
                    }}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-5 pt-0 font-sans text-sm text-bg-light-elevated leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
