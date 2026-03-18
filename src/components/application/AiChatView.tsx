'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Send,
  AlertTriangle,
  ChevronDown,
  Shield,
  Brain,
  Plus,
  HeartPulse,
  BookOpen,
  Lightbulb,
  Sparkles,
  Lock,
  Activity,
} from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { PageBackground } from '@/components/application/PageBg';
import Image from 'next/image';

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
    icon: HeartPulse,
    label: "Managing anxiety",
    subtitle: "Where do I start?",
    value: "I've been feeling anxious lately — where do I start?",
    color: "from-rose-500/10 to-pink-500/5 border-rose-200/40 hover:border-rose-300/60",
    iconColor: "text-rose-500",
  },
  {
    icon: Brain,
    label: 'Panic attack coping',
    subtitle: "Strategies that help",
    value: 'What coping strategies help with panic attacks?',
    color: "from-violet-500/10 to-purple-500/5 border-violet-200/40 hover:border-violet-300/60",
    iconColor: "text-violet-500",
  },
  {
    icon: Lightbulb,
    label: 'Seeking therapy?',
    subtitle: "Signs you need help",
    value: 'How do I know if I need professional help?',
    color: "from-amber-500/10 to-yellow-500/5 border-amber-200/40 hover:border-amber-300/60",
    iconColor: "text-amber-500",
  },
  {
    icon: BookOpen,
    label: 'Understanding CBT',
    subtitle: "What therapy involves",
    value: 'Can you explain what CBT therapy involves?',
    color: "from-teal-500/10 to-emerald-500/5 border-teal-200/40 hover:border-teal-300/60",
    iconColor: "text-teal-500",
  },
];

/* ───────────────────────── HELPERS ───────────────────────── */
const formatTime = (date?: Date) => {
  if (!date) return '';
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

/* ───────────────────────── UI COMPONENTS ───────────────────────── */

const AvatarAI = () => (
  <div className="relative flex h-9 w-9 shrink-0 items-center justify-center">
    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-teal-400 to-cyan-600 opacity-20 blur-sm" />
    <div className="relative flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-600 shadow-md shadow-teal-500/20 border border-white/20 overflow-hidden">
      <Image
        src="/NeuralCare_logo/url_logo.png"
        alt="NeuralCare"
        width={70}
        height={70}
        className="h-full w-full object-cover"
        onError={(e) => {
          (e.target as HTMLImageElement).style.display = 'none';
        }}
      />
      <Brain className="absolute h-4 w-4 text-white opacity-0 peer-[img:not([src])]:opacity-100" />
    </div>
  </div>
);

const AvatarUser = () => (
  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-slate-800 border border-slate-700/60 text-xs font-bold text-slate-100 shadow-sm tracking-wide">
    YOU
  </div>
);

const Bubble = ({ role, content, timestamp }: Message) => {
  const isUser = role === 'user';

  return (
    <div className={`group flex gap-3 px-4 py-1.5 ${isUser ? 'flex-row-reverse' : ''}`}>
      {!isUser && <AvatarAI />}

      <div className={`flex max-w-[70%] flex-col gap-1 ${isUser ? 'items-end' : 'items-start'}`}>
        <div
          className={`rounded-2xl px-4 py-3 text-[13.5px] leading-relaxed shadow-sm
          ${
            isUser
              ? 'bg-gradient-to-br from-slate-800 to-slate-900 text-slate-100 rounded-tr-sm border border-slate-700/50 shadow-slate-900/20'
              : 'bg-white/80 backdrop-blur-md border border-slate-200/60 text-slate-700 rounded-tl-sm shadow-slate-100/50'
          }`}
        >
          {content}
        </div>
        <span className="px-1 text-[10px] text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200 font-medium tracking-wide">
          {formatTime(timestamp)}
        </span>
      </div>

      {isUser && <AvatarUser />}
    </div>
  );
};

const TypingIndicator = () => (
  <div className="flex gap-3 px-4 py-1.5">
    <AvatarAI />
    <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-sm border border-slate-200/60 bg-white/80 backdrop-blur-md px-4 py-3 shadow-sm">
      <span className="text-[11px] text-slate-400 font-medium mr-1.5 tracking-wide">Thinking</span>
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-teal-400" style={{ animationDelay: '0ms' }} />
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-teal-400" style={{ animationDelay: '150ms' }} />
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-teal-400" style={{ animationDelay: '300ms' }} />
    </div>
  </div>
);

const Welcome = ({ onSelect }: { onSelect: (text: string) => void }) => (
  <div className="flex h-full flex-col items-center justify-center gap-8 px-6 py-10 text-center">

    {/* Logo & Brand */}
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-teal-400/30 to-cyan-500/30 blur-xl scale-110" />
        <div className="relative flex items-center justify-center rounded-3xl ">
          <Image
            src="/NeuralCare_logo/url_logo.png"
            alt="NeuralCare AI"
            width={120}
            height={120}
            className="h-full w-full object-cover"
            onError={(e) => {
              const parent = (e.target as HTMLElement).parentElement;
              if (parent) {
                (e.target as HTMLImageElement).style.display = 'none';
                const fallback = parent.querySelector('.logo-fallback') as HTMLElement;
                if (fallback) fallback.style.display = 'flex';
              }
            }}
          />
          <div className="logo-fallback absolute inset-0 hidden items-center justify-center rounded-3xl bg-gradient-to-br from-teal-500 to-cyan-600">
            <Brain className="h-9 w-9 text-white" />
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-center gap-2.5 mb-1">
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: "'Sora', sans-serif" }}>
            NeuralCare AI
          </h1>
          <span className="inline-flex items-center gap-1 rounded-full bg-teal-50 border border-teal-200/60 px-2.5 py-0.5 text-[10px] font-bold text-teal-700 tracking-widest uppercase">
            <Sparkles className="h-2.5 w-2.5" />
            Beta
          </span>
        </div>
        <p className="text-[13px] text-slate-500 leading-relaxed max-w-xs font-medium">
          Your confidential behavioral health companion. Ask anything — we're here to help.
        </p>
      </div>
    </div>

    {/* Prompt Cards */}
    <div className="grid w-full max-w-xl grid-cols-2 gap-3">
      {PROMPTS.map(({ icon: Icon, label, subtitle, value, color, iconColor }) => (
        <button
          key={label}
          onClick={() => onSelect(value)}
          className={`group flex flex-col items-start gap-3 rounded-2xl border bg-gradient-to-br p-4 text-left transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 ${color}`}
        >
          <div className={`flex h-8 w-8 items-center justify-center rounded-xl bg-white/70 shadow-sm border border-white/80`}>
            <Icon className={`h-4 w-4 ${iconColor}`} />
          </div>
          <div>
            <p className="text-[12.5px] font-semibold text-slate-700 leading-tight">{label}</p>
            <p className="text-[11px] text-slate-400 mt-0.5 font-medium">{subtitle}</p>
          </div>
        </button>
      ))}
    </div>

    {/* Trust badges */}
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-1.5 rounded-xl bg-white/60 border border-slate-200/60 backdrop-blur-sm px-3 py-1.5 text-[11px] font-semibold text-slate-500 shadow-sm">
        <Lock className="h-3 w-3 text-teal-500" />
        HIPAA Compliant
      </div>
      <div className="flex items-center gap-1.5 rounded-xl bg-white/60 border border-slate-200/60 backdrop-blur-sm px-3 py-1.5 text-[11px] font-semibold text-slate-500 shadow-sm">
        <Shield className="h-3 w-3 text-teal-500" />
        End-to-End Encrypted
      </div>
      <div className="flex items-center gap-1.5 rounded-xl bg-white/60 border border-slate-200/60 backdrop-blur-sm px-3 py-1.5 text-[11px] font-semibold text-slate-500 shadow-sm">
        <Activity className="h-3 w-3 text-emerald-500" />
        24/7 Available
      </div>
    </div>
  </div>
);

/* ───────────────────────── DIVIDER ───────────────────────── */
const DateDivider = ({ label }: { label: string }) => (
  <div className="flex items-center gap-3 px-4 py-2">
    <div className="h-px flex-1 bg-slate-200/60" />
    <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">{label}</span>
    <div className="h-px flex-1 bg-slate-200/60" />
  </div>
);

/* ───────────────────────── MAIN COMPONENT ───────────────────────── */

export function AiChatView() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [atBottom, setAtBottom] = useState(true);
  const [charCount, setCharCount] = useState(0);

  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = useCallback(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, []);

  useEffect(() => {
    if (atBottom) scrollToBottom();
  }, [messages, loading, atBottom, scrollToBottom]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const handleScroll = () => {
      setAtBottom(el.scrollHeight - el.scrollTop - el.clientHeight < 80);
    };
    el.addEventListener('scroll', handleScroll);
    return () => el.removeEventListener('scroll', handleScroll);
  }, []);

  const canSend = useMemo(() => draft.trim() && !loading, [draft, loading]);

  const handleDraftChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDraft(e.target.value);
    setCharCount(e.target.value.length);
  };

  const sendMessage = async (override?: string) => {
    const text = (override ?? draft).trim();
    if (!text || loading) return;

    setDraft('');
    setCharCount(0);
    setLoading(true);
    setError(null);

    setMessages((prev) => [...prev, { id: uid(), role: 'user', content: text, timestamp: new Date() }]);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        body: JSON.stringify({ message: text }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { id: uid(), role: 'assistant', content: data?.reply ?? 'No response received.', timestamp: new Date() },
      ]);
    } catch {
      setError('Connection failed. Please check your network and try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetChat = () => {
    setMessages([]);
    setDraft('');
    setError(null);
    setCharCount(0);
  };

  return (
    <div
      className="flex h-screen flex-col"
      style={{
        background: 'linear-gradient(135deg, #f0fdf9 0%, #f8fafc 40%, #f0f9ff 100%)',
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* Background texture */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2300897b' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* HEADER */}
      <header className="relative z-10 flex items-center justify-between border-b border-slate-200/60 bg-white/70 backdrop-blur-xl px-6 py-3.5 shadow-sm shadow-slate-100/50">
        {/* Left: Logo */}
        <div className="flex items-center gap-3.5">
          <div className="relative">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white border border-slate-200/80 shadow-sm overflow-hidden">
              <Image
                src="/NeuralCare_logo/url_logo.png"
                alt="NeuralCare"
                width={40}
                height={40}
                className="h-full w-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                  const parent = (e.target as HTMLElement).closest('.logo-wrap');
                  if (parent) parent.classList.add('fallback-active');
                }}
              />
            </div>
            {/* Online dot */}
            <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400 border-2 border-white shadow-sm shadow-emerald-300/50" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-[15px] font-bold text-slate-900 tracking-tight" style={{ fontFamily: "'Sora', sans-serif" }}>
                NeuralCare AI
              </span>
              <span className="rounded-full border border-teal-200 bg-teal-50 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-teal-600">
                Beta
              </span>
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] text-slate-400 font-medium">Behavioral Health AI · Online</span>
            </div>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 rounded-xl border border-slate-200/60 bg-slate-50/80 px-3 py-1.5 text-[11px] font-semibold text-slate-500">
            <Shield className="h-3 w-3 text-teal-500" />
            HIPAA
          </div>
          <div className="flex items-center gap-1.5 rounded-xl border border-slate-200/60 bg-slate-50/80 px-3 py-1.5 text-[11px] font-semibold text-slate-500">
            <Lock className="h-3 w-3 text-slate-400" />
            Encrypted
          </div>

          {messages.length > 0 && (
            <button
              onClick={resetChat}
              className="flex items-center gap-1.5 rounded-xl border border-slate-200/60 bg-white px-3 py-1.5 text-[11px] font-semibold text-slate-600 hover:border-teal-300 hover:bg-teal-50 hover:text-teal-700 transition-all duration-150 shadow-sm"
            >
              <Plus className="h-3.5 w-3.5" />
              New Chat
            </button>
          )}
        </div>
      </header>

      {/* CHAT AREA */}
      <main className="relative flex-1 overflow-hidden">
        <div ref={scrollRef} className="h-full overflow-y-auto scroll-smooth">
          {messages.length === 0 ? (
            <Welcome onSelect={sendMessage} />
          ) : (
            <div className="mx-auto max-w-3xl space-y-0.5 py-6 pb-4">
              <DateDivider label="Today" />
              {messages.map((msg) => (
                <Bubble key={msg.id} {...msg} />
              ))}
              {loading && <TypingIndicator />}
            </div>
          )}
        </div>

        {/* Scroll to bottom pill */}
        {!atBottom && (
          <button
            onClick={scrollToBottom}
            className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-slate-200/60 bg-white/90 backdrop-blur-md px-4 py-2 text-[11px] font-semibold text-slate-600 shadow-lg hover:bg-white hover:shadow-xl hover:-translate-y-px transition-all duration-150"
          >
            <ChevronDown className="h-3.5 w-3.5 text-teal-500" />
            Scroll to latest
          </button>
        )}
      </main>

      {/* ERROR BANNER */}
      {error && (
        <div className="mx-4 mb-2 flex items-start gap-2.5 rounded-2xl border border-red-200/60 bg-red-50/80 backdrop-blur-sm px-4 py-3 text-[13px] text-red-700 shadow-sm">
          <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5 text-red-500" />
          <div>
            <p className="font-semibold text-red-800">Connection error</p>
            <p className="text-[12px] text-red-600 mt-0.5">{error}</p>
          </div>
        </div>
      )}

      {/* INPUT AREA */}
      <footer className="relative z-10 border-t border-slate-200/60 bg-white/70 backdrop-blur-xl p-4 pt-3">
        <div className="mx-auto max-w-3xl space-y-2.5">
          {/* Input box */}
          <div className="relative flex items-end gap-0 rounded-2xl border border-slate-200/80 bg-white/90 shadow-md shadow-slate-200/40 focus-within:border-teal-300/80 focus-within:shadow-teal-100/60 focus-within:ring-2 focus-within:ring-teal-200/30 transition-all duration-200">
            {/* Left accent bar */}
            <div className="absolute left-0 top-3 bottom-3 w-0.5 rounded-full bg-gradient-to-b from-teal-400 to-cyan-500 opacity-0 transition-opacity duration-200 focus-within:opacity-100" />

            <Textarea
              ref={textareaRef}
              value={draft}
              onChange={handleDraftChange}
              placeholder="Ask about mental health, coping strategies, or therapy options…"
              rows={1}
              maxLength={2000}
              className="flex-1 resize-none border-none bg-transparent py-3.5 pl-4 pr-2 text-[13.5px] text-slate-700 placeholder:text-slate-400 focus:ring-0 focus-visible:ring-0 leading-relaxed min-h-[50px] max-h-[160px]"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
            />

            <div className="flex items-end gap-1.5 p-2">
              {/* Char count */}
              {charCount > 100 && (
                <span className={`mb-2.5 mr-1 text-[10px] font-medium transition-colors ${charCount > 1800 ? 'text-red-400' : 'text-slate-300'}`}>
                  {charCount}/2000
                </span>
              )}

              {/* Send */}
              <button
                disabled={!canSend}
                onClick={() => sendMessage()}
                className={`flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-150 ${
                  canSend
                    ? 'bg-gradient-to-br from-teal-500 to-cyan-600 hover:from-teal-400 hover:to-cyan-500 hover:scale-105 hover:shadow-md hover:shadow-teal-300/40 active:scale-95 shadow-sm shadow-teal-500/20'
                    : 'cursor-not-allowed bg-slate-100 border border-slate-200/60'
                }`}
              >
                <Send className={`h-4 w-4 ${canSend ? 'text-white' : 'text-slate-300'}`} />
              </button>
            </div>
          </div>

          {/* Footer row */}
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-3 text-[10.5px] text-slate-400 font-medium">
              <span className="flex items-center gap-1">
                <Lock className="h-2.5 w-2.5" /> Private & secure
              </span>
              <span className="text-slate-200">·</span>
              <span>Press ⏎ to send, Shift+⏎ for new line</span>
            </div>
            <p className="text-[10.5px] text-slate-400 font-medium">
              Not a substitute for professional care
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}