import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';

// In-memory store: email -> { responses, completedAt }. Replace with DB in production.
const intakeStore = new Map<string, { responses: Record<string, string>; completedAt?: number }>();

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
