'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  x?: number;
  /** animasikan anak langsung secara berurutan */
  stagger?: number;
}

/** Reveal saat scroll memakai GSAP ScrollTrigger. */
export default function Reveal({ children, className, delay = 0, y = 40, x = 0, stagger }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const targets = stagger ? Array.from(el.children) : el;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { opacity: 0, y, x },
        {
          opacity: 1, y: 0, x: 0, duration: 1, delay, ease: 'power4.out', stagger: stagger ?? 0, clearProps: 'transform,opacity',
          scrollTrigger: { trigger: el, start: 'top 86%', once: true },
        },
      );
    }, el);
    return () => ctx.revert();
  }, [delay, y, x, stagger]);

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}
