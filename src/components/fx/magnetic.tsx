'use client';
import { useRef } from 'react';
import gsap from 'gsap';

/** Elemen "tertarik" ke kursor. */
export default function Magnetic({ children, strength = 0.3, className }: { children: React.ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const move = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    gsap.to(el, { x: (e.clientX - r.left - r.width / 2) * strength, y: (e.clientY - r.top - r.height / 2) * strength, duration: 0.4, ease: 'power3.out' });
  };
  const leave = () => gsap.to(ref.current, { x: 0, y: 0, duration: 0.8, ease: 'elastic.out(1,0.4)' });
  return (
    <div ref={ref} onMouseMove={move} onMouseLeave={leave} className={className} style={{ display: 'inline-block' }}>
      {children}
    </div>
  );
}
