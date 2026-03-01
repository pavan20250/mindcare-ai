import { NextRequest, NextResponse } from 'next/server';

const SESSION_COOKIE = 'neuralcare_session';

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

export interface Appointment {
  id: string;
  userEmail: string;
  doctorId: string;
  doctorName: string;
  specialty: string;
  date: string;
  timeSlot: string;
  reason?: string;
  status: 'confirmed' | 'cancelled';
  createdAt: number;
}

// In-memory store for demo. Replace with DB in production.
export const appointmentsStore = new Map<string, Appointment[]>();

function getUserAppointments(email: string, includeCancelled = false): Appointment[] {
  const list = (appointmentsStore.get(email) ?? []).slice();
  const filtered = includeCancelled ? list : list.filter((a) => a.status !== 'cancelled');
  return filtered.sort((a, b) => {
    const d = `${a.date}T${a.timeSlot}`.localeCompare(`${b.date}T${b.timeSlot}`);
    return d !== 0 ? d : a.createdAt - b.createdAt;
  });
}

/**
 * GET /api/appointments
 * Returns the current user's appointments (upcoming first).
 */
export async function GET(request: NextRequest) {
  const user = getSession(request);
  if (!user) {
    return NextResponse.json({ error: 'Sign in required' }, { status: 401 });
  }
  const list = getUserAppointments(user.email);
  return NextResponse.json({ appointments: list });
}

/**
 * POST /api/appointments
 * Create a new appointment. Body: { doctorId, doctorName, specialty, date, timeSlot, reason? }
 */
export async function POST(request: NextRequest) {
  const user = getSession(request);
  if (!user) {
    return NextResponse.json({ error: 'Sign in required' }, { status: 401 });
  }
  try {
    const body = await request.json();
    const { doctorId, doctorName, specialty, date, timeSlot, reason } = body;
    if (!doctorId || !doctorName || !specialty || !date || !timeSlot) {
      return NextResponse.json(
        { error: 'Missing required fields: doctorId, doctorName, specialty, date, timeSlot' },
        { status: 400 }
      );
    }
    const dateStr = String(date).trim();
    const slotStr = String(timeSlot).trim();
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
      return NextResponse.json({ error: 'Invalid date format (use YYYY-MM-DD)' }, { status: 400 });
    }
    const id = `apt-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    const appointment: Appointment = {
      id,
      userEmail: user.email,
      doctorId: String(doctorId),
      doctorName: String(doctorName),
      specialty: String(specialty),
      date: dateStr,
      timeSlot: slotStr,
      reason: reason != null ? String(reason).trim() || undefined : undefined,
      status: 'confirmed',
      createdAt: Date.now(),
    };
    const list = getUserAppointments(user.email, true);
    list.push(appointment);
    appointmentsStore.set(user.email, list);
    return NextResponse.json({ appointment });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
