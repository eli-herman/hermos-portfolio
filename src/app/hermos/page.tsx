import { PageTransition } from '@/components/layout/page-transition';
import { SectionHeading } from '@/components/shared/section-heading';

export default function HermosPage() {
  return (
    <PageTransition>
      <div className="min-h-screen pt-24 px-4 md:px-6 mx-auto max-w-[1200px]">
        <SectionHeading
          title="Hermos"
          subtitle="Content coming in Plan 03"
        />
      </div>
    </PageTransition>
  );
}
