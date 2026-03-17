'use client';

import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { DiagramEmbed } from '@/components/shared/diagram-embed';

const SERVICE_TIERS = [
  {
    title: 'Consulting & Website Rebuilds',
    description: 'Modern websites and AI-integrated applications. Ship in days what agencies quote in weeks.',
  },
  {
    title: 'Productized AI Services',
    description: 'Automated intelligence products. Recurring revenue from signal services and data pipelines.',
  },
  {
    title: 'Platform',
    description: 'Hermos as a product. The same infrastructure, packaged for builders who want team-scale output.',
  },
] as const;

export function ClientHalf() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="py-16 md:py-[64px] px-4"
    >
      <div className="max-w-[1200px] mx-auto">
        <h1 className="text-foreground text-[32px] md:text-[48px] font-bold tracking-[-0.02em]">
          Hermos
        </h1>
        <p className="text-muted text-lg md:text-xl mt-4">
          What I built. What I can build for you.
        </p>

        <div className="mt-12">
          <DiagramEmbed
            src="/diagrams/c4-simplified.svg"
            alt="Hermos platform architecture - service layers"
          />
        </div>

        <div className="mt-12 space-y-6 max-w-[65ch]">
          <p className="text-muted text-base">
            Hermos is AI infrastructure that gives one person the build, ship, and run capabilities of a full engineering team.
          </p>
          <p className="text-muted text-base">
            27 AI tools, 29 automation workflows, and a 14-billion-parameter local model running on a home server. No API bills. No rate limits.
          </p>
          <p className="text-muted text-base">
            I use this system to deliver modern websites, AI-integrated applications, and managed automation pipelines. Ship in days what agencies quote in weeks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-12">
          {SERVICE_TIERS.map((tier) => (
            <div
              key={tier.title}
              className="bg-card border border-border rounded-lg p-6 hover:bg-card-hover transition-colors duration-150"
            >
              <h3 className="text-foreground font-semibold">
                {tier.title}
              </h3>
              <p className="text-muted text-sm mt-2">
                {tier.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
