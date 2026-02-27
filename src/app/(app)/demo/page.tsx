'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
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
  Activity,
  AlertTriangle,
} from 'lucide-react';

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

function saveIntake(responses: Record<string, string>, completed?: boolean) {
  return fetch('/api/intake', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ responses, completed }),
  });
}

const fadeSlide = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
};

function StepIndicator({ steps, current }: { steps: DemoStep[]; current: number }) {
  return (
    <div className="flex flex-col gap-0.5">
      {steps.map((step, i) => {
        const isActive = i === current;
        const isCompleted = i < current;
        return (
          <div
            key={step.id}
            className={`relative flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all duration-200 ${
              isActive
                ? 'bg-teal-50 border border-teal-200/60'
                : 'border border-transparent'
            }`}
          >
            <span
              className={`flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-teal-600 text-white shadow-sm shadow-teal-600/20'
                  : isCompleted
                    ? 'bg-teal-100 text-teal-700'
                    : 'bg-slate-100 text-slate-400'
              }`}
            >
              {isCompleted ? (
                <Check className="size-3.5" strokeWidth={2.5} />
              ) : (
                i + 1
              )}
            </span>
            <span
              className={`text-[13px] truncate transition-colors ${
                isActive
                  ? 'text-teal-800 font-semibold'
                  : isCompleted
                    ? 'text-slate-600'
                    : 'text-slate-400'
              }`}
            >
              {step.title}
            </span>
            {isActive && (
              <motion.div
                layoutId="step-bar"
                className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-full bg-teal-600"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
      <motion.div
        className="h-full rounded-full bg-gradient-to-r from-teal-500 to-teal-400"
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      />
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-3 mt-5">
      <div className="size-9 shrink-0 rounded-full bg-teal-50 border border-teal-100 flex items-center justify-center">
        <Sparkles className="size-4 text-teal-600" />
      </div>
      <div className="rounded-2xl rounded-tl-sm bg-slate-50 border border-slate-200/60 px-5 py-3">
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="w-1.5 h-1.5 bg-teal-500 rounded-full"
              animate={{ opacity: [0.25, 1, 0.25], scale: [0.85, 1.15, 0.85] }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: i * 0.2,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function ScaleButton({ num, onClick }: { num: number; onClick: (v: string) => void }) {
  return (
    <motion.button
      whileHover={{ scale: 1.08, y: -2 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => onClick(num.toString())}
      className="size-11 rounded-full border border-slate-200 bg-white font-medium text-sm text-slate-600 hover:border-teal-300 hover:bg-teal-50 hover:text-teal-700 transition-colors shadow-sm"
    >
      {num}
    </motion.button>
  );
}

export default function DemoPage() {
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
        if (!res.ok) throw new Error('Failed to load demo');
        return res.json();
      })
      .then((data) => setDemoSteps(data.steps ?? []))
      .catch(() => setError('Unable to load demo. Please try again.'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  const handleResponse = useCallback(
    (response: string) => {
      const stepId = demoSteps[currentStep]?.id;
      if (!stepId) return;
      const nextResponses = { ...responses, [stepId]: response };
      setResponses(nextResponses);
      const reachedRecommendation = currentStep + 1 >= demoSteps.length - 1;
      saveIntake(nextResponses, reachedRecommendation)
        .then(() => {
          if (reachedRecommendation) setIntakeCompleted(true);
        })
        .catch(() => {});
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        if (currentStep < demoSteps.length - 1) {
          setCurrentStep((prev) => prev + 1);
        }
      }, 1200);
    },
    [demoSteps, currentStep, responses, setIntakeCompleted],
  );

  const handleRestart = useCallback(() => {
    setCurrentStep(0);
    setResponses({});
    saveIntake({}).catch(() => {});
  }, []);

  const currentStepData = demoSteps[currentStep];
  const progress = demoSteps.length ? ((currentStep + 1) / demoSteps.length) * 100 : 0;

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="size-9 border-2 border-teal-500 border-t-transparent rounded-full"
        />
        <p className="text-slate-500 text-sm font-medium tracking-wide">
          Preparing your assessment…
        </p>
      </div>
    );
  }

  if (error || demoSteps.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-sm w-full rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-lg"
        >
          <div className="size-12 mx-auto mb-4 rounded-full bg-red-50 flex items-center justify-center">
            <Info className="size-5 text-red-500" />
          </div>
          <p className="text-slate-600 mb-6 text-sm leading-relaxed">
            {error ?? 'No assessment steps available.'}
          </p>
          <Button
            asChild
            className="rounded-xl bg-teal-600 text-white font-semibold border-0 px-6 hover:bg-teal-700"
          >
            <Link href="/">Back to Home</Link>
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-svh w-full overflow-hidden bg-[#f8fafb]">
      {/* Header */}
      <header className="shrink-0 border-b border-slate-200/80 bg-white px-5 sm:px-8 py-3.5">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex size-9 items-center justify-center rounded-xl bg-teal-600 text-white shadow-sm shadow-teal-600/20">
              <MessageCircle className="size-4" />
            </div>
            <div className="min-w-0">
              <h1 className="text-[15px] font-semibold tracking-tight text-slate-900 truncate">
                Clinical Intake Assessment
              </h1>
              <p className="text-xs text-slate-400 mt-0.5">
                Step {currentStep + 1} of {demoSteps.length}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <div className="hidden sm:block text-right">
              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                Progress
              </p>
              <p className="text-sm font-bold tabular-nums text-slate-700">
                {Math.round(progress)}%
              </p>
            </div>
            <div className="w-20 sm:w-28">
              <ProgressBar value={progress} />
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 min-h-0">
        {/* Sidebar — desktop */}
        <aside className="hidden md:flex w-56 shrink-0 flex-col border-r border-slate-200/80 bg-white">
          <div className="flex-1 overflow-y-auto p-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400 mb-3 px-1">
              Steps
            </p>
            <StepIndicator steps={demoSteps} current={currentStep} />
          </div>
          <div className="p-4 border-t border-slate-100 space-y-3">
            {required && (
              <div className="rounded-xl border border-amber-200 bg-amber-50 p-3">
                <div className="flex items-center gap-2 mb-1">
                  <AlertTriangle className="size-3.5 text-amber-500 shrink-0" />
                  <span className="text-xs font-semibold text-amber-700">Required</span>
                </div>
                <p className="text-[11px] text-amber-600 leading-relaxed">
                  Complete this assessment to access all features.
                </p>
              </div>
            )}
            <div className="flex items-start gap-2 px-1">
              <ShieldCheck className="size-3.5 text-teal-500 shrink-0 mt-0.5" />
              <span className="text-[11px] text-slate-400 leading-relaxed">
                Responses saved securely &amp; HIPAA compliant
              </span>
            </div>
          </div>
        </aside>

        {/* Mobile step indicator */}
        <div className="md:hidden shrink-0 border-b border-slate-200/60 bg-white px-5 py-3">
          <div className="flex gap-1.5 items-center">
            {demoSteps.map((_, i) => (
              <div
                key={i}
                className={`h-1 rounded-full flex-1 transition-colors duration-300 ${
                  i <= currentStep ? 'bg-teal-500' : 'bg-slate-200'
                }`}
              />
            ))}
          </div>
          <p className="text-xs text-slate-500 mt-2 font-medium">
            {currentStepData.title}
          </p>
          {required && (
            <p className="text-amber-600 text-[10px] mt-1 font-medium">
              Complete assessment to unlock all features
            </p>
          )}
        </div>

        {/* Main content */}
        <main className="flex-1 min-w-0 flex flex-col overflow-hidden">
          <div
            ref={scrollRef}
            className="flex-1 min-h-0 overflow-y-auto px-5 sm:px-8 py-6 sm:py-10"
          >
            <div className="mx-auto max-w-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStepData.id}
                  initial={fadeSlide.initial}
                  animate={fadeSlide.animate}
                  exit={fadeSlide.exit}
                  transition={fadeSlide.transition}
                >
                  {/* AI message */}
                  <div className="flex items-start gap-3">
                    <div className="size-9 shrink-0 rounded-full bg-teal-50 border border-teal-100 flex items-center justify-center mt-0.5">
                      <Sparkles className="size-4 text-teal-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="rounded-2xl rounded-tl-sm bg-white border border-slate-200/80 p-5 shadow-sm">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-[11px] font-bold text-teal-600 uppercase tracking-wider">
                            MindCare AI
                          </span>
                          <span className="size-1 rounded-full bg-slate-300" />
                          <span className="text-[11px] text-slate-400 font-medium">
                            {currentStepData.title}
                          </span>
                        </div>
                        <p className="text-[15px] leading-relaxed text-slate-700">
                          {currentStepData.message}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* User response echo */}
                  {responses[currentStepData.id] && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-end mt-4"
                    >
                      <div className="flex items-start gap-3 max-w-md">
                        <div className="rounded-2xl rounded-tr-sm bg-teal-600 px-5 py-3 shadow-sm shadow-teal-600/10">
                          <p className="text-sm text-white font-medium">
                            {responses[currentStepData.id]}
                          </p>
                        </div>
                        <div className="size-9 shrink-0 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center mt-0.5">
                          <User className="size-4 text-slate-500" />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {isTyping && <TypingIndicator />}

                  {/* Continue */}
                  {!isTyping && currentStepData.type === 'message' && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 }}
                      className="mt-6 flex justify-start ml-12"
                    >
                      <Button
                        onClick={() => handleResponse('')}
                        className="rounded-xl bg-teal-600 hover:bg-teal-700 px-7 py-5 font-semibold text-white border-0 shadow-md shadow-teal-600/15 transition-all"
                      >
                        Continue
                        <ArrowRight className="size-4 ml-1.5" />
                      </Button>
                    </motion.div>
                  )}

                  {/* Question options */}
                  {!isTyping && currentStepData.type === 'question' && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 }}
                      className="mt-6 ml-12 space-y-2"
                    >
                      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400 mb-3">
                        Choose one
                      </p>
                      {currentStepData.options?.map((option, index) => (
                        <motion.button
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.06 * index + 0.2 }}
                          whileHover={{ x: 3 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleResponse(option)}
                          className="group w-full flex items-center gap-3 rounded-xl border border-slate-200 bg-white hover:border-teal-300 hover:bg-teal-50/50 py-3.5 px-4 text-left transition-all shadow-sm hover:shadow-md hover:shadow-teal-500/5"
                        >
                          <span className="size-7 shrink-0 rounded-lg bg-slate-50 border border-slate-200/80 group-hover:bg-teal-100 group-hover:border-teal-200 flex items-center justify-center transition-all">
                            <span className="text-xs font-semibold text-slate-400 group-hover:text-teal-700 transition-colors">
                              {String.fromCharCode(65 + index)}
                            </span>
                          </span>
                          <span className="text-sm text-slate-600 group-hover:text-slate-800 font-medium transition-colors">
                            {option}
                          </span>
                          <ArrowRight className="size-3.5 text-slate-300 group-hover:text-teal-500 ml-auto shrink-0 opacity-0 group-hover:opacity-100 transition-all" />
                        </motion.button>
                      ))}
                    </motion.div>
                  )}

                  {/* Scale */}
                  {!isTyping && currentStepData.type === 'scale' && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 }}
                      className="mt-6 ml-12 space-y-4"
                    >
                      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400 text-center">
                        Rate impact on daily life
                      </p>
                      <div className="flex flex-col items-center gap-3">
                        <div className="flex flex-wrap justify-center gap-2.5">
                          {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                            <ScaleButton key={num} num={num} onClick={handleResponse} />
                          ))}
                        </div>
                        <div className="flex justify-between w-full max-w-xs text-[11px] text-slate-400 font-medium mt-1 px-1">
                          <span>Not at all</span>
                          <span>Extremely</span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Recommendation */}
                  {!isTyping && currentStepData.type === 'recommendation' && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 }}
                      className="mt-6 ml-12 space-y-5"
                    >
                      {currentStepData.severity && (
                        <div className="flex items-center gap-2 flex-wrap">
                          <div className="flex items-center gap-2">
                            <Activity className="size-4 text-teal-600" />
                            <span className="text-xs font-bold uppercase tracking-wider text-teal-700">
                              Assessment Complete
                            </span>
                          </div>
                          <span className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-amber-50 border border-amber-200 px-3 py-1 text-[11px] font-semibold text-amber-700 uppercase tracking-wider">
                            <span className="size-1.5 rounded-full bg-amber-500" />
                            {currentStepData.severity} severity
                          </span>
                        </div>
                      )}

                      <div className="rounded-2xl border border-slate-200/80 bg-white shadow-sm overflow-hidden">
                        <div className="px-6 pt-5 pb-4 border-b border-slate-100">
                          <h3 className="text-base font-semibold text-slate-900">
                            Recommended Next Steps
                          </h3>
                          <p className="text-sm text-slate-400 mt-0.5">
                            Personalized based on your responses
                          </p>
                        </div>
                        <div className="p-6 space-y-3.5">
                          {currentStepData.nextSteps?.map((step, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -8 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.1 * index + 0.3 }}
                              className="flex items-start gap-3"
                            >
                              <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-teal-100 text-teal-700">
                                <Check className="size-3" strokeWidth={2.5} />
                              </span>
                              <span className="text-sm text-slate-600 leading-relaxed">
                                {step}
                              </span>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-3 pt-1">
                        <Button
                          asChild
                          className="rounded-xl bg-teal-600 hover:bg-teal-700 px-5 py-5 font-semibold text-white border-0 shadow-md shadow-teal-600/15 transition-all"
                        >
                          <Link href="/appointments?specialty=psychologist">
                            <CalendarCheck className="size-4 mr-2" />
                            Book Appointment
                          </Link>
                        </Button>
                        <Button
                          variant="outline"
                          asChild
                          className="rounded-xl border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300 px-5 py-5 font-medium transition-all"
                        >
                          <Link href="/resources">
                            <BookOpen className="size-4 mr-2" />
                            Self-Help Resources
                          </Link>
                        </Button>
                        <Button
                          variant="ghost"
                          onClick={handleRestart}
                          className="rounded-xl text-slate-400 hover:text-teal-600 hover:bg-teal-50 px-4 py-5 font-medium transition-all"
                        >
                          <RotateCcw className="size-3.5 mr-1.5" />
                          Restart
                        </Button>
                        <Button
                          variant="ghost"
                          asChild
                          className="rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-50 px-4 py-5 font-medium transition-all"
                        >
                          <Link href="/">
                            <Home className="size-3.5 mr-1.5" />
                            Home
                          </Link>
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
