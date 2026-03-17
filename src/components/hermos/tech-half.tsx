'use client';

import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { STATS } from '@/lib/constants';
import { SectionHeading } from '@/components/shared/section-heading';
import { StatCard } from '@/components/hermos/stat-card';
import { BentoGrid } from '@/components/hermos/bento-grid';
import { SecurityBadge } from '@/components/hermos/security-badge';
import { TechMarquee } from '@/components/hermos/tech-marquee';
import { DiagramEmbed } from '@/components/shared/diagram-embed';
import { WorkflowChartCard } from '@/components/hermos/workflow-chart-card';
import { LocalModelCard } from '@/components/hermos/local-model-card';

export function TechHalf() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section className="py-16 md:py-[64px] px-4 border-t border-border">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading title="Under the hood" />
        </motion.div>

        <div className="mt-12">
          <BentoGrid>
            <WorkflowChartCard />
            {STATS.filter((s) => s.label !== 'Automation workflows' && s.label !== 'Parameter local model').map((stat) => (
              <StatCard
                key={stat.label}
                value={stat.value}
                label={stat.label}
                icon={stat.icon}
              />
            ))}
            <LocalModelCard />
          </BentoGrid>
        </div>

        <div className="mt-12">
          <SecurityBadge />
        </div>

        <div className="mt-12">
          <DiagramEmbed
            src="/diagrams/c4-full.svg"
            alt="Hermos platform architecture - full container diagram"
            caption="C4 Container Diagram - Full system topology"
          />
        </div>

        <div className="mt-12">
          <SectionHeading title="Stack" />
          <div className="mt-8">
            <TechMarquee />
          </div>
        </div>
      </div>
    </section>
  );
}
