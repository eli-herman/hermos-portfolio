'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { CpuArchitecture } from '@/components/hermos/cpu-architecture';

export function LocalModelCard() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '0px 0px -40px 0px' });

  return (
    <div className="stat-card-wrap">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
        className="rounded-lg bg-card hover:bg-card-hover transition-colors duration-150 p-5 flex flex-col gap-4"
      >
        {/* Force the SVG into its natural 2:1 aspect ratio so it renders properly */}
        <div className="w-full" style={{ aspectRatio: '2 / 1' }}>
          <CpuArchitecture
            text="LLM"
            className="w-full h-full"
            width="100%"
            height="100%"
          />
        </div>

        {/* Stat text */}
        <div>
          <div className="font-mono text-[32px] md:text-[48px] font-bold text-accent tracking-[-0.01em] leading-none">
            14B
          </div>
          <div className="mt-1.5 text-sm text-muted">Parameter local model</div>
          <div className="mt-0.5 text-xs text-muted-foreground font-mono">
            qwen2.5-coder · RTX 4060 Ti
          </div>
        </div>
      </motion.div>
    </div>
  );
}
