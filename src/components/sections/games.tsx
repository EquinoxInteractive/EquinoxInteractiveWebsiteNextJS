import Image from 'next/image';
import { ExternalLink, Gamepad2, Tag, Users, type LucideIcon } from 'lucide-react';
import { games, type Game } from '@/lib/data';
import Reveal from '../fx/reveal';
import ScrambleText from '../fx/scramble-text';
import Magnetic from '../fx/magnetic';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import PipelineChart from './pipeline-chart';
import SectionHeader from './section-header';

const tagIcons: Record<string, LucideIcon> = { PvP: Gamepad2, 'Co-Op': Users };

function Description({ text, highlight }: { text: string; highlight?: string }) {
  const i = highlight ? text.indexOf(highlight) : -1;
  if (!highlight || i < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <span className="font-semibold text-foreground">{highlight}</span>
      {text.slice(i + highlight.length)}
    </>
  );
}

function GameCard({ game, priority }: { game: Game; priority?: boolean }) {
  return (
    <article className="brackets group grid overflow-hidden border border-border bg-card lg:grid-cols-[1.35fr_1fr]">
      <div className="relative aspect-video overflow-hidden bg-muted lg:aspect-auto lg:min-h-[420px]">
        {game.image && (
          <Image src={game.image} alt={game.imageAlt ?? game.title} fill priority={priority} sizes="(min-width:1024px) 60vw, 100vw"
            className="object-cover grayscale-[.35] transition-all duration-[1200ms] ease-out group-hover:scale-105 group-hover:grayscale-0" />
        )}
        <div className="scanlines absolute inset-0" />
        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
          <Badge><span className="h-1.5 w-1.5 animate-pulse bg-primary" />Featured</Badge>
          {game.platform && <Badge variant="default">{game.platform}</Badge>}
        </div>
      </div>

      <div className="flex flex-col justify-between p-6 md:p-8">
        <div>
          {game.tags && game.tags.length > 0 && (
            <div className="mb-5 flex flex-wrap gap-2">
              {game.tags.map((label) => {
                const Icon = tagIcons[label] ?? Tag;
                return (
                  <Badge key={label} variant="muted" className="normal-case tracking-wider"><Icon size={12} />{label}</Badge>
                );
              })}
            </div>
          )}
          <h3 className="font-orbitron text-4xl font-black leading-none lg:text-5xl">
            <ScrambleText text={game.title} />
          </h3>
          {game.description && (
            <p className="mt-5 leading-relaxed text-muted-foreground"><Description text={game.description} highlight={game.highlight} /></p>
          )}
          {game.url && (
            <div className="mt-8">
              <Magnetic>
                <Button asChild data-cursor="PLAY">
                  <a href={game.url} target="_blank" rel="noopener noreferrer">Play Now <ExternalLink size={15} /></a>
                </Button>
              </Magnetic>
            </div>
          )}
        </div>

        {((game.technologies?.length ?? 0) > 0 || (game.meta?.length ?? 0) > 0) && (
          <div className="mt-10 space-y-4 border-t border-border pt-5">
            {game.technologies && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="mono-label mr-1">Built with</span>
                {game.technologies.map((t) => (
                  <span key={t} className="border border-border bg-muted px-2.5 py-1 font-mono text-[11px] text-foreground">{t}</span>
                ))}
              </div>
            )}
            {game.meta && (
              <div className="flex flex-wrap gap-x-6 gap-y-1 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                {game.meta.map((m) => (
                  <span key={m.label}><span className="text-foreground">{m.value}</span> · {m.label}</span>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

export default function Games() {
  const released = games.filter((g) => g.status === 'released');
  const upcoming = games.filter((g) => g.status === 'coming-soon');

  return (
    <section id="portfolio" className="section-pad">
      <div className="container">
        <SectionHeader index="03" tag="Portfolio" title="Our Games" sub="Crafted with passion. Explore the worlds we've built." />

        <div className="space-y-6">
          {released.map((g, i) => (
            <Reveal key={g.slug}>
              <GameCard game={g} priority={i === 0} />
            </Reveal>
          ))}
        </div>

        <Reveal stagger={0.15} className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {upcoming.map((g) => (
            <div key={g.slug} className="group relative flex aspect-video items-center justify-center overflow-hidden border border-dashed border-border bg-muted/30 transition-colors duration-500 hover:border-primary">
              <span aria-hidden className="absolute inset-0 select-none overflow-hidden break-all p-3 font-mono text-[10px] leading-3 text-muted-foreground/15 transition-colors duration-500 group-hover:text-muted-foreground/40">
                {'01/\\#<>[]{}+*=%&'.repeat(40)}
              </span>
              <div className="relative text-center">
                <p className="mono-label transition-colors group-hover:text-foreground">{g.title}</p>
                <p className="mt-2 font-orbitron text-2xl font-bold text-foreground/50 transition-colors group-hover:text-foreground">
                  <ScrambleText text="Coming Soon" onView={false} />
                </p>
              </div>
            </div>
          ))}
          <div className="flex flex-col justify-between border border-border bg-card p-5">
            <span className="mono-label">// pipeline</span>
            <PipelineChart released={released.length} comingSoon={upcoming.length} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
