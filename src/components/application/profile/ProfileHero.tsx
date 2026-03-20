'use client';

import { Shield, Check, Edit3, Save, Sparkles } from 'lucide-react';
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

function stringToHue(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash) % 360;
}

function Avatar({ initials, name }: { initials: string; name: string }) {
  const hue  = stringToHue(name || 'user');
  const hue2 = (hue + 35) % 360;
  const id   = `av-${hue}`;

  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`${id}-g`} x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor={`hsl(${hue},  60%, 55%)`} />
          <stop offset="100%" stopColor={`hsl(${hue2}, 65%, 42%)`} />
        </linearGradient>
        {/* Soft inner glow at top — mimics the card's specular sheen language */}
        <radialGradient id={`${id}-s`} cx="40%" cy="28%" r="55%">
          <stop offset="0%"   stopColor="rgba(255,255,255,0.32)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)"    />
        </radialGradient>
      </defs>

      {/* Background */}
      <circle cx="40" cy="40" r="40" fill={`url(#${id}-g)`} />

      {/* Initials */}
      <text
        x="40" y="40"
        textAnchor="middle"
        dominantBaseline="central"
        fill="rgba(255,255,255,0.95)"
        fontSize={initials.length === 1 ? '28' : '22'}
        fontWeight="500"
        fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', system-ui, sans-serif"
        letterSpacing="1"
        style={{ userSelect: 'none' }}
      >
        {initials}
      </text>

      {/* Glass sheen */}
      <circle cx="40" cy="40" r="40" fill={`url(#${id}-s)`} />
    </svg>
  );
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
  const completion  = calcCompletion(profile);
  const initials    = getInitials(profile, email);
  const displayName = getDisplayName(profile, email);

  const r    = 46;
  const circ = 2 * Math.PI * r;
  const dash = circ - (completion / 100) * circ;

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/60 bg-white/60 backdrop-blur-[28px] backdrop-saturate-[2.0] shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_8px_32px_rgba(99,102,241,0.08),0_2px_8px_rgba(0,0,0,0.05)]">

      {/* Top specular line — matches Card component */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent from-5% via-white/90 to-transparent to-95%" />

      {/* Teal accent band */}
      <div className="absolute inset-x-0 top-0 h-[3px] bg-linear-to-r from-teal-500 via-emerald-400 to-cyan-400 rounded-t-3xl" />

      {/* Ambient glow */}
      <div className="pointer-events-none absolute -left-12 -top-12 h-56 w-56 rounded-full bg-teal-400/8 blur-3xl" />

      <div className="relative flex flex-col sm:flex-row sm:items-start gap-6 p-6 sm:p-8 pt-8">

        {/* ── Avatar + completion ring ── */}
        <div className="relative shrink-0 self-start">

          {/* Completion ring */}
          <svg
            className="absolute -rotate-90 pointer-events-none"
            style={{ inset: '-10px', width: 'calc(100% + 20px)', height: 'calc(100% + 20px)' }}
            viewBox="0 0 120 120"
          >
            <defs>
              <linearGradient id="ring-fill" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%"   stopColor="#0d9488" />
                <stop offset="100%" stopColor="#22d3ee" />
              </linearGradient>
            </defs>
            {/* Track */}
            <circle cx="60" cy="60" r={r} fill="none" stroke="rgba(203,213,225,0.4)" strokeWidth="2.5" />
            {/* Progress */}
            {completion > 0 && (
              <circle
                cx="60" cy="60" r={r}
                fill="none"
                stroke="url(#ring-fill)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray={circ}
                strokeDashoffset={dash}
                style={{ transition: 'stroke-dashoffset 1s cubic-bezier(.4,0,.2,1)' }}
              />
            )}
          </svg>

          {/* Avatar */}
          <div className="size-20 rounded-full overflow-hidden ring-[2.5px] ring-white shadow-[0_4px_20px_rgba(0,0,0,0.12),0_1px_6px_rgba(13,148,136,0.15)]">
            <Avatar initials={initials} name={displayName} />
          </div>

          {/* Complete badge */}
          {completion === 100 && (
            <div className="absolute -bottom-0.5 -right-0.5 flex size-5 items-center justify-center rounded-full bg-teal-500 border-2 border-white shadow">
              <Check className="size-2.5 text-white" strokeWidth={3} />
            </div>
          )}
        </div>

        {/* ── Identity ── */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-0.5">
            <h1 className="text-xl font-semibold text-slate-900 tracking-tight leading-tight">
              {displayName}
            </h1>
            <div className="flex gap-1.5 flex-wrap">
              <Badge className="text-[10px] px-2 py-0.5 bg-teal-50/80 text-teal-700 border border-teal-200/60 font-semibold shadow-none gap-1">
                <Shield className="size-2.5" /> Patient
              </Badge>
              {saved && (
                <Badge className="text-[10px] px-2 py-0.5 bg-emerald-50/80 text-emerald-700 border border-emerald-200/60 font-semibold shadow-none gap-1 animate-in fade-in duration-200">
                  <Check className="size-2.5" /> Saved
                </Badge>
              )}
            </div>
          </div>

          <p className="text-sm text-slate-400">{email || 'No email'}</p>
          <p className="text-xs text-slate-400/70 mt-0.5">Member since {memberSince}</p>

          {profile.bio && (
            <p className="text-sm text-slate-600 mt-3 leading-relaxed max-w-md italic">
              "{profile.bio}"
            </p>
          )}

          {/* Completion bar */}
          <div className="mt-5 max-w-[260px]">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
                <Sparkles className="size-3 text-teal-500" />
                Profile strength
              </span>
              <span className="text-[11px] font-semibold tabular-nums text-slate-500">
                {completion}%
              </span>
            </div>
            <div className="h-1.5 rounded-full bg-slate-100/80 overflow-hidden">
              <div
                className="h-full rounded-full bg-linear-to-r from-teal-500 to-emerald-400 transition-all duration-700 ease-out"
                style={{ width: `${completion}%` }}
              />
            </div>
          </div>
        </div>

        {/* ── Actions ── */}
        <div className="flex gap-2 sm:self-start shrink-0">
          {editing ? (
            <>
              <Button
                variant="outline" size="sm" onClick={onCancel}
                className="rounded-xl border-white/60 bg-white/40 text-slate-600 hover:bg-white/60 text-xs h-8"
              >
                Cancel
              </Button>
              <Button
                size="sm" onClick={onSave}
                className="rounded-xl bg-teal-600 hover:bg-teal-700 text-white border-0 text-xs h-8 shadow-sm shadow-teal-600/20"
              >
                <Save className="size-3 mr-1" /> Save
              </Button>
            </>
          ) : (
            <Button
              variant="outline" size="sm" onClick={onEdit}
              className="rounded-xl border-white/60 bg-white/40 text-slate-600 hover:bg-white/60 hover:text-teal-700 text-xs h-8"
            >
              <Edit3 className="size-3 mr-1" /> Edit profile
            </Button>
          )}
        </div>

      </div>
    </div>
  );
}