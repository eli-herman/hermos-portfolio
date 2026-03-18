'use client';

import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { ShieldCheck, Check } from 'lucide-react';
import { SECURITY_AUDIT } from '@/lib/constants';
import { FloatingBento } from '@/components/ui/floating-bento';

const SCANNERS = [
  { name: 'Semgrep',    pass: true },
  { name: 'Trivy',      pass: true },
  { name: 'CodeQL',     pass: true },
  { name: 'ESLint Sec', pass: true },
  { name: 'TypeScript', pass: true },
];

const STRIDE = [
  { code: 'S', label: 'Spoofing'         },
  { code: 'T', label: 'Tampering'        },
  { code: 'R', label: 'Repudiation'      },
  { code: 'I', label: 'Info Disclosure'  },
  { code: 'D', label: 'Denial of Service'},
  { code: 'E', label: 'Elevation'        },
];

// Real Phase 10 audit numbers: 59 findings (4C/18H/17M/20L). 45 fixed, 9 accepted risk, 5 deferred.
const SEVERITY = [
  { label: 'Critical', color: 'bg-red-500',    remaining: 0, total: 4  },
  { label: 'High',     color: 'bg-orange-400', remaining: 3, total: 18 },
  { label: 'Medium',   color: 'bg-yellow-400', remaining: 0, total: 17 },
  { label: 'Low',      color: 'bg-blue-400',   remaining: 0, total: 20 },
];
const MAX_TOTAL = 20;

export function SecurityBadge() {
  const ref      = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '0px 0px -40px 0px' });

  return (
    <FloatingBento>
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6 }}
      className="bg-card rounded-lg border border-border p-8 md:p-10"
    >
      {/* ── Header ── */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <ShieldCheck className="text-success shrink-0" size={24} />
          <h3 className="text-foreground text-xl md:text-2xl font-bold">
            {SECURITY_AUDIT.heading}
          </h3>
        </div>
        {/* Audit passed badge */}
        <span className="flex items-center gap-1.5 text-xs font-mono text-emerald-400 bg-emerald-400/10 border border-emerald-400/25 rounded-full px-3 py-1 shrink-0">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
          </span>
          Audit passed
        </span>
      </div>

      <p className="text-muted text-sm mt-4 max-w-[65ch]">
        {SECURITY_AUDIT.description}
      </p>

      {/* ── Three panels ── */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Panel 1 — Automated scanners */}
        <div className="space-y-3">
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
            Automated scanners
          </p>
          <div className="flex flex-col gap-2">
            {SCANNERS.map((scanner, i) => (
              <motion.div
                key={scanner.name}
                className="flex items-center justify-between rounded-md bg-card-hover border border-border px-3 py-2"
                initial={{ opacity: 0, x: -8 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
                transition={{ duration: 0.35, delay: 0.1 + i * 0.07 }}
              >
                <span className="text-xs font-mono text-muted">{scanner.name}</span>
                <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-400">
                  <Check size={11} strokeWidth={3} />
                  pass
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Panel 2 — STRIDE coverage */}
        <div className="space-y-3">
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
            STRIDE coverage
          </p>
          <div className="grid grid-cols-2 gap-2">
            {STRIDE.map((threat, i) => (
              <motion.div
                key={threat.code}
                className="flex items-center gap-2 rounded-md bg-card-hover border border-border px-3 py-2"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: 0.15 + i * 0.06 }}
              >
                <span className="font-mono text-[11px] font-bold text-accent w-3 shrink-0">
                  {threat.code}
                </span>
                <span className="text-[10px] text-muted-foreground leading-tight truncate">
                  {threat.label}
                </span>
                <Check size={10} className="text-emerald-400 shrink-0 ml-auto" strokeWidth={3} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Panel 3 — Finding severity */}
        <div className="space-y-3">
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
            Findings remaining
          </p>
          <div className="flex flex-col gap-3">
            {SEVERITY.map((sev, i) => (
              <motion.div
                key={sev.label}
                className="space-y-1"
                initial={{ opacity: 0, x: 8 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 8 }}
                transition={{ duration: 0.35, delay: 0.1 + i * 0.08 }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono text-muted-foreground">{sev.label}</span>
                  <span className="text-[11px] font-mono text-emerald-400 font-bold">
                    {sev.total - sev.remaining}/{sev.total} fixed
                  </span>
                </div>
                {/* Track — always full width, colored at low opacity */}
                <div className="h-1.5 rounded-full bg-card-hover overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${sev.color} opacity-30`}
                    initial={{ width: 0 }}
                    animate={isInView ? { width: '100%' } : { width: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 + i * 0.08, ease: [0.6, 0.6, 0, 1] }}
                  />
                </div>
                {/* Fixed overlay — covers exactly the fixed proportion of this severity */}
                <div className="h-1.5 rounded-full overflow-hidden -mt-[7px] relative">
                  <motion.div
                    className="h-full rounded-full bg-emerald-500/50"
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${((sev.total - sev.remaining) / sev.total) * 100}%` } : { width: 0 }}
                    transition={{ duration: 0.5, delay: 0.45 + i * 0.08, ease: [0.6, 0.6, 0, 1] }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom stats row ── */}
      <div className="mt-8 pt-6 border-t border-border grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-4">
        {SECURITY_AUDIT.stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.3 + i * 0.06 }}
          >
            <div className="text-foreground font-mono text-base font-semibold">
              {stat.value}
            </div>
            <div className="text-muted-foreground text-xs mt-0.5">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
    </FloatingBento>
  );
}
