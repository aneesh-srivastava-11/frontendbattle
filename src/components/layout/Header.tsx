'use client';

import { useEffect, useRef, useState } from 'react';
import { XMark } from '@/components/icons';

const NAV_LINKS = [
  { href: '#features', label: 'Features' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#metrics', label: 'Performance' },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ease-out ${
        scrolled
          ? 'bg-bg-dark/95 backdrop-blur-md shadow-lg shadow-bg-dark/20'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto max-w-7xl px-6 lg:px-8" aria-label="Primary navigation">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group" aria-label="NexusFlow home">
            <span className="font-mono text-xl font-bold tracking-tight text-bg-light">
              Nexus<span className="text-accent">Flow</span>
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative py-1.5 font-sans text-sm text-bg-light-elevated hover:text-accent transition-colors duration-150 ease-out group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent transform scale-x-0 origin-center transition-transform duration-200 ease-out group-hover:scale-x-100" />
              </a>
            ))}
            <a
              href="#pricing"
              className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 font-sans text-sm font-semibold text-bg-dark hover:bg-accent-secondary transition-all duration-200 ease-out animate-btn-pulse active:scale-95"
            >
              Get Started
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <span className="block w-6 h-0.5 bg-bg-light" />
            <span className="block w-6 h-0.5 bg-bg-light" />
            <span className="block w-4 h-0.5 bg-accent" />
          </button>
        </div>
      </nav>

      {/* Mobile slide-in panel */}
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-bg-dark/60 z-40 transition-opacity duration-200 ease-out md:hidden ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-72 bg-bg-dark-elevated z-50 transform transition-transform duration-200 ease-out md:hidden ${
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-6">
          <span className="font-mono text-lg font-bold text-bg-light">
            Nexus<span className="text-accent">Flow</span>
          </span>
          <button
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
            className="text-bg-light hover:text-accent transition-colors duration-150 ease-out"
          >
            <XMark className="w-6 h-6" />
          </button>
        </div>
        <div className="flex flex-col gap-1 px-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="py-3 font-sans text-base text-bg-light-elevated hover:text-accent border-b border-bg-light/10 transition-colors duration-150 ease-out"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#pricing"
            onClick={() => setMobileOpen(false)}
            className="mt-4 inline-flex items-center justify-center rounded-lg bg-accent px-4 py-3 font-sans text-sm font-semibold text-bg-dark hover:bg-accent-secondary transition-all duration-150 ease-out active:scale-95"
          >
            Get Started
          </a>
        </div>
      </div>
    </header>
  );
}
