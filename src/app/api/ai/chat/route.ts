import { NextResponse } from 'next/server';

type Role = 'user' | 'assistant';
type UpstreamMessage = { role: Role; content: string };

type UpstreamChatResponse = {
  message?: string;
  reply?: string;
  text?: string;
  output?: string;
  content?: string;
  assessmentReady?: boolean;
  crisisDetected?: boolean;
  choices?: Array<{ message?: { content?: string }; text?: string }>;
};

function getStringReply(payload: UpstreamChatResponse): string | null {
  if (typeof payload.reply === 'string') return payload.reply;
  if (typeof payload.message === 'string') return payload.message;
  if (typeof payload.text === 'string') return payload.text;
  if (typeof payload.output === 'string') return payload.output;
  if (typeof payload.content === 'string') return payload.content;

  if (Array.isArray(payload.choices) && payload.choices.length > 0) {
    const first = payload.choices[0];
    if (typeof first?.message?.content === 'string') return first.message.content;
    if (typeof first?.text === 'string') return first.text;
  }

  return null;
}

function normalizeBaseUrl(raw: string): string {
  const trimmed = raw.trim();
  if (/^https?:\/\//i.test(trimmed)) return trimmed;

  // Better local default
  if (/^(localhost|127\.0\.0\.1)(:\d+)?(\/|$)/i.test(trimmed)) {
    return `http://${trimmed.replace(/^\/+/, '')}`;
  }
  return `https://${trimmed.replace(/^\/+/, '')}`;
}

function joinUrl(base: string, path: string): string {
  const left = base.replace(/\/+$/, '');
  const right = path.startsWith('/') ? path : `/${path}`;
  return `${left}${right}`;
}

function sanitizeMessages(input: unknown): UpstreamMessage[] {
  if (!Array.isArray(input)) return [];

  return input
    .filter((m): m is { role?: unknown; content?: unknown } => typeof m === 'object' && m !== null)
    .filter((m) => (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
    .map((m) => ({
      role: m.role as Role,
      content: (m.content as string).trim(),
    }))
    .filter((m) => m.content.length > 0);
}

export async function POST(request: Request) {
  const baseFromEnv = process.env.AI_BACKEND_URL;
  const configuredPath = (process.env.AI_BACKEND_CHAT_PATH ?? '/chat').trim() || '/chat';

  if (!baseFromEnv?.trim()) {
    return NextResponse.json(
      {
        error:
          'AI backend is not configured. Set AI_BACKEND_URL (and optionally AI_BACKEND_CHAT_PATH).',
      },
      { status: 500 },
    );
  }

  const upstreamBase = normalizeBaseUrl(baseFromEnv);

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const message = (body as { message?: unknown })?.message;
  const messagesRaw = (body as { messages?: unknown })?.messages;

  const messages = sanitizeMessages(messagesRaw);
  const finalMessage = typeof message === 'string' ? message.trim() : '';

  const upstreamMessages: UpstreamMessage[] =
    finalMessage.length > 0 ? [...messages, { role: 'user', content: finalMessage }] : messages;

  if (upstreamMessages.length === 0) {
    return NextResponse.json({ error: 'messages (or message) is required' }, { status: 400 });
  }

  const preferredUrl = joinUrl(upstreamBase, configuredPath);
  const fallbackUrl = joinUrl(upstreamBase, '/chat');

  async function call(url: string) {
    return fetch(url, {
      method: 'POST',
      redirect: 'follow',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: upstreamMessages }),
    });
  }

  try {
    let res = await call(preferredUrl);

    // Fallback to /chat if custom path is wrong
    if (res.status === 404 && configuredPath !== '/chat') {
      res = await call(fallbackUrl);
    }

    const contentType = res.headers.get('content-type') ?? '';
    if (!contentType.includes('application/json')) {
      const text = await res.text().catch(() => '');
      return NextResponse.json(
        {
          error: 'Upstream returned non-JSON response',
          upstreamUrl: res.url,
          upstreamStatus: res.status,
          details: text.slice(0, 2000),
        },
        { status: 502 },
      );
    }

    const data = (await res.json()) as UpstreamChatResponse;

    if (!res.ok) {
      return NextResponse.json(
        {
          error: 'Upstream error',
          upstreamUrl: res.url,
          upstreamStatus: res.status,
          details: data,
        },
        { status: 502 },
      );
    }

    const reply = getStringReply(data) ?? '';

    return NextResponse.json({
      reply,
      assessmentReady: Boolean(data.assessmentReady),
      crisisDetected: Boolean(data.crisisDetected),
      raw: data,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Failed to reach AI backend',
        upstreamUrl: preferredUrl,
        details: String(error),
      },
      { status: 502 },
    );
  }
}