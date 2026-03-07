import { NextRequest, NextResponse } from 'next/server';
import { requireRoleDb } from '@/lib/auth';
import { appointmentsStore } from '@/app/api/appointments/route';

/**
 * GET /api/admin/stats
 * Returns basic stats. Admin role required.
 */
export async function GET(request: NextRequest) {
  const sessionOrRes = await requireRoleDb(request, ['admin']);
  if (sessionOrRes instanceof NextResponse) {
    return sessionOrRes;
  }
  let totalAppointments = 0;
  let uniqueUsers = 0;
  appointmentsStore.forEach((list) => {
    uniqueUsers += 1;
    totalAppointments += list.length;
  });
  return NextResponse.json({
    stats: {
      uniqueUsersWithAppointments: uniqueUsers,
      totalAppointments,
    },
  });
}
