'use client';

import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { ChevronRight } from '@/components/icons';

const HeroVisual = dynamic(() => import('./HeroVisual'), { ssr: false });

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      hero.style.setProperty('--mouse-x', `${x}px`);
      hero.style.setProperty('--mouse-y', `${y}px`);
    };

    hero.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => hero.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-bg-dark pt-16"
    >
      {/* Background gradient effects */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Dynamic Three.js Particle Visual */}
        <HeroVisual />
        {/* Radial accent glow behind headline */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-accent/[0.06] blur-[120px]" />
        {/* Secondary drifting glow */}
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-accent-secondary/[0.04] blur-[100px] animate-glow-drift" />
        {/* Cursor glow */}
        <div
          className="absolute inset-0 opacity-40 transition-opacity duration-300 cursor-glow"
          style={{
            background: `radial-gradient(800px circle at var(--mouse-x, -999px) var(--mouse-y, -999px), color-mix(in srgb, var(--accent) 8%, transparent), transparent 80%)`,
          }}
        />
        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(var(--bg-light) 1px, transparent 1px), linear-gradient(90deg, var(--bg-light) 1px, transparent 1px)`,
            backgroundSize: '64px 64px',
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 py-24 md:py-32">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <p className="animate-hero-entrance animate-delay-0 font-mono text-xs sm:text-sm uppercase tracking-[0.2em] text-accent mb-6">
            <span className="text-accent-secondary mr-2" aria-hidden="true">{"///"}</span>
            AI-Powered Automation
          </p>

          {/* Headline — single h1 for the entire page, staggered per line */}
          <h1 className="font-mono text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight text-bg-light mb-6">
            <span className="block animate-hero-entrance animate-delay-60">
              Transform Raw Data Into
            </span>
            <span className="block animate-hero-entrance animate-delay-120 text-accent">
              Actionable Intelligence
            </span>
          </h1>

          {/* Supporting copy */}
          <p className="animate-hero-entrance animate-delay-180 font-sans text-base sm:text-lg md:text-xl text-bg-light-elevated leading-relaxed max-w-2xl mb-10">
            NexusFlow orchestrates your entire data pipeline — from ingestion to
            insight — with AI agents that learn, adapt, and optimize in real time.
          </p>

          {/* CTA row */}
          <div className="animate-hero-entrance animate-delay-240 flex flex-col sm:flex-row gap-4">
            {/* Primary CTA */}
            <a
              href="#pricing"
              className="group inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3.5 font-sans text-base font-semibold text-bg-dark shadow-lg shadow-accent/20 hover:bg-accent-secondary hover:shadow-accent-secondary/35 hover:-translate-y-[2px] transition-all duration-200 ease-out active:scale-97 animate-btn-pulse"
            >
              Start Automating
              <ChevronRight className="w-4 h-4 transition-transform duration-200 ease-out group-hover:translate-x-1" aria-hidden="true" />
            </a>

            {/* Secondary CTA */}
            <a
              href="#features"
              className="group inline-flex items-center justify-center gap-2 rounded-lg border-2 border-accent/40 px-6 py-3.5 font-sans text-base font-semibold text-accent hover:bg-accent/10 hover:border-accent hover:-translate-y-[2px] transition-all duration-200 ease-out active:scale-97"
            >
              Explore Features
              <ChevronRight className="w-4 h-4 transition-transform duration-200 ease-out group-hover:translate-x-1" aria-hidden="true" />
            </a>
          </div>

          {/* Trust badge line */}
          <p className="animate-hero-entrance animate-delay-300 mt-8 font-sans text-xs text-bg-light-elevated/60">
            Trusted by 2,000+ data teams worldwide · SOC 2 Type II Certified · 99.9% Uptime SLA
          </p>
        </div>
      </div>
    </section>
  );
}
