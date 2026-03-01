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

export function CareView() {
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
    <div className="min-h-full bg-[#f8fafb]">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="mb-5">
          <h1 className="text-xl font-bold text-slate-900">My care</h1>
          <p className="text-slate-500 text-sm mt-0.5">
            Your intake summary and next steps. Share this with your provider for continuity of care.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="size-7 border-2 border-teal-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : entries.length === 0 ? (
          <Card className="rounded-xl border-slate-200 bg-white shadow-sm">
            <CardContent className="px-5 py-8 text-center">
              <p className="text-slate-500 text-sm mb-4">You haven&apos;t completed the intake yet.</p>
              <Button asChild size="sm" className="rounded-lg bg-teal-600 hover:bg-teal-700 font-semibold text-white border-0">
                <Link href="/demo">Start conversational intake</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            {completedAt && (
              <p className="text-slate-400 text-xs mb-3">
                Completed {new Date(completedAt).toLocaleDateString('en-US', { dateStyle: 'medium' })}
              </p>
            )}

            <Card className="rounded-xl border-slate-200 bg-white shadow-sm overflow-hidden">
              <div className="divide-y divide-slate-100">
                {entries.map(([stepId, value]) => (
                  <div key={stepId} className="px-4 py-3">
                    <p className="text-[11px] font-semibold text-teal-600 uppercase tracking-wide leading-none">
                      {INTAKE_STEP_LABELS[stepId] ?? stepId}
                    </p>
                    <p className="text-slate-700 text-sm mt-1 leading-snug">{value}</p>
                  </div>
                ))}
              </div>
            </Card>

            <div className="mt-4 flex flex-wrap gap-2">
              <Button asChild size="sm" className="rounded-lg font-semibold bg-teal-600 hover:bg-teal-700 text-white border-0">
                <Link href="/appointments">Book appointment</Link>
              </Button>
              <Button size="sm" asChild className="rounded-lg bg-violet-600 hover:bg-violet-700 font-semibold text-white border-0 shadow-sm shadow-violet-600/15">
                <Link href="/resources">Self-help resources</Link>
              </Button>
              <Button variant="ghost" size="sm" asChild className="rounded-lg text-slate-400 hover:text-teal-600 hover:bg-teal-50">
                <Link href="/demo">Update intake</Link>
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
