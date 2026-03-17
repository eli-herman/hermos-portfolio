'use client';

import { useRef } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { useElasticLineEvents } from '@/hooks/use-elastic-line-events';

export function ElasticDivider() {
  const svgRef = useRef<SVGSVGElement>(null!);
  const prefersReducedMotion = useReducedMotion();

  const { isGrabbed, controlPoint } = useElasticLineEvents(
    svgRef,
    false, // horizontal line
    30,    // grab threshold
    80     // release threshold
  );

  if (prefersReducedMotion) {
    return (
      <div className="w-full max-w-[1200px] mx-auto px-4">
        <div className="h-px bg-border" />
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4">
      <svg
        ref={svgRef}
        className="w-full h-12 cursor-crosshair"
        viewBox="0 0 1200 48"
        preserveAspectRatio="none"
      >
        <motion.path
          d={
            isGrabbed
              ? `M 0 24 Q ${controlPoint.x} ${controlPoint.y} 1200 24`
              : `M 0 24 Q 600 24 1200 24`
          }
          stroke="var(--border)"
          strokeWidth="1"
          fill="none"
          animate={{
            d: isGrabbed
              ? `M 0 24 Q ${controlPoint.x} ${controlPoint.y} 1200 24`
              : `M 0 24 Q 600 24 1200 24`,
          }}
          transition={{
            type: 'spring',
            stiffness: isGrabbed ? 200 : 400,
            damping: isGrabbed ? 20 : 30,
            mass: 0.5,
          }}
        />
        {/* Subtle accent glow when grabbed */}
        {isGrabbed && (
          <motion.path
            d={`M 0 24 Q ${controlPoint.x} ${controlPoint.y} 1200 24`}
            stroke="var(--accent)"
            strokeWidth="1"
            strokeOpacity="0.3"
            fill="none"
            initial={{ strokeOpacity: 0 }}
            animate={{ strokeOpacity: 0.3 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </svg>
    </div>
  );
}
