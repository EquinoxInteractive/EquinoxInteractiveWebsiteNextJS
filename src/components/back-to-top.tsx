'use client';
import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { scrollToTarget } from '@/lib/scroll';
import { cn } from '@/lib/utils';

export default function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > 500);
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  return (
    <button onClick={() => scrollToTarget(0)} aria-label="Back to top" data-cursor="TOP"
      className={cn('fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center border border-primary bg-background/80 text-foreground backdrop-blur transition-all duration-500 hover:bg-primary hover:text-primary-foreground',
        show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0')}>
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}
