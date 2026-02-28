'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  credentials: string;
  bio: string;
  availability: string;
}

export interface Appointment {
  id: string;
  doctorId: string;
  doctorName: string;
  specialty: string;
  date: string;
  timeSlot: string;
  reason?: string;
  status?: 'confirmed' | 'cancelled';
  createdAt: number;
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + 'T12:00:00');
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
}

function formatTime(slot: string): string {
  const [h, m] = slot.split(':').map(Number);
  const period = h >= 12 ? 'PM' : 'AM';
  const h12 = h % 12 || 12;
  return `${h12}:${String(m).padStart(2, '0')} ${period}`;
}

function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export function AppointmentsView() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [appointmentsLoading, setAppointmentsLoading] = useState(true);
  const [bookingDoctor, setBookingDoctor] = useState<Doctor | null>(null);
  const [bookingDate, setBookingDate] = useState('');
  const [slots, setSlots] = useState<string[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [reason, setReason] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState<Appointment | null>(null);
  const [specialtyFilter, setSpecialtyFilter] = useState(() => {
    if (typeof window === 'undefined') return '';
    return new URLSearchParams(window.location.search).get('specialty') ?? '';
  });
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  const fetchAppointments = useCallback(() => {
    setAppointmentsLoading(true);
    fetch('/api/appointments', { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => setAppointments(data.appointments ?? []))
      .catch(() => setAppointments([]))
      .finally(() => setAppointmentsLoading(false));
  }, []);

  useEffect(() => {
    const url = specialtyFilter
      ? `/api/doctors?specialty=${encodeURIComponent(specialtyFilter)}`
      : '/api/doctors';
    setLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((data) => setDoctors(data.doctors ?? []))
      .catch(() => setDoctors([]))
      .finally(() => setLoading(false));
  }, [specialtyFilter]);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  useEffect(() => {
    if (!bookingDoctor?.id || !bookingDate) {
      setSlots([]);
      setSelectedSlot('');
      return;
    }
    setSlotsLoading(true);
    setSelectedSlot('');
    fetch(`/api/doctors/${bookingDoctor.id}/slots?date=${encodeURIComponent(bookingDate)}`, { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => setSlots(data.slots ?? []))
      .catch(() => setSlots([]))
      .finally(() => setSlotsLoading(false));
  }, [bookingDoctor?.id, bookingDate]);

  const openBooking = (doctor: Doctor) => {
    setBookingDoctor(doctor);
    setBookingDate('');
    setSlots([]);
    setSelectedSlot('');
    setReason('');
    setBookingSuccess(null);
  };

  const closeBooking = () => {
    setBookingDoctor(null);
    setBookingDate('');
    setSelectedSlot('');
    setReason('');
    setBookingSuccess(null);
  };

  const handleConfirmBooking = async () => {
    if (!bookingDoctor || !bookingDate || !selectedSlot) return;
    setSubmitting(true);
    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          doctorId: bookingDoctor.id,
          doctorName: bookingDoctor.name,
          specialty: bookingDoctor.specialty,
          date: bookingDate,
          timeSlot: selectedSlot,
          reason: reason.trim() || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Booking failed');
      setBookingSuccess(data.appointment);
      fetchAppointments();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Booking failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const minDate = (() => {
    const d = new Date();
    return d.toISOString().slice(0, 10);
  })();

  const isUpcoming = (dateStr: string) => dateStr >= minDate;

  const handleCancelAppointment = async (id: string) => {
    setCancellingId(id);
    try {
      const res = await fetch(`/api/appointments/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ status: 'cancelled' }),
      });
      if (!res.ok) throw new Error((await res.json()).error || 'Failed to cancel');
      fetchAppointments();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Could not cancel. Try again.');
    } finally {
      setCancellingId(null);
    }
  };

  const specialtyOptions = [
    { value: '', label: 'All providers' },
    { value: 'psychologist', label: 'Psychologist' },
    { value: 'psychiatrist', label: 'Psychiatrist' },
    { value: 'social worker', label: 'LCSW / Social Worker' },
  ];

  const upcomingAppointments = appointments.filter((a) => isUpcoming(a.date));

  return (
    <div className="min-h-full bg-[#f8fafb]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="mb-5">
          <h1 className="text-xl font-bold text-slate-900">Appointments</h1>
          <p className="text-slate-500 text-sm mt-0.5">
            View your upcoming sessions and book with a provider that fits your needs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <section className="lg:col-span-1 order-2 lg:order-1">
            <Card className="h-full border-slate-200 bg-white shadow-sm">
              <CardHeader className="pb-3">
                <h2 className="text-sm font-semibold text-slate-800">Your appointments</h2>
                <p className="text-xs text-slate-400">Upcoming and recent</p>
              </CardHeader>
              <CardContent className="pt-0">
                {appointmentsLoading ? (
                  <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex gap-3 p-3 rounded-lg bg-slate-50">
                        <Skeleton className="h-10 w-10 rounded-lg shrink-0 bg-slate-100" />
                        <div className="flex-1 space-y-2">
                          <Skeleton className="h-4 w-3/4 bg-slate-100" />
                          <Skeleton className="h-3 w-1/2 bg-slate-100" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : upcomingAppointments.length === 0 ? (
                  <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50/50 p-6 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400 mb-3">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <p className="text-sm font-medium text-slate-600">No upcoming appointments</p>
                    <p className="text-xs text-slate-400 mt-1">Book one with a provider below.</p>
                  </div>
                ) : (
                  <ul className="space-y-2">
                    {upcomingAppointments.map((apt) => (
                      <li key={apt.id}>
                        <Card className="overflow-hidden border-slate-200 bg-white transition-colors hover:bg-slate-50/50">
                          <CardContent className="p-0">
                            <div className="flex">
                              <div className="flex flex-col items-center justify-center w-14 shrink-0 bg-teal-50 text-teal-700 py-2 px-2 text-center">
                                <span className="text-[10px] font-semibold uppercase leading-tight">
                                  {new Date(apt.date + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'short' })}
                                </span>
                                <span className="text-sm font-bold leading-tight">
                                  {new Date(apt.date + 'T12:00:00').toLocaleDateString('en-US', { day: 'numeric', month: 'short' }).replace(' ', '\n')}
                                </span>
                              </div>
                              <div className="flex-1 min-w-0 p-3">
                                <p className="font-semibold text-slate-800 text-sm truncate">{apt.doctorName}</p>
                                <p className="text-teal-600 text-xs font-medium">{apt.specialty}</p>
                                <p className="text-slate-400 text-xs mt-1">{formatTime(apt.timeSlot)}</p>
                                {apt.reason && (
                                  <p className="text-slate-400 text-xs mt-1 truncate" title={apt.reason}>
                                    {apt.reason}
                                  </p>
                                )}
                                <div className="flex items-center gap-2 mt-2">
                                  <Badge variant="secondary" className="text-[10px] font-semibold text-teal-700 bg-teal-50 border border-teal-200">
                                    Confirmed
                                  </Badge>
                                  {isUpcoming(apt.date) && (
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      size="sm"
                                      className="h-6 text-xs text-slate-400 hover:text-red-600 hover:bg-red-50 px-1"
                                      onClick={() => handleCancelAppointment(apt.id)}
                                      disabled={cancellingId === apt.id}
                                    >
                                      {cancellingId === apt.id ? 'Cancelling…' : 'Cancel'}
                                    </Button>
                                  )}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          </section>

          <section className="lg:col-span-2 order-1 lg:order-2">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div>
                <h2 className="text-sm font-semibold text-slate-800">Book a new appointment</h2>
                <p className="text-xs text-slate-400 mt-0.5">Select a provider and choose a time</p>
              </div>
              <Select value={specialtyFilter || 'all'} onValueChange={(v) => setSpecialtyFilter(v === 'all' ? '' : v)}>
                <SelectTrigger className="w-[180px] h-9 text-sm border-slate-200 bg-white text-slate-600">
                  <SelectValue placeholder="Filter by specialty" />
                </SelectTrigger>
                <SelectContent className="border-slate-200 bg-white text-slate-600">
                  {specialtyOptions.map((opt) => (
                    <SelectItem key={opt.value || 'all'} value={opt.value || 'all'}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {loading ? (
              <div className="grid gap-4 sm:grid-cols-2">
                {[1, 2, 3, 4].map((i) => (
                  <Card key={i} className="overflow-hidden border-slate-200 bg-white">
                    <CardContent className="p-5">
                      <div className="flex gap-4">
                        <Skeleton className="h-14 w-14 rounded-xl shrink-0 bg-slate-100" />
                        <div className="flex-1 space-y-2">
                          <Skeleton className="h-5 w-32 bg-slate-100" />
                          <Skeleton className="h-4 w-24 bg-slate-100" />
                          <Skeleton className="h-12 w-full mt-2 bg-slate-100" />
                          <Skeleton className="h-9 w-28 mt-3 bg-slate-100" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : doctors.length === 0 ? (
              <Card className="border-dashed border-slate-200 bg-slate-50/50">
                <CardContent className="py-8 text-center">
                  <p className="text-slate-500 text-sm mb-4">No providers match this filter.</p>
                  <Button variant="outline" size="sm" asChild className="border-slate-200 text-slate-600 hover:bg-slate-50">
                    <Link href="/appointments">Show all providers</Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <ul className="grid gap-4 sm:grid-cols-2">
                {doctors.map((doctor) => (
                  <li key={doctor.id}>
                    <Card className="group h-full overflow-hidden border-slate-200 bg-white shadow-sm transition-all hover:shadow-md hover:shadow-teal-500/5 hover:border-teal-200">
                      <CardContent className="p-0">
                        <div className="flex">
                          <div className="flex flex-col justify-center w-1.5 shrink-0 rounded-l-md bg-teal-100 group-hover:bg-teal-200 transition-colors" />
                          <div className="flex-1 min-w-0 p-4 sm:p-5">
                            <div className="flex gap-3 sm:gap-4">
                              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-50 border border-teal-100 text-teal-700 font-semibold text-sm">
                                {getInitials(doctor.name)}
                              </div>
                              <div className="min-w-0 flex-1">
                                <h3 className="font-semibold text-slate-800">{doctor.name}</h3>
                                <p className="text-teal-600 text-sm font-medium">{doctor.specialty}</p>
                                <p className="text-slate-400 text-xs mt-0.5">{doctor.credentials}</p>
                              </div>
                            </div>
                            <p className="text-slate-500 text-sm mt-3 line-clamp-2 leading-snug">{doctor.bio}</p>
                            <p className="text-slate-400 text-xs mt-2 flex items-center gap-1.5">
                              <span className="inline-block size-2 rounded-full bg-emerald-400" />
                              {doctor.availability}
                            </p>
                            <Button
                              onClick={() => openBooking(doctor)}
                              size="sm"
                              className="mt-4 w-full sm:w-auto bg-teal-600 hover:bg-teal-700 text-white border-0"
                            >
                              Book appointment
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>

        <div className="mt-6 flex justify-center">
          <Button variant="ghost" size="sm" asChild className="text-slate-400 hover:text-teal-600 hover:bg-teal-50">
            <Link href="/dashboard">← Back to dashboard</Link>
          </Button>
        </div>
      </div>

      <Dialog open={!!bookingDoctor} onOpenChange={(open) => !open && closeBooking()}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto sm:rounded-2xl border-slate-200 bg-white text-slate-800 shadow-xl">
          {bookingDoctor &&
            (bookingSuccess ? (
              <>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2 text-slate-900">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    Appointment confirmed
                  </DialogTitle>
                </DialogHeader>
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm">
                  <p className="font-semibold text-emerald-800">{bookingSuccess.doctorName}</p>
                  <p className="text-emerald-700">{bookingSuccess.specialty}</p>
                  <p className="mt-2 text-emerald-700">
                    {formatDate(bookingSuccess.date)} at {formatTime(bookingSuccess.timeSlot)}
                  </p>
                  {bookingSuccess.reason && (
                    <p className="mt-1 text-emerald-600">Reason: {bookingSuccess.reason}</p>
                  )}
                  <p className="mt-2 text-xs text-emerald-500">A confirmation has been sent to your email.</p>
                </div>
                <DialogFooter className="gap-2 sm:gap-0">
                  <Button variant="outline" onClick={closeBooking} className="flex-1 border-slate-200 text-slate-600 hover:bg-slate-50">
                    Done
                  </Button>
                  <Button
                    className="flex-1 bg-teal-600 hover:bg-teal-700 text-white border-0"
                    onClick={() => {
                      setBookingSuccess(null);
                      setBookingDate('');
                      setSelectedSlot('');
                      setReason('');
                    }}
                  >
                    Book another
                  </Button>
                </DialogFooter>
              </>
            ) : (
              <>
                <DialogHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal-50 border border-teal-100 text-teal-700 font-semibold text-sm">
                      {getInitials(bookingDoctor.name)}
                    </div>
                    <div>
                      <DialogTitle className="text-slate-900">{bookingDoctor.name}</DialogTitle>
                      <p className="text-teal-600 text-sm font-medium">{bookingDoctor.specialty}</p>
                    </div>
                  </div>
                </DialogHeader>
                <Separator className="my-1 bg-slate-100" />
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label className="text-sm text-slate-700 font-medium">Date</Label>
                    <Input
                      type="date"
                      min={minDate}
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      className="h-10 border-slate-200 bg-white text-slate-800"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm text-slate-700 font-medium">Time</Label>
                    {slotsLoading ? (
                      <div className="flex items-center gap-2 text-slate-400 text-sm">
                        <div className="size-4 border-2 border-teal-500 border-t-transparent rounded-full animate-spin" />
                        Loading slots…
                      </div>
                    ) : !bookingDate ? (
                      <p className="text-slate-400 text-sm">Select a date first.</p>
                    ) : slots.length === 0 ? (
                      <p className="text-slate-400 text-sm">No slots available on this date.</p>
                    ) : (
                      <Select value={selectedSlot} onValueChange={setSelectedSlot}>
                        <SelectTrigger className="h-10 w-full border-slate-200 bg-white text-slate-700">
                          <SelectValue placeholder="Choose a time" />
                        </SelectTrigger>
                        <SelectContent className="border-slate-200 bg-white text-slate-700">
                          {slots.map((slot) => (
                            <SelectItem key={slot} value={slot}>
                              {formatTime(slot)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm text-slate-700 font-medium">Reason for visit (optional)</Label>
                    <Textarea
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      placeholder="e.g. Follow-up from intake, depression screening"
                      rows={2}
                      className="resize-none border-slate-200 bg-white text-slate-800 placeholder:text-slate-400"
                    />
                  </div>
                </div>
                <DialogFooter className="gap-2 sm:gap-0">
                  <Button variant="outline" onClick={closeBooking} className="border-slate-200 text-slate-600 hover:bg-slate-50">
                    Cancel
                  </Button>
                  <Button onClick={handleConfirmBooking} disabled={!selectedSlot || submitting} className="bg-teal-600 hover:bg-teal-700 text-white border-0">
                    {submitting ? (
                      <>
                        <span className="size-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Booking…
                      </>
                    ) : (
                      'Confirm booking'
                    )}
                  </Button>
                </DialogFooter>
              </>
            ))}
        </DialogContent>
      </Dialog>
    </div>
  );
}
