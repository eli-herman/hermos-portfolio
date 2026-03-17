'use client';

import { useRef } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';
import { useMouseVector } from '@/hooks/use-mouse-vector';

const LogoParticles = dynamic(() => import('@/components/ui/logo-particles'), {
  ssr: false,
});

const ParticleTextCanvas = dynamic(() => import('@/components/ui/particle-text-canvas'), {
  ssr: false,
});

export function HeroSection() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { position } = useMouseVector(sectionRef);

  // Normalize mouse position to [-1, 1] range for parallax
  const parallaxX = typeof window !== 'undefined'
    ? ((position.x / window.innerWidth) * 2 - 1) * 12
    : 0;
  const parallaxY = typeof window !== 'undefined'
    ? ((position.y / window.innerHeight) * 2 - 1) * 8
    : 0;

  const duration = prefersReducedMotion ? 0 : 0.6;
  const fadeUp = (delay: number) => ({
    initial: prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration, delay: prefersReducedMotion ? 0 : delay },
  });

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center">
      {/* Background gradient */}
      <div className="hero-gradient absolute inset-0 z-0" aria-hidden="true" />
      {/* Radial glow — parallax on mouse */}
      <div
        className="hero-glow absolute inset-0 z-0 transition-transform duration-300 ease-out"
        style={
          prefersReducedMotion
            ? undefined
            : { transform: `translate(${parallaxX}px, ${parallaxY}px)` }
        }
        aria-hidden="true"
      />
      {/* Particle initials background */}
      {!prefersReducedMotion && (
        <div className="absolute inset-0 z-[1] opacity-20 pointer-events-none" aria-hidden="true">
          <LogoParticles text="EH" particleCount={2000} fontSize={280} mobileFontSize={140} />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 max-w-[800px] text-center px-4 py-24 md:py-[96px]">
        {/* Particle text heading — visual layer */}
        <motion.div className="relative" {...fadeUp(0)}>
          {!prefersReducedMotion ? (
            <div className="relative h-[48px] md:h-[64px]">
              <div className="absolute inset-0">
                <ParticleTextCanvas
                  text="The future, on demand."
                  fontSize={48}
                  mobileFontSize={32}
                  particleSize={1.2}
                  particleGap={2}
                  mouseRadius={100}
                />
              </div>
              {/* Accessible h1 — visible only to screen readers when particle text is active */}
              <h1 className="sr-only">The future, on demand.</h1>
            </div>
          ) : (
            <h1 className="text-foreground text-[32px] md:text-[48px] font-bold leading-[1.1] tracking-[-0.02em]">
              The future, on demand.
            </h1>
          )}
        </motion.div>

        <motion.p
          className="text-muted text-base md:text-lg mt-6 max-w-[600px] mx-auto"
          {...fadeUp(0.1)}
        >
          I build AI infrastructure that gives one person the output of an
          engineering team. Then I build it for you.
        </motion.p>

        <motion.div
          className="flex gap-4 justify-center mt-8"
          {...fadeUp(0.2)}
        >
          <Link
            href="#contact"
            className="inline-flex items-center justify-center rounded-lg bg-accent hover:bg-accent-hover text-foreground text-sm font-medium min-h-[44px] px-6 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Let&apos;s talk
          </Link>
          <Link
            href="/hermos"
            className="inline-flex items-center justify-center rounded-lg border border-border bg-transparent text-foreground hover:bg-card text-sm font-medium min-h-[44px] px-6 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            See my work
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
