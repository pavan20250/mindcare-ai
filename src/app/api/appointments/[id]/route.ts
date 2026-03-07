import { NextRequest, NextResponse } from 'next/server';
import { appointmentsStore, type Appointment } from '../route';
import { getSession } from '@/lib/auth';

function getRawList(email: string): Appointment[] {
  return (appointmentsStore.get(email) ?? []).slice();
}

/**
 * PATCH /api/appointments/[id]
 * Cancel an appointment. Body: { status: 'cancelled' }
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = getSession(request);
  if (!user) {
    return NextResponse.json({ error: 'Sign in required' }, { status: 401 });
  }
  const { id } = await params;
  try {
    const body = await request.json();
    if (body.status !== 'cancelled') {
      return NextResponse.json({ error: 'Only status: "cancelled" is supported' }, { status: 400 });
    }
    const list = getRawList(user.email);
    const index = list.findIndex((a) => a.id === id);
    if (index === -1) {
      return NextResponse.json({ error: 'Appointment not found' }, { status: 404 });
    }
    list[index] = { ...list[index], status: 'cancelled' as const };
    appointmentsStore.set(user.email, list);
    return NextResponse.json({ appointment: list[index] });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
