'use client';

import { useEffect, useState } from 'react';
import type { Role } from '@/lib/auth';

export type SessionUser = {
  id?: string;
  email: string;
  name?: string;
  role?: Role;
  roleLabel?: string;
};

type SessionResponse =
  | { user: SessionUser }
  | { user: null; error?: string }
  | { error?: string };

export function useSessionUser() {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/auth/session', { credentials: 'include' })
      .then((r) => r.json() as Promise<SessionResponse>)
      .then((data) => {
        if (cancelled) return;
        if ('user' in data && data.user) setUser(data.user);
        else setUser(null);
      })
      .catch(() => {
        if (!cancelled) setUser(null);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { user, loading };
}

