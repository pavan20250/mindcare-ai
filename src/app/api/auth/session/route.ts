import { NextRequest, NextResponse } from 'next/server';
import { getSession, getRoleLabel } from '@/lib/auth';
import { getRoleForUserId } from '@/lib/roles';

export async function GET(request: NextRequest) {
  const session = getSession(request);
  if (!session) {
    return NextResponse.json({ user: null }, { status: 200 });
  }
  // Use DB as source of truth for role so UI updates without re-login
  const role = session.id ? await getRoleForUserId(session.id) : session.role;
  const fallbackName = session.email.split('@')[0];
  return NextResponse.json({
    user: {
      id: session.id,
      email: session.email,
      name: session.name || fallbackName,
      role,
      roleLabel: getRoleLabel(role),
    },
  });
}
