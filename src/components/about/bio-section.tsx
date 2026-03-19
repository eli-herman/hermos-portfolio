'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import { FloatingBento } from '@/components/ui/floating-bento';

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

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-6"
        >
          {/* Glowing border wrapper */}
          <div className="bio-card-wrap">
            <div className="rounded-xl bg-card p-6 md:p-8 flex flex-col md:flex-row md:items-start gap-8">
              {/* Text */}
              <div className="flex-1 min-w-0">
                <p className="text-foreground text-lg md:text-xl font-semibold">
                  Baylor MIS student. Building AI infrastructure that ships.
                </p>
                <div className="mt-4 space-y-4">
                  <p className="text-muted text-base leading-[1.6]">
                    I spent my first two years at Baylor unsure of what I
                    wanted. I found MIS after finishing gen eds &mdash;
                    technology and business in the same discipline &mdash; and
                    it immediately made sense. Once I got into the actual
                    classes, that was it.
                  </p>
                  <p className="text-muted text-base leading-[1.6]">
                    Hermos started as infrastructure for my own work. Now
                    it&apos;s the most complex thing I&apos;ve built, and
                    I&apos;m both the developer and the project manager &mdash;
                    which has taught me more than anything else. I&apos;m
                    starting to extend that to other businesses, and eventually
                    I want to share how I think about building with these tools.
                  </p>
                </div>
              </div>

              {/* Photo with tilt-on-hover */}
              <div className="flex-shrink-0 mx-auto md:mx-0">
                <FloatingBento maxRotation={8}>
                  <div className="rounded-xl overflow-hidden ring-2 ring-accent/40 shadow-[0_0_24px_4px_rgba(212,146,26,0.2)] w-[160px] md:w-[180px]">
                    <Image
                      src="/eli-herman.png"
                      alt="Eli Herman"
                      width={180}
                      height={240}
                      className="object-cover w-full h-full"
                      priority
                    />
                  </div>
                </FloatingBento>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
