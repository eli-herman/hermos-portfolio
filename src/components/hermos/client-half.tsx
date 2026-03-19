'use client';

import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { DiagramEmbed } from '@/components/shared/diagram-embed';
import { ContainerScroll } from '@/components/ui/container-scroll';
import { FloatingBento } from '@/components/ui/floating-bento';
import { ShinyText } from '@/components/ui/shiny-text';

const WORKFLOW_EXAMPLES = [
  {
    title: 'A lead comes in. A proposal goes out.',
    description: 'When a new inquiry arrives, AI researches the prospect, pulls relevant context from your past work, and drafts a tailored proposal. You review, approve, send.',
  },
  {
    title: 'Reports that write themselves.',
    description: 'Connect your data sources once. Every Monday a performance summary is compiled, written, and in your inbox before you start work. No spreadsheets, no manual pulling.',
  },
  {
    title: 'Your entire business, searchable.',
    description: 'Contracts, emails, SOPs, meeting notes — indexed and queryable in plain English. Ask a question, get the answer and the source document.',
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
        <h1 className="text-[48px] md:text-[72px] font-bold tracking-[-0.03em] text-center text-transparent bg-clip-text bg-gradient-to-br from-foreground via-[#EABD70] to-accent drop-shadow-[0_0_32px_rgba(212,146,26,0.45)]">
          Hermos
        </h1>
        <p className="text-muted text-lg md:text-xl mt-4 text-center">
          Built for my own work. Available for yours.
        </p>

        <div className="mt-4">
          <ContainerScroll titleComponent={null}>
            <DiagramEmbed
              src="/diagrams/c4-simplified.svg"
              alt="Hermos platform architecture - service layers"
            />
          </ContainerScroll>
        </div>

        <div className="mt-12 space-y-6 max-w-[65ch]">
          <p className="text-muted text-base">
            Hermos is AI infrastructure I built for my own work. 27 custom tools, 29 automation workflows, and a 14-billion-parameter local model running on a home server — no third-party API bills, no external rate limits. The system scales with the work.
          </p>
          <p className="text-muted text-base">
            I use the same system to build for clients: websites, AI-integrated applications, and automation workflows that run in the background of a business.
          </p>
        </div>

        <div className="mt-16">
          <h2 className="text-[22px] md:text-[28px] font-bold tracking-[-0.02em]">
            <ShinyText>How does this fit your business?</ShinyText>
          </h2>
          <p className="text-muted text-base mt-2 max-w-[55ch]">
            A few examples of what this looks like in practice.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-6">
            {WORKFLOW_EXAMPLES.map((example) => (
              <FloatingBento key={example.title}>
                <div className="bio-card-wrap h-full">
                  <div className="bg-card rounded-lg p-6 hover:bg-card-hover transition-colors duration-150 h-full">
                    <h3 className="text-foreground font-semibold leading-snug">
                      {example.title}
                    </h3>
                    <p className="text-muted text-sm mt-3 leading-[1.6]">
                      {example.description}
                    </p>
                  </div>
                </div>
              </FloatingBento>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
