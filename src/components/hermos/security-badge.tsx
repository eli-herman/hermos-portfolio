'use client';

import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { ShieldCheck } from 'lucide-react';
import { SECURITY_AUDIT } from '@/lib/constants';

export function SecurityBadge() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6 }}
      className="bg-card rounded-lg border border-border p-8 md:p-12"
    >
      <div className="flex items-center gap-3 mb-4">
        <ShieldCheck className="text-success" size={24} />
        <h3 className="text-foreground text-xl md:text-2xl font-bold">
          {SECURITY_AUDIT.heading}
        </h3>
      </div>
      <p className="text-muted text-base mt-4 max-w-[65ch]">
        {SECURITY_AUDIT.description}
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
        {SECURITY_AUDIT.stats.map((stat) => (
          <div key={stat.label}>
            <div className="text-foreground font-mono text-lg font-semibold">
              {stat.value}
            </div>
            <div className="text-muted-foreground text-sm">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
