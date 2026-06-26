'use client';

export function Footer() {
  return (
    <footer className="bg-bg-dark-elevated border-t border-bg-light/10">
      {/* Main footer grid */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <span className="font-mono text-xl font-bold text-bg-light">
              Nexus<span className="text-accent">Flow</span>
            </span>
            <p className="mt-4 font-sans text-sm text-bg-light-elevated leading-relaxed max-w-xs">
              AI-driven data automation that transforms how teams build, manage,
              and optimize their data pipelines.
            </p>
          </div>

          {/* Product links */}
          <div>
            <h4 className="font-mono text-xs font-semibold uppercase tracking-widest text-accent mb-4">
              Product
            </h4>
            <ul className="space-y-3">
              {['Automated Workflows', 'Integrations', 'Analytics', 'Smart Query', 'Pricing'].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="font-sans text-sm text-bg-light-elevated hover:text-accent transition-colors duration-150 ease-out"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h4 className="font-mono text-xs font-semibold uppercase tracking-widest text-accent mb-4">
              Company
            </h4>
            <ul className="space-y-3">
              {['About Us', 'Careers', 'Blog', 'Contact', 'Partners'].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="font-sans text-sm text-bg-light-elevated hover:text-accent transition-colors duration-150 ease-out"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-mono text-xs font-semibold uppercase tracking-widest text-accent mb-4">
              Stay Updated
            </h4>
            <p className="font-sans text-sm text-bg-light-elevated mb-4">
              Get the latest on AI automation, product updates, and data engineering best practices.
            </p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="you@company.com"
                className="flex-1 min-w-0 rounded-lg bg-bg-dark px-3 py-2 font-sans text-sm text-bg-light placeholder:text-bg-light-elevated/60 border border-bg-light/10 focus:border-accent focus:outline-none transition-colors duration-150 ease-out"
                aria-label="Email address for newsletter"
              />
              <button
                type="submit"
                className="rounded-lg bg-accent px-4 py-2 font-sans text-sm font-semibold text-bg-dark hover:bg-accent-secondary transition-colors duration-150 ease-out shrink-0"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom bar with watermark */}
      <div className="border-t border-bg-light/5">
        {/* Large marquee wordmark */}
        <div className="footer-marquee pt-8 pb-2" aria-hidden="true">
          <div className="footer-marquee-track font-mono text-6xl sm:text-8xl lg:text-9xl font-black tracking-tight text-bg-light/[0.035] select-none">
            <span className="footer-marquee-text">NEXUSFLOW / BUILD LOGIC AT SCALE / </span>
            <span className="footer-marquee-text">NEXUSFLOW / BUILD LOGIC AT SCALE / </span>
            <span className="footer-marquee-text">NEXUSFLOW / BUILD LOGIC AT SCALE / </span>
            <span className="footer-marquee-text">NEXUSFLOW / BUILD LOGIC AT SCALE / </span>
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-8">
          <p className="font-sans text-xs text-bg-light-elevated/60 text-center">
            © {new Date().getFullYear()} NexusFlow. All rights reserved. Built with precision for the data-driven enterprise.
          </p>
        </div>
      </div>
    </footer>
  );
}
