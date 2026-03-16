'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Sparkles, User, Send, RotateCcw, AlertTriangle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

type ChatRole = 'user' | 'assistant';

type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
};

function uid() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function Bubble({ role, content }: { role: ChatRole; content: string }) {
  const isUser = role === 'user';
  return (
    <div className={isUser ? 'flex justify-end' : 'flex justify-start'}>
      <div className={isUser ? 'flex items-start gap-2 max-w-[85%]' : 'flex items-start gap-2 max-w-[85%]'}>
        {!isUser && (
          <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-teal-50 border border-teal-100 text-teal-600">
            <Sparkles className="size-3.5" />
          </div>
        )}

        <div
          className={
            isUser
              ? 'rounded-2xl rounded-tr-sm bg-teal-600 px-4 py-2.5 shadow-sm shadow-teal-600/10'
              : 'rounded-2xl rounded-tl-sm bg-white border border-slate-200/80 px-4 py-3 shadow-sm'
          }
        >
          <p className={isUser ? 'text-sm text-white font-medium whitespace-pre-wrap' : 'text-sm text-slate-700 whitespace-pre-wrap'}>
            {content}
          </p>
        </div>

        {isUser && (
          <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-slate-100 border border-slate-200 text-slate-500">
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
        "Hi — I’m NeuralCare AI. Ask me anything about your symptoms, coping strategies, or next steps. (This chat is not a substitute for professional medical advice.)",
    },
  ]);
  const [draft, setDraft] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages.length, sending]);

  const canSend = useMemo(() => !sending && !!draft.trim(), [draft, sending]);

  const handleReset = useCallback(() => {
    setError(null);
    setDraft('');
    setMessages([
      {
        id: uid(),
        role: 'assistant',
        content:
          "Hi — I’m NeuralCare AI. Ask me anything about your symptoms, coping strategies, or next steps. (This chat is not a substitute for professional medical advice.)",
      },
    ]);
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
      if (!res.ok) {
        throw new Error(data?.error || 'Request failed');
      }

      const reply = (data?.reply ?? '').trim() || 'Sorry — I did not get a response.';
      setMessages((prev) => [...prev, { id: uid(), role: 'assistant', content: reply }]);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to send message');
      setMessages((prev) => [
        ...prev,
        {
          id: uid(),
          role: 'assistant',
          content: 'I had trouble reaching the AI service. Please try again in a moment.',
        },
      ]);
    } finally {
      setSending(false);
    }
  }, [draft, messages, sending]);

  return (
    <div className="flex h-full min-h-[calc(100vh-80px)] flex-col bg-[#f8fafb]">
      {/* Header */}
      <header className="border-b border-slate-200/80 bg-white px-4 sm:px-8 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex size-9 items-center justify-center rounded-xl bg-teal-600 text-white shadow-sm shadow-teal-600/20">
            <Sparkles className="size-4" />
          </div>
          <div className="min-w-0">
            <h1 className="text-sm font-semibold tracking-tight text-slate-900">
              AI Care Assistant
            </h1>
            <p className="text-[11px] text-slate-400 truncate">
              Ask about symptoms, coping strategies, or next steps. Not a substitute for professional care.
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleReset}
          className="h-8 text-[11px] border-slate-200 text-slate-600"
        >
          <RotateCcw className="size-3 mr-1.5" />
          Reset
        </Button>
      </header>

      {/* Main chat area */}
      <main className="flex-1 min-h-0">
        {error && (
          <div className="px-4 sm:px-8 pt-3">
            <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2.5">
              <div className="flex items-start gap-2">
                <AlertTriangle className="size-4 text-amber-600 mt-0.5 shrink-0" />
                <div>
                  <p className="text-[12px] font-semibold text-amber-700">Couldn’t reach AI backend</p>
                  <p className="text-[11px] text-amber-700/80 mt-0.5">{error}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div
          ref={scrollRef}
          className="mt-3 h-full min-h-0 overflow-y-auto px-4 sm:px-8 pb-4 pt-1 space-y-4"
        >
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
      </main>

      {/* Composer */}
      <footer className="border-t border-slate-200/80 bg-white px-4 sm:px-8 py-3">
        <div className="flex gap-3 items-end">
          <Textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Type your message…"
            className="min-h-[44px] max-h-[140px] resize-none border-slate-200 focus:border-teal-400 focus:ring-teal-400/20 rounded-lg bg-slate-50 text-slate-700"
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
            className="h-11 px-4 rounded-lg bg-teal-600 hover:bg-teal-700 text-white border-0 shadow-sm shadow-teal-600/15"
          >
            <Send className="size-4 mr-2" />
            Send
          </Button>
        </div>
        <p className="mt-1.5 text-[11px] text-slate-400">
          Press Enter to send, Shift+Enter for a new line.
        </p>
      </footer>
    </div>
  );
}

