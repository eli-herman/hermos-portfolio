'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import {
  Terminal,
  Search,
  Zap,
  Activity,
  Database,
  Workflow,
  Shield,
  Cpu,
} from 'lucide-react';

const DEMO_CAPABILITIES = [
  {
    title: 'Agent Runs',
    subtitle:
      'Claude agents executing multi-step tasks with full MCP tool access. 27 tools per session, routing between local and remote models automatically.',
    icon: Terminal,
    stat: '27 tools',
  },
  {
    title: 'KB Queries',
    subtitle:
      'Semantic search across 13,659 indexed documents in 6 knowledge domains. ChromaDB vector store with automatic domain routing.',
    icon: Search,
    stat: '13,659 docs',
  },
  {
    title: 'Workflow Triggers',
    subtitle:
      '29 n8n automation workflows across 9 prefixes. Health monitoring, memory sync, backup, and CI/CD — all self-healing.',
    icon: Zap,
    stat: '29 workflows',
  },
  {
    title: 'System Health',
    subtitle:
      'Real-time monitoring via Datadog with GPU metrics. Auto-remediation workflows detect failures and self-heal without intervention.',
    icon: Activity,
    stat: '24/7',
  },
];

const DEMO_LOG_LINES = [
  { time: '14:32:01', label: 'agent', message: 'Task started: review PR #47', color: 'text-accent' },
  { time: '14:32:02', label: 'router', message: 'Routing to Windows 14b (quality tier)', color: 'text-muted' },
  { time: '14:32:03', label: 'kb', message: 'Searching hermos collection (3 results)', color: 'text-success' },
  { time: '14:32:05', label: 'tool', message: 'local_review_code executed (412 tokens)', color: 'text-warning' },
  { time: '14:32:08', label: 'agent', message: 'Review complete: 2 suggestions, 0 blockers', color: 'text-accent' },
  { time: '14:32:09', label: 'n8n', message: 'SVC: Slack notification sent', color: 'text-muted' },
];

const INFRA_STATS = [
  { icon: Database, label: 'ChromaDB', value: '6 collections' },
  { icon: Workflow, label: 'n8n', value: '29 workflows' },
  { icon: Shield, label: 'Security', value: 'STRIDE audited' },
  { icon: Cpu, label: 'Local AI', value: '14B params' },
];

export function CommandCenterDemo() {
  const [activeTab, setActiveTab] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="py-16 md:py-[64px] px-4">
      <div className="max-w-[1200px] mx-auto">
        {/* Section header */}
        <h2 className="text-foreground text-[24px] md:text-[32px] font-bold tracking-[-0.02em]">
          Command Center
        </h2>
        <p className="text-muted text-base mt-2 max-w-[65ch]">
          A live look at what Hermos does. Agents, knowledge, workflows, and monitoring — orchestrated from a single terminal.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mt-10">
          {/* Main demo panel — terminal simulation */}
          <div className="lg:col-span-2 bg-card border border-border rounded-lg overflow-hidden">
            {/* Terminal header */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-secondary/50">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-destructive/60" />
                <div className="w-3 h-3 rounded-full bg-warning/60" />
                <div className="w-3 h-3 rounded-full bg-success/60" />
              </div>
              <span className="text-muted-foreground text-xs font-mono ml-2">
                hermos-agent ~ session
              </span>
            </div>

            {/* Terminal body */}
            <div className="p-4 font-mono text-sm min-h-[300px]">
              <AnimatePresence mode="wait">
                {DEMO_LOG_LINES.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: prefersReducedMotion ? 0 : 0.3,
                      delay: prefersReducedMotion ? 0 : i * 0.15,
                    }}
                    className="flex gap-3 py-1"
                  >
                    <span className="text-muted-foreground shrink-0">{line.time}</span>
                    <span className={`shrink-0 w-16 ${line.color}`}>[{line.label}]</span>
                    <span className="text-foreground/80">{line.message}</span>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Blinking cursor */}
              <div className="flex items-center gap-1 mt-3">
                <span className="text-accent">$</span>
                <motion.span
                  className="w-2 h-4 bg-accent inline-block"
                  animate={prefersReducedMotion ? {} : { opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
                />
              </div>
            </div>
          </div>

          {/* Capability cards — right column */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
            {DEMO_CAPABILITIES.map((cap, i) => {
              const Icon = cap.icon;
              const isActive = activeTab === i;
              return (
                <button
                  key={cap.title}
                  onClick={() => setActiveTab(i)}
                  className={`text-left border rounded-lg p-4 transition-all duration-150 ${
                    isActive
                      ? 'bg-accent-subtle border-accent/30'
                      : 'bg-card border-border hover:bg-card-hover'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`h-4 w-4 shrink-0 ${isActive ? 'text-accent' : 'text-muted'}`} />
                    <span className={`text-sm font-medium ${isActive ? 'text-foreground' : 'text-muted'}`}>
                      {cap.title}
                    </span>
                    <span className="ml-auto text-xs font-mono text-muted-foreground">
                      {cap.stat}
                    </span>
                  </div>
                  <AnimatePresence>
                    {isActive && (
                      <motion.p
                        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
                        transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
                        className="text-xs text-muted mt-2 leading-relaxed"
                      >
                        {cap.subtitle}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </button>
              );
            })}
          </div>
        </div>

        {/* Infrastructure stats bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
          {INFRA_STATS.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="flex items-center gap-3 p-3 bg-card border border-border rounded-lg"
              >
                <Icon className="h-4 w-4 text-muted-foreground shrink-0" />
                <div>
                  <div className="text-sm font-medium text-foreground">{stat.label}</div>
                  <div className="text-xs text-muted-foreground">{stat.value}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
