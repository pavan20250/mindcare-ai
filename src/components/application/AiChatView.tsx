'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ArrowUp, SquarePen, AlertCircle, Sparkles, User, MessageCircle } from 'lucide-react';
import Image from 'next/image';
import { PageBackground } from '@/components/application/PageBg';

/* ───────────────────────── TYPES ───────────────────────── */
type Role = 'user' | 'assistant';
type Message = {
  id: string;
  role: Role;
  content: string;
  timestamp?: Date;
};

const uid = () => crypto.randomUUID();

/* ───────────────────────── PROMPTS ───────────────────────── */
const PROMPTS = [
  {
    label: 'Managing anxiety',
    sub: 'Where do I start?',
    value: "I've been feeling anxious lately — where do I start?",
    icon: '🌿',
  },
  {
    label: 'Panic attack coping',
    sub: 'Strategies that help',
    value: 'What coping strategies help with panic attacks?',
    icon: '🫁',
  },
  {
    label: 'Do I need therapy?',
    sub: 'Signs to look for',
    value: 'How do I know if I need professional help?',
    icon: '💬',
  },
  {
    label: 'Understanding CBT',
    sub: 'What it involves',
    value: 'Can you explain what CBT therapy involves?',
    icon: '🧠',
  },
];

/* ───────────────────────── BUBBLE ───────────────────────── */
const Bubble = ({ role, content }: Message) => {
  const isUser = role === 'user';

  return (
    <div className={`flex w-full items-end gap-2 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {/* Assistant avatar */}
      {!isUser && (
        <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-teal-50 border border-teal-200 mb-0.5">
          <Sparkles className="size-3.5 text-teal-600" />
        </div>
      )}

      {/* Message bubble */}
      {isUser ? (
        <div className="max-w-[70%] rounded-3xl rounded-br-sm px-4 py-2.5 text-sm leading-relaxed bg-teal-600 text-white shadow-sm">
          {content}
        </div>
      ) : (
        <div className="max-w-[80%] rounded-3xl rounded-bl-sm px-4 py-2.5 text-sm leading-relaxed bg-white/70 border border-white/80 text-slate-700 shadow-sm backdrop-blur-sm whitespace-pre-wrap">
          {content}
        </div>
      )}

      {/* User avatar */}
      {isUser && (
        <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-teal-100 border border-teal-200 mb-0.5">
          <User className="size-3.5 text-teal-700" />
        </div>
      )}
    </div>
  );
};

/* ───────────────────────── TYPING INDICATOR ───────────────────────── */
const TypingIndicator = () => (
  <div className="flex items-end gap-2">
    <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-teal-50 border border-teal-200 mb-0.5">
      <Sparkles className="size-3.5 text-teal-600" />
    </div>
    <div className="rounded-3xl rounded-bl-sm px-4 py-3 bg-white/70 border border-white/80 shadow-sm backdrop-blur-sm">
      <div className="flex items-center gap-1">
        <span className="size-1.5 rounded-full bg-teal-400 animate-bounce [animation-delay:0ms]" />
        <span className="size-1.5 rounded-full bg-teal-400 animate-bounce [animation-delay:150ms]" />
        <span className="size-1.5 rounded-full bg-teal-400 animate-bounce [animation-delay:300ms]" />
      </div>
    </div>
  </div>
);

/* ───────────────────────── WELCOME SCREEN ───────────────────────── */
const Welcome = ({ onSelect }: { onSelect: (t: string) => void }) => (
  <div className="flex h-full flex-col items-center justify-center gap-8 px-6 py-10">
    {/* Logo + Brand */}
    <div className="flex flex-col items-center gap-5">
      <div className="relative">
        <div className="absolute -inset-3 rounded-3xl bg-teal-400/10 blur-xl pointer-events-none" />
        <div className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border border-teal-200/60 bg-white/60 backdrop-blur-sm shadow-lg">
          <Image
            src="/NeuralCare_logo/url_logo.png"
            alt="NeuralCare"
            width={64}
            height={64}
            className="h-full w-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        </div>
      </div>

      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          NeuralCare AI
        </h1>
        <p className="text-sm text-slate-500 leading-relaxed max-w-xl">
          A supportive space to talk through what you're feeling
        </p>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200/60 text-xs font-medium text-teal-700">
          <span className="size-1.5 rounded-full bg-teal-500 animate-pulse" />
          AI assistant ready
        </div>
      </div>
    </div>

    {/* Prompt cards grid */}
    <div className="grid w-full max-w-lg grid-cols-2 gap-3">
      {PROMPTS.map(({ label, sub, value, icon }) => (
        <button
          key={label}
          onClick={() => onSelect(value)}
          className="group relative overflow-hidden rounded-2xl border border-white/70 bg-white/50 backdrop-blur-sm px-4 py-3.5 text-left shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/75 hover:border-teal-200/60 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/40"
        >
          {/* Hover tint */}
          <div className="absolute inset-0 rounded-2xl bg-linear-to-t from-teal-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />
          <span className="relative text-base mb-1.5 block">{icon}</span>
          <p className="relative text-xs font-semibold text-slate-800 leading-snug">{label}</p>
          <p className="relative mt-0.5 text-xs text-slate-500">{sub}</p>
        </button>
      ))}
    </div>
  </div>
);

/* ───────────────────────── MAIN COMPONENT ───────────────────────── */
export function AiChatView() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = useCallback(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading, scrollToBottom]);

  const canSend = useMemo(() => draft.trim() && !loading, [draft, loading]);

  const autoResize = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 152) + 'px';
  };

  const sendMessage = async (override?: string) => {
    const text = (override ?? draft).trim();
    if (!text || loading) return;

    const userMessage: Message = {
      id: uid(),
      role: 'user',
      content: text,
      timestamp: new Date(),
    };

    const historyForApi = [...messages, { role: 'user' as const, content: text }];

    setDraft('');
    setLoading(true);
    setError(null);
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
    setMessages((prev) => [...prev, userMessage]);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: historyForApi,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        const msg =
          typeof data?.error === 'string'
            ? data.error
            : 'Backend error. Please try again.';
        throw new Error(msg);
      }

      const reply =
        typeof data?.reply === 'string' && data.reply.trim().length > 0
          ? data.reply
          : 'No response received.';

      setMessages((prev) => [
        ...prev,
        {
          id: uid(),
          role: 'assistant',
          content: reply,
          timestamp: new Date(),
        },
      ]);
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : 'Something went wrong. Please try again.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const resetChat = () => {
    setMessages([]);
    setDraft('');
    setError(null);
  };

  return (
    <PageBackground>
      <div className="flex h-screen flex-col overflow-hidden">
        {/* ── Header ── */}
        <header className="z-20 flex shrink-0 items-center justify-between border-b border-white/50 bg-white/40 px-5 py-3 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="flex size-8 items-center justify-center rounded-xl bg-teal-600 text-white shadow-sm">
              <MessageCircle className="size-3.5" />
            </div>
            <div>
              <h1 className="text-sm font-semibold text-slate-900 leading-tight">
                NeuralCare AI
              </h1>
              <div className="flex items-center gap-1.5 mt-px">
                <span className="size-1.5 rounded-full bg-emerald-500" />
                <span className="text-xs text-slate-500">Mental health assistant</span>
              </div>
            </div>
          </div>

          {messages.length > 0 && (
            <button
              onClick={resetChat}
              title="New conversation"
              className="flex items-center gap-1.5 rounded-xl border border-white/60 bg-white/50 px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm backdrop-blur-sm transition-all hover:bg-white/70 hover:text-slate-900 active:scale-95"
            >
              <SquarePen size={12} />
              New chat
            </button>
          )}
        </header>

        {/* ── Messages area ── */}
        <main className="z-10 min-h-0 flex-1 overflow-hidden">
          <div
            ref={scrollRef}
            className="h-full overflow-y-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-teal-200/60 [&::-webkit-scrollbar-track]:bg-transparent"
          >
            {messages.length === 0 ? (
              <Welcome onSelect={sendMessage} />
            ) : (
              <div className="mx-auto flex max-w-2xl flex-col gap-3 px-5 pb-6 pt-6">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className="animate-in fade-in slide-in-from-bottom-1 duration-200"
                  >
                    <Bubble {...msg} />
                  </div>
                ))}
                {loading && (
                  <div className="animate-in fade-in slide-in-from-bottom-1 duration-200">
                    <TypingIndicator />
                  </div>
                )}
              </div>
            )}
          </div>
        </main>

        {/* ── Error banner ── */}
        {error && (
          <div className="z-20 mx-auto mb-2 flex w-full max-w-2xl items-center gap-2 rounded-2xl border border-red-200/60 bg-red-50/80 px-4 py-2.5 text-xs font-medium text-red-700 backdrop-blur-sm">
            <AlertCircle size={13} className="shrink-0 text-red-500" />
            {error}
          </div>
        )}

        {/* ── Input footer ── */}
        <footer className="relative z-20 shrink-0 px-5 pb-5 pt-3">
          {/* Fade-up scrim */}
          <div className="pointer-events-none absolute inset-x-0 -top-8 h-8 bg-linear-to-t from-slate-50/80 to-transparent" />

          <div className="mx-auto max-w-2xl space-y-2">
            {/* Textarea + send */}
            <div className="flex items-end gap-3 rounded-2xl border border-white/70 bg-white/60 px-4 py-3 shadow-sm backdrop-blur-xl transition-all duration-200 focus-within:border-teal-300/60 focus-within:bg-white/80 focus-within:shadow-md">
              <textarea
                ref={textareaRef}
                value={draft}
                onChange={(e) => {
                  setDraft(e.target.value);
                  autoResize();
                }}
                placeholder="Ask me anything about mental health…"
                rows={1}
                maxLength={2000}
                className="max-h-[152px] flex-1 resize-none bg-transparent text-sm leading-relaxed text-slate-800 placeholder:text-slate-400 focus:outline-none"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
              />

              <button
                disabled={!canSend}
                onClick={() => sendMessage()}
                className={[
                  'mb-0.5 flex size-8 shrink-0 items-center justify-center self-end rounded-xl transition-all duration-150',
                  canSend
                    ? 'bg-teal-600 text-white shadow-sm hover:bg-teal-700 hover:scale-105 active:scale-95'
                    : 'cursor-not-allowed bg-slate-100 text-slate-400',
                ].join(' ')}
              >
                <ArrowUp size={14} strokeWidth={2.5} />
              </button>
            </div>

            {/* Hint row */}
            <div className="flex items-center justify-between px-1">
              <p className="text-xs text-slate-400">
                <kbd className="rounded border border-slate-200 bg-white/60 px-1.5 py-px text-xs font-sans text-slate-500">
                  ↵
                </kbd>{' '}
                to send
              </p>
            </div>
          </div>
        </footer>
      </div>
    </PageBackground>
  );
}