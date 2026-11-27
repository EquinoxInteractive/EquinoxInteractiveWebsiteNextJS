import Reveal from '../fx/reveal';
import ScrambleText from '../fx/scramble-text';

export default function SectionHeader({ index, tag, title, sub }: { index: string; tag: string; title: string; sub?: string }) {
  return (
    <Reveal className="mb-14 md:mb-20">
      <div className="mb-5 flex items-center gap-4">
        <span className="font-mono text-xs text-primary">{index}</span>
        <span className="h-px w-12 bg-border" />
        <span className="mono-label">{tag}</span>
      </div>
      <h2 className="section-title"><ScrambleText as="span" text={title} duration={1100} /></h2>
      {sub && <p className="mt-5 max-w-xl text-muted-foreground">{sub}</p>}
    </Reveal>
  );
}
