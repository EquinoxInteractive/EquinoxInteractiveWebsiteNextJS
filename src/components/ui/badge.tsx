import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva('inline-flex items-center gap-1.5 border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors', {
  variants: {
    variant: {
      default: 'border-primary bg-primary text-primary-foreground',
      outline: 'border-border bg-background/60 text-foreground backdrop-blur-md',
      muted: 'border-border bg-muted text-muted-foreground',
    },
  },
  defaultVariants: { variant: 'outline' },
});

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
