'use client';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const LINES = [
  '> EQUINOX_INTERACTIVE // boot sequence',
  '> loading assets ............ ok',
  '> mounting canvas ........... ok',
  '> small team. big dreams.',
];

declare global {
  interface Window {
    __eqReady?: boolean;
  }
}

export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);
  const [pct, setPct] = useState(0);
  const [lines, setLines] = useState(0);

  useEffect(() => {
    const finish = () => {
      window.__eqReady = true;
      window.dispatchEvent(new Event('equinox:ready'));
      document.documentElement.style.overflow = '';
      setDone(true);
    };
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      finish();
      return;
    }
    document.documentElement.style.overflow = 'hidden';
    const obj = { v: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(root.current, {
          clipPath: 'inset(0 0 100% 0)',
          duration: 0.9,
          ease: 'power4.inOut',
          onStart: () => {
            window.__eqReady = true;
            window.dispatchEvent(new Event('equinox:ready'));
          },
          onComplete: finish,
        });
      },
    });
    tl.to(obj, { v: 100, duration: 1.9, ease: 'power2.inOut', onUpdate: () => {
      setPct(Math.round(obj.v));
      setLines(Math.min(LINES.length, Math.floor(obj.v / 26) + 1));
    } });
    return () => {
      tl.kill();
      document.documentElement.style.overflow = '';
    };
  }, []);

  if (done) return null;
  return (
    <div ref={root} className="fixed inset-0 z-[110] flex flex-col items-center justify-center bg-background px-6" style={{ clipPath: 'inset(0 0 0% 0)' }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logo.png" alt="" className="h-20 w-20 animate-floaty dark:brightness-100 brightness-[.35]" />
      <div className="mt-8 w-full max-w-md font-mono text-xs leading-relaxed text-muted-foreground">
        {LINES.slice(0, lines).map((l) => (
          <p key={l} className={l.includes('small team') ? 'text-foreground' : undefined}>{l}</p>
        ))}
        <span className="inline-block h-3 w-2 animate-blink bg-primary align-middle" />
      </div>
      <div className="mt-8 w-full max-w-md">
        <div className="h-px w-full bg-border">
          <div className="h-px bg-primary" style={{ width: `${pct}%` }} />
        </div>
        <div className="mt-3 flex justify-between font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
          <span>Loading</span>
          <span className="tabular-nums text-foreground">{String(pct).padStart(3, '0')}%</span>
        </div>
      </div>
    </div>
  );
}
