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
import { AiToolsCard } from '@/components/hermos/ai-tools-card';
import { TunnelCard } from '@/components/hermos/tunnel-card';
import { LocalModelCard } from '@/components/hermos/local-model-card';
import { FloatingBento } from '@/components/ui/floating-bento';

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
            <FloatingBento className="h-full">
              <WorkflowChartCard />
            </FloatingBento>
            {/* Documents indexed — plain stat, no bespoke visualization needed */}
            {STATS.filter((s) => s.label === 'Documents indexed').map((stat) => (
              <FloatingBento key={stat.label} className="h-full">
                <StatCard
                  value={stat.value}
                  label={stat.label}
                  icon={stat.icon}
                />
              </FloatingBento>
            ))}
            <FloatingBento className="h-full">
              <AiToolsCard />
            </FloatingBento>
            <FloatingBento className="h-full">
              <TunnelCard />
            </FloatingBento>
            <FloatingBento className="h-full">
              <LocalModelCard />
            </FloatingBento>
          </BentoGrid>
        </div>

        <div className="mt-12">
          <SecurityBadge />
        </div>

        <div className="mt-12">
          <DiagramEmbed
            src="/diagrams/c4-full.svg"
            alt="Hermos platform architecture - full container diagram"
            caption="Container Architecture — Full system topology"
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
