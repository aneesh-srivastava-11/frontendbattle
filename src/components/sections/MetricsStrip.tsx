'use client';

import { useEffect, useRef } from 'react';
import { ChartPie } from '@/components/icons';

const METRICS = [
  { id: 'metric-value-0', value: '99.9%', start: 0, end: 99.9, decimals: 1, prefix: '', suffix: '%', label: 'Platform Reliability', sublabel: 'Uptime SLA' },
  { id: 'metric-value-1', value: '10M+', start: 0, end: 10, decimals: 0, prefix: '', suffix: 'M+', label: 'Data Pipelines Processed', sublabel: 'Monthly Volume' },
  { id: 'metric-value-2', value: '500+', start: 0, end: 500, decimals: 0, prefix: '', suffix: '+', label: 'Pre-Built Connectors', sublabel: 'Integrations' },
  { id: 'metric-value-3', value: '<12ms', start: 0, end: 12, decimals: 0, prefix: '<', suffix: 'ms', label: 'Average Response Time', sublabel: 'Latency' },
];

export function MetricsStrip() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const animateCounter = (
      id: string,
      start: number,
      end: number,
      decimals: number,
      prefix: string,
      suffix: string,
      duration = 1000
    ) => {
      const el = document.getElementById(id);
      if (!el) return;

      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) {
        el.textContent = `${prefix}${end.toFixed(decimals)}${suffix}`;
        return;
      }

      const startTime = performance.now();

      const update = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = progress * (2 - progress); // Ease out quad
        const value = start + (end - start) * easeProgress;

        el.textContent = `${prefix}${value.toFixed(decimals)}${suffix}`;

        if (progress < 1) {
          requestAnimationFrame(update);
        }
      };

      requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const cards = section.querySelectorAll('.metric-card');
            cards.forEach((card) => card.classList.add('is-visible'));

            // Trigger animations
            METRICS.forEach((metric) => {
              animateCounter(
                metric.id,
                metric.start,
                metric.end,
                metric.decimals,
                metric.prefix,
                metric.suffix,
                1000
              );
            });

            observer.unobserve(section);
          }
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="metrics"
      ref={sectionRef}
      className="py-24 md:py-32 bg-bg-dark border-t border-bg-light/5"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-4">
            <span className="text-accent-secondary mr-2" aria-hidden="true">{"///"}</span>
            Performance
          </p>
          <h2 className="font-mono text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-bg-light mb-4">
            Numbers That{' '}
            <span className="text-accent">Speak Volumes</span>
          </h2>
          <p className="font-sans text-base sm:text-lg text-bg-light-elevated max-w-2xl mx-auto">
            Enterprise-grade reliability metrics across thousands of production deployments.
          </p>
        </div>

        {/* Metrics grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {METRICS.map((metric, index) => (
            <div
              key={metric.label}
              className={`metric-card reveal-on-scroll reveal-stagger-${index + 1}
                         relative rounded-2xl bg-bg-dark-elevated p-8 text-center
                         border border-bg-light/5
                         hover:border-accent/20 transition-all duration-150 ease-out group`}
            >
              {/* Top accent line */}
              <div
                className="absolute top-0 left-6 right-6 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent"
                aria-hidden="true"
              />

              {/* Corner bracket decoration */}
              <div
                className="absolute top-3 right-3 text-accent/20 font-mono text-xs group-hover:text-accent/40 transition-colors duration-150 ease-out"
                aria-hidden="true"
              >
                ┐
              </div>

              {/* Value — JetBrains Mono */}
              <p
                id={metric.id}
                className="font-mono text-3xl sm:text-4xl lg:text-5xl font-extrabold text-accent tracking-tight mb-2"
              >
                {metric.value}
              </p>

              {/* Label */}
              <p className="font-sans text-sm text-bg-light-elevated mb-1 leading-snug">
                {metric.label}
              </p>

              {/* Sublabel */}
              <p className="font-sans text-xs text-bg-light-elevated/50 uppercase tracking-wider">
                {metric.sublabel}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom decorative element */}
        <div className="flex items-center justify-center mt-12 gap-2 text-bg-light-elevated/40">
          <ChartPie className="w-4 h-4" aria-hidden="true" />
          <span className="font-sans text-xs">Metrics updated in real-time from production telemetry</span>
        </div>
      </div>
    </section>
  );
}
