'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { PageBackground } from '@/components/application/PageBg';
import { useIntake } from '@/contexts/IntakeContext';
import { WelcomeBanner } from './WelcomeBanner';
import { MoodCheckin } from './MoodCheckin';
import { AppointmentCard, AppointmentEmpty, AppointmentSkeleton } from './AppointmentCard';
import { WellnessTip } from './WellnessTip';
import {
  type Appointment,
  type MoodValue,
  type MoodEntry,
  WELLNESS_TIPS,
  todayStr,
  readMoods,
  writeMood,
  computeStreak,
} from './Types';

export function DashboardView() {
  const { intakeCompleted } = useIntake();

  const [apptLoading, setApptLoading] = useState(true);
  const [nextAppt, setNextAppt] = useState<Appointment | null>(null);

  const [todayMood, setTodayMood] = useState<MoodValue | null>(null);
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>([]);
  const [moodStreak, setMoodStreak] = useState(0);
  const [moodSaving, setMoodSaving] = useState(false);

  const tip = useMemo(() => WELLNESS_TIPS[Math.floor(Math.random() * WELLNESS_TIPS.length)], []);

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
        setNextAppt(future[0] ?? null);
      })
      .catch(() => setNextAppt(null))
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

  return (
    <PageBackground>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5 space-y-4">

        <WelcomeBanner intakeCompleted={intakeCompleted} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start mt-8">
          <MoodCheckin
            todayMood={todayMood}
            streak={moodStreak}
            moodHistory={moodHistory}
            onSelect={handleMoodSelect}
            disabled={moodSaving}
          />

          <section aria-label="Next appointment" className="flex flex-col gap-2">
            <h2 className="text-[10px] font-bold text-teal-700/60 uppercase tracking-[0.08em]">
              Next appointment
            </h2>
            {apptLoading ? (
              <AppointmentSkeleton />
            ) : nextAppt ? (
              <AppointmentCard appointment={nextAppt} />
            ) : (
              <AppointmentEmpty />
            )}
          </section>
        </div>

        <WellnessTip tip={tip} />

      </div>
    </PageBackground>
  );
}