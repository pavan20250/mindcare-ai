'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getGreeting } from './Types';

interface WelcomeBannerProps {
  intakeCompleted: boolean;
}

export function WelcomeBanner({ intakeCompleted }: WelcomeBannerProps) {
  const date = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  });

  return (
    <section className="relative overflow-hidden rounded-3xl px-5 py-4 text-white bg-linear-to-br from-teal-500 via-teal-600 to-emerald-700 shadow-[0_8px_32px_rgba(15,118,110,0.30)] border border-white/20 ring-1 ring-inset ring-white/20">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-br from-transparent via-white/70 to-transparent" />
      <div className="pointer-events-none absolute -left-8 -top-8 h-36 w-36 rounded-full bg-white/15 blur-2xl" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 80%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
      <div className="relative flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="text-teal-200/80 text-[11px] font-medium tracking-wide">{date}</p>
          <h1 className="text-xl font-bold mt-0.5 tracking-tight">{getGreeting()}</h1>
          <p className="text-teal-100/70 text-xs mt-0.5 max-w-sm leading-relaxed truncate">
            {intakeCompleted
              ? 'Track your progress and connect with your provider.'
              : 'Start with a brief assessment to build your care plan.'}
          </p>
        </div>
        <Button
          asChild
          size="sm"
          className="rounded-xl bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 font-semibold border border-white/30 px-4 shrink-0 text-xs shadow-none"
        >
          <Link href={intakeCompleted ? '/chat' : '/chat'}>
            {intakeCompleted ? 'Care plan' : 'Begin'}
            <ArrowRight className="size-3.5 ml-1.5" />
          </Link>
        </Button>
      </div>
    </section>
  );
}