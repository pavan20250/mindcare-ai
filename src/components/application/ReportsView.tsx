'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  BarChart2, TrendingUp, TrendingDown, Minus, Calendar, Heart,
  Activity, Brain, Download, ChevronRight, CheckCircle2, Clock,
  Smile, Meh, Frown, Sun, CloudRain, AlertCircle, FileText,
  Sparkles, Shield,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */
type MoodValue = 'great' | 'good' | 'okay' | 'low' | 'struggling';
interface MoodEntry  { value: MoodValue; date: string }
interface Appointment { id: string; doctorName: string; specialty?: string; date: string; timeSlot: string; status?: string }
interface IntakeData  { responses: Record<string, string>; completedAt?: number }

/* ------------------------------------------------------------------ */
/*  Constants                                                           */
/* ------------------------------------------------------------------ */
const MOOD_META: Record<MoodValue, { label: string; icon: typeof Sun; score: number; color: string; bg: string; dot: string }> = {
  great:      { label: 'Great',      icon: Sun,       score: 5, color: 'text-amber-500',   bg: 'bg-amber-50/60',   dot: 'bg-amber-400'   },
  good:       { label: 'Good',       icon: Smile,     score: 4, color: 'text-emerald-500', bg: 'bg-emerald-50/60', dot: 'bg-emerald-400' },
  okay:       { label: 'Okay',       icon: Meh,       score: 3, color: 'text-sky-500',     bg: 'bg-sky-50/60',     dot: 'bg-sky-400'     },
  low:        { label: 'Low',        icon: CloudRain, score: 2, color: 'text-slate-500',   bg: 'bg-white/30',      dot: 'bg-slate-400'   },
  struggling: { label: 'Struggling', icon: Frown,     score: 1, color: 'text-rose-500',    bg: 'bg-rose-50/60',    dot: 'bg-rose-400'    },
};

const INTAKE_LABELS: Record<string, string> = {
  welcome: 'Initial concerns', symptoms: 'Duration of symptoms',
  severity: 'Daily impact (1–10)', phq9: 'Interest / pleasure (PHQ-9)', recommendation: 'Care recommendation',
};

const PHQ9_SCORE: Record<string, number> = {
  'Not at all': 0, 'Several days': 1, 'More than half the days': 2, 'Nearly every day': 3,
};

const SEVERITY_LABEL: Record<string, { label: string; color: string; bg: string }> = {
  '1':  { label: 'Minimal',  color: 'text-emerald-600', bg: 'bg-emerald-50/60' },
  '2':  { label: 'Minimal',  color: 'text-emerald-600', bg: 'bg-emerald-50/60' },
  '3':  { label: 'Minimal',  color: 'text-emerald-600', bg: 'bg-emerald-50/60' },
  '4':  { label: 'Mild',     color: 'text-sky-600',     bg: 'bg-sky-50/60'     },
  '5':  { label: 'Mild',     color: 'text-sky-600',     bg: 'bg-sky-50/60'     },
  '6':  { label: 'Moderate', color: 'text-amber-600',   bg: 'bg-amber-50/60'   },
  '7':  { label: 'Moderate', color: 'text-amber-600',   bg: 'bg-amber-50/60'   },
  '8':  { label: 'High',     color: 'text-orange-600',  bg: 'bg-orange-50/60'  },
  '9':  { label: 'Severe',   color: 'text-rose-600',    bg: 'bg-rose-50/60'    },
  '10': { label: 'Severe',   color: 'text-rose-600',    bg: 'bg-rose-50/60'    },
};

const MOOD_STORAGE_KEY = 'neuralcare_moods';

/* ------------------------------------------------------------------ */
/*  Helpers                                                             */
/* ------------------------------------------------------------------ */
function readMoods(): MoodEntry[] {
  if (typeof window === 'undefined') return [];
  try { return JSON.parse(localStorage.getItem(MOOD_STORAGE_KEY) ?? '[]'); }
  catch { return []; }
}
function last7Days() {
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(); d.setDate(d.getDate() - (6 - i));
    return d.toISOString().slice(0, 10);
  });
}
function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}
function formatDateFull(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}
function dayLabel(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { weekday: 'short' }).slice(0, 2);
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                      */
/* ------------------------------------------------------------------ */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-[10px] font-bold text-teal-700/60 uppercase tracking-[0.12em]">{children}</p>;
}

function StatCard({ icon: Icon, label, value, sub, iconClass, trend }: {
  icon: typeof Heart; label: string; value: string; sub?: string; iconClass: string; trend?: 'up' | 'down' | 'flat';
}) {
  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;
  const trendColor = trend === 'up' ? 'text-emerald-500' : trend === 'down' ? 'text-rose-500' : 'text-slate-400';
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className={`flex size-8 items-center justify-center rounded-lg bg-white/40 border border-white/50 ${iconClass}`}>
            <Icon className="size-4" />
          </div>
          {trend && <TrendIcon className={`size-3.5 ${trendColor}`} />}
        </div>
        <p className="text-2xl font-bold text-slate-900 tracking-tight">{value}</p>
        <p className="text-[12px] font-medium text-slate-500 mt-0.5">{label}</p>
        {sub && <p className="text-[11px] text-slate-400 mt-0.5">{sub}</p>}
      </CardContent>
    </Card>
  );
}

function MoodBar({ date, entry }: { date: string; entry?: MoodEntry }) {
  const meta = entry ? MOOD_META[entry.value] : null;
  const score = meta?.score ?? 0;
  const heightPct = score ? (score / 5) * 100 : 0;
  return (
    <div className="flex flex-col items-center gap-1.5 flex-1">
      <div className="relative w-full flex items-end justify-center" style={{ height: 56 }}>
        <div className="w-5 rounded-t-md bg-white/30 border border-white/40 overflow-hidden" style={{ height: '100%' }}>
          <div
            className={`w-full rounded-t-md transition-all duration-500 ${meta?.dot ?? 'bg-white/20'}`}
            style={{ height: `${heightPct}%`, marginTop: 'auto' }}
          />
        </div>
        {entry && meta && (
          <div className="absolute -top-0.5 left-1/2 -translate-x-1/2">
            <div className={`size-2 rounded-full ${meta.dot}`} />
          </div>
        )}
      </div>
      <span className="text-[10px] font-medium text-slate-400">{dayLabel(date)}</span>
    </div>
  );
}

function EmptyState({ message, href, cta }: { message: string; href: string; cta: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-center gap-3">
      <div className="flex size-10 items-center justify-center rounded-full bg-white/30 border border-white/50">
        <AlertCircle className="size-4 text-slate-400" />
      </div>
      <p className="text-[13px] text-slate-500">{message}</p>
      <Button asChild size="sm" className="h-8 text-xs bg-teal-600 hover:bg-teal-700 text-white border-0 shadow-sm shadow-teal-600/20 rounded-xl">
        <Link href={href}>{cta}</Link>
      </Button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                      */
/* ------------------------------------------------------------------ */
export function ReportsView() {
  const [intake, setIntake] = useState<IntakeData | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [moods, setMoods] = useState<MoodEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'mood' | 'clinical' | 'appointments'>('overview');

  useEffect(() => {
    setMoods(readMoods());
    Promise.all([
      fetch('/api/intake',        { credentials: 'include' }).then((r) => r.json()).catch(() => ({ intake: null })),
      fetch('/api/appointments',  { credentials: 'include' }).then((r) => r.json()).catch(() => ({ appointments: [] })),
    ]).then(([intakeData, apptData]) => {
      setIntake(intakeData.intake ?? null);
      setAppointments(apptData.appointments ?? []);
    }).finally(() => setLoading(false));
  }, []);

  const days7 = useMemo(() => last7Days(), []);
  const moodMap = useMemo(() => {
    const m: Record<string, MoodEntry> = {};
    moods.forEach((e) => { m[e.date] = e; });
    return m;
  }, [moods]);

  const avgMoodScore = useMemo(() => {
    const scored = days7.map((d) => moodMap[d]?.value).filter(Boolean) as MoodValue[];
    if (!scored.length) return null;
    return scored.reduce((s, v) => s + MOOD_META[v].score, 0) / scored.length;
  }, [days7, moodMap]);

  const avgMoodLabel = useMemo(() => {
    if (!avgMoodScore) return null;
    if (avgMoodScore >= 4.5) return MOOD_META.great;
    if (avgMoodScore >= 3.5) return MOOD_META.good;
    if (avgMoodScore >= 2.5) return MOOD_META.okay;
    if (avgMoodScore >= 1.5) return MOOD_META.low;
    return MOOD_META.struggling;
  }, [avgMoodScore]);

  const moodStreak = useMemo(() => {
    let streak = 0;
    const today = new Date().toISOString().slice(0, 10);
    for (let i = 0; i <= 30; i++) {
      const d = new Date(); d.setDate(d.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      if (key > today) continue;
      if (moodMap[key]) streak++; else break;
    }
    return streak;
  }, [moodMap]);

  const completedAppts = useMemo(() =>
    appointments.filter((a) => a.status === 'confirmed' || new Date(`${a.date}T${a.timeSlot}`).getTime() < Date.now()),
    [appointments]);

  const upcomingAppts = useMemo(() =>
    appointments.filter((a) =>
      a.status !== 'cancelled' && new Date(`${a.date}T${a.timeSlot}`).getTime() >= Date.now()
    ).sort((a, b) => new Date(`${a.date}T${a.timeSlot}`).getTime() - new Date(`${b.date}T${b.timeSlot}`).getTime()),
    [appointments]);

  const severityRating = intake?.responses?.severity;
  const severityMeta = severityRating ? SEVERITY_LABEL[severityRating] : null;
  const phq9Score = intake?.responses?.phq9 ? PHQ9_SCORE[intake.responses.phq9] ?? null : null;

  const TABS = [
    { id: 'overview'     as const, label: 'Overview',     icon: BarChart2 },
    { id: 'mood'         as const, label: 'Mood',         icon: Heart     },
    { id: 'clinical'     as const, label: 'Clinical',     icon: Brain     },
    { id: 'appointments' as const, label: 'Appointments', icon: Calendar  },
  ];

  if (loading) {
    return (
      <div className="min-h-full flex items-center justify-center py-20">
        <div className="flex flex-col items-center gap-3">
          <div className="size-7 border-2 border-teal-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-400 text-sm font-medium">Loading your reports…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-5">

        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">My Reports</h1>
            <p className="text-slate-500 text-sm mt-0.5">A snapshot of your wellbeing, assessments, and care activity.</p>
          </div>
          <Button variant="outline" size="sm" onClick={() => window.print()}
            className="h-8 text-xs bg-white/30 border-white/50 backdrop-blur-sm text-slate-600 hover:bg-white/50 hover:text-teal-700 rounded-xl shrink-0">
            <Download className="size-3 mr-1.5" />Export
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white/30 backdrop-blur-sm border border-white/50 rounded-2xl p-1">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button key={id} onClick={() => setActiveTab(id)}
              className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-[12px] font-semibold transition-all ${
                activeTab === id
                  ? 'bg-teal-600 text-white shadow-sm shadow-teal-600/20'
                  : 'text-slate-500 hover:text-slate-700 hover:bg-white/40'
              }`}
            >
              <Icon className="size-3.5 shrink-0" />
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </div>

        {/* ── OVERVIEW ── */}
        {activeTab === 'overview' && (
          <div className="space-y-5">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              <StatCard icon={Heart}    label="Avg mood (7d)"  value={avgMoodLabel?.label ?? '—'} sub={avgMoodScore ? `Score ${avgMoodScore.toFixed(1)} / 5` : 'No data yet'} iconClass="text-rose-500"   trend={avgMoodScore ? (avgMoodScore >= 3.5 ? 'up' : avgMoodScore < 2.5 ? 'down' : 'flat') : undefined} />
              <StatCard icon={Activity} label="Mood streak"    value={moodStreak ? `${moodStreak}d` : '—'}  sub={moodStreak > 0 ? 'Keep it up!' : 'Log your first'} iconClass="text-amber-500"  trend={moodStreak >= 3 ? 'up' : undefined} />
              <StatCard icon={Calendar} label="Appointments"   value={String(appointments.length)}          sub={`${upcomingAppts.length} upcoming`}                iconClass="text-blue-500" />
              <StatCard icon={Brain}    label="Assessment"     value={intake ? 'Done' : 'Pending'}          sub={intake?.completedAt ? formatDate(new Date(intake.completedAt).toISOString().slice(0, 10)) : 'Not started'} iconClass={intake ? 'text-teal-600' : 'text-slate-400'} trend={intake ? 'up' : undefined} />
            </div>

            {/* Mood snapshot */}
            <Card>
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="flex size-7 items-center justify-center rounded-lg bg-white/40 border border-white/50">
                      <Heart className="size-3.5 text-rose-500" />
                    </div>
                    <SectionLabel>Mood — last 7 days</SectionLabel>
                  </div>
                  <button onClick={() => setActiveTab('mood')} className="text-[11px] text-teal-600 hover:text-teal-700 font-semibold flex items-center gap-0.5">
                    Details <ChevronRight className="size-3" />
                  </button>
                </div>
                <div className="flex gap-2 items-end">
                  {days7.map((date) => <MoodBar key={date} date={date} entry={moodMap[date]} />)}
                </div>
                {moods.length === 0 && (
                  <p className="text-[12px] text-slate-400 text-center mt-3">No mood data yet. Log your mood from the Dashboard.</p>
                )}
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Clinical snapshot */}
              <Card>
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex size-7 items-center justify-center rounded-lg bg-white/40 border border-white/50">
                      <Brain className="size-3.5 text-teal-600" />
                    </div>
                    <SectionLabel>Assessment summary</SectionLabel>
                  </div>
                  {intake ? (
                    <div className="space-y-3">
                      {severityMeta && (
                        <div className={`flex items-center justify-between py-2 px-3 rounded-xl bg-white/30 border border-white/50`}>
                          <span className="text-[12px] text-slate-500 font-medium">Impact severity</span>
                          <Badge className={`text-[10px] px-2 py-0.5 border-0 font-bold ${severityMeta.color} ${severityMeta.bg}`}>
                            {severityMeta.label} · {severityRating}/10
                          </Badge>
                        </div>
                      )}
                      {phq9Score !== null && (
                        <div className="flex items-center justify-between py-2 px-3 rounded-xl bg-white/30 border border-white/50">
                          <span className="text-[12px] text-slate-500 font-medium">PHQ-9 item</span>
                          <Badge className="text-[10px] px-2 py-0.5 bg-violet-50/60 text-violet-700 border-0 font-bold">Score {phq9Score}/3</Badge>
                        </div>
                      )}
                      {intake.completedAt && (
                        <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                          <CheckCircle2 className="size-3 text-teal-500" />
                          Completed {new Date(intake.completedAt).toLocaleDateString('en-US', { dateStyle: 'medium' })}
                        </div>
                      )}
                      <button onClick={() => setActiveTab('clinical')} className="text-[11px] text-teal-600 hover:text-teal-700 font-semibold flex items-center gap-0.5 mt-1">
                        View full report <ChevronRight className="size-3" />
                      </button>
                    </div>
                  ) : (
                    <EmptyState message="Complete your clinical intake to see your assessment report." href="/demo" cta="Start intake" />
                  )}
                </CardContent>
              </Card>

              {/* Upcoming appointments */}
              <Card>
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex size-7 items-center justify-center rounded-lg bg-white/40 border border-white/50">
                      <Calendar className="size-3.5 text-blue-500" />
                    </div>
                    <SectionLabel>Upcoming appointments</SectionLabel>
                  </div>
                  {upcomingAppts.length > 0 ? (
                    <div className="space-y-2">
                      {upcomingAppts.slice(0, 3).map((appt) => (
                        <div key={appt.id} className="flex items-center gap-3 py-2 px-3 rounded-xl bg-white/30 border border-white/50">
                          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-white/40 border border-white/50">
                            <Calendar className="size-3.5 text-blue-500" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-[12px] font-semibold text-slate-700 truncate">{appt.doctorName}</p>
                            <p className="text-[11px] text-slate-400">{formatDateFull(appt.date)} · {appt.timeSlot}</p>
                          </div>
                        </div>
                      ))}
                      {upcomingAppts.length > 3 && (
                        <button onClick={() => setActiveTab('appointments')} className="text-[11px] text-teal-600 font-semibold flex items-center gap-0.5 mt-1">
                          +{upcomingAppts.length - 3} more <ChevronRight className="size-3" />
                        </button>
                      )}
                    </div>
                  ) : (
                    <EmptyState message="No upcoming appointments scheduled." href="/appointments" cta="Book appointment" />
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* ── MOOD ── */}
        {activeTab === 'mood' && (
          <div className="space-y-4">
            <Card>
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-5">
                  <div className="flex size-7 items-center justify-center rounded-lg bg-white/40 border border-white/50">
                    <Heart className="size-3.5 text-rose-500" />
                  </div>
                  <div>
                    <SectionLabel>7-day mood chart</SectionLabel>
                    {avgMoodLabel && (
                      <p className="text-[12px] text-slate-500 mt-0.5">
                        Average: <span className={`font-semibold ${avgMoodLabel.color}`}>{avgMoodLabel.label}</span>
                      </p>
                    )}
                  </div>
                  <Badge className="ml-auto text-[10px] px-2 py-0.5 bg-white/40 text-slate-500 border border-white/60 shadow-none font-semibold backdrop-blur-sm">
                    {moodStreak}d streak
                  </Badge>
                </div>
                <div className="flex gap-2 items-end mb-4">
                  {days7.map((date) => <MoodBar key={date} date={date} entry={moodMap[date]} />)}
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1.5 pt-3 border-t border-white/30">
                  {(Object.entries(MOOD_META) as [MoodValue, typeof MOOD_META[MoodValue]][]).map(([, meta]) => (
                    <div key={meta.label} className="flex items-center gap-1.5">
                      <div className={`size-2 rounded-full ${meta.dot}`} />
                      <span className="text-[10px] text-slate-500 font-medium">{meta.label}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-5">
                <SectionLabel>Mood log</SectionLabel>
                {moods.length > 0 ? (
                  <div className="mt-3 space-y-1.5">
                    {[...moods].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 14).map((entry) => {
                      const meta = MOOD_META[entry.value];
                      const Icon = meta.icon;
                      return (
                        <div key={entry.date} className="flex items-center gap-3 py-2 px-3 rounded-xl hover:bg-white/30 transition-colors">
                          <div className={`flex size-7 shrink-0 items-center justify-center rounded-lg ${meta.bg} border border-white/50`}>
                            <Icon className={`size-3.5 ${meta.color}`} />
                          </div>
                          <span className="text-[13px] font-semibold text-slate-700 flex-1">{meta.label}</span>
                          <span className="text-[11px] text-slate-400">{formatDateFull(entry.date)}</span>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <EmptyState message="You haven't logged any moods yet. Log daily from the Dashboard." href="/dashboard" cta="Go to dashboard" />
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* ── CLINICAL ── */}
        {activeTab === 'clinical' && (
          <div className="space-y-4">
            {intake ? (
              <>
                <Card className="overflow-hidden">
                  {/* accent bar */}
                  <div className="h-0.5 bg-gradient-to-r from-teal-500 to-emerald-400" />
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="flex size-10 items-center justify-center rounded-xl bg-white/40 border border-white/50">
                          <Sparkles className="size-4 text-teal-600" />
                        </div>
                        <div>
                          <h2 className="text-[14px] font-bold text-slate-800">Clinical Intake Report</h2>
                          {intake.completedAt && (
                            <div className="flex items-center gap-1.5 mt-0.5">
                              <Clock className="size-3 text-slate-400" />
                              <p className="text-[11px] text-slate-400">{new Date(intake.completedAt).toLocaleDateString('en-US', { dateStyle: 'full' })}</p>
                            </div>
                          )}
                        </div>
                      </div>
                      <Badge className="text-[9px] px-2 py-0.5 bg-white/40 text-teal-700 border border-teal-200/60 font-bold shadow-none gap-1 shrink-0 backdrop-blur-sm">
                        <CheckCircle2 className="size-2.5" /> Completed
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {severityMeta && (
                        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-semibold bg-white/30 border border-white/50 ${severityMeta.color}`}>
                          <Activity className="size-3" />
                          Impact: {severityMeta.label} ({severityRating}/10)
                        </div>
                      )}
                      {phq9Score !== null && (
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-semibold bg-white/30 border border-white/50 text-violet-700">
                          <Brain className="size-3" />
                          PHQ-9 item: {phq9Score}/3
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex size-7 items-center justify-center rounded-lg bg-white/40 border border-white/50">
                        <FileText className="size-3.5 text-slate-500" />
                      </div>
                      <SectionLabel>Assessment responses</SectionLabel>
                    </div>
                    <div className="divide-y divide-white/30">
                      {Object.entries(intake.responses).filter(([, v]) => v && v !== '').map(([stepId, value]) => (
                        <div key={stepId} className="py-3 first:pt-0 last:pb-0">
                          <p className="text-[10px] font-bold text-teal-600 uppercase tracking-wider mb-1">{INTAKE_LABELS[stepId] ?? stepId}</p>
                          <p className="text-[13px] text-slate-700 leading-relaxed">{value}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <div className="flex items-start gap-2.5 rounded-2xl border border-white/50 bg-white/30 backdrop-blur-sm px-3.5 py-3">
                  <Shield className="size-4 text-teal-600 shrink-0 mt-0.5" />
                  <p className="text-[11px] text-teal-700 leading-snug">
                    This report is for personal reference only. Share with your care provider for clinical decisions. All data is HIPAA-compliant and encrypted.
                  </p>
                </div>
              </>
            ) : (
              <Card>
                <CardContent className="p-5">
                  <EmptyState message="Complete the clinical intake to generate your assessment report." href="/demo" cta="Start clinical intake" />
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* ── APPOINTMENTS ── */}
        {activeTab === 'appointments' && (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Total',    value: appointments.length,   color: 'text-slate-700' },
                { label: 'Upcoming', value: upcomingAppts.length,  color: 'text-blue-600'  },
                { label: 'Past',     value: completedAppts.length, color: 'text-teal-600'  },
              ].map(({ label, value, color }) => (
                <Card key={label}>
                  <CardContent className="p-4 text-center">
                    <p className={`text-2xl font-bold ${color}`}>{value}</p>
                    <p className="text-[11px] text-slate-400 font-medium mt-0.5">{label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex size-7 items-center justify-center rounded-lg bg-white/40 border border-white/50">
                    <Calendar className="size-3.5 text-blue-500" />
                  </div>
                  <SectionLabel>Upcoming</SectionLabel>
                  <Badge className="ml-auto text-[10px] px-1.5 py-0 bg-white/40 text-blue-600 border border-blue-200/60 shadow-none font-bold backdrop-blur-sm">
                    {upcomingAppts.length}
                  </Badge>
                </div>
                {upcomingAppts.length > 0 ? (
                  <div className="space-y-2">
                    {upcomingAppts.map((appt) => (
                      <div key={appt.id} className="flex items-center gap-3 py-2.5 px-3 rounded-xl border border-white/50 bg-white/30">
                        <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                          <Calendar className="size-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-[13px] font-semibold text-slate-800 truncate">{appt.doctorName}</p>
                          <p className="text-[11px] text-slate-400">{appt.specialty && `${appt.specialty} · `}{formatDateFull(appt.date)} · {appt.timeSlot}</p>
                        </div>
                        <Badge className="text-[9px] px-1.5 py-0 bg-emerald-50/60 text-emerald-700 border border-emerald-200/60 shadow-none font-bold shrink-0">
                          Confirmed
                        </Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <EmptyState message="No upcoming appointments." href="/appointments" cta="Book an appointment" />
                )}
              </CardContent>
            </Card>

            {completedAppts.length > 0 && (
              <Card>
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex size-7 items-center justify-center rounded-lg bg-white/40 border border-white/50">
                      <CheckCircle2 className="size-3.5 text-slate-500" />
                    </div>
                    <SectionLabel>Past appointments</SectionLabel>
                  </div>
                  <div className="space-y-2">
                    {completedAppts.slice(0, 5).map((appt) => (
                      <div key={appt.id} className="flex items-center gap-3 py-2 px-3 rounded-xl hover:bg-white/30 transition-colors">
                        <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-white/30 border border-white/50">
                          <CheckCircle2 className="size-3.5 text-slate-400" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-[12px] font-semibold text-slate-600 truncate">{appt.doctorName}</p>
                          <p className="text-[11px] text-slate-400">{formatDateFull(appt.date)} · {appt.timeSlot}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

      </div>
    </div>
  );
}