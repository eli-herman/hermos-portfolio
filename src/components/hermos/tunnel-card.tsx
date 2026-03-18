'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Globe } from 'lucide-react';

const ENDPOINTS = [
  { name: 'n8n',        label: 'Automation dashboard' },
  { name: 'qs',         label: 'Quality Server API'   },
  { name: 'chromadb',   label: 'Vector database'      },
  { name: 'mem0',       label: 'Memory layer'         },
  { name: 'bridge',     label: 'Claude Bridge'        },
  { name: 'sync',       label: 'Git sync webhook'     },
  { name: 'ssh',        label: 'SSH tunnel'           },
];

export function TunnelCard() {
  const ref      = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '0px 0px -40px 0px' });

  return (
    <div className="stat-card-wrap h-full">
      <div
        ref={ref}
        className="rounded-lg bg-card hover:bg-card-hover transition-colors duration-150 p-6 h-full"
      >
        <div className="flex flex-col sm:flex-row items-start justify-between gap-6 h-full">
          {/* Left — stat */}
          <div className="shrink-0">
            <Globe className="mb-3 text-muted-foreground" size={20} />
            <div className="font-mono text-[32px] md:text-[48px] font-bold text-accent tracking-[-0.01em] leading-none">
              7
            </div>
            <div className="mt-2 text-sm text-muted">Tunnel endpoints</div>
            <div className="mt-1 text-xs text-muted-foreground font-mono">
              Cloudflare · zero-trust
            </div>
          </div>

          {/* Right — endpoint nodes */}
          <div className="flex flex-col gap-1.5 self-center w-full sm:w-auto sm:min-w-[140px]">
            {ENDPOINTS.map((ep, i) => (
              <motion.div
                key={ep.name}
                className="flex items-center gap-2 group/ep"
                initial={{ opacity: 0, x: 8 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 8 }}
                transition={{ duration: 0.4, delay: 0.08 * i }}
              >
                {/* Pulsing online dot */}
                <span className="relative flex h-2 w-2 shrink-0">
                  <motion.span
                    className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60"
                    animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
                    transition={{
                      duration: 2.2,
                      delay: i * 0.18,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>

                {/* Label */}
                <span className="text-[11px] font-mono text-muted-foreground group-hover/ep:text-muted transition-colors leading-none">
                  {ep.name}
                  <span className="hidden sm:inline text-muted-foreground/50"> · {ep.label}</span>
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
