'use client';

import { useState, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';

interface PopoverTagProps {
  label: string;
  description: string;
  /** Which column this tag lives in — controls popover alignment to avoid viewport clipping */
  placement?: 'left' | 'center' | 'right';
}

export function PopoverTag({ label, description, placement = 'center' }: PopoverTagProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Horizontal position: align left for left-column tags, right for right-column, center otherwise
  const popoverPositionClass =
    placement === 'left'  ? 'left-0' :
    placement === 'right' ? 'right-0' :
    'left-1/2 -translate-x-1/2';

  // Arrow position follows the same logic
  const arrowPositionClass =
    placement === 'left'  ? 'left-4' :
    placement === 'right' ? 'right-4' :
    'left-1/2 -translate-x-1/2';

  return (
    <div
      ref={ref}
      className="relative inline-block"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      {/* The tag itself */}
      <span
        className="tech-tag cursor-default"
        tabIndex={0}
        role="button"
        aria-describedby={open ? `tip-${label}` : undefined}
      >
        {label}
      </span>

      {/* Popover */}
      <AnimatePresence>
        {open && (
          <motion.div
            id={`tip-${label}`}
            role="tooltip"
            initial={{ opacity: 0, y: 6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.97 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className={`absolute bottom-full mb-2 z-50 w-56 pointer-events-none ${popoverPositionClass}`}
          >
            {/* Arrow */}
            <div className={`absolute bottom-0 translate-y-full w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-[#262626] ${arrowPositionClass}`} />
            {/* Content */}
            <div className="rounded-lg border border-border bg-card px-3 py-2.5 shadow-lg shadow-black/40">
              <p className="text-xs font-mono text-accent mb-1">{label}</p>
              <p className="text-xs text-muted leading-relaxed">{description}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
