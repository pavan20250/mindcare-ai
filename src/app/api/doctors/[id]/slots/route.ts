import { NextRequest, NextResponse } from 'next/server';
import { DOCTORS } from '../../route';

/**
 * GET /api/doctors/[id]/slots?date=YYYY-MM-DD
 * Returns available time slots for the doctor on the given date (demo: 9am–5pm, 30-min slots).
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { searchParams } = new URL(request.url);
  const dateStr = searchParams.get('date')?.trim();
  if (!dateStr || !/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    return NextResponse.json(
      { error: 'Query param date required (YYYY-MM-DD)' },
      { status: 400 }
    );
  }
  const doctor = DOCTORS.find((d) => d.id === id);
  if (!doctor) {
    return NextResponse.json({ error: 'Doctor not found' }, { status: 404 });
  }
  const date = new Date(dateStr + 'T12:00:00');
  if (Number.isNaN(date.getTime())) {
    return NextResponse.json({ error: 'Invalid date' }, { status: 400 });
  }
  const day = date.getDay();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (date < today) {
    return NextResponse.json({ slots: [] });
  }
  // Demo: 30-min slots from 9:00 to 17:00 (5pm) for Mon–Fri
  if (day === 0 || day === 6) {
    return NextResponse.json({ slots: [] });
  }
  const slots: string[] = [];
  for (let h = 9; h < 17; h++) {
    slots.push(`${String(h).padStart(2, '0')}:00`);
    slots.push(`${String(h).padStart(2, '0')}:30`);
  }
  return NextResponse.json({ date: dateStr, doctorId: id, slots });
}
