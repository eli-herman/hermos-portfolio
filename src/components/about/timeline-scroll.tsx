'use client';

import { createContext, useContext, useEffect, useRef, useState, useMemo } from 'react';
import { Timeline } from '@/components/ui/timeline';
import { TIMELINE_ENTRIES } from '@/lib/constants';
import { TechTag } from '@/components/shared/tech-tag';
import { SectionHeading } from '@/components/shared/section-heading';
import { ExternalLink } from 'lucide-react';

const ActiveCtx = createContext(0);

function TimelineEntryContent({
  entry,
  index,
  onSentinelRef,
}: {
  entry: (typeof TIMELINE_ENTRIES)[number];
  index: number;
  onSentinelRef: (el: HTMLDivElement | null) => void;
}) {
  const activeIndex = useContext(ActiveCtx);
  const isActive = index === activeIndex;
  const isHighlighted = entry.date === 'Active' || entry.date === 'Next';

  return (
    <div className="relative">
      {/* Invisible sentinel for proximity detection */}
      <div
        ref={onSentinelRef}
        className="absolute -top-2 w-0 h-0 pointer-events-none"
        aria-hidden="true"
      />

      <span
        className={`font-mono text-sm transition-colors duration-300 ${
          isActive || isHighlighted ? 'text-accent' : 'text-muted-foreground'
        }`}
      >
        {entry.date}
      </span>

      {/* Collapsed one-line preview — hidden when active */}
      <div
        className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${
          isActive ? 'max-h-0 opacity-0' : 'max-h-10 opacity-100'
        }`}
      >
        <p className="text-muted/50 text-sm mt-1 line-clamp-1 max-w-[65ch]">
          {entry.description}
        </p>
      </div>

      {/* Expanded content — animates open */}
      <div
        className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.6,0.6,0,1)] ${
          isActive ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
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
      </div>
    </div>
  );
}

export function TimelineScroll() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sentinelRefs = useRef<(HTMLDivElement | null)[]>(
    Array.from({ length: TIMELINE_ENTRIES.length }, () => null)
  );

  useEffect(() => {
    let ticking = false;

    function update() {
      const center = window.innerHeight * 0.35;
      let bestIdx = 0;
      let bestDist = Infinity;
      sentinelRefs.current.forEach((el, i) => {
        if (!el) return;
        const dist = Math.abs(el.getBoundingClientRect().top - center);
        if (dist < bestDist) {
          bestDist = dist;
          bestIdx = i;
        }
      });
      setActiveIndex(bestIdx);
      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    const t = setTimeout(update, 80);
    return () => {
      window.removeEventListener('scroll', onScroll);
      clearTimeout(t);
    };
  }, []);

  // Memoized once — TimelineEntryContent re-renders via ActiveCtx, not prop changes
  const timelineData = useMemo(
    () =>
      TIMELINE_ENTRIES.map((entry, index) => ({
        title: entry.title,
        content: (
          <TimelineEntryContent
            entry={entry}
            index={index}
            onSentinelRef={(el) => {
              sentinelRefs.current[index] = el;
            }}
          />
        ),
      })),
    []
  );

  return (
    <ActiveCtx.Provider value={activeIndex}>
      <section className="pb-16">
        <div className="max-w-[800px] mx-auto px-4 mb-8">
          <SectionHeading title="The journey" />
        </div>
        <Timeline data={timelineData} />
      </section>
    </ActiveCtx.Provider>
  );
}
