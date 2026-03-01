import { NextRequest, NextResponse } from 'next/server';

const SESSION_COOKIE = 'neuralcare_session';

// In-memory store: email -> { responses, completedAt }. Replace with DB in production.
const intakeStore = new Map<string, { responses: Record<string, string>; completedAt?: number }>();

function getSession(request: NextRequest): { email: string } | null {
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  try {
    const payload = JSON.parse(Buffer.from(token, 'base64url').toString('utf8'));
    return payload?.email ? { email: payload.email } : null;
  } catch {
    return null;
  }
}

/**
 * POST /api/intake
 * Record conversational intake responses for the logged-in user.
 * Body: { responses: Record<string, string> }
 */
export async function POST(request: NextRequest) {
  const user = getSession(request);
  if (!user) {
    return NextResponse.json({ error: 'Sign in required' }, { status: 401 });
  }
  try {
    const body = await request.json();
    const responses = body.responses && typeof body.responses === 'object' ? body.responses : {};
    const completedAt = body.completed === true ? Date.now() : undefined;
    intakeStore.set(user.email, { responses, completedAt });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}

/**
 * GET /api/intake
 * Return the current user's recorded intake (if any).
 */
export async function GET(request: NextRequest) {
  const user = getSession(request);
  if (!user) {
    return NextResponse.json({ intake: null }, { status: 200 });
  }
  const stored = intakeStore.get(user.email);
  return NextResponse.json({
    intake: stored ? { responses: stored.responses, completedAt: stored.completedAt } : null,
  });
}
