export interface Appointment {
  doctorName: string;
  specialty?: string;
  date: string;
  timeSlot: string;
  status?: string;
}

export type MoodValue = 'great' | 'good' | 'okay' | 'low' | 'struggling';

export interface MoodEntry {
  value: MoodValue;
  date: string;
}

export interface ActionItem {
  href: string;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  accent: string;
  primary?: boolean;
  done?: boolean;
  locked?: boolean;
}

export const MOOD_OPTIONS = [
  { value: 'great' as MoodValue, label: 'Great', iconName: 'Sun', accent: 'text-amber-500' },
  { value: 'good' as MoodValue, label: 'Good', iconName: 'Smile', accent: 'text-emerald-500' },
  { value: 'okay' as MoodValue, label: 'Okay', iconName: 'Meh', accent: 'text-sky-500' },
  { value: 'low' as MoodValue, label: 'Low', iconName: 'CloudRain', accent: 'text-slate-500' },
  { value: 'struggling' as MoodValue, label: 'Hard', iconName: 'Frown', accent: 'text-rose-500' },
];

export const MOOD_DOT_COLORS: Record<MoodValue, string> = {
  great: 'bg-amber-400',
  good: 'bg-emerald-400',
  okay: 'bg-sky-400',
  low: 'bg-slate-400',
  struggling: 'bg-rose-400',
};

export const WELLNESS_TIPS = [
  { text: 'A 10-minute walk can boost mood and reduce stress hormones.', category: 'Movement' },
  { text: 'Try the 4-7-8 breathing technique: inhale 4s, hold 7s, exhale 8s.', category: 'Breathwork' },
  { text: "Writing three things you're grateful for daily can shift your mental focus.", category: 'Mindset' },
  { text: 'Consistent sleep and wake times support your circadian rhythm.', category: 'Sleep' },
  { text: 'Even mild dehydration can impair cognitive function and emotional regulation.', category: 'Nutrition' },
  { text: 'Spending 20 minutes in nature lowers cortisol levels measurably.', category: 'Nature' },
  { text: 'Body scanning — noticing sensations head to toe — can reduce anxiety in minutes.', category: 'Mindfulness' },
  { text: 'Social connection is one of the strongest predictors of mental well-being.', category: 'Connection' },
];

export const STEPS = [
  { key: 'intake', label: 'Assessment' },
  { key: 'care', label: 'Care plan' },
  { key: 'book', label: 'Provider' },
  { key: 'resources', label: 'Resources' },
] as const;

export function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

export function formatTime(slot: string): string {
  const [h, m] = slot.split(':').map(Number);
  return `${h % 12 || 12}:${String(m).padStart(2, '0')} ${h >= 12 ? 'PM' : 'AM'}`;
}

export function todayStr(): string {
  return new Date().toISOString().slice(0, 10);
}

export function readMoods(): MoodEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem('neuralcare_moods') ?? '[]');
  } catch {
    return [];
  }
}

export function writeMood(entry: MoodEntry) {
  const all = readMoods().filter((e) => e.date !== entry.date);
  all.push(entry);
  localStorage.setItem('neuralcare_moods', JSON.stringify(all.slice(-90)));
}

export function computeStreak(history: MoodEntry[]): number {
  let streak = 0;
  const d = new Date();
  for (let i = 0; i < 90; i++) {
    if (history.some((e) => e.date === d.toISOString().slice(0, 10))) {
      streak++;
      d.setDate(d.getDate() - 1);
    } else break;
  }
  return streak;
}

export function last7Days(): string[] {
  const days: string[] = [];
  const d = new Date();
  for (let i = 6; i >= 0; i--) {
    const date = new Date(d);
    date.setDate(date.getDate() - i);
    days.push(date.toISOString().slice(0, 10));
  }
  return days;
}