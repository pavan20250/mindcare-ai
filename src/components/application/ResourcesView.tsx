'use client';

import { useState, useRef, useEffect } from 'react';
import { PageBackground } from '@/components/application/PageBg';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: 'research' | 'wellness' | 'updates' | 'clinical' | 'community';
  readTime: string;
  date: string;
  author: string;
  authorRole: string;
  featured?: boolean;
  link?: string;
  tag?: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const POSTS: BlogPost[] = [
  {
    id: 'new-ai-intake',
    title: 'Introducing Adaptive AI Intake: Smarter First Conversations',
    excerpt:
      'Our updated intake system now adjusts in real time based on your responses, reducing session length by 40% while capturing richer clinical signals.',
    category: 'updates',
    readTime: '3 min read',
    date: 'Mar 18, 2026',
    author: 'NeuralCare Team',
    authorRole: 'Product',
    featured: true,
    tag: 'New Feature',
  },
  {
    id: 'cbt-guide',
    title: 'What Is CBT and Is It Right for You?',
    excerpt:
      "Cognitive Behavioral Therapy is one of the most evidence-backed approaches for anxiety and depression. Here's what a typical course looks like.",
    category: 'clinical',
    readTime: '5 min read',
    date: 'Mar 14, 2026',
    author: 'Dr. Sarah Chen',
    authorRole: 'Clinical Psychologist',
  },
  {
    id: 'phq9-explainer',
    title: 'Understanding Your PHQ-9 Score',
    excerpt:
      'The PHQ-9 is a nine-question tool used to measure depression severity. Learn what each score range means and what steps typically follow.',
    category: 'clinical',
    readTime: '4 min read',
    date: 'Mar 10, 2026',
    author: 'Dr. David Park',
    authorRole: 'Licensed Psychologist',
  },
  {
    id: 'sleep-mental-health',
    title: 'The Sleep–Mental Health Loop You Need to Know About',
    excerpt:
      'Poor sleep worsens anxiety and depression — and vice versa. Breaking the cycle starts with understanding how they interact.',
    category: 'wellness',
    readTime: '4 min read',
    date: 'Mar 7, 2026',
    author: 'Dr. Elena Rodriguez',
    authorRole: 'LCSW',
  },
  {
    id: 'breathwork-science',
    title: 'The Science Behind Breathing Exercises',
    excerpt:
      "Box breathing, 4-7-8, diaphragmatic — why do these actually work? A look at the vagus nerve and the body's stress response system.",
    category: 'wellness',
    readTime: '3 min read',
    date: 'Mar 3, 2026',
    author: 'Dr. Amy Foster',
    authorRole: 'Psychiatrist',
  },
  {
    id: 'community-launch',
    title: 'NeuralCare Community: Peer Support Is Now Live',
    excerpt:
      "We've launched moderated peer circles for patients to connect, share coping strategies, and reduce the isolation that often accompanies mental health challenges.",
    category: 'community',
    readTime: '2 min read',
    date: 'Feb 28, 2026',
    author: 'NeuralCare Team',
    authorRole: 'Community',
    tag: 'New',
  },
  {
    id: 'adhd-research',
    title: 'New Research: ADHD and Emotional Dysregulation',
    excerpt:
      'A 2026 meta-analysis of 42 studies confirms that emotional dysregulation is a core — not peripheral — feature of adult ADHD. What this means for treatment.',
    category: 'research',
    readTime: '6 min read',
    date: 'Feb 22, 2026',
    author: 'Research Digest',
    authorRole: 'NeuralCare Research',
  },
  {
    id: 'crisis-resources',
    title: 'When to Seek Immediate Help: A Practical Guide',
    excerpt:
      'Knowing the difference between a hard day and a crisis can be difficult. This guide outlines warning signs and the fastest paths to support.',
    category: 'wellness',
    readTime: '3 min read',
    date: 'Feb 18, 2026',
    author: 'Dr. James Mitchell',
    authorRole: 'Psychiatrist',
    link: 'https://988lifeline.org',
  },
];

// ─── Category config ─────────────────────────────────────────────────────────

const CATEGORY_CONFIG = {
  updates:   { label: 'Updates',   accent: '#0d9488', light: 'rgba(13,148,136,0.08)',   text: '#0f766e' },
  clinical:  { label: 'Clinical',  accent: '#7c3aed', light: 'rgba(124,58,237,0.08)',   text: '#6d28d9' },
  wellness:  { label: 'Wellness',  accent: '#059669', light: 'rgba(5,150,105,0.08)',    text: '#047857' },
  research:  { label: 'Research',  accent: '#2563eb', light: 'rgba(37,99,235,0.08)',    text: '#1d4ed8' },
  community: { label: 'Community', accent: '#d97706', light: 'rgba(217,119,6,0.08)',    text: '#b45309' },
} as const;

const ALL_FILTERS = ['all', 'updates', 'clinical', 'wellness', 'research', 'community'] as const;
type Filter = typeof ALL_FILTERS[number];

// ─── Utilities ───────────────────────────────────────────────────────────────

function avatarColor(name: string) {
  const hue = name.split('').reduce((a, c) => a + c.charCodeAt(0), 0) % 360;
  return `hsl(${hue},42%,48%)`;
}

function initials(name: string) {
  return name.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase();
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function CategoryPill({
  category,
  size = 'sm',
}: {
  category: BlogPost['category'];
  size?: 'sm' | 'xs';
}) {
  const cfg = CATEGORY_CONFIG[category];
  return (
    <span
      className={`inline-flex items-center gap-1 font-semibold uppercase tracking-widest rounded-full ${
        size === 'xs' ? 'text-[9px] px-2 py-0.5' : 'text-[10px] px-2.5 py-1'
      }`}
      style={{ color: cfg.text, background: cfg.light }}
    >
      <span
        className="rounded-full"
        style={{
          width: size === 'xs' ? 4 : 5,
          height: size === 'xs' ? 4 : 5,
          background: cfg.accent,
          display: 'inline-block',
          flexShrink: 0,
        }}
      />
      {cfg.label}
    </span>
  );
}

function Avatar({ name, size = 28 }: { name: string; size?: number }) {
  return (
    <div
      className="shrink-0 flex items-center justify-center rounded-full font-bold text-white"
      style={{
        width: size,
        height: size,
        fontSize: size * 0.34,
        background: avatarColor(name),
        letterSpacing: '0.02em',
      }}
    >
      {initials(name)}
    </div>
  );
}

// ─── Featured hero card ───────────────────────────────────────────────────────

function FeaturedHero({ post }: { post: BlogPost }) {
  const cfg = CATEGORY_CONFIG[post.category];
  return (
    <a
      href={post.link ?? '#'}
      target={post.link ? '_blank' : undefined}
      rel={post.link ? 'noopener noreferrer' : undefined}
      className="group block relative overflow-hidden rounded-3xl"
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.72) 0%, rgba(255,255,255,0.54) 100%)',
        backdropFilter: 'blur(32px) saturate(1.8)',
        border: '1px solid rgba(255,255,255,0.7)',
        boxShadow: '0 8px 40px rgba(13,148,136,0.08), 0 2px 8px rgba(0,0,0,0.04)',
      }}
    >
      {/* Top accent line — animated on hover */}
      <div
        className="absolute inset-x-0 top-0 h-0.5 transition-all duration-500"
        style={{
          background: `linear-gradient(90deg, ${cfg.accent}, #06b6d4, ${cfg.accent})`,
          backgroundSize: '200% 100%',
        }}
      />

      {/* Subtle radial glow behind content */}
      <div
        className="absolute -top-20 -right-20 w-72 h-72 rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${cfg.light} 0%, transparent 70%)`,
          filter: 'blur(20px)',
        }}
      />

      <div className="relative p-7 sm:p-10">
        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-2.5 mb-5">
          <CategoryPill category={post.category} />
          {post.tag && (
            <span
              className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full text-white"
              style={{ background: cfg.accent }}
            >
              {post.tag}
            </span>
          )}
          <span className="ml-auto text-[11px] text-slate-400 tabular-nums">{post.date}</span>
        </div>

        {/* Title */}
        <h2
          className="font-bold text-slate-900 leading-[1.18] mb-4 transition-colors duration-200 group-hover:text-teal-700"
          style={{ fontSize: 'clamp(1.25rem, 3vw, 1.65rem)', letterSpacing: '-0.025em' }}
        >
          {post.title}
        </h2>

        {/* Excerpt */}
        <p className="text-[14px] text-slate-500 leading-relaxed max-w-2xl mb-7">
          {post.excerpt}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <Avatar name={post.author} size={32} />
            <div>
              <p className="text-[13px] font-semibold text-slate-700 leading-none">{post.author}</p>
              <p className="text-[11px] text-slate-400 mt-1">{post.authorRole}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[11px] text-slate-400">{post.readTime}</span>
            <span
              className="inline-flex items-center gap-1.5 text-[12px] font-semibold rounded-xl px-4 py-2 transition-all duration-200 group-hover:gap-2.5"
              style={{ color: '#fff', background: cfg.accent }}
            >
              Read article
              <svg className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </a>
  );
}

// ─── Regular post card ────────────────────────────────────────────────────────

function PostCard({ post, index }: { post: BlogPost; index: number }) {
  const cfg = CATEGORY_CONFIG[post.category];
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(12px)';
    const timer = setTimeout(() => {
      el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 60 + index * 55);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <a
      ref={ref}
      href={post.link ?? '#'}
      target={post.link ? '_blank' : undefined}
      rel={post.link ? 'noopener noreferrer' : undefined}
      className="group flex flex-col rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
      style={{
        background: 'rgba(255,255,255,0.52)',
        backdropFilter: 'blur(24px) saturate(1.6)',
        border: '1px solid rgba(255,255,255,0.65)',
        boxShadow: '0 2px 12px rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.03)',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = `0 12px 32px rgba(0,0,0,0.08), 0 2px 8px ${cfg.accent}18`;
        (e.currentTarget as HTMLElement).style.borderColor = `${cfg.accent}30`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 12px rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.03)';
        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.65)';
      }}
    >
      {/* Category color bar */}
      <div className="h-[3px] w-full transition-all duration-300" style={{ background: cfg.accent, opacity: 0.7 }} />

      <div className="flex flex-col flex-1 p-5">
        {/* Top meta */}
        <div className="flex items-center justify-between gap-2 mb-3.5">
          <CategoryPill category={post.category} size="xs" />
          <div className="flex items-center gap-2">
            {post.tag && (
              <span
                className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full text-white"
                style={{ background: cfg.accent }}
              >
                {post.tag}
              </span>
            )}
            <span className="text-[10px] text-slate-400 tabular-nums">{post.readTime}</span>
          </div>
        </div>

        {/* Title */}
        <h3
          className="font-bold text-slate-800 leading-snug mb-2.5 line-clamp-2 transition-colors duration-200 group-hover:text-teal-700"
          style={{ fontSize: '13.5px', letterSpacing: '-0.015em' }}
        >
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-[11.5px] text-slate-500 leading-relaxed line-clamp-3 flex-1 mb-4">
          {post.excerpt}
        </p>

        {/* Footer */}
        <div
          className="flex items-center justify-between gap-2 pt-3.5"
          style={{ borderTop: '1px solid rgba(0,0,0,0.05)' }}
        >
          <div className="flex items-center gap-2 min-w-0">
            <Avatar name={post.author} size={24} />
            <div className="min-w-0">
              <p className="text-[11px] font-semibold text-slate-600 truncate leading-none">{post.author}</p>
              <p className="text-[10px] text-slate-400 mt-0.5 tabular-nums">{post.date}</p>
            </div>
          </div>
          <span
            className="shrink-0 text-[11px] font-semibold flex items-center gap-1 transition-all duration-200 group-hover:gap-1.5"
            style={{ color: cfg.accent }}
          >
            Read
            <svg className="size-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </span>
        </div>
      </div>
    </a>
  );
}

// ─── Filter tab ───────────────────────────────────────────────────────────────

function FilterTab({
  value,
  active,
  onClick,
}: {
  value: Filter;
  active: boolean;
  onClick: () => void;
}) {
  const cfg = value !== 'all' ? CATEGORY_CONFIG[value as BlogPost['category']] : null;
  return (
    <button
      onClick={onClick}
      className="relative inline-flex items-center gap-1.5 px-3.5 py-1.5 text-[11.5px] font-semibold rounded-full transition-all duration-200 whitespace-nowrap"
      style={
        active
          ? {
              background: cfg ? cfg.accent : '#0f172a',
              color: '#fff',
              boxShadow: cfg ? `0 2px 12px ${cfg.accent}40` : '0 2px 12px rgba(15,23,42,0.25)',
            }
          : {
              background: 'rgba(255,255,255,0.45)',
              color: '#64748b',
              border: '1px solid rgba(255,255,255,0.6)',
            }
      }
    >
      {cfg && (
        <span
          className="rounded-full"
          style={{ width: 5, height: 5, background: active ? 'rgba(255,255,255,0.7)' : cfg.accent, display: 'inline-block', flexShrink: 0 }}
        />
      )}
      {value === 'all' ? 'All' : cfg!.label}
    </button>
  );
}

// ─── Stats strip ─────────────────────────────────────────────────────────────

function StatsStrip() {
  const stats = [
    { value: `${POSTS.length}`, label: 'Articles' },
    { value: '5', label: 'Categories' },
    { value: '6', label: 'Authors' },
    { value: 'Weekly', label: 'Updates' },
  ];
  return (
    <div
      className="flex flex-wrap items-center gap-x-6 gap-y-2 px-5 py-3 rounded-2xl"
      style={{
        background: 'rgba(255,255,255,0.38)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.55)',
      }}
    >
      {stats.map((s, i) => (
        <div key={i} className="flex items-baseline gap-1.5">
          <span className="text-[15px] font-bold text-slate-800 tabular-nums">{s.value}</span>
          <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">{s.label}</span>
        </div>
      ))}
      <div className="ml-auto flex items-center gap-1.5">
        <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-[10px] font-semibold text-emerald-600">Live</span>
      </div>
    </div>
  );
}

// ─── Main view ────────────────────────────────────────────────────────────────

export function BlogsView() {
  const [activeFilter, setActiveFilter] = useState<Filter>('all');

  const featured = POSTS.find((p) => p.featured);
  const rest = POSTS.filter((p) => !p.featured);
  const filtered =
    activeFilter === 'all' ? rest : rest.filter((p) => p.category === activeFilter);

  return (
    <PageBackground>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">

        {/* ── Page header ── */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="h-4 w-[3px] rounded-full"
                  style={{ background: 'linear-gradient(180deg,#0d9488,#06b6d4)' }}
                />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-teal-600">
                  NeuralCare Editorial
                </span>
              </div>
              <h1
                className="font-bold text-slate-900 leading-none"
                style={{ fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', letterSpacing: '-0.03em' }}
              >
                Blogs &amp; Updates
              </h1>
              <p className="text-[13px] text-slate-500 mt-2 leading-relaxed max-w-md">
                Clinical insights, platform news, and evidence-based wellness guidance — curated by our team of specialists.
              </p>
            </div>

            {/* Search-style pill (cosmetic) */}
            <div
              className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl self-start sm:self-center shrink-0"
              style={{
                background: 'rgba(255,255,255,0.5)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(255,255,255,0.65)',
              }}
            >
              <svg className="size-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
              </svg>
              <span className="text-[12px] text-slate-400 select-none">Search articles…</span>
            </div>
          </div>

          <StatsStrip />
        </div>

        {/* ── Featured hero ── */}
        {featured && activeFilter === 'all' && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-px flex-1" style={{ background: 'rgba(0,0,0,0.06)' }} />
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400 px-2">
                Featured
              </span>
              <div className="h-px flex-1" style={{ background: 'rgba(0,0,0,0.06)' }} />
            </div>
            <FeaturedHero post={featured} />
          </div>
        )}

        {/* ── Filter bar ── */}
        <div className="flex items-center gap-2 flex-wrap mb-6">
          <div className="flex items-center gap-2 flex-wrap flex-1">
            {ALL_FILTERS.map((f) => (
              <FilterTab
                key={f}
                value={f}
                active={activeFilter === f}
                onClick={() => setActiveFilter(f)}
              />
            ))}
          </div>
          {activeFilter !== 'all' && (
            <span className="text-[11px] text-slate-400 tabular-nums">
              {filtered.length} post{filtered.length !== 1 ? 's' : ''}
            </span>
          )}
        </div>

        {/* ── Section label ── */}
        <div className="flex items-center gap-2 mb-5">
          <div className="h-px flex-1" style={{ background: 'rgba(0,0,0,0.06)' }} />
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400 px-2">
            {activeFilter === 'all' ? 'Latest' : CATEGORY_CONFIG[activeFilter as BlogPost['category']]?.label ?? 'Posts'}
          </span>
          <div className="h-px flex-1" style={{ background: 'rgba(0,0,0,0.06)' }} />
        </div>

        {/* ── Grid ── */}
        {filtered.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-20 rounded-2xl"
            style={{
              background: 'rgba(255,255,255,0.38)',
              border: '1px dashed rgba(0,0,0,0.08)',
            }}
          >
            <svg className="size-8 text-slate-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
            <p className="text-[13px] font-medium text-slate-500">No posts in this category yet.</p>
            <button
              onClick={() => setActiveFilter('all')}
              className="mt-3 text-[12px] font-semibold text-teal-600 hover:text-teal-700 transition-colors"
            >
              View all posts →
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((post, i) => (
              <PostCard key={post.id} post={post} index={i} />
            ))}
          </div>
        )}

        {/* ── Crisis banner ── */}
        <div
          className="mt-8 flex items-center gap-4 rounded-2xl px-5 py-4 flex-wrap sm:flex-nowrap"
          style={{
            background: 'linear-gradient(135deg, rgba(255,241,242,0.85) 0%, rgba(255,228,230,0.7) 100%)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(244,63,94,0.14)',
          }}
        >
          <div
            className="flex size-9 shrink-0 items-center justify-center rounded-xl"
            style={{ background: 'rgba(244,63,94,0.1)', border: '1px solid rgba(244,63,94,0.2)' }}
          >
            <svg className="size-4.5" style={{ color: '#e11d48' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[12.5px] font-bold" style={{ color: '#9f1239' }}>
              Need immediate support?
            </p>
            <p className="text-[11.5px] mt-0.5 leading-snug" style={{ color: '#be123c', opacity: 0.8 }}>
              Call or text <strong>988</strong> (Suicide &amp; Crisis Lifeline) — free, confidential, available 24/7.
            </p>
          </div>
          <a
            href="https://988lifeline.org"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 flex items-center gap-1.5 text-[11.5px] font-bold px-4 py-2 rounded-xl transition-all duration-200 hover:opacity-90 hover:scale-[1.02]"
            style={{ background: '#e11d48', color: '#fff' }}
          >
            Get help
            <svg className="size-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </div>

      </div>
    </PageBackground>
  );
}