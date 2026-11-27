'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function CountUp({ to, pad = 2 }: { to: number; pad?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = ref.current;
    if (!el) return;
    const obj = { v: 0 };
    const fmt = () => (el.textContent = String(Math.round(obj.v)).padStart(pad, '0'));
    fmt();
    const tween = gsap.to(obj, { v: to, duration: 1.6, ease: 'power3.out', onUpdate: fmt, scrollTrigger: { trigger: el, start: 'top 90%', once: true } });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [to, pad]);
  return <span ref={ref}>{String(to).padStart(pad, '0')}</span>;
}
