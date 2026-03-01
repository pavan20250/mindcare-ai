'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
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
  const [loading, setLoading] = useState(false);

  const strength = useMemo(() => getPasswordStrength(password), [password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

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
      router.push('/login');
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
            Create account
          </CardTitle>
          <CardDescription className="text-slate-400 text-[13px]">
            Get started with NeuralCare AI — it&apos;s free
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-4">
          <GoogleOAuthButton label="Sign up with Google" />
          <OAuthDivider />

          <form onSubmit={handleSubmit} className="space-y-3">
            <AuthError message={error} />

            <div className="grid grid-cols-2 gap-3">
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

            <div className="grid grid-cols-2 gap-3">
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
                  <div className="mt-2 space-y-1">
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
                    <p className="text-[11px] text-slate-500">{strength.label}</p>
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
