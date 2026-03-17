import { BioSection } from '@/components/about/bio-section';
import { TimelineScroll } from '@/components/about/timeline-scroll';
import { ContactSection } from '@/components/shared/contact-section';
import { PageTransition } from '@/components/layout/page-transition';

export const metadata = {
  title: 'About — Eli Herman | AI Infrastructure & Automation',
  description:
    'Baylor MIS student building AI infrastructure that ships. From financial dashboards to a full AI company operating system.',
};

export default function AboutPage() {
  return (
    <PageTransition>
      <BioSection />
      <TimelineScroll />
      <ContactSection />
    </PageTransition>
  );
}
