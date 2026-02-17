'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  credentials: string;
  bio: string;
  availability: string;
}

interface Appointment {
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

export default function AppointmentsPage() {
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

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <header className="mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1">Book an appointment</h1>
        <p className="text-slate-600 text-sm">
          Choose a provider, pick a date and time, and add a reason for your visit.
        </p>
      </header>

      <section className="mb-8">
        <h2 className="text-sm font-semibold text-slate-700 uppercase tracking-wide mb-3">My appointments</h2>
        {appointmentsLoading ? (
          <div className="section-bg rounded-xl border border-slate-200 p-4 flex justify-center">
            <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : appointments.length === 0 ? (
          <div className="section-bg rounded-xl border border-slate-200 p-4 text-center">
            <p className="text-slate-500 text-sm">No upcoming appointments.</p>
          </div>
        ) : (
          <ul className="space-y-2">
            {appointments.map((apt) => (
              <li
                key={apt.id}
                className="section-bg rounded-xl border border-slate-200 p-4 flex flex-wrap items-center justify-between gap-2"
              >
                <div>
                  <p className="font-medium text-slate-900 text-sm">{apt.doctorName}</p>
                  <p className="text-indigo-600 text-xs">{apt.specialty}</p>
                  <p className="text-slate-600 text-sm mt-1">
                    {formatDate(apt.date)} at {formatTime(apt.timeSlot)}
                  </p>
                  {apt.reason && (
                    <p className="text-slate-500 text-xs mt-1">Reason: {apt.reason}</p>
                  )}
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="inline-flex items-center gap-1 text-xs text-emerald-700 bg-emerald-50 px-2 py-1 rounded border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Confirmed
                  </span>
                  {isUpcoming(apt.date) && (
                    <button
                      type="button"
                      onClick={() => handleCancelAppointment(apt.id)}
                      disabled={cancellingId === apt.id}
                      className="text-xs text-slate-500 hover:text-red-600 disabled:opacity-50"
                    >
                      {cancellingId === apt.id ? 'Cancelling…' : 'Cancel'}
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <h2 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">Choose a provider</h2>
          <select
            value={specialtyFilter}
            onChange={(e) => setSpecialtyFilter(e.target.value)}
            className="text-sm border border-slate-300 rounded-lg px-3 py-1.5 text-slate-700 bg-white"
          >
            {specialtyOptions.map((opt) => (
              <option key={opt.value || 'all'} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : doctors.length === 0 ? (
          <div className="section-bg rounded-xl border border-slate-200 p-6 text-center">
            <p className="text-slate-600 text-sm mb-4">No doctors available for this criteria.</p>
            <Link href="/appointments" className="text-indigo-600 text-sm font-medium hover:underline">
              View all doctors
            </Link>
          </div>
        ) : (
          <ul className="space-y-4">
            {doctors.map((doctor) => (
              <li
                key={doctor.id}
                className="section-bg rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:border-slate-300 transition-colors"
              >
                <div className="p-4 sm:p-5">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="font-semibold text-slate-900 text-base">{doctor.name}</h3>
                      <p className="text-indigo-600 text-sm font-medium">{doctor.specialty}</p>
                      <p className="text-slate-500 text-xs mt-0.5">{doctor.credentials}</p>
                      <p className="text-slate-600 text-sm mt-2 leading-snug">{doctor.bio}</p>
                      <p className="text-slate-500 text-xs mt-2 flex items-center gap-1">
                        <span className="inline-block w-3 h-3 rounded-full bg-emerald-400" />
                        {doctor.availability}
                      </p>
                    </div>
                    <div className="shrink-0">
                      <button
                        type="button"
                        onClick={() => openBooking(doctor)}
                        className="btn-primary text-sm py-2 px-4 whitespace-nowrap"
                      >
                        Book appointment
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <div className="mt-6 flex justify-center">
        <Link href="/demo" className="text-slate-500 text-sm hover:text-indigo-600">
          ← Back to demo
        </Link>
      </div>

      {bookingDoctor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={closeBooking}>
          <div
            className="section-bg rounded-xl border border-slate-200 shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto p-5"
            onClick={(e) => e.stopPropagation()}
          >
            {bookingSuccess ? (
              <>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Appointment confirmed</h3>
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 text-sm text-emerald-800">
                  <p className="font-medium">{bookingSuccess.doctorName}</p>
                  <p className="text-emerald-700">{bookingSuccess.specialty}</p>
                  <p className="mt-2">
                    {formatDate(bookingSuccess.date)} at {formatTime(bookingSuccess.timeSlot)}
                  </p>
                  {bookingSuccess.reason && <p className="mt-1">Reason: {bookingSuccess.reason}</p>}
                  <p className="mt-2 text-xs">A confirmation has been sent to your email.</p>
                </div>
                <div className="mt-4 flex gap-2">
                  <button type="button" onClick={closeBooking} className="btn-primary flex-1 text-sm py-2">
                    Done
                  </button>
                  <button
                    type="button"
                    onClick={() => { setBookingSuccess(null); setBookingDate(''); setSelectedSlot(''); setReason(''); }}
                    className="btn-secondary flex-1 text-sm py-2"
                  >
                    Book another
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">{bookingDoctor.name}</h3>
                    <p className="text-indigo-600 text-sm">{bookingDoctor.specialty}</p>
                  </div>
                  <button
                    type="button"
                    onClick={closeBooking}
                    className="text-slate-400 hover:text-slate-600 p-1"
                    aria-label="Close"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <label className="block text-sm font-medium text-slate-700 mb-1">Date</label>
                <input
                  type="date"
                  min={minDate}
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 text-sm mb-4"
                />

                <label className="block text-sm font-medium text-slate-700 mb-1">Time</label>
                {slotsLoading ? (
                  <p className="text-slate-500 text-sm mb-4">Loading slots…</p>
                ) : !bookingDate ? (
                  <p className="text-slate-500 text-sm mb-4">Select a date first.</p>
                ) : slots.length === 0 ? (
                  <p className="text-slate-500 text-sm mb-4">No slots available on this date.</p>
                ) : (
                  <select
                    value={selectedSlot}
                    onChange={(e) => setSelectedSlot(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 text-sm mb-4"
                  >
                    <option value="">Choose a time</option>
                    {slots.map((slot) => (
                      <option key={slot} value={slot}>
                        {formatTime(slot)}
                      </option>
                    ))}
                  </select>
                )}

                <label className="block text-sm font-medium text-slate-700 mb-1">Reason for visit (optional)</label>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="e.g. Follow-up from intake, depression screening"
                  rows={2}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 text-sm resize-none mb-4"
                />

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={closeBooking}
                    className="btn-secondary flex-1 text-sm py-2"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleConfirmBooking}
                    disabled={!selectedSlot || submitting}
                    className="btn-primary flex-1 text-sm py-2 disabled:opacity-50 disabled:pointer-events-none"
                  >
                    {submitting ? 'Booking…' : 'Confirm booking'}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
