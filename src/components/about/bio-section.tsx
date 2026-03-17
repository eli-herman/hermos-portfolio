'use client';

import { motion } from 'motion/react';

export function BioSection() {
  return (
    <section className="max-w-[800px] mx-auto px-4 pt-24 md:pt-[96px] pb-16">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-foreground text-[32px] md:text-[48px] font-bold tracking-[-0.02em] leading-[1.1]">
          About
        </h1>
        <p className="text-foreground text-lg md:text-xl mt-6 font-semibold">
          Baylor MIS student. Building AI infrastructure that ships.
        </p>
        <div className="mt-4 max-w-[65ch] space-y-4">
          <p className="text-muted text-base leading-[1.6]">
            I&apos;m a Management Information Systems student at Baylor
            University, graduating in 2027. While most students are learning to
            use tools, I&apos;m building the tools themselves.
          </p>
          <p className="text-muted text-base leading-[1.6]">
            Hermos is my flagship project &mdash; a two-device AI development
            platform that connects local language models, vector databases,
            automation pipelines, and agent orchestration into a single system.
            It gives one person the output of an engineering team.
          </p>
          <p className="text-muted text-base leading-[1.6]">
            I also build The Vine, a React Native family genealogy app, and
            I&apos;m starting to offer AI infrastructure consulting to
            businesses that want modern, fast delivery without the agency
            overhead.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
