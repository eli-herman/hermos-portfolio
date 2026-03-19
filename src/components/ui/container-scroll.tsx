'use client';

import React, { useRef } from 'react';
import { useScroll, useTransform, motion, type MotionValue } from 'motion/react';

export function ContainerScroll({
  titleComponent,
  children,
}: {
  titleComponent: React.ReactNode;
  children: React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const rotate = useTransform(scrollYProgress, [0, 1], [18, 0]);
  const scale  = useTransform(scrollYProgress, [0, 1], isMobile ? [0.8, 0.95] : [1.04, 1]);
  const translateY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <div
      ref={containerRef}
      className="h-[48rem] md:h-[60rem] flex items-center justify-center relative"
    >
      <div className="w-full relative" style={{ perspective: '1000px' }}>
        <ScrollHeader translate={translateY} titleComponent={titleComponent} />
        <ScrollCard rotate={rotate} scale={scale}>
          {children}
        </ScrollCard>
      </div>
    </div>
  );
}

function ScrollHeader({
  translate,
  titleComponent,
}: {
  translate: MotionValue<number>;
  titleComponent: React.ReactNode;
}) {
  return (
    <motion.div style={{ translateY: translate }} className="max-w-4xl mx-auto text-center mb-6">
      {titleComponent}
    </motion.div>
  );
}

function ScrollCard({
  rotate,
  scale,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      style={{ rotateX: rotate, scale }}
      className="max-w-5xl mx-auto w-full rounded-2xl border border-border bg-card overflow-hidden shadow-2xl"
    >
      {children}
    </motion.div>
  );
}
