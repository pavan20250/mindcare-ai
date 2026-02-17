'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [isTyping, setIsTyping] = useState(false);
  const [demoSteps, setDemoSteps] = useState<DemoStep[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [authChecking, setAuthChecking] = useState(true);
  const [user, setUser] = useState<{ email: string } | null>(null);

  useEffect(() => {
    fetch('/api/auth/session', { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setUser(data.user);
        } else {
          router.replace(`/login?next=${encodeURIComponent('/demo')}`);
        }
      })
      .catch(() => router.replace(`/login?next=${encodeURIComponent('/demo')}`))
      .finally(() => setAuthChecking(false));
  }, [router]);

  useEffect(() => {
    if (!user) return;
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
  }, [user]);

  const handleResponse = useCallback((response: string) => {
    const stepId = demoSteps[currentStep]?.id;
    if (!stepId) return;
    const nextResponses = { ...responses, [stepId]: response };
    setResponses(nextResponses);
    const reachedRecommendation = currentStep + 1 >= demoSteps.length - 1;
    saveIntake(nextResponses, reachedRecommendation).catch(() => {});
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      if (currentStep < demoSteps.length - 1) {
        setCurrentStep((prev) => prev + 1);
      }
    }, 1500);
  }, [demoSteps, currentStep, responses]);

  const handleRestart = useCallback(() => {
    setCurrentStep(0);
    setResponses({});
    saveIntake({}).catch(() => {});
  }, []);

  const currentStepData = demoSteps[currentStep];

  if (authChecking || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <nav className="nav-glass fixed top-0 left-0 right-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center">
            <Link href="/" className="text-xl font-bold gradient-text">MindCare AI</Link>
          </div>
        </nav>
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-600">{!user ? 'Redirecting to sign in…' : 'Loading demo…'}</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <nav className="nav-glass fixed top-0 left-0 right-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <Link href="/" className="text-xl font-bold gradient-text">MindCare AI</Link>
            <span className="text-slate-500 text-sm truncate max-w-[140px]">{user.email}</span>
          </div>
        </nav>
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-600">Loading intake…</p>
        </div>
      </div>
    );
  }

  if (error || demoSteps.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <nav className="nav-glass fixed top-0 left-0 right-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <Link href="/" className="text-xl font-bold gradient-text">MindCare AI</Link>
            <span className="text-slate-500 text-sm truncate max-w-[140px]">{user.email}</span>
          </div>
        </nav>
        <div className="text-center max-w-md px-4">
          <p className="text-slate-700 mb-4">{error ?? 'No demo steps available.'}</p>
          <Link href="/" className="btn-primary">Back to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="nav-glass">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14">
            <Link href="/" className="text-xl sm:text-2xl font-bold gradient-text">MindCare AI</Link>
            <div className="flex items-center gap-3">
              <span className="text-xs font-medium text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
                Intake
              </span>
              <span className="text-slate-500 text-sm truncate max-w-[120px] sm:max-w-[180px]" title={user.email}>{user.email}</span>
              <Link href="/appointments" className="text-sm text-slate-600 hover:text-indigo-600">Appointments</Link>
              <Link href="/" className="text-sm text-slate-600 hover:text-indigo-600">Home</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        {/* Header */}
        <header className="text-center mb-4 sm:mb-5">
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1">Conversational Intake</h1>
          <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
            Your responses are saved to your account for care coordination and provider handoff.
          </p>
        </header>

        {/* Progress */}
        <div className="mb-4">
          <div className="flex justify-between text-xs sm:text-sm text-slate-500 mb-1">
            <span>Step {currentStep + 1} of {demoSteps.length}</span>
            <span>{Math.round(((currentStep + 1) / demoSteps.length) * 100)}%</span>
          </div>
          <div className="w-full h-1 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-600 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${((currentStep + 1) / demoSteps.length) * 100}%` }}
            />
          </div>
          <div className="flex justify-between mt-1">
            {demoSteps.map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-colors ${
                  i <= currentStep ? 'bg-indigo-500' : 'bg-slate-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Chat Card */}
        <div className="section-bg rounded-xl border border-slate-200/90 shadow-sm p-3 sm:p-4 mb-4">
          <div className="space-y-3 sm:space-y-4">
            {/* AI Message */}
            <div className="flex gap-2 sm:gap-3">
              <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center shrink-0 shadow-sm">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <div className="bg-slate-50 rounded-lg p-3 sm:p-4 border border-slate-100">
                  <h3 className="font-semibold text-slate-900 mb-0.5 text-sm">{currentStepData.title}</h3>
                  <p className="text-slate-700 text-sm leading-snug">{currentStepData.message}</p>
                </div>
              </div>
            </div>

            {/* User Response */}
            {responses[currentStepData.id] && (
              <div className="flex gap-2 sm:gap-3 justify-end">
                <div className="flex-1 max-w-[85%] sm:max-w-sm order-2">
                  <div className="bg-slate-100 rounded-lg p-3 sm:p-4 border border-slate-200/80">
                    <p className="text-slate-800 text-sm">{responses[currentStepData.id]}</p>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-400 flex items-center justify-center shrink-0 order-1">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
            )}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex gap-2 sm:gap-3">
                <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center shrink-0 shadow-sm">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div className="bg-slate-50 rounded-lg p-3 border border-slate-100 inline-flex gap-1">
                  <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Message step: Continue */}
        {!isTyping && currentStepData.type === 'message' && (
          <div className="flex justify-center py-1">
            <button onClick={() => handleResponse('')} className="btn-primary text-sm py-2 px-4">
              Continue
            </button>
          </div>
        )}

        {/* Question options */}
        {!isTyping && currentStepData.type === 'question' && (
          <div className="space-y-2">
            <p className="text-xs font-medium text-slate-700">Select your response</p>
            <div className="grid gap-1.5">
              {currentStepData.options?.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleResponse(option)}
                  className="text-left px-3 py-2.5 section-bg rounded-lg border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50 text-slate-800 text-sm font-medium transition-colors min-h-10 w-full"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Scale */}
        {!isTyping && currentStepData.type === 'scale' && (
          <div className="space-y-2">
            <p className="text-xs font-medium text-slate-700 text-center">Rate the impact on your daily life</p>
            <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
              <span className="text-xs text-slate-500 order-2 sm:order-1">1 · Not at all</span>
              <div className="flex flex-wrap justify-center gap-1.5">
                {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                  <button
                    key={num}
                    onClick={() => handleResponse(num.toString())}
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-slate-200 hover:border-indigo-500 hover:bg-indigo-50 text-slate-700 hover:text-indigo-700 text-xs font-semibold transition-colors touch-manipulation"
                  >
                    {num}
                  </button>
                ))}
              </div>
              <span className="text-xs text-slate-500 order-3">10 · Extremely</span>
            </div>
          </div>
        )}

        {/* Recommendation */}
        {!isTyping && currentStepData.type === 'recommendation' && (
          <div className="space-y-4">
            <div className="bg-emerald-50/80 border border-emerald-200/80 rounded-xl p-4 sm:p-5">
              <h3 className="text-sm font-semibold text-emerald-900 mb-2">Care recommendation</h3>
              <ul className="space-y-2">
                {currentStepData.nextSteps?.map((step, index) => (
                  <li key={index} className="flex items-center gap-2 text-emerald-800 text-sm">
                    <span className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center shrink-0">
                      <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    {step}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-2 flex-wrap">
              <Link
                href="/appointments?specialty=psychologist"
                className="btn-primary w-full sm:w-auto text-sm py-2 px-4"
              >
                Book appointment with a doctor
              </Link>
              <button
                onClick={handleRestart}
                className="btn-secondary w-full sm:w-auto text-sm py-2 px-4"
              >
                Restart intake
              </button>
              <Link href="/" className="btn-secondary w-full sm:w-auto text-center text-sm py-2 px-4">
                Back to home
              </Link>
            </div>
          </div>
        )}

        {/* Footer info */}
        <div className="mt-6 pt-5 border-t border-slate-200">
          <p className="text-center text-slate-500 text-xs mb-3">What this demo shows</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex gap-2 p-3 section-bg rounded-lg border border-slate-200">
              <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div className="min-w-0">
                <h4 className="font-medium text-slate-900 text-xs mb-0.5">Conversational intake</h4>
                <p className="text-slate-600 text-xs leading-snug">Natural dialogue and structured assessments.</p>
              </div>
            </div>
            <div className="flex gap-2 p-3 section-bg rounded-lg border border-slate-200">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="min-w-0">
                <h4 className="font-medium text-slate-900 text-xs mb-0.5">Clinical alignment</h4>
                <p className="text-slate-600 text-xs leading-snug">DSM-5–aligned screening and PHQ-9 steps.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
