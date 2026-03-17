'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { SKILLS, SKILL_DESCRIPTIONS } from '@/lib/constants';
import { PopoverTag } from '@/components/shared/popover-tag';

function SkillCategory({
  category,
  items,
  delay,
  colIndex,
}: {
  category: string;
  items: readonly string[];
  delay: number;
  colIndex: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '0px 0px -60px 0px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.5, delay }}
    >
      <h4 className="text-foreground text-lg font-semibold mb-3">{category}</h4>
      <div className="flex flex-wrap gap-2">
        {items.map((item, i) => (
          <motion.div
            key={item}
            initial={{ opacity: 0, y: 6 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
            transition={{ duration: 0.25, delay: delay + 0.08 + i * 0.04 }}
          >
            <PopoverTag
              label={item}
              description={SKILL_DESCRIPTIONS[item] ?? item}
              placement={colIndex % 3 === 0 ? 'left' : colIndex % 3 === 2 ? 'right' : 'center'}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export function StackList() {
  return (
    <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {SKILLS.map((category, i) => (
        <SkillCategory
          key={category.category}
          category={category.category}
          items={category.items}
          delay={i * 0.08}
          colIndex={i}
        />
      ))}
    </div>
  );
}
