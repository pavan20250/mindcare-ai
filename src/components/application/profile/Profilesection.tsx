import type { ReactNode } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface ProfileSectionProps {
  icon: React.ComponentType<{ className?: string }>;
  iconColor?: string;
  label: string;
  description?: string;
  badge?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function ProfileSection({
  icon: Icon,
  iconColor = 'text-teal-600',
  label,
  description,
  badge,
  children,
  className,
}: ProfileSectionProps) {
  return (
    <Card className={cn('rounded-2xl border-slate-100 bg-white shadow-[0_1px_12px_rgba(15,23,42,0.04)]', className)}>
      <CardContent className="p-5 sm:p-6">
        {/* Section header */}
        <div className="flex items-start justify-between gap-3 mb-5 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                'flex size-8 items-center justify-center rounded-xl bg-slate-50 border border-slate-100',
                iconColor,
              )}
            >
              <Icon className="size-4" />
            </div>
            <div>
              <h2 className="text-[13px] font-bold text-slate-800 leading-tight">{label}</h2>
              {description && (
                <p className="text-[11px] text-slate-400 mt-0.5">{description}</p>
              )}
            </div>
          </div>
          {badge}
        </div>

        {children}
      </CardContent>
    </Card>
  );
}