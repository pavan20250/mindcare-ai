import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ProfileSectionProps {
  icon: React.ComponentType<{ className?: string }>;
  iconColor?: string;
  iconBg?: string;
  label: string;
  description?: string;
  badge?: ReactNode;
  children: ReactNode;
  className?: string;
  accentColor?: string;
}

export function ProfileSection({
  icon: Icon,
  iconColor = 'text-teal-600',
  iconBg = 'bg-teal-50/80',
  label,
  description,
  badge,
  children,
  className,
  accentColor = 'from-teal-500 to-emerald-400',
}: ProfileSectionProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-3xl border border-white/60 bg-white/60 backdrop-blur-[28px] backdrop-saturate-[2.0]',
        'shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_4px_24px_rgba(99,102,241,0.06),0_1px_4px_rgba(0,0,0,0.04)]',
        className
      )}
    >
      {/* Top catch-light */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent from-5% via-white/90 to-transparent to-95%" />

      {/* Corner glow */}
      <div className="pointer-events-none absolute -left-6 -top-6 h-28 w-28 rounded-full bg-white/40 blur-2xl" />

      {/* Section accent line */}
      <div className={cn('absolute inset-x-0 top-0 h-0.5 bg-linear-to-r opacity-60', accentColor)} />

      <div className="relative p-5 sm:p-6">
        {/* Section header */}
        <div className="flex items-start justify-between gap-3 mb-5 pb-4 border-b border-white/50">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                'flex size-9 items-center justify-center rounded-xl border border-white/70 shadow-sm',
                iconBg,
                iconColor,
              )}
            >
              <Icon className="size-4" />
            </div>
            <div>
              <h2 className="text-[13px] font-bold text-slate-800 leading-tight">{label}</h2>
              {description && (
                <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">{description}</p>
              )}
            </div>
          </div>
          {badge}
        </div>

        {children}
      </div>
    </div>
  );
}