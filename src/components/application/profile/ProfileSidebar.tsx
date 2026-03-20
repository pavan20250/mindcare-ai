'use client';

import { Clock, Shield, Activity, Heart, Calendar, ChevronRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { calcCompletion, type Profile } from './Types';

interface StatRowProps {
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
  iconBg: string;
  label: string;
  value: string;
  valueColor?: string;
}

function StatRow({ icon: Icon, iconColor, iconBg, label, value, valueColor = 'text-slate-700' }: StatRowProps) {
  return (
    <div className="flex items-center gap-3 py-2.5 px-3 rounded-xl hover:bg-white/40 transition-colors">
      <div className={`flex size-7 shrink-0 items-center justify-center rounded-lg border border-white/70 ${iconBg} ${iconColor}`}>
        <Icon className="size-3.5" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wide leading-none">
          {label}
        </p>
        <p className={`text-[13px] font-semibold mt-0.5 leading-tight truncate ${valueColor}`}>
          {value}
        </p>
      </div>
    </div>
  );
}

const QUICK_LINKS = [
  { label: 'Care plan',         href: '/care',         icon: Heart,     color: 'text-rose-500',   bg: 'bg-rose-50/80'   },
  { label: 'Appointments',      href: '/appointments', icon: Calendar,  color: 'text-blue-500',   bg: 'bg-blue-50/80'   },
  { label: 'Clinical intake',   href: '/demo',         icon: Activity,  color: 'text-teal-600',   bg: 'bg-teal-50/80'   },
  { label: 'Account settings',  href: '/settings',     icon: Shield,    color: 'text-slate-500',  bg: 'bg-slate-50/80'  },
] as const;

interface ProfileSidebarProps {
  profile:     Profile;
  memberSince: string;
  role?:       string;
  intake:      boolean;
}

function GlassCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-2xl border border-white/60 bg-white/55 backdrop-blur-[28px] backdrop-saturate-[2.0] shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_4px_24px_rgba(99,102,241,0.06),0_1px_4px_rgba(0,0,0,0.04)] ${className}`}>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent from-5% via-white/90 to-transparent to-95%" />
      <div className="pointer-events-none absolute -left-4 -top-4 h-20 w-20 rounded-full bg-white/40 blur-xl" />
      <div className="relative p-4">{children}</div>
    </div>
  );
}

export function ProfileSidebar({ profile, memberSince, role = 'user', intake }: ProfileSidebarProps) {
  const completion = calcCompletion(profile);

  return (
    <div className="space-y-4 lg:sticky lg:top-6 h-fit">
      {/* Overview stats */}
      <GlassCard>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 px-1">
          Overview
        </p>
        <div className="space-y-0.5">
          <StatRow icon={Clock}    iconColor="text-teal-600"    iconBg="bg-teal-50/80"    label="Member since"     value={memberSince.replace('Member since ', '')} />
          <StatRow icon={Shield}   iconColor="text-emerald-600"  iconBg="bg-emerald-50/80" label="Role"             value={role === 'superadmin' ? 'Superadmin' : role === 'admin' ? 'Admin' : 'Patient'} valueColor="text-emerald-600" />
          <StatRow icon={Activity} iconColor="text-blue-500"   iconBg="bg-blue-50/80"    label="Profile strength" value={`${completion}% complete`} valueColor={completion === 100 ? 'text-teal-600' : 'text-slate-700'} />
          <StatRow
            icon={intake ? CheckCircle2 : AlertCircle}
            iconColor={intake ? 'text-teal-600' : 'text-amber-500'}
            iconBg={intake ? 'bg-teal-50/80' : 'bg-amber-50/80'}
            label="Care plan"
            value={intake ? 'Active' : 'Intake required'}
            valueColor={intake ? 'text-teal-600' : 'text-amber-600'}
          />
        </div>
      </GlassCard>

      {/* Quick links */}
      <GlassCard>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 px-1">
          Quick links
        </p>
        <div className="space-y-0.5">
          {QUICK_LINKS.map(({ label, href, icon: Icon, color, bg }) => (
            <a
              key={href}
              href={href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/50 transition-all group"
            >
              <div className={`flex size-7 shrink-0 items-center justify-center rounded-lg border border-white/70 ${bg} ${color}`}>
                <Icon className="size-3.5" />
              </div>
              <span className="text-[13px] text-slate-600 group-hover:text-slate-900 transition-colors flex-1 font-medium leading-tight">
                {label}
              </span>
              <ChevronRight className="size-3 text-slate-300 group-hover:text-teal-500 transition-colors" />
            </a>
          ))}
        </div>
      </GlassCard>

      {/* HIPAA badge */}
      <div className="relative overflow-hidden flex items-start gap-3 rounded-2xl border border-teal-200/50 bg-teal-50/60 backdrop-blur-sm px-4 py-3.5">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-rfrom-transparent via-teal-300/40 to-transparent" />
        <div className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-teal-100/80 border border-teal-200/60">
          <Shield className="size-4 text-teal-600" />
        </div>
        <div>
          <p className="text-[12px] font-bold text-teal-700">HIPAA Compliant</p>
          <p className="text-[11px] text-teal-600/70 leading-snug mt-0.5">
            Your data is encrypted and stored securely per HIPAA regulations.
          </p>
        </div>
      </div>
    </div>
  );
}