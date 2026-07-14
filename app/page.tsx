import { V2Navbar } from '@/components/v2/navbar';
import { V2Hero } from '@/components/v2/hero';
import { V2BrandMarquee } from '@/components/v2/brand-marquee';
import { V2Approach } from '@/components/v2/approach';
import { V2Services } from '@/components/v2/services';
import { V2DemoSection } from '@/components/v2/demo-section';
import { V2SitesShowcase } from '@/components/v2/sites-showcase';
import { V2CrmShowcase } from '@/components/v2/crm-showcase';
import { V2Innovation } from '@/components/v2/innovation';
import { V2Stats } from '@/components/v2/stats';
import { V2Ecosystem } from '@/components/v2/ecosystem';
import { V2HumanProof } from '@/components/v2/human-proof';
import { V2Medal } from '@/components/v2/medal';
import { V2Timeline } from '@/components/v2/timeline';
import { V2TechCloud } from '@/components/v2/tech-cloud';
import { V2Cta } from '@/components/v2/cta';
import { V2Footer } from '@/components/v2/footer';
import { V2ParticleContinuum } from '@/components/v2/particle-continuum';

export default function HomePage() {
  return (
    <>
      <V2Navbar />
      <main>
        <V2Hero />
        <div className="relative isolate overflow-hidden bg-[#03080c]">
          <V2ParticleContinuum />
          <V2BrandMarquee />
          <V2Approach />
        </div>
        <V2Services />
        <V2DemoSection />
        <V2SitesShowcase />
        <V2CrmShowcase />
        <V2Innovation />
        <V2Stats />
        <V2Ecosystem />
        <V2HumanProof />
        <V2Medal />
        <V2Timeline />
        <V2TechCloud />
        <V2Cta />
      </main>
      <V2Footer />
    </>
  );
}
