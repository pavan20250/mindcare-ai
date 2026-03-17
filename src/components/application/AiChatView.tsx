'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Sparkles, User, Send, RotateCcw, AlertTriangle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

type ChatRole = 'user' | 'assistant';
type ChatMessage = { id: string; role: ChatRole; content: string };

function uid() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function Bubble({ role, content }: { role: ChatRole; content: string }) {
  const isUser = role === 'user';
  return (
    <div className={isUser ? 'flex justify-end' : 'flex justify-start'}>
      <div className="flex items-start gap-2 max-w-[85%]">
        {!isUser && (
          <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-white/40 backdrop-blur-sm border border-white/60 text-teal-600">
            <Sparkles className="size-3.5" />
          </div>
        )}

        <div
          className={
            isUser
              ? 'rounded-2xl rounded-tr-sm bg-teal-600 px-4 py-2.5 shadow-sm shadow-teal-600/10 border border-teal-500/30'
              : 'rounded-2xl rounded-tl-sm bg-white/50 backdrop-blur-sm border border-white/60 px-4 py-3 shadow-[0_2px_8px_rgba(0,0,0,0.04)]'
          }
        >
          <p className={isUser ? 'text-sm text-white font-medium whitespace-pre-wrap' : 'text-sm text-slate-700 whitespace-pre-wrap'}>
            {content}
          </p>
        </div>

        {isUser && (
          <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-white/40 backdrop-blur-sm border border-white/60 text-slate-500">
            <User className="size-3.5" />
          </div>
        )}
      </div>
    </div>
  );
}

export function AiChatView() {
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: uid(),
      role: 'assistant',
      content:
        "Hi — I'm NeuralCare AI. Ask me anything about your symptoms, coping strategies, or next steps. (This chat is not a substitute for professional medical advice.)",
    },
  ]);
  const [draft, setDraft] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = body.style.overflow;
    const prevBodyOverscroll = body.style.overscrollBehavior;
    html.style.overflow = 'hidden';
    body.style.overflow = 'hidden';
    body.style.overscrollBehavior = 'none';
    return () => {
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
      body.style.overscrollBehavior = prevBodyOverscroll;
    };
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages.length, sending]);

  const canSend = useMemo(() => !sending && !!draft.trim(), [draft, sending]);

  const handleReset = useCallback(() => {
    setError(null);
    setDraft('');
    setMessages([{
      id: uid(),
      role: 'assistant',
      content: "Hi — I'm NeuralCare AI. Ask me anything about your symptoms, coping strategies, or next steps. (This chat is not a substitute for professional medical advice.)",
    }]);
  }, []);

  const send = useCallback(async () => {
    const text = draft.trim();
    if (!text || sending) return;
    setError(null);
    setSending(true);
    setDraft('');
    const nextUser: ChatMessage = { id: uid(), role: 'user', content: text };
    setMessages((prev) => [...prev, nextUser]);
    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          messages: messages
            .filter((m) => m.role === 'user' || m.role === 'assistant')
            .map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      const data = (await res.json().catch(() => null)) as { reply?: string; error?: string } | null;
      if (!res.ok) throw new Error(data?.error || 'Request failed');
      const reply = (data?.reply ?? '').trim() || 'Sorry — I did not get a response.';
      setMessages((prev) => [...prev, { id: uid(), role: 'assistant', content: reply }]);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to send message');
      setMessages((prev) => [...prev, { id: uid(), role: 'assistant', content: 'I had trouble reaching the AI service. Please try again in a moment.' }]);
    } finally {
      setSending(false);
    }
  }, [draft, messages, sending]);

  return (
    <div className="flex h-dvh overflow-hidden flex-col bg-gradient-to-br from-slate-100 via-white to-slate-50">

      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-white/40 bg-white/60 backdrop-blur-2xl backdrop-saturate-[1.8] px-4 sm:px-8 py-3 flex items-center justify-between gap-4">
        {/* top sheen */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex size-9 items-center justify-center rounded-xl bg-teal-600 text-white shadow-sm shadow-teal-600/20">
            <Sparkles className="size-4" />
          </div>
          <div className="min-w-0">
            <h1 className="text-sm font-semibold tracking-tight text-slate-900">AI Care Assistant</h1>
            <p className="text-[11px] text-slate-400 truncate">
              Ask about symptoms, coping strategies, or next steps. Not a substitute for professional care.
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleReset}
          className="h-8 text-[11px] bg-white/30 border-white/50 backdrop-blur-sm text-slate-600 hover:bg-white/50 rounded-xl"
        >
          <RotateCcw className="size-3 mr-1.5" />
          Reset
        </Button>
      </header>

      {/* Chat area */}
      <main className="flex-1 min-h-0 overflow-hidden">
        {error && (
          <div className="px-4 sm:px-8 pt-3">
            <div className="rounded-2xl border border-amber-200/60 bg-white/40 backdrop-blur-sm px-3 py-2.5">
              <div className="flex items-start gap-2">
                <AlertTriangle className="size-4 text-amber-600 mt-0.5 shrink-0" />
                <div>
                  <p className="text-[12px] font-semibold text-amber-700">Couldn't reach AI backend</p>
                  <p className="text-[11px] text-amber-700/80 mt-0.5">{error}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={scrollRef} className="mt-3 h-full min-h-0 overflow-y-auto px-4 sm:px-8 pb-4 pt-1">
          <div className="min-h-full flex flex-col justify-end gap-4">
            {messages.map((m) => (
              <Bubble key={m.id} role={m.role} content={m.content} />
            ))}
            {sending && (
              <div className="flex items-center gap-2 text-slate-400 text-xs">
                <span className="inline-block size-2 rounded-full bg-teal-400 animate-pulse" />
                Thinking…
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Composer */}
      <footer className="sticky bottom-0 z-10 border-t border-white/40 bg-white/60 backdrop-blur-2xl backdrop-saturate-[1.8] px-4 sm:px-8 py-3 pb-[calc(12px+env(safe-area-inset-bottom))]">
        <div className="flex gap-3 items-end">
          <Textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Type your message…"
            className="min-h-[44px] max-h-[140px] resize-none bg-white/50 backdrop-blur-sm border-white/60 focus:border-teal-400 focus:ring-teal-400/20 rounded-xl text-slate-700 placeholder:text-slate-400"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                void send();
              }
            }}
          />
          <Button
            onClick={() => void send()}
            disabled={!canSend}
            className="h-11 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white border-0 shadow-sm shadow-teal-600/15"
          >
            <Send className="size-4 mr-2" />
            Send
          </Button>
        </div>
        <p className="mt-1.5 text-[11px] text-slate-400">Press Enter to send, Shift+Enter for a new line.</p>
      </footer>
    </div>
  );
}