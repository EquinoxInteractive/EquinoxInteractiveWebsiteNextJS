'use client';
import { useEffect, useRef, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const btn = useRef<HTMLButtonElement>(null);
  useEffect(() => setMounted(true), []);
  const isDark = resolvedTheme === 'dark';

  const toggle = async () => {
    const next = isDark ? 'light' : 'dark';
    const doc = document as Document & { startViewTransition?: (cb: () => void) => { ready: Promise<void> } };
    if (!doc.startViewTransition || !btn.current) return setTheme(next);
    const r = btn.current.getBoundingClientRect();
    const x = r.left + r.width / 2, y = r.top + r.height / 2;
    const end = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    const tr = doc.startViewTransition(() => setTheme(next));
    try {
      await tr.ready;
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${end}px at ${x}px ${y}px)`] },
        { duration: 700, easing: 'cubic-bezier(0.22,1,0.36,1)', pseudoElement: '::view-transition-new(root)' },
      );
    } catch {}
  };

  return (
    <button ref={btn} type="button" onClick={toggle} aria-label="Toggle theme" data-cursor="THEME"
      className="relative flex h-10 w-10 items-center justify-center border border-border text-foreground transition-colors hover:border-primary hover:bg-muted">
      {mounted && (
        <>
          <Sun className={`absolute h-4 w-4 transition-all duration-500 ${isDark ? 'rotate-0 scale-100 opacity-100' : 'rotate-90 scale-0 opacity-0'}`} />
          <Moon className={`absolute h-4 w-4 transition-all duration-500 ${isDark ? '-rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'}`} />
        </>
      )}
    </button>
  );
}
