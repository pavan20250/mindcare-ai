'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, Brain, Wind, Moon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PageBackground } from '@/components/application/PageBg';
import { useIntake } from '@/contexts/IntakeContext';
import { WelcomeBanner } from './WelcomeBanner';
import { MoodCheckin } from './MoodCheckin';
import { AppointmentCard, AppointmentEmpty, AppointmentSkeleton } from './AppointmentCard';
import { WellnessTip } from './WellnessTip';
import { NeuralPerformanceIndex } from './Neuralperformanceindex';
import { FocusMetrics } from './Focusmetrics';
import { StressLevel } from './Stresslevel';
import { CarePlanSummary } from './Careplansummary';
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

const CHAT_PROMPTS = [
  { text: 'How can I reduce anxiety today?', icon: Brain },
  { text: 'What are quick mindfulness techniques?', icon: Wind },
  { text: 'Help me understand my PHQ-9 score', icon: Brain },
  { text: 'Tips for better sleep tonight', icon: Moon },
];

function AiChatCard() {
  const prompt = useMemo(
    () => CHAT_PROMPTS[Math.floor(Math.random() * CHAT_PROMPTS.length)],
    [],
  );
  const PromptIcon = prompt.icon;

  return (
    <div className="flex flex-col gap-2">
      {/* Header label only — badge moves inside */}
      <h2 className="text-[10px] font-bold text-teal-700/60 uppercase tracking-[0.08em]">
        AI assistant
      </h2>

      <Card>
        <CardContent className="p-3">

          <div className="flex items-center gap-2.5">
            <div className="flex size-9 items-center justify-center rounded-xl bg-teal-50 border border-teal-100 shrink-0">
              <Sparkles className="size-4 text-teal-600" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-slate-800 leading-tight">NeuralCare AI</p>
              <p className="text-[11px] text-slate-500">Mental health assistant</p>
            </div>
            <Badge
              variant="secondary"
              className="text-[9px] font-semibold bg-white/40 text-emerald-700 border border-emerald-200/60 gap-1 px-1.5 py-0 shrink-0"
            >
              <span className="inline-block size-1.5 rounded-full bg-emerald-500" />
              Online
            </Badge>
          </div>

          {/* Suggested prompt */}
          <div className="flex items-start gap-2 mt-2 rounded-xl bg-white/30 border border-white/50 px-2.5 py-2">
            <PromptIcon className="size-3 text-teal-500 shrink-0 mt-0.5" />
            <p className="text-[11px] text-slate-500 leading-snug">
              <span className="font-medium text-slate-400">Try: </span>
              &ldquo;{prompt.text}&rdquo;
            </p>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between mt-4 pt-2 border-t border-white/30">
            <span className="text-[9px] text-slate-400 font-medium">Available 24 / 7</span>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {[Brain, Wind, Moon].map((Icon, i) => (
                  <div
                    key={i}
                    className="size-2.5 rounded-full bg-teal-100/60 border border-teal-200/40 flex items-center justify-center"
                  >
                    <Icon className="size-1.5 text-teal-500" />
                  </div>
                ))}
              </div>
              <Link
                href="/chat"
                className="inline-flex items-center gap-0.5 text-[11px] font-semibold text-teal-600 hover:text-teal-700 transition-colors"
              >
                Open chat
                <ArrowRight className="size-3" />
              </Link>
            </div>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}

export function DashboardView() {
  const { intakeCompleted } = useIntake();

  const [apptLoading, setApptLoading] = useState(true);
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
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 space-y-3">

        {/* Welcome banner */}
        <WelcomeBanner intakeCompleted={intakeCompleted} />

        {/* Row 1: AI assistant + Next appointment */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-start">
          <AiChatCard />

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

        {/* Row 2: Daily check-in + Wellness tip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-start">
          <MoodCheckin
            todayMood={todayMood}
            streak={moodStreak}
            moodHistory={moodHistory}
            onSelect={handleMoodSelect}
            disabled={moodSaving}
          />
          <WellnessTip tip={tip} />
        </div>

        {/* Row 3: Neural Performance + Focus Metrics + Stress Level */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <NeuralPerformanceIndex />
          <FocusMetrics />
          <StressLevel level="Low" />
        </div>

        {/* Row 4: Care Plan Summary */}
        <CarePlanSummary
          goal="Enhanced Focus"
          completionPct={25}
        />

      </div>
    </PageBackground>
  );
}