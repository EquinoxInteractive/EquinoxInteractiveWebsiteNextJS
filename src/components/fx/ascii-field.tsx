'use client';
import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

const RAMP = ' ..·:+';
const FONT = '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace';

/** Medan ASCII halus sebagai latar; bereaksi pada kursor. */
export default function AsciiField({ className, cell = 16, strength = 0.32 }: { className?: string; cell?: number; strength?: number }) {
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrapEl = wrap.current!;
    const cv = canvas.current!;
    const ctx = cv.getContext('2d')!;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let W = 0, H = 0, cols = 0, rows = 0, raf = 0, visible = true, last = 0;
    let color = 'hsl(220 5% 71%)';
    const cw = cell * 0.6, ch = cell;
    const mouse = { x: -9999, y: -9999 };

    const readColor = () => {
      const v = getComputedStyle(document.documentElement).getPropertyValue('--ascii').trim();
      if (v) color = `hsl(${v})`;
    };
    const size = () => {
      const r = wrapEl.getBoundingClientRect();
      W = r.width; H = r.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      cv.width = W * dpr; cv.height = H * dpr;
      cv.style.width = `${W}px`; cv.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(W / cw); rows = Math.ceil(H / ch);
    };
    const draw = (now: number) => {
      const t = now / 1000;
      ctx.clearRect(0, 0, W, H);
      ctx.font = `${cell}px ${FONT}`;
      ctx.textBaseline = 'top';
      ctx.fillStyle = color;
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const px = x * cw, py = y * ch;
          let v = (Math.sin(x * 0.09 + t * 0.55) + Math.sin(y * 0.13 - t * 0.4) + Math.sin((x + y) * 0.05 + t * 0.3) + 3) / 6;
          const d = Math.hypot(px - mouse.x, py - mouse.y);
          const infl = d < 170 ? 1 - d / 170 : 0;
          v = Math.min(1, v * 0.8 + infl * 0.9);
          const c = RAMP[Math.min(RAMP.length - 1, Math.floor(v * RAMP.length))];
          if (c === ' ') continue;
          ctx.globalAlpha = Math.min(1, 0.1 + v * strength * 2.2);
          ctx.fillText(infl > 0.55 ? '*' : c, px, py);
        }
      }
      ctx.globalAlpha = 1;
    };
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (!visible || document.hidden || now - last < 42) return; // ~24fps
      last = now;
      draw(now);
    };
    readColor(); size();
    if (reduced) draw(2000); else raf = requestAnimationFrame(loop);

    const onMove = (e: PointerEvent) => {
      const r = wrapEl.getBoundingClientRect();
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    const ro = new ResizeObserver(() => { size(); if (reduced) draw(2000); });
    ro.observe(wrapEl);
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(wrapEl);
    const mo = new MutationObserver(() => { readColor(); if (reduced) draw(2000); });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      ro.disconnect(); io.disconnect(); mo.disconnect();
    };
  }, [cell, strength]);

  return (
    <div ref={wrap} className={cn('pointer-events-none absolute inset-0', className)} aria-hidden>
      <canvas ref={canvas} className="absolute inset-0" />
    </div>
  );
}
