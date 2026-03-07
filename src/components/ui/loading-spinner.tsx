import { cn } from '@/lib/utils';

type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type SpinnerVariant = 'primary' | 'muted' | 'inverted';

const sizeClasses: Record<SpinnerSize, string> = {
  xs: 'size-3',
  sm: 'size-4',
  md: 'size-7',
  lg: 'size-8',
  xl: 'size-9',
};

const variantClasses: Record<SpinnerVariant, string> = {
  primary: 'border-teal-500 border-t-transparent',
  muted: 'border-slate-300/80 border-t-transparent',
  inverted: 'border-white border-t-transparent',
};

export interface LoadingSpinnerProps {
  size?: SpinnerSize;
  variant?: SpinnerVariant;
  className?: string;
}

export function LoadingSpinner({ size = 'md', variant = 'primary', className }: LoadingSpinnerProps) {
  return (
    <div
      aria-hidden="true"
      className={cn('inline-block rounded-full animate-spin border-2', sizeClasses[size], variantClasses[variant], className)}
    />
  );
}

