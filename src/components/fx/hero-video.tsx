'use client';
import { useEffect, useRef, useState } from 'react';

/**
 * Video latar yang hemat: tidak dimuat di layar kecil / hemat data / reduced-motion,
 * dan otomatis pause saat hero tidak terlihat atau tab tidak aktif.
 */
export default function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
    const ok =
      window.matchMedia('(min-width: 1024px)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches &&
      !nav.connection?.saveData;
    setEnabled(ok);
  }, []);

  useEffect(() => {
    const v = ref.current;
    if (!enabled || !v) return;
    let visible = true;
    const sync = () => (visible && !document.hidden ? v.play().catch(() => {}) : v.pause());
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; sync(); }, { threshold: 0.05 });
    io.observe(v);
    document.addEventListener('visibilitychange', sync);
    return () => { io.disconnect(); document.removeEventListener('visibilitychange', sync); };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <video ref={ref} autoPlay loop muted playsInline preload="metadata" aria-hidden
      className="absolute inset-0 h-full w-full object-cover opacity-[0.16]">
      <source src="/bg.mp4" type="video/mp4" />
    </video>
  );
}
