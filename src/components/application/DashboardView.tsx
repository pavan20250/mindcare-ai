'use client';

import { useState, useEffect, useMemo, useCallback, type ReactNode } from 'react';
import Link from 'next/link';
import {
  MessageCircle,
  Heart,
  Calendar,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  Lock,
  Lightbulb,
  Clock,
  Smile,
  Meh,
  Frown,
  Sun,
  CloudRain,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useIntake } from '@/contexts/IntakeContext';

// ─── Types ──────────────────────────────────────────────────────────────────

interface Appointment {
  doctorName: string;
  specialty?: string;
  date: string;
  timeSlot: string;
  status?: string;
}

type MoodValue = 'great' | 'good' | 'okay' | 'low' | 'struggling';

interface MoodEntry {
  value: MoodValue;
  date: string;
}

interface ActionItem {
  href: string;
  label: string;
  description: string;
  icon: typeof MessageCircle;
  accent: string;
  primary?: boolean;
  done?: boolean;
  locked?: boolean;
}

// ─── Constants ──────────────────────────────────────────────────────────────

const MOOD_OPTIONS = [
  { value: 'great' as const, label: 'Great', icon: Sun, accent: 'text-amber-500 bg-amber-50 ring-amber-200/60' },
  { value: 'good' as const, label: 'Good', icon: Smile, accent: 'text-emerald-500 bg-emerald-50 ring-emerald-200/60' },
  { value: 'okay' as const, label: 'Okay', icon: Meh, accent: 'text-sky-500 bg-sky-50 ring-sky-200/60' },
  { value: 'low' as const, label: 'Low', icon: CloudRain, accent: 'text-slate-500 bg-slate-50 ring-slate-200/60' },
  { value: 'struggling' as const, label: 'Hard', icon: Frown, accent: 'text-rose-500 bg-rose-50 ring-rose-200/60' },
];

const MOOD_DOT_COLORS: Record<MoodValue, string> = {
  great: 'bg-amber-400',
  good: 'bg-emerald-400',
  okay: 'bg-sky-400',
  low: 'bg-slate-400',
  struggling: 'bg-rose-400',
};

const WELLNESS_TIPS = [
  { text: 'A 10-minute walk can boost mood and reduce stress hormones.', category: 'Movement' },
  { text: 'Try the 4-7-8 breathing technique: inhale 4s, hold 7s, exhale 8s.', category: 'Breathwork' },
  { text: 'Writing three things you\'re grateful for daily can shift your mental focus.', category: 'Mindset' },
  { text: 'Consistent sleep and wake times support your circadian rhythm.', category: 'Sleep' },
  { text: 'Even mild dehydration can impair cognitive function and emotional regulation.', category: 'Nutrition' },
  { text: 'Spending 20 minutes in nature lowers cortisol levels measurably.', category: 'Nature' },
  { text: 'Body scanning — noticing sensations head to toe — can reduce anxiety in minutes.', category: 'Mindfulness' },
  { text: 'Social connection is one of the strongest predictors of mental well-being.', category: 'Connection' },
];

const STEPS = [
  { key: 'intake', label: 'Assessment' },
  { key: 'care', label: 'Care plan' },
  { key: 'book', label: 'Provider' },
  { key: 'resources', label: 'Resources' },
] as const;

// ─── Utilities ──────────────────────────────────────────────────────────────

function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

function formatTime(slot: string): string {
  const [h, m] = slot.split(':').map(Number);
  return `${h % 12 || 12}:${String(m).padStart(2, '0')} ${h >= 12 ? 'PM' : 'AM'}`;
}

function todayStr(): string {
  return new Date().toISOString().slice(0, 10);
}

function readMoods(): MoodEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem('mindcare_moods') ?? '[]');
  } catch {
    return [];
  }
}

function writeMood(entry: MoodEntry) {
  const all = readMoods().filter((e) => e.date !== entry.date);
  all.push(entry);
  localStorage.setItem('mindcare_moods', JSON.stringify(all.slice(-90)));
}

function computeStreak(history: MoodEntry[]): number {
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

function last7Days(): string[] {
  const days: string[] = [];
  const d = new Date();
  for (let i = 6; i >= 0; i--) {
    const date = new Date(d);
    date.setDate(date.getDate() - i);
    days.push(date.toISOString().slice(0, 10));
  }
  return days;
}

// ─── Sub-components ─────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.08em]">
      {children}
    </h2>
  );
}

function WelcomeBanner({ intakeCompleted }: { intakeCompleted: boolean }) {
  const date = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  });

  return (
    <section className="relative overflow-hidden rounded-xl bg-gradient-to-br from-teal-600 via-teal-700 to-emerald-800 px-5 py-4 text-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 80%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
      <div className="relative flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="text-teal-200/80 text-[11px] font-medium tracking-wide">{date}</p>
          <h1 className="text-xl font-bold mt-0.5 tracking-tight">{getGreeting()}</h1>
          <p className="text-teal-100/70 text-xs mt-0.5 max-w-sm leading-relaxed truncate">
            {intakeCompleted
              ? 'Track your progress and connect with your provider.'
              : 'Start with a brief assessment to build your care plan.'}
          </p>
        </div>
        <Button
          asChild
          size="sm"
          className="rounded-lg bg-white text-teal-700 hover:bg-teal-50 font-semibold shadow-lg shadow-black/10 border-0 px-4 shrink-0 text-xs"
        >
          <Link href={intakeCompleted ? '/care' : '/demo'}>
            {intakeCompleted ? 'Care plan' : 'Begin'}
            <ArrowRight className="size-3.5 ml-1.5" />
          </Link>
        </Button>
      </div>
    </section>
  );
}

function MoodCheckin({
  todayMood,
  streak,
  moodHistory,
  onSelect,
  disabled,
}: {
  todayMood: MoodValue | null;
  streak: number;
  moodHistory: MoodEntry[];
  onSelect: (v: MoodValue) => void;
  disabled: boolean;
}) {
  const selected = MOOD_OPTIONS.find((m) => m.value === todayMood);
  const week = last7Days();
  const historyMap = new Map(moodHistory.map((e) => [e.date, e.value]));

  return (
    <Card className="rounded-xl border-slate-200/60 bg-white shadow-sm">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <SectionLabel>Daily check-in</SectionLabel>
          {streak > 0 && (
            <Badge
              variant="secondary"
              className="text-[9px] font-semibold bg-amber-50 text-amber-700 border border-amber-200/80 gap-1 px-1.5 py-0"
            >
              <span className="inline-block size-1.5 rounded-full bg-amber-400" />
              {streak}d streak
            </Badge>
          )}
        </div>

        {todayMood && selected ? (
          <div className="flex items-center gap-3">
            <div className={`flex size-10 items-center justify-center rounded-xl ${selected.accent.split(' ').slice(1).join(' ')}`}>
              <selected.icon className={`size-5 ${selected.accent.split(' ')[0]}`} />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-800">
                Feeling {selected.label.toLowerCase()}
              </p>
              <p className="text-[11px] text-slate-400">Logged today</p>
            </div>
          </div>
        ) : (
          <>
            <p className="text-sm font-medium text-slate-700 mb-2.5">How are you feeling?</p>
            <div className="grid grid-cols-5 gap-1.5" role="radiogroup" aria-label="Select your mood">
              {MOOD_OPTIONS.map((mood) => {
                const [textColor, bgColor] = mood.accent.split(' ');
                return (
                  <button
                    key={mood.value}
                    onClick={() => onSelect(mood.value)}
                    disabled={disabled}
                    role="radio"
                    aria-checked={false}
                    aria-label={`Feeling ${mood.label}`}
                    className={`flex flex-col items-center gap-1 py-2 rounded-lg transition-all duration-150 hover:scale-[1.04] active:scale-[0.97] ${bgColor} hover:ring-2 ${mood.accent.split(' ')[2]} focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:outline-none disabled:opacity-40 disabled:pointer-events-none`}
                  >
                    <mood.icon className={`size-5 ${textColor}`} />
                    <span className="text-[10px] font-semibold text-slate-600">{mood.label}</span>
                  </button>
                );
              })}
            </div>
          </>
        )}

        <div className="flex items-center gap-2 mt-3 pt-2.5 border-t border-slate-100">
          <span className="text-[9px] text-slate-400 font-medium shrink-0">7 days</span>
          <div className="flex gap-1.5 items-center flex-1 justify-end">
            {week.map((day) => {
              const mood = historyMap.get(day);
              const isToday = day === todayStr();
              return (
                <div key={day} className="flex flex-col items-center gap-0.5">
                  <div
                    className={`size-2.5 rounded-full transition-colors ${
                      mood ? MOOD_DOT_COLORS[mood] : 'bg-slate-200'
                    } ${isToday ? 'ring-[1.5px] ring-offset-1 ring-teal-400/50' : ''}`}
                    title={`${new Date(day + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'short' })}${mood ? ` — ${mood}` : ''}`}
                  />
                  <span className="text-[8px] text-slate-400 leading-none">
                    {new Date(day + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'narrow' })}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function JourneyProgress({ completedStep }: { completedStep: number }) {
  const pct = Math.round((completedStep / STEPS.length) * 100);

  return (
    <Card className="rounded-xl border-slate-200/60 bg-white shadow-sm">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-1">
          <SectionLabel>Your journey</SectionLabel>
          <span className="text-[11px] font-semibold text-teal-600">{pct}%</span>
        </div>
        <div className="h-1 rounded-full bg-slate-100 overflow-hidden mb-4">
          <div
            className="h-full rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 transition-all duration-700 ease-out"
            style={{ width: `${pct}%` }}
          />
        </div>
        <ol className="flex items-start" aria-label="Care journey progress">
          {STEPS.map((step, i) => {
            const done = i < completedStep;
            const current = i === completedStep;
            return (
              <li key={step.key} className="flex items-center flex-1 min-w-0 last:flex-none">
                <div className="flex flex-col items-center gap-1">
                  <div
                    className={`flex size-8 items-center justify-center rounded-full text-[11px] font-bold transition-all duration-300 ${
                      done
                        ? 'bg-teal-600 text-white shadow-sm shadow-teal-500/25'
                        : current
                          ? 'bg-white text-teal-700 ring-2 ring-teal-500 shadow-sm'
                          : 'bg-slate-100 text-slate-400'
                    }`}
                    aria-current={current ? 'step' : undefined}
                  >
                    {done ? <CheckCircle2 className="size-4" /> : i + 1}
                  </div>
                  <span
                    className={`text-[10px] font-semibold text-center leading-tight ${
                      done ? 'text-teal-700' : current ? 'text-slate-700' : 'text-slate-400'
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div
                    className={`h-[1.5px] flex-1 mx-1.5 sm:mx-3 rounded-full mt-4 transition-colors duration-500 ${
                      done ? 'bg-teal-400' : 'bg-slate-200'
                    }`}
                    aria-hidden
                  />
                )}
              </li>
            );
          })}
        </ol>
      </CardContent>
    </Card>
  );
}

function AppointmentCard({ appointment }: { appointment: Appointment }) {
  const apptDate = new Date(appointment.date + 'T12:00:00');

  return (
    <Card className="rounded-xl border-slate-200/60 bg-white shadow-sm overflow-hidden">
      <CardContent className="p-0">
        <div className="flex">
          <div className="flex flex-col items-center justify-center w-16 shrink-0 bg-gradient-to-b from-teal-50 to-teal-100/50 text-teal-700 py-3">
            <span className="text-[9px] font-bold uppercase tracking-wide">
              {apptDate.toLocaleDateString('en-US', { month: 'short' })}
            </span>
            <span className="text-xl font-bold leading-none mt-0.5">
              {apptDate.getDate()}
            </span>
            <span className="text-[9px] font-medium mt-0.5">
              {apptDate.toLocaleDateString('en-US', { weekday: 'short' })}
            </span>
          </div>
          <div className="flex-1 min-w-0 px-3.5 py-3 flex items-center justify-between gap-2">
            <div className="min-w-0">
              <p className="text-sm font-semibold text-slate-900 truncate">
                {appointment.doctorName}
              </p>
              {appointment.specialty && (
                <p className="text-[11px] text-teal-600 font-medium">{appointment.specialty}</p>
              )}
              <div className="flex items-center gap-1 mt-1 text-slate-500">
                <Clock className="size-3" />
                <span className="text-[11px] font-medium">{formatTime(appointment.timeSlot)}</span>
              </div>
            </div>
            <Button
              asChild
              size="sm"
              variant="outline"
              className="shrink-0 rounded-lg border-slate-200 text-slate-600 hover:text-teal-700 hover:border-teal-200 hover:bg-teal-50 font-medium text-[11px] h-7 px-2.5"
            >
              <Link href="/appointments">Manage</Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function AppointmentEmpty() {
  return (
    <Card className="rounded-xl border-dashed border-slate-200 bg-slate-50/50 shadow-none">
      <CardContent className="py-5 px-4 text-center">
        <Calendar className="size-5 text-slate-400 mx-auto mb-2" />
        <p className="text-xs font-medium text-slate-600">No upcoming appointments</p>
        <p className="text-[11px] text-slate-400 mt-0.5 mb-3">Schedule time with a provider.</p>
        <Button
          asChild
          size="sm"
          variant="outline"
          className="rounded-lg border-slate-200 text-slate-600 hover:text-teal-700 hover:border-teal-200 hover:bg-teal-50 font-medium text-[11px] h-7"
        >
          <Link href="/appointments">Browse providers</Link>
        </Button>
      </CardContent>
    </Card>
  );
}

function AppointmentSkeleton() {
  return (
    <Card className="rounded-xl border-slate-200/60 bg-white shadow-sm overflow-hidden">
      <CardContent className="p-0">
        <div className="flex">
          <div className="w-16 shrink-0 bg-slate-50 py-3 flex flex-col items-center gap-1">
            <Skeleton className="h-2.5 w-7 bg-slate-100" />
            <Skeleton className="h-5 w-6 bg-slate-100" />
            <Skeleton className="h-2.5 w-5 bg-slate-100" />
          </div>
          <div className="flex-1 p-3.5 space-y-1.5">
            <Skeleton className="h-4 w-28 bg-slate-100" />
            <Skeleton className="h-3 w-20 bg-slate-100" />
            <Skeleton className="h-3 w-16 bg-slate-100" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function QuickActionCard({
  href,
  label,
  description,
  icon: Icon,
  accent,
  primary,
  done,
  locked,
}: ActionItem) {
  return (
    <Card
      className={`group rounded-xl border-slate-200/60 bg-white shadow-sm overflow-hidden transition-all duration-200 ${
        locked
          ? 'opacity-45 grayscale'
          : 'hover:shadow-md hover:shadow-slate-200/50 hover:border-slate-300/80'
      } ${primary ? 'ring-2 ring-teal-400/40 ring-offset-1' : ''}`}
    >
      <CardContent className="p-0">
        <Link
          href={href}
          className={`flex flex-col justify-between gap-2 p-3.5 h-full min-h-[110px] ${
            locked ? 'pointer-events-none' : ''
          }`}
          tabIndex={locked ? -1 : undefined}
          aria-disabled={locked || undefined}
        >
          <div className="flex items-start justify-between">
            <div
              className={`flex size-9 items-center justify-center rounded-lg transition-colors ${
                locked
                  ? 'bg-slate-100 text-slate-400'
                  : done
                    ? 'bg-emerald-50 text-emerald-600'
                    : accent
              }`}
            >
              {done ? (
                <CheckCircle2 className="size-4" />
              ) : locked ? (
                <Lock className="size-3.5" />
              ) : (
                <Icon className="size-4" />
              )}
            </div>
            {primary && (
              <Badge className="text-[9px] px-1.5 py-0 bg-teal-50 text-teal-700 border border-teal-200 font-bold shadow-none">
                Start here
              </Badge>
            )}
            {done && (
              <Badge className="text-[9px] px-1.5 py-0 bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold shadow-none">
                Done
              </Badge>
            )}
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 text-[13px] leading-tight">{label}</h3>
            <p className="text-slate-500 text-[11px] mt-0.5 leading-snug">{description}</p>
          </div>
          {!locked && (
            <span className="inline-flex items-center gap-0.5 text-[11px] font-medium text-slate-400 group-hover:text-teal-600 transition-colors mt-auto">
              {done ? 'Review' : 'Open'}
              <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
            </span>
          )}
        </Link>
      </CardContent>
    </Card>
  );
}

function WellnessTip({ tip }: { tip: (typeof WELLNESS_TIPS)[number] }) {
  return (
    <Card className="rounded-xl border-slate-200/60 bg-white shadow-sm">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="flex size-6 items-center justify-center rounded-md bg-amber-50 border border-amber-100">
            <Lightbulb className="size-3 text-amber-500" />
          </div>
          <SectionLabel>Wellness tip</SectionLabel>
          <Badge
            variant="secondary"
            className="ml-auto text-[9px] font-semibold bg-slate-50 text-slate-400 border border-slate-200/80 px-1.5 py-0"
          >
            {tip.category}
          </Badge>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed">{tip.text}</p>
      </CardContent>
    </Card>
  );
}


// ─── Main Component ─────────────────────────────────────────────────────────

export function DashboardView() {
  const { intakeCompleted } = useIntake();

  const [apptLoading, setApptLoading] = useState(true);
  const [upcomingCount, setUpcomingCount] = useState(0);
  const [nextAppt, setNextAppt] = useState<Appointment | null>(null);

  const [todayMood, setTodayMood] = useState<MoodValue | null>(null);
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>([]);
  const [moodStreak, setMoodStreak] = useState(0);
  const [moodSaving, setMoodSaving] = useState(false);

  const tip = useMemo(
    () => WELLNESS_TIPS[Math.floor(Math.random() * WELLNESS_TIPS.length)],
    [],
  );

  useEffect(() => {
    const history = readMoods();
    setMoodHistory(history);
    const today = history.find((e) => e.date === todayStr());
    if (today) setTodayMood(today.value);
    setMoodStreak(computeStreak(history));
  }, []);

  useEffect(() => {
    fetch('/api/appointments', { credentials: 'include' })
      .then((r) => r.json())
      .then((data) => {
        const list: Appointment[] = data?.appointments ?? [];
        const now = Date.now();
        const future = list
          .filter(
            (a) =>
              a.status !== 'cancelled' &&
              new Date(`${a.date}T${a.timeSlot || '00:00'}`).getTime() >= now,
          )
          .sort(
            (a, b) =>
              new Date(`${a.date}T${a.timeSlot}`).getTime() -
              new Date(`${b.date}T${b.timeSlot}`).getTime(),
          );
        setUpcomingCount(future.length);
        setNextAppt(future[0] ?? null);
      })
      .catch(() => {
        setUpcomingCount(0);
        setNextAppt(null);
      })
      .finally(() => setApptLoading(false));
  }, []);

  const handleMoodSelect = useCallback((value: MoodValue) => {
    setMoodSaving(true);
    const entry: MoodEntry = { value, date: todayStr() };
    writeMood(entry);
    setTimeout(() => {
      setTodayMood(value);
      setMoodHistory((prev) => [...prev.filter((e) => e.date !== entry.date), entry]);
      setMoodStreak((prev) => Math.max(prev, 1));
      setMoodSaving(false);
    }, 250);
  }, []);

  const completedStep = intakeCompleted ? 1 : 0;

  const actions: ActionItem[] = [
    {
      href: '/demo',
      label: 'Clinical intake',
      description: intakeCompleted ? 'Review or update responses' : 'AI-guided assessment',
      icon: MessageCircle,
      accent: 'bg-teal-50 text-teal-600',
      primary: !intakeCompleted,
      done: intakeCompleted,
    },
    {
      href: '/care',
      label: 'My care plan',
      description: 'Insights & next steps',
      icon: Heart,
      accent: 'bg-rose-50 text-rose-500',
      locked: !intakeCompleted,
    },
    {
      href: '/appointments',
      label: 'Appointments',
      description: `${upcomingCount} upcoming · Book`,
      icon: Calendar,
      accent: 'bg-blue-50 text-blue-600',
      locked: !intakeCompleted,
    },
    {
      href: '/resources',
      label: 'Resources',
      description: 'Guides & exercises',
      icon: BookOpen,
      accent: 'bg-violet-50 text-violet-600',
      locked: !intakeCompleted,
    },
  ];

  return (
    <div className="min-h-full bg-[#f8fafb]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5 space-y-4">

        <WelcomeBanner intakeCompleted={intakeCompleted} />

        {/* Row: Journey + Mood side by side */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          <div className="lg:col-span-3">
            <JourneyProgress completedStep={completedStep} />
          </div>
          <div className="lg:col-span-2">
            <MoodCheckin
              todayMood={todayMood}
              streak={moodStreak}
              moodHistory={moodHistory}
              onSelect={handleMoodSelect}
              disabled={moodSaving}
            />
          </div>
        </div>

        {/* Row: Appointment + Tip + Crisis */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          <section className="lg:col-span-3" aria-label="Next appointment">
            <SectionLabel>Next appointment</SectionLabel>
            <div className="mt-2">
              {apptLoading ? (
                <AppointmentSkeleton />
              ) : nextAppt ? (
                <AppointmentCard appointment={nextAppt} />
              ) : (
                <AppointmentEmpty />
              )}
            </div>
          </section>
          <div className="lg:col-span-2">
            <WellnessTip tip={tip} />
          </div>
        </div>

        {/* Actions grid */}
        <section aria-label="Quick actions">
          <SectionLabel>Quick actions</SectionLabel>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-2">
            {actions.map((action) => (
              <QuickActionCard key={action.href} {...action} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
