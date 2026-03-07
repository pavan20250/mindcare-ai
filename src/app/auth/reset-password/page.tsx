'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AuthField, AuthError, AuthSuccess, PasswordField, SubmitButton } from '@/components/auth/shared';
import { supabaseBrowser } from '@/lib/supabase-browser';

type State = 'loading' | 'ready' | 'success' | 'invalid_link';

export default function ResetPasswordPage() {
  const router = useRouter();
  const [state, setState] = useState<State>('loading');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const hash = window.location.hash?.slice(1);
    if (!hash) {
      setState('invalid_link');
      return;
    }
    const params = new URLSearchParams(hash);
    const accessToken = params.get('access_token');
    const refreshToken = params.get('refresh_token');
    const type = params.get('type');
    if (type !== 'recovery' || !accessToken || !refreshToken) {
      setState('invalid_link');
      return;
    }
    supabaseBrowser.auth
      .setSession({ access_token: accessToken, refresh_token: refreshToken })
      .then(() => {
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
        setState('ready');
      })
      .catch(() => setState('invalid_link'));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    setLoading(true);
    try {
      const { error: updateError } = await supabaseBrowser.auth.updateUser({ password });
      if (updateError) {
        setError(updateError.message || 'Failed to update password.');
        return;
      }
      setState('success');
      setTimeout(() => router.replace('/login'), 2000);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (state === 'loading') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0c1220] px-4">
        <div className="size-9 border-2 border-teal-500 border-t-transparent rounded-full animate-spin" />
        <p className="mt-4 text-slate-400 text-sm">Verifying link…</p>
      </div>
    );
  }

  if (state === 'invalid_link') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0c1220] px-4">
        <Card className="border-white/[0.08] bg-white/[0.04] backdrop-blur-2xl shadow-2xl max-w-[420px] w-full rounded-2xl">
          <CardHeader>
            <CardTitle className="text-white text-center">Invalid or expired link</CardTitle>
            <CardDescription className="text-slate-400 text-center">
              This reset link is invalid or has expired. Request a new one from the forgot password page.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/forgot-password">
              <Button className="w-full h-11 rounded-xl bg-teal-500 hover:bg-teal-400 text-white">
                Request new link
              </Button>
            </Link>
            <p className="mt-4 text-center text-slate-400 text-sm">
              <Link href="/login" className="text-teal-400 hover:text-teal-300">Back to sign in</Link>
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (state === 'success') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0c1220] px-4">
        <Card className="border-white/[0.08] bg-white/[0.04] backdrop-blur-2xl shadow-2xl max-w-[420px] w-full rounded-2xl">
          <CardContent className="pt-8 pb-8">
            <AuthSuccess message="Password updated. Redirecting you to sign in…" />
            <p className="mt-4 text-center text-slate-400 text-sm">
              <Link href="/login" className="text-teal-400 hover:text-teal-300">Sign in now</Link>
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0c1220] px-4">
      <div className="w-full max-w-[420px] mx-auto">
        <Card className="border-white/[0.08] bg-white/[0.04] backdrop-blur-2xl shadow-2xl rounded-2xl">
          <CardHeader className="pb-1 space-y-1">
            <div className="mx-auto mb-2 flex size-12 items-center justify-center rounded-full bg-teal-500/10 ring-1 ring-teal-500/20">
              <svg className="size-6 text-teal-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
              </svg>
            </div>
            <CardTitle className="text-[22px] font-semibold tracking-tight text-white text-center">
              Set new password
            </CardTitle>
            <CardDescription className="text-slate-400 text-[13px] text-center">
              Enter your new password below
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <AuthError message={error} />
              <PasswordField
                label="New password"
                fieldId="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={6}
              />
              <PasswordField
                label="Confirm password"
                fieldId="confirm-password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="••••••••"
                required
                minLength={6}
              />
              <SubmitButton loading={loading}>Update password</SubmitButton>
            </form>
            <p className="mt-5 text-center text-slate-400 text-sm">
              <Link href="/login" className="text-teal-400 font-medium hover:text-teal-300 transition-colors">
                Back to sign in
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
