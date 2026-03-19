import type { Metadata } from 'next';
import { Github, Linkedin, Mail, Clock } from 'lucide-react';
import { ContactForm } from '@/components/contact/contact-form';
import { SOCIAL_LINKS } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Contact — Eli Herman',
  description: 'Get in touch to discuss AI infrastructure, automation, or a project.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-28 pb-24 px-4">
      <div className="max-w-[1080px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-16 items-start">

        {/* Left — heading + contact details */}
        <div className="lg:pt-2">
          <h1 className="text-foreground text-3xl md:text-4xl font-bold tracking-tight leading-tight">
            Let&apos;s build<br />something
          </h1>
          <p className="text-muted text-base mt-5 max-w-[46ch]">
            Whether you need AI-powered infrastructure, automation workflows, a modern
            web build, or want to discuss B2B consulting — I&apos;m one message away.
          </p>

          <div className="mt-10 flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[rgba(212,146,26,0.08)] border border-[#1E2438] flex items-center justify-center flex-shrink-0">
                <Mail className="h-4 w-4 text-[#D4921A]" />
              </div>
              <div>
                <p className="text-xs text-[#5A6480] uppercase tracking-widest mb-0.5">Email</p>
                <a
                  href={SOCIAL_LINKS.email}
                  className="text-sm text-muted hover:text-[#D4921A] transition-colors"
                >
                  hermos.dev@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[rgba(212,146,26,0.08)] border border-[#1E2438] flex items-center justify-center flex-shrink-0">
                <Clock className="h-4 w-4 text-[#D4921A]" />
              </div>
              <div>
                <p className="text-xs text-[#5A6480] uppercase tracking-widest mb-0.5">Response time</p>
                <p className="text-sm text-muted">Within 24 hours</p>
              </div>
            </div>
          </div>

          <div className="flex gap-5 mt-10">
            <a
              href={SOCIAL_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-[#5A6480] hover:text-foreground transition-colors"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-[#5A6480] hover:text-foreground transition-colors"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Right — form card */}
        <div className="bg-[#111827] border border-[#1E2438] rounded-2xl p-7 md:p-9">
          <ContactForm />
        </div>

      </div>
    </div>
  );
}
