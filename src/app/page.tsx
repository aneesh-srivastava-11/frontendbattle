import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { BentoAccordion } from '@/components/features/BentoAccordion';
import { PricingSection } from '@/components/pricing/PricingSection';
import { MetricsStrip } from '@/components/sections/MetricsStrip';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <BentoAccordion />
        <PricingSection />
        <MetricsStrip />
      </main>
      <Footer />
    </>
  );
}
