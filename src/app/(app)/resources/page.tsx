'use client';

import Link from 'next/link';

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
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <header className="mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1">Self-help resources</h1>
        <p className="text-slate-600 text-sm">
          Evidence-based strategies you can use between sessions. Not a substitute for professional care.
        </p>
      </header>

      <div className="space-y-8">
        {order.map((cat) => {
          const items = byCategory[cat];
          if (!items?.length) return null;
          return (
            <section key={cat}>
              <h2 className="text-sm font-semibold text-slate-700 uppercase tracking-wide mb-3">
                {CATEGORY_LABELS[cat]}
              </h2>
              <ul className="space-y-3">
                {items.map((resource) => (
                  <li
                    key={resource.id}
                    className="section-bg rounded-xl border border-slate-200 p-4 shadow-sm hover:border-slate-300 transition-colors"
                  >
                    <h3 className="font-semibold text-slate-900 text-sm">{resource.title}</h3>
                    <p className="text-slate-600 text-sm mt-1 leading-snug">{resource.description}</p>
                    {resource.link && resource.linkLabel && (
                      <a
                        href={resource.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 mt-2 text-indigo-600 text-sm font-medium hover:underline"
                      >
                        {resource.linkLabel}
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/demo" className="btn-secondary text-sm py-2 px-4">
          ← Back to demo
        </Link>
        <Link href="/appointments" className="btn-primary text-sm py-2 px-4">
          Book appointment
        </Link>
      </div>
    </div>
  );
}
