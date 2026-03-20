'use client';

import { Shield, Check, Edit3, Save, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { type Profile, getInitials, calcCompletion } from './Types';

interface ProfileHeroProps {
  profile:      Profile;
  displayName:  string;   // from Supabase auth metadata (full_name)
  email:        string;   // from Supabase auth
  role:         string;   // from user_roles.role
  memberSince:  string;   // formatted from user_roles.created_at
  editing:      boolean;
  saved:        boolean;
  saving?:      boolean;
  onEdit:   () => void;
  onSave:   () => void;
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
        <radialGradient id={`${id}-s`} cx="40%" cy="28%" r="55%">
          <stop offset="0%"   stopColor="rgba(255,255,255,0.32)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)"    />
        </radialGradient>
      </defs>
      <circle cx="40" cy="40" r="40" fill={`url(#${id}-g)`} />
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
      <circle cx="40" cy="40" r="40" fill={`url(#${id}-s)`} />
    </svg>
  );
}

function roleLabel(role: string): string {
  if (role === 'superadmin') return 'Superadmin';
  if (role === 'admin')      return 'Admin';
  return 'Patient';
}

export function ProfileHero({
  profile,
  displayName,
  email,
  role,
  memberSince,
  editing,
  saved,
  saving = false,
  onEdit,
  onSave,
  onCancel,
}: ProfileHeroProps) {
  const completion = calcCompletion(profile);
  const initials   = getInitials(profile, email);

  const r    = 46;
  const circ = 2 * Math.PI * r;
  const dash = circ - (completion / 100) * circ;

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/60 bg-white/60 backdrop-blur-[28px] backdrop-saturate-[2.0] shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_8px_32px_rgba(99,102,241,0.08),0_2px_8px_rgba(0,0,0,0.05)]">

      {/* Specular top edge */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent from-5% via-white/90 to-transparent to-95%" />
      {/* Teal accent band */}
      <div className="absolute inset-x-0 top-0 h-[3px] bg-linear-to-r from-teal-500 via-emerald-400 to-cyan-400 rounded-t-3xl" />
      {/* Ambient glow */}
      <div className="pointer-events-none absolute -left-12 -top-12 h-56 w-56 rounded-full bg-teal-400/8 blur-3xl" />

      <div className="relative flex flex-col sm:flex-row sm:items-start gap-6 p-6 sm:p-8 pt-8">

        {/* Avatar + ring */}
        <div className="relative shrink-0 self-start">
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
            <circle cx="60" cy="60" r={r} fill="none" stroke="rgba(203,213,225,0.4)" strokeWidth="2.5" />
            {completion > 0 && (
              <circle
                cx="60" cy="60" r={r}
                fill="none" stroke="url(#ring-fill)"
                strokeWidth="2.5" strokeLinecap="round"
                strokeDasharray={circ} strokeDashoffset={dash}
                style={{ transition: 'stroke-dashoffset 1s cubic-bezier(.4,0,.2,1)' }}
              />
            )}
          </svg>

          <div className="size-20 rounded-full overflow-hidden ring-[2.5px] ring-white shadow-[0_4px_20px_rgba(0,0,0,0.12),0_1px_6px_rgba(13,148,136,0.15)]">
            <Avatar initials={initials} name={displayName} />
          </div>

          {completion === 100 && (
            <div className="absolute -bottom-0.5 -right-0.5 flex size-5 items-center justify-center rounded-full bg-teal-500 border-2 border-white shadow">
              <Check className="size-2.5 text-white" strokeWidth={3} />
            </div>
          )}
        </div>

        {/* Identity — all from DB */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h1 className="text-xl font-semibold text-slate-900 tracking-tight leading-tight">
              {displayName || email.split('@')[0]}
            </h1>
            <div className="flex gap-1.5 flex-wrap">
              {/* Role from user_roles table */}
              <Badge className="text-[10px] px-2 py-0.5 bg-teal-50/80 text-teal-700 border border-teal-200/60 font-semibold shadow-none gap-1">
                <Shield className="size-2.5" />
                {roleLabel(role)}
              </Badge>
              {saved && (
                <Badge className="text-[10px] px-2 py-0.5 bg-emerald-50/80 text-emerald-700 border border-emerald-200/60 font-semibold shadow-none gap-1 animate-in fade-in duration-200">
                  <Check className="size-2.5" /> Saved
                </Badge>
              )}
            </div>
          </div>

          {/* Email from Supabase auth */}
          <p className="text-sm text-slate-500">{email}</p>

          {/* Member since from user_roles.created_at */}
          <p className="text-xs text-slate-400 mt-0.5">{memberSince}</p>

          {profile.bio && (
            <p className="text-sm text-slate-500 mt-3 leading-relaxed max-w-md italic">
              "{profile.bio}"
            </p>
          )}

          {/* Profile strength */}
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

        {/* Actions */}
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
                size="sm" onClick={onSave} disabled={saving}
                className="rounded-xl bg-teal-600 hover:bg-teal-700 text-white border-0 text-xs h-8 shadow-sm shadow-teal-600/20 disabled:opacity-60"
              >
                <Save className="size-3 mr-1" />
                {saving ? 'Saving…' : 'Save'}
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