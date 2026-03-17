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

type MarqueeItem = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: React.ComponentType<any>;
  label: string;
  color: string;
};

const ROW_ONE: MarqueeItem[] = [
  { icon: IconBrandTypescript,  label: 'TypeScript',   color: '#3178C6' },
  { icon: IconBrandPython,      label: 'Python',        color: '#4B8BBE' },
  { icon: IconBrandJavascript,  label: 'JavaScript',    color: '#F7DF1E' },
  { icon: IconBrandReactNative, label: 'React Native',  color: '#61DAFB' },
  { icon: IconBrandNextjs,      label: 'Next.js',       color: '#ffffff' },
  { icon: IconBrandDocker,      label: 'Docker',        color: '#2496ED' },
  { icon: IconBrandCloudflare,  label: 'Cloudflare',    color: '#F6821F' },
  { icon: IconBrandGithub,      label: 'GitHub',        color: '#ffffff' },
  { icon: Workflow,             label: 'n8n',           color: '#EA4B71' },
];

const ROW_TWO: MarqueeItem[] = [
  { icon: IconBrandNodejs,  label: 'Node.js',       color: '#339933' },
  { icon: IconBrandTailwind, label: 'NativeWind',   color: '#06B6D4' },
  { icon: IconBrandVercel,  label: 'Vercel',         color: '#ffffff' },
  { icon: IconBrandFirebase, label: 'Firebase',      color: '#FFCA28' },
  { icon: Database,         label: 'ChromaDB',       color: '#8B5CF6' },
  { icon: Cpu,              label: 'Ollama',         color: '#6366F1' },
  { icon: Network,          label: 'MCP Protocol',   color: '#10B981' },
  { icon: Activity,         label: 'Datadog',        color: '#632CA6' },
  { icon: Shield,           label: 'Semgrep',        color: '#EF4444' },
];

function MarqueeRow({ items, reverse = false }: { items: MarqueeItem[]; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div
        className={`flex gap-3 w-max ${
          reverse ? 'animate-marquee-right' : 'animate-marquee-left'
        } hover:[animation-play-state:paused]`}
      >
        {doubled.map((item, i) => {
          const Icon = item.icon;
          return (
            <div
              key={i}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border bg-card/60 select-none shrink-0"
            >
              <Icon size={17} color={item.color} strokeWidth={1.5} />
              <span className="text-sm font-medium text-muted whitespace-nowrap">{item.label}</span>
            </div>
          );
        })}
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
