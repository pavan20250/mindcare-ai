export interface Profile {
  fullName:         string;
  phone:            string;
  dateOfBirth:      string;
  address:          string;
  bio:              string;
  emergencyContact: string;
  emergencyPhone:   string;
  bloodType:        string;
  allergies:        string;
}

export const DEFAULT_PROFILE: Profile = {
  fullName:         '',
  phone:            '',
  dateOfBirth:      '',
  address:          '',
  bio:              '',
  emergencyContact: '',
  emergencyPhone:   '',
  bloodType:        '',
  allergies:        '',
};

export const STORAGE_KEY = 'neuralcare_profile';

export function getInitials(p: Profile, email: string): string {
  if (p.fullName.trim()) {
    const parts = p.fullName.trim().split(/\s+/);
    if (parts.length >= 2) return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
    return parts[0][0].toUpperCase();
  }
  return email ? email[0].toUpperCase() : '?';
}

export function getDisplayName(p: Profile, email: string): string {
  return p.fullName.trim() || email || 'New User';
}

export function calcCompletion(profile: Profile): number {
  const fields: (keyof Profile)[] = [
    'fullName', 'phone', 'dateOfBirth', 'address', 'bio', 'emergencyContact', 'bloodType',
  ];
  return Math.round(
    (fields.filter((f) => profile[f]?.trim()).length / fields.length) * 100,
  );
}