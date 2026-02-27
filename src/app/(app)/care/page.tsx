'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const INTAKE_STEP_LABELS: Record<string, string> = {
  welcome: 'Initial concerns',
  symptoms: 'How long',
  severity: 'Impact on daily life (1–10)',
  phq9: 'Interest or pleasure (PHQ-9)',
  recommendation: 'Care recommendation',
};

export default function CarePage() {
  const [intake, setIntake] = useState<{ responses: Record<string, string>; completedAt?: number } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/intake', { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => setIntake(data.intake ?? null))
      .catch(() => setIntake(null))
      .finally(() => setLoading(false));
  }, []);

  const responses = intake?.responses ?? {};
  const entries = Object.entries(responses).filter(([, v]) => v != null && v !== '');
  const completedAt = intake?.completedAt;

  return (
    <div className="min-h-full">
      <div className="border-b border-white/[0.06] bg-white/[0.03] backdrop-blur-md">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">My care</h1>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl">
            Your intake summary and next steps. Share this with your provider for continuity of care.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {loading ? (
          <Card className="rounded-2xl border-white/[0.08] bg-white/[0.04] backdrop-blur-lg shadow-lg shadow-black/10">
            <CardContent className="p-10 flex justify-center">
              <div className="size-8 border-2 border-teal-400 border-t-transparent rounded-full animate-spin" />
            </CardContent>
          </Card>
        ) : entries.length === 0 ? (
          <Card className="rounded-2xl border-white/[0.08] bg-white/[0.04] backdrop-blur-lg shadow-lg shadow-black/10">
            <CardContent className="p-10 text-center">
              <p className="text-slate-400 text-sm mb-5">You haven&apos;t completed the intake yet.</p>
              <Button asChild className="rounded-lg bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500 font-semibold text-white border-0">
                <Link href="/demo">Start conversational intake</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            {completedAt && (
              <p className="text-slate-500 text-sm mb-4">
                Completed {new Date(completedAt).toLocaleDateString('en-US', { dateStyle: 'medium' })}
              </p>
            )}
            <Card className="rounded-2xl border-white/[0.08] bg-white/[0.04] backdrop-blur-lg shadow-lg shadow-black/10 divide-y divide-white/[0.06] overflow-hidden">
              {entries.map(([stepId, value]) => (
                <CardContent key={stepId} className="p-5 py-4">
                  <p className="text-xs font-semibold text-teal-400/80 uppercase tracking-wide">
                    {INTAKE_STEP_LABELS[stepId] ?? stepId}
                  </p>
                  <p className="text-slate-200 text-sm mt-1">{value}</p>
                </CardContent>
              ))}
            </Card>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild className="rounded-lg font-semibold bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500 text-white border-0">
                <Link href="/appointments">Book appointment</Link>
              </Button>
              <Button variant="secondary" asChild className="rounded-lg bg-white/[0.06] border-white/10 text-slate-300 hover:bg-white/[0.1]">
                <Link href="/resources">Self-help resources</Link>
              </Button>
              <Button variant="ghost" asChild className="rounded-lg text-slate-400 hover:text-teal-400">
                <Link href="/demo">Update intake</Link>
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
