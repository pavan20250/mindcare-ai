'use client';

import Link from 'next/link';
import { Clock, Calendar } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { type Appointment, formatTime } from './Types';

export function AppointmentCard({ appointment }: { appointment: Appointment }) {
  const apptDate = new Date(appointment.date + 'T12:00:00');

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="flex">
          <div className="flex flex-col items-center justify-center w-16 shrink-0 bg-teal-500/20 border-r border-white/30 text-teal-700 py-3">
            <span className="text-[9px] font-bold uppercase tracking-wide">
              {apptDate.toLocaleDateString('en-US', { month: 'short' })}
            </span>
            <span className="text-xl font-bold leading-none mt-0.5">{apptDate.getDate()}</span>
            <span className="text-[9px] font-medium mt-0.5">
              {apptDate.toLocaleDateString('en-US', { weekday: 'short' })}
            </span>
          </div>
          <div className="flex-1 min-w-0 px-3.5 py-3 flex items-center justify-between gap-2">
            <div className="min-w-0">
              <p className="text-sm font-semibold text-slate-900 truncate">{appointment.doctorName}</p>
              {appointment.specialty && (
                <p className="text-[11px] text-teal-600 font-medium">{appointment.specialty}</p>
              )}
              <div className="flex items-center gap-1 mt-1 text-slate-500">
                <Clock className="size-3" />
                <span className="text-[11px] font-medium">{formatTime(appointment.timeSlot)}</span>
              </div>
            </div>
            <Button
              asChild
              size="sm"
              variant="outline"
              className="shrink-0 rounded-xl border-white/50 bg-white/30 text-slate-600 hover:text-teal-700 hover:bg-white/50 font-medium text-[11px] h-7 px-2.5"
            >
              <Link href="/appointments">Manage</Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function AppointmentEmpty() {
  return (
    <Card className="border-dashed">
      <CardContent className="py-5 px-4 text-center">
        <Calendar className="size-5 text-teal-500/60 mx-auto mb-2" />
        <p className="text-xs font-medium text-slate-600">No upcoming appointments</p>
        <p className="text-[11px] text-slate-400 mt-0.5 mb-3">Schedule time with a provider.</p>
        <Button
          asChild
          size="sm"
          variant="outline"
          className="rounded-xl border-white/50 bg-white/30 text-slate-600 hover:text-teal-700 hover:bg-white/50 font-medium text-[11px] h-7"
        >
          <Link href="/appointments">Browse providers</Link>
        </Button>
      </CardContent>
    </Card>
  );
}

export function AppointmentSkeleton() {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="flex">
          <div className="w-16 shrink-0 bg-white/20 py-3 flex flex-col items-center gap-1">
            <Skeleton className="h-2.5 w-7 bg-white/40" />
            <Skeleton className="h-5 w-6 bg-white/40" />
            <Skeleton className="h-2.5 w-5 bg-white/40" />
          </div>
          <div className="flex-1 p-3.5 space-y-1.5">
            <Skeleton className="h-4 w-28 bg-white/40" />
            <Skeleton className="h-3 w-20 bg-white/40" />
            <Skeleton className="h-3 w-16 bg-white/40" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}