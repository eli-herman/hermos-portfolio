'use client';

import Link from 'next/link';
import { type ComponentProps } from 'react';

interface LiquidMetalButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  target?: string;
  onClick?: ComponentProps<typeof Link>['onClick'];
}

export function LiquidMetalButton({ href, children, className = '', target, onClick }: LiquidMetalButtonProps) {
  return (
    <Link
      href={href}
      target={target}
      onClick={onClick}
      className={`inline-flex items-center justify-center rounded-lg min-h-[44px] px-6 text-sm font-semibold text-white bg-accent hover:bg-accent-hover transition-colors duration-200 shadow-[0_0_18px_rgba(59,130,246,0.30)] hover:shadow-[0_0_26px_rgba(59,130,246,0.50)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${className}`}
    >
      {children}
    </Link>
  );
}
