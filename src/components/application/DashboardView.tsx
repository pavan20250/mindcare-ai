'use client';

import { useState, useEffect, useMemo } from 'react';
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
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useIntake } from '@/contexts/IntakeContext';

const TIPS = [
  'A 10-minute walk can significantly improve mood and reduce stress hormones.',
  'Try the 4-7-8 technique: inhale 4s, hold 7s, exhale 8s. Repeat 3 times.',
  'Writing down three things you\'re grateful for daily can shift focus from worry.',
  'Consistent sleep and wake times help regulate your circadian rhythm.',
  'Staying hydrated improves cognitive function and emotional regulation.',
  'Taking a few minutes to stretch throughout the day can reduce tension and anxiety.',
];

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

const STEPS = [
  { key: 'intake', label: 'Intake' },
  { key: 'care', label: 'Care' },
  { key: 'book', label: 'Book' },
  { key: 'resources', label: 'Learn' },
] as const;

export function DashboardView() {
  const { intakeCompleted } = useIntake();
  const [upcomingCount, setUpcomingCount] = useState<number | null>(null);
  const [nextAppt, setNextAppt] = useState<{
    doctorName: string;
    date: string;
    timeSlot: string;
  } | null>(null);

  const tip = useMemo(() => TIPS[Math.floor(Math.random() * TIPS.length)], []);

  useEffect(() => {
    fetch('/api/appointments', { credentials: 'include' })
      .then((r) => r.json())
      .then((d) => {
        const list = (d?.appointments ?? []) as {
          doctorName: string;
          date: string;
          timeSlot: string;
          status?: string;
        }[];
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
      .catch(() => setUpcomingCount(0));
  }, []);

  const completedStep = intakeCompleted ? 1 : 0;

  const actions: {
    href: string;
    label: string;
    sub: string;
    icon: typeof MessageCircle;
    color: string;
    hoverColor: string;
    primary?: boolean;
    done?: boolean;
    locked?: boolean;
  }[] = [
    {
      href: '/demo',
      label: 'Clinical intake',
      sub: intakeCompleted ? 'Review or update' : 'Start your AI assessment',
      icon: MessageCircle,
      color: intakeCompleted ? 'bg-emerald-500' : 'bg-teal-600',
      hoverColor: intakeCompleted ? 'group-hover:bg-emerald-600' : 'group-hover:bg-teal-700',
      primary: !intakeCompleted,
      done: intakeCompleted,
    },
    {
      href: '/care',
      label: 'My care',
      sub: 'Summary & next steps',
      icon: Heart,
      color: 'bg-rose-500',
      hoverColor: 'group-hover:bg-rose-600',
      locked: !intakeCompleted,
    },
    {
      href: '/appointments',
      label: 'Appointments',
      sub: 'Book or manage sessions',
      icon: Calendar,
      color: 'bg-blue-500',
      hoverColor: 'group-hover:bg-blue-600',
      locked: !intakeCompleted,
    },
    {
      href: '/resources',
      label: 'Resources',
      sub: 'Self-help & support',
      icon: BookOpen,
      color: 'bg-violet-500',
      hoverColor: 'group-hover:bg-violet-600',
      locked: !intakeCompleted,
    },
  ];

  return (
    <div className="h-full flex flex-col bg-[#f8fafb]">
      <div className="flex-1 flex flex-col max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6 gap-5 sm:gap-6">

        {/* ── Header ── */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <p className="text-xs font-semibold text-teal-600 uppercase tracking-widest">
              {getGreeting()}
            </p>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-0.5">
              Dashboard
            </h1>
          </div>
          <Button
            asChild
            className="rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-semibold border-0 shadow-sm shadow-teal-600/20 px-5"
          >
            <Link href={intakeCompleted ? '/care' : '/demo'}>
              {intakeCompleted ? 'View care plan' : 'Start intake'}
              <ArrowRight className="size-4 ml-1.5" />
            </Link>
          </Button>
        </div>

        {/* ── Top row: progress + stats ── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">

          {/* Progress card */}
          <Card className="lg:col-span-3 rounded-xl border-slate-200/80 bg-white shadow-sm">
            <CardContent className="p-4 sm:p-5">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">
                Your journey
              </p>
              <div className="flex items-center">
                {STEPS.map((step, i) => {
                  const done = i < completedStep;
                  const current = i === completedStep;
                  return (
                    <div key={step.key} className="flex items-center flex-1 min-w-0 last:flex-none">
                      <div className="flex flex-col items-center gap-1">
                        <div
                          className={`flex size-8 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                            done
                              ? 'bg-teal-600 text-white'
                              : current
                                ? 'bg-teal-50 text-teal-700 ring-2 ring-teal-500/40'
                                : 'bg-slate-100 text-slate-400'
                          }`}
                        >
                          {done ? <CheckCircle2 className="size-4" /> : i + 1}
                        </div>
                        <span
                          className={`text-[10px] font-semibold ${
                            done ? 'text-teal-700' : current ? 'text-teal-600' : 'text-slate-400'
                          }`}
                        >
                          {step.label}
                        </span>
                      </div>
                      {i < STEPS.length - 1 && (
                        <div
                          className={`h-[2px] flex-1 mx-2 rounded-full ${
                            done ? 'bg-teal-400' : 'bg-slate-200'
                          }`}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Stat: Intake + Appointments */}
          <Card className="lg:col-span-2 rounded-xl border-slate-200/80 bg-white shadow-sm">
            <CardContent className="p-4 sm:p-5 flex gap-5 items-center h-full">
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                  Intake
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`size-2 rounded-full ${intakeCompleted ? 'bg-emerald-500' : 'bg-amber-400'}`} />
                  <span className="text-sm font-semibold text-slate-900">
                    {intakeCompleted ? 'Complete' : 'Pending'}
                  </span>
                </div>
              </div>
              <div className="w-px self-stretch bg-slate-100" />
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                  Appointments
                </p>
                <p className="text-sm font-semibold text-slate-900 mt-1">
                  {upcomingCount !== null ? `${upcomingCount} upcoming` : '—'}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ── Next appointment (conditional) ── */}
        {nextAppt && (
          <div className="flex items-center gap-3 rounded-xl bg-blue-50/80 border border-blue-100 px-4 py-3">
            <div className="flex size-8 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
              <Calendar className="size-4" />
            </div>
            <p className="text-sm text-slate-700 flex-1 min-w-0 truncate">
              <span className="font-semibold">{nextAppt.doctorName}</span>
              <span className="mx-1.5 text-slate-300">&middot;</span>
              {new Date(nextAppt.date + 'T12:00:00').toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
              })}{' '}
              at {formatTime(nextAppt.timeSlot)}
            </p>
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="shrink-0 text-blue-600 hover:text-blue-700 hover:bg-blue-100 font-semibold rounded-lg"
            >
              <Link href="/appointments">View</Link>
            </Button>
          </div>
        )}

        {/* ── Action cards (2×2 grid) ── */}
        <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 content-start">
          {actions.map(({ href, label, sub, icon: Icon, color, hoverColor, primary, done, locked }) => (
            <Card
              key={href}
              className={`rounded-xl border-slate-200/80 bg-white shadow-sm overflow-hidden transition-all duration-200 ${
                locked ? 'opacity-55 saturate-50' : 'hover:shadow-md hover:border-slate-300'
              } ${primary ? 'ring-2 ring-teal-300/60' : ''}`}
            >
              <CardContent className="p-0">
                <Link
                  href={href}
                  className={`group flex flex-col gap-3 p-4 sm:p-5 h-full ${locked ? 'pointer-events-none' : ''}`}
                >
                  <div className="flex items-start justify-between">
                    <div
                      className={`flex size-10 items-center justify-center rounded-xl text-white transition-colors ${
                        locked ? 'bg-slate-300' : `${color} ${hoverColor}`
                      }`}
                    >
                      {done ? (
                        <CheckCircle2 className="size-5" />
                      ) : locked ? (
                        <Lock className="size-4" />
                      ) : (
                        <Icon className="size-5" />
                      )}
                    </div>
                    {primary && (
                      <Badge className="text-[9px] px-1.5 py-0 bg-teal-50 text-teal-700 border border-teal-200 font-bold">
                        Step 1
                      </Badge>
                    )}
                    {done && (
                      <Badge className="text-[9px] px-1.5 py-0 bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">
                        Done
                      </Badge>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 text-[13px] leading-tight">{label}</h3>
                    <p className="text-slate-500 text-xs mt-0.5 leading-snug">{sub}</p>
                  </div>
                  {!locked && (
                    <div className="mt-auto pt-1">
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-400 group-hover:text-teal-600 transition-colors">
                        Open
                        <ArrowRight className="size-3 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </div>
                  )}
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* ── Wellness tip ── */}
        <div className="flex items-center gap-3 rounded-xl bg-white border border-slate-200/80 shadow-sm px-4 py-3">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-500">
            <Lightbulb className="size-4" />
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            <span className="font-bold text-amber-600 uppercase tracking-wider text-[10px] mr-1.5">Tip</span>
            {tip}
          </p>
        </div>
      </div>
    </div>
  );
}
