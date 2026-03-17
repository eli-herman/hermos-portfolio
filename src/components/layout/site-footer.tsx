import { Github, Linkedin, Mail } from 'lucide-react';
import { SOCIAL_LINKS } from '@/lib/constants';

export function SiteFooter() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="mx-auto max-w-[1200px] px-4 md:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-muted-foreground text-sm">
          &copy; 2026 Eli Herman
        </p>
        <div className="flex items-center gap-4">
          <a
            href={SOCIAL_LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="GitHub"
          >
            <Github className="h-5 w-5" />
          </a>
          <a
            href={SOCIAL_LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-5 w-5" />
          </a>
          <a
            href={SOCIAL_LINKS.email}
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Email"
          >
            <Mail className="h-5 w-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
