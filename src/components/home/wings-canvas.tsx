'use client';

import { useRef, useEffect } from 'react';
import { useReducedMotion } from 'motion/react';

// ─────────────────────────────────────────────────────────────────────────────
// Wing geometry — one base bezier, proportionally scaled for each feather.
// Proportional scaling preserves arc shape → feathers look parallel (nested).
//
// Base bezier (right wing, normalized to halfW × vScale):
//   Origin → C1 (0.35, -0.65) → C2 (0.90, -0.94) → P3 (1.00, -1.00)
//
//   • No overshoot: C2.x = 0.90 < P3.x = 1.00
//   • Initial direction: atan2(0.65, 0.35) ≈ 62° from horizontal
//     (diagonal sweep, not straight up, not straight out)
//   • Arc bulges gently outward then curves to tip — classic wing feather shape
//
// 10 feathers at s = 1.00 → 0.46 (proportional copies, tightly nested).
// ─────────────────────────────────────────────────────────────────────────────

const FEATHER_DATA: Array<{ s: number; w: number; a: number; blur: number; color: string }> = [
  { s: 1.120, w: 1.8, a: 0.88, blur: 14, color: '#FFD878' },
  { s: 1.060, w: 1.7, a: 0.92, blur: 13, color: '#FFD268' },
  { s: 1.000, w: 1.6, a: 0.95, blur: 12, color: '#FFD060' },
  { s: 0.940, w: 1.4, a: 0.88, blur:  9, color: '#F5C040' },
  { s: 0.880, w: 1.3, a: 0.81, blur:  7, color: '#EABD70' },
  { s: 0.820, w: 1.2, a: 0.74, blur:  6, color: '#E0A830' },
  { s: 0.760, w: 1.1, a: 0.67, blur:  5, color: '#D89020' },
  { s: 0.700, w: 1.0, a: 0.60, blur:  4, color: '#D08010' },
  { s: 0.640, w: 0.9, a: 0.52, blur:  3, color: '#C88010' },
  { s: 0.580, w: 0.8, a: 0.44, blur:  3, color: '#C07808' },
  { s: 0.520, w: 0.7, a: 0.36, blur:  2, color: '#B87010' },
  { s: 0.460, w: 0.6, a: 0.28, blur:  1, color: '#B06808' },
  { s: 0.400, w: 0.5, a: 0.21, blur:  1, color: '#A86005' },
  { s: 0.340, w: 0.4, a: 0.15, blur:  1, color: '#A05800' },
];

const SPINE_C1 = [ 0.26, -0.05] as const;
const SPINE_C2 = [ 0.22, -0.60] as const;
const SPINE_P3 = [ 0.18, -0.77] as const;

interface Feather {
  x0: number; y0: number;
  c1x: number; c1y: number;
  c2x: number; c2y: number;
  p3x: number; p3y: number;
  w: number; a: number; blur: number; color: string;
  phase: number;
}

interface Spine {
  x0: number; y0: number;
  c1x: number; c1y: number;
  c2x: number; c2y: number;
  p3x: number; p3y: number;
}

interface Float {
  x: number; y: number;
  r: number; color: string;
  a: number; phase: number; dA: number;
}

interface GlobBlob {
  x: number; y: number;
  r: number;
  baseA: number;
  phase: number;
  dA: number;
}

interface Barb {
  x0: number; y0: number;
  c1x: number; c1y: number;
  c2x: number; c2y: number;
  p3x: number; p3y: number;
  px: number; py: number;   // perpendicular unit vector — warp direction
  alpha: number;
  lw: number;
  gv: number; bv: number;
  phase: number;
  warpAmp: number;
  warpFreq: number;
}

interface Streamer {
  fi: number;   // index into feathers array
  t: number;    // current position along bezier [0, 1]
  spd: number;  // t advance per frame
  r: number;
  a: number;
  color: string;
}

export function WingsCanvas({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let feathers:  Feather[]  = [];
    let spines:    Spine[]    = [];
    let floaters:  Float[]    = [];
    let streamers: Streamer[] = [];
    let globs:     GlobBlob[] = [];
    let barbs:     Barb[]     = [];
    let animId = 0;
    let isVisible = true;
    let lastTs = 0;
    let frame = 0;
    const INTERVAL = 1000 / 30;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && animId === 0) { lastTs = 0; animId = requestAnimationFrame(tick); }
      },
      { threshold: 0.01 },
    );
    observer.observe(canvas);

    function build() {
      feathers   = [];
      spines     = [];
      floaters   = [];
      streamers  = [];
      globs      = [];
      barbs      = [];

      // halfW chosen so outer tip stays on-screen with oy at 60%
      const halfW  = Math.min(canvas.width * 0.34, 440);
      const vScale = halfW * 1.474;
      // Two separate scales so spine size and feather origin are independently tunable
      const SPINE_RENDER_SCALE = 0.32;  // visual U shape size
      const ox = canvas.width  / 2;
      const oy = canvas.height * 0.60;

      for (const side of [-1, 1]) {
        // ── Spine bezier control points (same geometry as rendered spine) ──────────
        const sp0x = ox,                                                    sp0y = oy;
        const sC1x = ox + SPINE_C1[0]*halfW*side*SPINE_RENDER_SCALE,       sC1y = oy + SPINE_C1[1]*vScale*SPINE_RENDER_SCALE;
        const sC2x = ox + SPINE_C2[0]*halfW*side*SPINE_RENDER_SCALE,       sC2y = oy + SPINE_C2[1]*vScale*SPINE_RENDER_SCALE;
        const sP3x = ox + SPINE_P3[0]*halfW*side*SPINE_RENDER_SCALE,       sP3y = oy + SPINE_P3[1]*vScale*SPINE_RENDER_SCALE;

        // Evaluate a point on the spine bezier (t=1 → tip, t=0 → base center)
        const spinePt = (t: number) => {
          const mt = 1 - t;
          return {
            x: mt*mt*mt*sp0x + 3*mt*mt*t*sC1x + 3*mt*t*t*sC2x + t*t*t*sP3x,
            y: mt*mt*mt*sp0y + 3*mt*mt*t*sC1y + 3*mt*t*t*sC2y + t*t*t*sP3y,
          };
        };

        // Fan: outermost feather near-vertical, innermost near-horizontal
        const ANGLE_TOP = 72 * Math.PI / 180;
        const ANGLE_BOT = -15 * Math.PI / 180;
        const R_FACTOR  = 0.82;
        const N = FEATHER_DATA.length;

        FEATHER_DATA.forEach(({ s, w, a, blur, color }, fi) => {
          // Each feather gets its own origin — fi=0 at spine tip, fi=N-1 halfway down
          const t_orig = 1.0 - (fi / (N - 1)) * 0.52;
          const origin = spinePt(t_orig);

          // Tip: angle fan + radius scaled by s
          const frac  = fi / (N - 1);
          const angle = ANGLE_TOP + frac * (ANGLE_BOT - ANGLE_TOP);
          const R     = halfW * s * R_FACTOR;

          // V-shape: prescribe horizontal reach directly so tips form a V, not an arc.
          // Top feather (frac=0) spreads to 0.74*halfW, inner (frac=1) pulls to 0.34*halfW.
          // cos(angle) cancels out, so angle only controls vertical — horizontal is exact.
          const desiredReach = 0.74 - frac * 0.40;
          const tx = origin.x + halfW * side * desiredReach;
          const ty = origin.y - Math.sin(angle) * R;

          const dx = tx - origin.x;
          const dy = ty - origin.y;

          // Convex: push control points outward so arc bulges away from center
          const push = halfW * 0.24 * side;

          feathers.push({
            x0: origin.x, y0: origin.y,
            c1x: origin.x + dx * 0.35 + push,
            c1y: origin.y + dy * 0.15,
            c2x: origin.x + dx * 0.75 + push * 0.5,
            c2y: origin.y + dy * 0.62,
            p3x: tx, p3y: ty,
            w, a, blur, color,
            phase: fi * 0.42 + (side === 1 ? 0 : 1.57),
          });
        });

        // Spine — bright S-curve inner edge (uses SPINE_RENDER_SCALE, independent of feather origins)
        spines.push({
          x0: ox, y0: oy,
          c1x: ox + SPINE_C1[0] * halfW * side * SPINE_RENDER_SCALE, c1y: oy + SPINE_C1[1] * vScale * SPINE_RENDER_SCALE,
          c2x: ox + SPINE_C2[0] * halfW * side * SPINE_RENDER_SCALE, c2y: oy + SPINE_C2[1] * vScale * SPINE_RENDER_SCALE,
          p3x: ox + SPINE_P3[0] * halfW * side * SPINE_RENDER_SCALE, p3y: oy + SPINE_P3[1] * vScale * SPINE_RENDER_SCALE,
        });
      }

      // ── Barbs — animated sub-feathers interpolated between adjacent arcs ──
      // Control points lerped between adjacent feather pairs → same origin,
      // same arc geometry. Each barb gets a warp phase for fluid motion.
      const Nf          = FEATHER_DATA.length; // 14 per side
      const BARBS_PER_GAP = 5;                 // sparse — hint of texture, not a mesh
      const staticWarp  = halfW * 0.016;       // baked-in organic offset

      for (let side = 0; side < 2; side++) {
        const base = side * Nf;
        for (let fi = 0; fi < Nf - 1; fi++) {
          const f1 = feathers[base + fi];
          const f2 = feathers[base + fi + 1];

          for (let b = 1; b < BARBS_PER_GAP; b++) {
            const jitter = (Math.random() - 0.5) * 0.12;
            const at = Math.max(0.05, Math.min(0.95, b / BARBS_PER_GAP + jitter));

            const x0  = f1.x0  + (f2.x0  - f1.x0)  * at;
            const y0  = f1.y0  + (f2.y0  - f1.y0)  * at;
            const c1x = f1.c1x + (f2.c1x - f1.c1x) * at + (Math.random() - 0.5) * staticWarp;
            const c1y = f1.c1y + (f2.c1y - f1.c1y) * at + (Math.random() - 0.5) * staticWarp;
            const c2x = f1.c2x + (f2.c2x - f1.c2x) * at + (Math.random() - 0.5) * staticWarp;
            const c2y = f1.c2y + (f2.c2y - f1.c2y) * at + (Math.random() - 0.5) * staticWarp;
            const p3x = f1.p3x + (f2.p3x - f1.p3x) * at;
            const p3y = f1.p3y + (f2.p3y - f1.p3y) * at;

            // Perpendicular to barb direction (warp axis)
            const bdx = p3x - x0, bdy = p3y - y0;
            const bl  = Math.sqrt(bdx*bdx + bdy*bdy) || 1;

            const mid   = 1 - Math.abs(at - 0.5) * 2;
            const alpha = 0.025 + mid * 0.055 + Math.random() * 0.025;
            const isWh  = Math.random() < 0.12;
            // Wide thickness variety: thin filaments to visible strands
            const lw = Math.random() < 0.2
              ? 0.15 + Math.random() * 0.2          // very fine
              : Math.random() < 0.5
                ? 0.4  + Math.random() * 0.5        // medium
                : 0.9  + Math.random() * 1.1;       // thick strand

            barbs.push({
              x0, y0, c1x, c1y, c2x, c2y, p3x, p3y,
              px: -bdy / bl, py: bdx / bl,
              alpha,
              lw,
              gv: isWh ? 240 : 185 + Math.floor(Math.random() * 45),
              bv: isWh ? 200 : 10  + Math.floor(Math.random() * 25),
              phase:    Math.random() * Math.PI * 2,
              warpAmp:  halfW * (0.012 + Math.random() * 0.022),
              warpFreq: 0.35 + Math.random() * 0.75,
            });
          }
        }
      }

      // ── Glob fills — soft warm orbs seeded between adjacent feather arcs ──
      for (let side = 0; side < 2; side++) {
        const base = side * Nf;
        for (let fi = 0; fi < Nf - 1; fi++) {
          const f1 = feathers[base + fi];
          const f2 = feathers[base + fi + 1];
          const tp = 0.60, mt60 = 1 - tp;
          const p1x = mt60**3*f1.x0 + 3*mt60**2*tp*f1.c1x + 3*mt60*tp**2*f1.c2x + tp**3*f1.p3x;
          const p1y = mt60**3*f1.y0 + 3*mt60**2*tp*f1.c1y + 3*mt60*tp**2*f1.c2y + tp**3*f1.p3y;
          const p2x = mt60**3*f2.x0 + 3*mt60**2*tp*f2.c1x + 3*mt60*tp**2*f2.c2x + tp**3*f2.p3x;
          const p2y = mt60**3*f2.y0 + 3*mt60**2*tp*f2.c1y + 3*mt60*tp**2*f2.c2y + tp**3*f2.p3y;
          const gx   = (p1x + p2x) / 2;
          const gy   = (p1y + p2y) / 2;
          const dist = Math.sqrt((p1x-p2x)**2 + (p1y-p2y)**2);
          globs.push({
            x: gx + (Math.random() - 0.5) * dist * 0.2,
            y: gy + (Math.random() - 0.5) * dist * 0.2,
            r:     dist * (0.45 + Math.random() * 0.35),
            baseA: 0.012 + Math.random() * 0.016,
            phase: Math.random() * Math.PI * 2,
            dA:    0.3  + Math.random() * 0.6,
          });
        }
      }

      // ── Sparkles along each feather bezier ──────────────────────────────
      // Seed bright dots at random t-positions on each feather curve.
      feathers.forEach((f) => {
        for (let k = 0; k < 5; k++) {
          const tp = 0.05 + Math.random() * 0.88;
          const mt = 1 - tp;
          const px = mt*mt*mt*f.x0 + 3*mt*mt*tp*f.c1x + 3*mt*tp*tp*f.c2x + tp*tp*tp*f.p3x;
          const py = mt*mt*mt*f.y0 + 3*mt*mt*tp*f.c1y + 3*mt*tp*tp*f.c2y + tp*tp*tp*f.p3y;
          floaters.push({
            x: px + (Math.random() - 0.5) * 6,
            y: py + (Math.random() - 0.5) * 6,
            r: 0.3 + Math.random() * 1.1,
            color: Math.random() < 0.35 ? '#ffffff' : Math.random() < 0.6 ? '#FFD878' : '#FFB020',
            a: 0.12 + Math.random() * 0.28,
            phase: Math.random() * Math.PI * 2,
            dA: 0.4 + Math.random() * 1.5,
          });
        }
      });

      // ── Streamers — travel from origin to tip along each feather ────────
      streamers = [];
      feathers.forEach((_, fi) => {
        for (let k = 0; k < 2; k++) {
          streamers.push({
            fi,
            t: Math.random(),                       // staggered so they don't all start together
            spd: 0.003 + Math.random() * 0.006,
            r: 0.7 + Math.random() * 1.4,
            a: 0.55 + Math.random() * 0.45,
            color: Math.random() < 0.45 ? '#ffffff' : '#FFD878',
          });
        }
      });

      // Ambient glow particles
      const ww = halfW * 1.3, wh = vScale * 1.05;
      for (let i = 0; i < 75; i++) {
        floaters.push({
          x: ox + (Math.random() - 0.5) * ww * 2,
          y: oy - Math.random() * wh + wh * 0.10,
          r: 0.4 + Math.random() * 1.1,
          color: Math.random() < 0.25 ? '#ffffff' : Math.random() < 0.5 ? '#FFD060' : '#E8A020',
          a: 0.04 + Math.random() * 0.11,
          phase: Math.random() * Math.PI * 2,
          dA: 0.8 + Math.random() * 2.0,
        });
      }
      // Center burst
      for (let i = 0; i < 45; i++) {
        const ang = Math.random() * Math.PI * 2;
        const r   = Math.random() * halfW * 0.06;
        floaters.push({
          x: ox + Math.cos(ang) * r,
          y: oy + Math.sin(ang) * r * 0.5,
          r: 0.5 + Math.random() * 2.0,
          color: Math.random() < 0.4 ? '#ffffff' : '#FFD060',
          a: 0.5 + Math.random() * 0.5,
          phase: Math.random() * Math.PI * 2,
          dA: Math.random() * 0.5,
        });
      }
    }

    function drawBez(f: Feather | Spine) {
      ctx!.beginPath();
      ctx!.moveTo(f.x0, f.y0);
      ctx!.bezierCurveTo(f.c1x, f.c1y, f.c2x, f.c2y, f.p3x, f.p3y);
      ctx!.stroke();
    }

    function tick(ts: number) {
      if (!isVisible) { animId = 0; return; }
      animId = requestAnimationFrame(tick);
      if (ts - lastTs < INTERVAL) return;
      lastTs = ts;
      draw();
      frame++;
    }

    function draw() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const t = frame * 0.016;

      ctx.lineCap = 'round';

      // ── Feathers — inner first so outer renders on top ─────────────────
      for (let i = feathers.length - 1; i >= 0; i--) {
        const f = feathers[i];
        const pulse = reduced ? 1 : 0.80 + 0.20 * Math.sin(t * 0.7 + f.phase);
        const fa = f.a * pulse;

        // Glow pass
        ctx.globalAlpha = fa * 0.22;
        ctx.strokeStyle = f.color;
        ctx.lineWidth   = f.w * 3.5;
        ctx.shadowBlur  = f.blur * 2.2;
        ctx.shadowColor = f.color;
        drawBez(f);

        // Crisp line — butt cap so tip doesn't leave a blob
        ctx.lineCap     = 'butt';
        ctx.globalAlpha = fa;
        ctx.strokeStyle = f.color;
        ctx.lineWidth   = f.w;
        ctx.shadowBlur  = f.blur * 0.7;
        drawBez(f);
        ctx.lineCap = 'round';
      }

      // ── Barbs — fluid animated sub-feathers ──────────────────────────
      ctx.shadowBlur = 0;
      ctx.lineCap    = 'round';
      for (const b of barbs) {
        const w  = reduced ? 0 : Math.sin(t * b.warpFreq + b.phase) * b.warpAmp;
        ctx.globalAlpha = b.alpha;
        ctx.strokeStyle = `rgb(255,${b.gv},${b.bv})`;
        ctx.lineWidth   = b.lw;
        ctx.beginPath();
        ctx.moveTo(b.x0, b.y0);
        ctx.bezierCurveTo(
          b.c1x + b.px * w,        b.c1y + b.py * w,
          b.c2x + b.px * w * 0.55, b.c2y + b.py * w * 0.55,
          b.p3x, b.p3y,
        );
        ctx.stroke();
      }

      // ── Glob fills — soft warm glow between feather arcs ──────────────
      ctx.shadowBlur = 0;
      for (const g of globs) {
        const pulse = reduced ? 1 : 0.45 + 0.55 * Math.sin(t * 0.5 + g.phase);
        const fa = g.baseA * pulse;
        if (fa < 0.005) continue;
        ctx.globalAlpha = fa;
        ctx.fillStyle   = '#FFD060';
        ctx.beginPath();
        ctx.arc(g.x, g.y, g.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // ── Spines ────────────────────────────────────────────────────────
      for (const sp of spines) {
        const p = reduced ? 1 : 0.88 + 0.12 * Math.sin(t * 0.9);

        ctx.globalAlpha = 0.18 * p;
        ctx.strokeStyle = '#FFE080';
        ctx.lineWidth   = 3;
        ctx.shadowBlur  = 10;
        ctx.shadowColor = '#FFD060';
        ctx.lineCap     = 'round';
        drawBez(sp);

        ctx.globalAlpha = 0.55 * p;
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth   = 0.9;
        ctx.shadowBlur  = 4;
        ctx.shadowColor = '#FFE080';
        drawBez(sp);
      }

      // ── Ambient float particles ────────────────────────────────────────
      ctx.shadowBlur = 0;
      for (const p of floaters) {
        const pulse  = reduced ? 1 : 0.4 + 0.6 * Math.sin(t * 0.7 + p.phase);
        const driftX = reduced ? 0 : Math.sin(t * 0.5 + p.phase) * p.dA;
        const driftY = reduced ? 0 : Math.cos(t * 0.4 + p.phase) * p.dA * 0.4;
        const fa = p.a * pulse;
        if (fa < 0.012) continue;
        ctx.globalAlpha = fa;
        ctx.fillStyle   = p.color;
        ctx.beginPath();
        ctx.arc(p.x + driftX, p.y + driftY, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // ── Streamers — bright points travelling along each feather ──────────
      for (const s of streamers) {
        if (!reduced) { s.t += s.spd; if (s.t > 1) s.t -= 1; }
        const f  = feathers[s.fi];
        const mt = 1 - s.t;
        const px = mt*mt*mt*f.x0 + 3*mt*mt*s.t*f.c1x + 3*mt*s.t*s.t*f.c2x + s.t*s.t*s.t*f.p3x;
        const py = mt*mt*mt*f.y0 + 3*mt*mt*s.t*f.c1y + 3*mt*s.t*s.t*f.c2y + s.t*s.t*s.t*f.p3y;
        const fade = Math.sin(s.t * Math.PI);   // fade in at origin, out at tip
        const fa   = s.a * fade;
        if (fa < 0.05) continue;
        ctx.globalAlpha = fa;
        ctx.fillStyle   = s.color;
        ctx.shadowBlur  = 8;
        ctx.shadowColor = '#FFD060';
        ctx.beginPath();
        ctx.arc(px, py, s.r, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      ctx.shadowBlur  = 0;
    }

    function init() {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      build();
      frame = 0;
    }

    function onResize() {
      cancelAnimationFrame(animId);
      animId = 0;
      init();
      lastTs = 0;
      if (isVisible) animId = requestAnimationFrame(tick);
    }

    init();
    if (isVisible) animId = requestAnimationFrame(tick);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animId);
      observer.disconnect();
    };
  }, [reduced]);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full pointer-events-none ${className ?? ''}`}
      aria-hidden="true"
    />
  );
}
