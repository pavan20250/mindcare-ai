'use client';

import { useState, useEffect } from 'react';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

type OrgUser = {
  id: string;
  email: string | null;
  name: string;
};

export default function AdminPage() {
  const [users, setUsers] = useState<OrgUser[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/users', { credentials: 'include' })
      .then((res) => {
        if (res.status === 403) {
          setError('You do not have permission to view this page.');
          return null;
        }
        if (!res.ok) throw new Error('Failed to load users');
        return res.json();
      })
      .then((data) => {
        if (data?.users) setUsers(data.users);
      })
      .catch((e) => {
        setError(e instanceof Error ? e.message : 'Something went wrong');
      })
      .finally(() => setLoading(false));
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
      <div className="mx-auto max-w-2xl px-4 py-12">
        <div className="rounded-xl border border-amber-200 bg-amber-50/80 p-6 text-center">
          <h1 className="text-lg font-semibold text-amber-800">Access denied</h1>
          <p className="mt-2 text-sm text-amber-700">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-2xl font-bold text-slate-800">Organization users</h1>
      <p className="mt-1 text-sm text-slate-500">
        Admin view of all users that belong to this organization (based on the subdomain you are using).
      </p>

      {users.length === 0 ? (
        <p className="mt-6 text-sm text-slate-500">
          No users found for this organization yet.
        </p>
      ) : (
        <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
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
            <tbody className="divide-y divide-slate-100">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-4 py-2 text-sm text-slate-800">{user.name}</td>
                  <td className="px-4 py-2 text-sm text-slate-600">
                    {user.email ?? <span className="italic text-slate-400">No email</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
