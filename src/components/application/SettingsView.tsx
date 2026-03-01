'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  User,
  Mail,
  Phone,
  Calendar,
  Bell,
  BellOff,
  Shield,
  LogOut,
  Save,
  Check,
  AlertTriangle,
  ChevronRight,
  CreditCard,
  KeyRound,
  Download,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const STORAGE_KEY = 'neuralcare_profile';
const NOTIF_KEY = 'neuralcare_notifications';

interface Profile {
  firstName: string;
  lastName: string;
  phone: string;
  dateOfBirth: string;
  emergencyContact: string;
}

interface NotificationPrefs {
  appointmentReminders: boolean;
  careUpdates: boolean;
  wellnessTips: boolean;
  emailDigest: boolean;
}

const DEFAULT_PROFILE: Profile = {
  firstName: '',
  lastName: '',
  phone: '',
  dateOfBirth: '',
  emergencyContact: '',
};

const DEFAULT_NOTIFS: NotificationPrefs = {
  appointmentReminders: true,
  careUpdates: true,
  wellnessTips: true,
  emailDigest: false,
};

type Tab = 'profile' | 'notifications' | 'security' | 'account';

const TABS: { id: Tab; label: string; icon: typeof User }[] = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'account', label: 'Account', icon: KeyRound },
];

function readProfile(): Profile {
  if (typeof window === 'undefined') return DEFAULT_PROFILE;
  try {
    return { ...DEFAULT_PROFILE, ...JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}') };
  } catch {
    return DEFAULT_PROFILE;
  }
}

function readNotifs(): NotificationPrefs {
  if (typeof window === 'undefined') return DEFAULT_NOTIFS;
  try {
    return { ...DEFAULT_NOTIFS, ...JSON.parse(localStorage.getItem(NOTIF_KEY) ?? '{}') };
  } catch {
    return DEFAULT_NOTIFS;
  }
}

function Toggle({
  checked,
  onChange,
  label,
  description,
  icon: Icon,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  description: string;
  icon: typeof Bell;
}) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className="w-full flex items-center gap-3 py-2.5 px-3 rounded-lg text-left hover:bg-slate-50/80 transition-colors"
    >
      <div
        className={`flex size-8 shrink-0 items-center justify-center rounded-lg transition-colors ${
          checked ? 'bg-teal-50 text-teal-600' : 'bg-slate-100 text-slate-400'
        }`}
      >
        <Icon className="size-4" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-medium text-slate-700">{label}</p>
        <p className="text-[11px] text-slate-400 leading-snug">{description}</p>
      </div>
      <div
        className={`relative w-9 h-5 rounded-full transition-colors shrink-0 ${
          checked ? 'bg-teal-600' : 'bg-slate-200'
        }`}
      >
        <div
          className={`absolute top-0.5 size-4 rounded-full bg-white shadow-sm transition-transform ${
            checked ? 'translate-x-4' : 'translate-x-0.5'
          }`}
        />
      </div>
    </button>
  );
}

export function SettingsView() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>('profile');
  const [email, setEmail] = useState('');
  const [profile, setProfile] = useState<Profile>(DEFAULT_PROFILE);
  const [notifs, setNotifs] = useState<NotificationPrefs>(DEFAULT_NOTIFS);
  const [saved, setSaved] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    fetch('/api/auth/session', { credentials: 'include' })
      .then((r) => r.json())
      .then((data) => setEmail(data.user?.email ?? ''))
      .catch(() => {});
    setProfile(readProfile());
    setNotifs(readNotifs());
  }, []);

  const handleProfileChange = useCallback(
    (field: keyof Profile, value: string) => {
      setProfile((prev) => ({ ...prev, [field]: value }));
      setSaved(false);
    },
    [],
  );

  const handleNotifChange = useCallback(
    (field: keyof NotificationPrefs, value: boolean) => {
      setNotifs((prev) => {
        const next = { ...prev, [field]: value };
        localStorage.setItem(NOTIF_KEY, JSON.stringify(next));
        return next;
      });
    },
    [],
  );

  const handleSave = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }, [profile]);

  const handleSignOut = useCallback(async () => {
    await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
    router.replace('/login');
    router.refresh();
  }, [router]);

  const initials =
    profile.firstName && profile.lastName
      ? `${profile.firstName[0]}${profile.lastName[0]}`.toUpperCase()
      : email
        ? email[0].toUpperCase()
        : '?';

  const displayName =
    profile.firstName && profile.lastName
      ? `${profile.firstName} ${profile.lastName}`
      : email || 'New user';

  return (
    <div className="min-h-full bg-[#f8fafb]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-8">
        {/* Header with user summary */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex size-12 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-emerald-600 text-white text-base font-bold shadow-sm shadow-teal-500/20">
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="text-lg font-extrabold text-slate-900 tracking-tight">Settings</h1>
            <div className="flex items-center gap-1.5">
              <Mail className="size-3 text-slate-400" />
              <p className="text-[12px] text-slate-400 truncate">{email}</p>
            </div>
          </div>
          <Badge className="text-[9px] px-2 py-0.5 bg-teal-50 text-teal-700 border border-teal-200 font-bold shadow-none hidden sm:flex gap-1">
            <Shield className="size-2.5" />
            HIPAA Compliant
          </Badge>
        </div>

        {/* Tab navigation + content */}
        <div className="flex flex-col lg:flex-row gap-5">
          {/* Sidebar tabs */}
          <nav className="lg:w-48 shrink-0">
            <div className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-1 lg:pb-0">
              {TABS.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-[13px] font-medium whitespace-nowrap transition-all ${
                    activeTab === id
                      ? 'bg-teal-50 text-teal-700 border border-teal-200/60 shadow-sm'
                      : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'
                  }`}
                >
                  <Icon className="size-4" />
                  {label}
                </button>
              ))}
            </div>
          </nav>

          {/* Content area */}
          <div className="flex-1 min-w-0">
            {activeTab === 'profile' && (
              <Card className="rounded-xl border-slate-200/60 bg-white shadow-sm">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <h2 className="text-sm font-bold text-slate-900">Personal Information</h2>
                      <p className="text-[11px] text-slate-400 mt-0.5">Update your details used across NeuralCare.</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {saved && (
                        <span className="flex items-center gap-1 text-[11px] text-emerald-600 font-medium">
                          <Check className="size-3" />
                          Saved
                        </span>
                      )}
                      <Button
                        size="sm"
                        onClick={handleSave}
                        className="rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-semibold border-0 shadow-sm shadow-teal-600/15 text-xs h-8 px-3.5"
                      >
                        <Save className="size-3.5 mr-1" />
                        Save
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3.5">
                    <div className="space-y-1">
                      <Label htmlFor="firstName" className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
                        First name
                      </Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-slate-400" />
                        <Input
                          id="firstName"
                          value={profile.firstName}
                          onChange={(e) => handleProfileChange('firstName', e.target.value)}
                          placeholder="Jane"
                          className="pl-9 h-9 text-sm rounded-lg border-slate-200 bg-white focus-visible:ring-teal-500/30 focus-visible:border-teal-400"
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="lastName" className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
                        Last name
                      </Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-slate-400" />
                        <Input
                          id="lastName"
                          value={profile.lastName}
                          onChange={(e) => handleProfileChange('lastName', e.target.value)}
                          placeholder="Doe"
                          className="pl-9 h-9 text-sm rounded-lg border-slate-200 bg-white focus-visible:ring-teal-500/30 focus-visible:border-teal-400"
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="email" className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
                        Email
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-slate-400" />
                        <Input
                          id="email"
                          value={email}
                          disabled
                          className="pl-9 h-9 text-sm rounded-lg border-slate-200 bg-slate-50 text-slate-500"
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="phone" className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
                        Phone
                      </Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-slate-400" />
                        <Input
                          id="phone"
                          type="tel"
                          value={profile.phone}
                          onChange={(e) => handleProfileChange('phone', e.target.value)}
                          placeholder="(555) 123-4567"
                          className="pl-9 h-9 text-sm rounded-lg border-slate-200 bg-white focus-visible:ring-teal-500/30 focus-visible:border-teal-400"
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="dob" className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
                        Date of birth
                      </Label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-slate-400" />
                        <Input
                          id="dob"
                          type="date"
                          value={profile.dateOfBirth}
                          onChange={(e) => handleProfileChange('dateOfBirth', e.target.value)}
                          className="pl-9 h-9 text-sm rounded-lg border-slate-200 bg-white focus-visible:ring-teal-500/30 focus-visible:border-teal-400"
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="emergency" className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
                        Emergency contact
                      </Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-slate-400" />
                        <Input
                          id="emergency"
                          value={profile.emergencyContact}
                          onChange={(e) => handleProfileChange('emergencyContact', e.target.value)}
                          placeholder="Name — (555) 987-6543"
                          className="pl-9 h-9 text-sm rounded-lg border-slate-200 bg-white focus-visible:ring-teal-500/30 focus-visible:border-teal-400"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'notifications' && (
              <Card className="rounded-xl border-slate-200/60 bg-white shadow-sm">
                <CardContent className="p-5">
                  <div className="mb-4">
                    <h2 className="text-sm font-bold text-slate-900">Notification Preferences</h2>
                    <p className="text-[11px] text-slate-400 mt-0.5">Choose what updates you receive.</p>
                  </div>
                  <div className="space-y-0.5">
                    <Toggle
                      checked={notifs.appointmentReminders}
                      onChange={(v) => handleNotifChange('appointmentReminders', v)}
                      label="Appointment reminders"
                      description="Get notified before upcoming appointments."
                      icon={Bell}
                    />
                    <Toggle
                      checked={notifs.careUpdates}
                      onChange={(v) => handleNotifChange('careUpdates', v)}
                      label="Care plan updates"
                      description="Alerts when your care plan is updated."
                      icon={Bell}
                    />
                    <Toggle
                      checked={notifs.wellnessTips}
                      onChange={(v) => handleNotifChange('wellnessTips', v)}
                      label="Wellness tips"
                      description="Daily tips and mindfulness reminders."
                      icon={Bell}
                    />
                    <Toggle
                      checked={notifs.emailDigest}
                      onChange={(v) => handleNotifChange('emailDigest', v)}
                      label="Weekly email digest"
                      description="Summary of your progress sent weekly."
                      icon={notifs.emailDigest ? Bell : BellOff}
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'security' && (
              <div className="space-y-4">
                <Card className="rounded-xl border-slate-200/60 bg-white shadow-sm">
                  <CardContent className="p-5">
                    <div className="mb-4">
                      <h2 className="text-sm font-bold text-slate-900">Privacy & Security</h2>
                      <p className="text-[11px] text-slate-400 mt-0.5">Your data protection settings.</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 rounded-lg bg-teal-50/60 border border-teal-200/60 px-3.5 py-2.5">
                        <Shield className="size-4 text-teal-600 shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-[13px] font-medium text-teal-800">HIPAA Compliant</p>
                          <p className="text-[11px] text-teal-600/70">Encrypted at rest and in transit.</p>
                        </div>
                        <Badge className="text-[9px] px-1.5 py-0 bg-teal-100 text-teal-700 border border-teal-200 font-bold shadow-none">
                          Active
                        </Badge>
                      </div>
                      <button className="w-full flex items-center gap-3 rounded-lg border border-slate-200 hover:border-teal-200 hover:bg-teal-50/40 px-3.5 py-2.5 transition-colors group">
                        <KeyRound className="size-4 text-slate-500 group-hover:text-teal-600 shrink-0 transition-colors" />
                        <div className="flex-1 min-w-0 text-left">
                          <p className="text-[13px] font-medium text-slate-700 group-hover:text-slate-900">Change password</p>
                          <p className="text-[11px] text-slate-400">Update your account password.</p>
                        </div>
                        <ChevronRight className="size-3.5 text-slate-300 group-hover:text-teal-500 transition-colors" />
                      </button>
                      <button className="w-full flex items-center gap-3 rounded-lg border border-slate-200 hover:border-teal-200 hover:bg-teal-50/40 px-3.5 py-2.5 transition-colors group">
                        <Download className="size-4 text-slate-500 group-hover:text-teal-600 shrink-0 transition-colors" />
                        <div className="flex-1 min-w-0 text-left">
                          <p className="text-[13px] font-medium text-slate-700 group-hover:text-slate-900">Download my data</p>
                          <p className="text-[11px] text-slate-400">Export all your personal and clinical data.</p>
                        </div>
                        <ChevronRight className="size-3.5 text-slate-300 group-hover:text-teal-500 transition-colors" />
                      </button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'account' && (
              <div className="space-y-4">
                {/* Subscription */}
                <Card className="rounded-xl border-slate-200/60 bg-white shadow-sm">
                  <CardContent className="p-5">
                    <div className="mb-4">
                      <h2 className="text-sm font-bold text-slate-900">Subscription</h2>
                      <p className="text-[11px] text-slate-400 mt-0.5">Manage your plan and billing.</p>
                    </div>
                    <div className="flex items-center justify-between rounded-lg border border-slate-200 px-3.5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="flex size-9 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                          <CreditCard className="size-4" />
                        </div>
                        <div>
                          <p className="text-[13px] font-semibold text-slate-700">Starter plan</p>
                          <p className="text-[11px] text-slate-400">Free — Basic features</p>
                        </div>
                      </div>
                      <Button
                        asChild
                        size="sm"
                        className="rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-semibold border-0 shadow-sm shadow-teal-600/15 text-xs h-8 px-3.5"
                      >
                        <Link href="/pricing">
                          Upgrade
                          <ChevronRight className="size-3 ml-0.5" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Account actions */}
                <Card className="rounded-xl border-slate-200/60 bg-white shadow-sm">
                  <CardContent className="p-5">
                    <div className="mb-4">
                      <h2 className="text-sm font-bold text-slate-900">Account Actions</h2>
                      <p className="text-[11px] text-slate-400 mt-0.5">Sign out or manage your account.</p>
                    </div>
                    <div className="space-y-2">
                      <button
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-3 rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 px-3.5 py-2.5 transition-colors group"
                      >
                        <LogOut className="size-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
                        <div className="flex-1 text-left">
                          <p className="text-[13px] font-medium text-slate-700">Sign out</p>
                          <p className="text-[11px] text-slate-400">Log out of your account.</p>
                        </div>
                        <ChevronRight className="size-3.5 text-slate-300 group-hover:text-slate-500 transition-colors" />
                      </button>

                      {showDeleteConfirm ? (
                        <div className="rounded-lg border border-red-200 bg-red-50 p-3.5">
                          <div className="flex items-center gap-2 mb-1.5">
                            <AlertTriangle className="size-4 text-red-500 shrink-0" />
                            <p className="text-[13px] font-semibold text-red-700">Delete your account?</p>
                          </div>
                          <p className="text-[11px] text-red-600/80 mb-3 leading-relaxed">
                            This permanently erases all data including assessments, care plans, and appointments.
                          </p>
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setShowDeleteConfirm(false)}
                              className="rounded-lg text-xs font-medium h-8 border-red-200 text-red-600 hover:bg-red-100 bg-white"
                            >
                              Cancel
                            </Button>
                            <Button
                              size="sm"
                              className="rounded-lg bg-red-600 hover:bg-red-700 text-white border-0 text-xs font-semibold h-8"
                            >
                              Yes, delete account
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => setShowDeleteConfirm(true)}
                          className="w-full flex items-center gap-3 rounded-lg border border-red-200/60 hover:border-red-300 hover:bg-red-50 px-3.5 py-2.5 transition-colors group"
                        >
                          <AlertTriangle className="size-4 text-red-400 group-hover:text-red-500 transition-colors" />
                          <div className="flex-1 text-left">
                            <p className="text-[13px] font-medium text-red-500 group-hover:text-red-600">Delete account</p>
                            <p className="text-[11px] text-red-400/80">Permanently remove your data.</p>
                          </div>
                          <ChevronRight className="size-3.5 text-red-300 group-hover:text-red-400 transition-colors" />
                        </button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
