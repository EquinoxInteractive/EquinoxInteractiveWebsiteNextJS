'use client';
import { Bar, BarChart, Cell, LabelList, ResponsiveContainer, XAxis, YAxis } from 'recharts';

/** Chart kecil (recharts); angkanya dihitung otomatis dari `games` di src/lib/data.ts. */
export default function PipelineChart({ released, comingSoon }: { released: number; comingSoon: number }) {
  const data = [
    { name: 'Released', value: released },
    { name: 'Coming Soon', value: comingSoon },
  ];
  const max = Math.max(released, comingSoon, 1);
  return (
    <div className="h-28 w-full" aria-label={`Project pipeline: ${released} released, ${comingSoon} coming soon`}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ left: 0, right: 24, top: 0, bottom: 0 }} barCategoryGap={10}>
          <XAxis type="number" hide domain={[0, max + 1]} />
          <YAxis type="category" dataKey="name" width={96} axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11, fontFamily: 'var(--font-mono)' }} />
          <Bar dataKey="value" radius={0} animationDuration={1400}>
            {data.map((d, i) => (
              <Cell key={d.name} fill={i === 0 ? 'hsl(var(--primary))' : 'hsl(var(--accent))'} />
            ))}
            <LabelList dataKey="value" position="right" fill="hsl(var(--foreground))" fontSize={12} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
