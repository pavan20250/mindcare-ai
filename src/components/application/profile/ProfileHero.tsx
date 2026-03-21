'use client';

import { Shield, Check, Edit3, Save, Sparkles, MapPin, Mail, CalendarDays } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { type Profile, getInitials, calcCompletion } from './Types';

interface ProfileHeroProps {
  profile:     Profile;
  displayName: string;
  email:       string;
  role:        string;
  memberSince: string;
  editing:     boolean;
  saved:       boolean;
  saving?:     boolean;
  onEdit:      () => void;
  onSave:      () => void;
  onCancel:    () => void;
}

function stringToHue(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = str.charCodeAt(i) + ((h << 5) - h);
  return Math.abs(h) % 360;
}

function Avatar({ initials, name }: { initials: string; name: string }) {
  const h1 = stringToHue(name || 'u');
  const h2 = (h1 + 38) % 360;
  const id = `av${h1}`;
  return (
    <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
      <defs>
        <linearGradient id={`${id}g`} x1="0" y1="0" x2="72" y2="72" gradientUnits="userSpaceOnUse">
          <stop stopColor={`hsl(${h1},52%,60%)`} />
          <stop offset="1" stopColor={`hsl(${h2},58%,45%)`} />
        </linearGradient>
        <radialGradient id={`${id}s`} cx="36%" cy="24%" r="50%">
          <stop stopColor="rgba(255,255,255,0.24)" />
          <stop offset="1" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
      </defs>
      <circle cx="36" cy="36" r="36" fill={`url(#${id}g)`} />
      <text x="36" y="36" textAnchor="middle" dominantBaseline="central"
        fill="rgba(255,255,255,0.95)"
        fontSize={initials.length > 1 ? 18 : 22}
        fontWeight="400"
        fontFamily="system-ui,-apple-system,sans-serif"
        style={{ userSelect: 'none', letterSpacing: '0.5px' }}>
        {initials}
      </text>
      <circle cx="36" cy="36" r="36" fill={`url(#${id}s)`} />
    </svg>
  );
}

const ROLE_MAP: Record<string, { label: string; color: string }> = {
  superadmin: { label: 'Superadmin', color: '#7c3aed' },
  admin:      { label: 'Admin',      color: '#b45309' },
  user:       { label: 'Patient',    color: '#0f766e' },
};

export function ProfileHero({
  profile, displayName, email, role, memberSince,
  editing, saved, saving = false,
  onEdit, onSave, onCancel,
}: ProfileHeroProps) {
  const completion = calcCompletion(profile);
  const initials   = getInitials(profile, email);
  const rc         = ROLE_MAP[role] ?? ROLE_MAP.user;
  const name       = displayName || email.split('@')[0];

  return (
    <div className="relative overflow-hidden rounded-2xl bg-white/60 border border-slate-200/60 backdrop-blur-2xl shadow-sm">

      {/* Very subtle inner top highlight */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/80" />

      <div className="px-6 py-5">
        <div className="flex items-start gap-5">

          {/* ── Avatar ── */}
          <div className="relative shrink-0 mt-0.5">
            <div className="rounded-full overflow-hidden ring-2 ring-white shadow-md shadow-black/10">
              <Avatar initials={initials} name={name} />
            </div>
            {/* tiny active dot */}
            <span className="absolute bottom-0.5 right-0.5 block size-3 rounded-full bg-emerald-400 ring-2 ring-white" />
          </div>

          {/* ── Info ── */}
          <div className="flex-1 min-w-0 space-y-3">

            {/* Name row */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h1 className="text-[1.1rem] font-semibold tracking-tight text-slate-900 leading-none">
                  {name}
                </h1>

                {/* Role chip */}
                <span
                  className="inline-flex items-center gap-1 rounded-full px-2 py-[3px] text-[10px] font-semibold border leading-none"
                  style={{
                    color: rc.color,
                    background: `${rc.color}12`,
                    borderColor: `${rc.color}30`,
                  }}
                >
                  <Shield className="size-[9px]" />
                  {rc.label}
                </span>

                {saved && (
                  <span className="inline-flex items-center gap-1 rounded-full px-2 py-[3px] text-[10px] font-semibold leading-none text-emerald-700 bg-emerald-50 border border-emerald-200/60 animate-in fade-in duration-300">
                    <Check className="size-[9px]" strokeWidth={3} /> Saved
                  </span>
                )}
              </div>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-x-3.5 gap-y-0.5">
                <span className="flex items-center gap-1 text-[11.5px] text-slate-400">
                  <Mail className="size-3 shrink-0 text-slate-300" />
                  {email}
                </span>
                {memberSince && (
                  <span className="flex items-center gap-1 text-[11.5px] text-slate-400">
                    <CalendarDays className="size-3 shrink-0 text-slate-300" />
                    {memberSince.replace('Member since ', '')}
                  </span>
                )}
                {profile.address && (
                  <span className="flex items-center gap-1 text-[11.5px] text-slate-400">
                    <MapPin className="size-3 shrink-0 text-slate-300" />
                    {profile.address.split(',')[0]}
                  </span>
                )}
              </div>
            </div>

            {/* Bio */}
            {profile.bio && (
              <p className="text-[12.5px] leading-relaxed text-slate-500 max-w-lg">
                {profile.bio}
              </p>
            )}

            {/* ── Progress ── */}
            <div className="flex items-center gap-2.5 pt-0.5">
              <div className="flex items-center gap-1 text-[10.5px] text-slate-400 shrink-0">
                <Sparkles className="size-2.5 text-teal-500" />
                Profile strength
              </div>

              {/* Single clean bar */}
              <div className="flex-1 max-w-40 h-1 rounded-full bg-slate-100 overflow-hidden">
                <div
                  className="h-full rounded-full bg-linear-to-r from-teal-500 to-emerald-400 transition-all duration-700 ease-out"
                  style={{ width: `${completion}%` }}
                />
              </div>

              <span className="text-[10.5px] font-medium tabular-nums text-slate-400 shrink-0">
                {completion}%
              </span>
            </div>

          </div>

          {/* ── Actions ── */}
          <div className="shrink-0 self-start">
            {editing ? (
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={onCancel}
                  className="h-8 rounded-lg border-slate-200 bg-white text-slate-600 hover:bg-slate-50 text-xs px-3 shadow-none">
                  Cancel
                </Button>
                <Button size="sm" onClick={onSave} disabled={saving}
                  className="h-8 rounded-lg bg-teal-600 hover:bg-teal-700 text-white border-0 text-xs px-3.5 shadow-sm shadow-teal-600/20 disabled:opacity-60">
                  <Save className="size-3 mr-1.5" />
                  {saving ? 'Saving…' : 'Save'}
                </Button>
              </div>
            ) : (
              <Button variant="outline" size="sm" onClick={onEdit}
                className="h-8 rounded-lg border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-teal-700 hover:border-teal-200 text-xs px-3 shadow-none transition-colors">
                <Edit3 className="size-3 mr-1.5" />
                Edit profile
              </Button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}