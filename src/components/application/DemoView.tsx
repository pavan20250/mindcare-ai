'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useIntake } from '@/contexts/IntakeContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageCircle,
  User,
  Sparkles,
  Info,
  ArrowRight,
  Check,
  RotateCcw,
  Home,
  CalendarCheck,
  BookOpen,
  ShieldCheck,
  AlertTriangle,
} from 'lucide-react';

// ─── Types ──────────────────────────────────────────────────────────────────

export interface DemoStep {
  id: string;
  title: string;
  message: string;
  type: 'message' | 'question' | 'scale' | 'recommendation';
  options?: string[];
  min?: number;
  max?: number;
  severity?: string;
  nextSteps?: string[];
}

// ─── API ────────────────────────────────────────────────────────────────────

function saveIntake(responses: Record<string, string>, completed?: boolean) {
  return fetch('/api/intake', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ responses, completed }),
  });
}

// ─── Animation presets ──────────────────────────────────────────────────────

const fade = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
};

const stagger = (i: number, base = 0.15) => ({
  initial: { opacity: 0, x: -6 },
  animate: { opacity: 1, x: 0 },
  transition: { delay: base + i * 0.05, duration: 0.25 },
});

// ─── Sub-components ─────────────────────────────────────────────────────────

function StepNav({ steps, current }: { steps: DemoStep[]; current: number }) {
  return (
    <nav className="flex flex-col gap-px" aria-label="Assessment steps">
      {steps.map((step, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <div
            key={step.id}
            className={`relative flex items-center gap-2.5 rounded-lg px-2.5 py-2 transition-all duration-150 ${
              active ? 'bg-teal-50/80' : ''
            }`}
          >
            {active && (
              <motion.div
                layoutId="step-indicator"
                className="absolute left-0 top-1/2 -translate-y-1/2 w-[2.5px] h-4 rounded-full bg-teal-600"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <span
              className={`flex size-5.5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold transition-all ${
                done
                  ? 'bg-teal-600 text-white'
                  : active
                    ? 'bg-teal-600 text-white shadow-sm shadow-teal-500/20'
                    : 'bg-slate-100 text-slate-400'
              }`}
              style={{ width: 22, height: 22 }}
            >
              {done ? <Check className="size-3" strokeWidth={2.5} /> : i + 1}
            </span>
            <span
              className={`text-xs truncate transition-colors ${
                active ? 'text-teal-800 font-semibold' : done ? 'text-slate-600' : 'text-slate-400'
              }`}
            >
              {step.title}
            </span>
          </div>
        );
      })}
    </nav>
  );
}

function TypingDots() {
  return (
    <div className="flex items-center gap-2.5 mt-4">
      <div className="size-8 shrink-0 rounded-full bg-teal-50 border border-teal-100 flex items-center justify-center">
        <Sparkles className="size-3.5 text-teal-600" />
      </div>
      <div className="rounded-2xl rounded-tl-sm bg-slate-50 border border-slate-200/60 px-4 py-2.5">
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="w-1.5 h-1.5 bg-teal-400 rounded-full"
              animate={{ opacity: [0.3, 1, 0.3], scale: [0.85, 1.1, 0.85] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2, ease: 'easeInOut' }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function AiBubble({
  step,
  children,
}: {
  step: DemoStep;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-2.5">
      <div className="size-8 shrink-0 rounded-full bg-teal-50 border border-teal-100 flex items-center justify-center mt-0.5">
        <Sparkles className="size-3.5 text-teal-600" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="rounded-2xl rounded-tl-sm bg-white border border-slate-200/80 px-4 py-3.5 shadow-sm">
          <span className="text-[10px] font-bold text-teal-600 uppercase tracking-wider">
            {step.title}
          </span>
          <p className="text-[14px] leading-relaxed text-slate-700 mt-1.5">
            {step.message}
          </p>
        </div>
        {children}
      </div>
    </div>
  );
}

function UserBubble({ text }: { text: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-end mt-3"
    >
      <div className="flex items-start gap-2.5 max-w-sm">
        <div className="rounded-2xl rounded-tr-sm bg-teal-600 px-4 py-2.5 shadow-sm shadow-teal-600/10">
          <p className="text-sm text-white font-medium">{text}</p>
        </div>
        <div className="size-8 shrink-0 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center mt-0.5">
          <User className="size-3.5 text-slate-500" />
        </div>
      </div>
    </motion.div>
  );
}

function OptionList({
  options,
  onSelect,
}: {
  options: string[];
  onSelect: (v: string) => void;
}) {
  return (
    <div className="mt-4 space-y-1.5" role="listbox" aria-label="Choose an answer">
      {options.map((option, i) => (
        <motion.button
          key={i}
          {...stagger(i)}
          whileHover={{ x: 2 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect(option)}
          role="option"
          aria-selected={false}
          className="group w-full flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white hover:border-teal-300 hover:bg-teal-50/40 py-2.5 px-3.5 text-left transition-all shadow-sm hover:shadow-md hover:shadow-teal-500/5"
        >
          <span className="size-6 shrink-0 rounded-md bg-slate-50 border border-slate-200/80 group-hover:bg-teal-100 group-hover:border-teal-200 flex items-center justify-center transition-all">
            <span className="text-[10px] font-bold text-slate-400 group-hover:text-teal-700 transition-colors">
              {String.fromCharCode(65 + i)}
            </span>
          </span>
          <span className="text-sm text-slate-600 group-hover:text-slate-800 font-medium transition-colors flex-1">
            {option}
          </span>
          <ArrowRight className="size-3 text-slate-300 group-hover:text-teal-500 shrink-0 opacity-0 group-hover:opacity-100 transition-all" />
        </motion.button>
      ))}
    </div>
  );
}

function ScaleInput({ onSelect }: { onSelect: (v: string) => void }) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="mt-4"
    >
      <div className="flex items-center justify-between text-[10px] font-medium text-slate-400 mb-2 px-0.5">
        <span>Not at all</span>
        <span>Extremely</span>
      </div>
      <div className="flex gap-1.5" role="radiogroup" aria-label="Rate severity 1 to 10">
        {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => {
          const intensity = num / 10;
          const isHot = hovered !== null && num <= hovered;
          return (
            <motion.button
              key={num}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => onSelect(num.toString())}
              onMouseEnter={() => setHovered(num)}
              onMouseLeave={() => setHovered(null)}
              role="radio"
              aria-checked={false}
              aria-label={`${num} out of 10`}
              className={`flex-1 aspect-square max-w-[42px] rounded-lg border font-semibold text-sm transition-all duration-150 ${
                isHot
                  ? 'border-teal-300 bg-teal-50 text-teal-700 shadow-sm'
                  : 'border-slate-200 bg-white text-slate-500 hover:border-teal-200'
              }`}
              style={{
                ...(isHot ? {} : { opacity: 0.5 + intensity * 0.5 }),
              }}
            >
              {num}
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}

function RecommendationPanel({
  step,
  onRestart,
}: {
  step: DemoStep;
  onRestart: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="mt-4 space-y-4"
    >
      {step.severity && (
        <div className="flex items-center gap-2 flex-wrap">
          <Badge className="text-[10px] px-2 py-0.5 bg-teal-50 text-teal-700 border border-teal-200 font-bold shadow-none gap-1">
            <Check className="size-3" />
            Assessment complete
          </Badge>
          <Badge
            variant="secondary"
            className="text-[10px] px-2 py-0.5 bg-amber-50 text-amber-700 border border-amber-200 font-bold shadow-none gap-1"
          >
            <span className="size-1.5 rounded-full bg-amber-500" />
            {step.severity} severity
          </Badge>
        </div>
      )}

      <Card className="rounded-xl border-slate-200/80 bg-white shadow-sm overflow-hidden">
        <CardContent className="p-0">
          <div className="px-4 py-3 border-b border-slate-100">
            <h3 className="text-sm font-semibold text-slate-900">Recommended next steps</h3>
            <p className="text-[11px] text-slate-400 mt-0.5">Based on your responses</p>
          </div>
          <div className="p-4 space-y-2.5">
            {step.nextSteps?.map((text, i) => (
              <motion.div
                key={i}
                {...stagger(i, 0.25)}
                className="flex items-start gap-2.5"
              >
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-teal-100 text-teal-700">
                  <Check className="size-2.5" strokeWidth={3} />
                </span>
                <span className="text-sm text-slate-600 leading-snug">{text}</span>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-wrap gap-2">
        <Button
          asChild
          size="sm"
          className="rounded-lg bg-teal-600 hover:bg-teal-700 font-semibold text-white border-0 shadow-sm shadow-teal-600/15 text-xs h-9 px-4"
        >
          <Link href="/appointments?specialty=psychologist">
            <CalendarCheck className="size-3.5 mr-1.5" />
            Book appointment
          </Link>
        </Button>
        <Button
          size="sm"
          asChild
          className="rounded-lg bg-violet-600 hover:bg-violet-700 font-semibold text-white border-0 shadow-sm shadow-violet-600/15 text-xs h-9 px-4"
        >
          <Link href="/resources">
            <BookOpen className="size-3.5 mr-1.5" />
            Resources
          </Link>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={onRestart}
          className="rounded-lg text-slate-400 hover:text-teal-600 hover:bg-teal-50 font-medium text-xs h-9 px-3"
        >
          <RotateCcw className="size-3 mr-1" />
          Restart
        </Button>
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-50 font-medium text-xs h-9 px-3"
        >
          <Link href="/dashboard">
            <Home className="size-3 mr-1" />
            Dashboard
          </Link>
        </Button>
      </div>
    </motion.div>
  );
}

// ─── Main Component ─────────────────────────────────────────────────────────

export function DemoView() {
  const searchParams = useSearchParams();
  const required = searchParams.get('required') === '1';
  const { setIntakeCompleted } = useIntake();

  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [isTyping, setIsTyping] = useState(false);
  const [demoSteps, setDemoSteps] = useState<DemoStep[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('/api/demo')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load');
        return res.json();
      })
      .then((data) => setDemoSteps(data.steps ?? []))
      .catch(() => setError('Unable to load assessment. Please try again.'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  const handleResponse = useCallback(
    (response: string) => {
      const stepId = demoSteps[currentStep]?.id;
      if (!stepId) return;
      const next = { ...responses, [stepId]: response };
      setResponses(next);
      const isLast = currentStep + 1 >= demoSteps.length - 1;
      saveIntake(next, isLast)
        .then(() => { if (isLast) setIntakeCompleted(true); })
        .catch(() => {});
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        if (currentStep < demoSteps.length - 1) setCurrentStep((p) => p + 1);
      }, 1000);
    },
    [demoSteps, currentStep, responses, setIntakeCompleted],
  );

  const handleRestart = useCallback(() => {
    setCurrentStep(0);
    setResponses({});
    saveIntake({}).catch(() => {});
  }, []);

  const step = demoSteps[currentStep];
  const pct = demoSteps.length ? ((currentStep + 1) / demoSteps.length) * 100 : 0;

  // ── Loading state ──
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="size-8 border-2 border-teal-500 border-t-transparent rounded-full"
        />
        <p className="text-slate-500 text-sm font-medium">Preparing assessment…</p>
      </div>
    );
  }

  // ── Error state ──
  if (error || !demoSteps.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-xs w-full rounded-xl border border-slate-200 bg-white p-6 text-center shadow-sm"
        >
          <div className="size-10 mx-auto mb-3 rounded-full bg-red-50 flex items-center justify-center">
            <Info className="size-4 text-red-500" />
          </div>
          <p className="text-slate-600 text-sm mb-4">{error ?? 'No steps available.'}</p>
          <Button
            asChild
            size="sm"
            className="rounded-lg bg-teal-600 text-white font-semibold border-0 hover:bg-teal-700"
          >
            <Link href="/dashboard">Back to dashboard</Link>
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-svh w-full overflow-hidden bg-[#f8fafb]">
      {/* ── Header ── */}
      <header className="shrink-0 border-b border-slate-200/80 bg-white px-4 sm:px-6 py-2.5">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="flex size-8 items-center justify-center rounded-lg bg-teal-600 text-white shadow-sm shadow-teal-600/20">
              <MessageCircle className="size-3.5" />
            </div>
            <div className="min-w-0">
              <h1 className="text-sm font-semibold tracking-tight text-slate-900 truncate">
                Clinical Intake
              </h1>
              <p className="text-[11px] text-slate-400">
                Step {currentStep + 1}/{demoSteps.length}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span className="hidden sm:inline text-xs font-bold tabular-nums text-slate-500">
              {Math.round(pct)}%
            </span>
            <div className="w-20 sm:w-24 h-1.5 rounded-full bg-slate-100 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-teal-500 to-teal-400"
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              />
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 min-h-0">
        {/* ── Desktop sidebar ── */}
        <aside className="hidden md:flex w-52 shrink-0 flex-col border-r border-slate-200/80 bg-white">
          <div className="flex-1 overflow-y-auto p-3">
            <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-slate-400 mb-2 px-2.5">
              Steps
            </p>
            <StepNav steps={demoSteps} current={currentStep} />
          </div>
          <div className="p-3 border-t border-slate-100 space-y-2">
            {required && (
              <div className="rounded-lg border border-amber-200 bg-amber-50 p-2.5">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <AlertTriangle className="size-3 text-amber-500 shrink-0" />
                  <span className="text-[10px] font-bold text-amber-700">Required</span>
                </div>
                <p className="text-[10px] text-amber-600 leading-relaxed">
                  Complete to unlock all features.
                </p>
              </div>
            )}
            <div className="flex items-start gap-1.5 px-2.5">
              <ShieldCheck className="size-3 text-teal-500 shrink-0 mt-0.5" />
              <span className="text-[10px] text-slate-400 leading-relaxed">
                HIPAA compliant &amp; encrypted
              </span>
            </div>
          </div>
        </aside>

        {/* ── Mobile step pills ── */}
        <div className="md:hidden shrink-0 border-b border-slate-200/60 bg-white px-4 py-2.5">
          <div className="flex gap-1 items-center">
            {demoSteps.map((_, i) => (
              <div
                key={i}
                className={`h-1 rounded-full flex-1 transition-colors duration-300 ${
                  i <= currentStep ? 'bg-teal-500' : 'bg-slate-200'
                }`}
              />
            ))}
          </div>
          <p className="text-[11px] text-slate-500 mt-1.5 font-medium">{step.title}</p>
          {required && (
            <p className="text-amber-600 text-[10px] mt-0.5 font-medium">
              Required to unlock all features
            </p>
          )}
        </div>

        {/* ── Chat area ── */}
        <main className="flex-1 min-w-0 flex flex-col overflow-hidden">
          <div ref={scrollRef} className="flex-1 min-h-0 overflow-y-auto px-4 sm:px-8 py-5 sm:py-8">
            <div className="mx-auto max-w-xl">
              <AnimatePresence mode="wait">
                <motion.div key={step.id} {...fade}>

                  <AiBubble step={step}>
                    {/* User's response echo */}
                    {responses[step.id] && <UserBubble text={responses[step.id]} />}

                    {/* Typing indicator */}
                    {isTyping && <TypingDots />}

                    {/* ── Continue (message type) ── */}
                    {!isTyping && step.type === 'message' && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.12 }}
                        className="mt-4"
                      >
                        <Button
                          onClick={() => handleResponse('')}
                          size="sm"
                          className="rounded-lg bg-teal-600 hover:bg-teal-700 px-5 font-semibold text-white border-0 shadow-sm shadow-teal-600/15 text-xs h-9"
                        >
                          Continue
                          <ArrowRight className="size-3.5 ml-1.5" />
                        </Button>
                      </motion.div>
                    )}

                    {/* ── Multiple choice ── */}
                    {!isTyping && step.type === 'question' && step.options && (
                      <OptionList options={step.options} onSelect={handleResponse} />
                    )}

                    {/* ── Scale 1-10 ── */}
                    {!isTyping && step.type === 'scale' && (
                      <ScaleInput onSelect={handleResponse} />
                    )}

                    {/* ── Recommendation ── */}
                    {!isTyping && step.type === 'recommendation' && (
                      <RecommendationPanel step={step} onRestart={handleRestart} />
                    )}
                  </AiBubble>

                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
