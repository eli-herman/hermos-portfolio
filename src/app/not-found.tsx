'use client';

import Link from 'next/link';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { Globe } from '@/components/ui/globe';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' as const } },
};

const globeVariants = {
  hidden: { scale: 0.85, opacity: 0, y: 10 },
  visible: {
    scale: 1,
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: 'easeOut' as const },
  },
  floating: {
    y: [-5, 5],
    transition: {
      duration: 5,
      ease: 'easeInOut' as const,
      repeat: Infinity,
      repeatType: 'reverse' as const,
    },
  },
};

const goldText =
  'bg-gradient-to-r from-[#B8790E] via-[#EABD70] to-[#B8790E] bg-clip-text text-transparent';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <AnimatePresence mode="wait">
        <motion.div
          className="flex flex-col items-center"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={fadeUp}
        >
          {/* 4 [Globe] 4 */}
          <div className="flex items-center justify-center gap-4 md:gap-8 mb-10">
            <motion.span
              className={`text-7xl md:text-8xl font-bold select-none ${goldText}`}
              variants={fadeUp}
            >
              4
            </motion.span>

            <motion.div
              className="w-24 h-24 md:w-32 md:h-32"
              variants={globeVariants}
              animate={['visible', 'floating']}
            >
              <Globe />
            </motion.div>

            <motion.span
              className={`text-7xl md:text-8xl font-bold select-none ${goldText}`}
              variants={fadeUp}
            >
              4
            </motion.span>
          </div>

          {/* Heading */}
          <motion.h1
            className="text-foreground text-3xl md:text-4xl font-bold tracking-tight mb-4"
            variants={fadeUp}
          >
            Oops! Lost in space.
          </motion.h1>

          {/* Subtext */}
          <motion.p
            className="text-muted text-base max-w-[40ch] mb-10"
            variants={fadeUp}
          >
            This page doesn&apos;t exist. Maybe it moved, maybe it never did.
          </motion.p>

          {/* CTA */}
          <motion.div variants={fadeUp}>
            <Link
              href="/"
              style={{ boxShadow: '0 6px 0 0 #7E4F10' }}
              className="inline-flex items-center gap-2 justify-center rounded-xl min-h-[48px] px-8 text-sm font-semibold text-[#0A0A0A] bg-gradient-to-r from-[#B8790E] via-[#EABD70] to-[#B8790E] hover:from-[#D4921A] hover:via-[#EABD70] hover:to-[#D4921A] transition-all select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <ArrowLeft className="w-4 h-4" />
              Back home
            </Link>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
