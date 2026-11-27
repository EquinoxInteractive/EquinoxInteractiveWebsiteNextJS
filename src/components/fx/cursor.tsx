'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

/** Cursor cincin halus; hanya aktif pada perangkat dengan pointer presisi. */
export default function Cursor() {
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    const el = ring.current!;
    const qx = gsap.quickTo(el, 'x', { duration: 0.35, ease: 'power3.out' });
    const qy = gsap.quickTo(el, 'y', { duration: 0.35, ease: 'power3.out' });
    const move = (e: MouseEvent) => {
      el.style.opacity = '1';
      qx(e.clientX);
      qy(e.clientY);
    };
    const over = (e: MouseEvent) => {
      const t = (e.target as HTMLElement).closest('a, button, [data-cursor]') as HTMLElement | null;
      const text = t?.dataset.cursor ?? (t ? '' : null);
      gsap.to(el.firstElementChild, { scale: t ? 1.9 : 1, duration: 0.35, ease: 'power3.out' });
      if (label.current) label.current.textContent = text ?? '';
    };
    const leave = () => (el.style.opacity = '0');
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', over);
    document.documentElement.addEventListener('mouseleave', leave);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
      document.documentElement.removeEventListener('mouseleave', leave);
    };
  }, []);

  return (
    <div ref={ring} className="pointer-events-none fixed left-0 top-0 z-[100] hidden will-change-transform opacity-0 transition-opacity duration-300 [@media(pointer:fine)]:block">
      <div className="-ml-3 -mt-3 flex h-6 w-6 items-center justify-center rounded-full border border-primary">
        <span ref={label} className="font-mono text-[6px] uppercase tracking-widest text-white" />
      </div>
    </div>
  );
}
