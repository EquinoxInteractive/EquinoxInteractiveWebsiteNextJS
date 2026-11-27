import { ArrowUpRight } from 'lucide-react';
import { socialLinks } from '@/lib/data';
import Reveal from '../fx/reveal';
import ScrambleText from '../fx/scramble-text';
import SectionHeader from './section-header';

export default function Contact() {
  return (
    <section id="contact" className="section-pad border-t border-border bg-card/30">
      <div className="container">
        <SectionHeader index="04" tag="Contact" title="Our Social Media" sub="Stay connected and follow our journey" />
        <Reveal stagger={0.12} className="grid gap-6 md:grid-cols-3">
          {socialLinks.map((s, i) => (
            <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" data-cursor="OPEN"
              className="brackets group relative flex min-h-[240px] flex-col justify-between overflow-hidden border border-border bg-card p-7 transition-all duration-500 hover:-translate-y-1.5 hover:bg-primary hover:text-primary-foreground">
              <div className="flex items-start justify-between">
                <svg viewBox="0 0 24 24" className="h-9 w-9 fill-current transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6" aria-hidden><path d={s.path} /></svg>
                <ArrowUpRight className="h-5 w-5 opacity-50 transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100" />
              </div>
              <div>
                <span className="font-mono text-[10px] tracking-[0.25em] opacity-60">0{i + 1}</span>
                <h3 className="mt-1 font-orbitron text-2xl font-bold"><ScrambleText text={s.name} onView={false} /></h3>
                <p className="mt-1 font-mono text-xs opacity-70">{s.handle}</p>
                <p className="mt-3 text-sm opacity-70">{s.description}</p>
              </div>
            </a>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
