'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface Resource {
  id: string;
  title: string;
  description: string;
  category: 'mood' | 'anxiety' | 'sleep' | 'crisis' | 'general';
  link?: string;
  linkLabel?: string;
}

const RESOURCES: Resource[] = [
  {
    id: 'phq9',
    title: 'PHQ-9 self-assessment',
    description: 'A short questionnaire to track depression symptoms. Complete it periodically and share results with your provider.',
    category: 'mood',
    linkLabel: 'Learn about PHQ-9',
  },
  {
    id: 'behavioral-activation',
    title: 'Behavioral activation',
    description: 'Small, planned activities can improve mood. Schedule one pleasant or meaningful activity each day.',
    category: 'mood',
  },
  {
    id: 'breathing',
    title: '4-7-8 breathing',
    description: 'Breathe in for 4 counts, hold for 7, out for 8. Repeat a few times to calm the nervous system.',
    category: 'anxiety',
  },
  {
    id: 'grounding',
    title: '5-4-3-2-1 grounding',
    description: 'Name 5 things you see, 4 you hear, 3 you touch, 2 you smell, 1 you taste. Helps during anxiety or dissociation.',
    category: 'anxiety',
  },
  {
    id: 'sleep-hygiene',
    title: 'Sleep hygiene',
    description: 'Consistent bedtime, limit screens before bed, avoid caffeine late in the day, and keep the room cool and dark.',
    category: 'sleep',
  },
  {
    id: 'crisis-line',
    title: '24/7 crisis support',
    description: 'If you are in crisis or having thoughts of harming yourself, reach out now. You are not alone.',
    category: 'crisis',
    link: 'https://988lifeline.org',
    linkLabel: '988 Suicide & Crisis Lifeline',
  },
  {
    id: 'crisis-text',
    title: 'Text-based support',
    description: 'Free, confidential support via text, 24/7.',
    category: 'crisis',
    link: 'https://www.crisistextline.org',
    linkLabel: 'Crisis Text Line',
  },
];

const CATEGORY_LABELS: Record<Resource['category'], string> = {
  mood: 'Mood & depression',
  anxiety: 'Anxiety & stress',
  sleep: 'Sleep',
  crisis: 'Crisis support',
  general: 'General',
};

export default function ResourcesPage() {
  const byCategory = RESOURCES.reduce<Record<string, Resource[]>>((acc, r) => {
    const cat = r.category;
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(r);
    return acc;
  }, {});

  const order: Resource['category'][] = ['mood', 'anxiety', 'sleep', 'crisis', 'general'];

  return (
    <div className="min-h-full bg-[#f8fafb]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="mb-5">
          <h1 className="text-xl font-bold text-slate-900">Self-help resources</h1>
          <p className="text-slate-500 text-sm mt-0.5">
            Evidence-based strategies you can use between sessions. Not a substitute for professional care.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {order.map((cat) => {
            const items = byCategory[cat];
            if (!items?.length) return null;
            return (
              <Card key={cat} className="rounded-xl border-slate-200 bg-white shadow-sm overflow-hidden">
                <div className="px-4 pt-3 pb-1.5 border-b border-slate-100">
                  <h2 className="text-[11px] font-bold text-teal-600 uppercase tracking-wide">
                    {CATEGORY_LABELS[cat]}
                  </h2>
                </div>
                <div className="divide-y divide-slate-100">
                  {items.map((resource) => (
                    <div key={resource.id} className="px-4 py-3">
                      <h3 className="font-semibold text-slate-800 text-sm">{resource.title}</h3>
                      <p className="text-slate-500 text-xs mt-0.5 leading-snug">{resource.description}</p>
                      {resource.link && resource.linkLabel && (
                        <a
                          href={resource.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 mt-1.5 text-teal-600 text-xs font-semibold hover:text-teal-700 transition-colors"
                        >
                          {resource.linkLabel}
                          <svg className="size-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <Button variant="outline" size="sm" asChild className="rounded-lg border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300">
            <Link href="/demo">← Back to demo</Link>
          </Button>
          <Button size="sm" asChild className="rounded-lg font-semibold bg-teal-600 hover:bg-teal-700 text-white border-0">
            <Link href="/appointments">Book appointment</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
