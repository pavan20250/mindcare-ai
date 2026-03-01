'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AuthField, AuthError, AuthSuccess, SubmitButton } from './shared';

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Something went wrong.');
        return;
      }
      setSuccess(true);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[420px] mx-auto px-4">
      <Card className="border-white/[0.08] bg-white/[0.04] backdrop-blur-2xl shadow-2xl shadow-black/30 rounded-2xl">
        <CardHeader className="pb-1 space-y-1">
          <div className="mx-auto mb-2 flex size-12 items-center justify-center rounded-full bg-teal-500/10 ring-1 ring-teal-500/20">
            <svg className="size-6 text-teal-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
            </svg>
          </div>
          <CardTitle className="text-[22px] font-semibold tracking-tight text-white text-center">
            Reset password
          </CardTitle>
          <CardDescription className="text-slate-400 text-[13px] text-center">
            Enter your email and we&apos;ll send you a reset link
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-4">
          {success ? (
            <div className="space-y-5 animate-in fade-in duration-300">
              <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-teal-500/10 ring-1 ring-teal-500/20">
                <svg className="size-7 text-teal-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
              </div>
              <AuthSuccess message="Check your inbox — if an account exists with that email, you'll receive a password reset link shortly." />
              <div className="flex flex-col gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => { setSuccess(false); setEmail(''); }}
                  className="w-full h-11 rounded-xl border-white/10 bg-white/[0.04] hover:bg-white/[0.08] text-white font-medium"
                >
                  Try a different email
                </Button>
                <Link
                  href="/login"
                  className="block text-center text-sm text-teal-400 font-medium hover:text-teal-300 transition-colors py-1"
                >
                  Back to sign in
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <AuthError message={error} />

              <AuthField
                label="Email address"
                fieldId="forgot-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />

              <SubmitButton loading={loading}>Send reset link</SubmitButton>
            </form>
          )}

          {!success && (
            <p className="mt-5 text-center text-slate-400 text-sm">
              Remember your password?{' '}
              <Link href="/login" className="text-teal-400 font-medium hover:text-teal-300 transition-colors">
                Sign in
              </Link>
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
