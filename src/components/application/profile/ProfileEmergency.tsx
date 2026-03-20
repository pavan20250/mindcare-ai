'use client';

import { Phone, User } from 'lucide-react';
import { ProfileSection } from './Profilesection';
import { ProfileField } from './ProfileField';
import type { Profile } from './Types';

interface ProfileEmergencyContactProps {
  profile: Profile;
  draft: Profile;
  editing: boolean;
  onChange: (field: keyof Profile, value: string) => void;
}

export function ProfileEmergencyContact({
  profile,
  draft,
  editing,
  onChange,
}: ProfileEmergencyContactProps) {
  const get = (f: keyof Profile) => (editing ? draft[f] : profile[f]);

  return (
    <ProfileSection
      icon={Phone}
      iconColor="text-blue-500"
      iconBg="bg-blue-50/80"
      label="Emergency Contact"
      description="Who should we contact in case of an emergency?"
      accentColor="from-blue-400 to-cyan-400"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <ProfileField
          label="Contact name"
          fieldId="emergencyContact"
          value={get('emergencyContact')}
          editing={editing}
          icon={User}
          placeholder="Full name"
          onChange={(e) => onChange('emergencyContact', e.target.value)}
        />
        <ProfileField
          label="Contact phone"
          fieldId="emergencyPhone"
          value={get('emergencyPhone')}
          editing={editing}
          icon={Phone}
          type="tel"
          placeholder="+91 98765 43210"
          onChange={(e) => onChange('emergencyPhone', e.target.value)}
        />
      </div>
    </ProfileSection>
  );
}