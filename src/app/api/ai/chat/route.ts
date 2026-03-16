import { NextResponse } from 'next/server';

type UpstreamChatResponse =
  | { reply: string }
  | { message: string }
  | { text: string }
  | { output: string }
  | { content: string }
  | { choices: Array<{ message?: { content?: string }; text?: string }> };

function getStringReply(payload: UpstreamChatResponse): string | null {
  if (typeof (payload as { reply?: unknown }).reply === 'string') return (payload as { reply: string }).reply;
  if (typeof (payload as { message?: unknown }).message === 'string') return (payload as { message: string }).message;
  if (typeof (payload as { text?: unknown }).text === 'string') return (payload as { text: string }).text;
  if (typeof (payload as { output?: unknown }).output === 'string') return (payload as { output: string }).output;
  if (typeof (payload as { content?: unknown }).content === 'string') return (payload as { content: string }).content;

  const choices = (payload as { choices?: unknown }).choices;
  if (Array.isArray(choices) && choices.length) {
    const first = choices[0] as { message?: { content?: string }; text?: string };
    if (typeof first?.message?.content === 'string') return first.message.content;
    if (typeof first?.text === 'string') return first.text;
  }

  return null;
}

export async function POST(request: Request) {
  let upstreamBase = process.env.AI_BACKEND_URL?.trim();
  const upstreamPath = (process.env.AI_BACKEND_CHAT_PATH ?? '/chat').trim() || '/chat';

  if (!upstreamBase) {
    return NextResponse.json(
      {
        error:
          'AI backend is not configured. Set AI_BACKEND_URL (and optionally AI_BACKEND_CHAT_PATH).',
      },
      { status: 500 },
    );
  }

  // Normalize base URL: if missing protocol, default to https://
  if (!/^https?:\/\//i.test(upstreamBase)) {
    upstreamBase = `https://${upstreamBase.replace(/^\/+/, '')}`;
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const message = (body as { message?: unknown }).message;
  const messagesRaw = (body as { messages?: unknown }).messages;

  const messages =
    Array.isArray(messagesRaw) && messagesRaw.every((m) => typeof m === 'object' && m !== null)
      ? (messagesRaw as Array<{ role?: unknown; content?: unknown }>)
          .filter((m) => (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
          .map((m) => ({ role: m.role as 'user' | 'assistant', content: (m.content as string).trim() }))
          .filter((m) => m.content.length > 0)
      : [];

  const finalMessage = typeof message === 'string' ? message.trim() : '';
  const upstreamMessages =
    finalMessage.length > 0 ? [...messages, { role: 'user' as const, content: finalMessage }] : messages;

  if (upstreamMessages.length === 0) {
    return NextResponse.json({ error: 'messages (or message) is required' }, { status: 400 });
  }

  const upstreamUrl = new URL(
    upstreamPath,
    upstreamBase.endsWith('/') ? upstreamBase : upstreamBase + '/',
  );

  try {
    async function call(url: string) {
      return fetch(url, {
        method: 'POST',
        redirect: 'follow',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: upstreamMessages,
        }),
      });
    }

    let res = await call(upstreamUrl.toString());
    // If env points to a wrong path, fallback to FastAPI default `/chat`.
    if (res.status === 404 && upstreamPath !== '/chat') {
      const fallbackUrl = new URL(
        '/chat',
        upstreamBase.endsWith('/') ? upstreamBase : upstreamBase + '/',
      ).toString();
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
    return NextResponse.json({ reply, raw: data });
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Failed to reach AI backend',
        upstreamUrl: upstreamUrl.toString(),
        details: String(error),
      },
      { status: 502 },
    );
  }
}

