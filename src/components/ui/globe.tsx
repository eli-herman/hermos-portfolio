'use client';

import createGlobe, { type COBEOptions } from 'cobe';
import { useCallback, useEffect, useRef } from 'react';

const GLOBE_CONFIG: COBEOptions = {
  width: 600,
  height: 600,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 1,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 6,
  baseColor: [0.05, 0.07, 0.13],
  markerColor: [212 / 255, 146 / 255, 26 / 255],
  glowColor: [0.45, 0.30, 0.05],
  markers: [
    { location: [31.5490, -97.1467], size: 0.08 }, // Waco, TX
    { location: [40.7128, -74.0060], size: 0.06 },
    { location: [51.5074, -0.1278], size: 0.05 },
    { location: [35.6762, 139.6503], size: 0.05 },
  ],
};

export function Globe({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const phiRef = useRef(0);
  const widthRef = useRef(0);

  const onRender = useCallback((state: Record<string, unknown>) => {
    phiRef.current += 0.005;
    state.phi = phiRef.current;
    state.width = widthRef.current * 2;
    state.height = widthRef.current * 2;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      widthRef.current = canvas.offsetWidth;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const globe = createGlobe(canvas, {
      ...GLOBE_CONFIG,
      width: widthRef.current * 2,
      height: widthRef.current * 2,
      onRender,
    });

    return () => {
      globe.destroy();
      window.removeEventListener('resize', handleResize);
    };
  }, [onRender]);

  return (
    <div className={`relative aspect-square w-full ${className}`}>
      <canvas ref={canvasRef} className="size-full [contain:layout_paint_size]" />
    </div>
  );
}
