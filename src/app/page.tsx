import { HeroSection } from '@/components/home/hero-section';
import { QuickProjectGrid } from '@/components/home/quick-project-grid';
import { AudienceAccessPoints } from '@/components/home/audience-access-points';
import { ContactSection } from '@/components/shared/contact-section';
import { PageTransition } from '@/components/layout/page-transition';

export default function HomePage() {
  return (
    <PageTransition>
      <HeroSection />
      <QuickProjectGrid />
      <AudienceAccessPoints />
      <ContactSection />
    </PageTransition>
  );
}
