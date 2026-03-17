import { ClientHalf } from '@/components/hermos/client-half';
import { CommandCenterDemo } from '@/components/hermos/command-center-demo';
import { TechHalf } from '@/components/hermos/tech-half';
import { ContactSection } from '@/components/shared/contact-section';
import { PageTransition } from '@/components/layout/page-transition';

export const metadata = {
  title: 'Hermos — AI Company OS | Eli Herman',
  description: 'The operating system for a one-person AI company. 27 AI tools, 13,659 indexed documents, 29 automation workflows.',
};

export default function HermosPage() {
  return (
    <PageTransition>
      <ClientHalf />
      <CommandCenterDemo />
      <TechHalf />
      <ContactSection />
    </PageTransition>
  );
}
