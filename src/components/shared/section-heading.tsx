'use client';

import { motion } from 'motion/react';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
}

export function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-foreground text-xl md:text-[24px] font-bold leading-[1.2]">
        {title}
      </h2>
      {subtitle && (
        <p className="text-muted text-base mt-2">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
