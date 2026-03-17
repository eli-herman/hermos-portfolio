'use client';

import {
  IconBrandTypescript,
  IconBrandPython,
  IconBrandJavascript,
  IconBrandReactNative,
  IconBrandNextjs,
  IconBrandDocker,
  IconBrandCloudflare,
  IconBrandGithub,
  IconBrandNodejs,
  IconBrandTailwind,
  IconBrandVercel,
  IconBrandFirebase,
} from '@tabler/icons-react';
import { Database, Cpu, Network, Activity, Shield, Workflow } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

type MarqueeItem = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: React.ComponentType<any>;
  label: string;
  color: string;
  description: string;
};

const ROW_ONE: MarqueeItem[] = [
  {
    icon: IconBrandTypescript,
    label: 'TypeScript',
    color: '#3178C6',
    description: 'Primary language across all Hermos infrastructure, MCP server, and this portfolio.',
  },
  {
    icon: IconBrandPython,
    label: 'Python',
    color: '#4B8BBE',
    description: 'Automation scripts, mem0 server, data pipelines, and AI tool integrations.',
  },
  {
    icon: IconBrandJavascript,
    label: 'JavaScript',
    color: '#F7DF1E',
    description: 'n8n workflow logic, Windows service wrappers, and utility scripts.',
  },
  {
    icon: IconBrandReactNative,
    label: 'React Native',
    color: '#61DAFB',
    description: 'UI layer for The Vine — family genealogy app built with Expo.',
  },
  {
    icon: IconBrandNextjs,
    label: 'Next.js',
    color: '#ffffff',
    description: 'Framework powering this portfolio — App Router with full static generation.',
  },
  {
    icon: IconBrandDocker,
    label: 'Docker',
    color: '#2496ED',
    description: 'Container runtime for ChromaDB, Quality Server, and Caddy on the home server.',
  },
  {
    icon: IconBrandCloudflare,
    label: 'Cloudflare',
    color: '#F6821F',
    description: 'Zero-trust tunnel exposing 7 services publicly — no port forwarding, any network.',
  },
  {
    icon: IconBrandGithub,
    label: 'GitHub',
    color: '#ffffff',
    description: 'CI/CD with Actions — automated builds, security scans, and Vercel deployments.',
  },
  {
    icon: Workflow,
    label: 'n8n',
    color: '#EA4B71',
    description: '29 automation workflows: memory sync, GitHub backups, health monitoring, alerts.',
  },
];

const ROW_TWO: MarqueeItem[] = [
  {
    icon: IconBrandNodejs,
    label: 'Node.js',
    color: '#339933',
    description: 'Runtime backing the Quality Server and MCP bridge — production-grade request handling.',
  },
  {
    icon: IconBrandTailwind,
    label: 'NativeWind',
    color: '#06B6D4',
    description: 'Tailwind CSS for React Native. Design tokens and spacing system for The Vine.',
  },
  {
    icon: IconBrandVercel,
    label: 'Vercel',
    color: '#ffffff',
    description: 'Hosts this portfolio — instant deploys on every git push via GitHub integration.',
  },
  {
    icon: IconBrandFirebase,
    label: 'Firebase',
    color: '#FFCA28',
    description: 'Backend for The Vine app — realtime database, auth, and cloud functions.',
  },
  {
    icon: Database,
    label: 'ChromaDB',
    color: '#8B5CF6',
    description: 'Vector database storing 13,659 documents across 6 knowledge domains.',
  },
  {
    icon: Cpu,
    label: 'Ollama',
    color: '#6366F1',
    description: 'Local LLM runtime — 7B on Mac, 14B on Windows GPU. Powers code generation and review.',
  },
  {
    icon: Network,
    label: 'MCP Protocol',
    color: '#10B981',
    description: '27 custom tools bridging Claude Code to local models, ChromaDB, n8n, and vision APIs.',
  },
  {
    icon: Activity,
    label: 'Datadog',
    color: '#632CA6',
    description: 'Infrastructure monitoring with GPU metrics, process tracking, and custom dashboards.',
  },
  {
    icon: Shield,
    label: 'Semgrep',
    color: '#EF4444',
    description: 'Static analysis with custom rules — part of the 9-phase security assessment.',
  },
];

function MarqueeItem({ item }: { item: MarqueeItem }) {
  const Icon = item.icon;
  return (
    <Tooltip>
      <TooltipTrigger className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border bg-card/60 select-none shrink-0 cursor-default">
        <Icon size={17} color={item.color} strokeWidth={1.5} />
        <span className="text-sm font-medium text-muted whitespace-nowrap">{item.label}</span>
      </TooltipTrigger>
      <TooltipContent
        side="top"
        className="max-w-60 py-3 px-3.5 bg-card border border-border shadow-xl shadow-black/40 !text-foreground"
      >
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <Icon size={13} color={item.color} strokeWidth={1.5} />
            <p className="text-xs font-semibold font-mono !text-foreground">{item.label}</p>
          </div>
          <p className="text-xs !text-muted leading-relaxed">{item.description}</p>
        </div>
      </TooltipContent>
    </Tooltip>
  );
}

function MarqueeRow({ items, reverse = false }: { items: MarqueeItem[]; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div
        className={`flex gap-3 w-max ${
          reverse ? 'animate-marquee-right' : 'animate-marquee-left'
        } hover:[animation-play-state:paused]`}
      >
        {doubled.map((item, i) => (
          <MarqueeItem key={`${item.label}-${i}`} item={item} />
        ))}
      </div>
    </div>
  );
}

export function TechMarquee() {
  return (
    <div className="flex flex-col gap-3 py-1">
      <MarqueeRow items={ROW_ONE} />
      <MarqueeRow items={ROW_TWO} reverse />
    </div>
  );
}
