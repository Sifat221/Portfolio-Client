import * as React from 'react';
import { cn } from '../../lib/utils';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'secondary' | 'gradient';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center rounded-xl font-semibold text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 disabled:pointer-events-none disabled:opacity-50 active:scale-95';

    const variants = {
      default:
        'bg-slate-800 text-white hover:bg-slate-700 border border-slate-700',
      gradient:
        'bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white hover:from-cyan-400 hover:to-indigo-500 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40',
      outline:
        'border border-slate-700 bg-transparent text-slate-300 hover:bg-slate-800/80 hover:text-white hover:border-cyan-500/40',
      secondary:
        'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/20',
      ghost: 'hover:bg-slate-800/60 text-slate-300 hover:text-white',
    };

    const sizes = {
      default: 'h-10 px-5 py-2',
      sm: 'h-8 px-3 text-xs',
      lg: 'h-12 px-7 text-base',
      icon: 'h-10 w-10 p-2',
    };

    return (
      <button
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button };
