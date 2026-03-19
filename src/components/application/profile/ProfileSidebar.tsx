'use client';

import { Clock, Shield, Activity, Heart, Calendar, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { calcCompletion, type Profile } from './Types';

interface StatRowProps {
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
  label: string;
  value: string;
}

function StatRow({ icon: Icon, iconColor, label, value }: StatRowProps) {
  return (
    <div className="flex items-center gap-3 py-2.5 px-3 rounded-xl hover:bg-slate-50 transition-colors">
      <div className={`flex size-7 shrink-0 items-center justify-center rounded-lg bg-slate-50 border border-slate-100 ${iconColor}`}>
        <Icon className="size-3.5" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wide leading-none">
          {label}
        </p>
        <p className="text-[13px] font-semibold text-slate-700 mt-0.5 leading-tight truncate">
          {value}
        </p>
      </div>
    </div>
  );
}

const QUICK_LINKS = [
  { label: 'Care plan',       href: '/care',         icon: Heart,    color: 'text-rose-500' },
  { label: 'Appointments',    href: '/appointments', icon: Calendar, color: 'text-blue-500' },
  { label: 'Clinical intake', href: '/demo',         icon: Activity, color: 'text-teal-600' },
  { label: 'Account settings', href: '/settings',   icon: Shield,   color: 'text-slate-500' },
] as const;

interface ProfileSidebarProps {
  profile: Profile;
  memberSince: string;
  intake: boolean;
}

export function ProfileSidebar({ profile, memberSince, intake }: ProfileSidebarProps) {
  const completion = calcCompletion(profile);

  return (
    <div className="space-y-4 lg:sticky lg:top-6 h-fit">
      {/* Overview stats */}
      <Card className="rounded-2xl border-slate-100 bg-white shadow-[0_1px_12px_rgba(15,23,42,0.04)]">
        <CardContent className="p-4">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 px-1">
            Overview
          </p>
          <div className="space-y-0.5">
            <StatRow icon={Clock}    iconColor="text-teal-600"    label="Member since"     value={memberSince} />
            <StatRow icon={Shield}   iconColor="text-emerald-600" label="Account status"   value="Active" />
            <StatRow icon={Activity} iconColor="text-blue-500"    label="Profile strength" value={`${completion}% complete`} />
            <StatRow icon={Heart}    iconColor="text-rose-500"    label="Care plan"        value={intake ? 'Active' : 'Intake required'} />
          </div>
        </CardContent>
      </Card>

      {/* Quick links */}
      <Card className="rounded-2xl border-slate-100 bg-white shadow-[0_1px_12px_rgba(15,23,42,0.04)]">
        <CardContent className="p-4">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 px-1">
            Quick links
          </p>
          <div className="space-y-0.5">
            {QUICK_LINKS.map(({ label, href, icon: Icon, color }) => (
              <a
                key={href}
                href={href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-colors group"
              >
                <Icon className={`size-3.5 shrink-0 ${color}`} />
                <span className="text-[13px] text-slate-600 group-hover:text-slate-900 transition-colors flex-1 font-medium">
                  {label}
                </span>
                <ChevronRight className="size-3 text-slate-300 group-hover:text-teal-500 transition-colors" />
              </a>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* HIPAA badge */}
      <div className="flex items-start gap-3 rounded-2xl border border-teal-100 bg-teal-50/60 px-4 py-3.5">
        <Shield className="size-4 text-teal-600 shrink-0 mt-0.5" />
        <div>
          <p className="text-[12px] font-bold text-teal-700">HIPAA Compliant</p>
          <p className="text-[11px] text-teal-600/70 leading-snug mt-0.5">
            Your data is encrypted and stored securely in compliance with HIPAA regulations.
          </p>
        </div>
      </div>
    </div>
  );
}