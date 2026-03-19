'use client';

import { Heart, Activity, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ProfileSection } from './';
import { ProfileField } from './ProfileField';
import type { Profile } from './Types';

interface ProfileMedicalInfoProps {
  profile: Profile;
  draft: Profile;
  editing: boolean;
  onChange: (field: keyof Profile, value: string) => void;
}

export function ProfileMedicalInfo({
  profile,
  draft,
  editing,
  onChange,
}: ProfileMedicalInfoProps) {
  const get = (f: keyof Profile) => (editing ? draft[f] : profile[f]);

  return (
    <ProfileSection
      icon={Heart}
      iconColor="text-rose-500"
      label="Medical Information"
      description="Sensitive health data shared only with your care team"
      badge={
        <Badge className="text-[9px] px-2 py-0.5 bg-amber-50 text-amber-700 border border-amber-200 font-semibold shadow-none gap-1">
          <AlertCircle className="size-2.5" /> Sensitive
        </Badge>
      }
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <ProfileField
          label="Blood type"
          fieldId="bloodType"
          value={get('bloodType')}
          editing={editing}
          icon={Activity}
          placeholder="e.g. O+"
          onChange={(e) => onChange('bloodType', e.target.value)}
        />
        <ProfileField
          label="Known allergies"
          fieldId="allergies"
          value={get('allergies')}
          editing={editing}
          icon={AlertCircle}
          placeholder="e.g. Penicillin, Peanuts"
          onChange={(e) => onChange('allergies', e.target.value)}
          className="sm:col-span-1"
        />
      </div>
    </ProfileSection>
  );
}