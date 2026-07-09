import { Navbar } from '@/components/navbar';
import { Hero } from '@/components/hero';
import { BrandMarquee } from '@/components/brand-marquee';
import { ApproachSection } from '@/components/approach-section';
import { ServicesSection } from '@/components/services-section';
import { InnovationSection } from '@/components/innovation-section';
import { InteractiveDemoSection } from '@/components/interactive-demo-section';
import { TemplatesGallerySection } from '@/components/templates-gallery-section';
import { CasesSection } from '@/components/cases-section';
import { StatsSection } from '@/components/stats-section';
import { UseCasesSection } from '@/components/use-cases-section';
import { PortfolioSection } from '@/components/portfolio-section';
import { MissionSection } from '@/components/mission-section';
import { ContactSection } from '@/components/contact-section';
import { StickyCta } from '@/components/sticky-cta';
import { Footer } from '@/components/footer';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="pb-28">
        <Hero />
        <BrandMarquee />
        <ApproachSection />
        <ServicesSection />
        <InteractiveDemoSection />
        <TemplatesGallerySection />
        <InnovationSection />
        <CasesSection />
        <StatsSection />
        <UseCasesSection />
        <PortfolioSection />
        <MissionSection />
        <ContactSection />
      </main>
      <StickyCta />
      <Footer />
    </>
  );
}
