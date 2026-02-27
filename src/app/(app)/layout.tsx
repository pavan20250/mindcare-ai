'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { AppSidebar } from '@/components/AppSidebar';
import NeuralNetworkBg from '@/components/NeuralNetworkBg';
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
    <div className="flex min-h-svh w-full hero-gradient relative">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <NeuralNetworkBg nodeCount={60} connectionDist={160} />
      </div>
      <div className="absolute inset-0 pointer-events-none z-0" style={{
        background: 'radial-gradient(ellipse at center, transparent 40%, rgba(10, 14, 26, 0.5) 100%)',
      }} />
      <AppSidebar user={user} />
      <SidebarInset className="min-h-svh overflow-auto relative z-10">
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
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 hero-gradient relative">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <NeuralNetworkBg nodeCount={40} />
        </div>
        <div className="relative z-10 flex flex-col items-center gap-4">
          <div className="size-10 border-2 border-teal-400 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-400 text-sm font-medium">Loading…</p>
        </div>
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
