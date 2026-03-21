'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { AppSidebar } from '@/components/application/AppSidebar';
import { IntakeProvider } from '@/contexts/IntakeContext';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import type { Role } from '@/lib/auth';
import { getPageKeyFromPath, hasAccess, type Role as RbacRole } from '@/lib/permissions';

const DEFAULT_AUTH_REDIRECT = '/dashboard';

type SessionUser = {
  email: string;
  name?: string;
  id?: string;
  role?: Role;
  roleLabel?: string;
};

function AppLayoutInner({ user, children }: { user: SessionUser; children: React.ReactNode }) {
  return (
    <div className="flex min-h-svh w-full bg-[#f8fafb]">
      <AppSidebar user={user} />
      <SidebarInset className="min-h-svh overflow-auto">
        {children}
      </SidebarInset>
    </div>
  );
}

export default function PagesLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<SessionUser | null>(null);
  const [initialIntakeCompleted, setInitialIntakeCompleted] = useState(false);
  const [checking, setChecking] = useState(true);
  const [rbacRedirecting, setRbacRedirecting] = useState(false);

  useEffect(() => {
    fetch('/api/auth/session', { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setUser(data.user);
          return fetch('/api/intake', { credentials: 'include' });
        }
        router.replace(`/login?next=${encodeURIComponent(pathname || DEFAULT_AUTH_REDIRECT)}`);
        return null;
      })
      .then((res) => {
        if (res?.ok) return res.json();
        return null;
      })
      .then((data) => {
        setInitialIntakeCompleted(!!data?.intake?.completedAt);
      })
      .catch(() => router.replace(`/login?next=${encodeURIComponent(pathname || DEFAULT_AUTH_REDIRECT)}`))
      .finally(() => setChecking(false));
  }, [pathname, router]);

  useEffect(() => {
    if (checking || !user) return;
    const pageKey = getPageKeyFromPath(pathname || '');
    if (!pageKey) return;
    const role = (user.role ?? 'user') as RbacRole;
    if (!hasAccess(role, pageKey)) {
      setRbacRedirecting(true);
      router.replace('/unauthorized');
    } else {
      setRbacRedirecting(false);
    }
  }, [checking, pathname, router, user]);

  if (checking || !user || rbacRedirecting) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-[#f8fafb]">
        <LoadingSpinner size="xl" />
        <p className="text-slate-400 text-sm font-medium">Loading…</p>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <IntakeProvider initialCompleted={initialIntakeCompleted}>
        <AppLayoutInner user={user}>{children}</AppLayoutInner>
      </IntakeProvider>
    </SidebarProvider>
  );
}