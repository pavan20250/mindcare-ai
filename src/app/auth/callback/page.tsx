'use client';

import AuthHashHandler from '@/components/auth/AuthHashHandler';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

export default function AuthCallbackPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-100">
      <AuthHashHandler />
      <div className="max-w-md w-full px-6 text-center space-y-3">
        <LoadingSpinner size="lg" className="mx-auto" />
        <h1 className="text-xl font-semibold">Verifying your email…</h1>
        <p className="text-sm text-slate-400">
          Redirecting you to your dashboard.
        </p>
      </div>
    </div>
  );
}
