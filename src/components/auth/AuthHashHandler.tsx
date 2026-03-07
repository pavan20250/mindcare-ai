'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthHashHandler() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!window.location.hash.includes('access_token=')) return;

    const params = new URLSearchParams(window.location.hash.substring(1));
    const accessToken = params.get('access_token');
    const type = params.get('type');

    if (!accessToken || type === 'recovery') return;

    const handle = async () => {
      try {
        const res = await fetch('/api/auth/supabase-login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ accessToken }),
        });

        // Clear hash so it doesn't re-trigger
        window.history.replaceState(
          null,
          '',
          window.location.pathname + window.location.search,
        );

        if (res.ok) {
          // For now, always go to dashboard; you can extend this later
          const next = type === 'signup' ? '/dashboard' : '/dashboard';
          router.replace(next);
        }
      } catch {
        // Silently fail; user can still log in manually
      }
    };

    handle();
  }, [router]);

  return null;
}

