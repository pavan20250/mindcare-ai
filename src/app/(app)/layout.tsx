'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { AppSidebar } from '@/components/AppSidebar';
import { IntakeProvider, useIntake } from '@/contexts/IntakeContext';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

const INTAKE_PATH = '/demo';
const GATED_PATHS = ['/care', '/appointments', '/resources'];

function AppLayoutInner({ user, children }: { user: { email: string }; children: React.ReactNode }) {
  const { intakeCompleted } = useIntake();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const isGated = GATED_PATHS.some((p) => pathname === p || pathname.startsWith(p + '/'));
    if (!intakeCompleted && isGated) {
      router.replace(INTAKE_PATH + '?required=1');
    }
  }, [intakeCompleted, pathname, router]);

  return (
    <div className="flex min-h-svh w-full bg-[var(--page-bg)]">
      <AppSidebar user={user} />
      <SidebarInset className="min-h-svh overflow-auto bg-[var(--page-bg)]">
        {children}
      </SidebarInset>
    </div>
  );
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [initialIntakeCompleted, setInitialIntakeCompleted] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    fetch('/api/auth/session', { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setUser(data.user);
          return fetch('/api/intake', { credentials: 'include' });
        }
        router.replace(`/login?next=${encodeURIComponent(pathname || INTAKE_PATH)}`);
        return null;
      })
      .then((res) => {
        if (res?.ok) return res.json();
        return null;
      })
      .then((data) => {
        setInitialIntakeCompleted(!!data?.intake?.completedAt);
      })
      .catch(() => router.replace(`/login?next=${encodeURIComponent(pathname || INTAKE_PATH)}`))
      .finally(() => setChecking(false));
  }, [pathname, router]);

  if (checking || !user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-[var(--page-bg)]">
        <div className="size-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-muted-foreground text-sm font-medium">Loading…</p>
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
