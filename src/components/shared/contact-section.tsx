'use client';

import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { Mail, Github, Linkedin } from 'lucide-react';
import { SOCIAL_LINKS } from '@/lib/constants';

export function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.section
      id="contact"
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6 }}
      className="py-16 md:py-[64px] px-4 border-t border-border"
    >
      <div className="max-w-[1200px] mx-auto">
        <h2 className="text-foreground text-xl md:text-[24px] font-bold leading-[1.2]">
          Let&apos;s build something
        </h2>
        <p className="text-muted text-base mt-4 max-w-[65ch]">
          Whether you need AI-powered infrastructure, a modern web rebuild, or just want to talk shop — I&apos;m one message away.
        </p>
        <div className="flex flex-wrap items-center gap-4 mt-8">
          <a
            href={SOCIAL_LINKS.email}
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-accent-foreground px-6 py-3 rounded-lg font-semibold transition-colors duration-150"
          >
            <Mail size={18} />
            Send a message
          </a>
          <a
            href={SOCIAL_LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="inline-flex items-center gap-2 text-muted hover:text-foreground transition-colors duration-150"
          >
            <Github size={20} />
          </a>
          <a
            href={SOCIAL_LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="inline-flex items-center gap-2 text-muted hover:text-foreground transition-colors duration-150"
          >
            <Linkedin size={20} />
          </a>
        </div>
        <p className="text-muted-foreground text-sm mt-4">
          Or email directly: <a href={SOCIAL_LINKS.email} className="text-muted hover:text-accent transition-colors duration-200">eli@hermos.dev</a>
        </p>
      </div>
    </motion.section>
  );
}
