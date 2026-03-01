'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  AuthField,
  PasswordField,
  AuthError,
  SubmitButton,
  OAuthDivider,
  GoogleOAuthButton,
  AuthFooter,
} from './shared';

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get('next') || '/dashboard';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Invalid email or password.');
        return;
      }
      router.push(next);
      router.refresh();
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
          <CardTitle className="text-[22px] font-semibold tracking-tight text-white">
            Welcome back
          </CardTitle>
          <CardDescription className="text-slate-400 text-[13px]">
            Sign in to your MindCare AI account
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-4">
          <GoogleOAuthButton label="Sign in with Google" />
          <OAuthDivider />

          <form onSubmit={handleSubmit} className="space-y-4">
            <AuthError message={error} />

            <AuthField
              label="Email address"
              fieldId="login-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />

            <div>
              <PasswordField
                label="Password"
                fieldId="login-password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
              <div className="flex justify-end mt-1.5">
                <Link
                  href="/forgot-password"
                  className="text-xs text-slate-500 hover:text-teal-400 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            <SubmitButton loading={loading}>Sign in</SubmitButton>
          </form>

          <AuthFooter text="Don't have an account?" linkText="Sign up" href="/signup" />
        </CardContent>
      </Card>
    </div>
  );
}
