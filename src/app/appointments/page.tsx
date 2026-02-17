'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  credentials: string;
  bio: string;
  availability: string;
}

export default function AppointmentsPage() {
  const router = useRouter();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [authChecking, setAuthChecking] = useState(true);
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [bookingFor, setBookingFor] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/auth/session', { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setUser(data.user);
        } else {
          const path = typeof window !== 'undefined' ? window.location.pathname + window.location.search : '/appointments';
          router.replace(`/login?next=${encodeURIComponent(path)}`);
          return;
        }
      })
      .catch(() => router.replace(`/login?next=${encodeURIComponent('/appointments')}`))
      .finally(() => setAuthChecking(false));
  }, [router]);

  useEffect(() => {
    if (!user) return;
    const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
    const specialty = params?.get('specialty') ?? '';
    const url = specialty ? `/api/doctors?specialty=${encodeURIComponent(specialty)}` : '/api/doctors';
    fetch(url)
      .then((res) => res.json())
      .then((data) => setDoctors(data.doctors ?? []))
      .catch(() => setDoctors([]))
      .finally(() => setLoading(false));
  }, [user]);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
    setUser(null);
    router.replace('/login?next=' + encodeURIComponent('/appointments'));
    router.refresh();
  };

  if (authChecking || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <nav className="nav-glass">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14">
            <Link href="/" className="text-xl sm:text-2xl font-bold gradient-text">
              MindCare AI
            </Link>
            <div className="flex items-center gap-3">
              <span className="text-slate-500 text-sm truncate max-w-[120px] sm:max-w-[180px]" title={user.email}>
                {user.email}
              </span>
              <button
                type="button"
                onClick={handleLogout}
                className="text-sm text-slate-600 hover:text-indigo-600"
              >
                Sign out
              </button>
              <Link href="/demo" className="text-sm text-slate-600 hover:text-indigo-600">
                Demo
              </Link>
              <Link href="/" className="text-sm text-slate-600 hover:text-indigo-600">
                Home
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <header className="mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mb-1">Book an appointment</h1>
          <p className="text-slate-600 text-sm">
            Choose a provider to schedule a consultation. Recommended for you based on your assessment.
          </p>
        </header>

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
                      <h2 className="font-semibold text-slate-900 text-base">{doctor.name}</h2>
                      <p className="text-indigo-600 text-sm font-medium">{doctor.specialty}</p>
                      <p className="text-slate-500 text-xs mt-0.5">{doctor.credentials}</p>
                      <p className="text-slate-600 text-sm mt-2 leading-snug">{doctor.bio}</p>
                      <p className="text-slate-500 text-xs mt-2 flex items-center gap-1">
                        <span className="inline-block w-3 h-3 rounded-full bg-emerald-400" />
                        {doctor.availability}
                      </p>
                    </div>
                    <div className="shrink-0">
                      {bookingFor === doctor.id ? (
                        <div className="text-center py-2 px-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                          <p className="text-emerald-800 text-xs font-medium">Request sent</p>
                          <p className="text-emerald-600 text-xs">We’ll confirm via email</p>
                        </div>
                      ) : (
                        <button
                          onClick={() => setBookingFor(doctor.id)}
                          className="btn-primary text-sm py-2 px-4 whitespace-nowrap"
                        >
                          Book appointment
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-6 flex justify-center">
          <Link href="/demo" className="text-slate-500 text-sm hover:text-indigo-600">
            ← Back to demo
          </Link>
        </div>
      </div>
    </div>
  );
}
