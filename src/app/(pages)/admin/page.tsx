'use client';

import { useState, useEffect } from 'react';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

type OrgUser = {
  id: string;
  email: string | null;
  name: string;
};

type GlobalStats = {
  totalUsers: number;
  globalUsers: number;
  tenantUsers: number;
  tenants: number;
  adminUsers: number;
};

type TenantStats = {
  totalUsers: number;
  adminUsers: number;
  memberUsers: number;
  doctorCount: number;
};

type StatsResponse =
  | { scope: 'global'; stats: GlobalStats }
  | { scope: 'tenant'; tenant: string; stats: TenantStats };

export default function AdminPage() {
  const [users, setUsers] = useState<OrgUser[]>([]);
  const [stats, setStats] = useState<StatsResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const [statsRes, usersRes] = await Promise.all([
          fetch('/api/admin/stats', { credentials: 'include' }),
          fetch('/api/admin/users', { credentials: 'include' }),
        ]);

        if (statsRes.status === 403 || usersRes.status === 403) {
          if (!cancelled) {
            setError('You do not have permission to view this page.');
          }
          return;
        }

        if (!statsRes.ok) {
          throw new Error('Failed to load stats');
        }
        if (!usersRes.ok) {
          throw new Error('Failed to load users');
        }

        const statsJson = await statsRes.json();
        const usersJson = await usersRes.json();

        if (!cancelled) {
          if (statsJson?.scope && statsJson?.stats) {
            setStats(statsJson as StatsResponse);
          }
          if (usersJson?.users) {
            setUsers(usersJson.users as OrgUser[]);
          }
        }
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : 'Something went wrong');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center px-4">
        <div className="mx-auto max-w-xl rounded-xl border border-amber-200 bg-amber-50/80 p-6 text-center">
          <h1 className="text-lg font-semibold text-amber-800">Access denied</h1>
          <p className="mt-2 text-sm text-amber-700">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          {stats?.scope === 'tenant' ? 'Organization overview' : 'Global admin overview'}
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          {stats?.scope === 'tenant'
            ? 'Stats and users are scoped to this organization, based on the subdomain you are using.'
            : 'Aggregate stats across all users and organizations.'}
        </p>
      </div>

      {stats && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.scope === 'tenant' ? (
            <>
              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Users in this org
                </p>
                <p className="mt-1 text-2xl font-semibold text-slate-900">
                  {stats.stats.totalUsers}
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Admins
                </p>
                <p className="mt-1 text-2xl font-semibold text-slate-900">
                  {stats.stats.adminUsers}
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Members
                </p>
                <p className="mt-1 text-2xl font-semibold text-slate-900">
                  {stats.stats.memberUsers}
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Available doctors
                </p>
                <p className="mt-1 text-2xl font-semibold text-slate-900">
                  {stats.stats.doctorCount}
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Total users
                </p>
                <p className="mt-1 text-2xl font-semibold text-slate-900">
                  {stats.stats.totalUsers}
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Global-only users
                </p>
                <p className="mt-1 text-2xl font-semibold text-slate-900">
                  {stats.stats.globalUsers}
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Tenant users
                </p>
                <p className="mt-1 text-2xl font-semibold text-slate-900">
                  {stats.stats.tenantUsers}
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Active organizations
                </p>
                <p className="mt-1 text-2xl font-semibold text-slate-900">
                  {stats.stats.tenants}
                </p>
              </div>
            </>
          )}
        </div>
      )}

      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="text-sm font-semibold text-slate-900">
          {stats?.scope === 'tenant' ? 'Users in this organization' : 'Users'}
        </h2>
        {stats?.scope === 'global' && (
          <p className="mt-1 text-xs text-slate-500">
            User list may be scoped by tenant in future. Currently this view is intended for
            per-organization access via subdomains.
          </p>
        )}

        {users.length === 0 ? (
          <p className="mt-4 text-sm text-slate-500">No users found.</p>
        ) : (
          <div className="mt-4 overflow-hidden rounded-lg border border-slate-200">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Name
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Email
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="px-4 py-2 text-sm text-slate-800">{user.name}</td>
                    <td className="px-4 py-2 text-sm text-slate-600">
                      {user.email ?? (
                        <span className="italic text-slate-400">No email</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
