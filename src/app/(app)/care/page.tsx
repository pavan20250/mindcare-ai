'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

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
        <div className="section-bg rounded-xl border border-slate-200 p-8 flex justify-center">
          <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : entries.length === 0 ? (
        <div className="section-bg rounded-xl border border-slate-200 p-6 text-center">
          <p className="text-slate-600 text-sm mb-4">You haven’t completed the intake yet.</p>
          <Link href="/demo" className="btn-primary text-sm py-2 px-4 inline-block">
            Start conversational intake
          </Link>
        </div>
      ) : (
        <>
          {completedAt && (
            <p className="text-slate-500 text-xs mb-4">
              Completed {new Date(completedAt).toLocaleDateString('en-US', { dateStyle: 'medium' })}
            </p>
          )}
          <div className="section-bg rounded-xl border border-slate-200 divide-y divide-slate-100 overflow-hidden">
            {entries.map(([stepId, value]) => (
              <div key={stepId} className="p-4">
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                  {INTAKE_STEP_LABELS[stepId] ?? stepId}
                </p>
                <p className="text-slate-900 text-sm mt-0.5">{value}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/appointments" className="btn-primary text-sm py-2 px-4">
              Book appointment
            </Link>
            <Link href="/resources" className="btn-secondary text-sm py-2 px-4">
              Self-help resources
            </Link>
            <Link href="/demo" className="text-slate-600 text-sm hover:text-indigo-600 py-2">
              Update intake
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
