'use client';

import { motion, useReducedMotion } from 'motion/react';
import { Mail, Github, Linkedin } from 'lucide-react';
import { SOCIAL_LINKS } from '@/lib/constants';

export function ContactSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.section
      id="contact"
      initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
      className="max-w-[800px] mx-auto px-4 py-16 md:py-[64px] text-center"
    >
      <h2 className="text-foreground text-2xl md:text-[24px] font-bold">
        Let&apos;s build something
      </h2>

      <p className="text-muted text-base mt-4 max-w-[65ch] mx-auto">
        Whether you need AI-powered infrastructure, a modern web rebuild, or
        just want to talk shop -- I&apos;m one message away.
      </p>

      <a
        href={SOCIAL_LINKS.email}
        className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-foreground text-sm font-medium min-h-[44px] px-6 rounded-lg mt-8 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <Mail className="h-4 w-4" />
        Send a message
      </a>

      <p className="text-muted-foreground text-sm mt-4">
        Or email directly:{' '}
        <a
          href={SOCIAL_LINKS.email}
          className="text-muted hover:text-accent transition-colors duration-200"
        >
          eli@hermos.dev
        </a>
      </p>

      <div className="flex justify-center gap-6 mt-8">
        <a
          href={SOCIAL_LINKS.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="text-muted hover:text-foreground transition-colors"
        >
          <Github className="h-5 w-5" />
        </a>
        <a
          href={SOCIAL_LINKS.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="text-muted hover:text-foreground transition-colors"
        >
          <Linkedin className="h-5 w-5" />
        </a>
      </div>
    </motion.section>
  );
}
