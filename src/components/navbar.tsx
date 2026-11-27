'use client';
import { useEffect, useState } from 'react';
import { Menu } from 'lucide-react';
import { navLinks } from '@/lib/data';
import { scrollToTarget } from '@/lib/scroll';
import { cn } from '@/lib/utils';
import ThemeToggle from './theme-toggle';
import ScrambleText from './fx/scramble-text';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from './ui/sheet';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState('#home');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let last = 0;
    const on = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > 140 && y > last);
      last = y;
    };
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(`#${e.target.id}`)),
      { rootMargin: '-45% 0px -50% 0px' },
    );
    navLinks.forEach((l) => {
      const el = document.querySelector(l.href);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  const go = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setOpen(false);
    setTimeout(() => scrollToTarget(href), open ? 250 : 0);
  };

  return (
    <header className={cn('fixed inset-x-0 top-0 z-[60] transition-transform duration-500', hidden && '-translate-y-full')}>
      <div className="container pt-3">
        <nav className={cn('flex h-14 items-center justify-between border px-3 transition-all duration-500 md:px-4',
          scrolled ? 'border-border bg-background/95' : 'border-transparent bg-transparent')}>
          <a href="#home" onClick={(e) => go(e, '#home')} className="group flex min-w-0 items-center gap-3" data-cursor="HOME">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="Equinox Interactive" className="h-8 w-8 shrink-0 transition-transform duration-500 group-hover:rotate-[8deg] group-hover:scale-110 brightness-[.35] dark:brightness-100" />
            <span className="truncate font-orbitron text-sm font-bold sm:text-base">
              <span className="sm:hidden">Equinox</span>
              <span className="hidden sm:inline">Equinox Interactive</span>
            </span>
          </a>

          <div className="hidden items-center md:flex">
            {navLinks.map((l, i) => (
              <a key={l.href} href={l.href} onClick={(e) => go(e, l.href)} data-active={active === l.href} className="nav-pill-link">
                <span className="mr-1.5 text-muted-foreground/60">0{i}</span>
                <ScrambleText text={l.label} onView={false} />
                <span className={cn('absolute inset-x-4 -bottom-0.5 h-px origin-left bg-primary transition-transform duration-500', active === l.href ? 'scale-x-100' : 'scale-x-0')} />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <button className="flex h-10 w-10 items-center justify-center border border-border md:hidden" aria-label="Open menu">
                  <Menu className="h-5 w-5" />
                </button>
              </SheetTrigger>
              <SheetContent>
                <SheetTitle className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">// navigation</SheetTitle>
                <SheetDescription className="sr-only">Site navigation</SheetDescription>
                <div className="mt-10 flex flex-1 flex-col gap-1">
                  {navLinks.map((l, i) => (
                    <SheetClose asChild key={l.href}>
                      <a href={l.href} onClick={(e) => go(e, l.href)}
                        className={cn('group flex items-baseline gap-4 border-b border-border py-5 font-orbitron text-3xl font-bold transition-colors hover:text-primary', active === l.href ? 'text-foreground' : 'text-muted-foreground')}>
                        <span className="font-mono text-xs text-muted-foreground">0{i}</span>
                        {l.label}
                      </a>
                    </SheetClose>
                  ))}
                </div>
                <p className="mono-label">Small Team. Big Dreams.</p>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </header>
  );
}
