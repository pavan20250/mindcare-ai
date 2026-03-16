'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Edit3,
  Save,
  Check,
  Camera,
  Shield,
  Heart,
  Clock,
  Activity,
  ChevronRight,
  AlertCircle,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */
interface Profile {
  firstName: string;
  lastName: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  bio: string;
  emergencyContact: string;
  emergencyPhone: string;
  bloodType: string;
  allergies: string;
}

const DEFAULT_PROFILE: Profile = {
  firstName: '',
  lastName: '',
  phone: '',
  dateOfBirth: '',
  address: '',
  bio: '',
  emergencyContact: '',
  emergencyPhone: '',
  bloodType: '',
  allergies: '',
};

const STORAGE_KEY = 'neuralcare_profile';

/* ------------------------------------------------------------------ */
/*  Helpers                                                             */
/* ------------------------------------------------------------------ */
function readProfile(): Profile {
  if (typeof window === 'undefined') return DEFAULT_PROFILE;
  try {
    return { ...DEFAULT_PROFILE, ...JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}') };
  } catch {
    return DEFAULT_PROFILE;
  }
}

function getInitials(profile: Profile, email: string): string {
  if (profile.firstName && profile.lastName) {
    return `${profile.firstName[0]}${profile.lastName[0]}`.toUpperCase();
  }
  return email ? email[0].toUpperCase() : '?';
}

function getDisplayName(profile: Profile, email: string): string {
  if (profile.firstName && profile.lastName) {
    return `${profile.firstName} ${profile.lastName}`;
  }
  return email || 'New User';
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                      */
/* ------------------------------------------------------------------ */
function StatCard({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: typeof Heart;
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
      <div className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${color}`}>
        <Icon className="size-3.5" />
      </div>
      <div className="min-w-0">
        <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wide">{label}</p>
        <p className="text-[13px] font-semibold text-slate-700 truncate">{value}</p>
      </div>
    </div>
  );
}

function EditableField({
  label,
  fieldId,
  value,
  onChange,
  editing,
  placeholder,
  type = 'text',
  icon: Icon,
}: {
  label: string;
  fieldId: string;
  value: string;
  onChange: (v: string) => void;
  editing: boolean;
  placeholder?: string;
  type?: string;
  icon?: typeof Mail;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={fieldId} className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">
        {label}
      </Label>
      {editing ? (
        <Input
          id={fieldId}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="h-9 text-sm border-slate-200 focus:border-teal-400 focus:ring-teal-400/20 rounded-lg"
        />
      ) : (
        <div className="flex items-center gap-2 py-2 px-3 rounded-lg bg-slate-50 border border-slate-100 min-h-[36px]">
          {Icon && <Icon className="size-3.5 text-slate-400 shrink-0" />}
          <span className="text-sm text-slate-700 truncate">
            {value || <span className="text-slate-400 italic">Not set</span>}
          </span>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                      */
/* ------------------------------------------------------------------ */
export function ProfileView() {
  const [email, setEmail] = useState('');
  const [profile, setProfile] = useState<Profile>(DEFAULT_PROFILE);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<Profile>(DEFAULT_PROFILE);
  const [saved, setSaved] = useState(false);
  const [memberSince] = useState(() => {
    const d = new Date();
    d.setMonth(d.getMonth() - 3);
    return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  });

  useEffect(() => {
    fetch('/api/auth/session', { credentials: 'include' })
      .then((r) => r.json())
      .then((data) => setEmail(data.user?.email ?? ''))
      .catch(() => {});
    const stored = readProfile();
    setProfile(stored);
    setDraft(stored);
  }, []);

  const handleEdit = () => {
    setDraft(profile);
    setEditing(true);
  };

  const handleCancel = () => {
    setDraft(profile);
    setEditing(false);
  };

  const handleSave = useCallback(() => {
    setProfile(draft);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
    setSaved(true);
    setEditing(false);
    setTimeout(() => setSaved(false), 2500);
  }, [draft]);

  const updateDraft = useCallback((field: keyof Profile, value: string) => {
    setDraft((prev) => ({ ...prev, [field]: value }));
  }, []);

  const initials = getInitials(profile, email);
  const displayName = getDisplayName(profile, email);
  const completionFields: (keyof Profile)[] = [
    'firstName', 'lastName', 'phone', 'dateOfBirth', 'address', 'bio',
    'emergencyContact', 'bloodType',
  ];
  const completion = Math.round(
    (completionFields.filter((f) => profile[f]?.trim()).length / completionFields.length) * 100
  );

  return (
    <div className="min-h-full overflow-x-hidden bg-gradient-to-b from-slate-50 to-white">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-10 py-6 sm:py-8 space-y-5">

        {/* ── Hero Card ── */}
        <Card className="border-slate-200/80 shadow-sm overflow-hidden">
          <CardContent className="p-5 sm:p-6">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">
              {/* Avatar */}
              <div className="flex items-start gap-4 min-w-0">
                <div className="relative shrink-0">
                  <div className="flex size-16 sm:size-18 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 text-white text-xl sm:text-2xl font-bold shadow-md shadow-teal-500/15 border border-white">
                    {initials}
                  </div>
                  <button className="absolute -bottom-1 -right-1 flex size-7 items-center justify-center rounded-full bg-white border border-slate-200 shadow-sm hover:bg-teal-50 hover:border-teal-200 transition-colors">
                    <Camera className="size-3 text-slate-500" />
                  </button>
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-tight">
                      {displayName}
                    </h1>
                    <Badge className="text-[9px] px-2 py-0.5 bg-teal-50 text-teal-700 border border-teal-200 font-bold shadow-none gap-1">
                      <Shield className="size-2.5" /> Patient
                    </Badge>
                    {saved && (
                      <Badge className="text-[9px] px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold shadow-none gap-1">
                        <Check className="size-2.5" /> Saved
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 mt-1 min-w-0">
                    <Mail className="size-3.5 text-slate-400 shrink-0" />
                    <p className="text-[13px] text-slate-500 truncate">{email || 'No email'}</p>
                  </div>
                  {profile.bio && (
                    <p className="text-[13px] text-slate-600 mt-2 leading-relaxed">
                      {profile.bio}
                    </p>
                  )}

                  <div className="mt-4 rounded-xl border border-slate-100 bg-white/70 p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-semibold text-slate-600">Profile completion</span>
                      <span className="text-[11px] font-bold text-teal-700">{completion}%</span>
                    </div>
                    <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full transition-all duration-500"
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
              </div>

              {/* Actions */}
              <div className="flex gap-2 flex-wrap lg:justify-end lg:pt-1">
                {editing ? (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCancel}
                      className="h-9 text-xs border-slate-200 text-slate-700 bg-white"
                    >
                      Cancel
                    </Button>
                    <Button
                      size="sm"
                      onClick={handleSave}
                      className="h-9 text-xs bg-teal-600 hover:bg-teal-700 text-white border-0 shadow-sm shadow-teal-600/20"
                    >
                      <Save className="size-3 mr-1.5" />
                      Save changes
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleEdit}
                    className="h-9 text-xs border-slate-200 text-slate-700 bg-white hover:border-teal-300 hover:text-teal-700 hover:bg-teal-50"
                  >
                    <Edit3 className="size-3 mr-1.5" />
                    Edit profile
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* ── Left column: forms ── */}
          <div className="lg:col-span-8 space-y-4">

            {/* Personal Info */}
            <Card className="border-slate-200/80 shadow-sm">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex size-7 items-center justify-center rounded-lg bg-teal-50">
                    <User className="size-3.5 text-teal-600" />
                  </div>
                  <h2 className="text-[13px] font-semibold text-slate-700">Personal Information</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <EditableField
                    label="First name"
                    fieldId="firstName"
                    value={editing ? draft.firstName : profile.firstName}
                    onChange={(v) => updateDraft('firstName', v)}
                    editing={editing}
                    placeholder="Jane"
                    icon={User}
                  />
                  <EditableField
                    label="Last name"
                    fieldId="lastName"
                    value={editing ? draft.lastName : profile.lastName}
                    onChange={(v) => updateDraft('lastName', v)}
                    editing={editing}
                    placeholder="Doe"
                    icon={User}
                  />
                  <EditableField
                    label="Phone number"
                    fieldId="phone"
                    value={editing ? draft.phone : profile.phone}
                    onChange={(v) => updateDraft('phone', v)}
                    editing={editing}
                    placeholder="+1 (555) 000-0000"
                    type="tel"
                    icon={Phone}
                  />
                  <EditableField
                    label="Date of birth"
                    fieldId="dateOfBirth"
                    value={editing ? draft.dateOfBirth : profile.dateOfBirth}
                    onChange={(v) => updateDraft('dateOfBirth', v)}
                    editing={editing}
                    type="date"
                    icon={Calendar}
                  />
                  <div className="sm:col-span-2">
                    <EditableField
                      label="Address"
                      fieldId="address"
                      value={editing ? draft.address : profile.address}
                      onChange={(v) => updateDraft('address', v)}
                      editing={editing}
                      placeholder="123 Main St, City, State"
                      icon={MapPin}
                    />
                  </div>
                  <div className="sm:col-span-2 space-y-1.5">
                    <Label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">
                      Bio
                    </Label>
                    {editing ? (
                      <textarea
                        value={draft.bio}
                        onChange={(e) => updateDraft('bio', e.target.value)}
                        placeholder="Tell us a little about yourself..."
                        rows={3}
                        className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20 resize-none placeholder:text-slate-400 text-slate-700"
                      />
                    ) : (
                      <div className="py-2 px-3 rounded-lg bg-slate-50 border border-slate-100 min-h-[60px]">
                        <span className="text-sm text-slate-700 leading-relaxed">
                          {profile.bio || <span className="text-slate-400 italic">Not set</span>}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Medical Info */}
            <Card className="border-slate-200/80 shadow-sm">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex size-7 items-center justify-center rounded-lg bg-rose-50">
                    <Heart className="size-3.5 text-rose-500" />
                  </div>
                  <h2 className="text-[13px] font-semibold text-slate-700">Medical Information</h2>
                  <Badge className="ml-auto text-[9px] px-1.5 py-0 bg-amber-50 text-amber-700 border border-amber-200 font-bold shadow-none">
                    <AlertCircle className="size-2.5 mr-0.5" /> Sensitive
                  </Badge>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <EditableField
                    label="Blood type"
                    fieldId="bloodType"
                    value={editing ? draft.bloodType : profile.bloodType}
                    onChange={(v) => updateDraft('bloodType', v)}
                    editing={editing}
                    placeholder="e.g. O+"
                    icon={Activity}
                  />
                  <div className="sm:col-span-2">
                    <EditableField
                      label="Known allergies"
                      fieldId="allergies"
                      value={editing ? draft.allergies : profile.allergies}
                      onChange={(v) => updateDraft('allergies', v)}
                      editing={editing}
                      placeholder="e.g. Penicillin, Peanuts"
                      icon={AlertCircle}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Contact */}
            <Card className="border-slate-200/80 shadow-sm">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex size-7 items-center justify-center rounded-lg bg-blue-50">
                    <Phone className="size-3.5 text-blue-500" />
                  </div>
                  <h2 className="text-[13px] font-semibold text-slate-700">Emergency Contact</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <EditableField
                    label="Contact name"
                    fieldId="emergencyContact"
                    value={editing ? draft.emergencyContact : profile.emergencyContact}
                    onChange={(v) => updateDraft('emergencyContact', v)}
                    editing={editing}
                    placeholder="Full name"
                    icon={User}
                  />
                  <EditableField
                    label="Contact phone"
                    fieldId="emergencyPhone"
                    value={editing ? draft.emergencyPhone : profile.emergencyPhone}
                    onChange={(v) => updateDraft('emergencyPhone', v)}
                    editing={editing}
                    placeholder="+1 (555) 000-0000"
                    type="tel"
                    icon={Phone}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* ── Right column: stats + quick links ── */}
          <div className="lg:col-span-4 space-y-4 lg:sticky lg:top-6 h-fit">

            {/* Stats */}
            <Card className="border-slate-200/80 shadow-sm">
              <CardContent className="p-5 sm:p-6 space-y-2.5">
                <h2 className="text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-3">
                  Overview
                </h2>
                <StatCard
                  icon={Clock}
                  label="Member since"
                  value={memberSince}
                  color="bg-teal-50 text-teal-600"
                />
                <StatCard
                  icon={Shield}
                  label="Account status"
                  value="Active"
                  color="bg-emerald-50 text-emerald-600"
                />
                <StatCard
                  icon={Activity}
                  label="Profile strength"
                  value={`${completion}% complete`}
                  color="bg-blue-50 text-blue-500"
                />
                <StatCard
                  icon={Heart}
                  label="Care plan"
                  value="Intake required"
                  color="bg-rose-50 text-rose-500"
                />
              </CardContent>
            </Card>

            {/* Quick actions */}
            <Card className="border-slate-200/80 shadow-sm">
              <CardContent className="p-5 sm:p-6">
                <h2 className="text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-3">
                  Quick links
                </h2>
                <div className="space-y-0.5">
                  {[
                    { label: 'View care plan', href: '/care', icon: Heart, color: 'text-rose-500' },
                    { label: 'Appointments', href: '/appointments', icon: Calendar, color: 'text-blue-500' },
                    { label: 'Clinical intake', href: '/demo', icon: Activity, color: 'text-teal-600' },
                    { label: 'Account settings', href: '/settings', icon: Shield, color: 'text-slate-500' },
                  ].map(({ label, href, icon: Icon, color }) => (
                    <a
                      key={href}
                      href={href}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg border border-transparent hover:border-slate-200 hover:bg-slate-50 transition-colors group"
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
            <div className="flex items-start gap-2.5 rounded-xl border border-teal-100 bg-teal-50/60 px-4 py-3.5">
              <Shield className="size-4 text-teal-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-[12px] font-semibold text-teal-700">HIPAA Compliant</p>
                <p className="text-[11px] text-teal-600/70 leading-snug mt-0.5">
                  Your data is encrypted and stored securely in compliance with HIPAA regulations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}