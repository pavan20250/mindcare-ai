'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import type { PageKey, Role } from '@/lib/permissions';
import { hasAccess } from '@/lib/permissions';
import { useSessionUser } from '@/components/auth/useSessionUser';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

export function ProtectedRoute({
  page,
  children,
}: {
  page: PageKey;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, loading } = useSessionUser();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      const next = pathname ? `?next=${encodeURIComponent(pathname)}` : '';
      router.replace(`/login${next}`);
      return;
    }

    const role = (user.role ?? 'user') as Role;
    if (!hasAccess(role, page)) {
      router.replace('/unauthorized');
    }
  }, [loading, page, pathname, router, user]);

  if (loading || !user) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 bg-white">
        <LoadingSpinner size="xl" />
        <p className="text-slate-400 text-sm font-medium">Loading…</p>
      </div>
    );
  }

  const role = (user.role ?? 'user') as Role;
  if (!hasAccess(role, page)) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <LoadingSpinner size="xl" />
        <p className="text-slate-400 text-sm font-medium">Redirecting…</p>
      </div>
    );
  }

  return children;
}

