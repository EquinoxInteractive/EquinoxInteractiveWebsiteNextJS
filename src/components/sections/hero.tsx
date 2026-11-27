'use client';
import { useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import gsap from 'gsap';
import HeroVideo from '../fx/hero-video';
import AsciiLogo from '../fx/ascii-logo';
import Magnetic from '../fx/magnetic';
import Marquee from '../fx/marquee';
import { Button } from '../ui/button';
import { scrollToTarget } from '@/lib/scroll';

const Chars = ({ text }: { text: string }) => (
  <span className="inline-block" aria-label={text}>
    {text.split('').map((c, i) => (
      <span key={i} className="hero-char inline-block" aria-hidden>{c === ' ' ? '\u00A0' : c}</span>
    ))}
  </span>
);

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
      if (reduced) return;
      gsap.set('.hero-char', { yPercent: 110, opacity: 0 });
      gsap.set('.hero-fade', { opacity: 0, y: 24 });
      gsap.set('.hero-art', { opacity: 0, scale: 0.94 });
      const play = () => {
        const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
        tl.to('.hero-char', { yPercent: 0, opacity: 1, duration: 1.1, stagger: 0.035 })
          .to('.hero-art', { opacity: 1, scale: 1, duration: 1.4 }, 0.1)
          .to('.hero-fade', { opacity: 1, y: 0, duration: 0.9, stagger: 0.12 }, 0.5);
      };
      if (window.__eqReady) play();
      else window.addEventListener('equinox:ready', play, { once: true });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="home" ref={root} className="relative flex min-h-[100svh] flex-col overflow-hidden">
      <HeroVideo />

      <div className="container relative z-10 grid flex-1 items-center gap-8 pb-24 pt-28 lg:grid-cols-[1.1fr_0.9fr] lg:gap-4">
        <div className="order-2 text-center lg:order-1 lg:text-left">
          <p className="hero-fade mono-label mb-6">// indie game studio · est. 2025</p>
          <h1 className="font-orbitron text-5xl font-black leading-[1.02] sm:text-6xl xl:text-7xl">
            <span className="block overflow-hidden pb-1 text-foreground/40"><Chars text="Small Team." /></span>
            <span className="block overflow-hidden pb-2"><Chars text="Big Dreams." /></span>
          </h1>
          <p className="hero-fade mx-auto mt-8 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg lg:mx-0">
            Equinox Interactive is where game developers thrive bringing bold ideas to life and reshaping what games can be.
          </p>
          <div className="hero-fade mt-10 flex flex-col items-center gap-4 sm:flex-row lg:justify-start justify-center">
            <Magnetic><Button onClick={() => scrollToTarget('#portfolio')} data-cursor="GO">View Portfolio</Button></Magnetic>
            <Magnetic><Button variant="outline" onClick={() => scrollToTarget('#contact')} data-cursor="GO">Contact Us</Button></Magnetic>
          </div>
        </div>

        <div className="hero-art order-1 mx-auto w-full max-w-[280px] sm:max-w-[380px] lg:order-2 lg:max-w-[520px]">
          <AsciiLogo cell={10} />
        </div>
      </div>

      <button onClick={() => scrollToTarget('#about')} aria-label="Scroll to about section"
        className="hero-fade absolute bottom-24 left-1/2 z-10 hidden -translate-x-1/2 animate-floaty flex-col items-center gap-1 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground transition-colors hover:text-foreground md:flex">
        scroll <ChevronDown className="h-4 w-4" />
      </button>
      <Marquee className="relative z-10" items={['Small Team.', 'Big Dreams.', 'Games that should be games.', 'Equinox Interactive']} />
    </section>
  );
}
