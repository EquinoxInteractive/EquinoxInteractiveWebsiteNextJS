import Reveal from '../fx/reveal';
import CountUp from '../fx/count-up';
import { Card } from '../ui/card';
import SectionHeader from './section-header';
import { games, teamMembers } from '@/lib/data';

/* Angka statistik dihitung otomatis dari data tim & game. */
const releasedCount = games.filter((g) => g.status === 'released').length;
const upcomingCount = games.filter((g) => g.status === 'coming-soon').length;
const stats = [
  { n: teamMembers.length, label: 'Core members' },
  { n: releasedCount, label: releasedCount === 1 ? 'Game released' : 'Games released' },
  { n: upcomingCount, label: upcomingCount === 1 ? 'Project coming soon' : 'Projects coming soon' },
];

export default function About() {
  return (
    <section id="about" className="section-pad">
      <div className="container">
        <SectionHeader index="01" tag="About" title="About Our Studio" />

        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <Reveal className="space-y-12">
            <div className="space-y-5">
              <h3 className="font-orbitron text-xl font-semibold text-primary">Our Story</h3>
              <p className="leading-relaxed text-muted-foreground">
                Equinox Interactive Started in <span className="font-semibold text-foreground">April 2025</span> with our first project,
                <span className="font-semibold text-foreground"> &quot;Box Siege&quot;</span>. What began as a simple idea has grown into something we&apos;re truly proud of.
              </p>
              <p className="leading-relaxed text-muted-foreground">
                With <span className="font-semibold text-foreground">3 core members</span>, we may be small, but we&apos;re driven by passion and a shared vision to create games that matter.
              </p>
              <p className="leading-relaxed text-muted-foreground">
                We started as a simple school project soon grew into something more Equinox Interactive emerged with a clear ambition: to build games that are not only polished and purposeful, but also fresh and original.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {[
                { t: 'Our Vision', i: '01', p: 'To be a creative hub for game developers to bring bold, imaginative ideas to life' },
                { t: 'Our Mission', i: '02', p: 'To challenge the monotony of mainstream gaming by delivering original and meaningful experiences.' },
              ].map((c) => (
                <Card key={c.t} className="brackets group p-6 transition-colors duration-500 hover:bg-muted">
                  <span className="font-mono text-xs text-muted-foreground">/{c.i}</span>
                  <h3 className="mb-3 mt-3 font-orbitron text-xl font-semibold">{c.t}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{c.p}</p>
                </Card>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.15} className="space-y-6">
            <Card className="brackets scanlines relative overflow-hidden">
              <div className="flex items-center gap-2 border-b border-border px-4 py-3">
                <span className="h-2.5 w-2.5 bg-border" /><span className="h-2.5 w-2.5 bg-accent" /><span className="h-2.5 w-2.5 bg-primary" />
                <span className="ml-3 font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground">studio.log</span>
              </div>
              <pre className="overflow-x-auto p-5 font-mono text-[12px] leading-7 text-muted-foreground sm:text-[13px]">
{`> studio.init
`}<span className="text-foreground">founded</span>{`        : April 2025
`}<span className="text-foreground">first_project</span>{`  : Box Siege
`}<span className="text-foreground">core_members</span>{`   : 3
`}<span className="text-foreground">origin</span>{`         : school project
`}<span className="text-primary">{`> ready`}</span><span className="ml-1 inline-block h-3.5 w-2 animate-blink bg-primary align-middle" />
              </pre>
            </Card>

            <div className="grid grid-cols-3 gap-px border border-border bg-border">
              {stats.map((s) => (
                <div key={s.label} className="bg-card p-4 sm:p-5">
                  <div className="font-orbitron text-3xl font-black sm:text-4xl"><CountUp to={s.n} /></div>
                  <p className="mt-2 font-mono text-[9px] uppercase leading-snug tracking-[0.18em] text-muted-foreground sm:text-[10px]">{s.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
