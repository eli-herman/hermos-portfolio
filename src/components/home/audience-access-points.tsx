'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';
import { Github, Linkedin } from 'lucide-react';
import { SOCIAL_LINKS } from '@/lib/constants';

const accessPoints = [
  {
    label: "Let's talk",
    href: '/contact',
    variant: 'accent' as const,
    icon: null,
    external: false,
  },
  {
    label: 'GitHub',
    href: SOCIAL_LINKS.github,
    variant: 'outline' as const,
    icon: Github,
    external: true,
  },
  {
    label: 'LinkedIn',
    href: SOCIAL_LINKS.linkedin,
    variant: 'outline' as const,
    icon: Linkedin,
    external: true,
  },
  {
    label: 'See my work',
    href: '/hermos',
    variant: 'outline' as const,
    icon: null,
    external: false,
  },
];

export function AudienceAccessPoints() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="max-w-[1200px] mx-auto px-4 py-8">
      <motion.div
        className="flex flex-wrap justify-center gap-4"
        initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
      >
        {accessPoints.map((item) => {
          const Icon = item.icon;
          const isExternal = item.external;

          return (
            <Link
              key={item.label}
              href={item.href}
              {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className={`inline-flex items-center justify-center gap-2 rounded-lg text-sm font-medium min-h-[44px] px-5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                item.variant === 'accent'
                  ? 'bg-accent hover:bg-accent-hover text-foreground'
                  : 'border border-border bg-transparent text-foreground hover:bg-card'
              }`}
            >
              {Icon && <Icon className="h-4 w-4" />}
              {item.label}
            </Link>
          );
        })}
      </motion.div>
    </section>
  );
}
