import type { Metadata } from 'next';
import { Github, Linkedin } from 'lucide-react';
import { ContactForm } from '@/components/contact/contact-form';
import { SOCIAL_LINKS } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Contact — Eli Herman',
  description: 'Get in touch to discuss AI infrastructure, automation, or a project.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-28 pb-20 px-4">
      <div className="max-w-[640px] mx-auto">
        <h1 className="text-foreground text-3xl md:text-4xl font-bold tracking-tight">
          Let&apos;s build something
        </h1>
        <p className="text-muted text-base mt-4 max-w-[55ch]">
          Whether you need AI-powered infrastructure, a modern web rebuild, or just want to
          talk shop — I&apos;m one message away.
        </p>

        <div className="mt-10">
          <ContactForm />
        </div>

        <div className="mt-12 pt-8 border-t border-[#1e1e1e] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <a
            href={SOCIAL_LINKS.email}
            className="text-sm text-muted hover:text-accent transition-colors"
          >
            hermos.dev@gmail.com
          </a>
          <div className="flex gap-5">
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
        </div>
      </div>
    </div>
  );
}
