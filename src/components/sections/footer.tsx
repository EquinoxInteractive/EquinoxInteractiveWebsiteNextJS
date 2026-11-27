'use client';
import { navLinks, socialLinks } from '@/lib/data';
import { scrollToTarget } from '@/lib/scroll';

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border bg-background pt-16">
      <div className="container relative z-10">
        <div className="grid gap-12 md:grid-cols-3">
          <div className="text-center md:text-left">
            <div className="mb-4 flex items-center justify-center gap-3 md:justify-start">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.png" alt="Equinox Interactive" className="h-10 w-10 brightness-[.35] dark:brightness-100" />
              <span className="font-orbitron text-lg font-bold">Equinox Interactive</span>
            </div>
            <p className="italic text-muted-foreground">&quot;Games that should be games.&quot;</p>
          </div>

          <div className="text-center">
            <h4 className="mono-label mb-4">// Quick Links</h4>
            <nav className="space-y-2">
              {navLinks.map((l) => (
                <a key={l.href} href={l.href} onClick={(e) => { e.preventDefault(); scrollToTarget(l.href); }}
                  className="block text-muted-foreground transition-all hover:tracking-[0.15em] hover:text-foreground">{l.label}</a>
              ))}
            </nav>
          </div>

          <div className="text-center md:text-right">
            <h4 className="mono-label mb-4">// Connect</h4>
            <div className="flex items-center justify-center gap-3 md:justify-end">
              {socialLinks.map((s) => (
                <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.name}
                  className="flex h-10 w-10 items-center justify-center border border-border text-muted-foreground transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground">
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current"><path d={s.path} /></svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-border py-6 text-center">
          <p className="font-mono text-xs text-muted-foreground">© 2026 Equinox Interactive. All rights reserved.</p>
        </div>
      </div>
      <div aria-hidden className="pointer-events-none select-none text-center font-orbitron text-[19vw] font-black uppercase leading-[0.8] text-foreground/[0.07]">Equinox</div>
    </footer>
  );
}
