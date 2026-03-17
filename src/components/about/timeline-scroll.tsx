'use client';

import { Timeline } from '@/components/ui/timeline';
import { TIMELINE_ENTRIES } from '@/lib/constants';
import { TechTag } from '@/components/shared/tech-tag';
import { SectionHeading } from '@/components/shared/section-heading';
import { ExternalLink } from 'lucide-react';

function TimelineEntryContent({
  entry,
}: {
  entry: (typeof TIMELINE_ENTRIES)[number];
}) {
  const isActive = entry.date === 'Active' || entry.date === 'Next';

  return (
    <div>
      <span
        className={`font-mono text-sm ${isActive ? 'text-accent' : 'text-muted-foreground'}`}
      >
        {entry.date}
      </span>
      <p className="text-muted text-base mt-2 leading-[1.6] max-w-[65ch]">
        {entry.description}
      </p>
      {entry.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {entry.tags.map((tag) => (
            <TechTag key={tag} label={tag} />
          ))}
        </div>
      )}
      {'link' in entry && entry.link && (
        <a
          href={entry.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:text-accent-hover text-sm flex items-center gap-1 mt-3 transition-colors duration-150"
        >
          View live
          <ExternalLink size={14} />
        </a>
      )}
    </div>
  );
}

export function TimelineScroll() {
  const timelineData = TIMELINE_ENTRIES.map((entry) => ({
    title: entry.title,
    content: <TimelineEntryContent entry={entry} />,
  }));

  return (
    <section className="pb-16">
      <div className="max-w-[800px] mx-auto px-4 mb-8">
        <SectionHeading title="The journey" />
      </div>
      <Timeline data={timelineData} />
    </section>
  );
}
