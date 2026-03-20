'use client';

import { User, Phone, Calendar, MapPin } from 'lucide-react';
import { ProfileSection } from './Profilesection';
import { ProfileField, ProfileTextarea } from './ProfileField';
import type { Profile } from './Types';

interface ProfilePersonalInfoProps {
  profile: Profile;
  draft: Profile;
  editing: boolean;
  onChange: (field: keyof Profile, value: string) => void;
}

export function ProfilePersonalInfo({
  profile,
  draft,
  editing,
  onChange,
}: ProfilePersonalInfoProps) {
  const get = (f: keyof Profile) => (editing ? draft[f] : profile[f]);

  return (
    <ProfileSection
      icon={User}
      iconColor="text-teal-600"
      iconBg="bg-teal-50/80"
      label="Personal Information"
      description="Your basic contact and identity details"
      accentColor="from-teal-500 to-emerald-400"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <ProfileField
          label="First name"
          fieldId="firstName"
          value={get('firstName')}
          editing={editing}
          icon={User}
          placeholder="Jane"
          onChange={(e) => onChange('firstName', e.target.value)}
        />
        <ProfileField
          label="Last name"
          fieldId="lastName"
          value={get('lastName')}
          editing={editing}
          icon={User}
          placeholder="Doe"
          onChange={(e) => onChange('lastName', e.target.value)}
        />
        <ProfileField
          label="Phone number"
          fieldId="phone"
          value={get('phone')}
          editing={editing}
          icon={Phone}
          type="tel"
          placeholder="+1 (555) 000-0000"
          onChange={(e) => onChange('phone', e.target.value)}
        />
        <ProfileField
          label="Date of birth"
          fieldId="dateOfBirth"
          value={get('dateOfBirth')}
          editing={editing}
          icon={Calendar}
          type="date"
          onChange={(e) => onChange('dateOfBirth', e.target.value)}
        />
        <ProfileField
          label="Address"
          fieldId="address"
          value={get('address')}
          editing={editing}
          icon={MapPin}
          placeholder="123 Main St, City, State"
          onChange={(e) => onChange('address', e.target.value)}
          className="sm:col-span-2"
        />
        <div className="sm:col-span-2">
          <ProfileTextarea
            label="Bio"
            fieldId="bio"
            value={get('bio')}
            editing={editing}
            onChange={(v) => onChange('bio', v)}
            placeholder="Tell us a little about yourself…"
            rows={3}
          />
        </div>
      </div>
    </ProfileSection>
  );
}