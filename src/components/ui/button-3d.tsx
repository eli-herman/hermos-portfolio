'use client';

import { motion, useReducedMotion } from 'motion/react';

interface Button3DProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function Button3D({ href, children, className = '' }: Button3DProps) {
  const reduced = useReducedMotion();

  return (
    <motion.a
      href={href}
      whileHover={reduced ? undefined : { scale: 1.02, boxShadow: '0 8px 0 0 #7E4F10' }}
      whileTap={reduced ? undefined : { scale: 0.98, y: 4, boxShadow: '0 2px 0 0 #7E4F10' }}
      initial={false}
      style={{ boxShadow: '0 6px 0 0 #7E4F10' }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`inline-flex items-center justify-center rounded-xl min-h-[48px] px-10 text-sm font-semibold text-[#0A0A0A] bg-gradient-to-r from-[#B8790E] via-[#EABD70] to-[#B8790E] hover:from-[#D4921A] hover:via-[#EABD70] hover:to-[#D4921A] select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${className}`}
    >
      {children}
    </motion.a>
  );
}
