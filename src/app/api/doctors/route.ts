import { NextResponse } from 'next/server';

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  credentials: string;
  bio: string;
  availability: string;
  image?: string;
}

const DOCTORS: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Chen',
    specialty: 'Clinical Psychologist',
    credentials: 'PhD, Licensed Psychologist',
    bio: 'Specializes in depression, anxiety, and mood disorders. 15+ years experience with evidence-based therapies.',
    availability: 'Mon–Fri, 9am–5pm',
  },
  {
    id: '2',
    name: 'Dr. James Mitchell',
    specialty: 'Psychiatrist',
    credentials: 'MD, Board Certified',
    bio: 'Adult psychiatry with focus on medication management and integrative care for depression and anxiety.',
    availability: 'Tue–Thu, 10am–4pm',
  },
  {
    id: '3',
    name: 'Dr. Elena Rodriguez',
    specialty: 'Licensed Clinical Social Worker',
    credentials: 'LCSW, MSW',
    bio: 'Therapy for anxiety, trauma, and life transitions. CBT and mindfulness-based approaches.',
    availability: 'Mon–Wed, Fri 8am–3pm',
  },
  {
    id: '4',
    name: 'Dr. David Park',
    specialty: 'Clinical Psychologist',
    credentials: 'PsyD, Licensed Psychologist',
    bio: 'Assessment and treatment for mood and anxiety disorders. PHQ-9 and GAD-7 certified.',
    availability: 'Mon–Thu, 11am–6pm',
  },
  {
    id: '5',
    name: 'Dr. Amy Foster',
    specialty: 'Psychiatrist',
    credentials: 'MD, Child & Adult Psychiatry',
    bio: 'Board certified in adult and child psychiatry. Special interest in depression and ADHD.',
    availability: 'Wed–Fri, 9am–2pm',
  },
];

/**
 * GET /api/doctors
 * Returns list of available doctors. Optional ?specialty= filters by specialty.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const specialty = searchParams.get('specialty')?.toLowerCase();

  let list = DOCTORS;
  if (specialty) {
    list = DOCTORS.filter(
      (d) =>
        d.specialty.toLowerCase().includes(specialty) ||
        d.credentials.toLowerCase().includes(specialty)
    );
  }

  return NextResponse.json({ doctors: list });
}
