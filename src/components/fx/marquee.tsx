import { cn } from '@/lib/utils';

/** Ticker teks tak berujung. Berisi frasa yang sudah ada di website. */
export default function Marquee({ items, className, reverse }: { items: string[]; className?: string; reverse?: boolean }) {
  const row = [...items, ...items];
  return (
    <div className={cn('relative overflow-hidden border-y border-border bg-card/40 py-4', className)} aria-hidden>
      <div className={cn('flex w-max animate-marquee gap-10 whitespace-nowrap', reverse && '[animation-direction:reverse]')}>
        {[0, 1].map((k) => (
          <div key={k} className="flex gap-10">
            {row.map((t, i) => (
              <span key={`${k}-${i}`} className="flex items-center gap-10 font-orbitron text-sm uppercase tracking-[0.35em] text-muted-foreground md:text-base">
                {t}
                <span className="font-mono text-primary">/\</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
