'use client';

import { useRef, useState, useCallback } from 'react';

interface FloatingBentoProps {
  children: React.ReactNode;
  className?: string;
  maxRotation?: number;
}

export function FloatingBento({ children, className = '', maxRotation = 6 }: FloatingBentoProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [style, setStyle] = useState<React.CSSProperties>({});

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = ref.current;
    if (!card) return;
    const { left, top, width, height } = card.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    setStyle({
      transform: `perspective(900px) rotateX(${-y * maxRotation}deg) rotateY(${x * maxRotation}deg) translateY(-4px)`,
      transition: 'transform 0.08s ease-out',
      willChange: 'transform',
    });
  }, [maxRotation]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setStyle({
      transform: 'perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0px)',
      transition: 'transform 0.5s ease-out',
      willChange: 'auto',
    });
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      {children}
    </div>
  );
}
