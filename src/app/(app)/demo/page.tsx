'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useIntake } from '@/contexts/IntakeContext';
import { MessageCircle, User, Sparkles, Info } from 'lucide-react';

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

  useEffect(() => {
    fetch('/api/demo')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load demo');
        return res.json();
      })
      .then((data) => {
        setDemoSteps(data.steps ?? []);
      })
      .catch(() => setError('Unable to load demo. Please try again.'))
      .finally(() => setLoading(false));
  }, []);

  const handleResponse = useCallback((response: string) => {
    const stepId = demoSteps[currentStep]?.id;
    if (!stepId) return;
    const nextResponses = { ...responses, [stepId]: response };
    setResponses(nextResponses);
    const reachedRecommendation = currentStep + 1 >= demoSteps.length - 1;
    saveIntake(nextResponses, reachedRecommendation).then(() => {
      if (reachedRecommendation) setIntakeCompleted(true);
    }).catch(() => {});
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      if (currentStep < demoSteps.length - 1) {
        setCurrentStep((prev) => prev + 1);
      }
    }, 1500);
  }, [demoSteps, currentStep, responses, setIntakeCompleted]);

  const handleRestart = useCallback(() => {
    setCurrentStep(0);
    setResponses({});
    saveIntake({}).catch(() => {});
  }, []);

  const currentStepData = demoSteps[currentStep];

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <div className="size-10 border-2 border-slate-300 border-t-slate-700 rounded-full animate-spin" />
        <p className="text-slate-500 mt-4 text-sm font-medium">Loading assessment…</p>
      </div>
    );
  }

  if (error || demoSteps.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] px-6">
        <Card className="max-w-md w-full rounded-xl border border-slate-200 bg-white shadow-sm">
          <CardContent className="pt-8 pb-8 px-8 text-center">
            <p className="text-slate-700 mb-6 text-sm leading-relaxed">{error ?? 'No demo steps available.'}</p>
            <Button asChild className="rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium"><Link href="/">Back to Home</Link></Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <>
    <div className="hidden md:flex h-svh flex-col w-full max-w-full mx-auto overflow-hidden page-bg">
      {/* Top bar */}
      <header className="shrink-0 border-b border-border/60 bg-card/95 backdrop-blur-sm px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-slate-800 text-white">
              <MessageCircle className="size-5" />
            </div>
            <div>
              <h1 className="text-lg font-semibold tracking-tight text-slate-900">Clinical Intake</h1>
              <p className="text-xs text-slate-500">Step {currentStep + 1} of {demoSteps.length}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-xs font-medium text-slate-500">Progress</p>
              <p className="text-sm font-semibold tabular-nums text-slate-800">{Math.round(((currentStep + 1) / demoSteps.length) * 100)}%</p>
            </div>
            <Progress value={((currentStep + 1) / demoSteps.length) * 100} className="h-2 w-24 rounded-full" />
          </div>
        </div>
      </header>

      <div className="flex flex-1 min-h-0">
        {/* Left: step indicators + notice */}
        <aside className="w-52 shrink-0 flex flex-col gap-4 border-r border-border/60 section-bg p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Steps</p>
          <div className="flex flex-col gap-1.5">
            {demoSteps.map((step, i) => (
              <div
                key={step.id}
                className={`flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-sm transition-colors ${
                  i === currentStep
                    ? 'bg-slate-800 text-white font-medium'
                    : i < currentStep
                      ? 'bg-slate-100 text-slate-600'
                      : 'text-slate-400'
                }`}
              >
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-white/20 text-xs font-medium tabular-nums">
                  {i < currentStep ? '✓' : i + 1}
                </span>
                <span className="truncate">{step.title}</span>
              </div>
            ))}
          </div>
          <p className="mt-auto text-[11px] leading-relaxed text-slate-400">
            Your responses are saved securely and used for care coordination and provider handoff.
          </p>
          {required && (
            <Alert className="rounded-lg border border-amber-200/80 bg-amber-50/90 text-amber-900 [&_svg]:text-amber-600 p-3">
              <Info className="size-3.5 shrink-0" />
              <AlertTitle className="text-amber-900 font-semibold text-xs">Complete to continue</AlertTitle>
              <AlertDescription className="text-amber-800/90 text-[11px] mt-0.5">
                Finish this assessment to access My care, Appointments, and Resources.
              </AlertDescription>
            </Alert>
          )}
        </aside>

        {/* Right: current step content */}
        <main className="flex-1 min-w-0 flex flex-col overflow-hidden page-bg">
          <div className="flex-1 min-h-0 overflow-auto p-8">
            <div className="mx-auto max-w-2xl">
              {/* Question / message block */}
              <div className="rounded-xl border border-slate-200/80 bg-white p-6 shadow-sm">
                <div className="flex gap-4">
                  <div className="size-10 shrink-0 rounded-full bg-slate-100 flex items-center justify-center">
                    <Sparkles className="size-5 text-slate-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-base font-semibold text-slate-900 mb-1.5">{currentStepData.title}</h2>
                    <p className="text-sm leading-relaxed text-slate-600">{currentStepData.message}</p>
                  </div>
                </div>
              </div>

              {responses[currentStepData.id] && (
                <div className="mt-4 flex justify-end">
                  <div className="flex max-w-md items-start gap-3">
                    <div className="rounded-lg border border-slate-200/80 bg-white px-4 py-3 shadow-sm">
                      <p className="text-sm text-slate-800">{responses[currentStepData.id]}</p>
                    </div>
                    <div className="size-10 shrink-0 rounded-full bg-slate-200 flex items-center justify-center">
                      <User className="size-5 text-slate-600" />
                    </div>
                  </div>
                </div>
              )}

              {isTyping && (
                <div className="mt-4 flex gap-4">
                  <div className="size-10 shrink-0 rounded-full bg-slate-100 flex items-center justify-center">
                    <Sparkles className="size-5 text-slate-600" />
                  </div>
                  <div className="rounded-lg border border-slate-200/80 bg-white px-4 py-3 shadow-sm inline-flex gap-1.5">
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}

              {/* Actions */}
              {!isTyping && currentStepData.type === 'message' && (
                <div className="mt-6 flex justify-center">
                  <Button onClick={() => handleResponse('')} className="rounded-lg bg-slate-800 px-6 font-medium text-white hover:bg-slate-700">Continue</Button>
                </div>
              )}

              {!isTyping && currentStepData.type === 'question' && (
                <div className="mt-6 space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Select one</p>
                  <div className="grid gap-2">
                    {currentStepData.options?.map((option, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        onClick={() => handleResponse(option)}
                        className="h-auto justify-start rounded-lg border-slate-200 bg-white py-3 px-4 text-left text-sm font-normal text-slate-700 hover:bg-slate-50 hover:border-slate-300"
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {!isTyping && currentStepData.type === 'scale' && (
                <div className="mt-6 space-y-4">
                  <p className="text-center text-xs font-semibold uppercase tracking-wider text-slate-500">Rate impact on daily life</p>
                  <div className="flex flex-wrap items-center justify-center gap-6">
                    <span className="text-xs text-slate-500">1 · Not at all</span>
                    <div className="flex gap-2">
                      {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                        <Button
                          key={num}
                          variant="outline"
                          size="icon"
                          className="size-10 rounded-full border-slate-200 bg-white font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-300"
                          onClick={() => handleResponse(num.toString())}
                        >
                          {num}
                        </Button>
                      ))}
                    </div>
                    <span className="text-xs text-slate-500">10 · Extremely</span>
                  </div>
                </div>
              )}

              {!isTyping && currentStepData.type === 'recommendation' && (
                <div className="mt-6 space-y-6">
                  <div className="rounded-xl border border-slate-200/80 bg-white p-6 shadow-sm">
                    <h3 className="text-base font-semibold text-slate-900 mb-0.5">Your care recommendation</h3>
                    <p className="text-sm text-slate-500 mb-4">Based on your responses</p>
                    <ul className="space-y-2.5">
                      {currentStepData.nextSteps?.map((step, index) => (
                        <li key={index} className="flex items-start gap-3 text-sm text-slate-700">
                          <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-slate-800 text-white">
                            <svg className="size-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                            </svg>
                          </span>
                          {step}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Button asChild className="rounded-lg bg-slate-800 px-5 font-medium text-white hover:bg-slate-700">
                      <Link href="/appointments?specialty=psychologist">Book appointment</Link>
                    </Button>
                    <Button variant="outline" asChild className="rounded-lg border-slate-200 text-slate-700 hover:bg-slate-50">
                      <Link href="/resources">Self-help resources</Link>
                    </Button>
                    <Button variant="ghost" onClick={handleRestart} className="rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-800">Restart</Button>
                    <Button variant="ghost" asChild className="rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-700">
                      <Link href="/">Home</Link>
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>

    <div className="md:hidden flex flex-col items-center justify-center min-h-[60vh] px-6 text-center page-bg">
      <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm max-w-sm">
        <p className="text-slate-700 font-medium mb-1">Clinical Intake</p>
        <p className="text-slate-500 text-sm">This assessment is designed for desktop. Please use a larger screen for the best experience.</p>
      </div>
    </div>
    </>
  );
}
