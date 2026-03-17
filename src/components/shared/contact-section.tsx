'use client';

import { motion, useReducedMotion } from 'motion/react';
import { Github, Linkedin } from 'lucide-react';
import { SOCIAL_LINKS } from '@/lib/constants';
import { Button3D } from '@/components/ui/button-3d';

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

      <div className="mt-8 flex justify-center">
        <Button3D href={SOCIAL_LINKS.email}>
          Let&apos;s talk
        </Button3D>
      </div>

      <p className="text-muted-foreground text-sm mt-4">
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
