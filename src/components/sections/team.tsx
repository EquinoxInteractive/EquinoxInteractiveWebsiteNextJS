'use client';
import { useRef } from 'react';
import Image, { type StaticImageData } from 'next/image';
import { Globe } from 'lucide-react';
import gsap from 'gsap';
import { teamMembers, GITHUB_PATH, type TeamMember } from '@/lib/data';
import Reveal from '../fx/reveal';
import ScrambleText from '../fx/scramble-text';
import SectionHeader from './section-header';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import badutzy from '@/assets/BadutZY.jpg';
import swimmingfox from '@/assets/SwimmingFOX.jpg';
import ari8bit from '@/assets/Ari.jpg';

const photos: Record<string, StaticImageData> = { BadutZY: badutzy, SwimmingFox: swimmingfox, Ari8Bit: ari8bit };

type LinkKind = 'github' | 'website';
const kinds: LinkKind[] = ['github', 'website'];
const label: Record<LinkKind, string> = { github: 'GitHub', website: 'Website' };

const KindIcon = ({ kind, className }: { kind: LinkKind; className?: string }) =>
  kind === 'github' ? (
    <svg viewBox="0 0 24 24" className={`fill-current ${className ?? ''}`} aria-hidden><path d={GITHUB_PATH} /></svg>
  ) : (
    <Globe className={className} aria-hidden />
  );

/** Handle singkat dari link: github -> nama akun, website -> domain. */
function handleOf(links: TeamMember['links']) {
  try {
    if (links.github) return '@' + new URL(links.github).pathname.split('/').filter(Boolean)[0];
    if (links.website) return new URL(links.website).hostname.replace(/^www\./, '');
  } catch {}
  return '';
}

function MemberCard({ m, i }: { m: TeamMember; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const active = kinds.filter((k) => m.links[k]);

  const move = (e: React.MouseEvent) => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    const r = ref.current!.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5, py = (e.clientY - r.top) / r.height - 0.5;
    gsap.to(ref.current, { rotateY: px * 10, rotateX: -py * 10, duration: 0.5, ease: 'power3.out', transformPerspective: 900 });
  };
  const leave = () => gsap.to(ref.current, { rotateX: 0, rotateY: 0, duration: 0.8, ease: 'power3.out' });

  return (
    <div ref={ref} onMouseMove={move} onMouseLeave={leave} className="brackets group relative border border-border bg-card p-3 will-change-transform">
      <div className="relative aspect-square overflow-hidden bg-muted">
        <Image src={photos[m.name]} alt={m.name} fill sizes="(min-width:768px) 33vw, 100vw"
          className="object-cover grayscale contrast-110 transition-all duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0" />
        <span className="absolute left-3 top-3 bg-background/80 px-2 py-1 font-mono text-[10px] tracking-[0.25em]">0{i + 1}</span>

        {/* Overlay hover: hanya ikon untuk link yang diisi (perangkat dengan hover) */}
        {active.length > 0 && (
          <div className="absolute inset-0 hidden items-center justify-center gap-4 bg-background/75 opacity-0 transition-opacity duration-500 focus-within:opacity-100 group-hover:opacity-100 [@media(hover:hover)]:flex">
            {active.map((k) => (
              <Tooltip key={k}>
                <TooltipTrigger asChild>
                  <a href={m.links[k]} target="_blank" rel="noopener noreferrer" aria-label={`${m.name} — ${label[k]}`} data-cursor={label[k].toUpperCase()}
                    className="flex h-16 w-16 items-center justify-center border border-primary bg-background text-foreground transition-all duration-300 hover:-translate-y-1 hover:bg-primary hover:text-primary-foreground">
                    <KindIcon kind={k} className="h-7 w-7" />
                  </a>
                </TooltipTrigger>
                <TooltipContent>{label[k]}</TooltipContent>
              </Tooltip>
            ))}
          </div>
        )}
      </div>

      <div className="px-2 pb-3 pt-5">
        <h3 className="font-orbitron text-xl font-bold"><ScrambleText text={m.name} onView={false} /></h3>
        <p className="mt-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">{m.role}</p>
        <div className="mt-3 flex items-center justify-between gap-3">
          <span className="truncate font-mono text-[10px] text-muted-foreground">{handleOf(m.links)}</span>
          {/* Perangkat sentuh (tanpa hover): ikon selalu terlihat di bawah kartu */}
          <div className="flex gap-2 [@media(hover:hover)]:hidden">
            {active.map((k) => (
              <a key={k} href={m.links[k]} target="_blank" rel="noopener noreferrer" aria-label={`${m.name} — ${label[k]}`}
                className="flex h-9 w-9 items-center justify-center border border-border text-muted-foreground transition-colors active:bg-primary active:text-primary-foreground">
                <KindIcon kind={k} className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Team() {
  return (
    <section id="team" className="section-pad border-y border-border bg-card/30">
      <div className="container">
        <SectionHeader index="02" tag="Team" title="Meet The Team" sub="The passionate minds behind Equinox Interactive" />
        <Reveal stagger={0.15} className="grid gap-6 md:grid-cols-3 lg:gap-8">
          {teamMembers.map((m, i) => (
            <MemberCard key={m.name} m={m} i={i} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
