'use client';

import Link from 'next/link';
import { ClipboardList, CheckCircle2, Circle, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface CarePlanStep {
  label: string;
  status: 'done' | 'next' | 'pending';
}

interface CarePlanSummaryProps {
  goal?: string;
  steps?: CarePlanStep[];
  completionPct?: number;
}

const DEFAULT_STEPS: CarePlanStep[] = [
  { label: 'Initial Assessment', status: 'done' },
  { label: "Complete 'Meditation Module 1'", status: 'next' },
  { label: 'Schedule provider session', status: 'pending' },
  { label: 'Complete PHQ-9 follow-up', status: 'pending' },
];

export function CarePlanSummary({
  goal = 'Enhanced Focus',
  steps = DEFAULT_STEPS,
  completionPct = 25,
}: CarePlanSummaryProps) {
  const done = steps.filter((s) => s.status === 'done').length;

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="flex size-6 items-center justify-center rounded-lg bg-teal-50/80 border border-white/50">
              <ClipboardList className="size-3 text-teal-600" />
            </div>
            <h2 className="text-[10px] font-bold text-teal-700/60 uppercase tracking-[0.08em]">Care Plan Summary</h2>
          </div>
          <Badge className="text-[9px] px-1.5 py-0 bg-teal-50/60 text-teal-700 border border-teal-200/60 shadow-none font-semibold">
            {done}/{steps.length} done
          </Badge>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <p className="text-[11px] text-slate-500">Overall Goal:</p>
          <p className="text-[11px] font-semibold text-slate-700">{goal}</p>
        </div>

        {/* Progress bar */}
        <div className="mb-3">
          <div className="flex justify-between text-[9px] text-slate-400 mb-1">
            <span>Progress</span>
            <span>{completionPct}%</span>
          </div>
          <div className="h-1.5 rounded-full bg-white/40 border border-white/50 overflow-hidden">
            <div
              className="h-full rounded-full bg-linear-to-r from-teal-500 to-emerald-400"
              style={{ width: `${completionPct}%` }}
            />
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-1.5">
          {steps.map((step, i) => (
            <div key={i} className="flex items-center gap-2">
              {step.status === 'done' ? (
                <CheckCircle2 className="size-3.5 text-teal-500 shrink-0" />
              ) : step.status === 'next' ? (
                <div className="size-3.5 rounded-full border-2 border-teal-500 shrink-0 flex items-center justify-center">
                  <div className="size-1 rounded-full bg-teal-500" />
                </div>
              ) : (
                <Circle className="size-3.5 text-slate-300 shrink-0" />
              )}
              <p className={`text-[11px] leading-snug ${
                step.status === 'done' ? 'line-through text-slate-400' :
                step.status === 'next' ? 'font-semibold text-slate-700' :
                'text-slate-400'
              }`}>
                {step.status === 'next' && <span className="text-teal-600 mr-1">Next Action:</span>}
                {step.label}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-3 pt-2.5 border-t border-white/30">
          <Button asChild size="sm" className="w-full h-7 text-[11px] rounded-lg bg-teal-600 hover:bg-teal-700 text-white border-0 font-semibold">
            <Link href="/care">
              View full care plan
              <ArrowRight className="size-3 ml-1" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}