import type Lenis from 'lenis';

/** Shared Lenis instance so any component can drive the smooth scroll. */
let instance: Lenis | null = null;

export const setLenis = (l: Lenis | null) => {
  instance = l;
};
export const getLenis = () => instance;

const NAV_OFFSET = 72;

export function scrollToTarget(target: string | number, immediate = false) {
  if (typeof window === 'undefined') return;
  const el = typeof target === 'string' ? document.querySelector<HTMLElement>(target) : null;
  const top = typeof target === 'number' ? target : el ? el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET : null;
  if (top === null) return;
  const lenis = getLenis();
  if (lenis) lenis.scrollTo(Math.max(0, top), { duration: immediate ? 0 : 1.4, easing: (t: number) => 1 - Math.pow(1 - t, 4) });
  else window.scrollTo({ top: Math.max(0, top), behavior: immediate ? 'auto' : 'smooth' });
}
