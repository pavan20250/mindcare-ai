'use client';

import { Camera, Shield, Check, Edit3, Save } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { type Profile, getInitials, getDisplayName, calcCompletion } from './Types';

interface ProfileHeroProps {
  profile: Profile;
  email: string;
  editing: boolean;
  saved: boolean;
  memberSince: string;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
}

export function ProfileHero({
  profile,
  email,
  editing,
  saved,
  memberSince,
  onEdit,
  onSave,
  onCancel,
}: ProfileHeroProps) {
  const completion = calcCompletion(profile);
  const initials = getInitials(profile, email);
  const displayName = getDisplayName(profile, email);

  // SVG ring params
  const r = 26;
  const circ = 2 * Math.PI * r;
  const offset = circ - (completion / 100) * circ;

  return (
    <div className="relative overflow-hidden rounded-3xl bg-white border border-slate-100 shadow-[0_2px_24px_rgba(15,118,110,0.06)]">
      {/* Teal gradient band at top */}
      <div className="h-1 w-full bg-linear-to-r from-teal-500 via-emerald-400 to-cyan-500" />

      {/* Faint grid texture */}
      <div
        className="absolute inset-0 opacity-[0.018] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(15,118,110,1) 1px, transparent 1px), linear-gradient(90deg, rgba(15,118,110,1) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative flex flex-col sm:flex-row sm:items-start gap-5 p-6 sm:p-8">
        {/* Avatar with completion ring */}
        <div className="relative shrink-0 self-start">
          <svg className="absolute -inset-2 size-[calc(100%+16px)] -rotate-90" viewBox="0 0 72 72">
            <circle cx="36" cy="36" r={r} fill="none" stroke="#e2e8f0" strokeWidth="3" />
            <circle
              cx="36"
              cy="36"
              r={r}
              fill="none"
              stroke="url(#ring-grad)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={circ}
              strokeDashoffset={offset}
              style={{ transition: 'stroke-dashoffset 0.8s cubic-bezier(.4,0,.2,1)' }}
            />
            <defs>
              <linearGradient id="ring-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0d9488" />
                <stop offset="100%" stopColor="#22d3ee" />
              </linearGradient>
            </defs>
          </svg>

          <div className="flex size-16 items-center justify-center rounded-2xl bg-linear-to-r from-teal-500 to-emerald-600 text-white text-xl font-bold shadow-lg shadow-teal-500/20 border-2 border-white">
            {initials}
          </div>

          <button
            aria-label="Change photo"
            className="absolute -bottom-1 -right-1 flex size-7 items-center justify-center rounded-full bg-white border border-slate-200 shadow-sm hover:bg-slate-50 transition-colors"
          >
            <Camera className="size-3 text-slate-500" />
          </button>
        </div>

        {/* Name / meta */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-start gap-2">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight leading-tight">
              {displayName}
            </h1>

            <div className="flex gap-1.5 flex-wrap mt-0.5">
              <Badge className="text-[10px] px-2 py-0.5 bg-teal-50 text-teal-700 border border-teal-200 font-semibold shadow-none gap-1">
                <Shield className="size-2.5" /> Patient
              </Badge>
              {saved && (
                <Badge className="text-[10px] px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold shadow-none gap-1 animate-in fade-in duration-200">
                  <Check className="size-2.5" /> Saved
                </Badge>
              )}
            </div>
          </div>

          <p className="text-sm text-slate-400 mt-1">{email || 'No email'}</p>

          {profile.bio && (
            <p className="text-sm text-slate-600 mt-2 leading-relaxed max-w-lg">{profile.bio}</p>
          )}

          {/* Completion bar */}
          <div className="mt-4 max-w-xs">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-semibold text-slate-500">Profile completion</span>
              <span
                className="text-[11px] font-bold tabular-nums"
                style={{ color: completion === 100 ? '#0d9488' : '#64748b' }}
              >
                {completion}%
              </span>
            </div>
            <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
              <div
                className="h-full rounded-full bg-linear-to-r from-teal-500 to-emerald-400 transition-all duration-700 ease-out"
                style={{ width: `${completion}%` }}
              />
            </div>
            {completion < 100 && (
              <p className="text-[10px] text-slate-400 mt-1.5">
                Complete your profile to unlock all features
              </p>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 sm:self-start">
          {editing ? (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={onCancel}
                className="rounded-xl border-slate-200 text-slate-600 hover:bg-slate-50 text-xs h-8"
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={onSave}
                className="rounded-xl bg-teal-600 hover:bg-teal-700 text-white border-0 shadow-sm shadow-teal-600/20 text-xs h-8"
              >
                <Save className="size-3 mr-1.5" />
                Save changes
              </Button>
            </>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={onEdit}
              className="rounded-xl border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-teal-700 text-xs h-8"
            >
              <Edit3 className="size-3 mr-1.5" />
              Edit profile
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}