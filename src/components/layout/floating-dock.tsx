'use client';

import { Home, Server, User, Github, Linkedin, Mail } from 'lucide-react';
import { AnimatedDock } from '@/components/ui/animated-dock';
import { SOCIAL_LINKS } from '@/lib/constants';

const DOCK_ITEMS = [
  {
    link: '/',
    Icon: <Home className="h-4 w-4" />,
    label: 'Home',
  },
  {
    link: '/hermos',
    Icon: <Server className="h-4 w-4" />,
    label: 'Hermos',
  },
  {
    link: '/about',
    Icon: <User className="h-4 w-4" />,
    label: 'About',
  },
  {
    link: SOCIAL_LINKS.github,
    Icon: <Github className="h-4 w-4" />,
    target: '_blank',
    label: 'GitHub',
  },
  {
    link: SOCIAL_LINKS.linkedin,
    Icon: <Linkedin className="h-4 w-4" />,
    target: '_blank',
    label: 'LinkedIn',
  },
  {
    link: SOCIAL_LINKS.email,
    Icon: <Mail className="h-4 w-4" />,
    label: 'Email',
  },
];

export function FloatingDock() {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <AnimatedDock
        items={DOCK_ITEMS}
        className="backdrop-blur-md bg-card/80 border-border"
      />
    </div>
  );
}
