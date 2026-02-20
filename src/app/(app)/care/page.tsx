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
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <header className="mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1">My care</h1>
        <p className="text-slate-600 text-sm">
          Your intake summary and next steps. Share this with your provider for continuity of care.
        </p>
      </header>

      {loading ? (
        <Card>
          <CardContent className="p-8 flex justify-center">
            <div className="size-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </CardContent>
        </Card>
      ) : entries.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground text-sm mb-4">You haven’t completed the intake yet.</p>
          <Button asChild><Link href="/demo">Start conversational intake</Link></Button>
          </CardContent>
        </Card>
      ) : (
        <>
          {completedAt && (
            <p className="text-slate-500 text-xs mb-4">
              Completed {new Date(completedAt).toLocaleDateString('en-US', { dateStyle: 'medium' })}
            </p>
          )}
          <Card className="divide-y divide-border overflow-hidden gap-0 py-0">
            {entries.map(([stepId, value]) => (
              <CardContent key={stepId} className="p-4 py-4">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  {INTAKE_STEP_LABELS[stepId] ?? stepId}
                </p>
                <p className="text-card-foreground text-sm mt-0.5">{value}</p>
              </CardContent>
            ))}
          </Card>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild><Link href="/appointments">Book appointment</Link></Button>
            <Button variant="secondary" asChild><Link href="/resources">Self-help resources</Link></Button>
            <Button variant="ghost" asChild><Link href="/demo">Update intake</Link></Button>
          </div>
        </>
      )}
    </div>
  );
}
