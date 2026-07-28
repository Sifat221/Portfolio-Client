import * as React from 'react';
import { cn } from '../../lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'cyan' | 'indigo' | 'amber' | 'emerald' | 'outline';
}

function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  const variants = {
    default: 'bg-slate-800 text-slate-300 border-slate-700',
    cyan: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
    indigo: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30',
    amber: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
    emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    outline: 'border-slate-700 text-slate-300 bg-transparent',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full border px-3 py-1 text-xs font-mono font-semibold transition-colors',
        variants[variant],
        className
      )}
      {...props}
    />
  );
}

export { Badge };
