import { NextResponse } from 'next/server';

const SESSION_COOKIE = 'mindcare_session';
const MAX_AGE = 60 * 60 * 24; // 24 hours

const DEMO_EMAIL = 'care@neuralforge.com';
const DEMO_PASSWORD = 'care@123';

function validateCredentials(email: string, password: string): boolean {
  return email === DEMO_EMAIL && password === DEMO_PASSWORD;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = body.email?.trim() ?? '';
    const password = body.password ?? '';

    if (!validateCredentials(email, password)) {
      return NextResponse.json(
        { error: 'Invalid email or password.' },
        { status: 401 }
      );
    }

    // Simple session payload (in production use signed/encrypted token)
    const payload = JSON.stringify({ email, at: Date.now() });
    const value = Buffer.from(payload).toString('base64url');

    const res = NextResponse.json({ success: true, user: { email } });
    res.cookies.set(SESSION_COOKIE, value, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: MAX_AGE,
      path: '/',
    });
    return res;
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
