'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Workflow } from 'lucide-react';

// Real data from CLAUDE.md: 29 workflows across 9 n8n prefixes
const CATEGORIES = [
  { name: 'MEM',  count: 5, label: 'Memory' },
  { name: 'SYS',  count: 5, label: 'System' },
  { name: 'Vine', count: 5, label: 'The Vine' },
  { name: 'SVC',  count: 4, label: 'Services' },
  { name: 'HUB',  count: 3, label: 'Hub' },
  { name: 'LRN',  count: 3, label: 'Learning' },
  { name: 'LUC',  count: 2, label: 'LumaCharts' },
  { name: 'DFD',  count: 1, label: 'DFD' },
  { name: 'SEC',  count: 1, label: 'Security' },
];

const MAX_COUNT = 5;
const BAR_PX = 80;

export function WorkflowChartCard() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '0px 0px -40px 0px' });

  return (
    <div className="stat-card-wrap h-full">
      <div
        ref={ref}
        className="rounded-lg bg-card hover:bg-card-hover transition-colors duration-150 p-6 h-full"
      >
        <div className="flex flex-col sm:flex-row items-start justify-between gap-6 h-full">
          {/* Left — stat */}
          <div>
            <Workflow className="mb-3 text-muted-foreground" size={20} />
            <div className="font-mono text-[32px] md:text-[48px] font-bold text-accent tracking-[-0.01em] leading-none">
              29
            </div>
            <div className="mt-2 text-sm text-muted">Automation workflows</div>
            <div className="mt-1 text-xs text-muted-foreground font-mono">
              9 categories · n8n
            </div>
          </div>

          {/* Right — bar chart */}
          <div
            className="flex items-end gap-1.5 self-end"
            style={{ height: `${BAR_PX + 18}px` }}
          >
            {CATEGORIES.map((cat, i) => {
              const targetH = Math.round((cat.count / MAX_COUNT) * BAR_PX);
              return (
                <div
                  key={cat.name}
                  className="group/bar flex flex-col items-center justify-end gap-[5px] w-6"
                  style={{ height: `${BAR_PX + 18}px` }}
                >
                  <motion.div
                    className="w-full rounded-t-sm bg-accent/50 group-hover/bar:bg-accent transition-colors duration-150 cursor-default"
                    title={`${cat.label}: ${cat.count}`}
                    initial={{ height: 0 }}
                    animate={isInView ? { height: targetH } : { height: 0 }}
                    transition={{
                      duration: 0.55,
                      delay: 0.04 * i,
                      ease: [0.6, 0.6, 0, 1],
                    }}
                  />
                  <span className="text-[9px] text-muted-foreground font-mono leading-none shrink-0">
                    {cat.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
