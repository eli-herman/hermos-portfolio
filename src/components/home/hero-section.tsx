'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';
import { MagneticButton } from '@/components/ui/magnetic-button';
import { BackgroundGradientAnimation } from './background-gradient-animation';
import { WingsCanvas } from './wings-canvas';

const PHRASES = [
  'The future, on demand.',
  'AI infrastructure, built for one.',
  'Ship in days. Not months.',
];

function TypewriterHeading({ reduced }: { reduced: boolean | null }) {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduced) {
      setText(PHRASES[0]);
      return;
    }
    const phrase = PHRASES[idx];
    if (!deleting && text === phrase) {
      const t = setTimeout(() => setDeleting(true), 2400);
      return () => clearTimeout(t);
    }
    if (deleting && text === '') {
      setDeleting(false);
      setIdx((i) => (i + 1) % PHRASES.length);
      return;
    }
    const speed = deleting ? 32 : 95;
    const t = setTimeout(() => {
      setText(deleting ? phrase.slice(0, text.length - 1) : phrase.slice(0, text.length + 1));
    }, speed);
    return () => clearTimeout(t);
  }, [text, deleting, idx, reduced]);

  return (
    <h1 className="text-[32px] md:text-[56px] font-bold leading-[1.1] tracking-[-0.03em] text-transparent bg-clip-text bg-gradient-to-br from-foreground via-[#EABD70] to-accent min-h-[1.2em] drop-shadow-[0_2px_16px_rgba(8,13,26,0.9)]">
      {text}
      {!reduced && <span className="text-accent animate-pulse ml-0.5">|</span>}
    </h1>
  );
}

export function HeroSection() {
  const prefersReducedMotion = useReducedMotion();

  const duration = prefersReducedMotion ? 0 : 0.6;
  const fadeUp = (delay: number) => ({
    initial: prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration, delay: prefersReducedMotion ? 0 : delay },
  });

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        {!prefersReducedMotion ? (
          <BackgroundGradientAnimation
            containerClassName="w-full h-full"
            gradientBackgroundStart="rgb(12, 16, 32)"
            gradientBackgroundEnd="rgb(8, 13, 26)"
            interactive={false}
            firstColor="232, 151, 26"
            secondColor="180, 110, 10"
            thirdColor="140, 80, 5"
            fourthColor="20, 15, 5"
            fifthColor="30, 20, 8"
            pointerColor="245, 180, 80"
          />
        ) : (
          <div className="hero-gradient w-full h-full" />
        )}
      </div>

      {/* Wings — particle canvas, true transparency, no JPEG */}
      <motion.div
        className="absolute inset-0 z-[1] pointer-events-none"
        aria-hidden="true"
        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, delay: 0.2 }}
      >
        <WingsCanvas />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-[800px] text-center px-4 pt-16 pb-24 md:pt-20 md:pb-[96px]">
        <motion.div {...fadeUp(0.1)}>
          <TypewriterHeading reduced={prefersReducedMotion} />
        </motion.div>

        <motion.p
          className="text-muted text-base md:text-lg mt-6 max-w-[600px] mx-auto"
          {...fadeUp(0.20)}
        >
          I build AI infrastructure that gives one person the output of an
          engineering team. Then I build it for you.
        </motion.p>

        <motion.div className="flex gap-3 justify-center mt-10" {...fadeUp(0.30)}>
          <MagneticButton>
            <Link
              href="#contact"
              className="inline-flex items-center justify-center rounded-full min-h-[48px] px-8 text-sm font-semibold text-[#0A0A0A] bg-gradient-to-r from-[#B8790E] via-[#EABD70] to-[#B8790E] hover:via-[#F0D080] transition-all duration-300 shadow-[0_0_24px_rgba(212,146,26,0.40)] hover:shadow-[0_0_36px_rgba(234,189,112,0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Let&apos;s talk
            </Link>
          </MagneticButton>

          <MagneticButton>
            <Link
              href="/hermos"
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 backdrop-blur-sm text-foreground hover:bg-white/10 hover:border-white/25 text-sm font-medium min-h-[48px] px-8 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              See my work
            </Link>
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
