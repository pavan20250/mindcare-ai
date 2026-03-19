'use client';

import type { InputHTMLAttributes } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface ProfileFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  fieldId: string;
  value: string;
  editing: boolean;
  icon?: React.ComponentType<{ className?: string }>;
  className?: string;
}

export function ProfileField({
  label,
  fieldId,
  value,
  editing,
  icon: Icon,
  className,
  ...inputProps
}: ProfileFieldProps) {
  return (
    <div className={cn('space-y-1.5', className)}>
      <Label
        htmlFor={fieldId}
        className="text-[10px] font-bold text-slate-400 uppercase tracking-widest"
      >
        {label}
      </Label>

      {editing ? (
        <Input
          id={fieldId}
          value={value}
          className="h-9 text-sm rounded-xl border-slate-200 bg-white focus-visible:border-teal-400 focus-visible:ring-teal-400/20"
          {...inputProps}
        />
      ) : (
        <div className="flex items-center gap-2 min-h-9 px-3 py-2 rounded-xl bg-slate-50/80 border border-slate-100">
          {Icon && <Icon className="size-3.5 text-slate-400 shrink-0" />}
          {value ? (
            <span className="text-sm text-slate-700 leading-snug">{value}</span>
          ) : (
            <span className="text-sm text-slate-400 italic">Not set</span>
          )}
        </div>
      )}
    </div>
  );
}

interface ProfileTextareaProps {
  label: string;
  fieldId: string;
  value: string;
  editing: boolean;
  onChange?: (v: string) => void;
  placeholder?: string;
  rows?: number;
}

export function ProfileTextarea({
  label,
  fieldId,
  value,
  editing,
  onChange,
  placeholder,
  rows = 3,
}: ProfileTextareaProps) {
  return (
    <div className="space-y-1.5">
      <Label
        htmlFor={fieldId}
        className="text-[10px] font-bold text-slate-400 uppercase tracking-widest"
      >
        {label}
      </Label>

      {editing ? (
        <textarea
          id={fieldId}
          value={value}
          rows={rows}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          className="w-full text-sm bg-white border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-400/15 resize-none placeholder:text-slate-400 text-slate-700 transition-[border-color,box-shadow]"
        />
      ) : (
        <div className="min-h-[72px] px-3 py-2.5 rounded-xl bg-slate-50/80 border border-slate-100">
          {value ? (
            <span className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">{value}</span>
          ) : (
            <span className="text-sm text-slate-400 italic">Not set</span>
          )}
        </div>
      )}
    </div>
  );
}