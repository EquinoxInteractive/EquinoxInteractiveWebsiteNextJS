'use client';
import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

const RAMP = ' .·:-=+*#%@';
const NOISE = '01<>/\\[]{}#%&*+=';

/**
 * Logo Equinox sebagai ASCII di <canvas> — versi RINGAN:
 * - Gambar dasar dirender SEKALI (tanpa loop animasi saat idle → 0% CPU).
 * - Hanya area kecil di sekitar kursor yang digambar ulang, dan hanya saat kursor di atas logo.
 */
export default function AsciiLogo({ className, src = '/logo.png', cell = 10 }: { className?: string; src?: string; cell?: number }) {
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrapEl = wrap.current!;
    const cv = canvas.current!;
    const ctx = cv.getContext('2d')!;
    const cw = cell * 0.6;
    const ch = cell * 1.1;
    const R = 70; // radius efek kursor (px)

    let cols = 0, rows = 0, W = 0, H = 0, raf = 0, inside = false, lastT = 0;
    let mask = new Float32Array(0);
    let color = 'hsl(220 5% 71%)';
    let font = `${cell}px ui-monospace, monospace`;
    const mouse = { x: -9999, y: -9999 };
    let dirty: { x0: number; y0: number; x1: number; y1: number } | null = null;
    const img = new Image();
    let loaded = false;

    const readStyle = () => {
      const cs = getComputedStyle(document.documentElement);
      const v = cs.getPropertyValue('--ascii').trim();
      if (v) color = `hsl(${v})`;
      const f = cs.getPropertyValue('--font-mono').trim();
      font = `${cell}px ${f || 'ui-monospace, monospace'}`;
    };

    const charAt = (x: number, y: number, hover: boolean) => {
      const m = mask[y * cols + x];
      if (m < 0.05) return null;
      let v = m;
      let c = RAMP[Math.min(RAMP.length - 1, Math.floor(v * (RAMP.length - 1)))];
      if (hover) {
        const d = Math.hypot(x * cw - mouse.x, y * ch - mouse.y);
        if (d < R) {
          const infl = 1 - d / R;
          if (Math.random() < infl * 0.8) {
            c = NOISE[(Math.random() * NOISE.length) | 0];
            v = Math.max(v, 0.95);
          }
        }
      }
      return c === ' ' ? null : { c, v };
    };

    /** Gambar sel pada rentang [x0..x1]×[y0..y1]; area dibersihkan dulu. */
    const paint = (x0: number, y0: number, x1: number, y1: number, hover: boolean) => {
      x0 = Math.max(0, x0); y0 = Math.max(0, y0);
      x1 = Math.min(cols - 1, x1); y1 = Math.min(rows - 1, y1);
      ctx.clearRect(x0 * cw, y0 * ch, (x1 - x0 + 1) * cw + 1, (y1 - y0 + 1) * ch + 1);
      ctx.font = font;
      ctx.textBaseline = 'top';
      ctx.fillStyle = color;
      for (let y = y0; y <= y1; y++) {
        for (let x = x0; x <= x1; x++) {
          const r = charAt(x, y, hover);
          if (!r) continue;
          ctx.globalAlpha = 0.3 + 0.7 * r.v;
          ctx.fillText(r.c, x * cw, y * ch);
        }
      }
      ctx.globalAlpha = 1;
    };

    const paintAll = () => {
      if (cols) paint(0, 0, cols - 1, rows - 1, false);
    };

    const build = () => {
      if (!loaded) return;
      const r = wrapEl.getBoundingClientRect();
      W = r.width; H = r.height;
      if (!W || !H) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      cv.width = W * dpr; cv.height = H * dpr;
      cv.style.width = `${W}px`; cv.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.floor(W / cw);
      rows = Math.floor(H / ch);

      const off = document.createElement('canvas');
      off.width = cols; off.height = rows;
      const o = off.getContext('2d', { willReadFrequently: true })!;
      let dh = rows * 0.94;
      let dw = (dh * ch) / cw;
      if (dw > cols * 0.96) { dw = cols * 0.96; dh = (dw * cw) / ch; }
      o.drawImage(img, (cols - dw) / 2, (rows - dh) / 2, dw, dh);
      const data = o.getImageData(0, 0, cols, rows).data;
      mask = new Float32Array(cols * rows);
      for (let i = 0; i < mask.length; i++) {
        const a = data[i * 4 + 3] / 255;
        const l = (data[i * 4] * 0.299 + data[i * 4 + 1] * 0.587 + data[i * 4 + 2] * 0.114) / 255;
        mask[i] = a * (0.42 + 0.58 * l);
      }
      readStyle();
      paintAll();
    };

    const region = () => ({
      x0: Math.floor((mouse.x - R) / cw), x1: Math.ceil((mouse.x + R) / cw),
      y0: Math.floor((mouse.y - R) / ch), y1: Math.ceil((mouse.y + R) / ch),
    });

    // Loop lokal ~30fps, hanya aktif saat kursor berada di atas logo.
    const loop = (now: number) => {
      if (!inside) return;
      raf = requestAnimationFrame(loop);
      if (now - lastT < 33) return;
      lastT = now;
      const cur = region();
      const u = dirty
        ? { x0: Math.min(dirty.x0, cur.x0), y0: Math.min(dirty.y0, cur.y0), x1: Math.max(dirty.x1, cur.x1), y1: Math.max(dirty.y1, cur.y1) }
        : cur;
      paint(u.x0, u.y0, u.x1, u.y1, true);
      dirty = cur;
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      const r = wrapEl.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
      if (!inside) {
        inside = true;
        raf = requestAnimationFrame(loop);
      }
    };
    const onLeave = () => {
      inside = false;
      cancelAnimationFrame(raf);
      if (dirty) paint(dirty.x0, dirty.y0, dirty.x1, dirty.y1, false);
      dirty = null;
    };

    img.onload = () => {
      loaded = true;
      build();
      document.fonts?.ready.then(() => { readStyle(); paintAll(); });
    };
    img.src = src;

    wrapEl.addEventListener('pointermove', onMove, { passive: true });
    wrapEl.addEventListener('pointerleave', onLeave);
    const ro = new ResizeObserver(build);
    ro.observe(wrapEl);
    const mo = new MutationObserver(() => { readStyle(); paintAll(); });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    return () => {
      cancelAnimationFrame(raf);
      wrapEl.removeEventListener('pointermove', onMove);
      wrapEl.removeEventListener('pointerleave', onLeave);
      ro.disconnect();
      mo.disconnect();
    };
  }, [src, cell]);

  return (
    <div ref={wrap} className={cn('relative aspect-square w-full', className)} role="img" aria-label="Equinox Interactive logo">
      <canvas ref={canvas} className="absolute inset-0" />
    </div>
  );
}
