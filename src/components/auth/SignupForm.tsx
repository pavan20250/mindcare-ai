'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  AuthField,
  PasswordField,
  AuthError,
  AuthSuccess,
  SubmitButton,
  AuthFooter,
} from './shared';

function getPasswordStrength(pw: string): { score: number; label: string; color: string } {
  let score = 0;
  if (pw.length >= 8) score++;
  if (pw.length >= 12) score++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++;
  if (/\d/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;

  if (score <= 1) return { score: 1, label: 'Weak', color: 'bg-red-500' };
  if (score <= 2) return { score: 2, label: 'Fair', color: 'bg-amber-500' };
  if (score <= 3) return { score: 3, label: 'Good', color: 'bg-teal-500' };
  return { score: 4, label: 'Strong', color: 'bg-emerald-400' };
}

export default function SignupForm() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [createdEmail, setCreatedEmail] = useState('');
  const [cooldownSeconds, setCooldownSeconds] = useState(0);
  const [resending, setResending] = useState(false);

  const strength = useMemo(() => getPasswordStrength(password), [password]);

  useEffect(() => {
    if (cooldownSeconds <= 0) return;
    const t = window.setInterval(() => {
      setCooldownSeconds((s) => Math.max(0, s - 1));
    }, 1000);
    return () => window.clearInterval(t);
  }, [cooldownSeconds]);

  // When user confirms email in another tab, session is set; redirect this tab to login
  useEffect(() => {
    if (!createdEmail) return;
    const poll = () =>
      fetch('/api/auth/session', { credentials: 'include' })
        .then((r) => r.json())
        .then((data) => {
          if (data?.user) router.replace('/login?from=signup');
        })
        .catch(() => {});
    const id = window.setInterval(poll, 2500);
    poll();
    return () => window.clearInterval(id);
  }, [createdEmail, router]);

  const formatCooldown = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${String(s).padStart(2, '0')}`;
  };

  const handleResend = async () => {
    if (!createdEmail || cooldownSeconds > 0 || resending) return;
    setError('');
    setSuccess('');
    setResending(true);
    try {
      const res = await fetch('/api/auth/resend-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: createdEmail }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Failed to resend email. Please try again.');
        return;
      }
      setSuccess('Verification email resent. Please check your inbox.');
      setCooldownSeconds(120);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setResending(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setCreatedEmail('');
    setCooldownSeconds(0);

    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Signup failed. Please try again.');
        return;
      }
      setSuccess('Account created. Please check your email for the verification link or code to complete signup before logging in.');
      setCreatedEmail(email.trim());
      setCooldownSeconds(120);
      setPassword('');
      setConfirmPassword('');
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[520px] sm:max-w-[560px] mx-auto px-4 sm:px-6 py-4 sm:py-6">
      <Card className="relative overflow-hidden border-white/[0.08] bg-gradient-to-br from-white/[0.03] via-white/[0.015] to-teal-500/[0.06] backdrop-blur-2xl shadow-2xl shadow-black/30 rounded-2xl">
        <div className="pointer-events-none absolute h-40 rounded-full bg-teal-500/18 blur-3xl" />
        <CardHeader className="relative text-center pb-1 space-y-0.5">
          <div className="flex justify-center mb-1">
            <Image
              src="/NeuralCare_logo/website_logo.png"
              alt="NeuralCare AI"
              width={180}
              height={100}
              className="h-40 w-auto -mb-10 -mt-10"
              priority
            />
          </div>
          <CardTitle className="text-[22px] sm:text-[24px] font-semibold tracking-tight text-white">
            Create account
          </CardTitle>
          <CardDescription className="text-slate-400 text-[13px] sm:text-[14px]">
            Get started with NeuralCare AI — it&apos;s free
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-2">
            <AuthError message={error} />
            <AuthSuccess message={success} />
            {createdEmail && (
              <div className="flex items-center justify-between gap-2.5 rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 py-2">
                <div className="text-xs text-slate-400 leading-snug">
                  Didn&apos;t get the email for <span className="text-slate-200">{createdEmail}</span>?
                </div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleResend}
                  disabled={cooldownSeconds > 0 || resending}
                  className="h-8 rounded-xl border-white/10 bg-white/[0.05] hover:bg-white/[0.09] text-white text-[11px] sm:text-xs"
                >
                  {cooldownSeconds > 0 ? `Resend in ${formatCooldown(cooldownSeconds)}` : resending ? 'Resending…' : 'Resend'}
                </Button>
              </div>
            )}

            <div className="space-y-2 sm:space-y-2.5">
              <AuthField
                label="Full name"
                fieldId="signup-name"
                type="text"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Doe"
                required
              />
              <AuthField
                label="Email address"
                fieldId="signup-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
              <div>
                <PasswordField
                  label="Password"
                  fieldId="signup-password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min. 8 characters"
                  required
                />
                {password.length > 0 && (
                  <div className="mt-1 space-y-1">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                            i <= strength.score ? strength.color : 'bg-white/10'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-[11px] font-medium text-slate-300">{strength.label} password</p>
                  </div>
                )}
              </div>
              <PasswordField
                label="Confirm password"
                fieldId="signup-confirm"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            <SubmitButton loading={loading}>Create account</SubmitButton>
          </form>

          <AuthFooter text="Already have an account?" linkText="Sign in" href="/login" />
        </CardContent>
      </Card>
    </div>
  );
}
