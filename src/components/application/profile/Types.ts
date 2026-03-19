export interface Profile {
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

export const DEFAULT_PROFILE: Profile = {
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

export const STORAGE_KEY = 'neuralcare_profile';

export function readProfile(): Profile {
  if (typeof window === 'undefined') return DEFAULT_PROFILE;
  try {
    return { ...DEFAULT_PROFILE, ...JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}') };
  } catch {
    return DEFAULT_PROFILE;
  }
}

export function getInitials(p: Profile, email: string) {
  if (p.firstName && p.lastName) return `${p.firstName[0]}${p.lastName[0]}`.toUpperCase();
  return email ? email[0].toUpperCase() : '?';
}

export function getDisplayName(p: Profile, email: string) {
  if (p.firstName && p.lastName) return `${p.firstName} ${p.lastName}`;
  return email || 'New User';
}

export function calcCompletion(profile: Profile): number {
  const fields: (keyof Profile)[] = [
    'firstName', 'lastName', 'phone', 'dateOfBirth',
    'address', 'bio', 'emergencyContact', 'bloodType',
  ];
  return Math.round(
    (fields.filter((f) => profile[f]?.trim()).length / fields.length) * 100,
  );
}