'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ArrowUp, SquarePen, AlertCircle } from 'lucide-react';
import Image from 'next/image';
import { PageBackground } from '@/components/application/PageBg';

/* ───────────────────────── TYPES ───────────────────────── */
type Role = 'user' | 'assistant';
type Message = { id: string; role: Role; content: string; timestamp?: Date };
const uid = () => crypto.randomUUID();

/* ───────────────────────── PROMPTS ───────────────────────── */
const PROMPTS = [
  { label: 'Managing anxiety',   sub: 'Where do I start?',    value: "I've been feeling anxious lately — where do I start?" },
  { label: 'Panic attack coping', sub: 'Strategies that help', value: 'What coping strategies help with panic attacks?' },
  { label: 'Do I need therapy?', sub: 'Signs to look for',    value: 'How do I know if I need professional help?' },
  { label: 'Understanding CBT',  sub: 'What it involves',     value: 'Can you explain what CBT therapy involves?' },
];

/* ───────────────────────── BUBBLE ───────────────────────── */
const Bubble = ({ role, content }: Message) => {
  const isUser = role === 'user';
  return (
    <div className={`flex w-full mb-1 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {isUser ? (
        <div
          className="max-w-[68%] rounded-[18px_18px_4px_18px] px-4 py-[11px] text-[15px] leading-[1.65] tracking-[0.01em]"
          style={{ background: '#3d2c1e', color: '#fdf6ee', fontFamily: "'Crimson Pro', Georgia, serif" }}
        >
          {content}
        </div>
      ) : (
        <div
          className="max-w-[84%] text-[15.5px] leading-[1.82] tracking-[0.01em] whitespace-pre-wrap"
          style={{ color: '#3d2c1e', fontFamily: "'Crimson Pro', Georgia, serif" }}
        >
          {content}
        </div>
      )}
    </div>
  );
};

/* ───────────────────────── WELCOME ───────────────────────── */
const Welcome = ({ onSelect }: { onSelect: (t: string) => void }) => (
  <div className="flex h-full flex-col items-center justify-center gap-9 px-7">

    {/* Logo + Brand */}
    <div className="flex flex-col items-center gap-4">
      <div
        className="flex h-[58px] w-[58px] items-center justify-center overflow-hidden rounded-[18px] border"
        style={{ background: '#f5e8d4', borderColor: '#dfc9a8', boxShadow: '0 4px 18px rgba(139,94,60,0.14)' }}
      >
        <Image
          src="/NeuralCare_logo/url_logo.png"
          alt="NeuralCare"
          width={58}
          height={58}
          className="h-full w-full object-cover"
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />
      </div>

      <div className="text-center">
        <h1
          className="m-0 text-[31px] font-medium leading-none tracking-[-0.015em]"
          style={{ fontFamily: "'Cormorant', Georgia, serif", color: '#3d2c1e' }}
        >
          NeuralCare AI
        </h1>
        <p
          className="mt-[7px] text-[15px] font-normal italic tracking-[0.01em]"
          style={{ fontFamily: "'Crimson Pro', Georgia, serif", color: '#a07850' }}
        >
          A gentle space to think through what you're feeling
        </p>
      </div>
    </div>

    {/* Prompt cards */}
    <div className="grid w-full max-w-[460px] grid-cols-2 gap-[10px]">
      {PROMPTS.map(({ label, sub, value }) => (
        <button
          key={label}
          onClick={() => onSelect(value)}
          className="group rounded-[14px] border px-4 py-[14px] text-left transition-all duration-[180ms] hover:-translate-y-px"
          style={{
            fontFamily: "'Crimson Pro', Georgia, serif",
            background: '#fdf6ee',
            borderColor: '#e8d8c4',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = '#f5e8d8';
            (e.currentTarget as HTMLButtonElement).style.borderColor = '#d4b896';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = '#fdf6ee';
            (e.currentTarget as HTMLButtonElement).style.borderColor = '#e8d8c4';
          }}
        >
          <p className="m-0 text-[14.5px] font-semibold leading-[1.3]" style={{ color: '#3d2c1e' }}>{label}</p>
          <p className="mt-1 text-[13px] italic" style={{ color: '#a07850' }}>{sub}</p>
        </button>
      ))}
    </div>

    <p
      className="m-0 text-[12.5px] tracking-[0.025em]"
      style={{ fontFamily: "'Crimson Pro', serif", color: '#c4a882' }}
    >
      Not a substitute for professional care
    </p>
  </div>
);

/* ───────────────────────── MAIN ───────────────────────── */
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

  useEffect(() => { scrollToBottom(); }, [messages, loading, scrollToBottom]);

  const canSend = useMemo(() => draft.trim() && !loading, [draft, loading]);

  const autoResize = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 160) + 'px';
  };

  const sendMessage = async (override?: string) => {
    const text = (override ?? draft).trim();
    if (!text || loading) return;
    setDraft('');
    setLoading(true);
    setError(null);
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
    setMessages((prev) => [...prev, { id: uid(), role: 'user', content: text, timestamp: new Date() }]);
    try {
      const res = await fetch('/api/ai/chat', { method: 'POST', body: JSON.stringify({ message: text }) });
      const data = await res.json();
      setMessages((prev) => [...prev, { id: uid(), role: 'assistant', content: data?.reply ?? 'No response received.', timestamp: new Date() }]);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetChat = () => { setMessages([]); setDraft(''); setError(null); };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Cormorant:wght@400;500;600&display=swap');
        .chat-scroll::-webkit-scrollbar { width: 4px; }
        .chat-scroll::-webkit-scrollbar-track { background: transparent; }
        .chat-scroll::-webkit-scrollbar-thumb { background: #e2d0bb; border-radius: 10px; }
        .nc-textarea::placeholder { color: #c4a882; font-style: italic; }
        .nc-textarea:focus { outline: none; }
        @keyframes softBounce { 0%,80%,100%{transform:translateY(0);opacity:0.45} 40%{transform:translateY(-5px);opacity:1} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(5px)} to{opacity:1;transform:translateY(0)} }
        .msg-in { animation: fadeUp 0.22s ease forwards; }
      `}</style>

      <PageBackground>
        <div className="relative flex h-screen flex-col">

          {/* Floating new chat */}
          {messages.length > 0 && (
            <button
              onClick={resetChat}
              title="New conversation"
              className="absolute right-[18px] top-4 z-20 flex h-9 w-9 items-center justify-center rounded-[11px] border transition-colors duration-150"
              style={{ borderColor: '#e2d0bb', background: '#fdf6ee', color: '#8b5e3c', boxShadow: '0 1px 8px rgba(139,94,60,0.1)' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = '#f0e4d4'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = '#fdf6ee'; }}
            >
              <SquarePen size={15} />
            </button>
          )}

          {/* CHAT */}
          <main className="relative z-10 flex-1 overflow-hidden">
            <div ref={scrollRef} className="chat-scroll h-full overflow-y-auto">
              {messages.length === 0 ? (
                <Welcome onSelect={sendMessage} />
              ) : (
                <div className="mx-auto flex max-w-[660px] flex-col gap-[14px] px-7 pb-5 pt-[52px]">
                  {messages.map((msg) => (
                    <div key={msg.id} className="msg-in">
                      <Bubble {...msg} />
                    </div>
                  ))}
                  {loading && (
                    <div className="flex items-center gap-[5px] pl-0.5 pt-0.5">
                      {[0, 160, 320].map((d) => (
                        <span
                          key={d}
                          className="inline-block h-[7px] w-[7px] rounded-full"
                          style={{ background: '#c9a98a', animation: 'softBounce 1.4s ease-in-out infinite', animationDelay: `${d}ms` }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </main>

          {/* ERROR */}
          {error && (
            <div
              className="z-20 mx-auto mb-2 flex w-full max-w-[660px] items-center gap-2 rounded-xl border px-[14px] py-[10px] text-[13.5px]"
              style={{ background: '#fff5f0', borderColor: '#f5c9b0', color: '#8b3a1e', fontFamily: "'Crimson Pro', serif" }}
            >
              <AlertCircle size={14} className="shrink-0" />
              {error}
            </div>
          )}

          {/* INPUT */}
          <footer className="relative z-20 px-5 pb-[22px] pt-2">
            {/* Fade gradient above */}
            <div
              className="pointer-events-none absolute inset-x-0 -top-11 h-11"
              style={{ background: 'linear-gradient(to bottom, transparent, #fdf8f2)' }}
            />

            <div
              className="mx-auto flex max-w-[660px] items-end rounded-[20px] border px-[18px] py-[10px] transition-all duration-200"
              style={{ borderColor: '#e2d0bb', background: '#fffaf5', boxShadow: '0 2px 18px rgba(139,94,60,0.08)' }}
              onFocusCapture={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.borderColor = '#c4956a';
                el.style.boxShadow = '0 2px 24px rgba(139,94,60,0.14)';
              }}
              onBlurCapture={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.borderColor = '#e2d0bb';
                el.style.boxShadow = '0 2px 18px rgba(139,94,60,0.08)';
              }}
            >
              <textarea
                ref={textareaRef}
                value={draft}
                onChange={(e) => { setDraft(e.target.value); autoResize(); }}
                placeholder="What's on your mind…"
                rows={1}
                maxLength={2000}
                className="nc-textarea max-h-[160px] flex-1 resize-none border-none bg-transparent p-0 text-[15px] leading-[1.65] tracking-[0.01em]"
                style={{ fontFamily: "'Crimson Pro', Georgia, serif", color: '#3d2c1e', overflowY: 'auto' }}
                onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
              />

              <button
                disabled={!canSend}
                onClick={() => sendMessage()}
                className={`mb-[1px] ml-[10px] flex h-[34px] w-[34px] shrink-0 items-center justify-center self-end rounded-[11px] border-none transition-all duration-150 ${canSend ? 'hover:scale-[1.07]' : 'cursor-not-allowed'}`}
                style={{
                  background: canSend ? 'linear-gradient(145deg, #8b5e3c 0%, #5e3318 100%)' : '#eedcca',
                  color: canSend ? '#fdf6ee' : '#c4a882',
                  boxShadow: canSend ? '0 3px 12px rgba(90,45,15,0.25)' : 'none',
                }}
              >
                <ArrowUp size={15} strokeWidth={2.5} />
              </button>
            </div>

            <p
              className="mt-[9px] text-center text-[11.5px] tracking-[0.025em]"
              style={{ fontFamily: "'Crimson Pro', serif", color: '#c4a882' }}
            >
              Not a substitute for professional mental health care
            </p>
          </footer>

        </div>
      </PageBackground>
    </>
  );
}