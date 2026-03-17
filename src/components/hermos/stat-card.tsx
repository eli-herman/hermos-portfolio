'use client';

import { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { motion, useInView } from 'motion/react';
import { Database, Workflow, Wrench, Globe, Cpu, type LucideIcon } from 'lucide-react';

const ICON_MAP: Record<string, LucideIcon> = {
  Database,
  Workflow,
  Wrench,
  Globe,
  Cpu,
};

interface StatCardProps {
  value: string;
  label: string;
  icon?: string;
}

function parseNumericValue(value: string): { numeric: number; suffix: string } | null {
  const cleaned = value.replace(/,/g, '');
  const match = cleaned.match(/^(\d+)(.*)$/);
  if (match) {
    return { numeric: parseInt(match[1], 10), suffix: match[2] };
  }
  return null;
}

function formatNumber(n: number): string {
  return n.toLocaleString();
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

export function StatCard({ value, label, icon }: StatCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '0px 0px -40px 0px' });
  const parsed = useMemo(() => parseNumericValue(value), [value]);
  const [displayValue, setDisplayValue] = useState(() =>
    parsed ? '0' + parsed.suffix : value
  );

  const animate = useCallback(() => {
    if (!parsed) {
      setDisplayValue(value);
      return;
    }

    const duration = 800;
    const startTime = performance.now();

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);
      const current = Math.round(eased * parsed!.numeric);
      setDisplayValue(formatNumber(current) + parsed!.suffix);

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    }

    requestAnimationFrame(tick);
  }, [parsed, value]);

  useEffect(() => {
    if (isInView) {
      if (parsed) {
        animate();
      } else {
        setDisplayValue(value);
      }
    }
  }, [isInView, animate, parsed, value]);

  const IconComponent = icon ? ICON_MAP[icon] : null;

  return (
    <div className="stat-card-wrap">
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6 }}
      className="rounded-lg bg-card hover:bg-card-hover transition-colors duration-150 p-6"
    >
      {IconComponent && (
        <IconComponent className="mb-3 text-muted-foreground" size={20} />
      )}
      <div className="font-mono text-[32px] md:text-[48px] font-bold text-accent tracking-[-0.01em] leading-none">
        {displayValue}
      </div>
      <div className="mt-2 text-sm text-muted">
        {label}
      </div>
    </motion.div>
    </div>
  );
}
