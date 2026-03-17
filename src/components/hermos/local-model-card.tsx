'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { CpuArchitecture } from '@/components/hermos/cpu-architecture';

export function LocalModelCard() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '0px 0px -40px 0px' });

  return (
    <div className="stat-card-wrap h-full">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
        className="rounded-lg bg-card hover:bg-card-hover transition-colors duration-150 p-6 flex flex-col h-full"
      >
        {/* CPU animation */}
        <div className="flex-1 min-h-0">
          <CpuArchitecture
            text="LLM"
            className="w-full text-border opacity-90"
          />
        </div>

        {/* Stat */}
        <div className="mt-3">
          <div className="font-mono text-[32px] md:text-[48px] font-bold text-accent tracking-[-0.01em] leading-none">
            14B
          </div>
          <div className="mt-2 text-sm text-muted">Parameter local model</div>
          <div className="mt-1 text-xs text-muted-foreground font-mono">
            qwen2.5-coder · RTX 4060 Ti
          </div>
        </div>
      </motion.div>
    </div>
  );
}
