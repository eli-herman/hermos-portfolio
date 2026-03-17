'use client';

import { useRef, useEffect } from 'react';

interface WaveLayer {
  phase: number;
  amplitude: number;
  frequency: number;
  speed: number;
  color: string;
  opacity: number;
}

const WAVES: WaveLayer[] = [
  { phase: 0,              amplitude: 80, frequency: 0.0018, speed: 1.0, color: '#E8971A', opacity: 0.16 },
  { phase: Math.PI * 0.5,  amplitude: 55, frequency: 0.0026, speed: 0.7, color: '#F5C060', opacity: 0.12 },
  { phase: Math.PI * 1.0,  amplitude: 95, frequency: 0.0013, speed: 1.3, color: '#B86C0A', opacity: 0.09 },
  { phase: Math.PI * 1.5,  amplitude: 45, frequency: 0.0031, speed: 0.9, color: '#F0A830', opacity: 0.06 },
  { phase: Math.PI * 0.3,  amplitude: 65, frequency: 0.0022, speed: 1.1, color: '#8C5005', opacity: 0.05 },
];

export function WaveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const timeRef = useRef(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    function resize() {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }

    function drawWave(wave: WaveLayer, t: number) {
      if (!ctx || !canvas) return;
      const yBase = canvas.height * 0.72;
      const { x: mx, y: my } = mouseRef.current;

      ctx.beginPath();
      ctx.moveTo(0, canvas.height);

      for (let x = 0; x <= canvas.width; x += 4) {
        const base     = wave.amplitude * Math.sin(x * wave.frequency + t * wave.speed + wave.phase);
        const harmonic = wave.amplitude * 0.35 * Math.sin(x * wave.frequency * 2.3 + t * wave.speed * 1.5 + wave.phase);
        const dx = x - mx;
        const dy = yBase - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const ripple = dist < 260 ? Math.sin(dist * 0.028 - t * 3) * ((1 - dist / 260) * 20) : 0;
        ctx.lineTo(x, yBase + base + harmonic + ripple);
      }

      ctx.lineTo(canvas.width, canvas.height);
      ctx.closePath();
      ctx.fillStyle = wave.color;
      ctx.globalAlpha = wave.opacity;
      ctx.fill();
    }

    function animate() {
      if (!ctx || !canvas) return;
      timeRef.current += 0.007;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = 1;
      for (const wave of WAVES) drawWave(wave, timeRef.current);
      rafRef.current = requestAnimationFrame(animate);
    }

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    resize();
    animate();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouseMove);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    />
  );
}
