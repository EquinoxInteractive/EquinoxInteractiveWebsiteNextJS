'use client';
import { useCallback, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

const GLYPHS = '█▓▒░<>/\\[]{}=+*#%&01';

/** Efek decode huruf acak -> teks asli (gaya terminal). */
export function scramble(el: HTMLElement, finalText: string, duration = 900) {
  const start = performance.now();
  let raf = 0;
  const step = (now: number) => {
    const p = Math.min(1, (now - start) / duration);
    const reveal = Math.floor(p * finalText.length);
    let out = '';
    for (let i = 0; i < finalText.length; i++) {
      const c = finalText[i];
      out += c === ' ' || i < reveal ? c : GLYPHS[(Math.random() * GLYPHS.length) | 0];
    }
    el.textContent = out;
    if (p < 1) raf = requestAnimationFrame(step);
    else el.textContent = finalText;
  };
  raf = requestAnimationFrame(step);
  return () => cancelAnimationFrame(raf);
}

interface Props {
  text: string;
  className?: string;
  as?: 'span' | 'h2' | 'h3' | 'p';
  /** jalankan saat hover */
  onHover?: boolean;
  /** jalankan saat masuk viewport */
  onView?: boolean;
  duration?: number;
}

export default function ScrambleText({ text, className, as: Tag = 'span', onHover = true, onView = true, duration = 900 }: Props) {
  const ref = useRef<HTMLElement>(null);
  const stop = useRef<(() => void) | null>(null);

  const run = useCallback(() => {
    if (!ref.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    stop.current?.();
    stop.current = scramble(ref.current, text, duration);
  }, [text, duration]);

  useEffect(() => {
    if (!onView || !ref.current) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          run();
          io.disconnect();
        }
      },
      { threshold: 0.6 },
    );
    io.observe(ref.current);
    return () => {
      io.disconnect();
      stop.current?.();
    };
  }, [onView, run]);

  const Comp = Tag as 'span';
  return (
    <Comp ref={ref as React.RefObject<HTMLSpanElement>} className={cn(className)} onMouseEnter={onHover ? run : undefined} aria-label={text}>
      {text}
    </Comp>
  );
}
