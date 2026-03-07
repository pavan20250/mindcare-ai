'use client';

import { useState, useEffect } from 'react';

type Stats = {
  uniqueUsersWithAppointments: number;
  totalAppointments: number;
} | null;

export default function AdminPage() {
  const [stats, setStats] = useState<Stats>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/stats', { credentials: 'include' })
      .then((res) => {
        if (res.status === 403) {
          setError('You do not have permission to view this page.');
          return null;
        }
        if (!res.ok) throw new Error('Failed to load stats');
        return res.json();
      })
      .then((data) => {
        if (data?.stats) setStats(data.stats);
      })
      .catch((e) => {
        setError(e instanceof Error ? e.message : 'Something went wrong');
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <div className="size-8 border-2 border-teal-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12">
        <div className="rounded-xl border border-amber-200 bg-amber-50/80 p-6 text-center">
          <h1 className="text-lg font-semibold text-amber-800">Access denied</h1>
          <p className="mt-2 text-sm text-amber-700">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="text-2xl font-bold text-slate-800">Admin</h1>
      <p className="mt-1 text-sm text-slate-500">Overview and stats (demo data).</p>
      {stats && (
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-400">Users with appointments</p>
            <p className="mt-1 text-2xl font-semibold text-slate-800">{stats.uniqueUsersWithAppointments}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-400">Total appointments</p>
            <p className="mt-1 text-2xl font-semibold text-slate-800">{stats.totalAppointments}</p>
          </div>
        </div>
      )}
    </div>
  );
}
