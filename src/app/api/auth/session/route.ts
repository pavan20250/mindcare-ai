import { NextRequest, NextResponse } from 'next/server';

const SESSION_COOKIE = 'neuralcare_session';

export async function GET(request: NextRequest) {
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  if (!token) {
    return NextResponse.json({ user: null }, { status: 200 });
  }
  try {
    const payload = JSON.parse(
      Buffer.from(token, 'base64url').toString('utf8')
    );
    if (!payload?.email) {
      return NextResponse.json({ user: null }, { status: 200 });
    }
    return NextResponse.json({ user: { email: payload.email } });
  } catch {
    return NextResponse.json({ user: null }, { status: 200 });
  }
}
