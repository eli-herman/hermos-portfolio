'use client';

import { cn } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';

interface BackgroundGradientAnimationProps {
  gradientBackgroundStart?: string;
  gradientBackgroundEnd?: string;
  firstColor?: string;
  secondColor?: string;
  thirdColor?: string;
  fourthColor?: string;
  fifthColor?: string;
  pointerColor?: string;
  size?: string;
  blendingValue?: string;
  children?: React.ReactNode;
  className?: string;
  interactive?: boolean;
  containerClassName?: string;
}

export function BackgroundGradientAnimation({
  gradientBackgroundStart = 'rgb(8, 8, 16)',
  gradientBackgroundEnd = 'rgb(5, 5, 8)',
  firstColor = '59, 130, 246',
  secondColor = '29, 78, 216',
  thirdColor = '37, 99, 235',
  fourthColor = '15, 23, 42',
  fifthColor = '30, 30, 48',
  pointerColor = '99, 162, 251',
  size = '80%',
  blendingValue = 'soft-light',
  children,
  className,
  interactive = true,
  containerClassName,
}: BackgroundGradientAnimationProps) {
  const interactiveRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const curX = useRef(0);
  const curY = useRef(0);
  const tgX = useRef(0);
  const tgY = useRef(0);

  const [isSafari, setIsSafari] = useState(false);

  useEffect(() => {
    setIsSafari(/^((?!chrome|android).)*safari/i.test(navigator.userAgent));
  }, []);

  useEffect(() => {
    const el = document.body;
    el.style.setProperty('--gradient-background-start', gradientBackgroundStart);
    el.style.setProperty('--gradient-background-end', gradientBackgroundEnd);
    el.style.setProperty('--first-color', firstColor);
    el.style.setProperty('--second-color', secondColor);
    el.style.setProperty('--third-color', thirdColor);
    el.style.setProperty('--fourth-color', fourthColor);
    el.style.setProperty('--fifth-color', fifthColor);
    el.style.setProperty('--pointer-color', pointerColor);
    el.style.setProperty('--size', size);
    el.style.setProperty('--blending-value', blendingValue);
  }, [gradientBackgroundStart, gradientBackgroundEnd, firstColor, secondColor, thirdColor, fourthColor, fifthColor, pointerColor, size, blendingValue]);

  useEffect(() => {
    function move() {
      if (!interactiveRef.current) return;
      curX.current += (tgX.current - curX.current) / 20;
      curY.current += (tgY.current - curY.current) / 20;
      interactiveRef.current.style.transform = `translate(${Math.round(curX.current)}px, ${Math.round(curY.current)}px)`;
      rafRef.current = requestAnimationFrame(move);
    }
    rafRef.current = requestAnimationFrame(move);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    tgX.current = e.clientX - rect.left;
    tgY.current = e.clientY - rect.top;
  };

  return (
    <div
      className={cn('relative overflow-hidden w-full h-full bg-[linear-gradient(40deg,var(--gradient-background-start),var(--gradient-background-end))]', containerClassName)}
      onMouseMove={interactive ? handleMouseMove : undefined}
    >
      {/* Hidden SVG goo filter */}
      <svg className="hidden">
        <defs>
          <filter id="bg-gradient-blurme">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      {/* Children sit above the orbs */}
      <div className={cn('relative z-10', className)}>{children}</div>

      {/* Orbs layer */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{ filter: isSafari ? 'blur(40px)' : 'url(#bg-gradient-blurme) blur(40px)' }}
      >
        {/* Orb 1 — moveVertical */}
        <div
          className="absolute [background:radial-gradient(circle_at_center,_rgba(var(--first-color),_0.8)_0,_rgba(var(--first-color),_0)_50%)_no-repeat] [mix-blend-mode:var(--blending-value)] [animation:moveVertical_18s_ease_infinite] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)] origin-[center_60%] opacity-70"
        />
        {/* Orb 2 — moveInCircle */}
        <div
          className="absolute [background:radial-gradient(circle_at_center,_rgba(var(--second-color),_0.8)_0,_rgba(var(--second-color),_0)_50%)_no-repeat] [mix-blend-mode:var(--blending-value)] [animation:moveInCircle_24s_reverse_infinite] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)] origin-[calc(50%-400px)] opacity-70"
        />
        {/* Orb 3 — moveInCircle (slow) */}
        <div
          className="absolute [background:radial-gradient(circle_at_center,_rgba(var(--third-color),_0.8)_0,_rgba(var(--third-color),_0)_50%)_no-repeat] [mix-blend-mode:var(--blending-value)] [animation:moveInCircle_32s_linear_infinite] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2-200px)] left-[calc(50%-var(--size)/2+400px)] origin-[calc(50%-200px)] opacity-70"
        />
        {/* Orb 4 — moveHorizontal */}
        <div
          className="absolute [background:radial-gradient(circle_at_center,_rgba(var(--fourth-color),_0.8)_0,_rgba(var(--fourth-color),_0)_50%)_no-repeat] [mix-blend-mode:var(--blending-value)] [animation:moveHorizontal_20s_ease_infinite] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)] origin-[calc(50%-200px)_calc(50%+200px)] opacity-40"
        />
        {/* Orb 5 — moveInCircle (no repeat) */}
        <div
          className="absolute [background:radial-gradient(circle_at_center,_rgba(var(--fifth-color),_0.8)_0,_rgba(var(--fifth-color),_0)_50%)_no-repeat] [mix-blend-mode:var(--blending-value)] [animation:moveInCircle_28s_ease_infinite] w-[160%] h-[160%] top-[calc(50%-80%)] left-[calc(50%-80%)] origin-[calc(50%-800px)_calc(50%+200px)] opacity-30"
        />

        {/* Interactive pointer orb */}
        {interactive && (
          <div
            ref={interactiveRef}
            className="absolute [background:radial-gradient(circle_at_center,_rgba(var(--pointer-color),_0.8)_0,_rgba(var(--pointer-color),_0)_50%)_no-repeat] [mix-blend-mode:var(--blending-value)] w-full h-full -top-1/2 -left-1/2 opacity-60"
          />
        )}
      </div>
    </div>
  );
}
