'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Wrench } from 'lucide-react';

// 27 tools grouped by capability domain
const TOOL_GROUPS = [
  { name: 'Code',   count: 7, label: 'Code gen / review' },
  { name: 'Sys',    count: 7, label: 'System ops' },
  { name: 'mem0',   count: 6, label: 'Memory' },
  { name: 'n8n',    count: 3, label: 'Automation' },
  { name: 'AI',     count: 4, label: 'Vision / media' },
];

const MAX_COUNT = 7;
const BAR_PX    = 80;

export function AiToolsCard() {
  const ref     = useRef<HTMLDivElement>(null);
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
            <Wrench className="mb-3 text-muted-foreground" size={20} />
            <div className="font-mono text-[32px] md:text-[48px] font-bold text-accent tracking-[-0.01em] leading-none">
              27
            </div>
            <div className="mt-2 text-sm text-muted">AI tools per session</div>
            <div className="mt-1 text-xs text-muted-foreground font-mono">
              5 domains · MCP
            </div>
          </div>

          {/* Right — bar chart */}
          <div
            className="flex items-end gap-1.5 self-end"
            style={{ height: `${BAR_PX + 18}px` }}
          >
            {TOOL_GROUPS.map((group, i) => {
              const targetH = Math.round((group.count / MAX_COUNT) * BAR_PX);
              return (
                <div
                  key={group.name}
                  className="group/bar flex flex-col items-center justify-end gap-[5px] w-6"
                  style={{ height: `${BAR_PX + 18}px` }}
                >
                  <motion.div
                    className="w-full rounded-t-sm bg-accent/50 group-hover/bar:bg-accent transition-colors duration-150 cursor-default"
                    title={`${group.label}: ${group.count}`}
                    initial={{ height: 0 }}
                    animate={isInView ? { height: targetH } : { height: 0 }}
                    transition={{
                      duration: 0.55,
                      delay: 0.04 * i,
                      ease: [0.6, 0.6, 0, 1],
                    }}
                  />
                  <span className="text-[9px] text-muted-foreground font-mono leading-none shrink-0">
                    {group.name}
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
