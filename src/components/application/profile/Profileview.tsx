'use client';

import { useState, useEffect, useCallback } from 'react';
import { PageBackground } from '@/components/application/PageBg';
import { ProfileHero } from './ProfileHero';
import { ProfilePersonalInfo } from './ProfilepersonalInfo';
import { ProfileMedicalInfo } from './ProfileMedicalInfo';
import { ProfileEmergencyContact } from './ProfileEmergency';
import { ProfileSidebar } from './ProfileSidebar';
import { DEFAULT_PROFILE, type Profile } from './Types';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

function rowToProfile(row: Record<string, unknown>): Profile {
  return {
    fullName:         String(row.full_name         ?? ''),
    phone:            String(row.phone             ?? ''),
    dateOfBirth:      String(row.date_of_birth     ?? ''),
    address:          String(row.address           ?? ''),
    bio:              String(row.bio               ?? ''),
    emergencyContact: String(row.emergency_contact ?? ''),
    emergencyPhone:   String(row.emergency_phone   ?? ''),
    bloodType:        String(row.blood_type        ?? ''),
    allergies:        String(row.allergies         ?? ''),
  };
}

function profileToRow(p: Profile): Record<string, string | null> {
  return {
    full_name:         p.fullName         || null,
    phone:             p.phone            || null,
    date_of_birth:     p.dateOfBirth      || null,
    address:           p.address          || null,
    bio:               p.bio              || null,
    emergency_contact: p.emergencyContact || null,
    emergency_phone:   p.emergencyPhone   || null,
    blood_type:        p.bloodType        || null,
    allergies:         p.allergies        || null,
  };
}

function formatMemberSince(iso: string | null): string {
  if (!iso) return '';
  try {
    return 'Member since ' + new Date(iso).toLocaleDateString('en-US', {
      month: 'long', year: 'numeric',
    });
  } catch { return ''; }
}

export function ProfileView() {
  const [displayName, setDisplayName] = useState('');
  const [email,       setEmail]       = useState('');
  const [role,        setRole]        = useState('user');
  const [memberSince, setMemberSince] = useState('');

  const [profile, setProfile] = useState<Profile>(DEFAULT_PROFILE);
  const [draft,   setDraft]   = useState<Profile>(DEFAULT_PROFILE);

  const [intake,  setIntake]  = useState(false);
  const [editing, setEditing] = useState(false);
  const [saved,   setSaved]   = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving,  setSaving]  = useState(false);
  const [error,   setError]   = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const [profileRes, intakeRes] = await Promise.all([
          fetch('/api/profile', { credentials: 'include' }).then(r => r.json()),
          fetch('/api/intake',  { credentials: 'include' }).then(r => r.json()),
        ]);
        if (cancelled) return;

        setDisplayName(profileRes.display_name ?? '');
        setEmail(profileRes.email              ?? '');
        setRole(profileRes.role                ?? 'user');
        setMemberSince(formatMemberSince(profileRes.member_since ?? null));

        const p = profileRes.profile ? rowToProfile(profileRes.profile) : DEFAULT_PROFILE;
        setProfile(p);
        setDraft(p);
        setIntake(!!intakeRes?.intake?.completedAt);
      } catch {
        if (!cancelled) setError('Failed to load profile. Please refresh.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => { cancelled = true; };
  }, []);

  const handleChange = useCallback((field: keyof Profile, value: string) => {
    setDraft(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleEdit   = useCallback(() => { setDraft(profile); setEditing(true);  setError(null); }, [profile]);
  const handleCancel = useCallback(() => { setDraft(profile); setEditing(false); setError(null); }, [profile]);

  const handleSave = useCallback(async () => {
    setSaving(true);
    setError(null);
    try {
      const res = await fetch('/api/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(profileToRow(draft)),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Save failed.');
      setProfile(draft);
      setSaved(true);
      setEditing(false);
      setTimeout(() => setSaved(false), 2500);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not save profile.');
    } finally {
      setSaving(false);
    }
  }, [draft]);

  if (loading) {
    return (
      <PageBackground>
        <div className="flex min-h-[60vh] items-center justify-center">
          <LoadingSpinner size="lg" />
        </div>
      </PageBackground>
    );
  }

  return (
    <PageBackground>
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-5">

        {error && (
          <div className="rounded-2xl border border-red-200/60 bg-red-50/60 backdrop-blur-sm px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <ProfileHero
          profile={editing ? draft : profile}
          displayName={displayName}
          email={email}
          role={role}
          memberSince={memberSince}
          editing={editing}
          saved={saved}
          saving={saving}
          onEdit={handleEdit}
          onCancel={handleCancel}
          onSave={handleSave}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <div className="lg:col-span-8 space-y-4">
            <ProfilePersonalInfo profile={profile} draft={draft} editing={editing} onChange={handleChange} />
            <ProfileMedicalInfo  profile={profile} draft={draft} editing={editing} onChange={handleChange} />
            <ProfileEmergencyContact profile={profile} draft={draft} editing={editing} onChange={handleChange} />
          </div>
          <div className="lg:col-span-4">
            <ProfileSidebar profile={editing ? draft : profile} memberSince={memberSince} role={role} intake={intake} />
          </div>
        </div>

      </div>
    </PageBackground>
  );
}