'use client';

import { useState, useEffect, useCallback } from 'react';
import { PageBackground } from '@/components/application/PageBg';
import { ProfileHero } from './ProfileHero';
import { ProfilePersonalInfo } from './ProfilepersonalInfo';
import { ProfileMedicalInfo } from './ProfileMedicalInfo';
import { ProfileEmergencyContact } from './ProfileEmergency';
import { ProfileSidebar } from './ProfileSidebar';
import {
  DEFAULT_PROFILE,
  STORAGE_KEY,
  readProfile,
  type Profile,
} from './Types';

export function ProfileView() {
  const [email, setEmail] = useState('');
  const [profile, setProfile] = useState<Profile>(DEFAULT_PROFILE);
  const [draft, setDraft]   = useState<Profile>(DEFAULT_PROFILE);
  const [intake, setIntake] = useState(false);
  const [editing, setEditing] = useState(false);
  const [saved, setSaved]     = useState(false);

  const [memberSince] = useState(() => {
    const d = new Date();
    d.setMonth(d.getMonth() - 3);
    return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  });

  // Hydrate from session + localStorage
  useEffect(() => {
    fetch('/api/auth/session', { credentials: 'include' })
      .then((r) => r.json())
      .then((data) => setEmail(data.user?.email ?? ''))
      .catch(() => {});

    const stored = readProfile();
    setProfile(stored);
    setDraft(stored);
  }, []);

  // Check intake status
  useEffect(() => {
    fetch('/api/intake', { credentials: 'include' })
      .then((r) => r.json())
      .then((data) => setIntake(!!data?.intake?.completedAt))
      .catch(() => {});
  }, []);

  const handleChange = useCallback((field: keyof Profile, value: string) => {
    setDraft((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleEdit = useCallback(() => {
    setDraft(profile);
    setEditing(true);
  }, [profile]);

  const handleCancel = useCallback(() => {
    setDraft(profile);
    setEditing(false);
  }, [profile]);

  const handleSave = useCallback(() => {
    setProfile(draft);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
    setSaved(true);
    setEditing(false);
    setTimeout(() => setSaved(false), 2500);
  }, [draft]);

  return (
    <PageBackground>
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-5">

        {/* Hero card */}
        <ProfileHero
          profile={editing ? draft : profile}
          email={email}
          editing={editing}
          saved={saved}
          memberSince={memberSince}
          onEdit={handleEdit}
          onCancel={handleCancel}
          onSave={handleSave}
        />

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Main column */}
          <div className="lg:col-span-8 space-y-4">
            <ProfilePersonalInfo
              profile={profile}
              draft={draft}
              editing={editing}
              onChange={handleChange}
            />
            <ProfileMedicalInfo
              profile={profile}
              draft={draft}
              editing={editing}
              onChange={handleChange}
            />
            <ProfileEmergencyContact
              profile={profile}
              draft={draft}
              editing={editing}
              onChange={handleChange}
            />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <ProfileSidebar
              profile={editing ? draft : profile}
              memberSince={memberSince}
              intake={intake}
            />
          </div>
        </div>

      </div>
    </PageBackground>
  );
}